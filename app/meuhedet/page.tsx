import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  Activity, Bone, CalendarCheck, ChevronLeft, CircleCheck, Clock, Dumbbell, FileCheck, Footprints, GraduationCap,
  Hand, HeartPulse, LifeBuoy, MapPin, Medal, MessageCircle, Phone, Plus, ScanSearch, ShieldCheck, Star,
  Stethoscope, TrendingUp, Zap,
} from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import MeuhedetReviewsStrip from '@/components/MeuhedetReviewsStrip'
import MeuhedetStickyCTA from '@/components/MeuhedetStickyCTA'
import MeuhedetContactLink from '@/components/MeuhedetContactLink'
import LeadForm from '@/components/LeadForm'
import TeamPhysioCard, { therapistNames } from '@/components/TeamPhysioCard'
import { manualReviews } from '@/config/manual-reviews.config'
import { getUniversitySchema, getClinicPostalAddress, getOpeningHoursSpecification, getAshdodAreaServed, clinicSchemaIds, clinicEntity, clinicGeo } from '@/config/geo.config'
import { seoConfig, getContactPhoneTel } from '@/config/seo.config'

export const metadata: Metadata = {
  title: 'פיזיותרפיה לפציעות ספורט – מאוחדת | אשדוד',
  description:
    'ספק מאוחדת רשמי לפיזיותרפיה ופציעות ספורט באשדוד. פיזיותרפיה.פלוס – אנדריי מייזלס, M.Sc, פיזיותרפיסט לשעבר של נבחרת ישראל. התקשרו או שלחו WhatsApp לקביעת תור.',
  keywords: [
    'פיזיותרפיה מאוחדת',
    'פיזיותרפיה מאוחדת אשדוד',
    'פציעות ספורט מאוחדת',
    'פיזיותרפיסט מאוחדת אשדוד',
    'ספק מאוחדת פיזיותרפיה',
    'פיזיותרפיה.פלוס אנדריי מייזלס',
    'טיפול בפציעות ספורט אשדוד',
    'שיקום ספורטאים מאוחדת',
    'פיזיותרפיה דרך קופת חולים',
  ],
  openGraph: {
    title: 'פיזיותרפיה לפציעות ספורט – מאוחדת | אשדוד | פיזיותרפיה.פלוס',
    description:
      'ספק מאוחדת לפיזיותרפיה ופציעות ספורט באשדוד. התקשרו או שלחו WhatsApp לקביעת תור – נשמח לעזור בתהליך מול מאוחדת.',
    url: 'https://physio-plus.co.il/meuhedet',
    type: 'website',
    locale: 'he_IL',
    images: [
      {
        url: 'https://physio-plus.co.il/images/andrey-meizels.JPG',
        width: 1200,
        height: 630,
        alt: 'אנדריי מייזלס – פיזיותרפיה לפציעות ספורט במסגרת מאוחדת באשדוד',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'פיזיותרפיה לפציעות ספורט – מאוחדת | אשדוד | פיזיותרפיה.פלוס',
    description:
      'ספק מאוחדת לפיזיותרפיה ופציעות ספורט באשדוד. התקשרו או שלחו WhatsApp לקביעת תור.',
    images: ['https://physio-plus.co.il/images/andrey-meizels.JPG'],
  },
  alternates: {
    canonical: 'https://physio-plus.co.il/meuhedet',
  },
  other: {
    'geo.region': 'IL',
    'geo.placename': 'אשדוד',
  },
}

const phoneNumber = seoConfig.contact.phone
const phoneTel = getContactPhoneTel()
const whatsappNumber = '972508838982'
const whatsappMessageMeuhedet = encodeURIComponent(
  'שלום, פניתי דרך הדף של מאוחדת באתר ואשמח לתיאום טיפול לפציעת ספורט'
)

const PAGE = 'meuhedet'

const injuries = [
  {
    title: 'כאבי גב תחתון ופציעות גב',
    description: 'פציעות גב הקשורות לעומסי אימון, ריצה, הרמת משקולות והליכה ממושכת.',
    href: '/services/back-pain-ashdod',
  },
  {
    title: 'פציעות ברך',
    description: 'מניסקוס, רצועות צולבות (ACL/PCL), פציעות סחוס וכאבי קדמת הברך אצל רצים.',
    href: '/services/knee-pain-ashdod',
  },
  {
    title: 'פציעות כתף',
    description: 'מסובב הכתף (Rotator Cuff), פריקות חוזרות, דלקות גידים וכאבי כתף אצל שחיינים וטניסאים.',
    href: '/services/shoulder-pain-ashdod',
  },
  {
    title: 'פציעות קרסול וכף רגל',
    description: 'נקעים, אי-יציבות כרונית, פאשייטיס פלנטריס וטיפול בפציעות חוזרות.',
    href: '/services',
  },
  {
    title: 'דלקות גידים ושרירים',
    description: 'אכילס, מרפק טניסאי, מרפק גולפאי ומשיכות שרירים בריצה ובאימוני כוח.',
    href: '/services/back-pain-ashdod',
  },
  {
    title: 'שיקום פוסט-ניתוחי',
    description:
      'החזרה הדרגתית לפעילות לאחר ניתוחי ברך, כתף וקרסול – עד חזרה מלאה לספורט.',
    href: '/services/post-surgery-ashdod',
  },
]

const clinicPhotos = [
  {
    src: '/images/carousel/clinic-1.jpg',
    alt: 'אנדריי מייזלס עם ג\'ודוקא מנבחרת ישראל אחרי זכייה במדליה',
  },
  {
    src: '/images/carousel/clinic-2.jpg',
    alt: 'אנדריי מייזלס עם ספורטאי נבחרת ישראל באליפות העולם בג\'ודו',
  },
  {
    src: '/images/carousel/clinic-5.jpg',
    alt: 'אנדריי מייזלס באליפות העולם בג\'ודו, דוחא 2023',
  },
]

const steps = [
  {
    n: 1,
    title: 'הוצאת הפניה מרופא מאוחדת',
    description:
      'מקבלים הפניה לפיזיותרפיה מהרופא במאוחדת, ובה מצוין שהפציעה אירעה במהלך פעילות ספורט.',
  },
  {
    n: 2,
    title: 'הוצאת התחייבות לקליניקה שלנו',
    description:
      'דרך הסניף של מאוחדת שבו אתם רשומים – מבקשים התחייבות לקליניקה הרשומה במאוחדת בשם "פיזיותרפיה.פלוס – אנדריי מייזלס".',
  },
  {
    n: 3,
    title: 'תיאום תור מהיר',
    description:
      'יוצרים איתנו קשר ומתאמים תור קרוב בקליניקה באשדוד בשעות שנוחות לכם.',
  },
  {
    n: 4,
    title: 'כאן בשבילכם לכל שאלה',
    description:
      'במידה ויש בעיות בתהליך מול מאוחדת או שאלות כלשהן – אל תהססו ליצור איתנו קשר ונשמח לעזור.',
  },
]

const faqs = [
  {
    q: 'האם אתם באמת ספק רשמי של מאוחדת?',
    a: 'כן. הקליניקה עובדת מול מאוחדת כספק מוכר לפיזיותרפיה, כך שניתן לקבל טיפולים במסגרת הזכאות של חברי הקופה.',
  },
  {
    q: 'מה צריך להביא לטיפול הראשון?',
    a: 'הפניה/אישור מהרופא במאוחדת לפיזיותרפיה, תעודת חבר מאוחדת ותעודת זהות. אם יש בידיכם בדיקות הדמיה (MRI/אולטרסאונד/רנטגן) או חוות דעת רפואית – מומלץ להביא גם אותם.',
  },
  {
    q: 'מה ההשתתפות העצמית בכל טיפול?',
    a: 'קיימת השתתפות עצמית. יתקבל הסבר במעמד קביעת התור.',
  },
  {
    q: 'כמה טיפולים אקבל במסגרת מאוחדת?',
    a: 'מספר הטיפולים נקבע ברובו על פי ההפניה הרפואית והפרוטוקול של מאוחדת. בפועל ברוב מקרי פציעות הספורט מקובלת סדרה ראשונית של מספר טיפולים, עם אפשרות להארכה לפי הצורך הרפואי.',
  },
  {
    q: 'אני מבוטח/ת בקופה אחרת – מה אפשרי?',
    a: 'גם אם אינכם חברי מאוחדת אפשר להגיע באופן פרטי או לבדוק מסלולי החזר דרך הביטוח המשלים בקופה שלכם. התקשרו אלינו או שלחו הודעה ב-WhatsApp ונסביר את האפשרויות.',
  },
  {
    q: 'כמה טיפולים בדרך כלל נדרשים לפציעת ספורט?',
    a: 'מספר הטיפולים תלוי בסוג הפציעה, בעומקה וביעדי השיקום. בפגישה הראשונה נבנה תוכנית מותאמת ונעדכן אתכם על צפי ההתקדמות. במסגרת מאוחדת מספר הטיפולים נקבע גם לפי ההפניה והפרוטוקול של הקופה.',
  },
  {
    q: 'האם מטפלים גם בנוער וספורטאים צעירים?',
    a: 'כן. הקליניקה מטפלת גם בנוער וספורטאים צעירים עם פציעות ספורט, בכפוף להפניה ממאוחדת ולתנאי הזכאות.',
  },
]

const injuryIcons = [Activity, Bone, Dumbbell, Footprints, Zap, HeartPulse]
const stepIcons = [Stethoscope, FileCheck, CalendarCheck, LifeBuoy]

const NAVY = '#2A3080'
const LINK = '#1a6ea5'

/** Small label above a section heading. */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#2080C0]/10 px-3.5 py-1 text-sm font-bold" style={{ color: LINK }}>
      {children}
    </div>
  )
}

