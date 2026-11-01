import type { CSSProperties } from 'react'

function TeaLeaf() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <path d="M3 21 C3 10 10 3 21 3 C21 14 14 21 3 21 Z" fill="#5E9A45" stroke="#2F6B3A" strokeWidth={1} />
      <path d="M4 20 C9 15 14 10 19 5" stroke="#9CCB7A" strokeWidth={1.2} fill="none" />
    </svg>
  )
}

function CoffeeBean() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <ellipse cx={12} cy={12} rx={8} ry={10.5} fill="#5A3420" stroke="#3B2114" strokeWidth={1} />
      <path d="M12 2.5 C8.5 8 15.5 15 12 21.5" stroke="#2C170D" strokeWidth={1.6} fill="none" strokeLinecap="round" />
      <ellipse cx={9} cy={8} rx={2} ry={3} fill="#8A5A3C" opacity={0.6} />
    </svg>
  )
}

/** Granules: CTC tea is coarse and near-black; ground coffee is finer and browner. */
function Powder({ kind }: { kind: 'chai' | 'coffee' }) {
  const grains =
    kind === 'chai'
      ? [
          [6, 4, 1.8], [12, 2, 1.6], [17, 5, 1.9], [9, 9, 1.7], [15, 10, 1.5], [4, 13, 1.4], [11, 15, 1.8], [18, 15, 1.4], [8, 20, 1.5], [14, 21, 1.6],
        ]
      : [
          [7, 3, 1.1], [12, 2, 1], [16, 4, 1.2], [5, 8, 1], [10, 7, 1.2], [14, 9, 1], [19, 9, 1.1], [8, 12, 1.2], [13, 13, 1], [17, 14, 1.1],
          [6, 17, 1], [11, 18, 1.2], [15, 19, 1], [9, 22, 1.1], [13, 23, 1],
        ]
  return (
    <svg viewBox="0 0 24 26" className="h-full w-full">
      {grains.map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill={kind === 'chai' ? (i % 3 ? '#3E2414' : '#6B3B1E') : i % 2 ? '#6B4226' : '#8A5A36'} />
      ))}
    </svg>
  )
}

/**
 * Brewing animation above a vessel: a tea leaf (or roasted coffee bean) drifts down,
 * turns into powder with a little puff, and the powder pours into the glass/tumbler.
 * Positioned by the parent so its bottom edge sits at the vessel's rim. Hidden for reduced motion.
 */
export function Infusion({ kind }: { kind: 'chai' | 'coffee' }) {
  const d = kind === 'chai' ? 4.2 : 4.8
  const drops = [
    { delay: 0, dx: -6 },
    { delay: -d / 2, dx: 7 },
  ]
  return (
    <div className="infusion pointer-events-none absolute bottom-[67%] left-1/2 h-28 w-16 -translate-x-1/2" aria-hidden="true">
      {drops.map((drop, i) => {
        const vars = { '--d': `${d}s`, '--delay': `${drop.delay}s`, left: `calc(50% + ${drop.dx}px - 10px)` } as CSSProperties
        return (
          <div key={i}>
            <div className="infuse-source absolute top-0 h-5 w-5" style={vars}>
              {kind === 'chai' ? <TeaLeaf /> : <CoffeeBean />}
            </div>
            <div className="infuse-puff absolute top-0 h-5 w-5 rounded-full border border-white/80" style={vars} />
            <div className="infuse-powder absolute top-0 h-6 w-5" style={vars}>
              <Powder kind={kind} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
