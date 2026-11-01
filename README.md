# A Perfect Blend · Gayathri & Arjun

An interactive wedding invitation. Two little cups, a chai and a coffee, tell a short story. Then the page turns into a maroon-and-gold South Indian wedding invitation.

**Stack:** Vite · React 19 · TypeScript · Tailwind CSS v4 · Motion (Framer Motion) · Lucide icons.
All illustrations (thoranam, plantain trees, kumbham, silk borders, brewing, jasmine) are hand-built SVG/CSS, so the site loads no image files except optional photos.

```bash
npm install
npm run dev       # local preview at http://localhost:5173
npm run build     # type-check + production build into dist/
npm run lint      # oxlint
npm run preview   # serve the production build
```

---

## 1. Editing wedding details

Everything guests read is in **`src/data/wedding.ts`**. You never need to touch a component.

| What | Where in `wedding.ts` |
|---|---|
| Names, parents' lines, tagline | `couple` |
| Wedding date, muhurtham, venue | `wedding` |
| Reception (set to `null` to remove; leave `venue.name` empty to show only the address; optional `endTime`) | `reception` |
| Dress code (`null` hides it) | `dressCode` |
| Family contacts | `contacts` |
| Photos (section hidden while empty) | `photos` |
| WhatsApp share message, public URL | `share` |
| Background music | `music` |
| Story text (scenes, closing) | `story` |
| Easter egg messages | `easterEggs` |

Rules:

- **Placeholders** look like `[VENUE NAME]`. While a value is still a placeholder, the site hides the map, directions, call and WhatsApp buttons for it, so guests never see a dead link.
- **Dates** use `YYYY-MM-DD`. The weekday is calculated automatically, in India time.
- **Times:** `timeLabel` is the text guests read, for example `Muhurtham · 10:30 – 11:15 AM`. `startTime` (`"10:30"`, 24-hour) drives the countdown and the calendar file. While it's `null`, the countdown runs to midnight at the start of the day (IST) and the calendar entry is all-day.
- **Maps:** fill in the venue `name` and `address` and a Google Maps link and embedded map are built for you. No API key is needed. To pin an exact spot, paste a Google Maps share link into `mapsUrl`.

Currently filled in: Gayathri Sunil, Arjun C Ramesh, Monday 28 December 2026, and the couple's line *"Turns out, we were each other's cup of tea… and coffee."* Everything else is a placeholder.

## 2. Replacing the placeholder couple illustration

Scene 4 shows a drawn placeholder of the couple, based on their photo. To use commissioned caricatures:

1. Export each artwork as a **transparent PNG or WebP**, about 1000–1400 px tall, under 400 KB each.
2. Put the files in `public/illustrations/`.
3. In `src/data/wedding.ts`, choose one:
   - a single illustration of the couple together: `couple.coupleIllustration: '/illustrations/couple.png'`
   - or two separate figures: `couple.bride.illustration` and `couple.groom.illustration`. They tilt toward each other when the scene plays.

Tips for the illustrator: full-length figures facing each other, a soft hand-painted look, normal proportions (no big heads), and traditional Kerala wedding outfits. The site's colour palette is listed in `src/index.css` under `@theme`.

To use the photo itself, add it to `public/photos/` and add an entry to `photos`. A commented example is already in the file.

## 3. Music

The only song is **"Pesamale (Instrumental)" by Siri Xander** (Arra Aria Khayal).

**Background music:** put the audio file in **`src/assets/audio/`** named `pesamale.mp3`, or `.m4a`, `.aac`, `.wav` or `.ogg`. The build detects it automatically, with no code change. You can get the file by buying the track or asking the artist; it can't be downloaded from YouTube. For a smaller file, convert it on a Mac with `afconvert -f m4af -d aac -b 96000 input.mp3 src/assets/audio/pesamale.m4a`.
Until the file is there, there's no background music. No requests are made for a missing file, so there are no console errors.

