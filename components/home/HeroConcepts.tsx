// Homepage hero, concept A: athletic and bold.
// globals.css forces white text on <p>/<span>/<h*> inside sections with "text-white" or with
// certain brand hex colours in their inline style, so this section sets neither.
import Image from 'next/image'
import { Karantina } from 'next/font/google'
import { Phone, MessageCircle, ArrowLeft, MapPin } from 'lucide-react'
import MeuhedetContactLink from '@/components/MeuhedetContactLink'
import { homeWhatsappHref } from '@/components/home/HeroCtas'
import { RotatingWord } from '@/components/home/HeroClientParts'
import { HERO_TREATMENT_PHOTO } from '@/components/home/HeroDesigns'
import { seoConfig, getContactPhoneTel } from '@/config/seo.config'
import { GOOGLE_RATING_DISPLAY } from '@/config/google-business.config'

const display = Karantina({ subsets: ['hebrew'], weight: ['700'], display: 'swap' })

const INK = '#14161F'
const BLUE = '#1E78B8'
const PAPER = '#F3EEE5'
const YELLOW = '#FFD23F'
const AREAS = ['כאבי גב', 'צוואר', 'כתף', 'ברך', 'פציעות ספורט', 'שיקום אחרי ניתוח', 'ורטיגו', 'מפרק הלסת']

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

