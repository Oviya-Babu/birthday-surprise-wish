import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const LETTER_LINES = [
  { text: 'Dear Kaviya,', style: 'header' },
  { text: '' },
  { text: 'I don\'t know how the universe decided to bring us into each other\'s lives,', style: 'normal' },
  { text: 'but I choose to believe it was entirely intentional.', style: 'normal' },
  { text: 'Like a quiet little cosmic nudge saying — "these two will need each other."', style: 'italic' },
  { text: '' },
  { text: 'You have been my chaos companion, my soft place to land,', style: 'normal' },
  { text: 'my loudest laugh, my 3am comfort, my constant.', style: 'normal' },
  { text: '' },
  { text: 'I love the way you exist — loudly, gently, wonderfully all at once.', style: 'normal' },
  { text: 'I love your laugh, your chaos, your kindness, your whole beautiful brain.', style: 'bold' },
  { text: '' },
  { text: 'Thank you for being exactly who you are.', style: 'italic' },
  { text: 'Thank you for choosing to be present.', style: 'italic' },
  { text: 'Thank you for making ordinary moments feel like something worth keeping.', style: 'italic' },
  { text: '' },
  { text: 'Happy Birthday, Kaviya. 🌸', style: 'big' },
  { text: '' },
  { text: 'No matter where life takes us,', style: 'normal' },
  { text: 'you will always be my home. 🏠💖', style: 'final' },
  { text: '' },
  { text: 'Forever yours,', style: 'signature' },
  { text: 'Oviya ✨', style: 'signatureName' },
]

