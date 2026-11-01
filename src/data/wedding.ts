/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  A PERFECT BLEND: every word, date and link on the invitation lives here.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  How to edit
 *  • Anything written like "[THIS]" is a placeholder. The site detects these
 *    and hides map / call / WhatsApp buttons until a real value is filled in.
 *  • Dates use ISO format: "YYYY-MM-DD". Times use 24h "HH:MM" (India time).
 *    The weekday is calculated automatically, so it always matches the date.
 *  • Set an optional field to `null` to hide it completely.
 *
 *  See README.md for step-by-step instructions.
 */

export interface Venue {
  /** Leave '' to show only the address. */
  name: string
  address: string
  /**
   * Optional: paste a Google Maps link. When set, the map/directions button opens exactly this link.
   * If null, one is built from name + address.
   */
  mapsUrl: string | null
  /** Optional exact pin for the embedded map (more precise than searching the address). */
  coordinates?: { lat: number; lng: number } | null
  /** Show an embedded map under the address (only when the address is real). */
  showEmbeddedMap: boolean
}

export interface WeddingEvent {
  title: string
  /** "YYYY-MM-DD" or a "[PLACEHOLDER]". */
  date: string
  /** 24h "HH:MM" start time used by the countdown and calendar, or null if not fixed yet. */
  startTime: string | null
  /** Optional 24h "HH:MM" end time for the calendar file (defaults to 3 hours after the start). */
  endTime?: string | null
  /** What guests read, e.g. "Muhurtham · 10:30 – 11:15 AM". */
  timeLabel: string
  venue: Venue
  note: string | null
}

export interface Contact {
  label: string
  name: string
  /** International format, e.g. "+91 98765 43210". */
  phone: string
}

export interface MusicTrack {
  src: string
  title: string
  credit: string | null
  creditUrl: string | null
}

export interface Photo {
  src: string
  alt: string
  caption: string | null
  credit: string | null
}

/** Song file(s) present in src/assets/audio at build time (empty until the file is added). */
const songFiles = import.meta.glob<string>('../assets/audio/pesamale.{mp3,m4a,aac,wav,ogg}', { eager: true, query: '?url', import: 'default' })

export const wedding = {
  couple: {
    bride: {
      shortName: 'Gayathri',
      fullName: 'Gayathri Sunil',
      /** Shown under the name on the invitation card. Set to null to hide. */
      parents: 'Daughter of Sunil & Deepa Sunil' as string | null,
      /** Replace the drawn placeholder: e.g. '/illustrations/gayathri.png' (transparent PNG/WebP works best). */
      illustration: null as string | null,
    },
    groom: {
      shortName: 'Arjun',
      fullName: 'Arjun C Ramesh',
      parents: 'Son of Late Ramesh & Jancy Ramesh' as string | null,
      illustration: null as string | null,
    },
    /**
     * Optional single illustration of the couple together (replaces both drawings
     * in the "couple reveal" scene). e.g. '/illustrations/couple.png'
     */
    coupleIllustration: null as string | null,
    initials: ['G', 'A'] as const,
    /** The couple's own line. */
    tagline: 'Turns out, we were each other’s cup of tea… and coffee.',
  },

  /** India Standard Time — used for the countdown and date formatting. */
  timeZone: 'Asia/Kolkata',
  utcOffset: '+05:30',

  wedding: {
    title: 'The Wedding',
    date: '2026-12-28',
    startTime: null,
    timeLabel: 'Muhurtham · [AUSPICIOUS TIME, e.g. 10:30 – 11:15 AM]',
    venue: {
      name: 'Miami Convention Centre',
      address: 'Kozhikode–Kuttiyadi Road, Thalakkulathur, Andikode, Kerala 673317',
      mapsUrl:
        'https://www.google.com/maps/dir//Miami+Convention+Centre,+Kozhikode-Kuttiyadi+Road+Thalakkulathur,+Andikode,+Keralam+673317/@13.0678784,77.5979008,14z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3ba6607e88cb5ee7:0x4153c908118896c3!2m2!1d75.7570458!2d11.3607325?entry=ttu&g_ep=EgoyMDI2MTAyOC4wIKXMDSoASAFQAw%3D%3D',
      coordinates: { lat: 11.3607325, lng: 75.7570458 },
      showEmbeddedMap: true,
    },
    note: null,
  } satisfies WeddingEvent as WeddingEvent,

  reception: {
    title: 'The Reception',
    date: '2026-12-30',
    startTime: '16:30',
    endTime: '22:30',
    timeLabel: '4:30 PM – 10:30 PM',
    venue: {
      // No venue name: only the address is shown.
      name: '',
      address: 'PG3V+H95, Mahé, Puducherry 673310',
      mapsUrl:
        'https://www.google.com/maps?um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KRGz9P9wKaQ7Menx71JEYIY1&daddr=PG3V%2BH95,+Mah%C3%A9,+Puducherry+673310',
      // Decoded from the plus code 7J3QPG3V+H95.
      coordinates: { lat: 11.7038875, lng: 75.5434844 },
      showEmbeddedMap: true,
    },
    note: null,
  } satisfies WeddingEvent as WeddingEvent | null,

  /** e.g. 'Traditional Kerala attire — kasavu welcome!'. null hides the section. */
  dressCode: null as string | null,


  contacts: [
    { label: 'Bride’s family', name: 'Sunil', phone: '+91 95938 59809' },
    { label: 'Groom’s family', name: 'Karthick C Ramesh', phone: '+91 79075 79714' },
  ] satisfies Contact[] as Contact[],

  /**
   * Photos for the "A moment of ours" section. Hidden while empty.
   * Put files in /public/photos and reference them as '/photos/name.jpg'.
   * Example:
   * { src: '/photos/doorway.jpg', alt: 'Gayathri and Arjun holding hands in a doorway', caption: null, credit: 'Clan Crew' }
   */
  photos: [] as Photo[],

  share: {
    /** Public URL after deployment; when empty the current page address is used. */
    siteUrl: '',
    message:
      'Two little cups, two different worlds, one beautiful forever ☕♡☕\nYou’re invited to the wedding of Gayathri & Arjun!',
  },

  music: {
    /**
     * Background music: "Pesamale (Instrumental)" by Siri Xander.
     * Put the audio file in src/assets/audio/ named pesamale.mp3 (or .m4a/.aac/.wav/.ogg).
     * It's picked up automatically at build time. Until it's there, there's no background
     * music and the music button stays hidden (and no requests are made for a missing file).
     */
    tracks: Object.values(songFiles)
      .slice(0, 1)
      .map((src) => ({ src, title: 'Pesamale (Instrumental) · Siri Xander', credit: null, creditUrl: null })) as MusicTrack[],
    /** Start playing on the guest's first interaction (browsers block sound before that). */
    startOnFirstTap: true,
    /** 0–1 */
    volume: 0.55,
    /** Seconds into the track to begin. */
    startAt: 0,
  },
}

