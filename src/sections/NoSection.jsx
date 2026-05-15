import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

// sad cat GIFs — new from design spec
const SAD_CAT_1 = 'https://media1.giphy.com/media/7AzEXdIb1wyCTWJntb/giphy.gif'
const SAD_CAT_2 = 'https://media1.giphy.com/media/QURHbD0U3CjXBZfjR1/giphy.gif'

export default function NoSection({ onForceYes, clickCount }) {
  const [damage, setDamage] = useState(0)
  const [glitch, setGlitch] = useState(false)
  const [showShutdown, setShowShutdown] = useState(false)
  const [rain, setRain] = useState([])
  const rid = useRef(0)

  useEffect(() => {
    setDamage(Math.min(99, clickCount * 33))
    if (clickCount >= 3) setShowShutdown(true)

    const g = setInterval(() => setGlitch(g => !g), 350)
    const rainInterval = setInterval(() => {
      const id = rid.current++
      setRain(prev => [...prev.slice(-35), {
        id, x: Math.random() * 100,
        speed: 0.7 + Math.random() * 0.9,
        height: 14 + Math.random() * 10,
        opacity: 0.25 + Math.random() * 0.45,
      }])
      setTimeout(() => setRain(prev => prev.filter(r => r.id !== id)), 2200)
    }, 70)

    return () => { clearInterval(g); clearInterval(rainInterval) }
  }, [clickCount])

  const glitchLines = [
    'SYSTEM DISRUPTION DETECTED.', 'EMOTIONAL DAMAGE: CRITICAL.',
    'INITIATING SADNESS PROTOCOL.', 'RETHINKING LIFE CHOICES...',
    'LOADING: BIGGER YES BUTTON...',
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0a0a12 0%, #0d0d1a 100%)',
      filter: 'grayscale(0.65) brightness(0.78)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden', padding: '40px 20px', zIndex: 3,
      transition: 'filter 1s ease',
    }}>
      <style>{`
        @keyframes rainFall { 0%{transform:translateY(-20px);opacity:var(--op)} 100%{transform:translateY(105vh);opacity:0} }
        @keyframes glitchAnim { 0%,100%{transform:translate(0);filter:none} 25%{transform:translate(-3px,2px);filter:hue-rotate(90deg)} 50%{transform:translate(3px,-2px);filter:hue-rotate(180deg)} 75%{transform:translate(-2px,-3px);filter:hue-rotate(270deg)} }
        @keyframes sadSway { 0%,100%{transform:rotate(-4deg)} 50%{transform:rotate(4deg)} }
        @keyframes heartBeat { 0%,100%{transform:scale(1)} 25%{transform:scale(1.15)} 50%{transform:scale(1)} 75%{transform:scale(1.08)} }
      `}</style>

      {rain.map(r => (
        <div key={r.id} style={{
          position: 'absolute', left: `${r.x}%`, top: '-20px',
          width: '2px', height: `${r.height}px`,
          background: `rgba(120,150,255,${r.opacity})`,
          '--op': r.opacity,
          animation: `rainFall ${r.speed}s linear forwards`, zIndex: 1,
        }} />
      ))}

      {/* Sad cat GIFs */}
      <motion.img initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 0.85, scale: 1 }}
        transition={{ delay: 0.3, type: 'spring' }}
        src={SAD_CAT_1} alt="sad cat"
        style={{
          position: 'absolute', left: '5%', top: '15%', width: '100px',
          borderRadius: '16px', border: '2px solid rgba(100,100,200,0.3)',
          boxShadow: '0 0 20px rgba(100,100,200,0.15)',
          animation: 'sadSway 4s ease-in-out infinite', zIndex: 4,
        }}
      />
      <motion.img initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 0.8, scale: 1 }}
        transition={{ delay: 0.6, type: 'spring' }}
        src={SAD_CAT_2} alt="sad cat 2"
        style={{
          position: 'absolute', right: '4%', top: '12%', width: '90px',
          borderRadius: '16px', border: '2px solid rgba(100,100,200,0.3)',
          animation: 'sadSway 5s ease-in-out infinite', animationDelay: '1s', zIndex: 4,
        }}
      />

      {/* Crying cat */}
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
        style={{ fontSize: '100px', marginBottom: '20px', animation: 'sadSway 3s ease-in-out infinite', zIndex: 5, position: 'relative' }}>
        😿
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          textAlign: 'center', zIndex: 5, position: 'relative',
          background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(100,100,180,0.25)',
          borderRadius: '24px', padding: '36px 32px', maxWidth: '480px', width: '100%',
          backdropFilter: 'blur(16px)',
        }}>

        <h2 style={{
          fontFamily: 'Dancing Script', fontSize: 'clamp(1.6rem, 5vw, 2.5rem)',
          color: '#aaa', marginBottom: '16px',
          animation: glitch ? 'glitchAnim 0.3s steps(2)' : 'none',
        }}>
          After everything we've been through…
        </h2>

        <p style={{ color: 'rgba(200,200,200,0.7)', fontFamily: 'Nunito', fontSize: '1rem', marginBottom: '28px', lineHeight: 1.8 }}>
          This is fine. I'm fine. Everything is fine. 😭<br />
          <span style={{ fontSize: '0.88rem', opacity: 0.7 }}>(It is absolutely NOT fine.)</span>
        </p>

        {/* Emotional damage meter */}
        <div style={{ marginBottom: '24px', textAlign: 'left' }}>
          <p style={{ color: 'rgba(200,200,200,0.55)', fontFamily: 'Space Mono', fontSize: '0.73rem', marginBottom: '8px' }}>
            💔 Emotional Damage: {damage}%
          </p>
          <div style={{ height: '18px', background: 'rgba(255,255,255,0.08)', borderRadius: '9px', overflow: 'hidden' }}>
            <motion.div initial={{ width: 0 }} animate={{ width: `${damage}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{ height: '100%', background: 'linear-gradient(90deg, #555, #999)', borderRadius: '9px' }} />
          </div>
        </div>

        {showShutdown && (
          <div style={{ marginBottom: '24px' }}>
            {glitchLines.map((line, i) => (
              <motion.p key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: i * 0.3 }}
                style={{
                  fontFamily: 'Space Mono', fontSize: '0.76rem', color: '#777',
                  marginBottom: '4px', animation: 'glitchAnim 0.5s steps(2) infinite',
                  animationDelay: `${i * 0.12}s`,
                }}>{line}</motion.p>
            ))}
          </div>
        )}

        <motion.button
          initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
          onClick={onForceYes}
          style={{
            background: 'linear-gradient(135deg, #FF6EB4, #FF1493)',
            border: 'none', color: 'white', fontFamily: 'Nunito', fontWeight: 900,
            fontSize: '1.3rem', padding: '18px 56px', borderRadius: '50px',
            cursor: 'pointer', boxShadow: '0 0 40px rgba(255,20,147,0.4)',
            animation: 'heartBeat 0.9s ease-in-out infinite',
          }}>
          💖 Wait — YES, of course!
        </motion.button>

        <p style={{ marginTop: '16px', color: 'rgba(150,150,150,0.45)', fontFamily: 'Space Mono', fontSize: '0.63rem' }}>
          (This was always going to be the answer.)
        </p>
      </motion.div>
    </div>
  )
}
