'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AppointmentPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    date: '',
    time: '',
    notes: '',
    privacyConsent: false,
  })
  const [errors, setErrors] = useState<{ privacyConsent?: string }>({})
  const [touched, setTouched] = useState<{ privacyConsent?: boolean }>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate privacy consent
    if (!formData.privacyConsent) {
      setErrors({ privacyConsent: 'יש לאשר את הסכמתכם למדיניות הפרטיות' })
      setTouched({ privacyConsent: true })
      return
    }
    
    // כאן תהיה הלוגיקה לשליחת הטופס
    alert('תודה! בקשתכם נקלטה. ניצור איתכם קשר בהקדם לאישור התור.')
    setFormData({
      name: '',
      phone: '',
      email: '',
      service: '',
      date: '',
      time: '',
      notes: '',
      privacyConsent: false,
    })
    setErrors({})
    setTouched({})
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked })
      if (touched[name as keyof typeof touched]) {
        setErrors({ ...errors, [name]: checked ? undefined : 'יש לאשר את הסכמתכם למדיניות הפרטיות' })
      }
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    
    if (type === 'checkbox') {
      setTouched({ ...touched, [name]: true })
      setErrors({ ...errors, [name]: checked ? undefined : 'יש לאשר את הסכמתכם למדיניות הפרטיות' })
    }
  }

  const services = [
    'פיזיותרפיה אורטופדית',
    'שיקום לאחר ניתוח',
    'פיזיותרפיה ספורטיבית',
    'טיפול בכאבים',
    'פיזיותרפיה נוירולוגית',
    'שיקום גריאטרי',
    'הערכה ראשונית',
    'אחר',
  ]

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden py-12 sm:py-16" style={{ background: 'linear-gradient(to bottom right, #2A3080, #2080C0, #40C0F0)' }}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">קביעת תור</h1>
          <p className="text-lg sm:text-xl text-white">מלאו את הפרטים ונחזור אליכם בהקדם לאישור התור</p>
        </div>
      </section>

      {/* Appointment Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      שם מלא *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      טלפון *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    אימייל *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                    סוג השירות *
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">בחר סוג שירות</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                      תאריך מועדף *
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                      שעה מועדפת *
                    </label>
                    <select
                      id="time"
                      name="time"
                      required
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">בחר שעה</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                    הערות (אופציונלי)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={4}
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="אם יש משהו חשוב לדעת לפני התור, נשמח לשמוע..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>הערה חשובה:</strong> זהו בקשת תור ראשונית. ניצור איתכם קשר תוך 24 שעות לאישור התור הסופי.
                    אם התור שביקשתם לא זמין, נציע לכם מועדים חלופיים.
                  </p>
                </div>

                <div>
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="privacy-consent-appointment"
                      name="privacyConsent"
                      required
                      checked={formData.privacyConsent}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 ${
                        errors.privacyConsent && touched.privacyConsent
                          ? 'border-red-500'
                          : ''
                      }`}
                      aria-label="הסכמה למדיניות פרטיות"
                      aria-required="true"
                      aria-invalid={errors.privacyConsent && touched.privacyConsent ? 'true' : 'false'}
                      aria-describedby={errors.privacyConsent && touched.privacyConsent ? 'privacy-consent-error-appointment' : undefined}
                    />
                    <label htmlFor="privacy-consent-appointment" className="text-sm text-gray-700 leading-relaxed">
                      אני מסכים/ה ל<Link href="/privacy" target="_blank" className="text-blue-600 hover:underline font-medium">מדיניות הפרטיות</Link> ולטיפול במידע האישי שלי *
                    </label>
                  </div>
                  {touched.privacyConsent && errors.privacyConsent && (
                    <p id="privacy-consent-error-appointment" className="mt-2 text-sm text-red-600 flex items-center gap-1" role="alert">
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {errors.privacyConsent}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  שלח בקשת תור
                </button>
              </form>
            </div>

            {/* Alternative Contact Methods */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">טלפון</h3>
                <p className="text-gray-600 mb-3">050-883-8982</p>
                <a href="tel:0508838982" className="text-blue-600 hover:text-blue-700 font-medium">
                  התקשר עכשיו
                </a>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">WhatsApp</h3>
                <p className="text-gray-600 mb-3">שלח הודעה</p>
                <a
                  href="https://wa.me/972508838982?text=שלום,%20אני%20מעוניין/ת%20לקבוע%20תור"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  פתח WhatsApp
                </a>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">אימייל</h3>
                <p className="text-gray-600 mb-3">info@physio-clinic.co.il</p>
                <a href="/contact" className="text-purple-600 hover:text-purple-700 font-medium">
                  צור קשר
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

