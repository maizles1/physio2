import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowUpFromLine, BedDouble, CalendarCheck, Car, CircleCheck, Clock, Glasses, MapPin, MessageCircle, Phone,
  PhoneCall, Plus, Quote, RotateCcw, ShieldCheck, Star, Stethoscope, Sunrise, Timer, TriangleAlert, Waves,
} from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import MeuhedetReviewsStrip from '@/components/MeuhedetReviewsStrip'
import MeuhedetStickyCTA from '@/components/MeuhedetStickyCTA'
import MeuhedetContactLink from '@/components/MeuhedetContactLink'
import LeadForm from '@/components/LeadForm'
import { manualReviews } from '@/config/manual-reviews.config'
import { videosConfig } from '@/config/videos.config'
import {
  getUniversitySchema,
  getClinicPostalAddress,
  getOpeningHoursSpecification,
  getAshdodAreaServed,
  clinicSchemaIds,
  clinicEntity,
  clinicGeo,
} from '@/config/geo.config'
import { seoConfig, getContactPhoneTel } from '@/config/seo.config'

const PAGE = 'vertigo'
const PAGE_URL = 'https://physio-plus.co.il/vertigo-ashdod'
const WHATSAPP_TEXT = 'שלום, יש לי סחרחורת / ורטיגו ואשמח לקבוע תור'

