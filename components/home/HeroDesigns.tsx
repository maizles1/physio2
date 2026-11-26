// Round 2 of homepage hero designs for the owner to choose from.
// Note: globals.css forces white on <p>/<span>/<h*> inside sections with "text-white",
// so coloured text inside dark heroes uses <div>/<strong> with explicit colours.
import Image from 'next/image'
import { CalendarCheck, MapPin, Star } from 'lucide-react'
import HeroCtas from '@/components/home/HeroCtas'
import HeroLeadLink from '@/components/home/HeroLeadLink'
import { ProblemFinder, RotatingWord } from '@/components/home/HeroClientParts'
import { GOOGLE_RATING_DISPLAY } from '@/config/google-business.config'
import { manualReviews } from '@/config/manual-reviews.config'

const NAVY = '#2A3080'
const SUMMARY =
  'צוות פיזיותרפיסטים בניהולו הקליני של אנדריי מייזלס (M.Sc), לשעבר פיזיותרפיסט נבחרת ישראל בג׳ודו. כאבי גב, צוואר, כתף וברך, שיקום אחרי ניתוח, ורטיגו ומפרק הלסת.'

function Stars({ size = 'w-4 h-4' }: { size?: string }) {
  return (
    <div className="inline-flex gap-0.5" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} className={`${size} fill-[#FBBF24] text-[#FBBF24]`} />
      ))}
    </div>
  )
}

