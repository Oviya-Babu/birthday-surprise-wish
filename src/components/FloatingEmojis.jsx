import { useState, useEffect, useRef } from 'react'

const EMOJIS_BY_PHASE = {
  intro: ['💖', '✨', '🌹', '🐱', '⭐', '🌸', '💫', '🐾', '💕'],
  proposal: ['💖', '💍', '🌹', '✨', '💌', '🌸', '💗', '🥰'],
  yes: ['🎉', '💖', '🎊', '🐱', '🌹', '✨', '💃', '🎆', '💕', '🌟'],
  no: ['😭', '💔', '🌧️', '😿', '💀', '😢', '🌪️'],
  lore: ['📖', '💖', '🐱', '✨', '🌸', '🎭', '💫', '🌈'],
  letter: ['💌', '⭐', '🌙', '🏮', '🦋', '💖', '🌟', '✨'],
  finale: ['🎆', '🎇', '💖', '✨', '🌹', '🐱', '⭐', '🎊', '💕', '🌸'],
}

export default function FloatingEmojis({ phase }) {
  const [particles, setParticles] = useState([])
  const idRef = useRef(0)

  useEffect(() => {
    const emojis = EMOJIS_BY_PHASE[phase] || EMOJIS_BY_PHASE.intro
    
    const spawn = () => {
      const id = idRef.current++
      const emoji = emojis[Math.floor(Math.random() * emojis.length)]
      setParticles(prev => [
        ...prev.slice(-30),
        {
          id,
          emoji,
          x: Math.random() * 100,
          duration: 8 + Math.random() * 8,
          size: 16 + Math.random() * 20,
          delay: 0,
          drift: (Math.random() - 0.5) * 200,
        }
      ])
      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== id))
      }, 18000)
    }

    const interval = setInterval(spawn, 800)
    spawn()
    return () => clearInterval(interval)
  }, [phase])

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 2, overflow: 'hidden' }}>
      {particles.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            bottom: '-40px',
            fontSize: `${p.size}px`,
            animation: `floatUp ${p.duration}s ease-in forwards`,
            '--drift': `${p.drift}px`,
          }}
        >
          {p.emoji}
        </div>
      ))}
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 1; }
          50% { transform: translateY(-50vh) translateX(calc(var(--drift) * 0.5)) rotate(180deg); opacity: 0.8; }
          100% { transform: translateY(-110vh) translateX(var(--drift)) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
