import { useMemo, useId } from 'react'

/** Hand-drawn leafy sprig for the ivory storybook scenes. */
export function BotanicalSprig({ className, color = '#8E9B7E', accent = '#B97861' }: { className?: string; color?: string; accent?: string }) {
  const leaves = [
    [30, 150, -50],
    [44, 128, 40],
    [42, 104, -45],
    [58, 84, 35],
    [56, 62, -40],
    [72, 44, 30],
  ]
  return (
    <svg viewBox="0 0 120 200" className={className} aria-hidden="true" focusable="false">
      <g className="sway" style={{ transformOrigin: '20px 195px' }}>
        <path d="M20 195 C30 150 40 110 60 70 C70 50 78 34 86 18" fill="none" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
        {leaves.map(([x, y, r]) => (
          <path
            key={`${x}-${y}`}
            d="M0 0 C6 -10 20 -12 28 -4 C20 4 6 6 0 0 Z"
            transform={`translate(${x} ${y}) rotate(${r})`}
            fill={color}
            fillOpacity={0.28}
            stroke={color}
            strokeWidth={1.1}
          />
        ))}
        <circle cx={88} cy={16} r={4} fill={accent} fillOpacity={0.7} />
        <circle cx={80} cy={26} r={2.6} fill={accent} fillOpacity={0.5} />
      </g>
    </svg>
  )
}

/** Small ornamental divider: line · jasmine bud · line. */
export function Divider({ className, color = '#C5A36B' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 240 24" className={className} aria-hidden="true" focusable="false">
      <g fill="none" stroke={color} strokeWidth={1.2} strokeLinecap="round">
        <path d="M8 12 H92" />
        <path d="M148 12 H232" />
        <path d="M96 12 C104 4 112 4 120 12 C128 20 136 20 144 12" />
        <path d="M96 12 C104 20 112 20 120 12 C128 4 136 4 144 12" />
      </g>
      <circle cx={120} cy={12} r={3} fill={color} />
      <circle cx={8} cy={12} r={1.8} fill={color} />
      <circle cx={232} cy={12} r={1.8} fill={color} />
    </svg>
  )
}

/** Kerala-inspired corner flourish (paisley + jasmine). Rotate for each corner. */
export function CornerFlourish({ className, color = '#C5A36B' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" focusable="false">
      <g fill="none" stroke={color} strokeWidth={1.4} strokeLinecap="round">
        <path d="M4 96 V30 C4 14 14 4 30 4 H96" />
        <path d="M12 96 V36 C12 22 22 12 36 12 H96" strokeOpacity={0.55} />
        <path d="M22 60 C22 38 38 22 60 22" />
        <path d="M30 46 C38 30 52 26 58 34 C64 42 54 52 44 48 C38 46 38 38 44 36" />
      </g>
      <g fill={color}>
        <circle cx={22} cy={64} r={2.2} />
        <circle cx={64} cy={22} r={2.2} />
        <path d="M18 18 C22 10 30 10 26 18 C34 14 34 22 26 22 C30 30 22 30 22 22 C14 26 14 18 18 18 Z" fillOpacity={0.9} />
      </g>
    </svg>
  )
}

/** A double gold frame with flourished corners. Children sit inside. */
export function OrnateFrame({ children, className = '', color = '#C5A36B' }: { children: React.ReactNode; className?: string; color?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="pointer-events-none absolute inset-2 rounded-[3px] border" style={{ borderColor: `${color}99` }} />
      <div className="pointer-events-none absolute inset-3.5 rounded-[2px] border" style={{ borderColor: `${color}55` }} />
      {(['top-0 left-0', 'top-0 right-0 rotate-90', 'bottom-0 right-0 rotate-180', 'bottom-0 left-0 -rotate-90'] as const).map((pos) => (
        <CornerFlourish key={pos} color={color} className={`pointer-events-none absolute h-14 w-14 sm:h-20 sm:w-20 ${pos}`} />
      ))}
      <div className="relative">{children}</div>
    </div>
  )
}

