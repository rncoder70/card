import { useState } from 'react'
import { Check, Link2, Share2 } from 'lucide-react'
import { wedding } from '../../data/wedding'
import { shareUrl } from '../../lib/format'

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
    </svg>
  )
}

const btn =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 py-3 text-[13px] font-bold tracking-wide transition active:scale-[0.98]'

export function SharePanel() {
  const [copied, setCopied] = useState(false)
  const canShare = typeof navigator !== 'undefined' && 'share' in navigator

  const url = shareUrl()
  const text = `${wedding.share.message}\n${url}`

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = url
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2200)
  }

  const nativeShare = async () => {
    try {
      await navigator.share({ title: document.title, text: wedding.share.message, url })
    } catch {
      /* guest closed the share sheet */
    }
  }

  return (
    <div className="flex flex-wrap justify-center gap-3">
      <a href={`https://wa.me/?text=${encodeURIComponent(text)}`} target="_blank" rel="noopener noreferrer" className={`${btn} bg-[#1F7A4D] text-white hover:bg-[#186640]`}>
        <WhatsAppIcon className="h-5 w-5" />
        Share on WhatsApp
      </a>
      <button type="button" onClick={copy} className={`${btn} border border-wine/30 text-wine hover:bg-wine/5`}>
        {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Link2 className="h-4 w-4" aria-hidden="true" />}
        <span aria-live="polite">{copied ? 'Link copied' : 'Copy link'}</span>
      </button>
      {canShare && (
        <button type="button" onClick={nativeShare} className={`${btn} border border-wine/30 text-wine hover:bg-wine/5`}>
          <Share2 className="h-4 w-4" aria-hidden="true" />
          More options
        </button>
      )}
    </div>
  )
}