/** Static strip of treatment areas. No motion, so it is calm for vertigo patients and readable by search engines. */
function AreasStrip() {
  return (
    <div className="relative mt-10 lg:mt-14 py-3.5" style={{ background: INK }}>
      <div className="container mx-auto px-5">
        <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 list-none m-0! p-0!" aria-label="תחומי טיפול">
          {AREAS.map((area, i) => (
            <li
              key={area}
              className={`${display.className} flex items-center gap-5 text-[1.6rem] sm:text-[1.9rem] leading-none m-0!`}
              style={{ color: PAPER }}
            >
              {area}
              {i < AREAS.length - 1 && (
                <span style={{ color: YELLOW }} aria-hidden="true">
                  ✦
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/** Static round Google rating badge, slightly tilted. */
function RatingBadge() {
  const ring = 'ביקורות מטופלים בגוגל · ביקורות מטופלים בגוגל · '
  return (
    <div
      className="relative h-28 w-28 sm:h-34 sm:w-34"
      style={{ color: INK }}
      role="img"
      aria-label={`דירוג ${GOOGLE_RATING_DISPLAY} מתוך 5 בביקורות מטופלים בגוגל`}
    >
      <div className="absolute inset-0 rounded-full shadow-xl" style={{ background: YELLOW }} />
      {/* Letters placed one by one around the circle, reading right to left */}
      <div className="absolute inset-0" aria-hidden="true">
        {Array.from(ring).map((ch, i, arr) => (
          <div
            key={i}
            className="absolute left-1/2 top-0 h-1/2 origin-bottom text-[10px] sm:text-[11px] font-bold leading-none"
            style={{ transform: `translateX(-50%) rotate(${(-360 / arr.length) * i}deg)`, paddingTop: '6px', color: INK }}
          >
            {ch}
          </div>
        ))}
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center" aria-hidden="true">
        <div className={`${display.className} text-[2.8rem] sm:text-[3.1rem] leading-[0.8]`}>{GOOGLE_RATING_DISPLAY}</div>
        <div className="text-[10px] sm:text-[11px] tracking-[0.2em]">★★★★★</div>
      </div>
    </div>
  )
}

/** Yellow hand-drawn stroke under a word. */
function Scribble() {
  return (
    <svg className="absolute -bottom-1 right-0 h-[0.22em] w-full" viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
      <path d="M4 16 C 70 4, 140 22, 210 10 S 290 8, 296 14" fill="none" stroke={YELLOW} strokeWidth="9" strokeLinecap="round" />
    </svg>
  )
}

const PAPER_GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")"

/** Paper background, giant condensed type, taped photo, static rating badge and treatment areas strip. */
export function HeroBold() {
  return (
    <section className="relative overflow-hidden" style={{ background: PAPER }}>
      <div className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-multiply" style={{ backgroundImage: PAPER_GRAIN }} aria-hidden="true" />
      <div className="container mx-auto px-5 relative pt-5 sm:pt-10 lg:pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-14 items-center">
          <div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2.5">
              <div className="flex items-center gap-2.5">
                <div className="h-[3px] w-8" style={{ background: BLUE }} />
                <h1 className="font-bold tracking-wide m-0!" style={{ color: INK, fontSize: '0.95rem', lineHeight: 1.3 }}>
                  מכון פיזיותרפיה פרטי באשדוד
                </h1>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-medium" style={{ color: '#4b5060' }}>
                <MapPin className="h-3.5 w-3.5" style={{ color: BLUE }} aria-hidden="true" />
                מרכז כלניות, יקינטון 3
              </span>
            </div>

            <div className={`${display.className} leading-[0.84] text-[4.5rem] sm:text-[7rem] lg:text-[9rem]`} style={{ color: INK }}>
              <div>לחזור</div>
              <div className="min-h-[0.92em]">
                <div className="relative inline-block">
                  <RotatingWord color={BLUE} className="font-bold! whitespace-nowrap" />
                  <Scribble />
                </div>
              </div>
              <div>בלי כאב.</div>
            </div>

            <p className="mt-5 max-w-lg text-[1rem] sm:text-[1.05rem] leading-relaxed" style={{ color: '#3b3f4c' }}>
              <strong style={{ color: INK }}>הניסיון של נבחרת ישראל בג׳ודו, בקליניקה באשדוד.</strong> צוות פיזיותרפיסטים בניהולו
              הקליני של אנדריי מייזלס (M.Sc), במרכז כלניות, יקינטון 3, אשדוד. אבחון מבוסס מדידות כוח אובייקטיביות ותוכנית שיקום
              אקטיבית לכאבי גב, צוואר, כתף וברך, פציעות ספורט, ורטיגו ומפרק הלסת.
            </p>

            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <WhatsAppLink className="group inline-flex items-center justify-between gap-4 whitespace-nowrap rounded-md bg-[#25D366] px-6 py-3.5 text-lg font-bold text-white shadow-[5px_5px_0_#14161F] hover:shadow-[2px_2px_0_#14161F] hover:translate-x-[-3px] hover:translate-y-[3px] transition-all">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  כתבו לנו ב-WhatsApp
                </div>
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
              </WhatsAppLink>
              <CallLink className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border-2 border-[#14161F] px-6 py-3.5 text-lg font-bold hover:bg-white transition-colors">
                <Phone className="h-5 w-5" style={{ color: INK }} aria-hidden="true" />
                <div style={{ color: INK }}>{seoConfig.contact.phone}</div>
              </CallLink>
            </div>

            <ol className="mt-6 grid grid-cols-3 border-t-2 pr-0! mb-0! list-none" style={{ borderColor: INK }}>
              {['אבחון ומדידות', 'טיפול ושיקום', 'חזרה לפעילות'].map((step, i) => (
                <li key={step} className={`mb-0! pt-2 ${i > 0 ? 'border-r pr-3' : ''}`} style={{ borderColor: 'rgba(20,22,31,0.25)' }}>
                  <div className={`${display.className} text-3xl leading-none`} style={{ color: BLUE }}>
                    0{i + 1}
                  </div>
                  <div className="text-sm font-bold" style={{ color: INK }}>
                    {step}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative mx-auto w-[88%] max-w-md lg:w-full lg:max-w-none pb-6 pt-10 lg:pt-4">
            <div className="absolute inset-x-0 top-10 lg:top-4 bottom-6 translate-x-4 translate-y-4 rounded-sm" style={{ background: BLUE }} aria-hidden="true" />
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
            <div className="absolute top-7 lg:top-1 right-6 h-7 w-24 rotate-[8deg] opacity-80 shadow-sm" style={{ background: YELLOW }} aria-hidden="true" />
            <div className="absolute bottom-3 left-4 h-7 w-24 rotate-[-12deg] opacity-80 shadow-sm" style={{ background: YELLOW }} aria-hidden="true" />
            <div className="absolute -top-2 lg:-top-8 -left-5 sm:-left-10 rotate-[-8deg]">
              <RatingBadge />
            </div>
            <div className="absolute bottom-14 -right-4 rotate-[-3deg] px-4 py-2.5 shadow-xl" style={{ background: INK, color: PAPER }}>
              <div className="text-xs" style={{ color: 'rgba(243,238,229,0.8)' }}>
                תור פנוי תוך
              </div>
              <div className={`${display.className} text-[2rem] leading-none`}>24–48 שעות</div>
            </div>
          </div>
        </div>
      </div>

      <AreasStrip />
    </section>
  )
}
