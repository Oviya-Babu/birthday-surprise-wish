import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const FIREWORK_COLORS = ['#FF6EB4','#FF1493','#FFD700','#C8A2C8','#FF0054','#89CFF0','#FFB6C1','#FF69B4']

function FireworkCanvas() {
  const canvasRef = useRef(null)
  const particles = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let w = window.innerWidth, h = window.innerHeight
    canvas.width = w; canvas.height = h

    const launch = () => {
      const cx = 0.1 * w + Math.random() * 0.8 * w
      const cy = 0.08 * h + Math.random() * 0.55 * h
      const color = FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)]
      for (let i = 0; i < 70; i++) {
        const angle = (i / 70) * Math.PI * 2
        const speed = 1.5 + Math.random() * 6
        particles.current.push({ x: cx, y: cy, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, color, alpha: 1, size: 2 + Math.random() * 3.5 })
      }
    }
    const launchInterval = setInterval(launch, 600)
    launch()

    let raf
    const draw = () => {
      ctx.fillStyle = 'rgba(13,0,21,0.14)'
      ctx.fillRect(0, 0, w, h)
      particles.current = particles.current.filter(p => p.alpha > 0.02)
      for (const p of particles.current) {
        p.x += p.vx; p.y += p.vy; p.vy += 0.07; p.vx *= 0.97; p.alpha -= 0.011
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color + Math.floor(Math.max(0, p.alpha) * 255).toString(16).padStart(2, '0')
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }
    draw()

    const resize = () => { w = window.innerWidth; h = window.innerHeight; canvas.width = w; canvas.height = h }
    window.addEventListener('resize', resize)
    return () => { clearInterval(launchInterval); cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }} />
}

const MESSAGES = [
  '🎂 Happy Birthday, Kaviya 🎂',
  '💖 You Are So Incredibly Loved 💖',
  '🌟 You Light Up Every Room 🌟',
  '🐱 Maximum Cat Energy Certified 🐱',
  '✨ Here\'s To Infinite More Birthdays ✨',
  '🌹 Wonderful, Warm, Irreplaceable 🌹',
  '👑 You Are The Main Character, Always 👑',
  '🏠 Forever My Comfort Person 🏠',
]

