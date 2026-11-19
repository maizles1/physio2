import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  Activity, Bone, CalendarCheck, ChevronLeft, CircleCheck, Clock, Dumbbell, ExternalLink, FileCheck, GraduationCap,
  Hand, HeartPulse, House, LifeBuoy, MapPin, Medal, MessageCircle, Phone, PhoneCall, Plus, ScanSearch,
  ShieldCheck, Star, TrendingUp, Waves,
} from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import MeuhedetReviewsStrip from '@/components/MeuhedetReviewsStrip'
import MeuhedetStickyCTA from '@/components/MeuhedetStickyCTA'
import MeuhedetContactLink from '@/components/MeuhedetContactLink'
import LeadForm from '@/components/LeadForm'
import { manualReviews } from '@/config/manual-reviews.config'
import { getUniversitySchema, getClinicPostalAddress, getOpeningHoursSpecification, getAshdodAreaServed, clinicSchemaIds, clinicEntity, clinicGeo } from '@/config/geo.config'
import { seoConfig, getContactPhoneTel } from '@/config/seo.config'
import TeamPhysioCard, { therapistNames } from '@/components/TeamPhysioCard'

export const metadata: Metadata = {
  title: 'פיזיותרפיה לזכאי משרד הביטחון | אשדוד',
  description:
    'ספק מוכר של משרד הביטחון לפיזיותרפיה באשדוד. פיזיותרפיה.פלוס – אנדריי מייזלס, M.Sc. טיפול אישי לזכאים, ליווי בתהליך ותור מהיר. התקשרו או שלחו WhatsApp.',
  keywords: [
    'פיזיותרפיה משרד הביטחון',
    'פיזיותרפיה משרד הביטחון אשדוד',
    'פיזיותרפיסט ספק משרד הביטחון',
    'פיזיותרפיה נכי משרד הביטחון',
    'פיזיותרפיה נכי משרד הביטחון אשדוד',
    'התחייבות פיזיותרפיה אגף השיקום',
    'פיזיותרפיה.פלוס אנדריי מייזלס',
  ],
  openGraph: {
    title: 'פיזיותרפיה לזכאי משרד הביטחון | אשדוד | פיזיותרפיה.פלוס',
    description:
      'ספק מוכר של משרד הביטחון לפיזיותרפיה באשדוד. התקשרו או שלחו WhatsApp – נשמח לעזור גם בתהליך.',
    url: 'https://physio-plus.co.il/misrad-habitachon',
    type: 'website',
    locale: 'he_IL',
    images: [
      {
        url: 'https://physio-plus.co.il/images/andrey-meizels.JPG',
        width: 1200,
        height: 630,
        alt: 'אנדריי מייזלס – פיזיותרפיה לזכאי משרד הביטחון באשדוד',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'פיזיותרפיה לזכאי משרד הביטחון | אשדוד | פיזיותרפיה.פלוס',
    description: 'ספק מוכר של משרד הביטחון לפיזיותרפיה באשדוד. התקשרו או שלחו WhatsApp לקביעת תור.',
    images: ['https://physio-plus.co.il/images/andrey-meizels.JPG'],
  },
  alternates: {
    canonical: 'https://physio-plus.co.il/misrad-habitachon',
  },
  other: {
    'geo.region': 'IL',
    'geo.placename': 'אשדוד',
  },
}

const phoneNumber = seoConfig.contact.phone
const phoneTel = getContactPhoneTel()
const whatsappNumber = '972508838982'
const WHATSAPP_TEXT = 'שלום, פניתי דרך הדף של משרד הביטחון באתר ואשמח לתיאום טיפול'
const whatsappMessage = encodeURIComponent(WHATSAPP_TEXT)
const PAGE = 'misrad-habitachon'


const treatments = [
  {
    title: 'כאבי גב וצוואר',
    description: 'כאבים חריפים וממושכים, נוקשות והגבלה בתנועה – עם תוכנית טיפול ותרגול מותאמת.',
    href: '/services/back-pain-ashdod',
  },
  {
    title: 'כאבי כתף וברך',
    description: 'כאבי מפרקים, הגבלה בטווחי תנועה וחולשה – אבחון תנועה וכוח וטיפול לפי הממצאים.',
    href: '/services/knee-pain-ashdod',
  },
  {
    title: 'שיקום לאחר ניתוח',
    description: 'ליווי הדרגתי אחרי ניתוחים אורתופדיים – מהשלבים הראשונים ועד חזרה לתפקוד.',
    href: '/services/post-surgery-ashdod',
  },
  {
    title: 'שיקום לאחר פציעה',
    description: 'שיפור כוח, יציבות ותפקוד אחרי פגיעות שריר-שלד, בקצב שמתאים לכם.',
    href: '/services',
  },
  {
    title: 'סחרחורות ושיווי משקל',
    description: 'שיקום וסטיבולרי לסחרחורות, ורטיגו ובעיות שיווי משקל.',
    href: '/services/vestibular-ashdod',
  },
  {
    title: 'ביקורי בית באשדוד',
    description: 'כשקשה להגיע לקליניקה – פיזיותרפיה בבית. שאלו אותנו אם זה אפשרי במסגרת הזכאות שלכם.',
    href: '/services/home-visits-ashdod',
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

/** Personal area of the Ministry of Defense Rehabilitation Department, where the approval is issued. */
const SHIKUM_PERSONAL_AREA_URL = 'https://myshikum.mod.gov.il/'

const steps = [
  {
    n: 1,
    title: 'מפיקים התחייבות באזור האישי',
    description:
      'נכנסים לאזור האישי באתר אגף השיקום של משרד הביטחון ומפיקים באופן עצמאי התחייבות לטיפולי פיזיותרפיה בקליניקה "פיזיותרפיה.פלוס – אנדריי מייזלס".',
  },
  {
    n: 2,
    title: 'מתקשרים אלינו לקביעת תור',
    description:
      'עם ההתחייבות ביד – מתקשרים או שולחים הודעה ב-WhatsApp, ומתאמים תור קרוב בקליניקה באשדוד.',
  },
  {
    n: 3,
    title: 'מגיעים לטיפול',
    description:
      'לטיפול הראשון מביאים תעודת זהות, ואם יש – מסמכים רפואיים ובדיקות הדמיה.',
  },
  {
    n: 4,
    title: 'צריכים עזרה?',
    description:
      'לא מצליחים להפיק את ההתחייבות או לא בטוחים איך? התקשרו אלינו ונעזור.',
  },
]

const faqs = [
  {
    q: 'האם אתם ספק מוכר של משרד הביטחון?',
    a: 'כן. הקליניקה "פיזיותרפיה.פלוס – אנדריי מייזלס" מוכרת כספק של משרד הביטחון לטיפולי פיזיותרפיה.',
  },
  {
    q: 'איך מגיעים לטיפול אצלכם?',
    a: 'מפיקים באופן עצמאי התחייבות לטיפולי פיזיותרפיה באזור האישי באתר אגף השיקום של משרד הביטחון, ואז פשוט מתקשרים אלינו לקביעת תור. אין צורך להגיע קודם לסניף.',
  },
  {
    q: 'לא הצלחתי להפיק התחייבות באזור האישי – מה עושים?',
    a: 'התקשרו אלינו או שלחו הודעה ב-WhatsApp. נסביר איך עושים את זה, ואם צריך – נכוון אתכם לגורם המתאים באגף השיקום.',
  },
  {
    q: 'מי יכול לקבל טיפול במסגרת משרד הביטחון?',
    a: 'הזכאות נקבעת על ידי הגורמים המוסמכים, לפי ההכרה והזכאות האישית שלכם. אם אינכם בטוחים מה מגיע לכם – בדקו מול הגורם המטפל, ואנחנו נשמח לעזור להבין את התהליך.',
  },
  {
    q: 'מה צריך להביא לטיפול הראשון?',
    a: 'תעודת זהות ומסמכים רפואיים רלוונטיים. את ההתחייבות מפיקים מראש באזור האישי. אם יש בידיכם בדיקות הדמיה (MRI/אולטרסאונד/רנטגן) – מומלץ להביא גם אותן.',
  },
  {
    q: 'האם יש השתתפות עצמית?',
    a: 'זה תלוי בזכאות שלכם. נסביר את הפרטים במעמד קביעת התור.',
  },
  {
    q: 'האם אפשר לקבל טיפול בבית?',
    a: 'הקליניקה מציעה ביקורי בית באשדוד והסביבה. שאלו אותנו אם ביקורי בית אפשריים במסגרת הזכאות שלכם.',
  },
  {
    q: 'אין לי זכאות דרך משרד הביטחון – מה אפשרי?',
    a: 'אפשר להגיע באופן פרטי, דרך מאוחדת (לפציעות ספורט) או לבדוק החזרים בביטוח המשלים והפרטי. התקשרו אלינו או שלחו הודעה ב-WhatsApp ונסביר את האפשרויות.',
  },
]

const treatmentIcons = [Activity, Bone, HeartPulse, Dumbbell, Waves, House]
const stepIcons = [FileCheck, PhoneCall, CalendarCheck, LifeBuoy]

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
        href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
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

export default function MisradHabitachonPage() {
  const medicalBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['MedicalBusiness', 'LocalBusiness'],
    '@id': clinicSchemaIds.medicalBusiness,
    name: clinicEntity.brandHe,
    description:
      'קליניקת פיזיותרפיה באשדוד, ספק מוכר של משרד הביטחון לטיפולי פיזיותרפיה ושיקום.',
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
    medicalSpecialty: ['Physiotherapy', 'PhysicalTherapy'],
    availableService: treatments.map((i) => ({
      '@type': 'MedicalProcedure',
      name: i.title,
      description: i.description,
    })),
    paymentAccepted: ['משרד הביטחון', 'מזומן', 'כרטיס אשראי'],
    isAcceptingNewPatients: true,
  }

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'אנדריי מייזלס',
    jobTitle: 'פיזיותרפיסט (M.Sc)',
    image: 'https://physio-plus.co.il/images/andrey-meizels.JPG',
    description: 'פיזיותרפיסט בעל תואר שני (M.Sc) מאוניברסיטת אריאל, לשעבר פיזיותרפיסט נבחרת ישראל בג\'ודו, ספק משרד הביטחון לפיזיותרפיה באשדוד.',
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
        name: 'משרד הביטחון – פיזיותרפיה',
        item: 'https://physio-plus.co.il/misrad-habitachon',
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
    { Icon: ShieldCheck, title: 'ספק מוכר', text: 'של משרד הביטחון' },
    { Icon: FileCheck, title: 'התחייבות עצמאית', text: 'באזור האישי, בלי להגיע לסניף' },
    { Icon: Medal, title: 'נבחרת ישראל לשעבר', text: 'פיזיותרפיסט (M.Sc)' },
    { Icon: Star, title: '5.0 בגוגל', text: 'דירוג המטופלים בקליניקה' },
  ]

  const firstVisit = [
    { Icon: ScanSearch, text: 'אבחון תנועה וכוח – זיהוי מגבלות וחולשות' },
    { Icon: Hand, text: 'טיפול ידני, תרגילים מותאמים והדרכה לתנועה בטוחה ביום-יום' },
    { Icon: TrendingUp, text: 'מעקב התקדמות ועדכון התוכנית בכל מפגש' },
  ]

  const whatToBring = [
    'התחייבות לטיפולי פיזיותרפיה בקליניקה "פיזיותרפיה.פלוס – אנדריי מייזלס" – מפיקים מראש באזור האישי באתר אגף השיקום',
    'תעודת זהות',
    'מסמכים רפואיים רלוונטיים ובדיקות הדמיה (MRI, רנטגן, אולטרסאונד) – אם קיימים',
    'בגדים נוחים',
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
                    { label: 'משרד הביטחון – פיזיותרפיה', href: '/misrad-habitachon' },
                  ]}
                />
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-bold text-white mb-4 ring-1 ring-white/25">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                ספק מוכר של משרד הביטחון
              </div>
              <h1 className="text-[2rem] sm:text-4xl lg:text-5xl font-bold mb-4 text-white leading-tight">
                פיזיותרפיה לזכאי משרד הביטחון באשדוד
              </h1>
              <p className="text-lg sm:text-xl text-white/95 leading-relaxed mb-6 max-w-xl">
                הקליניקה מוכרת כספק של <strong>משרד הביטחון</strong>. נכי משרד הביטחון
                הזכאים לטיפולי פיזיותרפיה יכולים לקבל אצלנו טיפול אישי, מקצועי וזמין באשדוד, על ידי
                פיזיותרפיסט בעל תואר שני שהיה פיזיותרפיסט נבחרת ישראל.
              </p>
              <ContactButtons section="hero" light phoneLabel="התקשרו לקביעת תור" />
              <p className="mt-4 text-sm text-white/85">
                מפיקים התחייבות באזור האישי באתר אגף השיקום ומתקשרים אלינו לקביעת תור
              </p>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="relative aspect-[16/11] lg:aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/20">
                  <Image
                    src="/images/andrey-meizels.JPG"
                    alt="אנדריי מייזלס – פיזיותרפיסט, ספק משרד הביטחון באשדוד"
                    fill
                    priority
                    className="object-cover object-[center_20%]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1b2063]/50 via-transparent to-transparent" aria-hidden="true" />
                </div>
                {/* Ministry of Defense badge on the image corner */}
                <div className="absolute -bottom-5 right-4 sm:right-6 flex items-center gap-3 rounded-2xl bg-white px-4 py-2.5 shadow-xl">
                  <Image
                    src="/images/insurance/Ministry-of-defense-logo.png"
                    alt="סמל משרד הביטחון – ספק מוכר"
                    width={160}
                    height={158}
                    sizes="48px"
                    className="object-contain"
                    style={{ height: 44, width: 'auto', maxWidth: 48 }}
                  />
                  <div>
                    <div className="text-sm font-bold leading-tight" style={{ color: NAVY }}>ספק מוכר</div>
                    <div className="text-xs font-medium" style={{ color: '#4b5563' }}>של משרד הביטחון</div>
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
              מפיקים התחייבות באופן עצמאי, מתקשרים אלינו – ומתחילים טיפול.
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
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={SHIKUM_PERSONAL_AREA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#2A3080] px-6 py-3.5 font-bold text-white shadow-md hover:bg-[#1f2566] transition-colors"
            >
              לאזור האישי באתר אגף השיקום
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
            <MeuhedetContactLink
              page={PAGE}
              type="phone"
              href={`tel:${phoneTel}`}
              section="steps"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border-2 border-[#2080C0] px-6 py-3 font-bold text-[#2A3080] hover:bg-[#F2F8FD] transition-colors"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              יש לי התחייבות – לקביעת תור
            </MeuhedetContactLink>
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
                  מרכז כלניות, אשדוד · ספק משרד הביטחון
                </p>
                <h3 className="text-xl font-bold mb-1" style={{ color: NAVY }}>
                  אנדריי מייזלס
                </h3>
                <p className="text-sm font-medium mb-3" style={{ color: LINK }}>
                  פיזיותרפיסט (M.Sc) · פיזיותרפיה.פלוס – אנדריי מייזלס
                </p>
                <p className="text-gray-800 leading-relaxed mb-5">
                  פיזיותרפיסט לשעבר של נבחרת ישראל בג&apos;ודו, מתמחה בשיקום אורתופדי ובשיקום
                  לאחר פציעות וניתוחים. מטפל בזכאי משרד הביטחון בקליניקה באשדוד.
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
                פיזיותרפיה במסגרת משרד הביטחון – מה מצפה לכם בביקור הראשון?
              </h2>
              <p className="text-white/90 leading-relaxed mb-6">
                בפגישה הראשונה נערוך הערכה מקיפה: שיחה על הרקע והתלונות, בדיקה תנועתית ותכנון תוכנית
                טיפול אישית. המטרה – להבין את מקור הכאב, לשפר תפקוד ולהחזיר ביטחון בתנועה ביום-יום.
                את ההתחייבות מפיקים מראש באופן עצמאי באזור האישי, ואם צריך – נעזור בהסבר במעמד קביעת התור.
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
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-white">מה להביא לתור הראשון?</h2>
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
              במה אנחנו מטפלים?
            </h2>
            <p className="text-lg text-gray-700">
              זכאי משרד הביטחון מקבלים אצלנו טיפול מותאם אישית – מכאבים יומיומיים ועד שיקום
              לאחר ניתוח או פציעה.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 max-w-6xl mx-auto">
            {treatments.map((injury, i) => {
              const Icon = treatmentIcons[i]
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
              למה לבחור בפיזיותרפיה.פלוס לטיפול במסגרת משרד הביטחון?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {[
                'ספק מוכר של משרד הביטחון – פיזיותרפיה.פלוס – אנדריי מייזלס',
                'פיזיותרפיסט (M.Sc) עם ניסיון בשיקום אורתופדי ושיקום אחרי ניתוחים',
                'פיזיותרפיסט לשעבר של נבחרת ישראל בג\'ודו',
                'קליניקה מקצועית במרכז כלניות, אשדוד',
                'תהליך פשוט: מפיקים התחייבות באזור האישי ומתקשרים לקביעת תור',
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
                נשמח לענות על כל שאלה ולהסביר את התהליך מול משרד הביטחון.
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
                source="misrad-habitachon"
                subtitle="השאירו שם וטלפון ונחזור אליכם לתיאום טיפול במסגרת משרד הביטחון."
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
                שאלות נפוצות – פיזיותרפיה במסגרת משרד הביטחון
              </h2>
              <p className="text-lg text-gray-700">
                מה חשוב לדעת לפני שמתחילים טיפול במסגרת משרד הביטחון.
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
              זכאי משרד הביטחון – צוות הקליניקה כאן בשבילכם, מהשיחה הראשונה ועד סוף השיקום.
            </p>
            <div className="flex justify-center">
              <ContactButtons section="bottom-cta" light phoneLabel={phoneNumber} />
            </div>
          </div>
        </div>
      </section>

      <MeuhedetStickyCTA page={PAGE} whatsappText={WHATSAPP_TEXT} />
    </div>
  )
}
