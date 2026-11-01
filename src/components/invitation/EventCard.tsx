import { CalendarPlus, Clock, MapPin, Navigation } from 'lucide-react'
import type { WeddingEvent } from '../../data/wedding'
import { directionsLink, formatDate, hasRealAddress, isPlaceholder, isRealDate, mapsEmbed, mapsLink, venueLabel } from '../../lib/format'
import { downloadCalendarFile } from '../../lib/calendar'

const pill =
  'inline-flex min-h-11 items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-bold tracking-wide transition active:scale-[0.98]'

export function EventCard({ event, headingId }: { event: WeddingEvent; headingId: string }) {
  const map = mapsLink(event.venue)
  const directions = directionsLink(event.venue)
  const embed = event.venue.showEmbeddedMap ? mapsEmbed(event.venue) : null

  return (
    <article aria-labelledby={headingId} className="text-center">
      <h3 id={headingId} className="font-display text-3xl font-semibold text-wine sm:text-4xl">
        {event.title}
      </h3>
      <dl className="mx-auto mt-5 grid max-w-md gap-4 text-left">
        <div className="flex gap-3">
          <dt className="mt-0.5 shrink-0 text-terracotta-deep">
            <Clock className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Date and time</span>
          </dt>
          <dd>
            <p className={`font-semibold text-ink ${isPlaceholder(event.date) ? 'italic text-coffee/70' : ''}`}>{formatDate(event.date)}</p>
            <p className={`text-coffee ${isPlaceholder(event.timeLabel) ? 'italic opacity-75' : ''}`}>{event.timeLabel}</p>
          </dd>
        </div>
        <div className="flex gap-3">
          <dt className="mt-0.5 shrink-0 text-terracotta-deep">
            <MapPin className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Venue</span>
          </dt>
          <dd>
            {event.venue.name && <p className={`font-semibold text-ink ${isPlaceholder(event.venue.name) ? 'italic text-coffee/70' : ''}`}>{event.venue.name}</p>}
            <p className={`${event.venue.name ? 'text-coffee' : 'font-semibold text-ink'} ${isPlaceholder(event.venue.address) ? 'italic opacity-75' : ''}`}>{event.venue.address}</p>
          </dd>
        </div>
      </dl>
      {event.note && <p className="mx-auto mt-4 max-w-md text-[15px] text-coffee italic">{event.note}</p>}

      <div className="mt-6 flex flex-wrap justify-center gap-2.5">
        {map && (
          <a href={map} target="_blank" rel="noopener noreferrer" className={`${pill} bg-wine text-ivory hover:bg-wine-deep`}>
            <MapPin className="h-4 w-4" aria-hidden="true" />
            {directions ? 'Open in Google Maps' : 'Get directions'}
            <span className="sr-only"> to {venueLabel(event.venue)} (opens Google Maps)</span>
          </a>
        )}
        {directions && (
          <a href={directions} target="_blank" rel="noopener noreferrer" className={`${pill} border border-wine/30 text-wine hover:bg-wine/5`}>
            <Navigation className="h-4 w-4" aria-hidden="true" />
            Directions
          </a>
        )}
        {isRealDate(event.date) && (
          <button type="button" onClick={() => downloadCalendarFile(event)} className={`${pill} border border-wine/30 text-wine hover:bg-wine/5`}>
            <CalendarPlus className="h-4 w-4" aria-hidden="true" />
            Add to calendar
          </button>
        )}
      </div>
      {!hasRealAddress(event.venue) && (
        <p className="mt-3 text-sm text-coffee/75 italic">Map and directions will appear here once the venue address is added.</p>
      )}
      {embed && (
        <div className="mx-auto mt-6 aspect-[4/3] w-full max-w-md overflow-hidden rounded-lg border border-gold/50 sm:aspect-video">
          <iframe
            title={`Map showing ${venueLabel(event.venue)}`}
            src={embed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full border-0"
          />
        </div>
      )}
    </article>
  )
}
