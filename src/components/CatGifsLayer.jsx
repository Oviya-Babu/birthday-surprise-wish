import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { GIFS } from './catGifs'

// ─── LAZY GIF IMAGE ───────────────────────────────────────────────────────────
function CatGif({ src, alt = 'cat', style = {}, onClickEgg, reducedMotion }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <motion.img
      src={src}
      alt={alt}
      loading="lazy"
      onLoad={() => setLoaded(true)}
      onClick={onClickEgg}
      whileHover={reducedMotion ? {} : { scale: 1.12, rotate: 3, transition: { duration: 0.25 } }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={loaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        borderRadius: '18px',
        border: '2px solid rgba(255,110,180,0.25)',
        boxShadow: '0 8px 30px rgba(0,0,0,0.35)',
        cursor: onClickEgg ? 'pointer' : 'default',
        userSelect: 'none',
        ...style,
      }}
    />
  )
}

// ─── RACING CAT ───────────────────────────────────────────────────────────────
function RacingCat({ reducedMotion }) {
  const [visible, setVisible] = useState(false)
  const [fromRight, setFromRight] = useState(false)

  useEffect(() => {
    if (reducedMotion) return
    let interval
    const launch = () => {
      const dir = Math.random() > 0.5
      setFromRight(dir)
      setVisible(true)
      setTimeout(() => setVisible(false), 3200)
    }
    const startFirst = setTimeout(launch, 8000)
    const scheduleNext = () => {
      interval = setTimeout(() => { launch(); scheduleNext() }, 25000 + Math.random() * 15000)
    }
    scheduleNext()
    return () => { clearTimeout(startFirst); clearTimeout(interval) }
  }, [reducedMotion])

  if (!visible) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.img
          key="racer"
          src={GIFS.catRacing}
          alt="racing cat"
          loading="lazy"
          initial={{ x: fromRight ? '110vw' : '-120px', opacity: 0 }}
          animate={{ x: fromRight ? '-120px' : '110vw', opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3.0, ease: 'linear' }}
          style={{
            position: 'fixed',
            bottom: '15%',
            width: '110px',
            zIndex: 9999,
            pointerEvents: 'none',
            transform: fromRight ? 'scaleX(-1)' : 'scaleX(1)',
            filter: 'drop-shadow(0 4px 14px rgba(255,110,180,0.4))',
          }}
        />
      )}
    </AnimatePresence>
  )
}

// ─── PHASE GIF CONFIG ─────────────────────────────────────────────────────────
const PHASE_GIFS = {
  intro: [
    { src: GIFS.introCry,    top: '8%',    right: '2%',   width: 92, delay: 0.4 },
    { src: GIFS.introParty,  bottom: '18%', left: '2%',   width: 86, delay: 0.9 },
    { src: GIFS.introDance,  bottom: '10%', right: '4%',  width: 80, delay: 1.5 },
    { src: GIFS.introOwl,    top: '55%',   left: '2%',   width: 76, delay: 2.1 },
  ],
  proposal: [
    { src: GIFS.happyBop,    top: '10%',   left: '3%',   width: 80, delay: 0.5 },
    { src: GIFS.floatPeek,   bottom: '18%', right: '3%', width: 72, delay: 1.0 },
  ],
  yes: [
    { src: GIFS.celebCat1,   top: '8%',    right: '2%',  width: 100, delay: 0.3 },
    { src: GIFS.dancing,     bottom: '14%', left: '2%',  width: 90,  delay: 0.7 },
    { src: GIFS.celebCat2,   top: '55%',   right: '4%', width: 80,  delay: 1.2 },
  ],
  no: [
    { src: GIFS.sadCry1,     top: '12%',   left: '3%',   width: 90, delay: 0.4 },
    { src: GIFS.sadCry2,     top: '10%',   right: '3%',  width: 84, delay: 0.9 },
  ],
  lore: [
    { src: GIFS.floatBlep,   bottom: '12%', right: '2%', width: 76, delay: 0.5 },
    { src: GIFS.happyVibing, top: '18%',   left: '2%',   width: 80, delay: 1.1 },
  ],
  letter: [
    { src: GIFS.floatPeek,   top: '14%',   right: '3%',  width: 68, delay: 0.6 },
    { src: GIFS.floatTiny,   bottom: '22%', left: '2%',  width: 62, delay: 1.4 },
  ],
  finale: [
    { src: GIFS.celebCat1,   top: '6%',    left: '2%',   width: 95, delay: 0.4 },
    { src: GIFS.dancing,     top: '6%',    right: '2%',  width: 88, delay: 0.8 },
    { src: GIFS.floatSleepy, bottom: '10%', left: '3%',  width: 70, delay: 1.6 },
  ],
}

// ─── MAIN LAYER ───────────────────────────────────────────────────────────────
export default function CatGifsLayer({ phase, onEasterEgg }) {
  const shouldReduceMotion = useReducedMotion()
  const gifs = PHASE_GIFS[phase] || []

  return (
    <>
      <RacingCat reducedMotion={shouldReduceMotion} />

      <AnimatePresence mode="wait">
        <motion.div
          key={phase}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 8 }}
        >
          {gifs.map((gif, i) => {
            const pos = {}
            if (gif.top    != null) pos.top    = gif.top
            if (gif.bottom != null) pos.bottom = gif.bottom
            if (gif.left   != null) pos.left   = gif.left
            if (gif.right  != null) pos.right  = gif.right

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={shouldReduceMotion
                  ? { opacity: 0.85, y: 0, scale: 1 }
                  : { opacity: [0, 0.88, 0.78, 0.88], y: [20, 0, -8, 0], scale: [0.8, 1, 1, 1] }
                }
                transition={{
                  duration: shouldReduceMotion ? 0.4 : 6,
                  delay: gif.delay,
                  repeat: shouldReduceMotion ? 0 : Infinity,
                  repeatType: 'mirror',
                  ease: 'easeInOut',
                  times: [0, 0.15, 0.55, 1],
                }}
                style={{ position: 'absolute', ...pos, pointerEvents: onEasterEgg ? 'auto' : 'none' }}
              >
                <CatGif
                  src={gif.src}
                  reducedMotion={shouldReduceMotion}
                  onClickEgg={gif.isEasterEgg ? () => onEasterEgg?.('meme1') : null}
                  style={{
                    width: `${gif.width}px`,
                    opacity: 0.88,
                    filter: gif.width < 70
                      ? 'drop-shadow(0 4px 12px rgba(255,110,180,0.2)) blur(0.3px)'
                      : 'drop-shadow(0 6px 18px rgba(255,110,180,0.28))',
                  }}
                />
              </motion.div>
            )
          })}
        </motion.div>
      </AnimatePresence>
    </>
  )
}