/** Brass nilavilakku (traditional Kerala lamp) with a flickering flame. */
export function Nilavilakku({ className, glow = false }: { className?: string; glow?: boolean }) {
  const id = useId()
  return (
    <svg viewBox="0 0 80 220" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}b`} x1="0" x2="1">
          <stop offset="0" stopColor="#8E6A35" />
          <stop offset=".45" stopColor="#E9CF94" />
          <stop offset=".7" stopColor="#C5A36B" />
          <stop offset="1" stopColor="#7C5B2C" />
        </linearGradient>
        <radialGradient id={`${id}g`}>
          <stop offset="0" stopColor="#FFE3A3" stopOpacity={glow ? 0.75 : 0.45} />
          <stop offset="1" stopColor="#FFB45C" stopOpacity={0} />
        </radialGradient>
      </defs>
      <circle cx={40} cy={34} r={glow ? 38 : 26} fill={`url(#${id}g)`} style={{ transition: 'r .6s ease' }} />
      <g className="flicker">
        <path d="M40 14 C47 26 48 38 40 46 C32 38 33 26 40 14 Z" fill="#F7B955" />
        <path d="M40 24 C44 32 44 39 40 44 C36 39 36 32 40 24 Z" fill="#FFF1C9" />
      </g>
      <g fill={`url(#${id}b)`} stroke="#6B4D22" strokeWidth={0.8}>
        <path d="M14 48 Q40 60 66 48 L62 54 Q40 64 18 54 Z" />
        <path d="M22 48 C30 30 50 30 58 48 Z" />
        <circle cx={40} cy={30} r={3} />
        <path d="M36 62 H44 L45 76 H35 Z" />
        <ellipse cx={40} cy={80} rx={9} ry={4} />
        <path d="M37 84 H43 L44 120 H36 Z" />
        <ellipse cx={40} cy={124} rx={11} ry={4.5} />
        <path d="M36 128 H44 L45 158 H35 Z" />
        <ellipse cx={40} cy={162} rx={14} ry={5} />
        <path d="M34 166 H46 L50 188 H30 Z" />
        <path d="M12 200 C14 190 66 190 68 200 L70 206 H10 Z" />
        <ellipse cx={40} cy={208} rx={32} ry={6} />
      </g>
    </svg>
  )
}

/** Strand of jasmine buds with an occasional rose, hanging from the top edge. */
export function JasmineStrand({ length = 9, className, rose = true }: { length?: number; className?: string; rose?: boolean }) {
  return (
    <svg viewBox={`0 0 20 ${length * 16 + 20}`} className={className} aria-hidden="true" focusable="false">
      <path d={`M10 0 V${length * 16 + 4}`} stroke="#7E8F68" strokeWidth={0.8} />
      {Array.from({ length }, (_, i) => (
        <g key={i} transform={`translate(10 ${i * 16 + 10})`}>
          <ellipse rx={4.6} ry={6} fill="#FBF6EC" stroke="#E2D6BF" strokeWidth={0.6} />
          <ellipse cy={-2} rx={2} ry={2.6} fill="#FFFFFF" />
        </g>
      ))}
      {rose && (
        <g transform={`translate(10 ${length * 16 + 10})`}>
          <circle r={6.5} fill="#9E2F3D" />
          <path d="M-3 -1 C-1 -5 4 -4 3 0 C2 3 -2 3 -2 0" fill="none" stroke="#5E1622" strokeWidth={1} />
        </g>
      )}
    </svg>
  )
}

/** Row of hanging jasmine strands (thoranam) across the top of a scene. */
export function JasmineGarland({ className = '' }: { className?: string }) {
  const lengths = [5, 8, 6, 10, 7, 11, 7, 10, 6, 8, 5]
  return (
    <div className={`pointer-events-none flex items-start justify-between ${className}`} aria-hidden="true">
      {lengths.map((l, i) => (
        <JasmineStrand key={i} length={l} rose={i % 2 === 1} className="sway w-2 sm:w-3.5" />
      ))}
    </div>
  )
}

/** Deterministic pseudo-random layout so particles stay put between renders. */
function particleLayout(count: number) {
  let seed = 7
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }
  return Array.from({ length: count }, () => ({
    left: rand() * 100,
    top: 20 + rand() * 80,
    size: 2 + rand() * 3,
    d: 8 + rand() * 10,
    delay: -rand() * 14,
    dx: (rand() - 0.5) * 40,
    o: 0.35 + rand() * 0.5,
  }))
}

