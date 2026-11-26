// Round 3: two crafted hero concepts. Avoids the generic look (blue gradients, pills, icon circles).
// globals.css forces white text on <p>/<span>/<h*> inside sections with "text-white" or with
// certain brand hex colours in their inline style, so these sections set neither.
import Image from 'next/image'
import { Karantina, Frank_Ruhl_Libre } from 'next/font/google'
import { Phone, MessageCircle, ArrowLeft } from 'lucide-react'
import MeuhedetContactLink from '@/components/MeuhedetContactLink'
import { homeWhatsappHref } from '@/components/home/HeroCtas'
import { RotatingWord } from '@/components/home/HeroClientParts'
import { HERO_TREATMENT_PHOTO } from '@/components/home/HeroDesigns'
import { seoConfig, getContactPhoneTel } from '@/config/seo.config'
import { GOOGLE_RATING_DISPLAY } from '@/config/google-business.config'

const display = Karantina({ subsets: ['hebrew'], weight: ['700'], display: 'swap' })
const serif = Frank_Ruhl_Libre({ subsets: ['hebrew'], weight: ['500', '900'], display: 'swap' })

const INK = '#14161F'
const BLUE = '#1E78B8'
const PAPER = '#F3EEE5'
const AREAS = ['כאבי גב', 'צוואר', 'כתף', 'ברך', 'ורטיגו', 'מפרק הלסת', 'שיקום אחרי ניתוח', 'פציעות ספורט']

function CallLink({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <MeuhedetContactLink page="home" type="phone" href={`tel:${getContactPhoneTel()}`} section="hero" className={className}>
      {children}
    </MeuhedetContactLink>
  )
}

function WhatsAppLink({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <MeuhedetContactLink
      page="home"
      type="whatsapp"
      href={homeWhatsappHref()}
      section="hero"
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </MeuhedetContactLink>
  )
}

