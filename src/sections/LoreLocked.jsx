import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const HAPPY_CAT = 'https://media0.giphy.com/media/Zl7u48zLVFgLpRwq6f/giphy.gif'

const LORE_CARDS = [
  { emoji: '🎭', title: 'The Main Characters', text: 'In every story, there are people who make everything more alive. You are definitely one of them — and this whole website is proof.', color: '#FF6EB4' },
  { emoji: '😭', title: 'Professional Cry-Babies', text: 'We have collectively enjoyed movies, wholesome memes, each other\'s stories, and absolutely nothing. Emotionally consistent. Thriving.', color: '#C8A2C8' },
  { emoji: '🐱', title: 'Certified Cat People', text: 'If there are cats in the room, we find them. If there are no cats, we become the cats. This is not a choice, it is a calling.', color: '#FFD700' },
  { emoji: '⚡', title: 'Chaos + Calm', text: 'Together: maximum chaos. Separately: somehow still chaotic. The dynamic is perfectly imperfect and that is exactly why it works.', color: '#89CFF0' },
  { emoji: '💅', title: 'Certified Girlies', text: 'We collectively have the energy of every protagonist who ever said "I\'m fine" while clearly not being fine. We are thriving.', color: '#FF1493' },
  { emoji: '🌈', title: 'Best Friend Energy', text: 'Some people enter your life and just become permanent. Kaviya is that kind of permanent — warm, funny, wonderful, irreplaceable.', color: '#FF6EB4' },
]

const LOVE_CARDS = [
  { emoji: '😂', text: 'your laugh' }, { emoji: '🌪️', text: 'your chaos' },
  { emoji: '✨', text: 'your existence' }, { emoji: '🤡', text: 'your chaotic decisions' },
  { emoji: '🫂', text: 'your kindness' }, { emoji: '😼', text: 'your cat energy' },
  { emoji: '🌸', text: 'your soft heart' }, { emoji: '💬', text: 'your voice' },
  { emoji: '🔮', text: 'your beautiful brain' }, { emoji: '⭐', text: 'literally everything' },
]

const FOREVER_STATS = [
  { label: 'Happiness Level', value: 100, max: 100, color: '#FF6EB4' },
  { label: 'Chaos Synchronization', value: 97, max: 100, color: '#FF1493' },
  { label: 'Emotional Support', value: 100, max: 100, color: '#C8A2C8' },
  { label: 'Meme Compatibility', value: 100, max: 100, color: '#FFD700' },
  { label: 'Energy', value: 99, max: 100, color: '#89CFF0' },
  { label: 'Forever Rating', value: 999, max: 999, color: '#FF6EB4' },
]

function StatBar({ label, value, max, color }) {
  const pct = Math.min(100, (value / max) * 100)
  return (
    <div style={{ marginBottom: '18px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
        <span style={{ color: 'rgba(255,255,255,0.88)', fontFamily: 'Nunito', fontSize: '0.9rem', fontWeight: 600 }}>{label}</span>
        <span style={{ color, fontFamily: 'Space Mono', fontSize: '0.78rem', fontWeight: 700 }}>
          {value === 999 ? '∞' : `${value}%`}
        </span>
      </div>
      <div style={{ height: '10px', background: 'rgba(255,255,255,0.07)', borderRadius: '5px', overflow: 'hidden' }}>
        <motion.div initial={{ width: 0 }} whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }} transition={{ duration: 1.4, ease: 'easeOut', delay: 0.2 }}
          style={{ height: '100%', background: `linear-gradient(90deg, ${color}77, ${color})`, borderRadius: '5px' }} />
      </div>
    </div>
  )
}

