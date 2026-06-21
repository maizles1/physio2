'use client'

import { useEffect, useState } from 'react'
import { gtag } from './GoogleAnalytics'

const phoneTel = '0508838982'
const phoneDisplay = '050-883-8982'
const whatsappNumber = '972508838982'
const whatsappMessage = encodeURIComponent(
  'שלום, פניתי דרך הדף של מאוחדת באתר ואשמח לתיאום טיפול לפציעת ספורט'
)

export default function MeuhedetStickyCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-[9999] md:hidden bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.12)] px-4 py-3"
      role="region"
      aria-label="קביעת תור מהירה"
    >
      <div className="flex gap-2 max-w-lg mx-auto">
        <a
          href={`tel:${phoneTel}`}
          onClick={() => gtag.event('click_to_call', 'engagement', phoneDisplay, undefined, { page: 'meuhedet', section: 'sticky' })}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-[#2A3080] px-4 py-3 text-sm font-bold text-white"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          התקשרו
        </a>
        <a
          href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => gtag.event('whatsapp_click', 'engagement', 'meuhedet_sticky', undefined, { page: 'meuhedet', section: 'sticky' })}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-3 text-sm font-bold text-white"
        >
          WhatsApp
        </a>
      </div>
    </div>
  )
}
