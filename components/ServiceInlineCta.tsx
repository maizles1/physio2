'use client'

import { gtag } from './GoogleAnalytics'
import { seoConfig, getContactPhoneTel } from '@/config/seo.config'

const WHATSAPP_NUMBER = '972508838982'

interface ServiceInlineCtaProps {
  /** Service slug, sent with the click events. */
  slug: string
  whatsappMessage: string
}

/** Small contact box shown early on service pages, so visitors don't need to scroll to the end. */
export default function ServiceInlineCta({ slug, whatsappMessage }: ServiceInlineCtaProps) {
  const track = (action: string, label: string) => {
    try {
      gtag.event(action, 'engagement', label, undefined, { page: 'service', section: 'inline_cta', slug })
    } catch {
      // ignore analytics errors
    }
  }

  return (
    <div className="my-6 rounded-2xl border border-blue-100 bg-blue-50 p-4 sm:p-5">
      <p className="font-bold text-[#2A3080] mb-3">רוצים לבדוק אם הטיפול מתאים לכם?</p>
      <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
        <a
          href={`tel:${getContactPhoneTel()}`}
          onClick={() => track('click_to_call', seoConfig.contact.phone)}
          className="inline-flex items-center justify-center rounded-xl bg-[#2080C0] px-4 py-3 font-bold text-white hover:bg-[#1a6ea5] transition-colors"
        >
          התקשרו
        </a>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('whatsapp_click', `service_inline_${slug}`)}
          className="inline-flex items-center justify-center rounded-xl bg-[#25D366] px-4 py-3 font-bold text-white hover:bg-[#1ebe57] transition-colors"
        >
          WhatsApp
        </a>
        <a
          href="#lead-form"
          onClick={() => track('button_click', `service_inline_form_${slug}`)}
          className="col-span-2 inline-flex items-center justify-center rounded-xl border-2 border-[#2080C0] px-4 py-2.5 font-semibold text-[#2A3080] hover:bg-white transition-colors"
        >
          השאירו פרטים ונחזור אליכם
        </a>
      </div>
    </div>
  )
}