export const metadata: Metadata = {
  title: 'טיפול בורטיגו וסחרחורות באשדוד | תור מהיר',
  description:
    'סחרחורת סיבובית כשמסתובבים במיטה או קמים? אבחון וטיפול בורטיגו (BPPV) באשדוד אצל אנדריי מייזלס, M.Sc. בהתקף משתדלים לקבוע תור לאותו יום או למחרת.',
  keywords: [
    'טיפול בורטיגו אשדוד',
    'ורטיגו אשדוד',
    'טיפול בסחרחורות אשדוד',
    'BPPV אשדוד',
    'תמרון אפלי אשדוד',
    'סחרחורת סיבובית טיפול',
    'פיזיותרפיה וסטיבולרית אשדוד',
    'שיקום וסטיבולרי אשדוד',
  ],
  openGraph: {
    title: 'טיפול בורטיגו וסחרחורות באשדוד | פיזיותרפיה.פלוס',
    description:
      'אבחון וטיפול בורטיגו (BPPV) באשדוד. בהתקף משתדלים לקבוע תור לאותו יום או למחרת. התקשרו או שלחו WhatsApp.',
    url: PAGE_URL,
    type: 'website',
    locale: 'he_IL',
    images: [
      {
        url: 'https://physio-plus.co.il/images/andrey-meizels.JPG',
        width: 1200,
        height: 630,
        alt: 'אנדריי מייזלס, פיזיותרפיסט – טיפול בורטיגו וסחרחורות באשדוד',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'טיפול בורטיגו וסחרחורות באשדוד | פיזיותרפיה.פלוס',
    description: 'אבחון וטיפול בורטיגו (BPPV) באשדוד. תור מהיר בהתקף.',
    images: ['https://physio-plus.co.il/images/andrey-meizels.JPG'],
  },
  alternates: { canonical: PAGE_URL },
  other: { 'geo.region': 'IL', 'geo.placename': 'אשדוד' },
}

const phoneNumber = seoConfig.contact.phone
const phoneTel = getContactPhoneTel()
const whatsappHref = `https://wa.me/972508838982?text=${encodeURIComponent(WHATSAPP_TEXT)}`

const symptoms = [
  'החדר מסתובב כשאתם מסתובבים מצד לצד במיטה',
  'סחרחורת חזקה כשקמים בבוקר או נשכבים',
  'סיבוב כשמרימים את הראש למדף גבוה או מתכופפים לשרוך נעל',
  'כל התקף קצר, בדרך כלל פחות מדקה, אבל חוזר שוב ושוב',
  'בחילה, ולפעמים חוסר יציבות בהליכה גם בין ההתקפים',
]

const redFlags = [
  'חולשה או נימול ביד, ברגל או בפנים',
  'קושי בדיבור או בבליעה',
  'ראייה כפולה',
  'ירידה פתאומית בשמיעה',
  'כאב ראש חזק שלא הכרתם קודם',
  'סחרחורת רצופה של שעות שלא נרגעת גם כשלא זזים',
]

const steps = [
  {
    n: 1,
    title: 'מתקשרים או כותבים',
    description:
      'מספרים לי בכמה משפטים מה קורה ומתי זה התחיל. בהתקף ורטיגו אני משתדל למצוא תור לאותו יום או למחרת.',
  },
  {
    n: 2,
    title: 'בודקים מה גורם לסחרחורת',
    description:
      'שיחה קצרה ואחריה בדיקות תנוחה. אני מסתכל על תנועות העיניים דרך משקפי פרנזל, כי הכיוון של ריצוד העיניים מראה איזו תעלה באוזן מעורבת.',
  },
  {
    n: 3,
    title: 'מטפלים באותו מפגש',
    description:
      'אם זה BPPV, מבצעים במקום תמרון שמתאים לתעלה שנמצאה. התמרון עצמו לוקח כמה דקות.',
  },
  {
    n: 4,
    title: 'מוודאים שזה עבר',
    description:
      'בדיקה חוזרת אחרי כמה ימים, ואם נשאר חוסר יציבות מוסיפים תרגילי שיווי משקל לבית.',
  },
]

const faqs = [
  {
    q: 'כמה טיפולים צריך לורטיגו?',
    a: 'ב-BPPV, הסוג השכיח של ורטיגו תנוחתי, לרוב מספיקים מפגש אחד עד שלושה. כשהסחרחורת נובעת מסיבה אחרת, למשל אחרי דלקת בעצב שיווי המשקל, השיקום ארוך יותר ונשען על תרגול קבוע בבית. אחרי הבדיקה הראשונה אגיד לכם למה לצפות.',
  },
  {
    q: 'האם הטיפול עצמו גורם לסחרחורת?',
    a: 'כן, לזמן קצר. כדי לאבחן ולטפל צריך להביא את הראש לתנוחה שמעוררת את הסחרחורת, והיא נמשכת בדרך כלל פחות מדקה. אני מסביר כל שלב לפני שעושים אותו, ומתקדמים בקצב שלכם.',
  },
  {
    q: 'צריך הפניה מרופא או בדיקות לפני שמגיעים?',
    a: 'לטיפול פרטי לא צריך הפניה. אם כבר נבדקתם אצל רופא משפחה או אף-אוזן-גרון, או שיש לכם בדיקת שמיעה או הדמיה, תביאו את המסמכים.',
  },
  {
    q: 'מה ההבדל בין ורטיגו לסחרחורת?',
    a: 'ורטיגו הוא תחושה שאתם או החדר מסתובבים. סחרחורת היא מילה רחבה יותר, שכוללת גם ערפול, חוסר יציבות או תחושה שעומדים להתעלף. ההבחנה חשובה כי לכל אחד מהם יש סיבות אחרות וטיפול אחר.',
  },
  {
    q: 'אפשר לעשות את תמרון אפלי לבד בבית?',
    a: 'אפשר, אבל רק אחרי שיודעים באיזו אוזן ובאיזו תעלה הבעיה. תמרון לצד הלא נכון או לתעלה הלא נכונה לא יעזור, ולפעמים מעביר את הגבישים לתעלה אחרת. לכן אני מעדיף לאבחן קודם, ואם צריך ללמד אתכם תרגיל שמתאים בדיוק לכם.',
  },
  {
    q: 'הורטיגו יכול לחזור?',
    a: 'כן. אצל חלק מהאנשים BPPV חוזר אחרי חודשים או שנים. אם זה קורה, מזהים את זה מהר ומטפלים באותה דרך.',
  },
  {
    q: 'איך להגיע לטיפול כשיש סחרחורת?',
    a: 'עדיף לא לנהוג בעצמכם בזמן התקף. בקשו ממישהו להסיע אתכם. הקליניקה נמצאת ביקינטון 3, מרכז כלניות, אשדוד, עם חניה סמוכה.',
  },
]

const symptomIcons = [BedDouble, Sunrise, ArrowUpFromLine, Timer, Waves]
const stepIcons = [PhoneCall, Glasses, RotateCcw, ShieldCheck]

const NAVY = '#2A3080'
const LINK = '#1a6ea5'

const STAR_PATH =
  'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'

function Stars({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <span className="inline-flex gap-0.5" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} className={className} viewBox="0 0 20 20" fill="#FBBF24">
          <path d={STAR_PATH} />
        </svg>
      ))}
    </span>
  )
}

