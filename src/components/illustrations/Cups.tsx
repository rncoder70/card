import { useId } from 'react'

export type CupExpression = 'calm' | 'open' | 'love' | 'wink'

interface CupProps {
  expression?: CupExpression
  steam?: boolean
  /** Horizontal shift of the eyes, so the cups can "look" at each other. */
  look?: number
  className?: string
  steamColor?: string
}

const INK = '#3B2A20'

function Face({ x, y, expression, look = 0, brows = false }: { x: number; y: number; expression: CupExpression; look?: number; brows?: boolean }) {
  const closedEye = (cx: number) => (
    <path d={`M${cx - 5} ${y + 1} Q${cx} ${y - 4} ${cx + 5} ${y + 1}`} stroke={INK} strokeWidth={2.4} strokeLinecap="round" fill="none" />
  )
  const openEye = (cx: number) => (
    <g className="blink">
      <ellipse cx={cx + look} cy={y} rx={2.7} ry={3.4} fill={INK} />
      <circle cx={cx + look + 1} cy={y - 1.3} r={0.9} fill="#fff" />
    </g>
  )
  const left = x - 11
  const right = x + 11
  const eyes =
    expression === 'calm' || expression === 'love' ? (
      <>
        {closedEye(left)}
        {closedEye(right)}
      </>
    ) : expression === 'wink' ? (
      <>
        {openEye(left)}
        {closedEye(right)}
      </>
    ) : (
      <>
        {openEye(left)}
        {openEye(right)}
      </>
    )
  const smile =
    expression === 'love'
      ? `M${x - 7} ${y + 9} Q${x} ${y + 17} ${x + 7} ${y + 9}`
      : expression === 'wink'
        ? `M${x - 6} ${y + 10} Q${x + 1} ${y + 15} ${x + 7} ${y + 8}`
        : `M${x - 5} ${y + 10} Q${x} ${y + 14} ${x + 5} ${y + 10}`
  return (
    <g>
      {brows && (
        <>
          <path d={`M${left - 4} ${y - 9} Q${left} ${y - 12} ${left + 4} ${y - 10}`} stroke={INK} strokeWidth={1.8} strokeLinecap="round" fill="none" />
          <path d={`M${right - 4} ${y - 12} Q${right} ${y - 15} ${right + 4} ${y - 12}`} stroke={INK} strokeWidth={1.8} strokeLinecap="round" fill="none" />
        </>
      )}
      {eyes}
      <ellipse cx={left - 5} cy={y + 8} rx={5} ry={3} fill="#D9826B" opacity={expression === 'love' ? 0.65 : 0.4} />
      <ellipse cx={right + 5} cy={y + 8} rx={5} ry={3} fill="#D9826B" opacity={expression === 'love' ? 0.65 : 0.4} />
      <path d={smile} stroke={INK} strokeWidth={2.2} strokeLinecap="round" fill={expression === 'love' ? '#8C3B3B' : 'none'} />
    </g>
  )
}

function Steam({ color, xs }: { color: string; xs: number[] }) {
  return (
    <g fill="none" stroke={color} strokeWidth={3} strokeLinecap="round">
      {xs.map((x, i) => (
        <path
          key={x}
          className="steam-path"
          style={{ animationDelay: `${i * 0.9}s` }}
          d={`M${x} 60 C${x - 9} 48 ${x + 9} 40 ${x} 26 C${x - 6} 18 ${x + 4} 12 ${x} 4`}
        />
      ))}
    </g>
  )
}

/**
 * Chai in a faceted "cutting chai" glass, the tea glowing through the glass.
 * The face sits a little to the right, so it looks toward the coffee.
 */
export function ChaiCup({ expression = 'calm', steam = true, look = 0, className, steamColor = '#C9B49D' }: CupProps) {
  const id = useId()
  const glass = 'M40 60 L51 166 Q80 175 109 166 L120 60 Z'
  return (
    <svg viewBox="0 0 160 190" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}tea`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#D9A26A" />
          <stop offset="1" stopColor="#A86A3C" />
        </linearGradient>
        <clipPath id={`${id}clip`}>
          <path d={glass} />
        </clipPath>
      </defs>
      {steam && <Steam color={steamColor} xs={[66, 82, 98]} />}
      <ellipse cx={80} cy={176} rx={46} ry={7} fill="#684532" opacity={0.14} />
      <g clipPath={`url(#${id}clip)`}>
        {/* tea */}
        <path d="M30 80 H130 V180 H30 Z" fill={`url(#${id}tea)`} />
        <ellipse cx={80} cy={80} rx={39} ry={6.5} fill="#EBC394" />
        <ellipse cx={74} cy={79} rx={16} ry={2.4} fill="#F6DDB8" opacity={0.8} />
        {/* empty glass above the tea */}
        <path d="M30 58 H130 V80 H30 Z" fill="#FFFFFF" opacity={0.16} />
        {/* faceted glass: vertical panels catching the light */}
        {[
          [52, 58],
          [66, 68],
          [94, 92],
          [108, 102],
        ].map(([top, bottom]) => (
          <path key={top} d={`M${top} 60 L${bottom} 170`} stroke="#FFFFFF" strokeOpacity={0.32} strokeWidth={1.4} />
        ))}
        <path d="M45 64 L54 160" stroke="#FFFFFF" strokeOpacity={0.6} strokeWidth={4} strokeLinecap="round" />
        <path d="M113 70 L106 150" stroke="#FFFFFF" strokeOpacity={0.25} strokeWidth={2.5} strokeLinecap="round" />
        {/* thick glass base */}
        <path d="M44 156 Q80 164 116 156 V180 H44 Z" fill="#FFFFFF" opacity={0.22} />
      </g>
      <path d={glass} fill="none" stroke="#6B5444" strokeWidth={1.7} strokeLinejoin="round" />
      <path d="M50 157 Q80 165 110 157" fill="none" stroke="#6B5444" strokeWidth={1.1} opacity={0.5} />
      <ellipse cx={80} cy={60} rx={40} ry={7} fill="#FFFFFF" fillOpacity={0.12} stroke="#6B5444" strokeWidth={1.7} />
      <path d="M48 58 Q60 55 72 55" stroke="#FFFFFF" strokeWidth={2} strokeLinecap="round" opacity={0.75} fill="none" />
      <Face x={88} y={118} expression={expression} look={look} />
    </svg>
  )
}

