import { createContext, useContext } from 'react'
import type { MusicTrack } from '../../data/wedding'

export interface MusicApi {
  /** A song is configured and loads correctly. */
  available: boolean
  playing: boolean
  /** The track actually in use (first one in the list that loaded). */
  track: MusicTrack | null
}

export const MusicContext = createContext<MusicApi>({ available: false, playing: false, track: null })

export const useMusic = () => useContext(MusicContext)