/** Small label above a section heading. */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#2080C0]/10 px-3.5 py-1 text-sm font-bold" style={{ color: LINK }}>
      {children}
    </div>
  )
}

function ContactButtons({ section, light = false }: { section: string; light?: boolean }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <MeuhedetContactLink
        page={PAGE}
        type="phone"
        href={`tel:${phoneTel}`}
        section={section}
        className={
          light
            ? 'inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-base font-bold text-[#2A3080] shadow-lg hover:bg-gray-100 transition-colors'
            : 'inline-flex items-center justify-center gap-2 rounded-xl bg-[#2A3080] px-7 py-3.5 text-base font-bold text-white shadow-md hover:bg-[#1f2566] transition-colors'
        }
      >
        <Phone className="h-5 w-5" aria-hidden="true" />
        התקשרו: {phoneNumber}
      </MeuhedetContactLink>
      <MeuhedetContactLink
        page={PAGE}
        type="whatsapp"
        href={whatsappHref}
        section={section}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-7 py-3.5 text-base font-bold text-white shadow-md hover:bg-[#1ebe57] transition-colors"
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        כתבו ב-WhatsApp
      </MeuhedetContactLink>
    </div>
  )
}

/** Schematic inner ear: three balance canals, with crystals that drifted into one of them. */
function InnerEarIllustration() {
  const canal = { fill: 'none', strokeLinecap: 'round' as const }
  return (
    <svg viewBox="0 0 420 340" className="w-full h-auto" role="img" aria-label="איור של האוזן הפנימית: גבישי סידן שנדדו לאחת מתעלות שיווי המשקל">
      <circle cx="210" cy="170" r="160" fill="#ffffff" />
      <circle cx="210" cy="170" r="160" fill="none" stroke="#2080C0" strokeOpacity="0.15" strokeWidth="2" strokeDasharray="4 8" />

      {/* Canals: outer wall, then the fluid inside */}
      {[
        'M168 196 C 60 190, 70 50, 196 176',
        'M214 172 C 190 30, 340 40, 250 182',
        'M262 206 C 380 170, 384 292, 256 238',
      ].map((d) => (
        <g key={d}>
          <path d={d} {...canal} stroke="#2A3080" strokeWidth="26" />
          <path d={d} {...canal} stroke="#CFE6F7" strokeWidth="19" />
        </g>
      ))}

      {/* Vestibule (where the crystals belong) and cochlea */}
      <ellipse cx="214" cy="212" rx="62" ry="44" fill="#CFE6F7" stroke="#2A3080" strokeWidth="3.5" />
      <path
        d="M168 236 C 110 236, 92 300, 140 308 C 182 314, 190 264, 156 262 C 132 262, 130 290, 150 290"
        fill="none"
        stroke="#2A3080"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Crystals at home */}
      {[
        [200, 214], [212, 206], [224, 216], [210, 224], [234, 208], [222, 228], [196, 226],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="4.2" fill="#2080C0" />
      ))}

      {/* Crystals that drifted into the canal */}
      <g className="vertigo-crystals">
        {[
          [103, 128], [112, 117], [98, 141], [120, 108], [108, 104],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="4.6" fill="#F59E0B" stroke="#ffffff" strokeWidth="1.2" />
        ))}
      </g>
      <circle cx="108" cy="122" r="34" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="5 6" />
    </svg>
  )
}

