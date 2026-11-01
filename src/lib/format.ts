import { wedding, type Venue, type WeddingEvent } from '../data/wedding'

/** True for empty strings and "[BRACKETED PLACEHOLDERS]". */
export function isPlaceholder(value: string | null | undefined): boolean {
  if (!value) return true
  return /\[[^\]]*\]/.test(value)
}

export function isRealDate(value: string | null | undefined): value is string {
  return !!value && /^\d{4}-\d{2}-\d{2}$/.test(value)
}

function toDate(isoDate: string, time: string | null = null): Date {
  return new Date(`${isoDate}T${time ?? '12:00'}:00${wedding.utcOffset}`)
}

export function formatDateParts(isoDate: string) {
  const d = toDate(isoDate)
  const part = (opts: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat('en-IN', { timeZone: wedding.timeZone, ...opts }).format(d)
  return {
    weekday: part({ weekday: 'long' }),
    day: part({ day: 'numeric' }),
    month: part({ month: 'long' }),
    year: part({ year: 'numeric' }),
  }
}

/** "Monday, 28 December 2026", or the placeholder text unchanged. */
export function formatDate(value: string): string {
  if (!isRealDate(value)) return value
  const p = formatDateParts(value)
  return `${p.weekday}, ${p.day} ${p.month} ${p.year}`
}

/** Moment the countdown counts to: event start time, or the start of the day if no time is set. */
export function eventStart(event: WeddingEvent): Date | null {
  if (!isRealDate(event.date)) return null
  return toDate(event.date, event.startTime ?? '00:00')
}

export function hasRealAddress(venue: Venue): boolean {
  // An empty name is fine (address-only venue); a [PLACEHOLDER] name is not.
  return (venue.name === '' || !isPlaceholder(venue.name)) && !isPlaceholder(venue.address)
}

/** "Name, address", or just the address when there's no venue name. */
export function venueLabel(venue: Venue): string {
  return [venue.name, venue.address].filter(Boolean).join(', ')
}

export function mapsLink(venue: Venue): string | null {
  if (venue.mapsUrl && !isPlaceholder(venue.mapsUrl)) return venue.mapsUrl
  if (!hasRealAddress(venue)) return null
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venueLabel(venue))}`
}

/** Separate "Directions" button: not needed when the couple supplied their own Maps link (it already gives directions). */
export function directionsLink(venue: Venue): string | null {
  if (!hasRealAddress(venue) || (venue.mapsUrl && !isPlaceholder(venue.mapsUrl))) return null
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(venueLabel(venue))}`
}

/** Keyless Google Maps embed. */
export function mapsEmbed(venue: Venue): string | null {
  if (!hasRealAddress(venue)) return null
  const q = venue.coordinates ? `${venue.coordinates.lat},${venue.coordinates.lng}` : venueLabel(venue)
  return `https://www.google.com/maps?q=${encodeURIComponent(q)}&z=15&output=embed`
}

export function telLink(phone: string): string | null {
  if (isPlaceholder(phone)) return null
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

export function whatsappChatLink(phone: string, text?: string): string | null {
  if (isPlaceholder(phone)) return null
  const digits = phone.replace(/\D/g, '')
  return `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ''}`
}

export function shareUrl(): string {
  if (wedding.share.siteUrl) return wedding.share.siteUrl
  return `${window.location.origin}${window.location.pathname}`
}
