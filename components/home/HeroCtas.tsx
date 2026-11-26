import { Phone, MessageCircle } from 'lucide-react'
import MeuhedetContactLink from '@/components/MeuhedetContactLink'
import { seoConfig, getContactPhoneTel } from '@/config/seo.config'

export const HOME_WHATSAPP_NUMBER = '972508838982'
export const homeWhatsappHref = (text = 'שלום, אשמח לתאם אבחון') =>
  `https://wa.me/${HOME_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`

/** Call + WhatsApp buttons for the homepage hero. `tone` picks colours for dark or light backgrounds. */
export default function HeroCtas({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  return (
    <div className="grid grid-cols-1 sm:flex sm:flex-row gap-3">
      <MeuhedetContactLink
        page="home"
        type="phone"
        href={`tel:${getContactPhoneTel()}`}
        section="hero"
        className={
          tone === 'light'
            ? 'inline-flex items-center justify-center gap-2 rounded-xl bg-[#2A3080] px-7 py-3.5 text-base font-bold text-white shadow-md hover:bg-[#1f2566] transition-colors'
            : 'inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-base font-bold text-[#2A3080] shadow-lg hover:bg-gray-100 transition-colors'
        }
      >
        <Phone className="h-5 w-5" aria-hidden="true" />
        התקשרו: {seoConfig.contact.phone}
      </MeuhedetContactLink>
      <MeuhedetContactLink
        page="home"
        type="whatsapp"
        href={homeWhatsappHref()}
        section="hero"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-7 py-3.5 text-base font-bold text-white shadow-md hover:bg-[#1ebe57] transition-colors"
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        כתבו ב-WhatsApp
      </MeuhedetContactLink>
    </div>
  )
}
