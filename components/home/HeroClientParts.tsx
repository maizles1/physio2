'use client'

import { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import MeuhedetContactLink from '@/components/MeuhedetContactLink'
import { homeWhatsappHref } from '@/components/home/HeroCtas'

const WORDS = ['לרוץ', 'להתאמן', 'לישון', 'לעבוד', 'לתפקד']

/** Headline word that changes every few seconds ("לחזור ___ בלי כאב"). */
export function RotatingWord({ color = '#FBBF24', className = '' }: { color?: string; className?: string } = {}) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = window.setInterval(() => setI((n) => (n + 1) % WORDS.length), 3000)
    return () => window.clearInterval(t)
  }, [])
  return (
    <strong key={i} className={`hero-word inline-block whitespace-nowrap font-extrabold ${className}`} style={{ color }}>
      {WORDS[i]}
    </strong>
  )
}

const PROBLEMS = ['כאבי גב', 'כאבי צוואר', 'כאבי כתף', 'כאבי ברך', 'ורטיגו / סחרחורות', 'מפרק הלסת', 'שיקום אחרי ניתוח', 'פציעת ספורט', 'משהו אחר']

/** Booking-style box: choose the problem, then open WhatsApp with it already written. */
export function ProblemFinder() {
  const [problem, setProblem] = useState('')
  const text = problem ? `שלום, אשמח לתאם טיפול. הבעיה: ${problem}` : 'שלום, אשמח לתאם אבחון'
  return (
    <div className="rounded-3xl bg-white p-5 sm:p-6 shadow-2xl text-right">
      <label htmlFor="hero-problem" className="block text-lg font-bold mb-3" style={{ color: '#2A3080' }}>
        במה נוכל לעזור?
      </label>
      <select
        id="hero-problem"
        value={problem}
        onChange={(e) => setProblem(e.target.value)}
        className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3.5 text-base text-gray-900 focus:border-[#2080C0] focus:outline-none"
      >
        <option value="">בחרו מה כואב</option>
        {PROBLEMS.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
      <MeuhedetContactLink
        page="home"
        type="whatsapp"
        href={homeWhatsappHref(text)}
        section="hero_finder"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-base font-bold text-white shadow-md hover:bg-[#1ebe57] transition-colors"
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        בדקו תור פנוי ב-WhatsApp
      </MeuhedetContactLink>
      <div className="mt-3 text-center text-sm text-gray-600">תור תוך 24–48 שעות · מרכז כלניות, אשדוד</div>
    </div>
  )
}
