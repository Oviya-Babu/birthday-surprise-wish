import { motion, AnimatePresence } from 'framer-motion'

const EXTRA_CAT_GIF = 'https://media3.giphy.com/media/93mS3A87wfmOySC29W/giphy.gif'

const EASTER_EGGS = {
  meme1: {
    title: '🐱 Hidden Cat Found!',
    content: 'You found a secret cat! As a reward, here\'s a certified fact: Kaviya is the kind of person who makes the world feel lighter. Oviya said so, and Oviya is always right.',
    emoji: '😼',
    bg: 'linear-gradient(135deg, #FF6EB4, #FF1493)',
    gif: EXTRA_CAT_GIF,
  },
  pickup: {
    title: '💘 You Found a Hidden Message',
    content: '"Every universe version of me chooses you." — and I mean that in the most wholesome, warmest, most sincere way possible, Kaviya. 🌸',
    emoji: '⭐',
    bg: 'linear-gradient(135deg, #FFD700, #FF6EB4)',
  },
  secret: {
    title: '💌 Oviya\'s Secret Message for Kaviya',
    content: 'You found My secret message 💌\n\nHey, I hope this made you smile at least once. If not, I clearly need to try harder. You deserve all the magic and chaos and love in the world. Happy Birthday Queen.🌸✨',
    emoji: '🔮',
    bg: 'linear-gradient(135deg, #1A0030, #FF1493)',
    special: true,
  },
  contract: {
    title: '📜 The Forever Agreement',
    content: 'Established 2026. Between two people who somehow became each other\'s constants. Non-negotiable. Unconditional. Eternal.',
    emoji: '⚖️',
    bg: 'linear-gradient(135deg, #C8A2C8, #FF6EB4)',
  },
}

export default function EasterEggModal({ data, onClose }) {
  const egg = typeof data === 'string' ? EASTER_EGGS[data] : data
  if (!egg) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 99990,
          background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center',
          justifyContent: 'center', padding: '20px', backdropFilter: 'blur(12px)',
        }}>
        <motion.div
          initial={{ scale: 0, rotate: -8 }} animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 8 }}
          transition={{ type: 'spring', stiffness: 280, damping: 22 }}
          onClick={e => e.stopPropagation()}
          style={{
            background: egg.bg || 'linear-gradient(135deg, #FF6EB4, #FF1493)',
            borderRadius: '28px', padding: '40px',
            maxWidth: '500px', width: '100%', textAlign: 'center',
            boxShadow: '0 30px 80px rgba(255,20,147,0.4)',
            border: '2px solid rgba(255,255,255,0.2)',
          }}>

          {egg.gif && (
            <motion.img
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              src={egg.gif} alt="secret cat"
              style={{
                width: '100px', borderRadius: '16px', marginBottom: '16px',
                border: '3px solid rgba(255,255,255,0.3)',
                boxShadow: '0 0 20px rgba(0,0,0,0.3)',
              }}
            />
          )}

          {!egg.gif && (
            <div style={{ fontSize: '60px', marginBottom: '16px' }}>{egg.emoji}</div>
          )}

          <h2 style={{
            fontFamily: 'Dancing Script', fontSize: '1.85rem', color: 'white',
            marginBottom: '16px', textShadow: '0 2px 10px rgba(0,0,0,0.25)',
          }}>
            {egg.title}
          </h2>

          <p style={{
            fontFamily: 'Nunito', fontSize: '1.02rem', color: 'rgba(255,255,255,0.93)',
            lineHeight: 1.8, marginBottom: '24px', whiteSpace: 'pre-line',
          }}>
            {egg.content}
          </p>

          {egg.special && (
            <p style={{
              fontFamily: 'Dancing Script', fontSize: '1.2rem',
              color: 'rgba(255,255,255,0.7)', marginBottom: '20px', fontStyle: 'italic',
            }}>
              — Oviya ✨
            </p>
          )}

          <button onClick={onClose} style={{
            background: 'rgba(255,255,255,0.22)', border: '2px solid rgba(255,255,255,0.4)',
            borderRadius: '50px', padding: '11px 34px', color: 'white',
            fontFamily: 'Nunito', fontWeight: 700, fontSize: '1rem', cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}>
            💖 Aww, okay!
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// EASTER_EGGS used internally only
