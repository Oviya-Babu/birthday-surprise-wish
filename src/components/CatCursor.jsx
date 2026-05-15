import { useEffect, useRef, useState } from 'react'

export default function CatCursor() {
  const cursorRef = useRef(null)
  const trailsRef = useRef([])
  const [pawPrints, setPawPrints] = useState([])
  const pos = useRef({ x: -100, y: -100 })
  const pawId = useRef(0)

  useEffect(() => {
    const move = (e) => {
      const x = e.clientX
      const y = e.clientY
      pos.current = { x, y }
      if (cursorRef.current) {
        cursorRef.current.style.left = x + 'px'
        cursorRef.current.style.top = y + 'px'
      }
    }

    const click = (e) => {
      const id = pawId.current++
      const paw = {
        id,
        x: e.clientX,
        y: e.clientY,
        emoji: ['🐾', '💖', '✨', '🌸', '⭐'][Math.floor(Math.random() * 5)]
      }
      setPawPrints(prev => [...prev.slice(-12), paw])
      setTimeout(() => {
        setPawPrints(prev => prev.filter(p => p.id !== id))
      }, 1500)
    }

    document.addEventListener('mousemove', move)
    document.addEventListener('click', click)
    return () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('click', click)
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="custom-cursor"
        style={{ position: 'fixed', zIndex: 99999, pointerEvents: 'none' }}
      >
        <span style={{ fontSize: '18px', lineHeight: 1 }}>🐾</span>
      </div>

      {pawPrints.map(paw => (
        <div
          key={paw.id}
          style={{
            position: 'fixed',
            left: paw.x,
            top: paw.y,
            transform: 'translate(-50%, -50%)',
            fontSize: '20px',
            pointerEvents: 'none',
            zIndex: 99998,
            animation: 'fadeIn 0.2s ease forwards, fadeOut 1s ease 0.5s forwards',
          }}
        >
          {paw.emoji}
        </div>
      ))}

      <style>{`
        @keyframes fadeOut {
          from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          to { opacity: 0; transform: translate(-50%, -80%) scale(0.5); }
        }
        .custom-cursor {
          width: 36px !important;
          height: 36px !important;
          background: transparent !important;
          box-shadow: none !important;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </>
  )
}