/** Slow-drifting gold dust. Purely decorative; frozen when reduced motion is on. */
export function GoldParticles({ count = 22, className = '' }: { count?: number; className?: string }) {
  const dots = useMemo(() => particleLayout(count), [count])
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {dots.map((p, i) => (
        <span
          key={i}
          className="drift absolute rounded-full bg-gold-light"
          style={
            {
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              boxShadow: '0 0 6px rgb(226 201 149 / .8)',
              '--d': `${p.d}s`,
              '--delay': `${p.delay}s`,
              '--dx': `${p.dx}px`,
              '--o': p.o,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}

/** Four-point sparkle. */
export function Sparkle({ className, color = '#C5A36B' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true" focusable="false">
      <path d="M10 0 C11 7 13 9 20 10 C13 11 11 13 10 20 C9 13 7 11 0 10 C7 9 9 7 10 0 Z" fill={color} />
    </svg>
  )
}

/**
 * Kanjeevaram silk border: kumkum-red band, gold zari stripes and a row of
 * "temple spire" triangles. Repeats to any width. `flip` for a bottom edge.
 */
export function TempleBorder({ className = '', flip = false }: { className?: string; flip?: boolean }) {
  const id = useId()
  return (
    <svg className={`block h-[22px] w-full ${flip ? '-scale-y-100' : ''} ${className}`} aria-hidden="true" focusable="false">
      <defs>
        <pattern id={`${id}t`} width="24" height="22" patternUnits="userSpaceOnUse">
          <rect width="24" height="22" fill="#9E1B1B" />
          <rect y="1.5" width="24" height="1.2" fill="#E5C27A" />
          <rect y="4" width="24" height="0.7" fill="#E5C27A" opacity="0.7" />
          <polygon points="0,20 12,7 24,20" fill="#D4A646" />
          <polygon points="5,20 12,12.5 19,20" fill="#6E1014" />
          <circle cx="12" cy="17.5" r="1.2" fill="#E5C27A" />
          <rect y="20" width="24" height="2" fill="#E5C27A" />
        </pattern>
      </defs>
      <rect width="100%" height="22" fill={`url(#${id}t)`} />
    </svg>
  )
}

/** Thoranam: mango leaves and marigold strands strung across a doorway. Repeats to any width. */
export function Thoranam({ className = '' }: { className?: string }) {
  const id = useId()
  return (
    <svg className={`block h-[64px] w-full ${className}`} aria-hidden="true" focusable="false">
      <defs>
        <pattern id={`${id}g`} width="60" height="64" patternUnits="userSpaceOnUse">
          <path d="M0 5 Q30 11 60 5" stroke="#8C6A3A" strokeWidth="1.6" fill="none" />
          {/* mango leaf */}
          <path d="M15 7 C24 18 22 40 15 56 C8 40 6 18 15 7 Z" fill="#3E8E3A" stroke="#2F6B3A" strokeWidth="0.8" />
          <path d="M15 10 V52" stroke="#A8D08D" strokeWidth="0.9" />
          {/* marigold strand */}
          <path d="M45 8 V50" stroke="#8C6A3A" strokeWidth="0.8" />
          {[
            [14, '#F28C28', '#C96410'],
            [28, '#F2B33D', '#D08A10'],
            [42, '#F28C28', '#C96410'],
          ].map(([cy, fill, edge]) => (
            <g key={cy as number}>
              <circle cx="45" cy={cy as number} r="6.8" fill={fill as string} stroke={edge as string} strokeWidth="2.2" strokeDasharray="1.6 1.4" />
              <circle cx="44" cy={(cy as number) - 1.5} r="2.2" fill="#FFE2A0" opacity="0.7" />
            </g>
          ))}
          <path d="M42 52 L45 58 L48 52 Z" fill="#3E8E3A" />
        </pattern>
      </defs>
      <rect width="100%" height="64" fill={`url(#${id}g)`} />
    </svg>
  )
}

/** Plantain (banana) tree, tied at the entrance of South Indian wedding halls, with a banana flower. */
export function PlantainTree({ className, flip = false }: { className?: string; flip?: boolean }) {
  const id = useId()
  const leaves: [string, number][] = [
    ['M78 150 C70 90 40 40 8 20 C30 50 52 100 70 160 Z', 0],
    ['M80 148 C96 86 132 44 170 34 C140 62 112 104 88 160 Z', 0.4],
    ['M78 156 C46 120 14 116 -6 128 C26 130 52 146 72 168 Z', 0.8],
    ['M82 154 C118 118 152 118 176 132 C142 132 114 148 90 168 Z', 1.2],
    ['M80 150 C82 96 86 50 92 6 C98 50 94 100 86 156 Z', 1.6],
  ]
  return (
    <svg viewBox="0 0 170 420" className={`${className} ${flip ? '-scale-x-100' : ''}`} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}l`} x1="0" x2="1">
          <stop offset="0" stopColor="#3E8E3A" />
          <stop offset="1" stopColor="#6DB04F" />
        </linearGradient>
        <linearGradient id={`${id}t`} x1="0" x2="1">
          <stop offset="0" stopColor="#6B8F3A" />
          <stop offset="0.5" stopColor="#A9C46A" />
          <stop offset="1" stopColor="#6B8F3A" />
        </linearGradient>
      </defs>
      {/* trunk */}
      <path d="M70 420 C72 330 74 240 76 150 L90 150 C92 240 96 330 100 420 Z" fill={`url(#${id}t)`} />
      {[200, 250, 300, 350, 395].map((y) => (
        <path key={y} d={`M${73 + (y - 150) * 0.01} ${y} Q85 ${y + 6} ${97 - (420 - y) * 0.01} ${y}`} stroke="#5E7F33" strokeWidth="1.2" fill="none" opacity="0.6" />
      ))}
      {/* leaves */}
      <g className="sway" style={{ transformOrigin: '84px 160px' }}>
        {leaves.map(([d, delay], i) => (
          <g key={i} style={{ animationDelay: `${delay}s` }}>
            <path d={d} fill={`url(#${id}l)`} stroke="#2F6B3A" strokeWidth="1" />
          </g>
        ))}
        <path d="M78 150 C70 90 40 40 8 20" stroke="#C9E3A6" strokeWidth="1.4" fill="none" />
        <path d="M80 148 C96 86 132 44 170 34" stroke="#C9E3A6" strokeWidth="1.4" fill="none" />
        <path d="M80 150 C82 96 86 50 92 6" stroke="#C9E3A6" strokeWidth="1.4" fill="none" />
        {/* banana bunch + flower */}
        <path d="M84 160 C100 175 108 190 110 214" stroke="#6B8F3A" strokeWidth="3" fill="none" />
        {[0, 1, 2, 3].map((k) => (
          <path key={k} d={`M${96 + k * 3} ${172 + k * 9} q10 2 14 -6`} stroke="#9CC25A" strokeWidth="5" strokeLinecap="round" fill="none" />
        ))}
        <path d="M110 212 C120 222 120 244 110 256 C100 244 100 222 110 212 Z" fill="#7A1F3D" stroke="#4E1027" strokeWidth="1" />
      </g>
    </svg>
  )
}

/** Purna kumbham: brass pot with mango leaves and a coconut, a symbol of abundance and blessing. */
export function Kalash({ className }: { className?: string }) {
  const id = useId()
  return (
    <svg viewBox="0 0 100 120" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}b`} x1="0" x2="1">
          <stop offset="0" stopColor="#8E6A35" />
          <stop offset="0.35" stopColor="#F2D58E" />
          <stop offset="0.65" stopColor="#C99A3B" />
          <stop offset="1" stopColor="#7C5B2C" />
        </linearGradient>
      </defs>
      {/* mango leaves fanning out of the neck */}
      {[-58, -30, 0, 30, 58].map((r) => (
        <path key={r} d="M50 48 C58 38 58 22 50 10 C42 22 42 38 50 48 Z" fill="#3E8E3A" stroke="#2F6B3A" strokeWidth="0.8" transform={`rotate(${r} 50 48)`} />
      ))}
      {/* coconut */}
      <ellipse cx="50" cy="36" rx="13" ry="15" fill="#8A5A2E" stroke="#5E3B1C" strokeWidth="1" />
      <path d="M42 28 Q50 22 58 28 M41 36 Q50 30 59 36" stroke="#B3804A" strokeWidth="1" fill="none" />
      {/* pot */}
      <path d="M36 50 H64 L62 58 C80 64 86 80 80 96 C74 110 26 110 20 96 C14 80 20 64 38 58 Z" fill={`url(#${id}b)`} stroke="#6B4D22" strokeWidth="1.2" />
      <path d="M38 58 H62" stroke="#6B4D22" strokeWidth="1" />
      {/* sacred thread + kumkum */}
      <path d="M22 78 Q50 88 78 78" stroke="#E8A317" strokeWidth="2.4" fill="none" />
      <path d="M22 82 Q50 92 78 82" stroke="#9E1B1B" strokeWidth="2" fill="none" />
      <circle cx="50" cy="72" r="3" fill="#9E1B1B" />
      <path d="M30 70 C32 84 36 96 44 102" stroke="#FFF4D6" strokeWidth="3" strokeLinecap="round" opacity="0.6" fill="none" />
    </svg>
  )
}
