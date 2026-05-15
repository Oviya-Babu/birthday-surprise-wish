const PICKUP_LINES = [
  "You make ordinary days feel magical. 🌙",
  "You're my favorite notification. 🔔",
  "The universe definitely has favorites. ✨",
  "You're the reason chaos feels comforting. 🌪️",
  "Even my playlist misses you. 🎵",
  "You glow brighter than my screen at 3am. 💻",
  "You are proof that beautiful souls exist. 🌸",
  "Every meme is funnier with you. 😂",
  "You're basically serotonin in human form. 🧠",
  "The stars seem calmer around you. ⭐",
  "You make life feel softer. 🌷",
  "You're my comfort person forever. 🏠",
  "If happiness had a face, it'd look like you. 😊",
  "Every universe version of me chooses you. 🌌",
  "You are my favorite kind of wonderful. 💖",
  "You make the ordinary feel extraordinary. ✨",
  "You're the pink in my RGB. 🌸",
  "You are my emotional support human. 🐾",
  "Life is better in your orbit. 🪐",
  "You are irreplaceable. Period. 👑",
]

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function PickupLines() {
  const [visibleLines, setVisibleLines] = useState([])
  const idRef = useRef(0)

  useEffect(() => {
    const spawn = () => {
      const id = idRef.current++
      const line = PICKUP_LINES[Math.floor(Math.random() * PICKUP_LINES.length)]
      const x = 4 + Math.random() * 55
      setVisibleLines(prev => [...prev.slice(-6), { id, text: line, x, side: x > 40 ? 'right' : 'left' }])
      setTimeout(() => setVisibleLines(prev => prev.filter(l => l.id !== id)), 5000)
    }
    const t = setInterval(spawn, 2800)
    setTimeout(spawn, 600)
    return () => clearInterval(t)
  }, [])

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 5 }}>
      {visibleLines.map(line => (
        <motion.div key={line.id}
          initial={{ opacity: 0, x: line.side === 'right' ? 80 : -80, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            top: `${14 + Math.random() * 62}%`,
            left: `${line.x}%`,
            background: 'rgba(255,110,180,0.12)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,110,180,0.35)',
            borderRadius: '20px',
            padding: '10px 18px',
            maxWidth: '240px',
            fontFamily: 'Nunito',
            fontSize: '0.8rem',
            color: 'rgba(255,255,255,0.88)',
            fontWeight: 600,
            boxShadow: '0 4px 20px rgba(255,110,180,0.15)',
          }}>
          {line.text}
        </motion.div>
      ))}
    </div>
  )
}
