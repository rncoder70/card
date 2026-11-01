import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Heart } from 'lucide-react'
import { TappableCup } from './TappableCup'
import { ChaiCup, CoffeeCup } from '../illustrations/Cups'
import { CoupleIllustration } from '../illustrations/CoupleIllustration'
import { Divider, GoldParticles, JasmineGarland, Nilavilakku, OrnateFrame, Sparkle } from '../illustrations/Ornaments'
import { FallingJasmine } from '../illustrations/Sky'
import { FadeUp, LetterReveal } from '../ui/Reveal'
import { useDelight } from '../ui/delightContext'
import { easterEggs, story, wedding } from '../../data/wedding'

const ease = [0.22, 1, 0.36, 1] as const
const { bride, groom } = wedding.couple

/** Heading that receives focus when its scene appears, so screen readers follow along. */
function SceneTitle({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 data-scene-title tabIndex={-1} className={`outline-none ${className}`}>
      {children}
    </h2>
  )
}

/* ── Scene 1 · Once upon a time ─────────────────────────────────────────── */
export function SceneOnce() {
  return (
    <div className="relative flex w-full max-w-xl flex-col items-center text-center">
      <FadeUp className="mb-2 text-[11px] font-bold tracking-[0.35em] text-terracotta-deep uppercase">A Perfect Blend</FadeUp>
      <FadeUp delay={0.1}>
        <Divider className="mb-14 h-4 w-40" />
      </FadeUp>
      <div className="flex w-full items-end justify-center gap-6 sm:gap-14">
        <motion.div className="bob w-32 sm:w-40" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.1, ease }}>
          <TappableCup kind="chai" expression="calm" look={2} infuse />
        </motion.div>
        <motion.div className="bob-alt w-32 sm:w-40" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.1, delay: 0.15, ease }}>
          <TappableCup kind="coffee" expression="open" look={-2} infuse />
        </motion.div>
      </div>
      <SceneTitle className="mt-8 font-display text-[1.9rem] leading-tight font-medium text-ink sm:text-4xl">
        <FadeUp as="span" delay={0.7} className="block">
          {story.once.lines[0]}
        </FadeUp>
      </SceneTitle>
      <FadeUp as="p" delay={1.8} className="mt-3 max-w-sm font-display text-xl text-coffee italic sm:text-2xl">
        {story.once.lines[1]}
      </FadeUp>
    </div>
  )
}

/* ── Scene 2 · Two different flavours ───────────────────────────────────── */
export function SceneFlavours() {
  const { chai, coffee } = story.flavours
  return (
    <div className="relative flex w-full max-w-2xl flex-col items-center text-center">
      <div className="grid w-full grid-cols-2 gap-4 sm:gap-10">
        {[
          { kind: 'chai' as const, info: chai, delay: 0.1 },
          { kind: 'coffee' as const, info: coffee, delay: 0.7 },
        ].map(({ kind, info, delay }) => (
          <motion.div key={kind} className="flex flex-col items-center" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay, ease }}>
            <div className={`${kind === 'chai' ? 'bob' : 'bob-alt'} w-28 sm:w-40`}>
              <TappableCup kind={kind} expression={kind === 'chai' ? 'calm' : 'wink'} infuse />
            </div>
            <h3 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">{info.name}</h3>
            <span className="my-1.5 block h-px w-10 bg-gold" aria-hidden="true" />
            <p className="max-w-[12rem] text-[15px] leading-relaxed text-coffee sm:text-base">{info.traits}</p>
          </motion.div>
        ))}
      </div>
      <SceneTitle className="mt-9 font-display text-[1.75rem] leading-tight font-medium text-ink sm:text-4xl">
        <FadeUp as="span" delay={1.4} className="block">
          {story.flavours.lines[0]}
        </FadeUp>
      </SceneTitle>
      <FadeUp as="p" delay={2.3} className="mt-2 font-display text-xl text-terracotta-deep italic sm:text-2xl">
        {story.flavours.lines[1]}
      </FadeUp>
    </div>
  )
}

