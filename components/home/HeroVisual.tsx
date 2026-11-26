import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { GOOGLE_RATING_DISPLAY } from '@/config/google-business.config'

export type HeroVisualKind = 'photo' | 'body' | 'collage' | 'fullbleed' | 'chips' | 'stats' | 'logo'

const STAR_PATH =
  'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'

function RatingCard({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 rounded-2xl bg-white px-4 py-2.5 shadow-xl whitespace-nowrap ${className}`}>
      <div className="text-2xl font-extrabold leading-none text-[#2A3080]">{GOOGLE_RATING_DISPLAY}</div>
      <div>
        <span className="inline-flex gap-0.5" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => (
            <svg key={i} className="w-4 h-4" viewBox="0 0 20 20" fill="#FBBF24">
              <path d={STAR_PATH} />
            </svg>
          ))}
        </span>
        <div className="text-xs font-medium text-gray-600">ביקורות מטופלים בגוגל</div>
      </div>
    </div>
  )
}

/** Option A: one treatment photo. */
function PhotoVisual() {
  return (
    <div className="relative mx-auto max-w-md lg:max-w-none">
      <div className="relative aspect-[16/10] sm:aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/20">
        <Image
          src="/images/blog/post-surgery-physiotherapy.png"
          alt="פיזיותרפיסטית מלווה מטופל בתרגול שיקומי בקליניקה"
          fill
          priority
          className="object-cover object-[60%_center]"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1b2063]/50 via-transparent to-transparent" aria-hidden="true" />
        <div className="absolute top-3 left-3 rounded-full bg-[#25D366] px-3 py-1 text-xs font-bold text-white shadow-md">
          תור תוך 24–48 שעות
        </div>
      </div>
      <RatingCard className="absolute -bottom-4 right-4" />
    </div>
  )
}

/** Option C: three treatment photos in a mosaic. */
function CollageVisual() {
  return (
    <div className="relative mx-auto max-w-md lg:max-w-none">
      <div className="grid grid-cols-3 grid-rows-2 gap-1.5 aspect-[16/10] sm:aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/20">
        <div className="relative col-span-2 row-span-2">
          <Image src="/images/blog/post-surgery-physiotherapy.png" alt="תרגול שיקומי בקליניקה" fill priority className="object-cover object-[60%_center]" sizes="66vw" />
        </div>
        <div className="relative">
          <Image src="/images/services/neck-pain/service-image.jpg" alt="טיפול בכאבי צוואר" fill className="object-cover" sizes="33vw" />
        </div>
        <div className="relative">
          <Image src="/images/services/knee-pain/service-image.jpg" alt="טיפול בכאבי ברך" fill className="object-cover" sizes="33vw" />
        </div>
      </div>
      <RatingCard className="absolute -bottom-4 right-4" />
    </div>
  )
}

const bodyPoints = [
  { label: 'ורטיגו', href: '/vertigo-ashdod', side: 'right', ly: 34, px: 194, py: 30 },
  { label: 'לסת', href: '/services/tmj-ashdod', side: 'right', ly: 88, px: 193, py: 55 },
  { label: 'גב', href: '/services/back-pain-ashdod', side: 'right', ly: 162, px: 205, py: 160 },
  { label: 'צוואר', href: '/services/neck-pain-ashdod', side: 'left', ly: 56, px: 174, py: 70 },
  { label: 'כתף', href: '/services/shoulder-pain-ashdod', side: 'left', ly: 112, px: 150, py: 90 },
  { label: 'ברך', href: '/services/knee-pain-ashdod', side: 'left', ly: 236, px: 162, py: 238 },
] as const

/** Option B: body outline with tappable pain points. */
function BodyVisual() {
  const fig = { fill: '#ffffff', fillOpacity: 0.16 }
  const limb = { stroke: '#ffffff', strokeOpacity: 0.16, strokeLinecap: 'round' as const, fill: 'none' }
  return (
    <div className="relative mx-auto max-w-md lg:max-w-none">
      <div className="relative rounded-3xl bg-white/5 ring-1 ring-white/15 pt-2 pb-6">
        <svg viewBox="0 0 360 300" className="w-full h-auto" role="img" aria-label="מפת גוף: בחרו איפה כואב">
          <ellipse cx="180" cy="38" rx="20" ry="24" {...fig} />
          <rect x="171" y="58" width="18" height="16" rx="6" {...fig} />
          <path d="M144 80 Q180 70 216 80 L222 150 Q218 176 208 186 L152 186 Q142 176 138 150 Z" {...fig} />
          <path d="M146 86 C130 96 126 124 122 176" strokeWidth="16" {...limb} />
          <path d="M214 86 C230 96 234 124 238 176" strokeWidth="16" {...limb} />
          <path d="M166 184 L161 238 L158 288" strokeWidth="22" {...limb} />
          <path d="M194 184 L199 238 L202 288" strokeWidth="22" {...limb} />

          {bodyPoints.map((p) => {
            const lx = p.side === 'right' ? 262 : 98
            return (
              <g key={p.label}>
                <line x1={p.px} y1={p.py} x2={lx} y2={p.ly} stroke="#ffffff" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="3 4" />
                <circle cx={p.px} cy={p.py} r="11" fill="#F59E0B" opacity="0.35" className="hero-pulse" />
                <circle cx={p.px} cy={p.py} r="5.5" fill="#F59E0B" stroke="#ffffff" strokeWidth="1.5" />
                <a href={p.href} aria-label={`טיפול ב${p.label}`}>
                  <rect x={p.side === 'right' ? 262 : 16} y={p.ly - 15} width="82" height="30" rx="15" fill="#ffffff" />
                  <text x={p.side === 'right' ? 303 : 57} y={p.ly + 5} textAnchor="middle" fontSize="15" fontWeight="700" fill="#2A3080">
                    {p.label}
                  </text>
                </a>
              </g>
            )
          })}
        </svg>
        <p className="absolute bottom-2 inset-x-0 text-center text-sm font-semibold text-white/90">לחצו איפה שכואב</p>
      </div>
    </div>
  )
}

const chipAreas = [
  { label: 'גב', href: '/services/back-pain-ashdod', image: '/images/services/back-pain/service-image.jpg' },
  { label: 'צוואר', href: '/services/neck-pain-ashdod', image: '/images/services/neck-pain/service-image.jpg' },
  { label: 'כתף', href: '/services/shoulder-pain-ashdod', image: '/images/services/shoulder-pain/service-image.jpg' },
  { label: 'ברך', href: '/services/knee-pain-ashdod', image: '/images/services/knee-pain/service-image.jpg' },
  { label: 'ורטיגו', href: '/vertigo-ashdod', image: '/images/services/vestibular/service-image.png' },
  { label: 'אחרי ניתוח', href: '/services/post-surgery-ashdod', image: '/images/services/post-surgery/service-image.jpg' },
]

/** Option E: "what hurts?" buttons with small photos, inside the hero. */
function ChipsVisual() {
  return (
    <div className="rounded-3xl bg-white/10 ring-1 ring-white/20 p-4 sm:p-5">
      <p className="text-center text-lg font-bold text-white mb-3">מה כואב לך?</p>
      <ul className="grid grid-cols-2 gap-2.5 pr-0! mb-0!">
        {chipAreas.map((c) => (
          <li key={c.href} className="mb-0!">
            <Link
              href={c.href}
              className="flex items-center gap-2.5 rounded-2xl bg-white p-2 pl-3 shadow-md hover:bg-[#EAF4FC] transition-colors"
            >
              <span className="relative h-11 w-11 flex-shrink-0 overflow-hidden rounded-xl">
                <Image src={c.image} alt="" fill className="object-cover" sizes="44px" />
              </span>
              <div className="flex-1 text-[15px] font-bold leading-tight text-[#2A3080]">{c.label}</div>
              <ChevronLeft className="h-4 w-4 flex-shrink-0 text-[#2080C0]" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Option F: big numbers instead of a picture. */
function StatsVisual() {
  const stats = [
    { big: GOOGLE_RATING_DISPLAY, small: 'דירוג בגוגל', stars: true },
    { big: '5000+', small: 'מטופלים' },
    { big: '24–48', small: 'שעות עד תור' },
    { big: 'M.Sc', small: 'ניהול קליני' },
  ]
  return (
    <ul className="grid grid-cols-2 gap-3 pr-0! mb-0!">
      {stats.map((st) => (
        <li key={st.small} className="mb-0! rounded-2xl bg-white/10 ring-1 ring-white/20 px-3 py-5 text-center backdrop-blur-sm">
          <span className="block text-4xl font-extrabold leading-none text-white">{st.big}</span>
          {st.stars && (
            <span className="mt-2 inline-flex gap-0.5" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <svg key={i} className="w-4 h-4" viewBox="0 0 20 20" fill="#FBBF24">
                  <path d={STAR_PATH} />
                </svg>
              ))}
            </span>
          )}
          <span className="mt-2 block text-sm font-semibold text-[#9fd6f7]">{st.small}</span>
        </li>
      ))}
    </ul>
  )
}

/** Option G: the clinic logo with soft glowing rings. */
function LogoVisual() {
  return (
    <div className="relative mx-auto flex aspect-square w-64 sm:w-80 items-center justify-center">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="hero-ring absolute inset-0 rounded-full border-2 border-white/30"
          style={{ animationDelay: `${i * 1.2}s` }}
          aria-hidden="true"
        />
      ))}
      <span className="relative block h-[72%] w-[72%] rounded-full bg-white p-3 shadow-[0_0_60px_rgba(64,192,240,0.55)]">
        <span className="relative block h-full w-full">
          <Image src="/images/logo/clinic-logo.png" alt="הלוגו של פיזיותרפיה.פלוס" fill priority className="object-contain" sizes="240px" />
        </span>
      </span>
      <RatingCard className="absolute -bottom-2 right-1/2 translate-x-1/2" />
    </div>
  )
}

export default function HeroVisual({ kind }: { kind: HeroVisualKind }) {
  if (kind === 'body') return <BodyVisual />
  if (kind === 'collage') return <CollageVisual />
  if (kind === 'chips') return <ChipsVisual />
  if (kind === 'stats') return <StatsVisual />
  if (kind === 'logo') return <LogoVisual />
  return <PhotoVisual />
}
