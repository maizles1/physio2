import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import MeuhedetReviewsStrip from '@/components/MeuhedetReviewsStrip'
import MeuhedetStickyCTA from '@/components/MeuhedetStickyCTA'
import MeuhedetContactLink from '@/components/MeuhedetContactLink'
import LeadForm from '@/components/LeadForm'
import { manualReviews } from '@/config/manual-reviews.config'
import { getUniversitySchema, getClinicPostalAddress, getOpeningHoursSpecification, getAshdodAreaServed, clinicSchemaIds, clinicEntity, clinicGeo } from '@/config/geo.config'
import { seoConfig, getContactPhoneTel } from '@/config/seo.config'

export const metadata: Metadata = {
  title: 'פיזיותרפיה לזכאי משרד הביטחון | אשדוד',
  description:
    'ספק מוכר של משרד הביטחון לפיזיותרפיה באשדוד. פיזיותרפיה.פלוס – אנדריי מייזלס, M.Sc. טיפול אישי לזכאים, ליווי בתהליך ותור מהיר. התקשרו או שלחו WhatsApp.',
  keywords: [
    'פיזיותרפיה משרד הביטחון',
    'פיזיותרפיה משרד הביטחון אשדוד',
    'פיזיותרפיסט ספק משרד הביטחון',
    'פיזיותרפיה נכי צה"ל אשדוד',
    'פיזיותרפיה נכי מלחמה',
    'פיזיותרפיה נפגעי פעולות איבה',
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
    alt: 'חדר טיפול בקליניקת פיזיותרפיה.פלוס באשדוד',
  },
  {
    src: '/images/carousel/clinic-2.jpg',
    alt: 'ציוד פיזיותרפיה מקצועי בקליניקה',
  },
  {
    src: '/images/carousel/clinic-4.jpg',
    alt: 'אזור קבלה וטיפול בקליניקה במרכז כלניות אשדוד',
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

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 1. Hero */}
      <section
        className="relative text-white overflow-hidden py-16 sm:py-20"
        style={{ background: 'linear-gradient(to bottom right, #2A3080, #2080C0, #40C0F0)' }}
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-center">
            <div className="max-w-3xl">
              <Breadcrumbs
                items={[
                  { label: 'דף בית', href: '/' },
                  { label: 'משרד הביטחון – פיזיותרפיה', href: '/misrad-habitachon' },
                ]}
              />
              <span className="inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm mb-4">
                ספק מוכר של משרד הביטחון
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 text-white leading-tight">
                פיזיותרפיה לזכאי משרד הביטחון באשדוד
              </h1>
              <p className="text-lg sm:text-xl text-white/95 leading-relaxed mb-8">
                הקליניקה מוכרת כספק של <strong>משרד הביטחון</strong>. נכי מלחמה ונפגעי פעולות איבה
                הזכאים לטיפולי פיזיותרפיה יכולים לקבל אצלנו טיפול אישי, מקצועי וזמין באשדוד, על ידי
                פיזיותרפיסט בעל תואר שני שהיה פיזיותרפיסט נבחרת ישראל.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <MeuhedetContactLink
                  page={PAGE}
                  type="phone"
                  href={`tel:${phoneTel}`}
                  section="hero"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-7 py-3.5 text-base font-bold text-[#2A3080] shadow-lg hover:bg-gray-100 transition-colors"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  התקשרו לקביעת תור
                </MeuhedetContactLink>
                <MeuhedetContactLink
                  page={PAGE}
                  type="whatsapp"
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                  section="hero"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-7 py-3.5 text-base font-bold text-white shadow-lg hover:bg-[#1ebe57] transition-colors"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  שיחה בוואטסאפ
                </MeuhedetContactLink>
              </div>
              <p className="mt-4 text-sm text-white/80">
                מפיקים התחייבות באזור האישי באתר אגף השיקום ומתקשרים אלינו לקביעת תור
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="inline-flex items-center justify-center rounded-2xl bg-white/95 backdrop-blur-sm shadow-2xl ring-1 ring-white/40 px-6 py-5 sm:px-8 sm:py-6">
                <Image
                  src="/images/insurance/Ministry-of-defense-logo.png"
                  alt="סמל משרד הביטחון – ספק מוכר"
                  width={160}
                  height={158}
                  priority
                  sizes="(min-width: 640px) 128px, 96px"
                  className="h-20 sm:h-24 md:h-28 w-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust band */}
      <section className="bg-blue-50/60 border-y border-blue-100">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#2080C0]/10">
                <svg className="h-6 w-6 text-[#2080C0]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-[#2A3080] mb-1">ספק רשמי: פיזיותרפיה.פלוס – אנדריי מייזלס</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  הקליניקה מוכרת כספק של משרד הביטחון לטיפולי פיזיותרפיה.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#2080C0]/10">
                <svg className="h-6 w-6 text-[#2080C0]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-[#2A3080] mb-1">תואר שני בפיזיותרפיה, אוניברסיטת אריאל</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  טיפול מבוסס ידע מתקדם ושיטות מוכחות מחקרית.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#2080C0]/10">
                <svg className="h-6 w-6 text-[#2080C0]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-[#2A3080] mb-1">פיזיותרפיסט נבחרת ישראל לשעבר</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  ניסיון רב בעבודה עם ספורטאי עילית ושיקום חזרה לפעילות.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3" style={{ color: '#2A3080' }}>
              איך זה עובד?
            </h2>
            <p className="text-lg text-gray-700">
              מפיקים התחייבות באופן עצמאי, מתקשרים אלינו – ומתחילים טיפול.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {steps.map((step) => (
              <div
                key={step.n}
                className="relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="absolute -top-4 right-6 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#2A3080] via-[#2080C0] to-[#40C0F0] text-white font-bold shadow-md">
                  {step.n}
                </div>
                <h3 className="mt-2 text-lg font-bold mb-2" style={{ color: '#2A3080' }}>
                  {step.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={SHIKUM_PERSONAL_AREA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2A3080] px-6 py-3.5 font-bold text-white shadow-md hover:bg-[#1f2566] transition-colors"
            >
              לאזור האישי באתר אגף השיקום
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <MeuhedetContactLink
              page={PAGE}
              type="phone"
              href={`tel:${phoneTel}`}
              section="steps"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#2080C0] px-6 py-3 font-bold text-[#2A3080] hover:bg-white transition-colors"
            >
              יש לי התחייבות – לקביעת תור
            </MeuhedetContactLink>
          </div>
        </div>
      </section>

      <MeuhedetReviewsStrip />

      {/* 3. Therapist photo + clinic gallery */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3" style={{ color: '#2A3080' }}>
                מי מטפל בכם?
              </h2>
              <p className="text-lg text-gray-700">
                אנדריי מייזלס · מרכז כלניות, אשדוד · ספק משרד הביטחון
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 lg:items-stretch">
              {/* Therapist column */}
              <div className="flex flex-col gap-5">
                <div className="group relative aspect-[4/5] sm:aspect-[5/6] lg:aspect-auto lg:flex-1 lg:min-h-[320px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md ring-1 ring-black/5">
                  <Image
                    src="/images/andrey-meizels.JPG"
                    alt="אנדריי מייזלס – פיזיותרפיסט, ספק משרד הביטחון באשדוד"
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    quality={90}
                    priority
                  />
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-bold mb-1" style={{ color: '#2A3080' }}>
                    אנדריי מייזלס
                  </h3>
                  <p className="text-sm font-medium mb-3" style={{ color: '#2080C0' }}>
                    פיזיותרפיסט (M.Sc) · פיזיותרפיה.פלוס – אנדריי מייזלס
                  </p>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    פיזיותרפיסט לשעבר של נבחרת ישראל בג&apos;ודו, מתמחה בשיקום אורתופדי ובשיקום
                    לאחר פציעות וניתוחים. מטפל בזכאי משרד הביטחון בקליניקה באשדוד.
                  </p>
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-1 text-sm text-[#2080C0] font-semibold hover:underline"
                  >
                    עוד עליי
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Clinic bento gallery – balanced mosaic */}
              <div className="grid grid-cols-2 grid-rows-2 gap-4 lg:gap-5 min-h-[300px] sm:min-h-[380px] lg:min-h-[520px]">
                <div className="group relative row-span-2 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md ring-1 ring-black/5">
                  <Image
                    src={clinicPhotos[0].src}
                    alt={clinicPhotos[0].alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    quality={85}
                    loading="lazy"
                  />
                </div>
                <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md ring-1 ring-black/5">
                  <Image
                    src={clinicPhotos[1].src}
                    alt={clinicPhotos[1].alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    quality={85}
                    loading="lazy"
                  />
                </div>
                <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md ring-1 ring-black/5">
                  <Image
                    src={clinicPhotos[2].src}
                    alt={clinicPhotos[2].alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    quality={85}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <p className="mt-8 text-center text-sm text-gray-600">
              קליניקה מקצועית ונעימה באשדוד – טיפול אישי בסביבה שקטה ומאובזרת
            </p>
          </div>
        </div>
      </section>

      {/* 4. Injuries we treat */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3" style={{ color: '#2A3080' }}>
              במה אנחנו מטפלים?
            </h2>
            <p className="text-lg text-gray-700">
              זכאי משרד הביטחון מקבלים אצלנו טיפול מותאם אישית – מכאבים יומיומיים ועד שיקום
              לאחר ניתוח או פציעה.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {treatments.map((injury) => (
              <article
                key={injury.title}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#2A3080] to-[#2080C0]">
                  <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: '#2A3080' }}>
                  <Link href={injury.href} className="hover:text-[#2080C0] transition-colors">
                    {injury.title}
                  </Link>
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">{injury.description}</p>
                <Link
                  href={injury.href}
                  className="text-sm font-semibold text-[#2080C0] hover:underline inline-flex items-center gap-1"
                >
                  לפרטים נוספים
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SEO content: first visit, why us, what to bring */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#2A3080' }}>
                פיזיותרפיה במסגרת משרד הביטחון – מה מצפה לכם בביקור הראשון?
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                בפגישה הראשונה נערוך הערכה מקיפה: שיחה על הרקע והתלונות, בדיקה תנועתית ותכנון תוכנית
                טיפול אישית. המטרה – להבין את מקור הכאב, לשפר תפקוד ולהחזיר ביטחון בתנועה ביום-יום.
                את ההתחייבות מפיקים מראש באופן עצמאי באזור האישי, ואם צריך – נעזור בהסבר במעמד קביעת התור.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm sm:text-base">
                <li>אבחון תנועה וכוח – זיהוי מגבלות וחולשות</li>
                <li>טיפול ידני, תרגילים מותאמים והדרכה לתנועה בטוחה ביום-יום</li>
                <li>מעקב התקדמות ועדכון התוכנית בכל מפגש</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#2A3080' }}>
                למה לבחור בפיזיותרפיה.פלוס לטיפול במסגרת משרד הביטחון?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  'ספק מוכר של משרד הביטחון – פיזיותרפיה.פלוס – אנדריי מייזלס',
                  'פיזיותרפיסט (M.Sc) עם ניסיון בשיקום אורתופדי ושיקום אחרי ניתוחים',
                  'פיזיותרפיסט לשעבר של נבחרת ישראל בג\'ודו',
                  'קליניקה מקצועית במרכז כלניות, אשדוד',
                  'תהליך פשוט: מפיקים התחייבות באזור האישי ומתקשרים לקביעת תור',
                  'תוכנית טיפול ושיקום מותאמת אישית',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl bg-white border border-gray-200 p-4">
                    <svg className="h-5 w-5 text-[#2080C0] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#2A3080' }}>
                מה להביא לתור הראשון?
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                כדי שהטיפול יתחיל בצורה חלקה, מומלץ להגיע מוכנים עם המסמכים הבאים:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm sm:text-base">
                <li>התחייבות לטיפולי פיזיותרפיה בקליניקה &quot;פיזיותרפיה.פלוס – אנדריי מייזלס&quot; – מפיקים מראש באזור האישי באתר אגף השיקום</li>
                <li>תעודת זהות</li>
                <li>מסמכים רפואיים רלוונטיים ובדיקות הדמיה (MRI, רנטגן, אולטרסאונד) – אם קיימים</li>
                <li>בגדים נוחים</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Contact CTA */}
      <section id="contact-cta" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3" style={{ color: '#2A3080' }}>
                התקשרו אלינו לתיאום טיפול
              </h2>
              <p className="text-lg text-gray-700">
                הדרך המהירה ביותר להתחיל – שיחת טלפון קצרה או הודעה בוואטסאפ.
                נשמח לענות על כל שאלה ולהסביר את התהליך מול משרד הביטחון.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <MeuhedetContactLink
                  page={PAGE}
                  type="phone"
                  href={`tel:${phoneTel}`}
                  section="contact-cta"
                  className="group flex flex-col items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#2A3080] via-[#2080C0] to-[#40C0F0] px-6 py-7 text-white text-center shadow-md transition-transform hover:-translate-y-0.5"
                >
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-sm font-medium opacity-90">חייגו אלינו</span>
                  <span className="text-xl font-bold tracking-wide" dir="ltr">{phoneNumber}</span>
                </MeuhedetContactLink>
                <MeuhedetContactLink
                  page={PAGE}
                  type="whatsapp"
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                  section="contact-cta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#1ebe57] px-6 py-7 text-white text-center shadow-md transition-transform hover:-translate-y-0.5"
                >
                  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  <span className="text-sm font-medium opacity-90">שלחו הודעה</span>
                  <span className="text-xl font-bold">WhatsApp</span>
                </MeuhedetContactLink>
              </div>
              <p className="mt-5 text-center text-sm text-gray-600 leading-relaxed">
                שעות פעילות: א׳–ה׳ בשעות 08:00–20:00 • שיחת ייעוץ ראשונית ללא התחייבות
              </p>
            </div>
            <div id="lead-form" className="mt-8 scroll-mt-24">
              <LeadForm
                source="misrad-habitachon"
                subtitle="השאירו שם וטלפון ונחזור אליכם לתיאום טיפול במסגרת משרד הביטחון."
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3" style={{ color: '#2A3080' }}>
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
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
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

      {/* 7. Bottom CTA band */}
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
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <MeuhedetContactLink
                  page={PAGE}
                type="phone"
                href={`tel:${phoneTel}`}
                section="bottom-cta"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-7 py-3.5 text-base font-bold text-[#2A3080] shadow-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {phoneNumber}
              </MeuhedetContactLink>
              <MeuhedetContactLink
                  page={PAGE}
                type="whatsapp"
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                section="bottom-cta"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-7 py-3.5 text-base font-bold text-white shadow-lg hover:bg-[#1ebe57] transition-colors"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                שיחה בוואטסאפ
              </MeuhedetContactLink>
            </div>
          </div>
        </div>
      </section>

      <MeuhedetStickyCTA page={PAGE} whatsappText={WHATSAPP_TEXT} />
    </div>
  )
}
