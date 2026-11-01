import { MessageCircle, Phone } from 'lucide-react'
import { wedding } from '../../data/wedding'
import { isPlaceholder, telLink, whatsappChatLink } from '../../lib/format'

export function Contacts() {
  return (
    <ul className="mx-auto grid max-w-lg gap-3 sm:grid-cols-2">
      {wedding.contacts.map((c, i) => {
        const tel = telLink(c.phone)
        const wa = whatsappChatLink(c.phone)
        return (
          <li key={`${c.label}-${i}`} className="rounded-xl border border-gold/50 bg-white/50 p-4 text-center">
            <p className="text-[11px] font-bold tracking-[0.25em] text-terracotta-deep uppercase">{c.label}</p>
            <p className={`mt-1 font-display text-xl text-ink ${isPlaceholder(c.name) ? 'italic opacity-70' : ''}`}>{c.name}</p>
            <p className={`text-[15px] text-coffee ${isPlaceholder(c.phone) ? 'italic opacity-70' : ''}`}>{c.phone}</p>
            {(tel || wa) && (
              <div className="mt-3 flex justify-center gap-2">
                {tel && (
                  <a href={tel} className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-wine/30 px-3.5 text-[13px] font-bold text-wine hover:bg-wine/5">
                    <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                    Call<span className="sr-only"> {c.name}</span>
                  </a>
                )}
                {wa && (
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-wine/30 px-3.5 text-[13px] font-bold text-wine hover:bg-wine/5">
                    <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                    WhatsApp<span className="sr-only"> {c.name}</span>
                  </a>
                )}
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}
