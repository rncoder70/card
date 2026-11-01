import type { ReactNode } from 'react'
import { RotateCcw } from 'lucide-react'
import { Monogram } from './Monogram'
import { EventCard } from './EventCard'
import { Countdown } from './Countdown'
import { SharePanel } from './SharePanel'
import { Contacts } from './Contacts'
import { ClosingSection } from './ClosingSection'
import { Divider, GoldParticles, TempleBorder, JasmineGarland, Nilavilakku, OrnateFrame } from '../illustrations/Ornaments'
import { FallingJasmine } from '../illustrations/Sky'
import { FadeUp, InView } from '../ui/Reveal'
import { useDelight } from '../ui/delightContext'
import { easterEggs, story, wedding } from '../../data/wedding'
import { eventStart, formatDateParts, isPlaceholder, isRealDate } from '../../lib/format'

const { bride, groom } = wedding.couple

const NAV = [
  { href: '#details', label: 'Details' },
  ...(wedding.reception ? [{ href: '#reception', label: 'Reception' }] : []),
  { href: '#share', label: 'Share' },
]

function CardSection({ id, eyebrow, title, children }: { id?: string; eyebrow?: string; title?: string; children: ReactNode }) {
  const headingId = id ? `${id}-title` : undefined
  return (
    <InView>
      <section id={id} aria-labelledby={title ? headingId : undefined} className="scroll-mt-24 px-1 py-10 sm:py-12">
        {(eyebrow || title) && (
          <header className="mb-6 text-center">
            {eyebrow && <p className="text-[11px] font-bold tracking-[0.32em] text-terracotta-deep uppercase">{eyebrow}</p>}
            {title && (
              <h2 id={headingId} className="mt-1.5 font-display text-[2rem] leading-tight font-semibold text-wine sm:text-[2.6rem]">
                {title}
              </h2>
            )}
          </header>
        )}
        {children}
      </section>
      <Divider className="mx-auto h-4 w-40 opacity-80" />
    </InView>
  )
}

function DateStrip() {
  if (!isRealDate(wedding.wedding.date)) {
    return <p className="font-display text-2xl text-champagne italic">{wedding.wedding.date}</p>
  }
  const d = formatDateParts(wedding.wedding.date)
  return (
    <div className="mx-auto flex max-w-sm items-center justify-center gap-4 text-champagne sm:gap-6">
      <span className="w-24 border-y border-gold/60 py-2 text-[12px] font-bold tracking-[0.25em] uppercase">{d.weekday}</span>
      <span className="font-display text-6xl leading-none font-semibold text-gold-light">{d.day}</span>
      <span className="w-24 border-y border-gold/60 py-2 text-[12px] font-bold tracking-[0.25em] uppercase">
        {d.month.slice(0, 3)} {d.year}
      </span>
    </div>
  )
}

