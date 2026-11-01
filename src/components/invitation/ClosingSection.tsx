import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { RotateCcw } from 'lucide-react'
import { TappableCup } from '../story/TappableCup'
import { Divider, PlantainTree, Sparkle, TempleBorder, Thoranam } from '../illustrations/Ornaments'
import { useDelight } from '../ui/delightContext'
import { easterEggs, story, wedding } from '../../data/wedding'
import { formatDateParts, isRealDate } from '../../lib/format'
import { useMusic } from '../ui/musicContext'

/**
 * The chai and coffee cups return for the ending.
 * Easter egg: reaching the very bottom makes them clink and leaves a note.
 */
export function ClosingSection({ onReplay }: { onReplay: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const { note } = useDelight()
  const [cheered, setCheered] = useState(false)
  const { track } = useMusic()

  useEffect(() => {
    if (!inView || cheered) return
    const t = window.setTimeout(() => {
      setCheered(true)
      note(easterEggs.bottom)
    }, 1400)
    return () => window.clearTimeout(t)
  }, [inView, cheered, note])

  const d = isRealDate(wedding.wedding.date) ? formatDateParts(wedding.wedding.date) : null

  return (
    <section aria-labelledby="closing-title" className="on-ivory sandal-kolam relative overflow-hidden px-5 pt-28 pb-[max(3rem,env(safe-area-inset-bottom))] text-center">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <TempleBorder className="absolute inset-x-0 top-0" />
        <Thoranam className="absolute inset-x-0 top-[22px]" />
        <PlantainTree className="absolute bottom-0 -left-14 h-[300px] w-auto opacity-90 sm:left-0 sm:h-[420px]" />
        <PlantainTree flip className="absolute -right-14 bottom-0 h-[300px] w-auto opacity-90 sm:right-0 sm:h-[420px]" />
      </div>
      <div ref={ref} className="relative mx-auto max-w-md">
        <div className="relative mx-auto flex w-64 items-end justify-center sm:w-80">
          <motion.div className="w-1/2" animate={inView ? { x: ['0%', '18%', '12%'], rotate: [0, 10, 6] } : {}} transition={{ duration: 1.4, delay: 0.3 }} style={{ originY: 1 }}>
            <TappableCup kind="chai" expression={cheered ? 'love' : 'calm'} />
          </motion.div>
          <motion.div className="w-1/2" animate={inView ? { x: ['0%', '-18%', '-12%'], rotate: [0, -10, -6] } : {}} transition={{ duration: 1.4, delay: 0.3 }} style={{ originY: 1 }}>
            <TappableCup kind="coffee" expression={cheered ? 'love' : 'open'} />
          </motion.div>
          {cheered && (
            <motion.span className="pointer-events-none absolute top-[38%] left-1/2 -translate-x-1/2" initial={{ scale: 0, opacity: 0 }} animate={{ scale: [0, 1.3, 1], opacity: 1, rotate: 30 }} transition={{ duration: 0.7 }} aria-hidden="true">
              <Sparkle className="h-5 w-5" />
            </motion.span>
          )}
        </div>
        <h2 id="closing-title" className="mt-8 font-display text-[2rem] leading-tight font-medium text-ink sm:text-4xl">
          {story.closing.line}
        </h2>
        <p className="mt-4 font-display text-2xl tracking-[0.4em] text-terracotta" aria-label="chai, love, coffee">
          ☕ ♡ ☕
        </p>
        <Divider className="mx-auto my-6 h-4 w-40" color="#C5A36B" />
        <p className="mx-auto max-w-sm text-[17px] leading-relaxed text-coffee">{story.closing.thanks}</p>
        <p className="mt-6 font-display text-2xl text-wine italic">
          {wedding.couple.bride.shortName} &amp; {wedding.couple.groom.shortName}
        </p>
        {d && (
          <p className="mt-1 text-[12px] font-bold tracking-[0.3em] text-coffee/80 uppercase">
            {d.day} · {d.month} · {d.year}
          </p>
        )}
        <button
          type="button"
          onClick={onReplay}
          className="mt-10 inline-flex min-h-11 items-center gap-2 rounded-full border border-coffee/30 px-5 text-[13px] font-bold tracking-wide text-coffee transition hover:bg-white/10"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Replay our little story
        </button>
        {track?.credit && (
          <p className="mx-auto mt-10 max-w-xs text-[11px] leading-relaxed text-coffee/60">
            {track.credit}{' '}
            {track.creditUrl && (
            <a href={track.creditUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-coffee">
              Source
            </a>
            )}
          </p>
        )}
      </div>
    </section>
  )
}