- Phones and browsers block sound until the guest interacts with the page. The site listens for every kind of interaction (tap, click, touch, swipe, scroll, mouse wheel, keypress) and starts the song on the first one the browser accepts, with a gentle fade-in. Taps, clicks and keys always work. Browsers never accept a pure swipe-to-scroll or a mouse-wheel scroll as permission for sound, so in that case the song starts on the guest's next tap.
- There is no on/off music button, by the couple's choice. Guests can still lower or mute the sound with their phone's volume. To bring a button back, restore a toggle that calls `pause()` / `play()` from `useMusic()`.
- The song pauses while the guest switches to another app or tab, and resumes when they come back.
- Settings in `wedding.music`:
  - `volume` (0–1)
  - `startAt`: seconds into the song to begin, to skip a slow intro
  - `startOnFirstTap`: set to `false` to turn off background music (there's no button to start it)
- To remove music entirely, delete the file from `src/assets/audio/`. To change the song, replace that file and update the `import.meta.glob` path and `title` in `wedding.music`.

## 4. Deploying and getting a shareable link

The site builds to static files in `dist/`, so any static host works.

**Vercel (easiest):**
1. Push this folder to a GitHub repository.
2. At vercel.com, choose *Add New → Project*, import the repo, and accept the defaults (Vite is detected). Click Deploy.
3. You get a link like `https://gayathri-arjun.vercel.app`. You can add a custom domain later.

**Netlify (no Git needed):** run `npm run build`, then drag the `dist/` folder onto app.netlify.com/drop.

After deploying:

1. Set `share.siteUrl` in `wedding.ts` to the live URL.
2. In `index.html`, change `og:image` to the absolute URL, for example `https://your-site/og-image.jpg`, so WhatsApp shows the preview card.
3. Once the real details are filled in, regenerate `public/og-image.jpg`. It's a 1200×630 screenshot of the invitation's opening section, so it currently shows the parents' placeholder text.
4. Tip: `https://your-site/#invitation` opens the invitation directly, skipping the story. That's useful for reminder messages.

## 5. Easter eggs (developer notes)

None of these hide essential information. All are keyboard-accessible, with labels, and every message is editable in `easterEggs`.

| # | Where | How to trigger | Code |
|---|---|---|---|
| 1 | Chai cup (scenes 1–2, closing) | Tap it: it wobbles and whispers a line | `story/TappableCup.tsx` |
| 2 | Coffee cup (same places) | Tap it | `story/TappableCup.tsx` |
| 3 | Steam heart (scene 3) | Tap the heart: gold steam-hearts float up | `SceneBlend` in `story/Scenes.tsx` |
| 4 | **G ♡ A** monogram (top of invitation) | Tap **G → A → G** | `invitation/Monogram.tsx` |
| 5 | Brass nilavilakku lamps (scene 6, invitation hero) | Tap a lamp: it glows and leaves a wish | `SceneRoyal`, `InvitationPage.tsx` |
| 6 | Anywhere (desktop) | Type **chai** or **coffee** on the keyboard | `lib/useSecretWord.ts`, `App.tsx` |
| 7 | Very bottom of the invitation | Scroll to the end: the cups clink, "Cheers!" | `invitation/ClosingSection.tsx` |
| 8 | Purna kumbham, bottom-left (story scenes 1–4) | Tap it: jasmine petals and a blessing | `StoryStage.tsx` |

## 6. South Indian wedding theme and brewing

**Palette** (Kanjeevaram silk), tokens in `src/index.css` under `@theme`:
- kumkum red `wine` `#9E1B1B`
- silk maroon `wine-deep`
- turmeric `#E8A317` and marigold `#F28C28`
- banana-leaf green `leaf`
- sandalwood `sandal`
- temple gold `gold`

**Motifs** (`components/illustrations/Ornaments.tsx`):
- `TempleBorder`: Kanjeevaram "temple spire" border with gold zari, at the top and bottom of the story, on the invitation card and in the closing section.
- `Thoranam`: mango leaves and marigold strands strung across the top.
- `PlantainTree`: banana trees with a banana flower, standing at both sides like the entrance of a wedding hall.
- `Kalash`: the purna kumbham at the entrance. Tapping it is an Easter egg.
- `.sandal-kolam`: sandalwood background with a faint dotted kolam. `.royal-pattern` is the red silk used on the royal scene, the doors and the invitation.

**Brewing animation** (`components/story/Infusion.tsx`, keyframes `infuse-*`), scenes 1–2:
- Above the chai, a tea leaf drifts down, turns into dark tea powder with a little puff, and the powder pours into the glass.
- Above the coffee, a roasted bean turns into ground coffee that sifts into the tumbler.

The vessels start steaming from the clink scene onward. Falling jasmine (`Sky.tsx`) decorates the royal scene and the invitation's opening section.

## 7. Accessibility and motion

- The story moves forward with buttons or the ← → arrow keys. There's no swiping and no scroll-jacking. *Skip to invitation* is always visible.
- When a scene changes, focus moves to its heading, and a hidden status line announces "Scene X of 5".
- The **reduced motion** setting is respected. Movement is switched off, the doors animation is skipped, the brewing animation and falling petals are hidden, particles and garlands stop moving, and every scene's content is shown straight away.
- Form fields have labels and inline error messages, and the first field with an error receives focus.

## Project map

```
src/
  data/wedding.ts            ← all content
  lib/format.ts              dates, placeholders, map/tel/WhatsApp links
  lib/calendar.ts            "Add to calendar" (.ics)
  components/
    story/                   StoryStage (5 story scenes), Scenes, TappableCup
    invitation/              InvitationPage, EventCard, Countdown,
                             SharePanel, Contacts, Monogram, Doors, ClosingSection
    illustrations/           Cups, CoupleIllustration, Ornaments (lamp, jasmine, frames)
    ui/                      Delight (notes + celebrations), Reveal, Music
```
