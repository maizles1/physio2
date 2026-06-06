'use client'

import { useId, useState } from 'react'
import { gtag } from './GoogleAnalytics'
import { toast } from '@/lib/toast'

const NAME_MIN = 2
const NAME_MAX = 80
const MESSAGE_MAX = 500

interface FormState {
  name: string
  phone: string
  email: string
  message: string
}

const INITIAL: FormState = {
  name: '',
  phone: '',
  email: '',
  message: '',
}

function isValidIsraeliPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '')
  // 10-digit local (e.g. 0508838982) or 12-digit international (e.g. 972508838982)
  return (
    (digits.length === 10 && (digits.startsWith('0') || digits.startsWith('5'))) ||
    (digits.length === 12 && digits.startsWith('972'))
  )
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function MeuhedetLeadForm() {
  const [form, setForm] = useState<FormState>(INITIAL)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const nameId = useId()
  const phoneId = useId()
  const emailId = useId()
  const messageId = useId()

  const handleChange = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitting) return

    const name = form.name.trim()
    const phone = form.phone.trim()
    const email = form.email.trim()
    const message = form.message.trim()

    if (name.length < NAME_MIN || name.length > NAME_MAX) {
      toast.error(`יש להזין שם מלא (${NAME_MIN}–${NAME_MAX} תווים).`)
      return
    }
    if (!isValidIsraeliPhone(phone)) {
      toast.error('מספר טלפון לא תקין. דוגמה: 050-8838982')
      return
    }
    if (email && !isValidEmail(email)) {
      toast.error('כתובת מייל לא תקינה.')
      return
    }
    if (message.length > MESSAGE_MAX) {
      toast.error(`התיאור ארוך מדי (מקסימום ${MESSAGE_MAX} תווים).`)
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email: email || undefined,
          message: message || undefined,
          source: 'meuhedet',
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        toast.error(data?.error || 'שליחת הטופס נכשלה. נסו שוב.')
        return
      }

      // GA4 + Meta (FormSubmit custom event mapped automatically)
      try {
        gtag.event('form_submit', 'lead', 'meuhedet_form')
        // Google Ads / GA4 lead conversion signal
        gtag.event('generate_lead', 'conversion', 'meuhedet', 1, {
          currency: 'ILS',
        })
      } catch {
        // ignore analytics errors
      }
      // Direct Meta Pixel custom event for an audience focused on Meuhedet leads
      try {
        const w = window as unknown as { fbq?: (...args: unknown[]) => void }
        w.fbq?.('trackCustom', 'MeuhedetLead', {
          source: 'meuhedet',
          page: '/meuhedet',
        })
      } catch {
        // ignore pixel errors
      }

      setForm(INITIAL)
      setSuccess(true)
      toast.success('הפרטים נשלחו בהצלחה. נחזור אליכם בהקדם.')
    } catch {
      toast.error('שגיאה בשליחה. בדקו את החיבור לאינטרנט ונסו שוב.')
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center shadow-sm"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-8 w-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-[#2A3080] mb-2">תודה, קיבלנו את הפרטים!</h3>
        <p className="text-gray-700 mb-6 leading-relaxed">
          ניצור איתכם קשר בהקדם לתיאום טיפול במסגרת מאוחדת.
          <br />
          בינתיים אתם מוזמנים ליצור קשר ישיר:
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <a
            href="tel:050-8838982"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2080C0] px-6 py-3 font-semibold text-white shadow hover:bg-[#1a6ea5] transition-colors"
            onClick={() => {
              try {
                gtag.clickToCall('050-8838982')
              } catch {
                // ignore
              }
            }}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            התקשר עכשיו
          </a>
          <a
            href={`https://wa.me/972508838982?text=${encodeURIComponent('שלום, פניתי דרך טופס מאוחדת באתר')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 font-semibold text-white shadow hover:bg-[#1ebe57] transition-colors"
            onClick={() => {
              try {
                gtag.event('whatsapp_click', 'engagement', 'meuhedet_success')
              } catch {
                // ignore
              }
            }}
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            פנייה בוואטסאפ
          </a>
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="טופס יצירת קשר – פציעות ספורט במאוחדת"
      className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label htmlFor={nameId} className="mb-1.5 block text-sm font-semibold text-gray-800">
            שם מלא <span className="text-red-600" aria-hidden="true">*</span>
          </label>
          <input
            id={nameId}
            name="name"
            type="text"
            required
            autoComplete="name"
            inputMode="text"
            value={form.name}
            onChange={handleChange('name')}
            disabled={submitting}
            minLength={NAME_MIN}
            maxLength={NAME_MAX}
            placeholder="לדוגמה: ישראל ישראלי"
            aria-required="true"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:border-[#2080C0] focus:outline-none focus:ring-2 focus:ring-[#2080C0]/30 disabled:bg-gray-50 disabled:text-gray-500"
          />
        </div>

        <div>
          <label htmlFor={phoneId} className="mb-1.5 block text-sm font-semibold text-gray-800">
            טלפון <span className="text-red-600" aria-hidden="true">*</span>
          </label>
          <input
            id={phoneId}
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            value={form.phone}
            onChange={handleChange('phone')}
            disabled={submitting}
            placeholder="050-1234567"
            aria-required="true"
            dir="ltr"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:border-[#2080C0] focus:outline-none focus:ring-2 focus:ring-[#2080C0]/30 disabled:bg-gray-50 disabled:text-gray-500"
          />
        </div>

        <div>
          <label htmlFor={emailId} className="mb-1.5 block text-sm font-semibold text-gray-800">
            אימייל <span className="text-gray-400 font-normal">(לא חובה)</span>
          </label>
          <input
            id={emailId}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={form.email}
            onChange={handleChange('email')}
            disabled={submitting}
            placeholder="name@example.com"
            dir="ltr"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:border-[#2080C0] focus:outline-none focus:ring-2 focus:ring-[#2080C0]/30 disabled:bg-gray-50 disabled:text-gray-500"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={messageId} className="mb-1.5 block text-sm font-semibold text-gray-800">
            תיאור הפציעה <span className="text-gray-400 font-normal">(לא חובה)</span>
          </label>
          <textarea
            id={messageId}
            name="message"
            rows={4}
            value={form.message}
            onChange={handleChange('message')}
            disabled={submitting}
            maxLength={MESSAGE_MAX}
            placeholder="אם נוח לכם – ספרו בקצרה על הפציעה, סוג הספורט ומתי החלה."
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:border-[#2080C0] focus:outline-none focus:ring-2 focus:ring-[#2080C0]/30 disabled:bg-gray-50 disabled:text-gray-500"
          />
          <p className="mt-1 text-xs text-gray-500">
            {form.message.length}/{MESSAGE_MAX}
          </p>
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-l from-[#2A3080] via-[#2080C0] to-[#40C0F0] px-6 py-4 text-lg font-bold text-white shadow-md transition-opacity hover:opacity-95 focus:outline-none focus:ring-4 focus:ring-[#2080C0]/30 disabled:cursor-not-allowed disabled:opacity-70"
        aria-busy={submitting}
      >
        {submitting ? (
          <>
            <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            שולח...
          </>
        ) : (
          'שלח פרטים'
        )}
      </button>

      <p className="mt-4 text-center text-xs text-gray-500 leading-relaxed">
        בלחיצה על שליחה אתם מאשרים שניצור איתכם קשר טלפוני או במייל לצורך תיאום טיפול.
        <br />
        המידע נשמר באופן מאובטח ואינו מועבר לצדדים שלישיים.
      </p>
    </form>
  )
}
