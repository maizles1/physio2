// Homepage hero, concept A: athletic and bold.
// globals.css forces white text on <p>/<span>/<h*> inside sections with "text-white" or with
// certain brand hex colours in their inline style, so this section sets neither.
import Image from 'next/image'
import { Phone, MessageCircle, ArrowLeft, MapPin } from 'lucide-react'
import MeuhedetContactLink from '@/components/MeuhedetContactLink'
import { homeWhatsappHref } from '@/components/home/HeroCtas'
import { HERO_TREATMENT_PHOTO } from '@/components/home/HeroDesigns'
import { seoConfig, getContactPhoneTel } from '@/config/seo.config'
import { GOOGLE_RATING_DISPLAY } from '@/config/google-business.config'

import { display } from '@/components/home/boldTheme'

const INK = '#14161F'
const PAPER = '#F3EEE5'
const YELLOW = '#FFD23F'
export type BoldTheme = 'paper' | 'ink' | 'blue'
export type BoldLayout = 'split' | 'poster' | 'stats'

type Palette = {
  bg: string
  fg: string
  sub: string
  accent: string
  scribble: string
  offset: string
  stripBg: string
  stripFg: string
  stripStar: string
  btnShadow: string
  rule: string
  grainBlend: 'multiply' | 'screen'
  grainOpacity: number
}

