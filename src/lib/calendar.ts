import { wedding, type WeddingEvent } from '../data/wedding'
import { eventStart, hasRealAddress, isRealDate, venueLabel } from './format'

const pad = (n: number) => String(n).padStart(2, '0')
const utcStamp = (d: Date) =>
  `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`

/** Downloads an .ics file for the event. All-day if no start time is set yet. */
export function downloadCalendarFile(event: WeddingEvent) {
  if (!isRealDate(event.date)) return
  const { bride, groom } = wedding.couple
  const title = `${bride.shortName} & ${groom.shortName} · ${event.title}`
  const location = hasRealAddress(event.venue) ? venueLabel(event.venue) : ''
  let when: string
  if (event.startTime) {
    const start = eventStart(event)!
    const end = event.endTime ? eventStart({ ...event, startTime: event.endTime })! : new Date(start.getTime() + 3 * 60 * 60 * 1000)
    when = `DTSTART:${utcStamp(start)}\r\nDTEND:${utcStamp(end)}`
  } else {
    const day = event.date.replace(/-/g, '')
    const next = new Date(`${event.date}T12:00:00Z`)
    next.setUTCDate(next.getUTCDate() + 1)
    when = `DTSTART;VALUE=DATE:${day}\r\nDTEND;VALUE=DATE:${next.toISOString().slice(0, 10).replace(/-/g, '')}`
  }
  const esc = (s: string) => s.replace(/([,;\\])/g, '\\$1').replace(/\n/g, '\\n')
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//A Perfect Blend//Wedding Invitation//EN',
    'BEGIN:VEVENT',
    `UID:${event.date}-${event.title.replace(/\W/g, '')}@a-perfect-blend`,
    `DTSTAMP:${utcStamp(new Date())}`,
    when,
    `SUMMARY:${esc(title)}`,
    location ? `LOCATION:${esc(location)}` : '',
    'END:VEVENT',
    'END:VCALENDAR',
  ]
    .filter(Boolean)
    .join('\r\n')
  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }))
  const a = document.createElement('a')
  a.href = url
  a.download = `${bride.shortName}-${groom.shortName}-${event.title.replace(/\W+/g, '-').toLowerCase()}.ics`
  document.body.appendChild(a)
  a.click()
  a.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}
