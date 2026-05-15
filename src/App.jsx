import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import IntroSection from './sections/IntroSection'
import ProposalSection from './sections/ProposalSection'
import YesSection from './sections/YesSection'
import NoSection from './sections/NoSection'
import LoreLocked from './sections/LoreLocked'
import LetterSection from './sections/LetterSection'
import FinaleSection from './sections/FinaleSection'
import CatCursor from './components/CatCursor'
import MusicPlayer from './components/MusicPlayer'
import StarField from './components/StarField'
import FloatingEmojis from './components/FloatingEmojis'
import EasterEggModal from './components/EasterEggModal'
import Confetti from './components/Confetti'
import CatGifsLayer from './components/CatGifsLayer'

const PHASES = {
  INTRO: 'intro',
  PROPOSAL: 'proposal',
  YES: 'yes',
  NO: 'no',
  LORE: 'lore',
  LETTER: 'letter',
  FINALE: 'finale',
}

const PHASE_ORDER = ['intro', 'proposal', 'lore', 'letter', 'finale']

// Phase indicator dots (only for main journey)
function PhaseIndicator({ phase }) {
  const steps = [
    { id: 'intro', label: '🌌' },
    { id: 'proposal', label: '💖' },
    { id: 'lore', label: '📖' },
    { id: 'letter', label: '💌' },
    { id: 'finale', label: '🎆' },
  ]
  const currentIdx = steps.findIndex(s => s.id === phase)
  if (['yes', 'no'].includes(phase)) return null

  return (
    <div style={{
      position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)',
      display: 'flex', gap: '10px', zIndex: 1000, alignItems: 'center',
    }}>
      {steps.map((step, i) => (
        <div key={step.id} style={{
          width: i === currentIdx ? '28px' : '10px',
          height: '10px',
          borderRadius: '5px',
          background: i <= currentIdx ? 'linear-gradient(90deg, #FF6EB4, #FF1493)' : 'rgba(255,255,255,0.15)',
          transition: 'all 0.4s ease',
          boxShadow: i === currentIdx ? '0 0 10px rgba(255,110,180,0.8)' : 'none',
        }} />
      ))}
    </div>
  )
}

export default function App() {
  const [phase, setPhase] = useState(PHASES.INTRO)
  const [musicMode, setMusicMode] = useState('romantic')
  const [easterEgg, setEasterEgg] = useState(null)
  const [noClickCount, setNoClickCount] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)

  const goTo = (p) => setPhase(p)

  const handleYes = () => {
    setMusicMode('chaos')
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 4000)
    goTo(PHASES.YES)
    setTimeout(() => goTo(PHASES.LORE), 8000)
  }

  const handleNo = () => {
    setMusicMode('sad')
    setNoClickCount(c => c + 1)
    goTo(PHASES.NO)
  }

  const handleForceYes = () => {
    setMusicMode('chaos')
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 4000)
    goTo(PHASES.YES)
    setTimeout(() => goTo(PHASES.LORE), 8000)
  }

  const handleLoreDone = () => {
    setMusicMode('emotional')
    goTo(PHASES.LETTER)
  }

  const handleLetterDone = () => {
    setMusicMode('cinematic')
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 5000)
    goTo(PHASES.FINALE)
  }

  const handleIntroDone = () => goTo(PHASES.PROPOSAL)

  // Back navigation map
  const BACK_MAP = {
    [PHASES.PROPOSAL]: () => { setMusicMode('romantic'); goTo(PHASES.INTRO) },
    [PHASES.YES]:      () => { setMusicMode('romantic'); goTo(PHASES.PROPOSAL) },
    [PHASES.NO]:       () => { setMusicMode('romantic'); goTo(PHASES.PROPOSAL) },
    [PHASES.LORE]:     () => { setMusicMode('chaos');    goTo(PHASES.YES) },
    [PHASES.LETTER]:   () => { setMusicMode('emotional'); goTo(PHASES.LORE) },
    [PHASES.FINALE]:   () => { setMusicMode('emotional'); goTo(PHASES.LETTER) },
  }
  const handleBack = () => BACK_MAP[phase]?.()

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden', background: '#0D0015' }}>
      <CatCursor />
      <StarField />
      <MusicPlayer mode={musicMode} onModeChange={setMusicMode} />
      <PhaseIndicator phase={phase} />
      <Confetti active={showConfetti} />

      {/* Global back button — hidden on INTRO */}
      {phase !== PHASES.INTRO && (
        <button
          onClick={handleBack}
          title="Go back"
          style={{
            position: 'fixed', top: '18px', left: '18px', zIndex: 1100,
            background: 'rgba(13,0,21,0.82)',
            border: '1px solid rgba(255,110,180,0.35)',
            borderRadius: '50px',
            padding: '8px 18px',
            color: 'rgba(255,182,193,0.85)',
            fontFamily: 'Nunito', fontWeight: 700, fontSize: '0.85rem',
            cursor: 'pointer',
            backdropFilter: 'blur(14px)',
            boxShadow: '0 4px 18px rgba(255,20,147,0.12)',
            display: 'flex', alignItems: 'center', gap: '6px',
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(255,110,180,0.18)'
            e.currentTarget.style.borderColor = 'rgba(255,110,180,0.65)'
            e.currentTarget.style.color = '#FF6EB4'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(13,0,21,0.82)'
            e.currentTarget.style.borderColor = 'rgba(255,110,180,0.35)'
            e.currentTarget.style.color = 'rgba(255,182,193,0.85)'
          }}
        >
          ← Back
        </button>
      )}

      {easterEgg && (
        <EasterEggModal data={easterEgg} onClose={() => setEasterEgg(null)} />
      )}

      <AnimatePresence mode="wait">
        {phase === PHASES.INTRO && (
          <motion.div key="intro"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8 }}>
            <IntroSection onDone={handleIntroDone} onEasterEgg={setEasterEgg} />
          </motion.div>
        )}

        {phase === PHASES.PROPOSAL && (
          <motion.div key="proposal"
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7 }}>
            <ProposalSection onYes={handleYes} onNo={handleNo} noClickCount={noClickCount} />
          </motion.div>
        )}

        {phase === PHASES.YES && (
          <motion.div key="yes"
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.6, type: 'spring' }}>
            <YesSection />
          </motion.div>
        )}

        {phase === PHASES.NO && (
          <motion.div key="no"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}>
            <NoSection onForceYes={handleForceYes} clickCount={noClickCount} />
          </motion.div>
        )}

        {phase === PHASES.LORE && (
          <motion.div key="lore"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}>
            <LoreLocked onDone={handleLoreDone} onEasterEgg={setEasterEgg} />
          </motion.div>
        )}

        {phase === PHASES.LETTER && (
          <motion.div key="letter"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}>
            <LetterSection onDone={handleLetterDone} />
          </motion.div>
        )}

        {phase === PHASES.FINALE && (
          <motion.div key="finale"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}>
            <FinaleSection />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase-aware floating emojis */}
      <FloatingEmojis phase={phase} />

      {/* Phase-aware cat GIF layer — cinematic floating decorations + racing cat */}
      <CatGifsLayer phase={phase} onEasterEgg={setEasterEgg} />
    </div>
  )
}
