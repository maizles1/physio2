import Image from 'next/image'
import Link from 'next/link'
import { Award, CalendarCheck, ChevronLeft, GraduationCap, MessageCircle, Star, Stethoscope, ClipboardList } from 'lucide-react'
import { GOOGLE_RATING_DISPLAY } from '@/config/google-business.config'

const NAVY = '#2A3080'
const LINK = '#1a6ea5'

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#2080C0]/10 px-3.5 py-1 text-sm font-bold" style={{ color: LINK }}>
      {children}
    </div>
  )
}

const highlights = [
  { Icon: Award, title: 'נבחרת ישראל בג׳ודו', text: 'פיזיותרפיסט הנבחרת לשעבר' },
  { Icon: GraduationCap, title: 'תואר שני (M.Sc)', text: 'בפיזיותרפיה' },
  { Icon: Star, title: `${GOOGLE_RATING_DISPLAY} בגוגל`, text: 'דירוג המטופלים בקליניקה' },
  { Icon: CalendarCheck, title: 'תור תוך 24–48 שעות', text: 'בלי המתנה של שבועות' },
]

/** White bar of four short trust points, overlapping the bottom of the hero. */
export function HomeHighlights() {
  return (
    <section className="relative z-10 -mt-12 sm:-mt-14">
      <div className="container mx-auto px-4">
        <ul className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-0! pr-0! mb-0! overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-gray-100">
          {highlights.map(({ Icon, title, text }, i) => (
            <li
              key={title}
              className={`mb-0! flex flex-col items-center gap-1.5 px-3 py-5 text-center sm:flex-row sm:items-center sm:gap-3 sm:px-5 sm:text-right border-gray-100 ${i % 2 === 0 ? 'border-l' : ''} ${i < 2 ? 'border-b lg:border-b-0' : ''} ${i < 3 ? 'lg:border-l' : 'lg:border-l-0'}`}
            >
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#2080C0]/10">
                <Icon className="h-5 w-5" style={{ color: LINK }} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-base font-bold leading-snug" style={{ color: NAVY }}>{title}</span>
                <span className="block text-xs sm:text-sm text-gray-600 leading-snug">{text}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

const painAreas = [
  { title: 'כאבי גב', href: '/services/back-pain-ashdod', image: '/images/services/back-pain/service-image.jpg' },
  { title: 'כאבי צוואר', href: '/services/neck-pain-ashdod', image: '/images/services/neck-pain/service-image.jpg' },
  { title: 'כאבי כתף', href: '/services/shoulder-pain-ashdod', image: '/images/services/shoulder-pain/service-image.jpg' },
  { title: 'כאבי ברך', href: '/services/knee-pain-ashdod', image: '/images/services/knee-pain/service-image.jpg' },
  { title: 'ורטיגו וסחרחורות', href: '/vertigo-ashdod', image: '/images/services/vestibular/service-image.png' },
  { title: 'מפרק הלסת (TMJ)', href: '/services/tmj-ashdod', image: '/images/services/tmj/service-image.png' },
  { title: 'שיקום אחרי ניתוח', href: '/services/post-surgery-ashdod', image: '/images/services/post-surgery/service-image.jpg' },
  { title: 'ביקור בית', href: '/services/home-visits-ashdod', image: '/images/services/home-visits/service-image.png' },
]

/** "What hurts?" photo tiles, each one leading to its service page. */
export function HomePainPicker() {
  return (
    <section className="py-14 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <Eyebrow>במה אני מטפל</Eyebrow>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold" style={{ color: NAVY }}>
              מה כואב לך?
            </h2>
            <p className="mt-2 text-gray-700">בחרו אזור ותקבלו הסבר על הבעיה ועל הטיפול.</p>
          </div>
          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pr-0! mb-0!">
            {painAreas.map((p) => (
              <li key={p.href} className="mb-0!">
                <Link
                  href={p.href}
                  className="group relative block aspect-[4/3] overflow-hidden rounded-2xl shadow-md ring-1 ring-gray-200"
                >
                  <Image
                    src={p.image}
                    alt={`${p.title}: פיזיותרפיה באשדוד`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-[#1b2063]/90 via-[#1b2063]/30 to-transparent" aria-hidden="true" />
                  <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-1 p-3 text-white">
                    <span className="text-base sm:text-lg font-bold leading-tight">{p.title}</span>
                    <ChevronLeft className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 text-center">
            <Link href="/services" className="font-bold underline underline-offset-4" style={{ color: LINK }}>
              לכל השירותים
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

const steps = [
  {
    Icon: MessageCircle,
    title: 'מתקשרים או כותבים',
    text: 'מספרים בכמה משפטים מה כואב ומתי זה התחיל, ומתאמים תור. בדרך כלל תוך יום או יומיים.',
  },
  {
    Icon: Stethoscope,
    title: 'אבחון במפגש הראשון',
    text: 'שיחה, בדיקה ומדידות כוח וטווחי תנועה. בסוף המפגש מסבירים לכם מה הבעיה ולמה היא נוצרה.',
  },
  {
    Icon: ClipboardList,
    title: 'תוכנית טיפול ותרגול',
    text: 'טיפול בקליניקה ותוכנית תרגילים לבית, עם יעדים ברורים. בודקים התקדמות בכל מפגש.',
  },
]

/** Three steps from first contact to a treatment plan. */
export function HomeSteps() {
  return (
    <section className="py-14 sm:py-16 bg-[#F2F8FD]">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <Eyebrow>איך זה עובד</Eyebrow>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold" style={{ color: NAVY }}>
              משיחה ראשונה לתוכנית ברורה
            </h2>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-4 pr-0! mb-0! list-none">
            {steps.map(({ Icon, title, text }, i) => (
              <li key={title} className="mb-0! relative rounded-2xl bg-white p-5 sm:p-6 shadow-sm ring-1 ring-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2A3080] to-[#2080C0] shadow-md">
                    <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm font-bold" style={{ color: LINK }}>שלב {i + 1}</span>
                    <span className="block text-lg font-bold leading-snug" style={{ color: NAVY }}>{title}</span>
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed mb-0">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
