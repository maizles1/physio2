'use client'

import Link from 'next/link'
import { gtag } from '@/components/GoogleAnalytics'
import { clinicEntity } from '@/config/geo.config'
import { getContactEmailTo, getContactPhoneTel, seoConfig } from '@/config/seo.config'

type ClinicNapCtaProps = {
  whatsappMessage: string
  heading?: string
}

function digitsFromE164(phoneE164: string): string {
  return phoneE164.replace(/\D/g, '')
}

export default function ClinicNapCta({
  whatsappMessage,
  heading = 'קביעת תור באשדוד',
}: ClinicNapCtaProps) {
  const phoneNumber = seoConfig.contact.phone
  const phoneTel = getContactPhoneTel()
  const email = getContactEmailTo()
  const whatsappNumber = digitsFromE164(clinicEntity.phoneE164)
  const encodedMessage = encodeURIComponent(whatsappMessage)

  return (
    <section className="py-12 sm:py-16 bg-gray-50" aria-labelledby="service-nap-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">
          <h2 id="service-nap-heading" className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#2A3080' }}>
            {heading}
          </h2>
          <p className="text-gray-700 mb-6">
            {clinicEntity.brandHe} — פיזיותרפיה פרטית ב{clinicEntity.addressLine}.
          </p>

          <address className="not-italic space-y-3 text-gray-800 mb-8">
            <p>
              <span className="font-semibold">כתובת: </span>
              {clinicEntity.addressLine}
            </p>
            <p>
              <span className="font-semibold">טלפון: </span>
              <a href={`tel:${phoneTel}`} className="text-[#2080C0] hover:underline" dir="ltr">
                {phoneNumber}
              </a>
            </p>
            {email ? (
              <p>
                <span className="font-semibold">אימייל: </span>
                <a href={`mailto:${email}`} className="text-[#2080C0] hover:underline">
                  {email}
                </a>
              </p>
            ) : null}
            <p>
              <span className="font-semibold">שעות פעילות: </span>
              {clinicEntity.hoursHe}
            </p>
          </address>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <a
              href={`tel:${phoneTel}`}
              onClick={() => gtag.clickToCall(phoneNumber)}
              className="inline-flex items-center justify-center gap-2 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl text-center"
              style={{ background: 'linear-gradient(to left, #2080C0, #2A3080)' }}
              aria-label={`התקשר לקביעת תור: ${phoneNumber}`}
            >
              התקשרו עכשיו
            </a>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodedMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => gtag.event('whatsapp_click', 'engagement', 'service_landing')}
              className="inline-flex items-center justify-center gap-2 text-white font-bold py-3 px-6 rounded-lg bg-[#25D366] hover:bg-[#20BD5A] shadow-lg hover:shadow-xl text-center"
              aria-label="שלחו הודעת WhatsApp לקביעת תור"
            >
              WhatsApp
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 text-[#2080C0] border-2 border-[#2080C0] font-bold py-3 px-6 rounded-lg hover:bg-[#2080C0] hover:text-white text-center"
            >
              לעמוד יצירת קשר
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
