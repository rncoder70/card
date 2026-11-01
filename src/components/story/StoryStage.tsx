import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, ArrowRight, SkipForward } from 'lucide-react'
import { SceneBlend, SceneCouple, SceneFlavours, SceneOnce, SceneRoyal } from './Scenes'
import { Kalash, PlantainTree, TempleBorder, Thoranam } from '../illustrations/Ornaments'
import { useDelight } from '../ui/delightContext'
import { easterEggs, story } from '../../data/wedding'

type Mood = 'storybook' | 'romance' | 'royal'

interface SceneDef {
  id: string
  label: string
  mood: Mood
  cta: string
}

const SCENES: SceneDef[] = [
  { id: 'once', label: 'Once upon a time', mood: 'storybook', cta: story.once.cta },
  { id: 'flavours', label: 'Two different flavours', mood: 'storybook', cta: 'Continue' },
  { id: 'blend', label: 'A perfect blend', mood: 'storybook', cta: 'Continue' },
  { id: 'couple', label: 'The two little cups had names', mood: 'romance', cta: 'Continue' },
  { id: 'royal', label: 'The wedding', mood: 'royal', cta: '' },
]

interface Props {
  onOpenInvitation: () => void
  onSkip: () => void
}

export function StoryStage({ onOpenInvitation, onSkip }: Props) {
  const [index, setIndex] = useState(0)
  const scene = SCENES[index]
  const isRoyal = scene.mood === 'royal'
  const last = index === SCENES.length - 1
  const stage = useRef<HTMLDivElement>(null)
  const firstRender = useRef(true)
  const { note, celebrate } = useDelight()

  const next = useCallback(() => setIndex((i) => Math.min(i + 1, SCENES.length - 1)), [])
  const back = useCallback(() => setIndex((i) => Math.max(i - 1, 0)), [])

  // Arrow keys move through the story on desktop.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') back()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, back])

  // Move focus to the new scene's heading so assistive tech follows the story.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    const t = window.setTimeout(() => stage.current?.querySelector<HTMLElement>('[data-scene-title]')?.focus({ preventScroll: true }), 650)
    return () => window.clearTimeout(t)
  }, [index])

  const renderScene = () => {
    switch (scene.id) {
      case 'once':
        return <SceneOnce />
      case 'flavours':
        return <SceneFlavours />
      case 'blend':
        return <SceneBlend />
      case 'couple':
        return <SceneCouple />
      default:
        return <SceneRoyal onOpen={onOpenInvitation} />
    }
  }

  return (
    <section aria-label="The story of two little cups" className={`relative flex min-h-[100svh] flex-col overflow-x-clip ${isRoyal ? '' : 'on-ivory'}`}>
      {/* Mood backdrops cross-fade (opacity only — cheap on phones). */}
      <div className="sandal-kolam absolute inset-0" aria-hidden="true" />
      <motion.div
        className="marigold-glow absolute inset-0"
        initial={false}
        animate={{ opacity: scene.mood === 'romance' ? 1 : 0 }}
        transition={{ duration: 1.2 }}
        aria-hidden="true"
      />
      <motion.div className="royal-pattern absolute inset-0" initial={false} animate={{ opacity: isRoyal ? 1 : 0 }} transition={{ duration: 1.6 }} aria-hidden="true" />
      {/* Wedding-hall dressing: silk borders, thoranam, plantain trees at the entrance */}
      <AnimatePresence>
        {!isRoyal && (
          <motion.div key="decor" className="pointer-events-none absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} aria-hidden="true">
            <TempleBorder className="absolute inset-x-0 top-0" />
            <Thoranam className="absolute inset-x-0 top-[76px] sm:top-[84px]" />
            <PlantainTree className="absolute bottom-0 -left-16 h-[38%] w-auto sm:-left-6 sm:h-[52%]" />
            <PlantainTree flip className="absolute -right-16 bottom-0 h-[38%] w-auto sm:-right-6 sm:h-[52%]" />
            <TempleBorder flip className="absolute inset-x-0 bottom-0" />
          </motion.div>
        )}
      </AnimatePresence>
      {/* Easter egg: tap the purna kumbham */}
      <AnimatePresence>
        {!isRoyal && (
          <motion.button
            key="kalash"
            type="button"
            onClick={() => {
              celebrate('petals')
              note(easterEggs.kalash)
            }}
            aria-label="Brass purna kumbham with mango leaves and a coconut. Tap it"
            className="absolute bottom-[88px] left-3 z-20 h-16 w-14 rounded-xl sm:bottom-24 sm:left-24 sm:h-24 sm:w-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          >
            <Kalash className="h-full w-full" />
          </motion.button>
        )}
      </AnimatePresence>
      
      {/* Top bar */}
      <header className="relative z-20 flex items-center justify-between px-4 pt-[calc(max(0.75rem,env(safe-area-inset-top))+22px)] sm:px-8">
        <p className={`font-display text-lg tracking-wide italic ${isRoyal ? 'text-gold-light' : 'text-coffee'}`}>
          <span className="sr-only">Gayathri and Arjun — </span>
          <span aria-hidden="true">G</span>
          <span aria-hidden="true" className="mx-1 text-sm">
            ♡
          </span>
          <span aria-hidden="true">A</span>
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onSkip}
            className={`inline-flex h-10 items-center gap-1.5 rounded-full border px-4 text-xs font-semibold tracking-wide transition ${
              isRoyal ? 'border-gold/50 text-gold-light hover:bg-white/10' : 'border-coffee/25 bg-sandal/85 text-coffee hover:bg-white'
            }`}
          >
            Skip to invitation
            <SkipForward className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Scene */}
      <div ref={stage} className="relative z-10 flex flex-1 items-center justify-center px-5 py-6 sm:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={scene.id}
            className={`flex w-full justify-center ${isRoyal ? 'self-stretch' : ''}`}
            initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {renderScene()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom navigation */}
      <nav aria-label="Story navigation" className="relative z-20 flex items-center justify-between gap-3 px-4 pb-[calc(max(0.75rem,env(safe-area-inset-bottom))+22px)] sm:px-8">
        <button
          type="button"
          onClick={back}
          disabled={index === 0}
          aria-label="Previous scene"
          className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition disabled:pointer-events-none disabled:opacity-0 ${
            isRoyal ? 'border-gold/50 text-gold-light hover:bg-white/10' : 'border-coffee/25 bg-sandal/85 text-coffee hover:bg-white'
          }`}
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className={`flex items-center gap-1 rounded-full px-2.5 py-2 ${isRoyal ? '' : 'bg-sandal/85 backdrop-blur-sm'}`} aria-hidden="true">
          {SCENES.map((s, i) => (
            <span
              key={s.id}
              className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? 'w-5' : 'w-1.5'} ${
                isRoyal ? (i <= index ? 'bg-gold' : 'bg-gold/30') : i <= index ? 'bg-wine' : 'bg-coffee/25'
              }`}
            />
          ))}
        </div>
        <p className="sr-only" aria-live="polite">
          Scene {index + 1} of {SCENES.length}: {scene.label}
        </p>

        {last ? (
          <span className="h-11 w-11" aria-hidden="true" />
        ) : (
          <button
            type="button"
            onClick={next}
            className={`inline-flex h-11 items-center gap-2 rounded-full px-5 text-[13px] whitespace-nowrap font-bold tracking-wide shadow-[0_8px_20px_-10px_rgb(59_42_32/0.6)] transition active:scale-[0.97] ${
              index === 0 ? 'bg-wine text-sandal ring-2 ring-turmeric/60 hover:bg-wine-deep' : 'bg-wine text-sandal hover:bg-wine-deep'
            }`}
          >
            {scene.cta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </nav>
    </section>
  )
}