/* ── Scene 3 · A perfect blend ──────────────────────────────────────────── */
export function SceneBlend() {
  const { note, celebrate } = useDelight()
  const reduce = useReducedMotion()
  const clinkAt = reduce ? 0 : 2.2

  const tapHeart = () => {
    celebrate('hearts')
    note(easterEggs.steamHeart)
  }

  return (
    <div className="relative flex w-full max-w-xl flex-col items-center text-center">
      <div className="relative h-[250px] w-[330px] sm:h-[300px] sm:w-[420px]">
        {/* steam that curls into a heart */}
        <svg viewBox="0 0 340 260" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
          <g fill="none" stroke="#C9B49D" strokeWidth={3} strokeLinecap="round">
            <motion.path d="M118 150 C104 128 150 132 170 112" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.9 }} transition={{ duration: 1, delay: 0.9 }} />
            <motion.path d="M222 150 C236 128 190 132 170 112" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.9 }} transition={{ duration: 1, delay: 0.9 }} />
          </g>
          <g fill="none" stroke="#B97861" strokeWidth={3.2} strokeLinecap="round">
            <motion.path d="M170 112 C140 92 126 68 138 52 C148 40 165 44 170 58" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.3, delay: 1.7, ease: 'easeInOut' }} />
            <motion.path d="M170 112 C200 92 214 68 202 52 C192 40 175 44 170 58" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.3, delay: 1.7, ease: 'easeInOut' }} />
          </g>
        </svg>
        {/* Easter egg: the steam heart is tappable */}
        <motion.button
          type="button"
          onClick={tapHeart}
          aria-label="The steam heart. Tap it"
          className="absolute top-[12%] left-1/2 h-[30%] w-[26%] -translate-x-1/2 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6 }}
        />
        {/* sparkles at the clink */}
        {[
          ['46%', '50%', 'h-4 w-4', 0],
          ['56%', '44%', 'h-3 w-3', 0.15],
          ['50%', '38%', 'h-2.5 w-2.5', 0.3],
          ['40%', '42%', 'h-3 w-3', 0.2],
          ['60%', '56%', 'h-2.5 w-2.5', 0.35],
        ].map(([left, top, size, d]) => (
          <motion.span
            key={`${left}${top}`}
            className="pointer-events-none absolute"
            style={{ left: left as string, top: top as string }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0.7], scale: [0, 1.3, 1], rotate: [0, 45, 20] }}
            transition={{ duration: 1, delay: clinkAt + 0.1 + (d as number) }}
          >
            <Sparkle className={size as string} />
          </motion.span>
        ))}
        {/* the cups glide together and clink */}
        <motion.div
          className="absolute bottom-0 left-0 w-[42%]"
          initial={{ x: 0, rotate: 0 }}
          animate={{ x: ['0%', '34%', '24%', '28%'], rotate: [0, 12, 4, 8] }}
          transition={{ duration: 2.4, times: [0, 0.6, 0.8, 1], delay: 0.2, ease: 'easeInOut' }}
          style={{ originY: 1 }}
        >
          <ChaiCup expression="love" steam={false} />
        </motion.div>
        <motion.div
          className="absolute right-0 bottom-0 w-[42%]"
          initial={{ x: 0, rotate: 0 }}
          animate={{ x: ['0%', '-34%', '-24%', '-28%'], rotate: [0, -12, -4, -8] }}
          transition={{ duration: 2.4, times: [0, 0.6, 0.8, 1], delay: 0.2, ease: 'easeInOut' }}
          style={{ originY: 1 }}
        >
          <CoffeeCup expression="love" steam={false} />
        </motion.div>
      </div>
      <SceneTitle className="mt-8 max-w-md font-display text-[1.9rem] leading-tight font-medium text-ink sm:text-[2.6rem]">
        <FadeUp as="span" delay={reduce ? 0.2 : 2.9} className="block">
          {story.blend.line}
        </FadeUp>
      </SceneTitle>
    </div>
  )
}