export default function LetterSection({ onDone }) {
  const [visibleLines, setVisibleLines] = useState(0)
  const [fireflies, setFireflies] = useState([])
  const [lanterns, setLanterns] = useState([])
  const fid = useRef(0); const lid = useRef(0)

  useEffect(() => {
    const t = setInterval(() => {
      setVisibleLines(v => v < LETTER_LINES.length ? v + 1 : v)
    }, 380)

    const ffInterval = setInterval(() => {
      const id = fid.current++
      setFireflies(prev => [...prev.slice(-22), {
        id, x: Math.random() * 100, y: 15 + Math.random() * 75,
        duration: 6 + Math.random() * 6,
        tx: (Math.random() - 0.5) * 110, ty: (Math.random() - 0.5) * 90,
      }])
      setTimeout(() => setFireflies(prev => prev.filter(f => f.id !== id)), 13000)
    }, 450)

    const lanternInterval = setInterval(() => {
      const id = lid.current++
      setLanterns(prev => [...prev.slice(-7), { id, x: 8 + Math.random() * 82, drift: (Math.random() - 0.5) * 70 }])
      setTimeout(() => setLanterns(prev => prev.filter(l => l.id !== id)), 14000)
    }, 2800)

    return () => { clearInterval(t); clearInterval(ffInterval); clearInterval(lanternInterval) }
  }, [])

  const getStyle = (s) => {
    const base = { fontFamily: 'Dancing Script', lineHeight: 2, marginBottom: '4px' }
    return ({
      header: { ...base, fontSize: 'clamp(1.2rem, 3vw, 1.7rem)', color: '#FF6EB4', fontWeight: 700 },
      normal: { ...base, fontSize: 'clamp(0.95rem, 2.5vw, 1.18rem)', color: 'rgba(255,240,250,0.9)' },
      italic: { ...base, fontSize: 'clamp(0.9rem, 2.2vw, 1.12rem)', color: 'rgba(200,162,200,0.88)', fontStyle: 'italic' },
      bold: { ...base, fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)', color: '#FFD700', fontWeight: 700 },
      big: { ...base, fontSize: 'clamp(1.4rem, 4vw, 2.1rem)', color: '#FF6EB4', fontWeight: 700 },
      final: { ...base, fontSize: 'clamp(1.1rem, 3vw, 1.45rem)', color: '#FFD700', fontWeight: 700 },
      signature: { ...base, fontSize: 'clamp(1rem, 2.5vw, 1.3rem)', color: 'rgba(255,182,193,0.8)', fontStyle: 'italic', marginTop: '8px' },
      signatureName: { ...base, fontSize: 'clamp(1.4rem, 4vw, 2rem)', color: '#FF6EB4', fontWeight: 700 },
    })[s] || { fontFamily: 'Dancing Script', lineHeight: 2, color: 'rgba(255,240,250,0.9)', fontSize: '1.1rem' }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at center, #0D0030 0%, #050010 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden', padding: '60px 20px', zIndex: 3,
    }}>
      <style>{`
        @keyframes fireflyFloat { 0%,100%{opacity:0;transform:translate(0,0)} 30%{opacity:0.9} 60%{opacity:0.6;transform:translate(var(--tx),var(--ty))} }
        @keyframes lanternRise { 0%{transform:translateY(0) translateX(0);opacity:0.85} 100%{transform:translateY(-120vh) translateX(var(--drift));opacity:0} }
        @keyframes shimmer { 0%{background-position:0% center} 100%{background-position:300% center} }
        @keyframes moonGlow { 0%,100%{box-shadow:0 0 40px rgba(255,220,100,0.25)} 50%{box-shadow:0 0 80px rgba(255,220,100,0.55)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .letter-cursor::after { content:'|'; animation:blink 1s step-end infinite; color:#FF6EB4; }
      `}</style>

      {/* Moon */}
      <div style={{
        position: 'absolute', top: '50px', right: '8%', width: '80px', height: '80px',
        borderRadius: '50%', background: 'radial-gradient(circle, #FFF5C0 0%, #FFD700 60%, transparent 100%)',
        animation: 'moonGlow 4s ease-in-out infinite', zIndex: 2,
      }} />

      {/* Fireflies */}
      {fireflies.map(f => (
        <div key={f.id} style={{
          position: 'absolute', left: `${f.x}%`, top: `${f.y}%`,
          width: '5px', height: '5px', borderRadius: '50%', background: '#FFD700',
          '--tx': `${f.tx}px`, '--ty': `${f.ty}px`,
          boxShadow: '0 0 8px #FFD700, 0 0 16px #FFA500',
          animation: `fireflyFloat ${f.duration}s ease-in-out infinite`,
          zIndex: 2, pointerEvents: 'none',
        }} />
      ))}

      {/* Rising lanterns */}
      {lanterns.map(l => (
        <div key={l.id} style={{
          position: 'absolute', bottom: '-60px', left: `${l.x}%`,
          fontSize: '36px', '--drift': `${l.drift}px`,
          animation: 'lanternRise 13s ease-in forwards', zIndex: 2, pointerEvents: 'none',
        }}>🏮</div>
      ))}

      <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          fontFamily: 'Dancing Script', fontSize: 'clamp(2rem, 6vw, 3.5rem)',
          background: 'linear-gradient(135deg, #FF6EB4, #FFD700, #C8A2C8)',
          backgroundSize: '300%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text', animation: 'shimmer 4s linear infinite',
          textAlign: 'center', marginBottom: '40px',
        }}>
        💌 A Letter For Kaviya
      </motion.h2>

      {/* Letter paper */}
      <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          background: 'rgba(10,0,28,0.88)', border: '1px solid rgba(255,110,180,0.2)',
          borderRadius: '28px', padding: 'clamp(28px, 5vw, 52px)',
          maxWidth: '700px', width: '100%',
          backdropFilter: 'blur(22px)',
          boxShadow: '0 0 80px rgba(200,162,200,0.1), 0 20px 60px rgba(0,0,0,0.5)',
          position: 'relative', zIndex: 5,
        }}>
        {/* Decorative corners */}
        {['🌸', '🌸', '💖', '💖'].map((e, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: i < 2 ? '14px' : undefined, bottom: i >= 2 ? '14px' : undefined,
            left: i % 2 === 0 ? '14px' : undefined, right: i % 2 !== 0 ? '14px' : undefined,
            fontSize: '18px', opacity: 0.25,
          }}>{e}</div>
        ))}

        {LETTER_LINES.slice(0, visibleLines).map((line, i) => (
          <motion.p key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
            style={getStyle(line.style)}>
            {line.text || '\u00A0'}
          </motion.p>
        ))}

        {visibleLines < LETTER_LINES.length && (
          <span className="letter-cursor" style={{ fontFamily: 'Dancing Script', fontSize: '1.2rem', color: '#FF6EB4' }} />
        )}
      </motion.div>

      {visibleLines >= LETTER_LINES.length && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          style={{ marginTop: '40px', textAlign: 'center' }}>
          <button onClick={onDone} className="yes-btn" style={{ fontSize: '1.1rem', padding: '16px 48px' }}>
            🎆 Grand Finale
          </button>
        </motion.div>
      )}
    </div>
  )
}
