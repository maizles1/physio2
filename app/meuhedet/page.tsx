import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'פיזיותרפיה לפציעות ספורט במאוחדת באשדוד | פיזיותרפיה.פלוס',
  description:
    'ספק מוכר של מאוחדת לפיזיותרפיה ופציעות ספורט באשדוד. טיפול אישי על ידי פיזיותרפיסט בעל תואר שני, פיזיותרפיסט לשעבר של נבחרת ישראל. תיאום מהיר.',
  keywords: [
    'פיזיותרפיה מאוחדת',
    'פציעות ספורט מאוחדת',
    'פיזיותרפיסט מאוחדת אשדוד',
    'ספק מאוחדת פיזיותרפיה',
    'טיפול בפציעות ספורט אשדוד',
    'שיקום ספורטאים מאוחדת',
    'פיזיותרפיה דרך קופת חולים',
  ],
  openGraph: {
    title: 'פיזיותרפיה לפציעות ספורט במאוחדת | פיזיותרפיה.פלוס',
    description:
      'ספק מאוחדת לפיזיותרפיה ופציעות ספורט באשדוד. השאירו פרטים ונחזור אליכם לתיאום טיפול במסגרת מאוחדת.',
    url: 'https://physio-plus.co.il/meuhedet',
    type: 'website',
    locale: 'he_IL',
    images: [
      {
        url: 'https://physio-plus.co.il/images/logo/clinic-logo.png',
        width: 1200,
        height: 630,
        alt: 'פיזיותרפיה לפציעות ספורט במסגרת מאוחדת',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'פיזיותרפיה לפציעות ספורט במאוחדת | פיזיותרפיה.פלוס',
    description:
      'ספק מאוחדת לפיזיותרפיה ופציעות ספורט באשדוד. השאירו פרטים ונחזור אליכם לתיאום טיפול.',
    images: ['https://physio-plus.co.il/images/logo/clinic-logo.png'],
  },
  alternates: {
    canonical: 'https://physio-plus.co.il/meuhedet',
  },
  other: {
    'geo.region': 'IL',
    'geo.placename': 'אשדוד',
  },
}

const phoneNumber = '050-883-8982'
const phoneTel = '0508838982'
const whatsappNumber = '972508838982'
const whatsappMessageMeuhedet = encodeURIComponent(
  'שלום, פניתי דרך הדף של מאוחדת באתר ואשמח לתיאום טיפול לפציעת ספורט'
)

const injuries = [
  {
    title: 'כאבי גב תחתון ופציעות גב',
    description: 'פציעות גב הקשורות לעומסי אימון, ריצה, הרמת משקולות והליכה ממושכת.',
  },
  {
    title: 'פציעות ברך',
    description: 'מניסקוס, רצועות צולבות (ACL/PCL), פציעות סחוס וכאבי קדמת הברך אצל רצים.',
  },
  {
    title: 'פציעות כתף',
    description: 'מסובב הכתף (Rotator Cuff), פריקות חוזרות, דלקות גידים וכאבי כתף אצל שחיינים וטניסאים.',
  },
  {
    title: 'פציעות קרסול וכף רגל',
    description: 'נקעים, אי-יציבות כרונית, פאשייטיס פלנטריס וטיפול בפציעות חוזרות.',
  },
  {
    title: 'דלקות גידים ושרירים',
    description: 'אכילס, מרפק טניסאי, מרפק גולפאי ומשיכות שרירים בריצה ובאימוני כוח.',
  },
  {
    title: 'שיקום פוסט-ניתוחי',
    description:
      'החזרה הדרגתית לפעילות לאחר ניתוחי ברך, כתף וקרסול – עד חזרה מלאה לספורט.',
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
    a: 'גם אם אינכם חברי מאוחדת אפשר להגיע באופן פרטי או לבדוק מסלולי החזר דרך הביטוח המשלים בקופה שלכם. השאירו פרטים ונסביר לכם את האפשרויות.',
  },
]

export default function MeuhedetPage() {
  const medicalBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: 'פיזיותרפיה.פלוס – ספק מאוחדת לפציעות ספורט',
    description:
      'קליניקת פיזיותרפיה באשדוד, ספק מוכר של מאוחדת לטיפול בפציעות ספורט ושיקום אורתופדי.',
    url: 'https://physio-plus.co.il/meuhedet',
    telephone: '+972-50-883-8982',
    image: 'https://physio-plus.co.il/images/logo/clinic-logo.png',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'מרכז כלניות',
      addressLocality: 'אשדוד',
      addressCountry: 'IL',
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
                  { label: 'מאוחדת – פציעות ספורט', href: '/meuhedet' },
                ]}
              />
              <span className="inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm mb-4">
                ספק מוכר של מאוחדת
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 text-white leading-tight">
                פיזיותרפיה לפציעות ספורט במסגרת מאוחדת
              </h1>
              <p className="text-lg sm:text-xl text-white/95 leading-relaxed mb-8">
                אם אתם חברי <strong>מאוחדת</strong> ויש לכם פציעת ספורט – אתם בידיים טובות. הקליניקה
                היא ספק מוכר של מאוחדת ומציעה טיפול אישי, מקצועי וזמין באשדוד, על ידי פיזיותרפיסט
                בעל תואר שני שהיה פיזיותרפיסט נבחרת ישראל.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:${phoneTel}`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-7 py-3.5 text-base font-bold text-[#2A3080] shadow-lg hover:bg-gray-100 transition-colors"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  התקשרו עכשיו
                </a>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMessageMeuhedet}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-7 py-3.5 text-base font-bold text-white shadow-lg hover:bg-[#1ebe57] transition-colors"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  שיחה בוואטסאפ
                </a>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="inline-flex items-center justify-center rounded-2xl bg-white/95 backdrop-blur-sm shadow-2xl ring-1 ring-white/40 px-6 py-5 sm:px-8 sm:py-6">
                <Image
                  src="/images/insurance/Meuhedet-Logo.png"
                  alt="לוגו מאוחדת – ספק רשמי"
                  width={320}
                  height={102}
                  priority
                  sizes="(min-width: 1024px) 320px, (min-width: 640px) 280px, 220px"
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
                <h3 className="font-bold text-[#2A3080] mb-1">ספק רשמי של מאוחדת</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  הקליניקה מוכרת על ידי קופת חולים מאוחדת לפיזיותרפיה ושיקום.
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
                <h3 className="font-bold text-[#2A3080] mb-1">תואר שני בפיזיותרפיה</h3>
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

      {/* 3. Therapist photo + clinic gallery */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3" style={{ color: '#2A3080' }}>
                מי מטפל בכם?
              </h2>
              <p className="text-lg text-gray-700">
                אנדריי מייזלס · מרכז כלניות, אשדוד · ספק מאוחדת רשמי
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,340px)_1fr] gap-6 items-start mb-8">
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5]">
                  <Image
                    src="/images/andrey-meizels.JPG"
                    alt="אנדריי מייזלס – פיזיותרפיסט, ספק מאוחדת לפציעות ספורט באשדוד"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 340px"
                    quality={90}
                    priority
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="text-xl font-bold mb-1" style={{ color: '#2A3080' }}>
                    אנדריי מייזלס
                  </h3>
                  <p className="text-sm font-medium mb-3" style={{ color: '#2080C0' }}>
                    פיזיותרפיסט (M.Sc) · פיזיותרפיה.פלוס – אנדריי מייזלס
                  </p>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    פיזיותרפיסט לשעבר של נבחרת ישראל בג&apos;ודו, מתמחה בשיקום פציעות ספורט
                    וחזרה לפעילות. מטפל בחברי מאוחדת במסגרת הקופה.
                  </p>
                  <Link
                    href="/about"
                    className="text-sm text-[#2080C0] font-semibold hover:underline"
                  >
                    עוד עליי ←
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 h-full">
                {clinicPhotos.map((photo) => (
                  <div
                    key={photo.src}
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                  >
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        quality={85}
                        loading="lazy"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-center text-sm text-gray-600">
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
              באילו פציעות ספורט אנחנו מטפלים?
            </h2>
            <p className="text-lg text-gray-700">
              חברי מאוחדת מקבלים אצלנו טיפול מותאם אישית למגוון רחב של פציעות ספורט – מפציעות חריפות
              ועד שיקום מלא לאחר ניתוח.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {injuries.map((injury) => (
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
                  {injury.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">{injury.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. How it works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3" style={{ color: '#2A3080' }}>
              איך זה עובד?
            </h2>
            <p className="text-lg text-gray-700">
              ארבעה צעדים פשוטים מהפנייה ועד תחילת הטיפול במסגרת מאוחדת.
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
                נשמח לענות על כל שאלה ולהסביר את התהליך מול מאוחדת.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href={`tel:${phoneTel}`}
                  className="group flex flex-col items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#2A3080] via-[#2080C0] to-[#40C0F0] px-6 py-7 text-white text-center shadow-md transition-transform hover:-translate-y-0.5"
                >
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-sm font-medium opacity-90">חייגו אלינו</span>
                  <span className="text-xl font-bold tracking-wide" dir="ltr">{phoneNumber}</span>
                </a>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMessageMeuhedet}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#1ebe57] px-6 py-7 text-white text-center shadow-md transition-transform hover:-translate-y-0.5"
                >
                  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  <span className="text-sm font-medium opacity-90">שלחו הודעה</span>
                  <span className="text-xl font-bold">WhatsApp</span>
                </a>
              </div>
              <p className="mt-5 text-center text-sm text-gray-600 leading-relaxed">
                שעות פעילות: א׳–ה׳ בשעות 08:00–20:00 • שיחת ייעוץ ראשונית ללא התחייבות
              </p>
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
              חברי מאוחדת – חזרו לפעילות מהר ובבטחה. צוות הקליניקה כאן בשבילכם.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`tel:${phoneTel}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-7 py-3.5 text-base font-bold text-[#2A3080] shadow-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {phoneNumber}
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessageMeuhedet}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-7 py-3.5 text-base font-bold text-white shadow-lg hover:bg-[#1ebe57] transition-colors"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                שיחה בוואטסאפ
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
