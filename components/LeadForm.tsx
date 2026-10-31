'use client'

import { useId, useState } from 'react'
import { usePathname } from 'next/navigation'
import { gtag } from './GoogleAnalytics'
import { toast } from '@/lib/toast'
import { LEAD_AREAS, LEAD_SOURCE_LABELS, WEB3FORMS_PUBLIC_KEY } from '@/lib/leadOptions'

const NAME_MIN = 2
const NAME_MAX = 80

export type LeadFormSource = 'home' | 'contact' | 'service' | 'meuhedet'

interface LeadFormProps {
  /** Where the form sits; shown in the notification email. */
  source: LeadFormSource
  /** Pre-selects the pain area (e.g. on a service page). */
  defaultArea?: string
  title?: string
  subtitle?: string
}

function isValidIsraeliPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '')
  return (
    (digits.length === 10 && digits.startsWith('0')) ||
    (digits.length === 12 && digits.startsWith('972'))
  )
}

/** Emails the lead via Web3Forms. Runs in the browser, as the free plan requires. */
async function emailLead(lead: {
  name: string
  phone: string
  area: string
  source: LeadFormSource
  page: string
}): Promise<boolean> {
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_PUBLIC_KEY,
        subject: `ליד חדש מהאתר: ${lead.name}${lead.area ? ` – ${lead.area}` : ''}`,
        from_name: 'אתר פיזיותרפיה.פלוס',
        'שם': lead.name,
        'טלפון': lead.phone,
        'מה כואב': lead.area || 'לא צוין',
        'מקור': `${LEAD_SOURCE_LABELS[lead.source]} (${lead.page})`,
      }),
    })
    const data = await res.json().catch(() => ({}))
    return res.ok && data?.success === true
  } catch {
    return false
  }
}

const inputClass =
  'w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:border-[#2080C0] focus:outline-none focus:ring-2 focus:ring-[#2080C0]/30 disabled:bg-gray-50 disabled:text-gray-500'

export default function LeadForm({
  source,
  defaultArea = '',
  title = 'השאירו פרטים ונחזור אליכם',
  subtitle = 'לא נוח לדבר עכשיו? השאירו שם וטלפון ונחזור אליכם לתיאום תור.',
}: LeadFormProps) {
  const pathname = usePathname()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [area, setArea] = useState(defaultArea)
  // Hidden field: real people never fill it, simple bots do.
  const [website, setWebsite] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const nameId = useId()
  const phoneId = useId()
  const areaId = useId()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitting) return

    const trimmedName = name.trim()
    const trimmedPhone = phone.trim()
    if (trimmedName.length < NAME_MIN || trimmedName.length > NAME_MAX) {
      toast.error('נא להזין שם.')
      return
    }
    if (!isValidIsraeliPhone(trimmedPhone)) {
      toast.error('מספר טלפון לא תקין. לדוגמה: 050-1234567')
      return
    }

    setSubmitting(true)
    try {
      // Save on the server and email from the browser at the same time.
      // Either one succeeding means the clinic has the lead.
      const savePromise = fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: trimmedName,
          phone: trimmedPhone,
          area: area || undefined,
          source,
          page: pathname,
          website,
        }),
      })
      const emailPromise = website
        ? Promise.resolve(false)
        : emailLead({ name: trimmedName, phone: trimmedPhone, area, source, page: pathname })
      const [res, emailed] = await Promise.all([savePromise, emailPromise])
      const data = await res.json().catch(() => ({}))
      if (!res.ok && !emailed) {
        toast.error(data?.error || 'השליחה נכשלה. נסו שוב או התקשרו אלינו.')
        return
      }

      try {
        gtag.event('form_submit', 'lead', `${source}_form`)
        gtag.event('generate_lead', 'conversion', source, 1, { currency: 'ILS' })
      } catch {
        // ignore analytics errors
      }
      try {
        const w = window as unknown as { fbq?: (...args: unknown[]) => void }
        w.fbq?.('track', 'Lead', { source })
      } catch {
        // ignore pixel errors
      }

      setSuccess(true)
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
        className="lead-form-card rounded-2xl border border-green-200 bg-green-50 p-6 sm:p-8 text-center shadow-sm text-gray-800"
      >
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <svg className="h-7 w-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="lf-title text-xl sm:text-2xl font-bold text-[#2A3080] mb-2">תודה, הפרטים התקבלו!</h3>
        <p className="lf-body leading-relaxed mb-5">נחזור אליכם בהקדם לתיאום תור. רוצים מהר יותר?</p>
        <a
          href={`https://wa.me/972508838982?text=${encodeURIComponent('שלום, השארתי פרטים באתר ואשמח לתאם תור')}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            try {
              gtag.event('whatsapp_click', 'engagement', `${source}_lead_success`)
            } catch {
              // ignore
            }
          }}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 font-semibold text-white shadow hover:bg-[#1ebe57] transition-colors"
        >
          כתבו לנו בוואטסאפ
        </a>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label={title}
      className="lead-form-card rounded-2xl border border-gray-200 bg-white p-5 sm:p-7 shadow-lg text-right text-gray-900"
    >
      <h3 className="lf-title text-xl sm:text-2xl font-bold text-[#2A3080] mb-1">{title}</h3>
      <p className="lf-muted text-gray-600 mb-5 leading-relaxed">{subtitle}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor={nameId} className="mb-1.5 block text-sm font-semibold text-gray-800">
            שם <span className="lf-required text-red-600" aria-hidden="true">*</span>
          </label>
          <input
            id={nameId}
            name="name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={submitting}
            maxLength={NAME_MAX}
            aria-required="true"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor={phoneId} className="mb-1.5 block text-sm font-semibold text-gray-800">
            טלפון <span className="lf-required text-red-600" aria-hidden="true">*</span>
          </label>
          <input
            id={phoneId}
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={submitting}
            placeholder="050-1234567"
            aria-required="true"
            dir="ltr"
            className={`${inputClass} text-right`}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={areaId} className="mb-1.5 block text-sm font-semibold text-gray-800">
            מה כואב? <span className="lf-optional text-gray-400 font-normal">(לא חובה)</span>
          </label>
          <select
            id={areaId}
            name="area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            disabled={submitting}
            className={inputClass}
          >
            <option value="">בחרו…</option>
            {LEAD_AREAS.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={submitting}
        aria-busy={submitting}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-l from-[#2A3080] via-[#2080C0] to-[#40C0F0] px-6 py-4 text-lg font-bold text-white shadow-md transition-opacity hover:opacity-95 focus:outline-none focus:ring-4 focus:ring-[#2080C0]/30 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? 'שולח…' : 'חזרו אליי'}
      </button>
      <p className="lf-note mt-3 text-center text-xs text-gray-500 leading-relaxed">
        הפרטים משמשים רק ליצירת קשר לתיאום טיפול ואינם מועברים לצד שלישי.
      </p>
    </form>
  )
}
