import { useEffect, useState } from 'react'
import { wedding } from '../../data/wedding'
import { eventStart } from '../../lib/format'

function remaining(target: Date) {
  const ms = Math.max(0, target.getTime() - Date.now())
  return {
    done: ms === 0,
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor((ms / 3_600_000) % 24),
    minutes: Math.floor((ms / 60_000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  }
}

const target = eventStart(wedding.wedding)

/** Live countdown to the wedding (start time, or the start of the day in IST if no time is set). */
export function Countdown() {
  const [left, setLeft] = useState(() => (target ? remaining(target) : null))

  useEffect(() => {
    if (!target) return
    const id = window.setInterval(() => setLeft(remaining(target)), 1000)
    return () => window.clearInterval(id)
  }, [])

  if (!target || !left) return null

  if (left.done) {
    return (
      <p className="text-center font-display text-2xl text-wine italic">
        The day is here. Thank you for celebrating with us ♡
      </p>
    )
  }

  const units = [
    { label: 'Days', value: left.days },
    { label: 'Hours', value: left.hours },
    { label: 'Minutes', value: left.minutes },
    { label: 'Seconds', value: left.seconds },
  ]

  return (
    <div>
      <p className="sr-only">
        {left.days} days and {left.hours} hours until the wedding.
      </p>
      <div className="mx-auto grid max-w-md grid-cols-4 gap-2 sm:gap-3" aria-hidden="true">
        {units.map((u) => (
          <div key={u.label} className="rounded-lg border border-gold/50 bg-white/50 px-1 py-3 text-center shadow-[inset_0_0_0_3px_rgb(248_242_233)]">
            <span className="block font-display text-[2rem] leading-none font-semibold text-wine tabular-nums sm:text-[2.6rem]">
              {String(u.value).padStart(2, '0')}
            </span>
            <span className="mt-1.5 block text-[10px] font-bold tracking-[0.2em] text-coffee uppercase sm:text-[11px]">{u.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