/* ── Scene 4 · The couple reveal ────────────────────────────────────────── */
function CouplePortrait({ smiling }: { smiling: boolean }) {
  const { coupleIllustration } = wedding.couple
  if (coupleIllustration) {
    return <img src={coupleIllustration} alt={`Illustration of ${bride.shortName} and ${groom.shortName}`} className="h-full w-auto object-contain" />
  }
  if (bride.illustration && groom.illustration) {
    return (
      <div className="flex h-full items-end justify-center">
        <motion.img src={groom.illustration} alt={`Illustration of ${groom.shortName}`} className="h-full w-auto object-contain" animate={{ rotate: smiling ? 3 : 0 }} style={{ originY: 1 }} />
        <motion.img src={bride.illustration} alt={`Illustration of ${bride.shortName}`} className="-ml-6 h-full w-auto object-contain" animate={{ rotate: smiling ? -3 : 0 }} style={{ originY: 1 }} />
      </div>
    )
  }
  return (
    <>
      <CoupleIllustration smiling={smiling} className="h-full w-auto" />
      <span className="sr-only">
        Storybook illustration of {groom.shortName} and {bride.shortName} holding hands and smiling at each other.
      </span>
    </>
  )
}

export function SceneCouple() {
  const reduce = useReducedMotion()
  const [smiling, setSmiling] = useState(!!reduce)
  useEffect(() => {
    if (reduce) return
    const t = window.setTimeout(() => setSmiling(true), 3000)
    return () => window.clearTimeout(t)
  }, [reduce])

  return (
    <div className="relative flex w-full max-w-xl flex-col items-center text-center">
      <FadeUp as="p" className="font-display text-xl text-coffee italic sm:text-2xl">
        {story.couple.before}
      </FadeUp>
      <div className="relative mt-2 flex h-[34svh] max-h-[340px] min-h-[220px] w-full items-end justify-center">
        {/* the cups meet in the middle, then make way for the couple */}
        <motion.div
          className="absolute bottom-[10%] left-1/2 flex -translate-x-1/2 items-end"
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 0.6, y: -30 }}
          transition={{ duration: 0.9, delay: 1.1, ease }}
          aria-hidden="true"
        >
          <motion.div className="w-20" initial={{ x: -50, rotate: 0 }} animate={{ x: 6, rotate: 10 }} transition={{ duration: 0.9, ease }}>
            <ChaiCup expression="love" steam={false} />
          </motion.div>
          <motion.div className="w-20" initial={{ x: 50, rotate: 0 }} animate={{ x: -6, rotate: -10 }} transition={{ duration: 0.9, ease }}>
            <CoffeeCup expression="love" steam={false} />
          </motion.div>
        </motion.div>
        <motion.div
          className="relative flex h-full justify-center"
          initial={{ opacity: 0, scale: 0.92, filter: 'blur(6px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.3, delay: 1.4, ease }}
        >
          <div className="absolute inset-x-[10%] bottom-[4%] top-[18%] -z-10 rounded-full bg-[radial-gradient(closest-side,rgb(242_179_61/0.28),transparent)]" aria-hidden="true" />
          <CouplePortrait smiling={smiling} />
        </motion.div>
      </div>
      <SceneTitle className="mt-4 font-display text-[2.4rem] leading-[1.05] font-semibold tracking-wide text-wine sm:text-6xl">
        <LetterReveal text={bride.shortName.toUpperCase()} delay={2.1} className="block whitespace-nowrap" />{' '}
        <motion.span className="my-1 block font-normal text-gold italic" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6 }} aria-hidden="true">
          &amp;
        </motion.span>
        <span className="sr-only"> and </span>{' '}
        <LetterReveal text={groom.shortName.toUpperCase()} delay={2.7} className="block whitespace-nowrap" />
      </SceneTitle>
      <FadeUp as="p" delay={3.4} className="mt-4 font-display text-xl text-coffee italic sm:text-2xl">
        {story.couple.after}
      </FadeUp>
    </div>
  )
}

