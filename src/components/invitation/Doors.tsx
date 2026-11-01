import { motion } from 'motion/react'
import { CornerFlourish } from '../illustrations/Ornaments'

/** Two red-silk doors with gold borders that swing open to reveal the invitation card. */
export function Doors({ onDone }: { onDone: () => void }) {
  const panel = (side: 'left' | 'right') => (
    <motion.div
      className={`royal-pattern absolute top-0 h-full w-1/2 ${side === 'left' ? 'left-0' : 'right-0'}`}
      style={{ originX: side === 'left' ? 0 : 1, transformPerspective: 1400 }}
      initial={{ rotateY: 0 }}
      animate={{ rotateY: side === 'left' ? -105 : 105 }}
      transition={{ duration: 1.5, delay: 0.35, ease: [0.65, 0, 0.35, 1] }}
      onAnimationComplete={side === 'right' ? onDone : undefined}
    >
      <div className={`absolute inset-4 border border-gold/60 ${side === 'left' ? 'border-r-0' : 'border-l-0'}`} />
      <CornerFlourish className={`absolute h-16 w-16 ${side === 'left' ? 'top-4 left-4' : 'top-4 right-4 rotate-90'}`} />
      <CornerFlourish className={`absolute h-16 w-16 ${side === 'left' ? 'bottom-4 left-4 -rotate-90' : 'right-4 bottom-4 rotate-180'}`} />
      <div className={`absolute top-1/2 h-24 w-12 -translate-y-1/2 overflow-hidden ${side === 'left' ? 'right-0' : 'left-0'}`}>
        <div className={`absolute top-0 h-24 w-24 rounded-full border-2 border-gold bg-wine-deep ${side === 'left' ? 'left-0' : '-left-12'}`}>
          <span className="flex h-full items-center justify-center font-display text-3xl text-gold-light">G♡A</span>
        </div>
      </div>
    </motion.div>
  )
  return (
    <div className="pointer-events-none fixed inset-0 z-50" aria-hidden="true">
      {panel('left')}
      {panel('right')}
    </div>
  )
}