export default function VertigoPage() {
  const review = manualReviews.find((r) => r.id === 'review-3')
  const video = videosConfig.find((v) => v.title === 'טיפול בסחרחורות')

  const medicalBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['MedicalBusiness', 'LocalBusiness'],
    '@id': clinicSchemaIds.medicalBusiness,
    name: clinicEntity.brandHe,
    url: seoConfig.siteUrl,
    telephone: clinicEntity.phoneE164,
    email: seoConfig.contact.email,
    image: `${seoConfig.siteUrl}/images/andrey-meizels.JPG`,
    address: getClinicPostalAddress(),
    geo: { '@type': 'GeoCoordinates', latitude: clinicGeo.latitude, longitude: clinicGeo.longitude },
    openingHoursSpecification: getOpeningHoursSpecification(),
    areaServed: getAshdodAreaServed(),
    medicalSpecialty: ['Physiotherapy', 'PhysicalTherapy'],
    isAcceptingNewPatients: true,
  }

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    '@id': `${PAGE_URL}#webpage`,
    url: PAGE_URL,
    name: 'טיפול בורטיגו וסחרחורות באשדוד',
    inLanguage: 'he-IL',
    about: {
      '@type': 'MedicalCondition',
      name: 'ורטיגו תנוחתי התקפי שפיר (BPPV)',
      alternateName: ['Benign paroxysmal positional vertigo', 'ורטיגו', 'סחרחורת סיבובית'],
      possibleTreatment: {
        '@type': 'MedicalTherapy',
        name: 'תמרוני החזרת גבישים (Epley ואחרים) ושיקום וסטיבולרי',
      },
    },
    author: { '@type': 'Person', name: 'אנדריי מייזלס', jobTitle: 'פיזיותרפיסט (M.Sc)' },
    publisher: { '@id': clinicSchemaIds.medicalBusiness },
    citation: [
      'https://doi.org/10.1177/0194599816689667',
      'https://doi.org/10.1002/14651858.CD003162.pub3',
      'https://doi.org/10.1136/jnnp.2006.100420',
    ],
  }

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'אנדריי מייזלס',
    jobTitle: 'פיזיותרפיסט (M.Sc)',
    image: 'https://physio-plus.co.il/images/andrey-meizels.JPG',
    alumniOf: getUniversitySchema(),
    worksFor: { '@type': 'MedicalBusiness', '@id': clinicSchemaIds.medicalBusiness, name: clinicEntity.brandHe },
    knowsAbout: ['Vestibular rehabilitation', 'BPPV', 'Vertigo'],
    url: 'https://physio-plus.co.il/about',
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'דף בית', item: 'https://physio-plus.co.il' },
      { '@type': 'ListItem', position: 2, name: 'טיפול בורטיגו וסחרחורות', item: PAGE_URL },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const highlights = [
    { Icon: CalendarCheck, title: 'אותו יום או למחרת', text: 'תור בזמן התקף ורטיגו' },
    { Icon: Stethoscope, title: 'אבחון וטיפול יחד', text: 'באותו מפגש, בלי לחכות' },
    { Icon: RotateCcw, title: '1 עד 3 מפגשים', text: 'מספיקים לרוב ב-BPPV' },
    { Icon: Star, title: '5.0 בגוגל', text: 'דירוג המטופלים בקליניקה' },
  ]

  return (
    <div className="bg-white">
      {[medicalBusinessSchema, webPageSchema, personSchema, breadcrumbSchema, faqSchema].map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      {/* Hero */}
      <section
        className="relative text-white overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1b2063 0%, #2A3080 45%, #2080C0 100%)' }}
      >
        {/* Soft rings behind the content, echoing the spinning feeling */}
        <svg className="pointer-events-none absolute -left-40 -top-40 h-[640px] w-[640px] opacity-[0.09]" viewBox="0 0 640 640" fill="none" aria-hidden="true">
          {[300, 240, 180, 120, 60].map((r) => (
            <circle key={r} cx="320" cy="320" r={r} stroke="#ffffff" strokeWidth="2" />
          ))}
        </svg>

        <div className="container mx-auto px-4 relative z-10 pt-6 pb-20 sm:pt-12 sm:pb-24 lg:pt-14 lg:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="hidden lg:block">
                <Breadcrumbs
                  items={[
                    { label: 'דף בית', href: '/' },
                    { label: 'טיפול בורטיגו וסחרחורות', href: '/vertigo-ashdod' },
                  ]}
                />
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-1.5 text-sm font-bold text-white mb-4 shadow-md">
                <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
                </span>
                בהתקף ורטיגו: תור לאותו יום או למחרת
              </div>
              <h1 className="text-[2rem] sm:text-4xl lg:text-5xl font-bold mb-4 text-white leading-tight">
                <span className="block">החדר מסתובב?</span>{' '}
                <span className="block">טיפול בורטיגו וסחרחורות באשדוד</span>
              </h1>
              <p className="text-lg sm:text-xl text-white/95 leading-relaxed mb-6 max-w-xl">
                פעמים רבות מדובר בבעיה מכנית באוזן הפנימית, שאפשר לאבחן בבדיקה פשוטה ולטפל בה בקליניקה, בלי
                תרופות.
              </p>
              <ContactButtons section="hero" light />
              <p className="mt-4 text-sm text-white/85">
                עונה לכם אנדריי מייזלס, פיזיותרפיסט (M.Sc). לא צריך הפניה.
              </p>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="relative aspect-[16/10] lg:aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/20">
                  <Image
                    src="/images/services/vestibular/service-image.png"
                    alt="אישה עם התקף ורטיגו, תחושה שהחדר מסתובב סביבה"
                    fill
                    priority
                    className="object-cover object-[80%_center]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1b2063]/60 via-transparent to-transparent" aria-hidden="true" />
                </div>
                {/* Rating card on the image corner */}
                <div className="absolute -bottom-4 right-4 sm:right-6 flex items-center gap-3 rounded-2xl bg-white px-4 py-2.5 shadow-xl">
                  <div className="text-2xl font-extrabold leading-none" style={{ color: NAVY }}>5.0</div>
                  <div>
                    <Stars className="w-4 h-4" />
                    <div className="text-xs font-medium" style={{ color: '#4b5563' }}>ביקורות מטופלים בגוגל</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights bar, overlapping the hero */}
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

      {/* Symptoms */}
      <section className="py-14 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <Eyebrow>בדיקה עצמית קצרה</Eyebrow>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold" style={{ color: NAVY }}>
                זה נשמע מוכר?
              </h2>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 pr-0! mb-0!">
              {symptoms.map((s, i) => {
                const Icon = symptomIcons[i]
                return (
                  <li
                    key={s}
                    className="mb-0! flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm lg:flex-col lg:items-start lg:gap-3 lg:p-6"
                  >
                    <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2A3080] to-[#2080C0] shadow-md">
                      <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </span>
                    <span className="text-gray-800 leading-relaxed">{s}</span>
                  </li>
                )
              })}
              <li className="mb-0! flex flex-col justify-center rounded-2xl bg-[#EAF4FC] p-5 lg:p-6">
                <span className="block text-lg font-bold mb-1" style={{ color: NAVY }}>
                  סימנתם שניים או שלושה?
                </span>
                <span className="block text-gray-800 leading-relaxed">
                  יש סיכוי טוב שזה BPPV. זה מפחיד, אבל זה לא מסוכן, ובדרך כלל אפשר לטפל בזה מהר.
                </span>
              </li>
            </ul>
            <div className="mt-8 flex justify-center">
              <ContactButtons section="symptoms" />
            </div>
          </div>
        </div>
      </section>

      {/* What happens in the ear: short cited answer (also for AI/search summaries) + illustration */}
      <section className="py-14 sm:py-16 bg-[#F2F8FD]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="max-w-sm mx-auto w-full lg:max-w-none">
              <InnerEarIllustration />
              <ul className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 pr-0! mb-0! text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#2080C0]" aria-hidden="true" />
                  גבישים במקומם
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#F59E0B]" aria-hidden="true" />
                  גבישים שנדדו לתעלה
                </li>
              </ul>
            </div>
            <div>
              <Eyebrow>בקצרה</Eyebrow>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight" style={{ color: NAVY }}>
                למה החדר מסתובב
              </h2>
              <p className="text-gray-800 leading-relaxed text-[1.05rem]">
                הסיבה השכיחה לסחרחורת סיבובית שמקורה באוזן הפנימית היא BPPV: גבישי סידן זעירים שיצאו ממקומם
                ונכנסו לאחת מתעלות שיווי המשקל (
                <a href="https://doi.org/10.1136/jnnp.2006.100420" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: LINK }}>
                  von Brevern et al., 2007
                </a>
                ). מאבחנים אותה בבדיקת תנוחה שנקראת Dix-Hallpike, ומטפלים בתמרון שמחזיר את הגבישים למקומם, כמו
                תמרון אפלי (
                <a href="https://doi.org/10.1177/0194599816689667" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: LINK }}>
                  Bhattacharyya et al., 2017
                </a>
                ;{' '}
                <a href="https://doi.org/10.1002/14651858.CD003162.pub3" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: LINK }}>
                  Hilton &amp; Pinder, 2014
                </a>
                ). בפיזיותרפיה.פלוס באשדוד האבחון והטיפול נעשים באותו מפגש.
              </p>
              <ul className="mt-5 space-y-2.5 pr-0! text-gray-800">
                {[
                  'כל תזוזה של הראש מזיזה את הגבישים, והמוח מקבל אות שגוי של סיבוב.',
                  'לכן ההתקף קצר, ומופיע דווקא כשמשנים תנוחה.',
                  'התמרון מוביל את הגבישים בחזרה למקומם, בלי תרופות ובלי מכשירים.',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <CircleCheck className="h-5 w-5 flex-shrink-0 mt-1" style={{ color: LINK }} aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Red flags */}
      <section className="py-10 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto rounded-2xl border border-red-200 bg-red-50 p-5 sm:p-7">
            <div className="flex items-start gap-4">
              <span className="hidden sm:flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                <TriangleAlert className="h-6 w-6 text-red-700" aria-hidden="true" />
              </span>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl font-bold mb-2 text-red-800">מתי לא לחכות לתור ולפנות למיון</h2>
                <p className="text-gray-800 mb-4 leading-relaxed">
                  אם יחד עם הסחרחורת מופיע אחד מהסימנים האלה, פנו מיד לחדר מיון או חייגו 101:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1! pr-0! mb-0! text-gray-800">
                  {redFlags.map((f) => (
                    <li key={f} className="mb-0! flex items-start gap-2">
                      <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-600" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-14 sm:py-16 text-white" style={{ background: 'linear-gradient(160deg, #1b2063 0%, #2A3080 100%)' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-white">מה קורה בטיפול</h2>
            <p className="text-lg text-white/90">מהטלפון הראשון ועד שהסחרחורת מאחוריכם.</p>
          </div>
          <ol className="relative grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-5 max-w-6xl mx-auto pr-0! mb-0!">
            {steps.map((step, i) => {
              const Icon = stepIcons[i]
              return (
                <li key={step.n} className="mb-0! relative flex gap-4 rounded-2xl bg-white/10 p-5 ring-1 ring-white/15 lg:flex-col lg:gap-3 lg:p-6">
                  <div className="flex flex-shrink-0 flex-col items-center gap-2 lg:flex-row lg:justify-between lg:w-full">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md">
                      <Icon className="h-6 w-6" style={{ color: NAVY }} aria-hidden="true" />
                    </span>
                    <span className="text-3xl font-extrabold leading-none text-white/30" aria-hidden="true">
                      0{step.n}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1.5 text-white">{step.title}</h3>
                    <p className="text-white/90 text-[0.95rem] leading-relaxed">{step.description}</p>
                  </div>
                </li>
              )
            })}
          </ol>
          <p className="max-w-3xl mx-auto mt-8 text-center text-white/90 leading-relaxed">
            לא כל סחרחורת היא BPPV. אם הבדיקה מראה שהמקור אחר, אסביר מה מצאתי ואפנה אתכם לרופא המתאים. אם
            נשאר חוסר יציבות אחרי שהורטיגו עבר, ממשיכים בשיקום
            וסטיבולרי: תרגילי שיווי משקל וייצוב מבט.
          </p>
        </div>
      </section>

      {/* Who treats */}
      <section className="py-14 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-8 md:gap-12 items-center">
            <div className="relative mx-auto w-full max-w-xs md:max-w-none">
              <div className="absolute -bottom-3 -left-3 h-full w-full rounded-3xl bg-[#2080C0]/15" aria-hidden="true" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-lg">
                <Image
                  src="/images/andrey-meizels.JPG"
                  alt="אנדריי מייזלס, פיזיותרפיסט המטפל בורטיגו וסחרחורות באשדוד"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 320px, 400px"
                  loading="lazy"
                />
              </div>
            </div>
            <div>
              <Eyebrow>מי מטפל בכם</Eyebrow>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2" style={{ color: NAVY }}>
                אנדריי מייזלס
              </h2>
              <p className="font-semibold mb-4" style={{ color: LINK }}>
                פיזיותרפיסט (M.Sc) · הכשרה ייעודית בשיקום וסטיבולרי
              </p>
              <p className="text-gray-800 leading-relaxed mb-5">
                אני פיזיותרפיסט בעל תואר שני מאוניברסיטת אריאל. במטופלי ורטיגו וסחרחורת בקליניקה אני מטפל
                בעצמי, מהבדיקה הראשונה ועד המעקב.
              </p>
              <ul className="space-y-3 pr-0! text-gray-800">
                {[
                  { Icon: Glasses, t: 'אבחון עם משקפי פרנזל, שמאפשרים לראות את ריצוד העיניים בבירור' },
                  { Icon: Stethoscope, t: 'אבחון וטיפול באותו מפגש' },
                  { Icon: MessageCircle, t: 'הסבר ברור על מה שנמצא ומה עושים הלאה' },
                ].map(({ Icon, t }) => (
                  <li key={t} className="flex items-center gap-3">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#2080C0]/10">
                      <Icon className="h-5 w-5" style={{ color: LINK }} aria-hidden="true" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
                <Link href="/about" className="underline" style={{ color: LINK }}>עוד עליי</Link>
                {video && (
                  <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: LINK }}>
                    סרטון קצר: איך נראה טיפול בסחרחורת
                  </a>
                )}
                <Link href="/blog/vertigo-bppv-complete-guide" className="underline" style={{ color: LINK }}>
                  המדריך המלא על ורטיגו ו-BPPV
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Patient review */}
      {review && (
        <section className="pb-14 sm:pb-16">
          <div className="container mx-auto px-4">
            <figure className="relative max-w-4xl mx-auto overflow-hidden rounded-3xl bg-[#F2F8FD] p-7 sm:p-10">
              <Quote className="absolute left-5 top-5 h-16 w-16 sm:h-24 sm:w-24" style={{ color: '#2080C0', opacity: 0.12 }} aria-hidden="true" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4" aria-label="דירוג 5 מתוך 5">
                  <Stars />
                  <span className="text-sm text-gray-600">ביקורת בגוגל, אחרי התקף ורטיגו</span>
                </div>
                <blockquote className="text-lg sm:text-xl text-gray-900 leading-relaxed">&ldquo;{review.text}&rdquo;</blockquote>
                <figcaption className="mt-4 font-bold" style={{ color: NAVY }}>{review.authorName}</figcaption>
              </div>
            </figure>
          </div>
        </section>
      )}

      {/* Contact + lead form */}
      <section id="contact-cta" className="py-14 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div>
              <Eyebrow>קביעת תור</Eyebrow>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 leading-tight" style={{ color: NAVY }}>
                לא צריך לחכות שזה יעבור לבד
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                התקשרו או כתבו, ספרו מה אתם מרגישים, ונקבע תור. בהתקף ורטיגו אני משתדל לקבל אתכם באותו יום או
                למחרת.
              </p>
              <ContactButtons section="contact-cta" />
              <ul className="mt-7 space-y-3 pr-0! text-gray-800">
                <li className="flex items-start gap-3">
                  <Clock className="h-5 w-5 flex-shrink-0 mt-1" style={{ color: LINK }} aria-hidden="true" />
                  ראשון–חמישי 08:00–20:00 · שישי 08:00–14:00
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 flex-shrink-0 mt-1" style={{ color: LINK }} aria-hidden="true" />
                  יקינטון 3, מרכז כלניות, אשדוד
                </li>
                <li className="flex items-start gap-3">
                  <Car className="h-5 w-5 flex-shrink-0 mt-1" style={{ color: LINK }} aria-hidden="true" />
                  בזמן התקף עדיף שמישהו יסיע אתכם
                </li>
              </ul>
            </div>
            <div id="lead-form" className="scroll-mt-24">
              <LeadForm
                source="vertigo"
                defaultArea="סחרחורות / ורטיגו"
                subtitle="קשה לדבר עכשיו? השאירו שם וטלפון ואחזור אליכם לקבוע תור."
              />
            </div>
          </div>
        </div>
      </section>

      <MeuhedetReviewsStrip />

      {/* FAQ */}
      <section className="py-14 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-center" style={{ color: NAVY }}>
              שאלות ששואלים אותי על ורטיגו
            </h2>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <details key={faq.q} className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                  <summary className="flex cursor-pointer items-center justify-between gap-3 list-none">
                    <h3 className="text-base sm:text-lg font-bold text-[#2A3080] leading-snug">{faq.q}</h3>
                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#2080C0]/10 text-[#2080C0] transition-transform group-open:rotate-45">
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </summary>
                  <p className="mt-3 text-gray-700 leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        className="text-white py-14"
        style={{ background: 'linear-gradient(to bottom right, #2A3080, #2080C0, #40C0F0)' }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">יש לכם סחרחורת עכשיו?</h2>
            <p className="text-base sm:text-lg text-white/95 mb-7">
              שיחה של שתי דקות מספיקה כדי להבין אם כדאי להגיע, ומתי.
            </p>
            <div className="flex justify-center">
              <ContactButtons section="bottom-cta" light />
            </div>
          </div>
        </div>
      </section>

      <MeuhedetStickyCTA page={PAGE} whatsappText={WHATSAPP_TEXT} />
    </div>
  )
}
