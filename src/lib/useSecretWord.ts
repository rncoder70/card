import { useEffect } from 'react'

/**
 * Calls `onMatch(word)` when the guest types one of `words` anywhere on the page
 * (ignored while typing in form fields). Desktop keyboard Easter egg.
 */
export function useSecretWord(words: string[], onMatch: (word: string) => void) {
  useEffect(() => {
    let buffer = ''
    const longest = Math.max(...words.map((w) => w.length))
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      if (target && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))) return
      if (e.key.length !== 1 || e.metaKey || e.ctrlKey || e.altKey) return
      buffer = (buffer + e.key.toLowerCase()).slice(-longest)
      const hit = words.find((w) => buffer.endsWith(w))
      if (hit) {
        buffer = ''
        onMatch(hit)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [words, onMatch])
}