export default function FinaleSection() {
  const [msgIdx, setMsgIdx] = useState(0)
  const [petals, setPetals] = useState([])
  const pid = useRef(0)

  useEffect(() => {
    const msgT = setInterval(() => setMsgIdx(i => (i + 1) % MESSAGES.length), 2500)
    const petalT = setInterval(() => {
      const id = pid.current++
      setPetals(prev => [...prev.slice(-50), {
        id, x: Math.random() * 100,
        emoji: ['🌹','🌸','💖','✨','⭐','💫','🐱','🎊','💕','🌺'][Math.floor(Math.random() * 10)],
        size: 16 + Math.random() * 24, speed: 5 + Math.random() * 7,
        drift: (Math.random() - 0.5) * 220,
      }])
      setTimeout(() => setPetals(prev => prev.filter(p => p.id !== id)), 15000)
    }, 180)
    return () => { clearInterval(msgT); clearInterval(petalT) }
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at center, #200040 0%, #0D0015 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden', padding: '40px 20px', zIndex: 3,
    }}>
      <style>{`
        @keyframes petalFall { 0%{transform:translateY(-30px) rotate(0deg);opacity:1} 100%{transform:translateY(115vh) translateX(var(--drift)) rotate(720deg);opacity:0.15} }
        @keyframes shimmer { 0%{background-position:0% center} 100%{background-position:300% center} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
        @keyframes heartBeat { 0%,100%{transform:scale(1)} 25%{transform:scale(1.15)} 50%{transform:scale(1)} 75%{transform:scale(1.08)} }
        @keyframes glowPulse { 0%,100%{box-shadow:0 0 40px rgba(255,110,180,0.25)} 50%{box-shadow:0 0 70px rgba(255,110,180,0.55),0 0 120px rgba(255,20,147,0.2)} }
      `}</style>

      <FireworkCanvas />

      {petals.map(p => (
        <div key={p.id} style={{
          position: 'absolute', left: `${p.x}%`, top: '-30px',
          fontSize: `${p.size}px`, '--drift': `${p.drift}px`,
          animation: `petalFall ${p.speed}s linear forwards`, pointerEvents: 'none', zIndex: 3,
        }}>{p.emoji}</div>
      ))}

      {/* Main card */}
      <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, type: 'spring', stiffness: 80, damping: 15 }}
        style={{
          textAlign: 'center', zIndex: 10, position: 'relative',
          background: 'rgba(13,0,21,0.78)', border: '1px solid rgba(255,110,180,0.28)',
          borderRadius: '36px', padding: 'clamp(32px, 5vw, 60px)',
          maxWidth: '740px', width: '100%',
          backdropFilter: 'blur(26px)',
          boxShadow: '0 0 80px rgba(255,20,147,0.18), 0 20px 60px rgba(0,0,0,0.5)',
          animation: 'glowPulse 4s ease-in-out infinite',
        }}>

        <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{ fontSize: 'clamp(60px, 12vw, 110px)', lineHeight: 1, marginBottom: '18px' }}>
          🎆
        </motion.div>

        {/* For Kaviya */}
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          style={{
            fontFamily: 'Space Mono', fontSize: 'clamp(0.65rem, 1.5vw, 0.85rem)',
            color: 'rgba(255,215,0,0.5)', letterSpacing: '0.15em', marginBottom: '10px',
          }}>
          ✨ FOR KAVIYA, FOREVER ✨
        </motion.p>

        <h1 style={{
          fontFamily: 'Dancing Script',
          fontSize: 'clamp(1.8rem, 6vw, 4.5rem)',
          background: 'linear-gradient(135deg, #FF6EB4, #FFD700, #FF1493, #C8A2C8, #FF6EB4)',
          backgroundSize: '300%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text', animation: 'shimmer 3s linear infinite',
          lineHeight: 1.25, marginBottom: '20px',
        }}>
          Happy Birthday,<br />My Forever Person.
        </h1>

        {/* Rotating messages */}
        <div style={{ height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '22px' }}>
          <motion.p key={msgIdx}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5 }}
            style={{
              fontFamily: 'Nunito', fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)',
              color: '#FFB6C1', fontWeight: 700,
              textShadow: '0 0 20px rgba(255,182,193,0.3)',
            }}>
            {MESSAGES[msgIdx]}
          </motion.p>
        </div>

        <div style={{
          fontSize: 'clamp(22px, 5vw, 38px)', marginBottom: '28px',
          animation: 'float 3s ease-in-out infinite', letterSpacing: '6px',
        }}>
          💖 💕 💗 💕 💖
        </div>

        {/* Quote */}
        <div style={{
          background: 'rgba(255,110,180,0.07)', border: '1px solid rgba(255,110,180,0.18)',
          borderRadius: '20px', padding: '24px 28px', marginBottom: '28px',
        }}>
          <p style={{
            fontFamily: 'Dancing Script', fontSize: 'clamp(1rem, 2.5vw, 1.35rem)',
            color: 'rgba(255,220,235,0.93)', lineHeight: 2.1, fontStyle: 'italic',
          }}>
            "No matter where life takes us,<br />
            you will always be my home." 🏠💖
          </p>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '30px' }}>
          {['Forever Person 💖', 'Comfort Human 🏠', 'Chaos Companion 🌪️', 'Cat Cultist 🐱', 'My Favourite 🌟', 'Irreplaceable ✨'].map((tag, i) => (
            <motion.span key={i} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + i * 0.1, type: 'spring' }}
              style={{
                background: 'rgba(255,110,180,0.1)', border: '1px solid rgba(255,110,180,0.25)',
                borderRadius: '50px', padding: '7px 18px',
                color: '#FFB6C1', fontFamily: 'Nunito', fontWeight: 700, fontSize: '0.82rem',
              }}>{tag}</motion.span>
          ))}
        </div>

        {/* Restart */}
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
          onClick={() => window.location.reload()}
          style={{
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,110,180,0.25)',
            borderRadius: '50px', padding: '10px 28px',
            color: 'rgba(255,110,180,0.65)', fontFamily: 'Nunito', fontWeight: 600,
            fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.3s ease',
            marginBottom: '20px',
          }}>
          🔄 Experience Again
        </motion.button>

        {/* Footer */}
        <p style={{
          color: 'rgba(255,110,180,0.3)', fontFamily: 'Nunito', fontSize: '0.78rem',
          lineHeight: 1.8, marginTop: '4px',
        }}>
          Made with love, glitter, and too many cats by Oviya 💖<br />
          <span style={{ fontSize: '0.65rem', fontFamily: 'Space Mono', color: 'rgba(255,215,0,0.25)' }}>
            A little digital universe made for Kaviya ✨
          </span>
        </p>
      </motion.div>
    </div>
  )
}
