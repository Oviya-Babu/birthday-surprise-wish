import { useState, useEffect, useRef } from 'react'

// Web Audio API ambient music synthesizer — no external files needed!
// Creates dreamy ambient pads, emotional tones, and upbeat patterns.

function createAudioContext() {
  try {
    return new (window.AudioContext || window.webkitAudioContext)()
  } catch {
    return null
  }
}

const VIBES = {
  romantic: { label: 'Romantic', icon: '🎵', color: '#FF6EB4' },
  chaos: { label: 'Chaos Mode', icon: '🎉', color: '#FFD700' },
  sad: { label: 'Sad Violin', icon: '😢', color: '#89CFF0' },
  'cat-rave': { label: 'Cat Rave', icon: '🐱', color: '#C8A2C8' },
  emotional: { label: 'Emotional', icon: '🎹', color: '#FF6EB4' },
  cinematic: { label: 'Cinematic', icon: '🌟', color: '#FFD700' },
}

// Dreamy pad notes by mode
const MODE_NOTES = {
  romantic: [261.63, 329.63, 392.00, 523.25],       // C major
  chaos: [293.66, 369.99, 440.00, 587.33],           // D major
  sad: [261.63, 311.13, 392.00, 493.88],             // C minor
  'cat-rave': [349.23, 440.00, 523.25, 698.46],      // F major high
  emotional: [246.94, 311.13, 369.99, 493.88],       // B minor
  cinematic: [196.00, 246.94, 293.66, 392.00],       // G major low
}