const THEMES: Record<BoldTheme, Palette> = {
  paper: {
    bg: '#F3EEE5', fg: '#14161F', sub: '#3b3f4c', accent: '#1E78B8', scribble: '#FFD23F', offset: '#1E78B8',
    stripBg: '#14161F', stripFg: '#F3EEE5', stripStar: '#FFD23F', btnShadow: '#14161F', rule: 'rgba(20,22,31,0.25)',
    grainBlend: 'multiply', grainOpacity: 0.18,
  },
  ink: {
    bg: '#14161F', fg: '#F3EEE5', sub: 'rgba(243,238,229,0.78)', accent: '#FFD23F', scribble: '#1E78B8', offset: '#FFD23F',
    stripBg: '#FFD23F', stripFg: '#14161F', stripStar: '#1E78B8', btnShadow: '#FFD23F', rule: 'rgba(243,238,229,0.25)',
    grainBlend: 'screen', grainOpacity: 0.07,
  },
  blue: {
    bg: '#1E78B8', fg: '#FFFFFF', sub: 'rgba(255,255,255,0.88)', accent: '#FFD23F', scribble: '#14161F', offset: '#14161F',
    stripBg: '#14161F', stripFg: '#F3EEE5', stripStar: '#FFD23F', btnShadow: '#14161F', rule: 'rgba(255,255,255,0.3)',
    grainBlend: 'multiply', grainOpacity: 0.12,
  },
}

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
function AreasStrip({ t }: { t: Palette }) {
  return (
    <div className="relative mt-10 lg:mt-14 py-3.5" style={{ background: t.stripBg }}>
      <div className="container mx-auto px-5">
        <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 list-none m-0! p-0!" aria-label="תחומי טיפול">
          {AREAS.map((area, i) => (
            <li
              key={area}
              className={`${display.className} flex items-center gap-5 text-[1.6rem] sm:text-[1.9rem] leading-none m-0!`}
              style={{ color: t.stripFg }}
            >
              {area}
              {i < AREAS.length - 1 && (
                <span style={{ color: t.stripStar }} aria-hidden="true">
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
function Scribble({ color = YELLOW }: { color?: string }) {
  return (
    <svg className="absolute -bottom-1 right-0 h-[0.22em] w-full" viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
      <path d="M4 16 C 70 4, 140 22, 210 10 S 290 8, 296 14" fill="none" stroke={color} strokeWidth="9" strokeLinecap="round" />
    </svg>
  )
}

const PAPER_GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")"

function TagRow({ t, center = false }: { t: Palette; center?: boolean }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 mb-2.5 ${center ? 'justify-center' : ''}`}>
      <div className="flex items-center gap-2.5">
        <div className="h-[3px] w-8" style={{ background: t.accent }} />
        <h1 className="font-bold tracking-wide m-0!" style={{ color: t.fg, fontSize: '0.95rem', lineHeight: 1.3 }}>
          מכון פיזיותרפיה פרטי באשדוד
        </h1>
      </div>
      <span className="inline-flex items-center gap-1 text-xs font-medium" style={{ color: t.sub }}>
        <MapPin className="h-3.5 w-3.5" style={{ color: t.accent }} aria-hidden="true" />
        מרכז כלניות, יקינטון 3
      </span>
    </div>
  )
}

function Headline({ t, size, inline = false }: { t: Palette; size: string; inline?: boolean }) {
  const olympic = (
    <div className="relative inline-block">
      <div style={{ color: t.accent }}>אולימפית.</div>
      <Scribble color={t.scribble} />
    </div>
  )
  if (inline) {
    return (
      <div className={`${display.className} leading-[0.86] ${size}`} style={{ color: t.fg }}>
        <div>שיקום ברמה</div>
        <div>{olympic}</div>
      </div>
    )
  }
  return (
    <div className={`${display.className} leading-[0.86] ${size}`} style={{ color: t.fg }}>
      <div>שיקום</div>
      <div>ברמה</div>
      <div>{olympic}</div>
    </div>
  )
}

function Intro({ t, className = '' }: { t: Palette; className?: string }) {
  return (
    <p className={`max-w-lg text-[1rem] sm:text-[1.05rem] leading-relaxed ${className}`} style={{ color: t.sub }}>
      <strong style={{ color: t.fg }}>הניסיון של נבחרת ישראל בג׳ודו, בקליניקה באשדוד.</strong> צוות פיזיותרפיסטים בניהולו
      הקליני של אנדריי מייזלס (M.Sc), במרכז כלניות, יקינטון 3, אשדוד. אבחון מבוסס מדידות כוח אובייקטיביות ותוכנית שיקום
      אקטיבית לכאבי גב, צוואר, כתף וברך, פציעות ספורט, ורטיגו ומפרק הלסת.
    </p>
  )
}

function Buttons({ t, center = false }: { t: Palette; center?: boolean }) {
  return (
    <div className={`mt-5 flex flex-col sm:flex-row gap-3 ${center ? 'sm:justify-center' : ''}`}>
      <WhatsAppLink className="group inline-flex items-center justify-between gap-4 whitespace-nowrap rounded-md bg-[#25D366] px-6 py-3.5 text-lg font-bold text-white hover:translate-x-[-3px] hover:translate-y-[3px] transition-all">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          כתבו לנו ב-WhatsApp
        </div>
        <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
      </WhatsAppLink>
      <CallLink className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border-2 px-6 py-3.5 text-lg font-bold hover:opacity-80 transition-opacity">
        <Phone className="h-5 w-5" style={{ color: t.fg }} aria-hidden="true" />
        <div style={{ color: t.fg }}>{seoConfig.contact.phone}</div>
      </CallLink>
      {/* Hard offset shadow and border colour follow the theme */}
      <style>{`.hero-bold-${t.btnShadow.slice(1)} a[href^="https://wa.me"]{box-shadow:5px 5px 0 ${t.btnShadow}} .hero-bold-${t.btnShadow.slice(1)} a[href^="tel:"]{border-color:${t.fg}}`}</style>
    </div>
  )
}

function Steps({ t }: { t: Palette }) {
  return (
    <ol className="mt-6 grid grid-cols-3 border-t-2 pr-0! mb-0! list-none" style={{ borderColor: t.fg }}>
      {['אבחון ומדידות', 'טיפול ושיקום', 'חזרה לפעילות'].map((step, i) => (
        <li key={step} className={`mb-0! pt-2 ${i > 0 ? 'border-r pr-3' : ''}`} style={{ borderColor: t.rule }}>
          <div className={`${display.className} text-3xl leading-none`} style={{ color: t.accent }}>
            0{i + 1}
          </div>
          <div className="text-sm font-bold" style={{ color: t.fg }}>
            {step}
          </div>
        </li>
      ))}
    </ol>
  )
}

function TapedPhoto({ t, aspect = 'aspect-[4/5]', className = '' }: { t: Palette; aspect?: string; className?: string }) {
  return (
    <div className={`relative pb-6 pt-10 lg:pt-4 ${className}`}>
      <div className="absolute inset-x-0 top-10 lg:top-4 bottom-6 translate-x-4 translate-y-4 rounded-sm" style={{ background: t.offset }} aria-hidden="true" />
      <div className={`relative ${aspect} overflow-hidden rounded-sm ring-[6px] ring-white shadow-2xl`}>
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
  )
}

/** Big numbers instead of a photo. */
function StatsColumn({ t }: { t: Palette }) {
  const stats = [
    { n: GOOGLE_RATING_DISPLAY, l: 'דירוג המטופלים בגוגל', star: true },
    { n: '24–48', l: 'שעות עד תור פנוי' },
    { n: '5000+', l: 'מטופלים בקליניקה' },
  ]
  return (
    <ul className="list-none m-0! p-0! grid grid-cols-1 gap-0">
      {stats.map((st, i) => (
        <li key={st.l} className="m-0! flex items-end justify-between gap-4 border-t-2 py-3" style={{ borderColor: i === 0 ? t.fg : t.rule }}>
          <div className={`${display.className} text-[5.5rem] sm:text-[7rem] leading-[0.8]`} style={{ color: i === 0 ? t.accent : t.fg }}>
            {st.n}
          </div>
          <div className="pb-2 text-left">
            {st.star && (
              <div className="text-sm tracking-[0.2em]" style={{ color: YELLOW }} aria-hidden="true">
                ★★★★★
              </div>
            )}
            <div className="text-sm font-bold" style={{ color: t.sub }}>
              {st.l}
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

/** Athletic and bold hero. `theme` picks colours, `layout` picks the arrangement. */
export function HeroBold({ theme = 'paper', layout = 'split' }: { theme?: BoldTheme; layout?: BoldLayout } = {}) {
  const t = THEMES[theme]
  return (
    <section className={`relative overflow-hidden hero-bold-${t.btnShadow.slice(1)}`} style={{ background: t.bg }}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: PAPER_GRAIN, mixBlendMode: t.grainBlend, opacity: t.grainOpacity }}
        aria-hidden="true"
      />
      <div className="container mx-auto px-5 relative pt-5 sm:pt-10 lg:pt-14">
        {layout === 'split' && (
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-14 items-center">
            <div>
              <TagRow t={t} />
              <Headline t={t} size="text-[4.5rem] sm:text-[7rem] lg:text-[9rem]" />
              <Intro t={t} className="mt-5" />
              <Buttons t={t} />
              <Steps t={t} />
            </div>
            <TapedPhoto t={t} className="mx-auto w-[88%] max-w-md lg:w-full lg:max-w-none" />
          </div>
        )}

        {layout === 'poster' && (
          <div>
            <TagRow t={t} center />
            <div className="text-center">
              <Headline t={t} size="text-[4.6rem] sm:text-[7.5rem] lg:text-[10rem]" inline />
            </div>
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-8 lg:gap-14 items-center">
              <div className="order-2 lg:order-1">
                <Intro t={t} />
                <Buttons t={t} />
                <Steps t={t} />
              </div>
              <TapedPhoto t={t} aspect="aspect-[16/11]" className="order-1 lg:order-2 mx-auto w-[92%] lg:w-full" />
            </div>
          </div>
        )}

        {layout === 'stats' && (
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-16 items-center">
            <div>
              <TagRow t={t} />
              <Headline t={t} size="text-[4.5rem] sm:text-[7rem] lg:text-[9rem]" />
              <Intro t={t} className="mt-5" />
              <Buttons t={t} />
            </div>
            <StatsColumn t={t} />
          </div>
        )}
      </div>

      <AreasStrip t={t} />
    </section>
  )
}