function ForeverAgreement({ onClose }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose} style={{
        position: 'fixed', inset: 0, zIndex: 99990, background: 'rgba(0,0,0,0.85)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px', backdropFilter: 'blur(12px)',
      }}>
      <motion.div initial={{ scale: 0.7, rotate: -4 }} animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0.7 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        onClick={e => e.stopPropagation()}
        style={{
          background: 'linear-gradient(135deg, #1A0035, #0D0015)',
          border: '2px solid rgba(255,215,0,0.35)',
          borderRadius: '24px', padding: '40px', maxWidth: '500px', width: '100%',
          boxShadow: '0 0 60px rgba(255,215,0,0.15)',
        }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>📜✨</div>
          <h2 style={{ fontFamily: 'Dancing Script', fontSize: '2rem', color: '#FFD700', marginBottom: '4px' }}>
            The Forever Agreement
          </h2>
          <p style={{ fontFamily: 'Space Mono', fontSize: '0.62rem', color: 'rgba(255,215,0,0.45)' }}>
            ESTABLISHED 2026 · BETWEEN KAVIYA & OVIYA
          </p>
        </div>
        <div style={{
          background: 'rgba(255,215,0,0.05)', border: '1px solid rgba(255,215,0,0.15)',
          borderRadius: '14px', padding: '22px', marginBottom: '24px',
        }}>
          {[
            'We, the parties of this agreement, hereby promise to:',
            '',
            '💖 Always support each other without judgment',
            '🌙 Continue sending memes at unreasonable hours',
            '🫂 Protect each other during emotional crises',
            '🌪️ Maintain maximum chaos responsibly',
            '🐱 Stay each other\'s comfort person, forever',
            '⭐ Celebrate each other relentlessly',
            '',
            'This agreement is eternal, unconditional, and non-negotiable.',
          ].map((line, i) => (
            <p key={i} style={{
              fontFamily: 'Nunito', fontSize: '0.88rem',
              color: line.startsWith('💖') || line.startsWith('🌙') || line.startsWith('🫂') || line.startsWith('🌪️') || line.startsWith('🐱') || line.startsWith('⭐') ? 'rgba(255,240,200,0.9)' : line === '' ? 'transparent' : '#FFD700',
              fontWeight: line.includes('parties') ? 700 : 500,
              marginBottom: '8px', lineHeight: 1.75,
            }}>{line || '\u00A0'}</p>
          ))}
        </div>
        <div style={{ textAlign: 'center' }}>
          <button onClick={onClose} style={{
            background: 'linear-gradient(135deg, #FF6EB4, #FF1493)',
            border: 'none', borderRadius: '50px', padding: '14px 36px',
            color: 'white', fontFamily: 'Nunito', fontWeight: 800,
            fontSize: '1rem', cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(255,20,147,0.3)',
          }}>
            ✨ I Accept Forever
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function LoreLocked({ onDone, onEasterEgg }) {
  const [showContract, setShowContract] = useState(false)

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0D0015 0%, #1A0035 50%, #0D0015 100%)',
      padding: '80px 20px 60px', zIndex: 3, position: 'relative',
    }}>
      <style>{`
        @keyframes shimmer { 0%{background-position:0% center} 100%{background-position:300% center} }
        @keyframes gifFloat { 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-14px) rotate(2deg)} }
      `}</style>

      <AnimatePresence>{showContract && <ForeverAgreement onClose={() => setShowContract(false)} />}</AnimatePresence>

      {/* Cat GIF floating */}
      <img src={HAPPY_CAT} alt="happy cat" style={{
        position: 'fixed', right: '2%', bottom: '15%', width: '90px',
        borderRadius: '16px', border: '2px solid rgba(255,110,180,0.3)',
        boxShadow: '0 0 20px rgba(255,110,180,0.15)',
        animation: 'gifFloat 5s ease-in-out infinite', zIndex: 5,
        opacity: 0.9,
      }} />

      {/* ── OUR LORE ── */}
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.8 }}
        style={{ maxWidth: '940px', margin: '0 auto 90px', textAlign: 'center' }}>

        <h2 style={{
          fontFamily: 'Dancing Script', fontSize: 'clamp(2rem, 6vw, 4rem)',
          background: 'linear-gradient(135deg, #FF6EB4, #FFD700)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text', animation: 'shimmer 4s linear infinite',
          backgroundSize: '300%', marginBottom: '8px',
        }}>✨ Our Story ✨</h2>
        <p style={{ color: 'rgba(255,182,193,0.55)', fontFamily: 'Nunito', marginBottom: '44px', fontSize: '0.95rem' }}>
          Kaviya's universe, documented for the record. Click a card!
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(265px, 1fr))', gap: '22px' }}>
          {LORE_CARDS.map((card, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, rotate: 0, y: -8 }}
              onClick={() => onEasterEgg({ title: card.title, content: card.text, emoji: card.emoji, bg: `linear-gradient(135deg, ${card.color}33, #1A0035)` })}
              style={{
                background: 'rgba(13,0,21,0.78)', border: `1px solid ${card.color}44`,
                borderRadius: '22px', padding: '30px 26px',
                boxShadow: `0 6px 24px ${card.color}18`,
                cursor: 'pointer',
                transform: i % 2 === 0 ? 'rotate(-1.2deg)' : 'rotate(1.2deg)',
                transition: 'all 0.3s ease', backdropFilter: 'blur(16px)',
              }}>
              <div style={{ fontSize: '42px', marginBottom: '14px' }}>{card.emoji}</div>
              <h3 style={{ fontFamily: 'Dancing Script', fontSize: '1.5rem', color: card.color, marginBottom: '12px' }}>
                {card.title}
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.78)', fontFamily: 'Nunito', fontSize: '0.875rem', lineHeight: 1.8 }}>
                {card.text}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── THINGS I LOVE ── */}
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.8 }}
        style={{ maxWidth: '740px', margin: '0 auto 90px', textAlign: 'center' }}>

        <h2 style={{
          fontFamily: 'Dancing Script', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#FF6EB4',
          marginBottom: '8px', textShadow: '0 0 30px rgba(255,110,180,0.35)',
        }}>💖 Things I Love About You, Kaviya</h2>
        <p style={{ color: 'rgba(255,182,193,0.45)', fontFamily: 'Nunito', marginBottom: '32px', fontSize: '0.9rem' }}>
          (Seriously non-exhaustive — the full list would need its own website.)
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
          {LOVE_CARDS.map((item, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, type: 'spring', stiffness: 220 }}
              whileHover={{ scale: 1.18, y: -6 }}
              style={{
                background: 'rgba(255,110,180,0.1)', border: '1px solid rgba(255,110,180,0.28)',
                borderRadius: '50px', padding: '10px 22px',
                color: '#FFB6C1', fontFamily: 'Nunito', fontWeight: 700, fontSize: '0.92rem',
                cursor: 'default', backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease', boxShadow: '0 4px 14px rgba(255,110,180,0.07)',
              }}>
              {item.emoji} {item.text}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── FOREVER REPORT ── */}
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.8 }}
        style={{ maxWidth: '620px', margin: '0 auto 60px', textAlign: 'center' }}>

        <h2 style={{
          fontFamily: 'Dancing Script', fontSize: 'clamp(1.8rem, 5vw, 3rem)', color: '#FFD700',
          marginBottom: '6px', textShadow: '0 0 20px rgba(255,215,0,0.3)',
        }}>🌟 Forever Report</h2>
        <p style={{ color: 'rgba(255,182,193,0.45)', fontFamily: 'Space Mono', fontSize: '0.68rem', marginBottom: '30px' }}>
          Carefully calculated by the universe itself.
        </p>

        <div style={{
          background: 'rgba(13,0,21,0.82)', border: '1px solid rgba(255,215,0,0.2)',
          borderRadius: '26px', padding: '34px', backdropFilter: 'blur(20px)',
          boxShadow: '0 0 50px rgba(255,215,0,0.07)',
        }}>
          {FOREVER_STATS.map((stat, i) => <StatBar key={i} {...stat} />)}
          <p style={{ color: 'rgba(255,215,0,0.6)', fontFamily: 'Space Mono', fontSize: '0.68rem', marginTop: '22px' }}>
            ✨ VERDICT: Wonderfully compatible. Proceed with infinite warmth.
          </p>
        </div>
      </motion.div>

      {/* ── ACTIONS ── */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }} transition={{ delay: 0.3 }}
        style={{ textAlign: 'center', display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button onClick={() => setShowContract(true)} style={{
          background: 'rgba(255,215,0,0.08)', border: '1px solid rgba(255,215,0,0.35)',
          borderRadius: '50px', padding: '12px 28px', color: '#FFD700',
          fontFamily: 'Nunito', fontWeight: 700, fontSize: '0.9rem',
          cursor: 'pointer', transition: 'all 0.3s ease',
          backdropFilter: 'blur(10px)',
        }}>
          📜 The Forever Agreement
        </button>
        <button onClick={onDone} className="yes-btn" style={{ fontSize: '1.05rem', padding: '14px 44px' }}>
          💌 Read the Letter
        </button>
      </motion.div>
    </div>
  )
}
