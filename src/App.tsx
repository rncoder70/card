import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'motion/react'
import { StoryStage } from './components/story/StoryStage'
import { InvitationPage } from './components/invitation/InvitationPage'
import { Doors } from './components/invitation/Doors'
import { ChaiCup } from './components/illustrations/Cups'
import { DelightProvider } from './components/ui/Delight'
import { MusicProvider } from './components/ui/Music'
import { useDelight } from './components/ui/delightContext'
import { useSecretWord } from './lib/useSecretWord'
import { easterEggs } from './data/wedding'

type Phase = 'loading' | 'story' | 'invitation'

/** Linking to /#invitation opens the invitation directly (handy for reminders). */
const startsAtInvitation = () => window.location.hash === '#invitation'

function Loader() {
  return (
    <motion.div
      className="sandal-kolam fixed inset-0 z-50 flex flex-col items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      role="status"
      aria-label="Brewing your invitation"
    >
      <ChaiCup expression="calm" className="bob relative h-28 w-auto" />
      <p className="relative mt-4 font-display text-xl text-coffee italic" aria-hidden="true">
        Brewing something special…
      </p>
    </motion.div>
  )
}

function Experience() {
  const [phase, setPhase] = useState<Phase>('loading')
  const [doors, setDoors] = useState(false)
  const [storyKey, setStoryKey] = useState(0)
  const reduce = useReducedMotion()
  const { note, celebrate } = useDelight()

  // Wait briefly for the display fonts so the names don't flash in a fallback face.
  useEffect(() => {
    let done = false
    const go = () => {
      if (done) return
      done = true
      setPhase(startsAtInvitation() ? 'invitation' : 'story')
    }
    const cap = window.setTimeout(go, 1600)
    Promise.all([document.fonts.ready, new Promise((r) => setTimeout(r, 500))]).then(go)
    return () => window.clearTimeout(cap)
  }, [])

  const openInvitation = useCallback(
    (withDoors: boolean) => {
      window.history.replaceState(null, '', '#invitation')
      window.scrollTo(0, 0)
      setPhase('invitation')
      if (withDoors && !reduce) setDoors(true)
    },
    [reduce],
  )

  const replay = useCallback(() => {
    window.history.replaceState(null, '', window.location.pathname + window.location.search)
    window.scrollTo(0, 0)
    setStoryKey((k) => k + 1)
    setPhase('story')
  }, [])

  // Desktop Easter egg: type "chai" or "coffee" anywhere.
  const onSecret = useCallback(() => {
    celebrate('hearts')
    note(easterEggs.secretWord.message)
  }, [celebrate, note])
  useSecretWord(easterEggs.secretWord.words, onSecret)

  return (
    <>
      <AnimatePresence>{phase === 'loading' && <Loader key="loader" />}</AnimatePresence>
      {phase === 'story' && <StoryStage key={storyKey} onOpenInvitation={() => openInvitation(true)} onSkip={() => openInvitation(false)} />}
      {phase === 'invitation' && (
        <motion.div initial={{ opacity: doors ? 1 : 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <InvitationPage onReplay={replay} />
        </motion.div>
      )}
      {doors && <Doors onDone={() => setDoors(false)} />}
    </>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <MusicProvider>
        <DelightProvider>
          <Experience />
        </DelightProvider>
      </MusicProvider>
    </MotionConfig>
  )
}
