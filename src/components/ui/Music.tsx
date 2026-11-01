import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { wedding, type MusicTrack } from '../../data/wedding'
import { MusicContext } from './musicContext'

const { tracks, volume, startAt, startOnFirstTap } = wedding.music

/**
 * One shared song for the whole site.
 * Browsers don't allow sound before the guest interacts, so the song starts on the
 * guest's first tap/keypress (e.g. "Discover their story"), fading in gently.
 * There is no on/off button (the couple's choice); the song pauses while the tab is hidden.
 * Tracks are tried in order at load time; a missing/unplayable file falls through to the next.
 */
export function MusicProvider({ children }: { children: ReactNode }) {
  const audio = useRef<HTMLAudioElement | null>(null)
  const fade = useRef<number | undefined>(undefined)
  const resumeWhenVisible = useRef(false)
  const trackIndex = useRef(0)
  const [track, setTrack] = useState<MusicTrack | null>(tracks[0] ?? null)
  const [available, setAvailable] = useState(tracks.length > 0)
  const [playing, setPlaying] = useState(false)

  const ensureAudio = useCallback(() => {
    if (!tracks.length) return null
    if (!audio.current) {
      const a = new Audio()
      const load = (i: number) => {
        const src = tracks[i].src
        a.src = startAt ? `${src}#t=${startAt}` : src
        a.load()
      }
      a.loop = true
      a.preload = 'metadata'
      a.addEventListener('play', () => setPlaying(true))
      a.addEventListener('pause', () => setPlaying(false))
      a.addEventListener('error', () => {
        // This file is missing or unplayable: try the next track in the list.
        if (trackIndex.current < tracks.length - 1) {
          trackIndex.current += 1
          setTrack(tracks[trackIndex.current])
          load(trackIndex.current)
        } else {
          setAvailable(false)
          setPlaying(false)
          setTrack(null)
        }
      })
      load(0)
      audio.current = a
    }
    return audio.current
  }, [])

  /** Resolves true if the browser allowed playback. */
  const play = useCallback(async () => {
    const a = ensureAudio()
    if (!a) return false
    window.clearInterval(fade.current)
    a.volume = 0
    try {
      // play() must run inside the guest's gesture for iOS/Android to allow sound.
      await a.play()
    } catch {
      // A refused attempt can overlap one that succeeded; trust the element's real state.
      setPlaying(!a.paused)
      return !a.paused
    }
    // Gentle fade-in (iOS ignores volume and simply plays at device volume).
    fade.current = window.setInterval(() => {
      a.volume = Math.min(volume, a.volume + volume / 30)
      if (a.volume >= volume) window.clearInterval(fade.current)
    }, 80)
    return true
  }, [ensureAudio])

  // Start on the very first interaction of any kind: tap, click, touch, swipe, scroll, wheel or key.
  // Browsers only allow sound after certain gestures (taps, clicks, keys, the end of a touch);
  // a pure mouse-wheel scroll is refused, so we keep listening and retry on the next interaction
  // until playback actually starts.
  useEffect(() => {
    if (!tracks.length) return
    // Create the player straight away so missing tracks are skipped before the first tap.
    ensureAudio()
    if (!startOnFirstTap) return
    const events = ['pointerdown', 'pointerup', 'touchstart', 'touchend', 'click', 'keydown', 'wheel', 'scroll'] as const
    let done = false
    const cleanup = () => {
      done = true
      events.forEach((ev) => window.removeEventListener(ev, attempt, true))
    }
    async function attempt() {
      if (done) return
      if (audio.current && !audio.current.paused) return cleanup()
      // Every interaction gets its own attempt: on phones the touch-start is refused
      // but the touch-end a moment later is allowed.
      if (await play()) cleanup()
    }
    events.forEach((ev) => window.addEventListener(ev, attempt, { capture: true, passive: true }))
    return cleanup
  }, [ensureAudio, play])

  // Pause while the guest switches apps/tabs; resume when they come back.
  useEffect(() => {
    const onVisibility = () => {
      const a = audio.current
      if (!a) return
      if (document.hidden) {
        resumeWhenVisible.current = !a.paused
        a.pause()
      } else if (resumeWhenVisible.current) {
        a.play().catch(() => {})
      }
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      window.clearInterval(fade.current)
      audio.current?.pause()
    }
  }, [])

  const api = useMemo(() => ({ available, playing, track }), [available, playing, track])
  return <MusicContext.Provider value={api}>{children}</MusicContext.Provider>
}