export default function MusicPlayer({ mode, onModeChange }) {
  const [open, setOpen] = useState(false)
  const [muted, setMuted] = useState(false)
  const [started, setStarted] = useState(false)
  const [noteIdx, setNoteIdx] = useState(0)
  const ctxRef = useRef(null)
  const gainRef = useRef(null)
  const oscillatorsRef = useRef([])
  const noteRef = useRef(0)

  const stopAll = () => {
    oscillatorsRef.current.forEach(o => { try { o.stop(); o.disconnect() } catch {} })
    oscillatorsRef.current = []
  }

  const playAmbient = (audioCtx, masterGain, mode) => {
    stopAll()
    const notes = MODE_NOTES[mode] || MODE_NOTES.romantic
    const isSad = mode === 'sad'
    const isChaos = mode === 'chaos' || mode === 'cat-rave'

    notes.forEach((freq, i) => {
      const osc = audioCtx.createOscillator()
      const oscGain = audioCtx.createGain()
      const lfo = audioCtx.createOscillator()
      const lfoGain = audioCtx.createGain()

      osc.type = isChaos ? 'square' : isSad ? 'sawtooth' : 'sine'
      osc.frequency.value = freq * (i === 0 ? 1 : 1)

      lfo.frequency.value = 0.3 + i * 0.1
      lfo.type = 'sine'
      lfoGain.gain.value = freq * 0.005

      lfo.connect(lfoGain)
      lfoGain.connect(osc.frequency)

      const vol = (0.08 - i * 0.015) * (isSad ? 0.6 : isChaos ? 1.2 : 1)
      oscGain.gain.setValueAtTime(0, audioCtx.currentTime)
      oscGain.gain.linearRampToValueAtTime(vol, audioCtx.currentTime + 1.5)

      osc.connect(oscGain)
      oscGain.connect(masterGain)

      osc.start()
      lfo.start()
      oscillatorsRef.current.push(osc, lfo)
    })
  }

  const initAudio = () => {
    if (!ctxRef.current) {
      const ctx = createAudioContext()
      if (!ctx) return
      ctxRef.current = ctx
      const master = ctx.createGain()
      master.gain.value = muted ? 0 : 0.4
      master.connect(ctx.destination)
      gainRef.current = master
    }
    if (ctxRef.current.state === 'suspended') ctxRef.current.resume()
    playAmbient(ctxRef.current, gainRef.current, mode)
    setStarted(true)
  }

  // Change mode when prop changes (after started)
  useEffect(() => {
    if (!started || !ctxRef.current || !gainRef.current) return
    playAmbient(ctxRef.current, gainRef.current, mode)
  }, [mode])

  // Mute/unmute
  useEffect(() => {
    if (!gainRef.current) return
    gainRef.current.gain.linearRampToValueAtTime(
      muted ? 0 : 0.4,
      ctxRef.current?.currentTime + 0.3 || 0
    )
  }, [muted])

  // Cleanup
  useEffect(() => () => { stopAll(); ctxRef.current?.close() }, [])

  // Note indicator animation
  useEffect(() => {
    const t = setInterval(() => setNoteIdx(n => (n + 1) % 4), 500)
    return () => clearInterval(t)
  }, [])

  const noteSymbols = ['♪', '♫', '♬', '♩']
  const vibe = VIBES[mode] || VIBES.romantic

  return (
    <>
      {/* Floating note */}
      {started && !muted && (
        <div style={{
          position: 'fixed', bottom: 90, right: 26, fontSize: '18px',
          color: vibe.color, pointerEvents: 'none', zIndex: 999,
          animation: 'float 2s ease-in-out infinite',
          textShadow: `0 0 10px ${vibe.color}`,
        }}>
          {noteSymbols[noteIdx]}
        </div>
      )}

      {/* Mode picker */}
      {open && (
        <div style={{
          position: 'fixed', bottom: 86, right: 18, zIndex: 1001,
          background: 'rgba(13,0,21,0.97)', border: '1px solid rgba(255,110,180,0.35)',
          borderRadius: '18px', padding: '14px', backdropFilter: 'blur(24px)',
          minWidth: '170px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
        }}>
          <p style={{ color: '#FF6EB4', fontFamily: 'Nunito', fontWeight: 800, fontSize: '0.73rem', marginBottom: '10px', textAlign: 'center', letterSpacing: '0.05em' }}>
            🎵 VIBE MODE
          </p>
          {Object.entries(VIBES).map(([key, v]) => (
            <button key={key}
              onClick={() => { onModeChange(key); setOpen(false); if (!started) initAudio() }}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '8px 12px', borderRadius: '10px', border: 'none',
                background: mode === key ? `${v.color}22` : 'transparent',
                color: mode === key ? v.color : 'rgba(255,255,255,0.65)',
                fontFamily: 'Nunito', fontWeight: 600, fontSize: '0.85rem',
                cursor: 'pointer', marginBottom: '2px', transition: 'all 0.2s ease',
              }}>
              {v.icon} {v.label}
            </button>
          ))}
          <div style={{ borderTop: '1px solid rgba(255,110,180,0.15)', marginTop: '10px', paddingTop: '10px' }}>
            <button onClick={() => setMuted(m => !m)} style={{
              display: 'block', width: '100%', textAlign: 'center',
              padding: '7px', borderRadius: '10px', border: '1px solid rgba(255,110,180,0.25)',
              background: 'transparent',
              color: muted ? '#FF6EB4' : 'rgba(255,255,255,0.5)',
              fontFamily: 'Nunito', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer',
            }}>
              {muted ? '🔊 Unmute' : '🔇 Mute'}
            </button>
          </div>
        </div>
      )}

      {/* Main button */}
      <button
        onClick={() => {
          if (!started) { initAudio(); setOpen(true) }
          else setOpen(o => !o)
        }}
        title={started ? 'Change vibe' : 'Start music'}
        style={{
          position: 'fixed', bottom: 20, right: 20, zIndex: 1002,
          width: '58px', height: '58px', borderRadius: '50%',
          background: `linear-gradient(135deg, ${vibe.color}, #FF1493)`,
          border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '22px', cursor: 'pointer',
          boxShadow: `0 0 24px ${vibe.color}88, 0 4px 15px rgba(0,0,0,0.4)`,
          transition: 'all 0.3s ease',
        }}>
        {started ? vibe.icon : '▶️'}
      </button>
    </>
  )
}