function ContactButtons({
  section,
  light = false,
  phoneLabel = `התקשרו: ${phoneNumber}`,
}: {
  section: string
  light?: boolean
  phoneLabel?: string
}) {
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
        {phoneLabel}
      </MeuhedetContactLink>
      <MeuhedetContactLink
        page={PAGE}
        type="whatsapp"
        href={`https://wa.me/${whatsappNumber}?text=${whatsappMessageMeuhedet}`}
        section={section}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-7 py-3.5 text-base font-bold text-white shadow-md hover:bg-[#1ebe57] transition-colors"
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        שיחה בוואטסאפ
      </MeuhedetContactLink>
    </div>
  )
}

export default function MeuhedetPage() {
  const medicalBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['MedicalBusiness', 'LocalBusiness'],
    '@id': clinicSchemaIds.medicalBusiness,
    name: clinicEntity.brandHe,
    description:
      'קליניקת פיזיותרפיה באשדוד, ספק מוכר של מאוחדת לטיפול בפציעות ספורט ושיקום אורתופדי.',
    url: seoConfig.siteUrl,
    telephone: clinicEntity.phoneE164,
    email: seoConfig.contact.email,
    image: `${seoConfig.siteUrl}/images/andrey-meizels.JPG`,
    address: getClinicPostalAddress(),
    geo: {
      '@type': 'GeoCoordinates',
      latitude: clinicGeo.latitude,
      longitude: clinicGeo.longitude,
    },
    openingHoursSpecification: getOpeningHoursSpecification(),
    areaServed: getAshdodAreaServed(),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: String(manualReviews.length),
      bestRating: '5',
    },
    medicalSpecialty: ['Physiotherapy', 'SportsMedicine', 'PhysicalTherapy'],
    availableService: injuries.map((i) => ({
      '@type': 'MedicalProcedure',
      name: i.title,
      description: i.description,
    })),
    paymentAccepted: ['קופת חולים מאוחדת', 'מזומן', 'כרטיס אשראי'],
    isAcceptingNewPatients: true,
  }

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'אנדריי מייזלס',
    jobTitle: 'פיזיותרפיסט (M.Sc)',
    image: 'https://physio-plus.co.il/images/andrey-meizels.JPG',
    description: 'פיזיותרפיסט בעל תואר שני (M.Sc) מאוניברסיטת אריאל, לשעבר פיזיותרפיסט נבחרת ישראל בג\'ודו, ספק מאוחדת לפציעות ספורט באשדוד.',
    alumniOf: getUniversitySchema(),
    worksFor: {
      '@type': 'MedicalBusiness',
      '@id': clinicSchemaIds.medicalBusiness,
      name: clinicEntity.brandHe,
    },
    url: 'https://physio-plus.co.il/about',
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'דף בית',
        item: 'https://physio-plus.co.il',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'מאוחדת – פציעות ספורט',
        item: 'https://physio-plus.co.il/meuhedet',
      },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  }

  const highlights = [
    { Icon: ShieldCheck, title: 'ספק מוכר', text: 'של מאוחדת' },
    { Icon: Dumbbell, title: 'פציעות ספורט', text: 'שיקום וחזרה לפעילות' },
    { Icon: Medal, title: 'נבחרת ישראל לשעבר', text: 'פיזיותרפיסט (M.Sc)' },
    { Icon: Star, title: '5.0 בגוגל', text: 'דירוג המטופלים בקליניקה' },
  ]

  const firstVisit = [
    { Icon: ScanSearch, text: 'אבחון תנועה וכוח – זיהוי מגבלות וחולשות' },
    { Icon: Hand, text: 'טיפול ידני, תרגילים מותאמים וייעוץ לחזרה בטוחה לספורט' },
    { Icon: TrendingUp, text: 'מעקב התקדמות ועדכון התוכנית בכל מפגש' },
  ]

  const whatToBring = [
    'הפניה לפיזיותרפיה מרופא מאוחדת (עם ציון שהפציעה קשורה לספורט)',
    'התחייבות/אישור לקליניקה: פיזיותרפיה.פלוס – אנדריי מייזלס',
    'תעודת חבר מאוחדת ותעודת זהות',
    'בדיקות הדמיה (MRI, רנטגן, אולטרסאונד) – אם קיימות',
    'בגדי ספורט נוחים ונעליים סגורות',
  ]

  return (
    <div className="bg-white">
      {[medicalBusinessSchema, personSchema, breadcrumbSchema, faqSchema].map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      {/* Hero */}
      <section
        className="relative text-white overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1b2063 0%, #2A3080 45%, #2080C0 100%)' }}
      >
        <svg className="pointer-events-none absolute -left-40 -top-40 h-[640px] w-[640px] opacity-[0.09]" viewBox="0 0 640 640" fill="none" aria-hidden="true">
          {[300, 240, 180, 120, 60].map((r) => (
            <circle key={r} cx="320" cy="320" r={r} stroke="#ffffff" strokeWidth="2" />
          ))}
        </svg>

        <div className="container mx-auto px-4 relative z-10 pt-6 pb-20 sm:pt-12 sm:pb-24 lg:pt-14 lg:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="hidden lg:block">
                <Breadcrumbs
                  items={[
                    { label: 'דף בית', href: '/' },
                    { label: 'מאוחדת – פציעות ספורט', href: '/meuhedet' },
                  ]}
                />
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-bold text-white mb-4 ring-1 ring-white/25">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                ספק מוכר של מאוחדת
              </div>
              <h1 className="text-[2rem] sm:text-4xl lg:text-5xl font-bold mb-4 text-white leading-tight">
                פיזיותרפיה לפציעות ספורט במסגרת מאוחדת באשדוד
              </h1>
              <p className="text-lg sm:text-xl text-white/95 leading-relaxed mb-6 max-w-xl">
                אם אתם חברי <strong>מאוחדת</strong> ויש לכם פציעת ספורט – אתם בידיים טובות. הקליניקה
                היא ספק מוכר של מאוחדת ומציעה טיפול אישי, מקצועי וזמין באשדוד, על ידי פיזיותרפיסט
                בעל תואר שני שהיה פיזיותרפיסט נבחרת ישראל.
              </p>
              <ContactButtons section="hero" light phoneLabel="התקשרו לקביעת תור" />
              <p className="mt-4 text-sm text-white/85">
                נשמח לעזור גם בתהליך מול מאוחדת · שיחת ייעוץ ראשונית ללא התחייבות
              </p>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="relative aspect-[16/11] lg:aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/20">
                  <Image
                    src="/images/andrey-meizels.JPG"
                    alt="אנדריי מייזלס – פיזיותרפיסט, ספק מאוחדת לפציעות ספורט באשדוד"
                    fill
                    priority
                    className="object-cover object-[center_20%]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1b2063]/50 via-transparent to-transparent" aria-hidden="true" />
                </div>
                {/* Meuhedet badge on the image corner */}
                <div className="absolute -bottom-5 right-4 sm:right-6 flex items-center gap-3 rounded-2xl bg-white px-4 py-2.5 shadow-xl">
                  <Image
                    src="/images/insurance/Meuhedet-Logo.png"
                    alt="לוגו מאוחדת – ספק רשמי"
                    width={320}
                    height={102}
                    sizes="110px"
                    className="object-contain"
                    style={{ height: 34, width: 'auto', maxWidth: 110 }}
                  />
                  <div>
                    <div className="text-sm font-bold leading-tight" style={{ color: NAVY }}>ספק מוכר</div>
                    <div className="text-xs font-medium" style={{ color: '#4b5563' }}>של מאוחדת</div>
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

      {/* How it works */}
      <section className="py-14 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-9">
            <Eyebrow>ארבעה צעדים</Eyebrow>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3" style={{ color: NAVY }}>
              איך זה עובד?
            </h2>
            <p className="text-lg text-gray-700">
              ארבעה צעדים פשוטים מהפנייה ועד תחילת הטיפול במסגרת מאוחדת.
            </p>
          </div>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 max-w-6xl mx-auto pr-0! mb-0!">
            {steps.map((step, i) => {
              const Icon = stepIcons[i]
              return (
                <li key={step.n} className="mb-0! flex gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:flex-col lg:gap-3 lg:p-6">
                  <div className="flex flex-shrink-0 flex-col items-center gap-2 lg:flex-row lg:justify-between lg:w-full">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2A3080] to-[#2080C0] shadow-md">
                      <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </span>
                    <span className="text-3xl font-extrabold leading-none" style={{ color: '#2080C0', opacity: 0.25 }} aria-hidden="true">
                      0{step.n}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1.5" style={{ color: NAVY }}>{step.title}</h3>
                    <p className="text-gray-700 text-[0.95rem] leading-relaxed">{step.description}</p>
                  </div>
                </li>
              )
            })}
          </ol>
          <div className="mt-8 flex justify-center">
            <ContactButtons section="steps" />
          </div>
        </div>
      </section>

      {/* Who treats */}
      <section className="py-14 sm:py-16 bg-[#F2F8FD]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-8 md:gap-12 items-center">
              <div className="relative mx-auto w-full max-w-xs md:max-w-none">
                <div className="absolute -bottom-3 -left-3 h-full w-full rounded-3xl bg-[#2080C0]/15" aria-hidden="true" />
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-lg">
                  <Image
                    src={clinicPhotos[0].src}
                    alt={clinicPhotos[0].alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 320px, 400px"
                    loading="lazy"
                  />
                </div>
              </div>
              <div>
                <Eyebrow>{therapistNames()}</Eyebrow>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2" style={{ color: NAVY }}>
                  מי מטפל בכם?
                </h2>
                <p className="font-semibold mb-4" style={{ color: LINK }}>
                  מרכז כלניות, אשדוד · ספק מאוחדת רשמי
                </p>
                <h3 className="text-xl font-bold mb-1" style={{ color: NAVY }}>
                  אנדריי מייזלס
                </h3>
                <p className="text-sm font-medium mb-3" style={{ color: LINK }}>
                  פיזיותרפיסט (M.Sc) · פיזיותרפיה.פלוס – אנדריי מייזלס
                </p>
                <p className="text-gray-800 leading-relaxed mb-5">
                  פיזיותרפיסט לשעבר של נבחרת ישראל בג&apos;ודו, מתמחה בשיקום פציעות ספורט
                  וחזרה לפעילות. מטפל בחברי מאוחדת במסגרת הקופה.
                </p>
                <ul className="space-y-3 pr-0! text-gray-800">
                  {[
                    { Icon: GraduationCap, t: 'תואר שני בפיזיותרפיה, אוניברסיטת אריאל' },
                    { Icon: Medal, t: 'ניסיון רב בעבודה עם ספורטאי עילית ושיקום חזרה לפעילות' },
                    { Icon: ShieldCheck, t: 'ספק רשמי: פיזיותרפיה.פלוס – אנדריי מייזלס' },
                  ].map(({ Icon, t }) => (
                    <li key={t} className="flex items-center gap-3">
                      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                        <Icon className="h-5 w-5" style={{ color: LINK }} aria-hidden="true" />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
                <Link href="/about" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold underline" style={{ color: LINK }}>
                  עוד עליי
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
              <TeamPhysioCard />
              <div className="grid grid-cols-2 gap-4! min-h-[180px]">
                {clinicPhotos.slice(1).map((photo) => (
                  <div key={photo.src} className="relative overflow-hidden rounded-2xl shadow-md min-h-[180px]">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-6 text-center text-sm text-gray-600">
              מהעבודה עם נבחרת ישראל בג&apos;ודו, אותו סטנדרט בקליניקה באשדוד
            </p>
          </div>
        </div>
      </section>

      <MeuhedetReviewsStrip />

      {/* First visit + what to bring */}
      <section className="py-14 sm:py-16 text-white" style={{ background: 'linear-gradient(160deg, #1b2063 0%, #2A3080 100%)' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white leading-tight">
                פיזיותרפיה לפציעות ספורט באשדוד – מה מצפה לכם בביקור הראשון?
              </h2>
              <p className="text-white/90 leading-relaxed mb-6">
                בפגישה הראשונה נערוך הערכה מקיפה של הפציעה: שיחה על אופן הפציעה, בדיקה תנועתית ותכנון
                תוכנית טיפול אישית. המטרה – להבין את מקור הכאב, לשפר תפקוד ולהחזיר אתכם בהדרגה לפעילות
                הספורטיבית. חברי מאוחדת מגיעים עם הפניה ותעודת חבר, ונעזור גם בהסבר על ההשתתפות העצמית
                במעמד קביעת התור.
              </p>
              <ul className="flex flex-col gap-3 pr-0! mb-0!">
                {firstVisit.map(({ Icon, text }) => (
                  <li key={text} className="mb-0! flex items-center gap-4 rounded-2xl bg-white/10 p-4 ring-1 ring-white/15">
                    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-md">
                      <Icon className="h-5 w-5" style={{ color: NAVY }} aria-hidden="true" />
                    </span>
                    <span className="text-white leading-relaxed">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-white/10 p-6 sm:p-8 ring-1 ring-white/15">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-white">מה להביא לתור הראשון במסגרת מאוחדת?</h2>
              <p className="text-white/90 leading-relaxed mb-5">
                כדי שהטיפול יתחיל בצורה חלקה, מומלץ להגיע מוכנים עם המסמכים הבאים:
              </p>
              <ul className="flex flex-col gap-3 pr-0! mb-0!">
                {whatToBring.map((item) => (
                  <li key={item} className="mb-0! flex items-start gap-3 text-white leading-relaxed">
                    <CircleCheck className="h-5 w-5 flex-shrink-0 mt-1 text-[#7DD3FC]" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What we treat */}
      <section className="py-14 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-9">
            <Eyebrow>תחומי טיפול</Eyebrow>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3" style={{ color: NAVY }}>
              באילו פציעות ספורט אנחנו מטפלים?
            </h2>
            <p className="text-lg text-gray-700">
              חברי מאוחדת מקבלים אצלנו טיפול מותאם אישית למגוון רחב של פציעות ספורט – מפציעות חריפות
              ועד שיקום מלא לאחר ניתוח.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 max-w-6xl mx-auto">
            {injuries.map((injury, i) => {
              const Icon = injuryIcons[i]
              return (
                <article
                  key={injury.title}
                  className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow lg:flex-col lg:gap-3 lg:p-6"
                >
                  <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2A3080] to-[#2080C0] shadow-md">
                    <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold mb-1.5" style={{ color: NAVY }}>
                      <Link href={injury.href} className="hover:text-[#2080C0] transition-colors">
                        {injury.title}
                      </Link>
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed mb-2">{injury.description}</p>
                    <Link
                      href={injury.href}
                      className="text-sm font-semibold hover:underline inline-flex items-center gap-1"
                      style={{ color: LINK }}
                    >
                      לפרטים נוספים
                      <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-14 sm:py-16 bg-[#F2F8FD]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center leading-tight" style={{ color: NAVY }}>
              למה לבחור בפיזיותרפיה.פלוס לטיפול דרך מאוחדת?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {[
                'ספק מאוחדת רשמי – פיזיותרפיה.פלוס – אנדריי מייזלס',
                'פיזיותרפיסט (M.Sc) עם ניסיון בשיקום ספורטאי עילית',
                'פיזיותרפיסט לשעבר של נבחרת ישראל בג\'ודו',
                'קליניקה מקצועית במרכז כלניות, אשדוד',
                'ליווי בתהליך מול מאוחדת – מההפניה ועד תחילת הטיפול',
                'תוכנית טיפול ושיקום מותאמת אישית',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm">
                  <CircleCheck className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: LINK }} aria-hidden="true" />
                  <span className="text-gray-800 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact + lead form */}
      <section id="contact-cta" className="py-14 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div>
              <Eyebrow>קביעת תור</Eyebrow>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 leading-tight" style={{ color: NAVY }}>
                התקשרו אלינו לתיאום טיפול
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                הדרך המהירה ביותר להתחיל – שיחת טלפון קצרה או הודעה בוואטסאפ.
                נשמח לענות על כל שאלה ולהסביר את התהליך מול מאוחדת.
              </p>
              <ContactButtons section="contact-cta" />
              <ul className="mt-7 space-y-3 pr-0! text-gray-800">
                <li className="flex items-start gap-3">
                  <Clock className="h-5 w-5 flex-shrink-0 mt-1" style={{ color: LINK }} aria-hidden="true" />
                  שעות פעילות: א׳–ה׳ בשעות 08:00–20:00
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 flex-shrink-0 mt-1" style={{ color: LINK }} aria-hidden="true" />
                  יקינטון 3, מרכז כלניות, אשדוד
                </li>
                <li className="flex items-start gap-3">
                  <MessageCircle className="h-5 w-5 flex-shrink-0 mt-1" style={{ color: LINK }} aria-hidden="true" />
                  שיחת ייעוץ ראשונית ללא התחייבות
                </li>
              </ul>
            </div>
            <div id="lead-form" className="scroll-mt-24">
              <LeadForm
                source="meuhedet"
                defaultArea="פציעת ספורט"
                subtitle="השאירו שם וטלפון ונחזור אליכם לתיאום טיפול במסגרת מאוחדת."
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3" style={{ color: NAVY }}>
                שאלות נפוצות – פיזיותרפיה במאוחדת
              </h2>
              <p className="text-lg text-gray-700">
                כל מה שחשוב לדעת על פיזיותרפיה לפציעות ספורט במסגרת קופת חולים מאוחדת.
              </p>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <details
                  key={idx}
                  className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm open:shadow-md transition-shadow"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-3 list-none">
                    <h3 className="text-base sm:text-lg font-bold text-[#2A3080] leading-snug">
                      {faq.q}
                    </h3>
                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#2080C0]/10 text-[#2080C0] transition-transform group-open:rotate-45">
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </summary>
                  <p className="mt-3 text-gray-700 leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-gray-600">
              לא מצאתם תשובה? <Link href="/faq" className="text-[#2080C0] font-semibold hover:underline">שאלות נפוצות כלליות</Link>{' '}
              או{' '}
              <a href={`tel:${phoneTel}`} className="text-[#2080C0] font-semibold hover:underline">
                התקשרו אלינו ישירות
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA band */}
      <section
        className="text-white py-14"
        style={{ background: 'linear-gradient(to bottom right, #2A3080, #2080C0, #40C0F0)' }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
              מוכנים להתחיל את השיקום?
            </h2>
            <p className="text-base sm:text-lg text-white/95 mb-7">
              חברי מאוחדת – חזרו לפעילות מהר ובבטחה. צוות הקליניקה כאן בשבילכם.
            </p>
            <div className="flex justify-center">
              <ContactButtons section="bottom-cta" light phoneLabel={phoneNumber} />
            </div>
          </div>
        </div>
      </section>

      <MeuhedetStickyCTA />
    </div>
  )
}