/** The story copy (Scenes 1–6). Edit freely. */
export const story = {
  once: {
    lines: ['Somewhere in this big, beautiful world…', 'There were two little cups, each with a story of its own.'],
    cta: 'Discover their story',
  },
  flavours: {
    chai: { name: 'Chai', traits: 'Warm, comforting, a little traditional.' },
    coffee: { name: 'Coffee', traits: 'A little bold, energetic and full of surprises.' },
    lines: ['Different in every little way…', 'Yet somehow, something beautiful was brewing.'],
  },
  blend: {
    line: 'And somehow… they became each other’s perfect blend.',
  },
  couple: {
    before: 'And the two little cups had names…',
    after: 'Two different personalities. One beautiful story.',
  },
  royal: {
    lines: ['Our little story is becoming a forever story.', 'And we’d love for you to be a part of it.'],
    invite: 'Together with our families, we invite you to celebrate our wedding.',
    cta: 'Open our wedding invitation',
  },
  closing: {
    line: 'The chai is brewing, the coffee is poured, and there’s a seat saved just for you.',
    thanks: 'Thank you for being part of our story. We can’t wait to celebrate with you.',
  },
}

/**
 * Easter egg messages: swap in your own inside jokes.
 * Where each one lives is documented in README.md ("Easter eggs").
 */
export const easterEggs = {
  chai: [
    'Psst… a little extra elaichi makes everything better.',
    'Chai’s secret: always brewed slowly, with a lot of love.',
  ],
  coffee: ['Bold on the outside, secretly very sweet inside.', 'One more shot? Always.'],
  steamHeart: 'Some things just blend.',
  monogram: {
    sequence: ['G', 'A', 'G'],
    message: 'You found our little secret: every “G” needs its “A”. Thank you for looking this closely ♡',
  },
  lamp: 'Every lamp lit here is a wish for the two of them. Thank you for adding yours.',
  secretWord: {
    words: ['chai', 'coffee'],
    message: 'You found the secret recipe: one part chai, one part coffee, a lifetime of stirring.',
  },
  kalash: 'Purna kumbham: a pot full of blessings, for a home always full of love, laughter and filter coffee.',
  bottom: 'Cheers! You made it to the very last sip.',
}