/** Tilted band of treatment areas sliding sideways. */
function Ribbon({
  bg,
  fg,
  star,
  tilt,
  reverse = false,
  className = '',
}: {
  bg: string
  fg: string
  star: string
  tilt: number
  reverse?: boolean
  className?: string
}) {
  const items = [...AREAS, ...AREAS]
  return (
    <div className={`relative -mx-8 py-3 shadow-lg ${className}`} style={{ background: bg, transform: `rotate(${tilt}deg)` }} aria-hidden="true">
      <div dir="ltr" className="overflow-hidden">
        <div
          className="hero-marquee flex w-max items-center gap-6"
          style={{ animationDuration: '30s', animationDirection: reverse ? 'reverse' : 'normal' }}
        >
          {items.map((a, i) => (
            <div key={i} dir="rtl" className={`${display.className} flex items-center gap-6 text-[2rem] leading-none`} style={{ color: fg }}>
              {a}
              <div style={{ color: star }}>✦</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/** Round badge with text running around it, turning slowly. */
function SpinBadge() {
  const ring = 'ביקורות מטופלים בגוגל · ביקורות מטופלים בגוגל · '
  return (
    <div className="relative h-32 w-32 sm:h-36 sm:w-36" style={{ color: INK }}>
      <div className="absolute inset-0 rounded-full shadow-xl" style={{ background: '#FFD23F' }} />
      {/* Letters placed one by one around the circle, reading right to left (counter-clockwise) */}
      <div className="hero-spin absolute inset-0" aria-hidden="true">
        {Array.from(ring).map((ch, i, arr) => (
          <div
            key={i}
            className="absolute left-1/2 top-0 h-1/2 origin-bottom text-[11px] font-bold leading-none"
            style={{ transform: `translateX(-50%) rotate(${(-360 / arr.length) * i}deg)`, paddingTop: '7px', color: INK }}
          >
            {ch}
          </div>
        ))}
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className={`${display.className} text-[3.2rem] leading-[0.8]`}>{GOOGLE_RATING_DISPLAY}</div>
        <div className="text-[11px] tracking-[0.2em]">★★★★★</div>
      </div>
    </div>
  )
}

/** Yellow hand-drawn stroke under a word. */
function Scribble() {
  return (
    <svg className="absolute -bottom-1 right-0 h-[0.22em] w-full" viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
      <path d="M4 16 C 70 4, 140 22, 210 10 S 290 8, 296 14" fill="none" stroke="#FFD23F" strokeWidth="9" strokeLinecap="round" />
    </svg>
  )
}

const PAPER_GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")"

/** Concept A: athletic and bold. Paper background, giant condensed type, taped photo, spinning badge, crossing ribbons. */
export function HeroBold() {
  return (
    <section className="relative overflow-hidden" style={{ background: PAPER }}>
      <div className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-multiply" style={{ backgroundImage: PAPER_GRAIN }} aria-hidden="true" />
      <div className="container mx-auto px-5 relative pt-6 sm:pt-12 lg:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-center">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-[3px] w-10" style={{ background: BLUE }} />
              <h1 className="font-bold tracking-wide m-0!" style={{ color: INK, fontSize: '0.95rem', lineHeight: 1.3 }}>
                מכון פיזיותרפיה פרטי באשדוד
              </h1>
            </div>

            <div className={`${display.className} leading-[0.82] text-[6.4rem] sm:text-[8rem] lg:text-[9.5rem]`} style={{ color: INK }}>
              <div>לחזור</div>
              <div className="min-h-[0.92em]">
                <div className="relative inline-block">
                  <RotatingWord color={BLUE} className="font-bold!" />
                  <Scribble />
                </div>
              </div>
              <div>בלי כאב.</div>
            </div>

            <div className="mt-6 max-w-md text-[1.05rem] leading-relaxed" style={{ color: '#3b3f4c' }}>
              <strong style={{ color: INK }}>הניסיון של נבחרת ישראל בג׳ודו, בקליניקה באשדוד.</strong> צוות פיזיותרפיסטים בניהולו
              הקליני של אנדריי מייזלס (M.Sc). אבחון יסודי, תוכנית ברורה, ועבודה עד שחוזרים לתפקד.
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <WhatsAppLink className="group inline-flex items-center justify-between gap-4 whitespace-nowrap rounded-md bg-[#25D366] px-6 py-4 text-lg font-bold text-white shadow-[5px_5px_0_#14161F] hover:shadow-[2px_2px_0_#14161F] hover:translate-x-[-3px] hover:translate-y-[3px] transition-all">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  כתבו לנו ב-WhatsApp
                </div>
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
              </WhatsAppLink>
              <CallLink className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border-2 border-[#14161F] px-6 py-4 text-lg font-bold hover:bg-white transition-colors">
                <Phone className="h-5 w-5" style={{ color: INK }} aria-hidden="true" />
                <div style={{ color: INK }}>{seoConfig.contact.phone}</div>
              </CallLink>
            </div>

            <ol className="mt-7 grid grid-cols-3 border-t-2 pr-0! mb-0! list-none" style={{ borderColor: INK }}>
              {['אבחון', 'טיפול', 'חוזרים לפעילות'].map((step, i) => (
                <li key={step} className={`mb-0! pt-2 ${i > 0 ? 'border-r pr-3' : ''}`} style={{ borderColor: 'rgba(20,22,31,0.25)' }}>
                  <div className={`${display.className} text-3xl leading-none`} style={{ color: BLUE }}>0{i + 1}</div>
                  <div className="text-sm font-bold" style={{ color: INK }}>{step}</div>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative mx-auto w-[88%] max-w-md lg:w-full lg:max-w-none pb-6 pt-12 lg:pt-4">
            <div className="absolute inset-x-0 top-12 lg:top-4 bottom-6 translate-x-4 translate-y-4 rounded-sm" style={{ background: BLUE }} aria-hidden="true" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm ring-[6px] ring-white shadow-2xl">
              <Image
                src={HERO_TREATMENT_PHOTO.src}
                alt={HERO_TREATMENT_PHOTO.alt}
                fill
                priority
                className="object-cover"
                style={{ objectPosition: HERO_TREATMENT_PHOTO.position }}
                sizes="(max-width: 1024px) 90vw, 45vw"
              />
            </div>
            {/* Tape strips */}
            <div className="absolute top-9 lg:top-1 right-6 h-7 w-24 rotate-[8deg] opacity-80 shadow-sm" style={{ background: '#FFD23F' }} aria-hidden="true" />
            <div className="absolute bottom-3 left-4 h-7 w-24 rotate-[-12deg] opacity-80 shadow-sm" style={{ background: '#FFD23F' }} aria-hidden="true" />
            <div className="absolute top-0 lg:-top-8 -left-8 sm:-left-12 rotate-[-8deg]">
              <SpinBadge />
            </div>
            <div className="absolute bottom-16 -right-5 rotate-[-3deg] px-4 py-2.5 shadow-xl" style={{ background: INK, color: PAPER }}>
              <div className="text-xs" style={{ color: 'rgba(243,238,229,0.8)' }}>תור פנוי תוך</div>
              <div className={`${display.className} text-[2.1rem] leading-none`}>24–48 שעות</div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative h-48 sm:h-52 mt-4">
        <Ribbon bg="#FFD23F" fg={INK} star={BLUE} tilt={4} reverse className="absolute inset-x-0 top-10" />
        <Ribbon bg={INK} fg={PAPER} star="#FFD23F" tilt={-4} className="absolute inset-x-0 top-10" />
      </div>
    </section>
  )
}

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")"

const CORAL = '#FF7A59'
const NIGHT = '#11143A'
const CREAM = '#F3EEE5'

/** Concept B: editorial. Deep navy with grain, large Hebrew serif, duotone photo, outlined numbers. */
export function HeroEditorial() {
  return (
    <section className="relative overflow-hidden" style={{ background: NIGHT }}>
      <div className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay" style={{ backgroundImage: GRAIN }} aria-hidden="true" />
      <div className="container mx-auto px-5 relative pt-7 pb-12 sm:pt-14 lg:py-20" style={{ color: CREAM }}>
        <div className="flex items-center justify-between border-b pb-3 mb-6 text-xs tracking-wider" style={{ borderColor: 'rgba(243,238,229,0.25)' }}>
          <h1 className="m-0! font-bold" style={{ color: CREAM, fontSize: '0.85rem', lineHeight: 1.3 }}>מכון פיזיותרפיה פרטי באשדוד</h1>
          <div style={{ color: 'rgba(243,238,229,0.7)' }}>מרכז כלניות · יקינטון 3</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-end">
          <div>
            <div className={`${serif.className} font-black leading-[0.95] text-[4.1rem] sm:text-7xl lg:text-8xl`}>
              <div>שיקום</div>
              <div>ברמה</div>
              <div className="relative inline-block" style={{ color: CORAL }}>
                אולימפית.
                <svg className="absolute -bottom-3 right-0 w-full" viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M3 14 C 60 4, 120 18, 180 9 S 280 6, 297 12" fill="none" stroke={CORAL} strokeWidth="4" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <div className={`${serif.className} mt-7 max-w-md text-lg leading-relaxed`} style={{ color: 'rgba(243,238,229,0.88)' }}>
              את השיטה שליוותה את נבחרת ישראל בג׳ודו הבאנו לקליניקה באשדוד. צוות פיזיותרפיסטים בניהולו הקליני של אנדריי מייזלס (M.Sc), לכאבי גב, צוואר, כתף וברך, שיקום אחרי ניתוח, ורטיגו ומפרק הלסת.
            </div>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <WhatsAppLink className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#25D366] px-7 py-4 text-base font-bold text-white hover:bg-[#1ebe57] transition-colors">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                כתבו לנו ב-WhatsApp
              </WhatsAppLink>
              <CallLink className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[#F3EEE5]/60 px-7 py-4 text-base font-bold hover:bg-white/10 transition-colors">
                <Phone className="h-5 w-5" style={{ color: CREAM }} aria-hidden="true" />
                <div style={{ color: CREAM }}>התקשרו {seoConfig.contact.phone}</div>
              </CallLink>
            </div>
          </div>

          <div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={HERO_TREATMENT_PHOTO.src}
                alt={HERO_TREATMENT_PHOTO.alt}
                fill
                priority
                className="object-cover grayscale contrast-125"
                style={{ objectPosition: HERO_TREATMENT_PHOTO.position }}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 mix-blend-multiply" style={{ background: '#1E78B8' }} aria-hidden="true" />
              <div className="absolute inset-0 mix-blend-screen opacity-40" style={{ background: NIGHT }} aria-hidden="true" />
            </div>
            <div className="mt-6 grid grid-cols-3 border-t pt-4" style={{ borderColor: 'rgba(243,238,229,0.25)' }}>
              {[
                [GOOGLE_RATING_DISPLAY, 'דירוג בגוגל'],
                ['24–48', 'שעות עד תור'],
                ['M.Sc', 'ניהול קליני'],
              ].map(([n, l]) => (
                <div key={l} className="text-center">
                  <div
                    className={`${serif.className} font-black text-4xl sm:text-5xl leading-none`}
                    style={{ color: 'transparent', WebkitTextStroke: `1.5px ${CREAM}` }}
                  >
                    {n}
                  </div>
                  <div className="mt-2 text-xs" style={{ color: 'rgba(243,238,229,0.75)' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