/* ── Scene 5 · The grand wedding reveal ─────────────────────────────────── */
export function SceneRoyal({ onOpen }: { onOpen: () => void }) {
  const { note } = useDelight()
  const [lit, setLit] = useState(false)
  const tapLamp = () => {
    setLit(true)
    note(easterEggs.lamp)
  }
  const lamp = (side: 'left' | 'right') => (
    <button
      type="button"
      onClick={tapLamp}
      aria-label="Brass nilavilakku lamp. Tap to light a wish"
      className={`absolute bottom-0 z-10 hidden w-14 rounded-xl sm:block md:w-20 ${side === 'left' ? 'left-3 md:left-10' : 'right-3 md:right-10'}`}
    >
      <Nilavilakku glow={lit} className="h-auto w-full" />
    </button>
  )

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center text-center">
      <GoldParticles count={26} />
      <FallingJasmine count={12} />
      <JasmineGarland className="absolute inset-x-8 -top-6 sm:inset-x-24" />
      {lamp('left')}
      {lamp('right')}
      <OrnateFrame className="relative mx-auto mt-12 w-full max-w-xl px-6 py-9 sm:mt-20 sm:px-14 sm:py-16">
        <FadeUp as="p" delay={0.2} className="font-display text-[1.3rem] leading-snug text-champagne italic sm:text-3xl">
          {story.royal.lines[0]}
        </FadeUp>
        <FadeUp as="p" delay={1.2} className="mt-2 font-display text-[1.45rem] leading-snug text-champagne italic sm:text-3xl">
          {story.royal.lines[1]}
        </FadeUp>
        <FadeUp delay={2}>
          <Divider className="mx-auto my-5 h-4 w-44" />
        </FadeUp>
        <SceneTitle className="font-display text-[2.4rem] leading-none font-semibold tracking-wide sm:text-6xl">
          <FadeUp as="span" delay={2.3} className="block">
            <span className="gold-text block">{bride.shortName.toUpperCase()}</span>{' '}
            <span className="gold-text my-1 block font-normal italic" aria-hidden="true">
              &amp;
            </span>
            <span className="sr-only"> and </span>{' '}
            <span className="gold-text block">{groom.shortName.toUpperCase()}</span>
          </FadeUp>
        </SceneTitle>
        <FadeUp as="p" delay={3} className="mx-auto mt-5 max-w-xs text-[15px] leading-relaxed text-champagne/90 sm:max-w-sm sm:text-base">
          {story.royal.invite}
        </FadeUp>
        <FadeUp delay={3.6} className="mt-6 sm:mt-8">
          <button
            type="button"
            onClick={onOpen}
            className="pulse-soft group inline-flex min-h-12 items-center gap-2.5 rounded-full border border-gold-light/70 bg-gradient-to-b from-[#d9bb82] to-[#b38c50] px-7 py-3.5 text-[13px] font-bold tracking-[0.18em] text-wine-night uppercase shadow-[0_10px_30px_-10px_rgb(0_0_0/0.6)] transition hover:brightness-105 active:scale-[0.98]"
          >
            {story.royal.cta}
            <Heart className="h-4 w-4 transition-transform group-hover:scale-110" fill="currentColor" aria-hidden="true" />
          </button>
        </FadeUp>
      </OrnateFrame>
      <div className="mt-4 flex gap-10 sm:hidden">
        <button type="button" onClick={tapLamp} aria-label="Brass nilavilakku lamp. Tap to light a wish" className="w-10 rounded-lg">
          <Nilavilakku glow={lit} className="h-auto w-full" />
        </button>
        <button type="button" onClick={tapLamp} aria-label="Brass nilavilakku lamp. Tap to light a wish" className="w-10 rounded-lg">
          <Nilavilakku glow={lit} className="h-auto w-full" />
        </button>
      </div>
    </div>
  )
}

