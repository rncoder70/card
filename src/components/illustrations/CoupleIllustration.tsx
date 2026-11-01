import { useId } from 'react'
import { motion } from 'motion/react'

/**
 * Placeholder storybook portrait of the couple, drawn from their photo:
 * Arjun in an ivory kurta (beard, glasses), Gayathri in an ivory-sage lehenga
 * with a coral dupatta and long wavy hair, holding hands.
 *
 * Replace with commissioned caricatures via `couple.coupleIllustration`
 * (or bride/groom `illustration`) in src/data/wedding.ts.
 */
export function CoupleIllustration({ smiling, className }: { smiling: boolean; className?: string }) {
  const id = useId()
  const t = { duration: 1.1, ease: [0.22, 1, 0.36, 1] as const }
  const SKIN_A = '#C48D69'
  const SKIN_G = '#D7A27F'
  const HAIR_A = '#2A1C15'
  const HAIR_G = '#4A2A1E'
  const INK = '#3B2A20'

  return (
    <svg viewBox="0 0 340 420" className={className} aria-hidden="true" focusable="false">
      <defs>
        <pattern id={`${id}k`} width="10" height="12" patternUnits="userSpaceOnUse">
          <rect width="10" height="12" fill="#F3ECDF" />
          <circle cx="5" cy="6" r="1.2" fill="#DCCBAE" />
          <circle cx="0" cy="0" r="0.8" fill="#E3D5BC" />
          <circle cx="10" cy="12" r="0.8" fill="#E3D5BC" />
        </pattern>
        <pattern id={`${id}l`} width="26" height="26" patternUnits="userSpaceOnUse">
          <rect width="26" height="26" fill="#E5E4D2" />
          <path d="M5 8 C8 3 13 4 12 9 C9 10 6 10 5 8 Z" fill="#9AA889" opacity=".7" />
          <circle cx="18" cy="18" r="2.6" fill="#C98872" opacity=".55" />
          <circle cx="18" cy="18" r="1" fill="#C5A36B" />
          <path d="M20 4 C22 1 25 2 24 5" stroke="#9AA889" strokeWidth=".8" fill="none" />
        </pattern>
        <linearGradient id={`${id}d`} x1="0" x2="1">
          <stop offset="0" stopColor="#B9503F" />
          <stop offset="1" stopColor="#D2705A" />
        </linearGradient>
      </defs>

      {/* ground */}
      <ellipse cx={176} cy={398} rx={128} ry={9} fill="#684532" opacity={0.12} />

      {/* ── Gayathri: back drape + hair behind body ── */}
      <path d="M206 108 C226 102 242 110 248 126 C254 170 256 220 262 272 L250 274 C244 222 238 172 230 132 Z" fill="#B9503F" opacity={0.85} />
      <path
        d="M200 62 C196 42 216 34 230 42 C246 50 248 68 244 84 C252 102 248 120 254 136 C258 152 250 168 238 172 C242 154 232 140 234 124 C232 110 228 100 224 92 Z"
        fill={HAIR_G}
      />
      {[
        [250, 104],
        [254, 124],
        [252, 146],
        [244, 164],
        [246, 86],
      ].map(([cx, cy]) => (
        <circle key={`${cx}${cy}`} cx={cx} cy={cy} r={6} fill={HAIR_G} />
      ))}

      {/* ── Arjun ── */}
      {/* back arm */}
      <path d="M100 114 C90 142 88 182 92 222" stroke="#E2D6C1" strokeWidth={18} strokeLinecap="round" fill="none" />
      <circle cx={92} cy={228} r={6.5} fill={SKIN_A} />
      {/* legs + shoes */}
      <path d="M100 296 L103 390 H119 L121 296 Z" fill="#EDE3CF" />
      <path d="M125 296 L128 390 H144 L143 296 Z" fill="#E7DCC6" />
      <path d="M100 389 H122 C126 389 130 392 128 397 H98 C96 394 97 390 100 389 Z" fill="#D8C29C" />
      <path d="M126 389 H148 C154 389 158 392 156 397 H124 C122 394 123 390 126 389 Z" fill="#CDB68E" />
      {/* kurta */}
      <path d="M98 108 C110 101 134 101 147 108 L153 160 L157 302 C140 309 104 309 87 302 L92 160 Z" fill={`url(#${id}k)`} stroke="#D9CBB2" strokeWidth={1} />
      <path d="M121 106 V170" stroke="#D9CBB2" strokeWidth={1.2} />
      {[118, 132, 146, 160].map((y) => (
        <circle key={y} cx={121} cy={y} r={1.5} fill="#C5A36B" />
      ))}
      {/* neck + collar */}
      <rect x={114} y={90} width={13} height={16} rx={4} fill={SKIN_A} />
      <path d="M112 100 H130 V108 C124 110 118 110 112 108 Z" fill="#E9DFCC" stroke="#D9CBB2" strokeWidth={0.8} />
      {/* front arm reaching to the hands */}
      <path d="M140 116 C153 140 153 166 153 178 C157 192 162 200 166 207" stroke="#D9CBB2" strokeWidth={19} strokeLinecap="round" fill="none" />
      <path d="M140 116 C153 140 153 166 153 178 C157 192 162 200 166 207" stroke="#F3ECDF" strokeWidth={16} strokeLinecap="round" fill="none" />
      {/* head */}
      <motion.g initial={false} animate={{ rotate: smiling ? 5 : 0 }} transition={t} style={{ originX: 0.5, originY: 1 }}>
        <ellipse cx={106} cy={76} rx={4.5} ry={6.5} fill="#B47D5B" />
        <ellipse cx={123} cy={73} rx={19} ry={23} fill={SKIN_A} />
        <path d="M102 72 C97 50 112 39 129 41 C144 42 148 54 143 63 C137 56 124 55 116 59 C110 63 108 70 107 77 Z" fill={HAIR_A} />
        <path d="M106 80 C108 96 118 102 128 101 C137 99 141 91 141 82 C137 88 131 90 125 88 C119 86 112 84 106 80 Z" fill={HAIR_A} opacity={0.88} />
        <path d="M127 84.5 C131 82.5 135 82.5 139 84.5" stroke={HAIR_A} strokeWidth={2.4} strokeLinecap="round" fill="none" />
        <path d="M140.5 71 L143.5 79 L139.5 80.5" fill="none" stroke="#9E6A4C" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" />
        {/* glasses */}
        <path d="M108 72 L125 70.5" stroke="#9C8A6E" strokeWidth={1.2} />
        <circle cx={131.5} cy={71.5} r={6.4} fill="#fff" fillOpacity={0.18} stroke="#9C8A6E" strokeWidth={1.4} />
        <path d="M138 70.5 H140.5" stroke="#9C8A6E" strokeWidth={1.4} />
        {/* eyes: open → happy-closed */}
        <motion.g initial={false} animate={{ opacity: smiling ? 0 : 1 }} transition={t}>
          <ellipse cx={132.5} cy={71.5} rx={1.7} ry={2.1} fill={INK} />
        </motion.g>
        <motion.path initial={false} animate={{ opacity: smiling ? 1 : 0 }} transition={t} d="M129 72.5 Q132.5 69 136 72.5" stroke={INK} strokeWidth={1.6} strokeLinecap="round" fill="none" />
        <path d="M128.5 64.5 Q132.5 62.5 136.5 64" stroke={HAIR_A} strokeWidth={1.6} strokeLinecap="round" fill="none" />
        {/* mouth */}
        <motion.path initial={false} animate={{ opacity: smiling ? 0 : 1 }} transition={t} d="M130 89 Q133.5 90 137 89" stroke="#7A3E30" strokeWidth={1.6} strokeLinecap="round" fill="none" />
        <motion.path initial={false} animate={{ opacity: smiling ? 1 : 0 }} transition={t} d="M128.5 88 Q133.5 94 138.5 88 Z" fill="#F6EEE6" stroke="#7A3E30" strokeWidth={1.4} strokeLinejoin="round" />
        <motion.ellipse initial={false} animate={{ opacity: smiling ? 0.45 : 0.15 }} transition={t} cx={129} cy={80} rx={4.5} ry={2.6} fill="#D9826B" />
      </motion.g>

      {/* ── Gayathri: body ── */}
      {/* lehenga */}
      <path d="M197 168 H238 C258 230 272 320 281 392 C251 403 182 403 153 392 C163 320 180 230 197 168 Z" fill={`url(#${id}l)`} />
      <path d="M155 378 C190 389 248 389 279 378 L281 392 C251 403 182 403 153 392 Z" fill="#C5A36B" opacity={0.85} />
      <path d="M157 370 C190 381 248 381 278 370" stroke="#C5A36B" strokeWidth={1.2} fill="none" strokeDasharray="2 3" />
      {/* blouse */}
      <path d="M194 112 C204 104 228 104 240 112 L238 172 H196 Z" fill="#EFE3CC" />
      {[
        [204, 130],
        [216, 142],
        [228, 128],
        [210, 158],
        [226, 156],
      ].map(([cx, cy]) => (
        <circle key={`${cx}${cy}`} cx={cx} cy={cy} r={1.4} fill="#C5A36B" />
      ))}
      <path d="M196 168 H238" stroke="#C5A36B" strokeWidth={2.4} />
      <rect x={208} y={96} width={12} height={14} rx={4} fill={SKIN_G} />
      {/* front dupatta cascade */}
      <path d="M195 108 C187 150 183 220 177 300 C173 340 171 370 173 393 L197 395 C197 360 199 320 203 280 C207 220 209 160 211 112 Z" fill={`url(#${id}d)`} />
      <path d="M201 116 C197 160 194 230 189 300 C186 340 185 370 186 394" stroke="#A9B49A" strokeWidth={5} fill="none" opacity={0.9} />
      <path d="M195 108 C187 150 183 220 177 300 C173 340 171 370 173 393" stroke="#C5A36B" strokeWidth={1.4} fill="none" />
      {/* arm reaching to the hands */}
      <path d="M200 118 C194 140 192 156 192 168" stroke="#EFE3CC" strokeWidth={13} strokeLinecap="round" fill="none" />
      <path d="M192 168 C188 184 182 198 176 207" stroke={SKIN_G} strokeWidth={9} strokeLinecap="round" fill="none" />
      <path d="M181 197 l5 3 M183 194 l5 3" stroke="#C5A36B" strokeWidth={1.8} strokeLinecap="round" />

      {/* hands */}
      <circle cx={167} cy={210} r={7} fill={SKIN_A} />
      <ellipse cx={176} cy={210} rx={7} ry={6} fill={SKIN_G} />
      <path d="M170 214 Q174 216 178 214" stroke="#B47D5B" strokeWidth={1} fill="none" />

      {/* head */}
      <motion.g initial={false} animate={{ rotate: smiling ? -5 : 0 }} transition={t} style={{ originX: 0.5, originY: 1 }}>
        <ellipse cx={212} cy={80} rx={17} ry={21} fill={SKIN_G} />
        <path d="M195 76 C193 56 208 47 223 49 C234 51 239 62 236 72 C238 84 236 94 232 102 C228 92 226 80 222 72 C214 64 204 66 199 72 Z" fill={HAIR_G} />
        <path d="M222 60 C230 66 234 76 232 90" stroke="#6B4130" strokeWidth={1.2} fill="none" />
        <path d="M196.5 82 L193.5 88 L197 89" fill="none" stroke="#B57E5E" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
        {/* jhumka */}
        <path d="M226 92 v4" stroke="#C5A36B" strokeWidth={1} />
        <path d="M222.5 96 Q226 92 229.5 96 L228.5 100 H223.5 Z" fill="#C5A36B" />
        {/* eye */}
        <motion.g initial={false} animate={{ opacity: smiling ? 0 : 1 }} transition={t}>
          <ellipse cx={202.5} cy={79} rx={1.6} ry={2} fill={INK} />
          <path d="M200 76.5 l-2 -1.5" stroke={INK} strokeWidth={1} strokeLinecap="round" />
        </motion.g>
        <motion.path initial={false} animate={{ opacity: smiling ? 1 : 0 }} transition={t} d="M199 80 Q202.5 76.5 206 80" stroke={INK} strokeWidth={1.6} strokeLinecap="round" fill="none" />
        <path d="M199 72.5 Q203 70.5 207 72" stroke={HAIR_G} strokeWidth={1.4} strokeLinecap="round" fill="none" />
        {/* mouth */}
        <motion.path initial={false} animate={{ opacity: smiling ? 0 : 1 }} transition={t} d="M198 93 Q201 94 204 93" stroke="#9C4A44" strokeWidth={1.6} strokeLinecap="round" fill="none" />
        <motion.path initial={false} animate={{ opacity: smiling ? 1 : 0 }} transition={t} d="M197 92 Q201.5 98 206 92 Z" fill="#F7EFE8" stroke="#9C4A44" strokeWidth={1.4} strokeLinejoin="round" />
        <motion.ellipse initial={false} animate={{ opacity: smiling ? 0.5 : 0.2 }} transition={t} cx={206} cy={87} rx={4.5} ry={2.6} fill="#D9826B" />
      </motion.g>
    </svg>
  )
}
