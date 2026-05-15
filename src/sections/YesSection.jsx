import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'


const COMPLIMENTS = [
  'pretty girl detected 🌸', 'cutest human alive 🥰', 'literally iconic 💅',
  'legendary creature ✨', 'professionally wonderful 🌟', 'main character energy 🎬',
  'serotonin dealer 🌈', 'professionally adorable 😍', 'certified chaos queen 👑',
  'best person in existence 💖', 'comfort person unlocked 🏠', 'universe approved ✨',
]

const DIALOGUE = [
  'You have successfully unlocked:',
  '✨ Forever Person Status ✨',
  '',
  'Kaviya, you are:',
  '💖 my favorite human',
  '🌪️ my chaos companion',
  '🏠 my comfort person',
  '🌟 my forever friend.',
]

const CATS_CELEBRATING = ['🎉😺', '💃😸', '🥳😻', '✨😹', '👑😼', '🎊🐱']

export default function YesSection() {
  const [petals, setPetals] = useState([])
  const [dialogueIdx, setDialogueIdx] = useState(0)
  const [compliments, setCompliments] = useState([])
  const [cats, setCats] = useState([])
  const pid = useRef(0); const cid = useRef(0); const catId = useRef(0)

  useEffect(() => {
    const petalInterval = setInterval(() => {
      const id = pid.current++
      setPetals(prev => [...prev.slice(-40), {
        id, x: Math.random() * 100,
        emoji: ['🌹','🌸','💮','🏵️','🌺'][Math.floor(Math.random() * 5)],
        size: 16 + Math.random() * 24, speed: 3 + Math.random() * 5,
        drift: (Math.random() - 0.5) * 150,
      }])
      setTimeout(() => setPetals(prev => prev.filter(p => p.id !== id)), 10000)
    }, 200)

    const dialogueInterval = setInterval(() => {
      setDialogueIdx(i => i < DIALOGUE.length - 1 ? i + 1 : i)
    }, 700)

    const complimentInterval = setInterval(() => {
      const id = cid.current++
      const text = COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)]
      setCompliments(prev => [...prev.slice(-8), { id, text, x: 5 + Math.random() * 70 }])
      setTimeout(() => setCompliments(prev => prev.filter(c => c.id !== id)), 4000)
    }, 900)

    const catInterval = setInterval(() => {
      const id = catId.current++
      setCats(prev => [...prev.slice(-10), {
        id, x: Math.random() * 90,
        cat: CATS_CELEBRATING[Math.floor(Math.random() * CATS_CELEBRATING.length)],
        size: 28 + Math.random() * 20,
      }])
      setTimeout(() => setCats(prev => prev.filter(c => c.id !== id)), 6000)
    }, 600)

    return () => {
      clearInterval(petalInterval); clearInterval(dialogueInterval)
      clearInterval(complimentInterval); clearInterval(catInterval)
    }
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1A0035 0%, #0D0015 50%, #2D0015 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden', padding: '40px 20px', zIndex: 3,
    }}>
      <style>{`
        @keyframes petalFall { 0%{transform:translateY(-20px) rotate(0deg);opacity:1} 100%{transform:translateY(110vh) translateX(var(--drift)) rotate(720deg);opacity:0.3} }
        @keyframes catPop { 0%{transform:translateY(100px) scale(0) rotate(-20deg);opacity:0} 20%{transform:translateY(-10px) scale(1.2) rotate(5deg);opacity:1} 80%{transform:translateY(0) scale(1) rotate(0deg);opacity:1} 100%{transform:translateY(-30px) scale(0.8) rotate(10deg);opacity:0} }
        @keyframes complimentFloat { 0%{transform:translateY(0);opacity:0} 10%{opacity:1} 80%{opacity:0.9} 100%{transform:translateY(-80px);opacity:0} }
        @keyframes shimmer { 0%{background-position:0% center} 100%{background-position:300% center} }
        @keyframes heartBeat { 0%,100%{transform:scale(1)} 25%{transform:scale(1.15)} 50%{transform:scale(1)} 75%{transform:scale(1.08)} }
      `}</style>

      {petals.map(p => (
        <div key={p.id} style={{
          position: 'absolute', left: `${p.x}%`, top: '-30px',
          fontSize: `${p.size}px`, '--drift': `${p.drift}px`,
          animation: `petalFall ${p.speed}s linear forwards`, pointerEvents: 'none', zIndex: 2,
        }}>{p.emoji}</div>
      ))}

      {cats.map(c => (
        <div key={c.id} style={{
          position: 'absolute', left: `${c.x}%`, bottom: '10%',
          fontSize: `${c.size}px`, animation: 'catPop 3s ease-in-out forwards',
          zIndex: 4, pointerEvents: 'none',
        }}>{c.cat}</div>
      ))}

      {compliments.map(c => (
        <div key={c.id} style={{
          position: 'absolute', left: `${c.x}%`, bottom: '20%',
          background: 'rgba(255,110,180,0.18)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,110,180,0.35)', borderRadius: '20px',
          padding: '8px 16px', color: '#FFB6C1', fontFamily: 'Nunito', fontWeight: 700,
          fontSize: '0.8rem', animation: 'complimentFloat 4s ease forwards',
          pointerEvents: 'none', zIndex: 6, whiteSpace: 'nowrap',
        }}>{c.text}</div>
      ))}

      {/* Main card */}
      <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: 'spring' }}
        style={{
          textAlign: 'center', zIndex: 7, position: 'relative',
          background: 'rgba(13,0,21,0.75)', border: '1px solid rgba(255,110,180,0.4)',
          borderRadius: '32px', padding: '48px 36px', maxWidth: '540px', width: '100%',
          backdropFilter: 'blur(20px)', boxShadow: '0 0 80px rgba(255,20,147,0.25)',
        }}>
        <div style={{ fontSize: '80px', marginBottom: '16px', animation: 'heartBeat 1s ease-in-out infinite' }}>💍</div>

        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          style={{
            fontFamily: 'Dancing Script', fontSize: 'clamp(1.6rem, 5vw, 2.8rem)',
            background: 'linear-gradient(135deg, #FFD700, #FF6EB4, #FF1493)',
            backgroundSize: '300%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text', animation: 'shimmer 3s linear infinite', marginBottom: '28px',
          }}>
          🎉 The Best Answer Ever! 🎉
        </motion.h2>

        <div style={{ marginBottom: '28px' }}>
          {DIALOGUE.slice(0, dialogueIdx + 1).map((line, i) => (
            <motion.p key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                fontFamily: line.includes('✨') ? 'Dancing Script' : 'Nunito',
                fontSize: line.includes('✨') ? '1.5rem' : line.startsWith('💖') || line.startsWith('🌪️') || line.startsWith('🏠') || line.startsWith('🌟') ? '1.1rem' : '1rem',
                color: line.includes('✨') ? '#FFD700' : line === '' ? 'transparent' : 'rgba(255,255,255,0.92)',
                marginBottom: '6px', lineHeight: 1.9, fontWeight: 600,
              }}>
              {line || '\u00A0'}
            </motion.p>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: dialogueIdx >= DIALOGUE.length - 1 ? 1 : 0 }}
          transition={{ duration: 0.8 }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>🎊🐱🎊</div>
          <p style={{ color: '#FF6EB4', fontFamily: 'Space Mono', fontSize: '0.75rem' }}>
            Loading: Your Forever Universe... 🌸
          </p>
          <div style={{ height: '4px', background: 'rgba(255,110,180,0.15)', borderRadius: '2px', marginTop: '12px', overflow: 'hidden' }}>
            <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ delay: 0.5, duration: 6 }}
              style={{ height: '100%', background: 'linear-gradient(90deg, #FF6EB4, #FF1493)', borderRadius: '2px' }} />
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
