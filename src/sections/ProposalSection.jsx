import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ProposalSection({ onYes, onNo, noClickCount }) {
  const [heartPulse, setHeartPulse] = useState(false)
  const [noPos, setNoPos] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState([])
  const pid = useRef(0)

  useEffect(() => {
    const t = setInterval(() => setHeartPulse(p => !p), 800)
    return () => clearInterval(t)
  }, [])

  const spawnParticles = () => {
    const newP = Array.from({ length: 12 }, (_, i) => ({
      id: pid.current++,
      angle: (i / 12) * 360,
      emoji: ['💖','✨','🌹','💫','⭐'][i % 5],
    }))
    setParticles(prev => [...prev, ...newP])
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newP.find(np => np.id === p.id)))
    }, 1200)
  }

  const handleNoHover = () => {
    const x = (Math.random() - 0.5) * 300
    const y = (Math.random() - 0.5) * 200
    setNoPos({ x, y })
  }

  const noMessages = [
    'Did you just...?',
    'That button is broken.',
    'Try YES instead 💖',
    'ERROR: NO not found',
    'Oops, wrong button!',
    'This hurts. A lot. 😭',
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at center, #1A0035 0%, #0D0015 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden', padding: '40px 20px', zIndex: 3,
    }}>
      <style>{`
        @keyframes heartBeat {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.15); }
          50% { transform: scale(1); }
          75% { transform: scale(1.08); }
        }
        @keyframes particleBurst {
          0% { transform: translate(0,0) scale(1); opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
        }
        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 300% center; }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 0.8; }
          100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>

      {/* Glowing rings behind heart */}
      {[1, 2, 3].map(i => (
        <div key={i} style={{
          position: 'absolute', width: `${200 + i * 80}px`, height: `${200 + i * 80}px`,
          borderRadius: '50%', border: `2px solid rgba(255, 20, 147, ${0.3 / i})`,
          animation: `pulse-ring ${2 + i * 0.5}s ease-out infinite`,
          animationDelay: `${i * 0.4}s`,
          top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        }} />
      ))}

      {/* Burst particles */}
      {particles.map(p => (
        <div key={p.id} style={{
          position: 'absolute', top: '45%', left: '50%',
          fontSize: '20px', pointerEvents: 'none',
          '--tx': `${Math.cos(p.angle * Math.PI / 180) * 120}px`,
          '--ty': `${Math.sin(p.angle * Math.PI / 180) * 120}px`,
          animation: 'particleBurst 1s ease-out forwards',
          zIndex: 10,
        }}>{p.emoji}</div>
      ))}

      {/* Main card */}
      <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
        style={{
          background: 'rgba(255,182,193,0.07)', border: '1px solid rgba(255,110,180,0.3)',
          borderRadius: '32px', padding: '48px 40px', maxWidth: '520px', width: '100%',
          backdropFilter: 'blur(24px)', textAlign: 'center', position: 'relative', zIndex: 5,
          boxShadow: '0 0 60px rgba(255,20,147,0.2), 0 20px 60px rgba(0,0,0,0.4)',
        }}>

        {/* Giant heart */}
        <motion.div
          animate={{ scale: heartPulse ? 1.12 : 1 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          onClick={spawnParticles}
          style={{ fontSize: 'clamp(80px, 15vw, 130px)', lineHeight: 1, marginBottom: '24px', cursor: 'pointer' }}
        >
          💖
        </motion.div>

        <h2 style={{
          fontFamily: 'Dancing Script', fontSize: 'clamp(1.8rem, 5vw, 3rem)',
          background: 'linear-gradient(135deg, #FF6EB4, #FFD700)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text', marginBottom: '12px',
        }}>
          Will you stay my forever person?
        </h2>

        <p style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Nunito', fontSize: '0.95rem', marginBottom: '36px', lineHeight: 1.7 }}>
          This is a legally binding emotional contract. <br/>
          Choose wisely. (Or don't — we know how this ends. 💅)
        </p>

        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <motion.button
            whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
            onClick={() => { spawnParticles(); setTimeout(onYes, 600) }}
            className="yes-btn" style={{ fontSize: '1.3rem', padding: '18px 56px' }}
          >
            YES 💖
          </motion.button>

          <motion.button
            animate={{ x: noPos.x, y: noPos.y }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            onMouseEnter={handleNoHover}
            onClick={onNo}
            className="no-btn"
            style={{ fontSize: '1rem' }}
            title={noMessages[noClickCount % noMessages.length]}
          >
            NO 💔
          </motion.button>
        </div>

        {noClickCount > 0 && (
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            style={{ marginTop: '20px', color: '#FF6EB4', fontFamily: 'Space Mono', fontSize: '0.75rem' }}>
            {noMessages[noClickCount % noMessages.length]}
          </motion.p>
        )}

        <p style={{ marginTop: '24px', color: 'rgba(255,110,180,0.4)', fontFamily: 'Space Mono', fontSize: '0.65rem' }}>
          💡 Pro tip: Click the heart for magic
        </p>
      </motion.div>

      {/* Floating hearts background */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${10 + i * 12}%`,
          top: `${10 + (i % 3) * 30}%`,
          fontSize: `${16 + (i % 3) * 12}px`,
          opacity: 0.15,
          animation: `float ${5 + i}s ease-in-out infinite`,
          animationDelay: `${i * 0.7}s`,
          zIndex: 1,
        }}>
          {['💖','💗','💕','💝','💘'][i % 5]}
        </div>
      ))}
    </div>
  )
}