/** 1. Light and airy: white background, photo in an arch, small floating cards. */
export function HeroLight() {
  return (
    <section className="relative overflow-hidden bg-[#F3F7FB]">
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#40C0F0]/20 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 -right-24 h-72 w-72 rounded-full bg-[#2A3080]/10 blur-3xl" aria-hidden="true" />
      <div className="container mx-auto px-4 relative pt-6 pb-16 sm:pt-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="order-2 lg:order-1">
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1 text-sm font-semibold shadow-sm" style={{ color: '#1a6ea5' }}>
              <MapPin className="h-4 w-4" aria-hidden="true" /> מרכז כלניות, אשדוד
            </div>
            <h1 className="text-[2.1rem] sm:text-5xl font-extrabold leading-tight mb-3" style={{ color: NAVY }}>
              מכון פיזיותרפיה פרטי באשדוד
            </h1>
            <div className="text-lg font-bold mb-3" style={{ color: '#2080C0' }}>שיקום ברמה אולימפית</div>
            <div className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 max-w-xl">{SUMMARY}</div>
            <HeroCtas tone="light" />
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative mx-auto w-[78%] max-w-sm">
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-3xl shadow-2xl ring-8 ring-white">
                <Image
                  src="/images/blog/post-surgery-physiotherapy.png"
                  alt="פיזיותרפיסטית מלווה מטופל בתרגול שיקומי"
                  fill
                  priority
                  className="object-cover object-[62%_center]"
                  sizes="(max-width: 1024px) 80vw, 400px"
                />
              </div>
              <div className="absolute -right-8 top-[38%] rounded-2xl bg-white px-3 py-2 shadow-xl">
                <div className="text-xl font-extrabold leading-none" style={{ color: NAVY }}>{GOOGLE_RATING_DISPLAY}</div>
                <Stars size="w-3.5 h-3.5" />
                <div className="text-[11px] text-gray-600">בגוגל</div>
              </div>
              <div className="absolute -left-8 bottom-8 flex items-center gap-2 rounded-2xl bg-white px-3 py-2 shadow-xl">
                <CalendarCheck className="h-5 w-5 text-[#25D366]" aria-hidden="true" />
                <div className="text-sm font-bold leading-tight" style={{ color: NAVY }}>
                  תור תוך
                  <br />
                  24–48 שעות
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/** 2. Dark and athletic: near-black, big type, athlete photo fading in. */
export function HeroDark() {
  return (
    <section className="relative overflow-hidden bg-[#0B1026] text-white">
      <div className="absolute inset-0 lg:left-auto lg:w-1/2">
        <Image
          src="/images/services/knee-pain/service-image.jpg"
          alt="פיזיותרפיסט בודק ברך של ספורטאי"
          fill
          priority
          className="object-cover object-[30%_30%] opacity-60"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0B1026 40%, rgba(11,16,38,0.6) 70%, rgba(11,16,38,0.1))' }} aria-hidden="true" />
      </div>
      <div className="container mx-auto px-4 relative pt-56 pb-16 sm:pt-72 lg:py-24">
        <div className="max-w-xl">
          <div className="text-[2.75rem] sm:text-6xl font-black leading-[1.05] mb-4">
            שיקום ברמה
            <br />
            <strong className="font-black" style={{ color: '#40C0F0' }}>אולימפית.</strong>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold mb-3 text-white">מכון פיזיותרפיה פרטי באשדוד</h1>
          <div className="text-base sm:text-lg leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.85)' }}>{SUMMARY}</div>
          <HeroCtas />
          <div className="mt-6 grid grid-cols-3 gap-2 text-center">
            {[
              [GOOGLE_RATING_DISPLAY, 'בגוגל'],
              ['5000+', 'מטופלים'],
              ['24–48', 'שעות לתור'],
            ].map(([big, small]) => (
              <div key={small} className="rounded-xl border border-white/15 py-3">
                <div className="text-2xl font-extrabold" style={{ color: '#ffffff' }}>{big}</div>
                <div className="text-xs" style={{ color: '#9fd6f7' }}>{small}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/** 3. Moving headline: "לחזור ___ בלי כאב" with the word changing, on a slowly shifting gradient. */
export function HeroRotating() {
  return (
    <section className="hero-shift relative overflow-hidden text-white">
      <div className="container mx-auto px-4 relative pt-10 pb-16 sm:py-20 text-center">
        <h1 className="text-base sm:text-lg font-bold mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-white">
          מכון פיזיותרפיה פרטי באשדוד
        </h1>
        <div className="text-[2.4rem] sm:text-6xl font-black leading-tight mb-5">
          <div>לחזור</div>
          <div className="min-h-[2.5em] sm:min-h-[1.25em] flex items-center justify-center">
            <RotatingWord />
          </div>
          <div>בלי כאב.</div>
        </div>
        <div className="mx-auto max-w-xl text-base sm:text-lg leading-relaxed mb-7" style={{ color: 'rgba(255,255,255,0.9)' }}>{SUMMARY}</div>
        <div className="mx-auto max-w-md">
          <HeroCtas />
        </div>
        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
          <Stars />
          <strong className="text-sm" style={{ color: '#ffffff' }}>{GOOGLE_RATING_DISPLAY} בגוגל · תור תוך 24–48 שעות</strong>
        </div>
      </div>
    </section>
  )
}

/** 4. Booking-style: pick the problem, WhatsApp opens with it written. */
export function HeroFinder() {
  return (
    <section className="relative overflow-hidden text-white bg-[#1b2063]">
      <Image
        src="/images/blog/physiotherapy-treatment-process.png"
        alt="פיזיותרפיסטית מסבירה למטופל על מקור הכאב"
        fill
        priority
        className="object-cover opacity-20"
        sizes="100vw"
      />
      <div className="container mx-auto px-4 relative pt-8 pb-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          <div>
            <h1 className="text-[2rem] sm:text-5xl font-extrabold leading-tight mb-3 text-white">מכון פיזיותרפיה פרטי באשדוד</h1>
            <div className="text-lg font-bold mb-2" style={{ color: '#9fd6f7' }}>שיקום ברמה אולימפית</div>
            <div className="text-base sm:text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.9)' }}>{SUMMARY}</div>
          </div>
          <div>
            <ProblemFinder />
            <div className="mt-3 text-center">
              <HeroLeadLink />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/** 5. Reviews in motion: headline and buttons, then a strip of real Google reviews sliding by. */
export function HeroReviews() {
  const reviews = manualReviews.filter((r) => r.rating === 5)
  const strip = [...reviews, ...reviews]
  return (
    <section className="relative overflow-hidden text-white bg-[#2A3080]">
      <div className="container mx-auto px-4 relative pt-8 pb-6 sm:pt-16 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 shadow">
          <Stars />
          <strong className="text-sm" style={{ color: NAVY }}>{GOOGLE_RATING_DISPLAY} בגוגל</strong>
        </div>
        <h1 className="text-[2rem] sm:text-5xl font-extrabold leading-tight mb-3 text-white">מכון פיזיותרפיה פרטי באשדוד</h1>
        <div className="mx-auto max-w-xl text-base sm:text-lg leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.9)' }}>{SUMMARY}</div>
        <div className="mx-auto max-w-md">
          <HeroCtas />
        </div>
      </div>
      <div className="relative pb-14 pt-4" dir="ltr">
        <div className="hero-marquee flex w-max gap-4">
          {strip.map((r, i) => (
            <div key={`${r.id}-${i}`} dir="rtl" className="w-72 flex-shrink-0 rounded-2xl bg-white p-4 text-right shadow-lg">
              <Stars size="w-3.5 h-3.5" />
              <div className="mt-2 text-sm leading-relaxed text-gray-800 line-clamp-4">״{r.text}״</div>
              <div className="mt-2 text-sm font-bold" style={{ color: NAVY }}>{r.authorName}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
