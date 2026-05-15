import { useState, useEffect, useRef } from 'react'

export default function Confetti({ active = true, colors }) {
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const particles = useRef([])

  const COLORS = colors || [
    '#FF6EB4', '#FF1493', '#FFD700', '#C8A2C8',
    '#89CFF0', '#FFB6C1', '#FF0054', '#FFF8F0',
  ]

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let w = window.innerWidth
    let h = window.innerHeight
    canvas.width = w
    canvas.height = h

    // Spawn initial burst
    for (let i = 0; i < 120; i++) {
      particles.current.push({
        x: w / 2 + (Math.random() - 0.5) * 200,
        y: h / 2,
        vx: (Math.random() - 0.5) * 14,
        vy: -Math.random() * 16 - 4,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 6 + Math.random() * 8,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 8,
        shape: Math.random() > 0.5 ? 'rect' : 'circle',
        gravity: 0.3 + Math.random() * 0.2,
        opacity: 1,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      particles.current = particles.current.filter(p => p.opacity > 0.01)

      for (const p of particles.current) {
        p.x += p.vx
        p.vy += p.gravity
        p.y += p.vy
        p.rotation += p.rotationSpeed
        p.vx *= 0.99
        if (p.y > h) p.opacity -= 0.05
        else if (p.y < 0) p.vy = Math.abs(p.vy)

        ctx.save()
        ctx.globalAlpha = Math.max(0, p.opacity)
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.fillStyle = p.color
        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2)
        } else {
          ctx.beginPath()
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.restore()
      }

      animRef.current = requestAnimationFrame(draw)
    }
    draw()

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w
      canvas.height = h
    }
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [active])

  if (!active) return null
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', inset: 0,
        pointerEvents: 'none', zIndex: 50,
      }}
    />
  )
}
