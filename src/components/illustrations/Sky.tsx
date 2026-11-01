import { useMemo, type CSSProperties } from 'react'

/** Deterministic pseudo-random sequence so the sky is identical on every render. */
function seeded(seed: number) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

function JasminePetal() {
  return (
    <svg viewBox="0 0 14 24" className="h-full w-full">
      <path d="M7 0.5 C12 5 13 14 7 23.5 C1 14 2 5 7 0.5 Z" fill="#FFFDF7" />
      <path d="M7 3 C9 8 9 15 7 21" stroke="#E9E1CF" strokeWidth="0.8" fill="none" />
    </svg>
  )
}

function JasmineBlossom() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full">
      {[0, 72, 144, 216, 288].map((r) => (
        <path key={r} d="M12 12 C9.5 8 10 3 12 1.5 C14 3 14.5 8 12 12 Z" fill="#FFFDF7" stroke="#ECE4D2" strokeWidth="0.5" transform={`rotate(${r} 12 12)`} />
      ))}
      <circle cx="12" cy="12" r="1.8" fill="#F1DFA8" />
    </svg>
  )
}

/** White jasmine petals (and the odd full blossom) drifting down from the sky. */
export function FallingJasmine({ count = 16 }: { count?: number }) {
  const petals = useMemo(() => {
    const r = seeded(29)
    return Array.from({ length: count }, (_, i) => ({
      left: r() * 100,
      blossom: i % 4 === 0,
      size: 9 + r() * 9,
      d: 11 + r() * 10,
      delay: -r() * 20,
      s: 3 + r() * 3,
      drift: (r() - 0.5) * 140,
      o: 0.65 + r() * 0.35,
      mobile: i < 10,
    }))
  }, [count])
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {petals.map((p, i) => (
        <div
          key={i}
          className={`petal-fall absolute top-0 ${p.mobile ? '' : 'hidden sm:block'}`}
          style={{ left: `${p.left}%`, '--d': `${p.d}s`, '--delay': `${p.delay}s`, '--drift': `${p.drift}px` } as CSSProperties}
        >
          <div
            className="petal-sway"
            style={
              {
                width: p.blossom ? p.size * 1.5 : p.size * 0.6,
                height: p.blossom ? p.size * 1.5 : p.size,
                opacity: p.o,
                filter: 'drop-shadow(0 0 4px rgb(255 250 235 / .45))',
                '--s': `${p.s}s`,
              } as CSSProperties
            }
          >
            {p.blossom ? <JasmineBlossom /> : <JasminePetal />}
          </div>
        </div>
      ))}
    </div>
  )
}
