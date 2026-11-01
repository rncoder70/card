import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { X } from 'lucide-react'
import { DelightContext, type BurstKind } from './delightContext'

/**
 * Shared layer for Easter-egg notes and small celebrations.
 * `note(text)` shows a little parchment note (announced politely to screen readers).
 * `celebrate(kind)` floats a short burst of steam-hearts, jasmine petals or sparkles.
 */

interface Burst {
  id: number
  kind: BurstKind
}

export function DelightProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<{ id: number; text: string } | null>(null)
  const [bursts, setBursts] = useState<Burst[]>([])
  const counter = useRef(0)
  const timer = useRef<number | undefined>(undefined)

  const note = useCallback((text: string) => {
    counter.current += 1
    setMessage({ id: counter.current, text })
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setMessage(null), 7000)
  }, [])

  const celebrate = useCallback((kind: BurstKind) => {
    counter.current += 1
    const id = counter.current
    setBursts((b) => [...b, { id, kind }])
    window.setTimeout(() => setBursts((b) => b.filter((x) => x.id !== id)), 4200)
  }, [])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const api = useMemo(() => ({ note, celebrate }), [note, celebrate])

  return (
    <DelightContext.Provider value={api}>
      {children}
      {bursts.map((b) => (
        <BurstLayer key={b.id} kind={b.kind} />
      ))}
      <div className="pointer-events-none fixed inset-x-0 bottom-24 z-[60] flex justify-center px-4 sm:bottom-8" aria-live="polite" aria-atomic="true">
        <AnimatePresence>
          {message && (
            <motion.div
              key={message.id}
              role="status"
              initial={{ opacity: 0, y: 16, rotate: -1.5 }}
              animate={{ opacity: 1, y: 0, rotate: -0.5 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="paper-grain pointer-events-auto relative flex max-w-sm items-start gap-3 overflow-hidden rounded-md border border-gold/60 bg-ivory px-5 py-4 text-ink shadow-[0_12px_40px_-12px_rgb(59_42_32/0.45)]"
            >
              <span className="mt-0.5 font-display text-xl leading-none text-terracotta" aria-hidden="true">
                ❦
              </span>
              <p className="relative font-display text-lg leading-snug italic">{message.text}</p>
              <button
                type="button"
                onClick={() => setMessage(null)}
                className="relative -mr-2 -mt-1 rounded-full p-1.5 text-coffee/70 transition hover:bg-champagne hover:text-ink"
                aria-label="Close note"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DelightContext.Provider>
  )
}

function BurstLayer({ kind }: { kind: BurstKind }) {
  const reduce = useReducedMotion()
  const items = useMemo(
    () =>
      Array.from({ length: reduce ? 0 : 16 }, (_, i) => ({
        left: 8 + ((i * 53) % 84),
        delay: (i % 8) * 0.12,
        drift: ((i * 37) % 60) - 30,
        size: 14 + ((i * 7) % 12),
        rot: ((i * 47) % 120) - 60,
      })),
    [reduce],
  )
  return (
    <div className="pointer-events-none fixed inset-0 z-[55] overflow-hidden" aria-hidden="true">
      {items.map((p, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0"
          style={{ left: `${p.left}%`, width: p.size, height: p.size }}
          initial={{ y: 40, opacity: 0, rotate: 0 }}
          animate={{ y: '-85vh', x: p.drift, opacity: [0, 1, 1, 0], rotate: p.rot }}
          transition={{ duration: 3.4, delay: p.delay, ease: 'easeOut' }}
        >
          <BurstShape kind={kind} />
        </motion.div>
      ))}
    </div>
  )
}

function BurstShape({ kind }: { kind: BurstKind }) {
  if (kind === 'petals')
    return (
      <svg viewBox="0 0 20 20" className="h-full w-full">
        <path d="M10 1 C15 5 15 13 10 19 C5 13 5 5 10 1 Z" fill="#FBF6EC" stroke="#E2D6BF" />
      </svg>
    )
  if (kind === 'sparkles')
    return (
      <svg viewBox="0 0 20 20" className="h-full w-full">
        <path d="M10 0 C11 7 13 9 20 10 C13 11 11 13 10 20 C9 13 7 11 0 10 C7 9 9 7 10 0 Z" fill="#C5A36B" />
      </svg>
    )
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <path d="M12 20 C4 14 2 10 4 7 C6 4 10 4 12 8 C14 4 18 4 20 7 C22 10 20 14 12 20 Z" fill="none" stroke="#C5A36B" strokeWidth={1.8} />
    </svg>
  )
}
