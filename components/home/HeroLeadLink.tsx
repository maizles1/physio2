'use client'

import { gtag } from '@/components/GoogleAnalytics'

/** "Prefer not to call?" link from the homepage hero down to the lead form. */
export default function HeroLeadLink() {
  return (
    <a
      href="#lead-form"
      onClick={() => {
        try {
          gtag.event('button_click', 'engagement', 'hero_lead_form_link')
        } catch {
          // ignore
        }
      }}
      className="mt-4 inline-block text-white underline underline-offset-4 font-semibold"
    >
      לא נוח לדבר? השאירו פרטים ונחזור אליכם
    </a>
  )
}
