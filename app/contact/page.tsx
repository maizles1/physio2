'use client'

import Breadcrumbs from '@/components/Breadcrumbs'
import { gtag } from '@/components/GoogleAnalytics'

const phoneNumber = '050-883-8982'
const whatsappNumber = '972508838982'
const whatsappMessage = encodeURIComponent('שלום, אני מעוניין/ת לקבוע תור')
const address = 'מרכז כלניות, אשדוד'
const mapsDestination = '31.783106159195388,34.65489203389065'

export default function ContactPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden py-12 sm:py-16" style={{ background: 'linear-gradient(to bottom right, #2A3080, #2080C0, #40C0F0)' }}>
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumbs items={[{ label: 'דף בית', href: '/' }, { label: 'צור קשר', href: '/contact' }]} />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">צור קשר</h1>
          <p className="text-lg sm:text-xl text-white">אנחנו כאן כדי לעזור – צרו איתנו קשר בטלפון או ב-WhatsApp</p>
        </div>
      </section>

      {/* Contact Section - clinic details only */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">פרטי הקליניקה</h2>
            <div className="space-y-4 sm:space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-1">כתובת</h3>
                  <p className="text-gray-700">{address}</p>
                  <div className="mt-3 flex flex-col sm:flex-row gap-3">
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${mapsDestination}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary text-sm inline-flex items-center gap-2 w-fit"
                      aria-label="נווט עם Google Maps"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                      Google Maps
                    </a>
                    <a
                      href={`https://waze.com/ul?q=${mapsDestination}&navigate=yes`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary text-sm inline-flex items-center gap-2 w-fit"
                      aria-label="נווט עם Waze"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 19.5c-4.136 0-7.5-3.364-7.5-7.5S7.864 4.5 12 4.5s7.5 3.364 7.5 7.5-3.364 7.5-7.5 7.5z" />
                      </svg>
                      Waze
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-1">טלפון</h3>
                  <p className="text-gray-700">
                    <a
                      href={`tel:${phoneNumber}`}
                      onClick={() => {
                        try {
                          gtag.clickToCall(phoneNumber)
                        } catch {
                          // ignore
                        }
                      }}
                      className="hover:text-blue-600 font-medium"
                      aria-label={`התקשר: ${phoneNumber}`}
                    >
                      {phoneNumber}
                    </a>
                  </p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-1">WhatsApp</h3>
                  <p className="text-gray-700 mb-2">שלחו לנו הודעה לקביעת תור</p>
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
                    aria-label="שלח הודעת WhatsApp"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    פתח WhatsApp
                  </a>
                </div>
              </div>

              {/* Opening hours */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-1">שעות פעילות</h3>
                  <p className="text-gray-700">
                    ראשון–חמישי: 08:00–20:00
                    <br />
                    שישי: 08:00–14:00
                    <br />
                    שבת: סגור
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="mt-8 sm:mt-10">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">איך להגיע</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${mapsDestination}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 sm:px-6 rounded-lg transition-colors shadow-md hover:shadow-lg text-sm sm:text-base min-h-[48px]"
                  aria-label="פתח ניווט ב-Google Maps"
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <span className="whitespace-nowrap">פתח ב-Google Maps</span>
                </a>
                <a
                  href={`https://waze.com/ul?q=${mapsDestination}&navigate=yes`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#33CCFF] hover:bg-[#2BB5E6] text-white font-medium py-3 px-4 sm:px-6 rounded-lg transition-colors shadow-md hover:shadow-lg text-sm sm:text-base min-h-[48px]"
                  aria-label="פתח ניווט ב-Waze"
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.4c5.302 0 9.6 4.298 9.6 9.6 0 5.302-4.298 9.6-9.6 9.6-5.302 0-9.6-4.298-9.6-9.6 0-5.302 4.298-9.6 9.6-9.6zm0 1.92c-4.234 0-7.68 3.446-7.68 7.68 0 4.234 3.446 7.68 7.68 7.68 4.234 0 7.68-3.446 7.68-7.68 0-4.234-3.446-7.68-7.68-7.68zm-.96 2.88v1.44h1.92v7.68h-1.92v1.44h5.76v-1.44h-1.92V8.64h1.92V7.2H11.04z" />
                  </svg>
                  <span className="whitespace-nowrap">נווט ב-Waze</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
