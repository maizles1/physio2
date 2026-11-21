import Image from 'next/image'
import { GOOGLE_RATING_DISPLAY } from '@/config/google-business.config'

export type HeroVisualKind = 'photo' | 'body' | 'collage'

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

export default function HeroVisual({ kind }: { kind: HeroVisualKind }) {
  if (kind === 'body') return <BodyVisual />
  if (kind === 'collage') return <CollageVisual />
  return <PhotoVisual />
}
