import { useRef } from 'react'
import { motion } from 'motion/react'
import { easterEggs, wedding } from '../../data/wedding'
import { useDelight } from '../ui/delightContext'

/**
 * Easter egg: the G ♡ A monogram. Tapping the initials in the order set in
 * `easterEggs.monogram.sequence` (default G → A → G) reveals a hidden note.
 */
export function Monogram() {
  const { note, celebrate } = useDelight()
  const [first, second] = wedding.couple.initials
  const presses = useRef<string[]>([])
  const target = easterEggs.monogram.sequence

  const press = (letter: string) => {
    presses.current = [...presses.current, letter].slice(-target.length)
    if (presses.current.join('') === target.join('')) {
      presses.current = []
      celebrate('sparkles')
      note(easterEggs.monogram.message)
    }
  }

  const initial = (letter: string, label: string) => (
    <motion.button
      type="button"
      onClick={() => press(letter)}
      aria-label={`Initial ${letter}, for ${label}`}
      className="flex h-11 w-11 items-center justify-center rounded-full font-display text-3xl font-semibold text-gold-light"
      whileTap={{ scale: 1.3 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
    >
      {letter}
    </motion.button>
  )

  return (
    <div className="relative mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-gold/70 shadow-[inset_0_0_0_5px_rgb(140_24_24),inset_0_0_0_6px_rgb(197_163_107/0.5)]">
      {initial(first, wedding.couple.bride.shortName)}
      <span className="text-sm text-gold" aria-hidden="true">
        ♡
      </span>
      {initial(second, wedding.couple.groom.shortName)}
    </div>
  )
}