/**
 * South Indian filter coffee: a short, wide brass tumbler nested deep in its brass davara,
 * topped with speckled froth. The face sits a little to the left, so it looks toward the chai.
 */
export function CoffeeCup({ expression = 'open', steam = true, look = 0, className, steamColor = '#C9B49D' }: CupProps) {
  const id = useId()
  const OUTLINE = '#6B4A22'
  const froth: [number, number, number, string][] = [
    [62, 64, 1.6, '#E8C08F'], [72, 61, 1.3, '#A8703F'], [84, 63, 1.7, '#E8C08F'], [95, 61, 1.2, '#A8703F'],
    [104, 65, 1.4, '#E8C08F'], [56, 67, 1.1, '#A8703F'], [68, 68, 1.2, '#F0D2A8'], [80, 67, 1, '#A8703F'],
    [91, 68, 1.5, '#F0D2A8'], [100, 69, 1, '#A8703F'], [76, 59, 1, '#F0D2A8'], [88, 58.5, 1.1, '#E8C08F'],
  ]
  return (
    <svg viewBox="0 0 160 190" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}brass`} x1="0" x2="1">
          <stop offset="0" stopColor="#7A4C17" />
          <stop offset="0.16" stopColor="#D9A955" />
          <stop offset="0.32" stopColor="#F7DFA2" />
          <stop offset="0.55" stopColor="#C68F3E" />
          <stop offset="0.82" stopColor="#E3B56A" />
          <stop offset="1" stopColor="#74471A" />
        </linearGradient>
        <linearGradient id={`${id}inside`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5E3A12" />
          <stop offset="1" stopColor="#A9752F" />
        </linearGradient>
      </defs>
      {steam && <Steam color={steamColor} xs={[64, 80, 96]} />}
      <ellipse cx={80} cy={178} rx={52} ry={7} fill="#684532" opacity={0.15} />

      {/* davara: back of the rim and its dark interior */}
      <ellipse cx={80} cy={110} rx={62} ry={12} fill="#F1D08E" stroke={OUTLINE} strokeWidth={1.6} />
      <ellipse cx={80} cy={110} rx={54} ry={9} fill={`url(#${id}inside)`} />

      {/* tumbler (its lower half disappears into the davara) */}
      <path d="M35 66 C39 90 43 110 47 132 L113 132 C117 110 121 90 125 66 Z" fill={`url(#${id}brass)`} stroke={OUTLINE} strokeWidth={1.6} strokeLinejoin="round" />
      <path d="M44 74 C46 90 49 104 51 116" stroke="#FFF4D6" strokeWidth={4} strokeLinecap="round" opacity={0.65} fill="none" />
      <path d="M112 76 C111 90 109 102 107 114" stroke="#FFF4D6" strokeWidth={2} strokeLinecap="round" opacity={0.35} fill="none" />
      {/* flared rim + froth */}
      <ellipse cx={80} cy={65} rx={47} ry={10.5} fill="#F3D695" stroke={OUTLINE} strokeWidth={1.6} />
      <ellipse cx={80} cy={65.5} rx={41} ry={8} fill="#C98F58" />
      <ellipse cx={80} cy={64.5} rx={37} ry={6.4} fill="#D9A673" />
      {froth.map(([cx, cy, r, fill]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={fill} />
      ))}

      {/* davara: front wall and lip, drawn over the tumbler so it sits inside */}
      <path d="M18 110 A62 12 0 0 0 142 110 C141 134 139 156 128 166 Q80 176 32 166 C21 156 19 134 18 110 Z" fill={`url(#${id}brass)`} stroke={OUTLINE} strokeWidth={1.6} strokeLinejoin="round" />
      <path d="M18 110 A62 12 0 0 0 142 110 L134 110 A54 9 0 0 1 26 110 Z" fill="#F6DCA0" stroke={OUTLINE} strokeWidth={1.2} strokeLinejoin="round" />
      <path d="M30 128 C31 144 34 156 42 164" stroke="#FFF4D6" strokeWidth={4} strokeLinecap="round" opacity={0.55} fill="none" />
      <path d="M24 136 Q80 148 136 136" stroke={OUTLINE} strokeWidth={1} opacity={0.35} fill="none" />

      <Face x={74} y={88} expression={expression} look={look} brows />
    </svg>
  )
}