export function InvitationPage({ onReplay }: { onReplay: () => void }) {
  const { note } = useDelight()
  const hasCountdown = !!eventStart(wedding.wedding)

  return (
    <div className="min-h-[100svh] bg-wine-night">
      {/* Sticky in-page navigation */}
      <nav aria-label="Invitation sections" className="sticky top-0 z-40 border-b border-gold/25 bg-wine-deep/85 pt-[env(safe-area-inset-top)] backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center gap-2 px-3 py-2 sm:px-6">
          <a href="#top" className="hidden shrink-0 rounded px-1 font-display text-xl text-gold-light italic sm:block" aria-label="Back to top">
            G<span className="mx-0.5 text-sm">♡</span>A
          </a>
          <ul className="mx-auto flex items-center gap-0.5 overflow-x-auto sm:gap-2">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="block rounded-full px-2 py-2.5 text-[11px] font-bold tracking-[0.1em] text-champagne/90 uppercase transition hover:bg-wine hover:text-gold-light sm:px-3.5 sm:text-xs">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              onClick={onReplay}
              aria-label="Replay the story"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 text-gold-light transition hover:bg-wine"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>

      <main id="top">
        {/* Royal hero */}
        <header className="royal-pattern relative overflow-hidden px-5 pt-24 pb-16 text-center sm:pt-28">
          <FallingJasmine count={12} />
          <GoldParticles count={14} />
          <JasmineGarland className="absolute inset-x-4 top-0 sm:inset-x-20" />
          <button
            type="button"
            onClick={() => note(easterEggs.lamp)}
            aria-label="Brass nilavilakku lamp. Tap to light a wish"
            className="absolute bottom-6 left-2 w-10 rounded-lg sm:left-10 sm:w-16"
          >
            <Nilavilakku className="h-auto w-full" />
          </button>
          <button
            type="button"
            onClick={() => note(easterEggs.lamp)}
            aria-label="Brass nilavilakku lamp. Tap to light a wish"
            className="absolute right-2 bottom-6 w-10 rounded-lg sm:right-10 sm:w-16"
          >
            <Nilavilakku className="h-auto w-full" />
          </button>

          <div className="relative mx-auto max-w-xl">
            <FadeUp delay={0.4}>
              <Monogram />
            </FadeUp>
            <FadeUp as="p" delay={0.6} className="mt-7 text-[11px] font-bold tracking-[0.35em] text-gold uppercase">
              The wedding invitation
            </FadeUp>
            <FadeUp as="p" delay={0.7} className="mx-auto mt-3 max-w-xs font-display text-xl leading-snug text-champagne italic sm:max-w-sm sm:text-2xl">
              {story.royal.invite}
            </FadeUp>
            <FadeUp delay={0.9}>
              <h1 className="mt-8 font-display leading-[0.95] font-semibold">
                <span className="gold-text block text-[2.9rem] sm:text-7xl">{bride.fullName}</span>
                {bride.parents && <span className={`mt-2 block font-body text-[13px] font-normal text-champagne/80 ${isPlaceholder(bride.parents) ? 'italic' : ''}`}>{bride.parents}</span>}
                <span className="my-3 block font-display text-4xl font-normal text-gold italic sm:text-5xl" aria-hidden="true">
                  &amp;
                </span>
                <span className="sr-only">and</span>
                <span className="gold-text block text-[2.9rem] sm:text-7xl">{groom.fullName}</span>
                {groom.parents && <span className={`mt-2 block font-body text-[13px] font-normal text-champagne/80 ${isPlaceholder(groom.parents) ? 'italic' : ''}`}>{groom.parents}</span>}
              </h1>
            </FadeUp>
            <FadeUp delay={1.2} className="mt-9">
              <DateStrip />
            </FadeUp>
            <FadeUp as="p" delay={1.4} className="mx-auto mt-8 max-w-xs font-display text-lg text-champagne/90 italic sm:max-w-sm sm:text-xl">
              “{wedding.couple.tagline}”
            </FadeUp>
          </div>
        </header>

        {/* The invitation card */}
        <div className="royal-pattern relative px-3 pt-4 pb-16 sm:px-6">
          <OrnateFrame className="on-ivory paper-grain relative mx-auto max-w-2xl overflow-hidden rounded-md bg-ivory px-5 py-6 shadow-[0_0_60px_-10px_rgb(255_236_200/0.25),0_40px_80px_-30px_rgb(0_0_0/0.7)] sm:px-12 sm:py-10">
            <div className="-mx-5 -mt-6 mb-2 sm:-mx-12 sm:-mt-10">
              <TempleBorder />
            </div>
            <CardSection id="details" eyebrow="Save the date" title={wedding.wedding.title}>
              <EventCard event={{ ...wedding.wedding, title: 'Ceremony' }} headingId="ceremony-title" />
            </CardSection>

            {hasCountdown && (
              <CardSection eyebrow="Until we say “I do”" title="Counting down to forever">
                <Countdown />
              </CardSection>
            )}

            {wedding.reception && (
              <CardSection id="reception" eyebrow="Join us again" title={wedding.reception.title}>
                <EventCard event={{ ...wedding.reception, title: 'Celebration' }} headingId="reception-title" />
              </CardSection>
            )}

            {wedding.dressCode && (
              <CardSection eyebrow="What to wear" title="Dress code">
                <p className="text-center text-[17px] text-coffee">{wedding.dressCode}</p>
              </CardSection>
            )}

            {wedding.photos.length > 0 && (
              <CardSection eyebrow="A moment of ours" title="Us">
                <div className={`grid gap-4 ${wedding.photos.length > 1 ? 'sm:grid-cols-2' : ''}`}>
                  {wedding.photos.map((p) => (
                    <figure key={p.src} className="overflow-hidden rounded-md border border-gold/50 bg-white/60 p-2">
                      <img src={p.src} alt={p.alt} loading="lazy" decoding="async" className="h-auto w-full rounded-sm object-cover" />
                      {(p.caption || p.credit) && (
                        <figcaption className="px-1 pt-2 text-center text-sm text-coffee">
                          {p.caption}
                          {p.credit && <span className="block text-xs opacity-70">Photo: {p.credit}</span>}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              </CardSection>
            )}

            <CardSection id="share" eyebrow="Spread the joy" title="Share our invitation">
              <p className="mb-5 text-center text-coffee">Send this little story to family and friends.</p>
              <SharePanel />
            </CardSection>

            <InView>
              <section aria-labelledby="contact-title" className="px-1 py-10 sm:py-12">
                <header className="mb-6 text-center">
                  <p className="text-[11px] font-bold tracking-[0.32em] text-terracotta-deep uppercase">Questions?</p>
                  <h2 id="contact-title" className="mt-1.5 font-display text-[2rem] font-semibold text-wine sm:text-[2.6rem]">
                    Get in touch
                  </h2>
                </header>
                <Contacts />
              </section>
            </InView>
          </OrnateFrame>
        </div>

        <ClosingSection onReplay={onReplay} />
      </main>
    </div>
  )
}
