import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChaiCup, CoffeeCup, type CupExpression } from '../illustrations/Cups'
import { easterEggs } from '../../data/wedding'
import { Infusion } from './Infusion'

interface Props {
  kind: 'chai' | 'coffee'
  expression?: CupExpression
  look?: number
  className?: string
  steam?: boolean
  /** Show the brewing animation (leaf/bean → powder) instead of steam. */
  infuse?: boolean
}

/**
 * Easter egg: tapping a cup makes it wobble and whisper one of its secret lines
 * (easterEggs.chai / easterEggs.coffee in src/data/wedding.ts).
 */
export function TappableCup({ kind, expression, look, className = '', steam = true, infuse = false }: Props) {
  const lines = kind === 'chai' ? easterEggs.chai : easterEggs.coffee
  const [bubble, setBubble] = useState<string | null>(null)
  const [wobbleKey, setWobbleKey] = useState(0)
  const index = useRef(0)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const tap = () => {
    setWobbleKey((k) => k + 1)
    setBubble(lines[index.current % lines.length])
    index.current += 1
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setBubble(null), 4000)
  }

  const Cup = kind === 'chai' ? ChaiCup : CoffeeCup
  const happy: CupExpression = kind === 'chai' ? 'love' : 'wink'

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={tap}
        aria-label={kind === 'chai' ? 'The glass of chai. Tap for a little secret' : 'The brass tumbler of filter coffee. Tap for a little secret'}
        className="group block w-full rounded-3xl transition-transform active:scale-95"
      >
        <span key={wobbleKey} className={`block ${wobbleKey ? 'wobble' : ''}`}>
          <Cup expression={bubble ? happy : expression} look={look} steam={steam && !infuse} className="h-auto w-full drop-shadow-[0_10px_18px_rgb(104_69_50/0.12)]" />
        </span>
      </button>
      {infuse && <Infusion kind={kind} />}
      <div aria-live="polite" className={`pointer-events-none absolute bottom-[86%] z-10 w-44 sm:w-52 ${kind === 'chai' ? 'left-0' : 'right-0'}`}>
        <AnimatePresence>
          {bubble && (
            <motion.p
              key={bubble}
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl border border-coffee/15 bg-white/90 px-3.5 py-2.5 text-left font-display text-[15px] leading-snug text-[#3B2A20] italic shadow-[0_8px_24px_-12px_rgb(59_42_32/0.4)]"
            >
              {bubble}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
