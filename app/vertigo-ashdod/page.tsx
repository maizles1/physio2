import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
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

const CheckIcon = () => (
  <svg className="h-5 w-5 flex-shrink-0 mt-1 text-[#2080C0]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

const PhoneIcon = ({ className = 'h-5 w-5' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
)

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
            ? 'inline-flex items-center justify-center gap-2 rounded-lg bg-white px-7 py-3.5 text-base font-bold text-[#2A3080] shadow-lg hover:bg-gray-100 transition-colors'
            : 'inline-flex items-center justify-center gap-2 rounded-lg bg-[#2A3080] px-7 py-3.5 text-base font-bold text-white shadow-md hover:bg-[#1f2566] transition-colors'
        }
      >
        <PhoneIcon />
        התקשרו: {phoneNumber}
      </MeuhedetContactLink>
      <MeuhedetContactLink
        page={PAGE}
        type="whatsapp"
        href={whatsappHref}
        section={section}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-7 py-3.5 text-base font-bold text-white shadow-md hover:bg-[#1ebe57] transition-colors"
      >
        כתבו ב-WhatsApp
      </MeuhedetContactLink>
    </div>
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
        <div className="container mx-auto px-4 relative z-10 py-8 sm:py-14 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
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
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white leading-tight">
                <span className="block">החדר מסתובב?</span>{' '}
                <span className="block">טיפול בורטיגו וסחרחורות באשדוד</span>
              </h1>
              <p className="text-lg sm:text-xl text-white/95 leading-relaxed mb-6">
                פעמים רבות מדובר בבעיה מכנית באוזן הפנימית, שאפשר לאבחן בבדיקה פשוטה ולטפל בה בקליניקה, בלי
                תרופות.
              </p>
              <ContactButtons section="hero" light />
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/90">
                <li className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="#FBBF24" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  5.0 בגוגל
                </li>
                <li>אנדריי מייזלס, פיזיותרפיסט (M.Sc)</li>
                <li>אבחון וטיפול באותו מפגש</li>
              </ul>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative aspect-[16/10] lg:aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/20">
                <Image
                  src="/images/services/vestibular/service-image.png"
                  alt="אישה עם התקף ורטיגו, תחושה שהחדר מסתובב סביבה"
                  fill
                  priority
                  className="object-cover object-[80%_center]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1b2063]/70 via-transparent to-transparent" aria-hidden="true" />
                <div className="hidden sm:block absolute bottom-4 right-4 rounded-xl bg-white/95 px-4 py-2.5 shadow-lg">
                  <div className="text-sm font-bold" style={{ color: '#2A3080' }}>
                    ורטיגו מפחיד, אבל בדרך כלל ניתן לטיפול
                  </div>
                  <div className="text-xs" style={{ color: '#4b5563' }}>
                    מתחילים בבדיקה שמגלה מה גורם לו
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Short answer (for readers in a hurry and for AI/search summaries) */}
      <section className="py-10 bg-blue-50/60 border-b border-blue-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto border-r-4 border-[#2080C0] pr-5">
            <h2 className="text-lg font-bold mb-2" style={{ color: '#2A3080' }}>
              בקצרה
            </h2>
            <p className="text-gray-800 leading-relaxed">
              הסיבה השכיחה לסחרחורת סיבובית שמקורה באוזן הפנימית היא BPPV: גבישי סידן זעירים שיצאו ממקומם
              ונכנסו לאחת מתעלות שיווי המשקל (
              <a href="https://doi.org/10.1136/jnnp.2006.100420" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: '#1a6ea5' }}>
                von Brevern et al., 2007
              </a>
              ). מאבחנים אותה בבדיקת תנוחה שנקראת Dix-Hallpike, ומטפלים בתמרון שמחזיר את הגבישים למקומם, כמו
              תמרון אפלי (
              <a href="https://doi.org/10.1177/0194599816689667" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: '#1a6ea5' }}>
                Bhattacharyya et al., 2017
              </a>
              ;{' '}
              <a href="https://doi.org/10.1002/14651858.CD003162.pub3" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: '#1a6ea5' }}>
                Hilton &amp; Pinder, 2014
              </a>
              ). בפיזיותרפיה.פלוס באשדוד האבחון והטיפול נעשים באותו מפגש.
            </p>
          </div>
        </div>
      </section>

      {/* Symptoms + red flags */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-5" style={{ color: '#2A3080' }}>
                זה נשמע מוכר?
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {symptoms.map((s, i) => (
                  <li
                    key={s}
                    className={`flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/50 p-4 text-gray-800 leading-relaxed ${i === symptoms.length - 1 ? 'sm:col-span-2' : ''}`}
                  >
                    <CheckIcon />
                    {s}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-gray-700 leading-relaxed">
                אם סימנתם שניים או שלושה מאלה, יש סיכוי טוב שזה BPPV. זה מפחיד, אבל זה לא מסוכן, ובדרך כלל
                אפשר לטפל בזה מהר.
              </p>
              <div className="mt-6">
                <ContactButtons section="symptoms" />
              </div>
            </div>

            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 self-start">
              <h2 className="text-xl font-bold mb-3 text-red-800">מתי לא לחכות לתור ולפנות למיון</h2>
              <p className="text-gray-800 mb-3 leading-relaxed">
                אם יחד עם הסחרחורת מופיע אחד מהסימנים האלה, פנו מיד לחדר מיון או חייגו 101:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-gray-800">
                {redFlags.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-14 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3" style={{ color: '#2A3080' }}>
              מה קורה בטיפול
            </h2>
            <p className="text-lg text-gray-700">מהטלפון הראשון ועד שהסחרחורת מאחוריכם.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {steps.map((step) => (
              <div key={step.n} className="relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="absolute -top-4 right-6 flex h-9 w-9 items-center justify-center rounded-full bg-[#2A3080] text-white font-bold shadow-md">
                  {step.n}
                </div>
                <h3 className="mt-2 text-lg font-bold mb-2" style={{ color: '#2A3080' }}>
                  {step.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
          <p className="max-w-3xl mx-auto mt-8 text-center text-gray-700 leading-relaxed">
            לא כל סחרחורת היא BPPV. אם הבדיקה מראה שהמקור אחר, אסביר מה מצאתי ואפנה אתכם לרופא המתאים. אם
            נשאר חוסר יציבות אחרי שהורטיגו עבר, ממשיכים ב
            <Link href="/services/vestibular-ashdod" className="underline font-semibold" style={{ color: '#1a6ea5' }}>
              שיקום וסטיבולרי
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Who treats */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 items-center">
            <div className="relative h-56 w-56 mx-auto overflow-hidden rounded-2xl shadow-md">
              <Image
                src="/images/andrey-meizels.JPG"
                alt="אנדריי מייזלס, פיזיותרפיסט המטפל בורטיגו וסחרחורות באשדוד"
                fill
                className="object-cover object-top"
                sizes="224px"
                loading="lazy"
              />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: '#2A3080' }}>
                מי מטפל בכם
              </h2>
              <p className="text-gray-800 leading-relaxed mb-4">
                אני אנדריי מייזלס, פיזיותרפיסט בעל תואר שני (M.Sc) מאוניברסיטת אריאל, עם הכשרה ייעודית בשיקום
                וסטיבולרי. במטופלי ורטיגו וסחרחורת בקליניקה אני מטפל בעצמי, מהבדיקה הראשונה ועד המעקב.
              </p>
              <ul className="space-y-2 text-gray-800">
                <li className="flex items-start gap-3"><CheckIcon />אבחון עם משקפי פרנזל, שמאפשרים לראות את ריצוד העיניים בבירור</li>
                <li className="flex items-start gap-3"><CheckIcon />אבחון וטיפול באותו מפגש</li>
                <li className="flex items-start gap-3"><CheckIcon />הסבר ברור על מה שנמצא ומה עושים הלאה</li>
              </ul>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
                <Link href="/about" className="underline" style={{ color: '#1a6ea5' }}>עוד עליי</Link>
                {video && (
                  <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: '#1a6ea5' }}>
                    סרטון קצר: איך נראה טיפול בסחרחורת
                  </a>
                )}
                <Link href="/blog/vertigo-bppv-complete-guide" className="underline" style={{ color: '#1a6ea5' }}>
                  המדריך המלא על ורטיגו ו-BPPV
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Patient review */}
      {review && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <figure className="max-w-3xl mx-auto rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-3" aria-label="דירוג 5 מתוך 5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <svg key={i} className="w-5 h-5" viewBox="0 0 20 20" fill="#FBBF24" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-sm text-gray-500">ביקורת בגוגל</span>
              </div>
              <blockquote className="text-lg text-gray-800 leading-relaxed">&ldquo;{review.text}&rdquo;</blockquote>
              <figcaption className="mt-3 font-semibold text-gray-900">{review.authorName}</figcaption>
            </figure>
          </div>
        </section>
      )}

      {/* Contact + lead form */}
      <section id="contact-cta" className="py-14">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3" style={{ color: '#2A3080' }}>
                לא צריך לחכות שזה יעבור לבד
              </h2>
              <p className="text-lg text-gray-700">
                התקשרו או כתבו, ספרו מה אתם מרגישים, ונקבע תור. בהתקף ורטיגו אני משתדל לקבל אתכם באותו יום או
                למחרת.
              </p>
            </div>
            <div className="flex justify-center">
              <ContactButtons section="contact-cta" />
            </div>
            <p className="mt-4 text-center text-sm text-gray-600">
              ראשון–חמישי 08:00–20:00 · שישי 08:00–14:00 · יקינטון 3, מרכז כלניות, אשדוד
            </p>
            <div id="lead-form" className="mt-8 scroll-mt-24">
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
      <section className="py-14 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-center" style={{ color: '#2A3080' }}>
              שאלות ששואלים אותי על ורטיגו
            </h2>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <details key={faq.q} className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                  <summary className="flex cursor-pointer items-center justify-between gap-3 list-none">
                    <h3 className="text-base sm:text-lg font-bold text-[#2A3080] leading-snug">{faq.q}</h3>
                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#2080C0]/10 text-[#2080C0] transition-transform group-open:rotate-45">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
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
