import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import PickupLines from '../components/PickupLines'

const TYPING_SEQUENCE = [
  { text: 'Initializing a universe for Kaviya...', delay: 500, color: '#a0ffa0' },
  { text: 'Loading: infinite love, chaos, hehee...', delay: 2500, color: '#a0ffa0' },
  { text: '✨ Love by Oviya', delay: 4500, color: '#FFD700' },
  { text: '💖 Emotional warmth levels: MAXIMUM', delay: 6500, color: '#FF1493' },
  { text: '🐱 Our Energy: DANGEROUSLY HIGH', delay: 8000, color: '#C8A2C8' },
]

const CATS = ['😺', '😸', '😹', '😻', '🐱', '😼', '🙀', '🐾']

export default function IntroSection({ onDone, onEasterEgg }) {
  const [typedLines, setTypedLines] = useState([])
  const [showTitle, setShowTitle] = useState(false)
  const [showBtn, setShowBtn] = useState(false)
  const [catRain, setCatRain] = useState([])
  const catId = useRef(0)

  useEffect(() => {
    const timers = TYPING_SEQUENCE.map(({ text, delay, color }) =>
      setTimeout(() =>
        setTypedLines(prev =>
          prev.some(l => l.text === text) ? prev : [...prev, { text, color }]
        ), delay
      )
    )
    const t1 = setTimeout(() => setShowTitle(true), 10000)
    const t2 = setTimeout(() => setShowBtn(true), 12000)
    return () => { timers.forEach(clearTimeout); clearTimeout(t1); clearTimeout(t2) }
  }, [])

  useEffect(() => {
    const spawn = () => {
      const id = catId.current++
      setCatRain(prev => [...prev.slice(-20), {
        id, x: Math.random() * 90,
        emoji: CATS[Math.floor(Math.random() * CATS.length)],
        size: 22 + Math.random() * 24, speed: 4 + Math.random() * 6,
      }])
      setTimeout(() => setCatRain(prev => prev.filter(c => c.id !== id)), 12000)
    }
    const t = setInterval(spawn, 900)
    return () => clearInterval(t)
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at top, #2D0050 0%, #0D0015 60%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden', padding: '40px 20px', zIndex: 3,
    }}>
      <style>{`
        @keyframes catFall { 0%{transform:translateY(0) rotate(0deg);opacity:1} 100%{transform:translateY(110vh) rotate(540deg);opacity:0.4} }
        @keyframes shimmer { 0%{background-position:0% center} 100%{background-position:300% center} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes gifFloat { 0%,100%{transform:translateY(0) rotate(-3deg)} 50%{transform:translateY(-18px) rotate(3deg)} }
        .cursor-blink::after { content:'|'; animation:blink 1s step-end infinite; color:#FF6EB4; }
      `}</style>

      {/* Falling cats */}
      {catRain.map(cat => (
        <div key={cat.id} onClick={() => onEasterEgg('meme1')} style={{
          position: 'absolute', left: `${cat.x}%`, top: '-60px',
          fontSize: `${cat.size}px`, animation: `catFall ${cat.speed}s linear forwards`,
          zIndex: 2, cursor: 'pointer', filter: 'drop-shadow(0 0 6px rgba(255,110,180,0.5))',
        }}>{cat.emoji}</div>
      ))}



      {/* Terminal */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
        style={{
          background: 'rgba(13,0,21,0.88)', border: '1px solid rgba(255,110,180,0.35)',
          borderRadius: '16px', padding: '28px 36px', maxWidth: '580px', width: '100%',
          backdropFilter: 'blur(20px)', boxShadow: '0 0 50px rgba(255,110,180,0.15)',
          marginBottom: '36px', zIndex: 5, position: 'relative',
        }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '18px', alignItems: 'center' }}>
          {['#FF5F57', '#FFBD2E', '#28CA41'].map((c, i) => (
            <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
          ))}
          <span style={{ marginLeft: '8px', color: 'rgba(255,255,255,0.3)', fontFamily: 'Space Mono', fontSize: '0.7rem' }}>
            universe-for-kaviya.exe — by Oviya ✨
          </span>
        </div>
        {typedLines.map((line) => (
          <motion.div key={line.text} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              fontFamily: 'Space Mono', fontSize: 'clamp(0.68rem, 1.5vw, 0.83rem)',
              color: line.color, marginBottom: '9px', lineHeight: 1.6,
            }}>
            <span style={{ color: 'rgba(255,110,180,0.5)', marginRight: '8px' }}>{'>'}</span>{line.text}
          </motion.div>
        ))}
        {typedLines.length < TYPING_SEQUENCE.length && (
          <div style={{ fontFamily: 'Space Mono', fontSize: '0.83rem', color: '#a0ffa0' }}>
            <span style={{ color: 'rgba(255,110,180,0.5)', marginRight: '8px' }}>{'>'}</span>
            <span className="cursor-blink" />
          </div>
        )}
      </motion.div>

      {/* Title */}
      {showTitle && (
        <motion.div initial={{ opacity: 0, scale: 0.5, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, type: 'spring', stiffness: 100 }}
          style={{ textAlign: 'center', zIndex: 5, position: 'relative', marginBottom: '24px' }}>
          <h1 style={{
            fontFamily: 'Dancing Script', fontSize: 'clamp(2rem, 8vw, 5.5rem)',
            background: 'linear-gradient(135deg, #FF6EB4, #FF1493, #FFD700, #FF6EB4)',
            backgroundSize: '300%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text', animation: 'shimmer 4s linear infinite', lineHeight: 1.2, marginBottom: '10px',
          }}>
            ✨ Will You Be My Forever? ✨
          </h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            style={{ fontFamily: 'Nunito', fontSize: 'clamp(0.85rem, 2vw, 1rem)', color: 'rgba(255,182,193,0.75)', fontWeight: 600 }}>
            A tiny universe made with love, chaos, and way too many cats.
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            style={{ fontFamily: 'Space Mono', fontSize: '0.7rem', color: 'rgba(255,215,0,0.5)', marginTop: '6px' }}>
            By Oviya ✨
          </motion.p>
        </motion.div>
      )}

      <PickupLines />

      {/* Buttons */}
      {showBtn && (
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ zIndex: 5, position: 'relative', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
          <button id="enter-universe-btn" onClick={onDone} className="yes-btn"
            style={{ fontSize: '1.2rem', padding: '18px 60px' }}>
            ✨ Enter My Universe
          </button>
          <button onClick={() => onEasterEgg('secret')}
            style={{
              background: 'transparent', border: '1px solid rgba(255,215,0,0.3)',
              borderRadius: '50px', padding: '10px 28px',
              color: 'rgba(255,215,0,0.6)', fontFamily: 'Nunito', fontWeight: 600,
              fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.3s ease',
            }}>
            💌 Open the Letter
          </button>
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 3 }}
        onClick={onDone} style={{
          position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
          color: 'rgba(255,110,180,0.4)', fontFamily: 'Space Mono', fontSize: '0.6rem',
          textAlign: 'center', zIndex: 5, cursor: 'pointer', whiteSpace: 'nowrap',
        }}>
        🐾 click a falling cat for surprises &nbsp;·&nbsp; click here to skip intro
      </motion.div>
    </div>
  )
}
