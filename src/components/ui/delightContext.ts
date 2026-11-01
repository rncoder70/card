import { createContext, useContext } from 'react'

export type BurstKind = 'hearts' | 'petals' | 'sparkles'

export interface DelightApi {
  /** Show a little parchment note (announced politely to screen readers). */
  note: (text: string) => void
  /** Float a short burst of steam-hearts, jasmine petals or sparkles. */
  celebrate: (kind: BurstKind) => void
}

export const DelightContext = createContext<DelightApi | null>(null)

export function useDelight(): DelightApi {
  const ctx = useContext(DelightContext)
  if (!ctx) throw new Error('useDelight must be used inside <DelightProvider>')
  return ctx
}
