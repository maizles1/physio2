import { Metadata } from 'next'
import Link from 'next/link'
import ServiceImage from '@/components/ServiceImage'
import Breadcrumbs from '@/components/Breadcrumbs'
import NeighborhoodHubLinks from '@/components/NeighborhoodHubLinks'
import { getClinicEntityRef } from '@/config/geo.config'
import { clinicServiceNav, serviceLandingPages } from '@/config/service-pages.config'

export const metadata: Metadata = {
  title: 'שירותי פיזיותרפיה באשדוד - טיפול בכאבי גב, שיקום וסחרחורות',
  description: 'שירותי פיזיותרפיה מקצועיים באשדוד: טיפול בכאבי גב, כתף, צוואר וברך, שיקום לאחר ניתוחים, שיקום וסטיבולרי, TMJ וביקורי בית. מכון פיזיותרפיה פרטי במרכז כלניות.',
  keywords: [
    'טיפול בכאבי גב',
    'טיפול בכאבי כתף',
    'טיפול בכאבי צוואר',
    'טיפול בכאבי ברך',
    'שיקום לאחר ניתוח',
    'שיקום וסטיבולרי',
    'טיפול בסחרחורות',
    'טיפול במפרק הלסת',
    'TMJ',
    'טיפול בכאבי גב באשדוד',
    'שיקום לאחר ניתוח ברך באשדוד',
    'שיקום וסטיבולרי אשדוד',
    'טיפול בסחרחורות אשדוד',
    'שיקום אורטופדי',
    'פיזיותרפיה אורטופדית',
    'טיפול בפציעות ספורט',
    'שיקום לאחר ניתוח כתף',
    'שיקום לאחר ניתוח גב',
    'פיזיותרפיה אשדוד מרכז כלניות',
    'שירותי פיזיותרפיה אשדוד',
  ],
  openGraph: {
    title: 'שירותי פיזיותרפיה באשדוד - פיזיותרפיה.פלוס',
    description: 'טיפול מקצועי בכאבי גב, כתף, צוואר וברך, שיקום לאחר ניתוחים, שיקום וסטיבולרי וביקורי בית. מכון פיזיותרפיה פרטי באשדוד.',
    url: 'https://physio-plus.co.il/services',
    type: 'website',
    locale: 'he_IL',
    images: [
      {
        url: 'https://physio-plus.co.il/images/logo/clinic-logo.png',
        width: 1200,
        height: 630,
        alt: 'שירותי פיזיותרפיה באשדוד - פיזיותרפיה.פלוס',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'שירותי פיזיותרפיה באשדוד - פיזיותרפיה.פלוס',
    description: 'טיפול מקצועי בכאבי גב, כתף, צוואר וברך, שיקום לאחר ניתוחים ושיקום וסטיבולרי באשדוד.',
    images: ['https://physio-plus.co.il/images/logo/clinic-logo.png'],
  },
  alternates: {
    canonical: 'https://physio-plus.co.il/services',
  },
  other: {
    'geo.region': 'IL',
    'geo.placename': 'אשדוד',
  },
}

const landingHubCards = [
  ...serviceLandingPages.map((page) => ({
    id: page.hubId,
    title: page.navTitle,
    description: page.lead,
    href: `/services/${page.slug}`,
    imagePath: page.imagePath,
    cta: 'לעמוד השירות באשדוד',
  })),
  {
    id: 'meuhedet',
    title: 'פציעות ספורט – מאוחדת',
    description: 'ספק מאוחדת רשמי לפיזיותרפיה לפציעות ספורט באשדוד. תהליך ההפניה, ההתחייבות וקביעת התור — בדף הייעודי.',
    href: '/meuhedet',
    imagePath: '/images/services/sports-teams/service-image.jpg',
    cta: 'לדף מאוחדת',
  },
]

const inlineServices = [
  {
    id: 'shoulder-pain',
    title: 'טיפול בכאבי כתף',
    description: 'שיקום וטיפול בכאבי כתף, בעיות מפרק הכתף, דלקות גידים ופציעות כתף שונות',
    details: [
      'טיפול בכאבי כתף אקוטיים וכרוניים',
      'דלקות גידים (Tendinitis)',
      'פגיעות במסובב הכתף (Rotator Cuff)',
      'נקעים ופציעות כתף',
      'שיפור טווח תנועה',
      'חיזוק שרירי הכתף',
    ],
    audience: [
      'כאבי כתף אקוטיים או כרוניים',
      'דלקות גידים בכתף',
      'פגיעות במסובב הכתף',
      'כאבי כתף לאחר פציעה או ניתוח',
    ],
    expectedResults:
      'שיפור בטווח התנועה והפחתת כאב נבדקים לאורך הטיפול. משך השיקום משתנה לפי סוג הפגיעה והרקע הרפואי, ונבנה אחרי הערכה ראשונית.',
    color: 'from-[#40C0F0] to-[#2080C0]',
    imagePath: '/images/services/shoulder-pain/service-image.jpg',
    blogHref: '/blog/shoulder-pain-complete-guide',
    blogLabel: 'קרא את המדריך לכאבי כתף',
  },
  {
    id: 'neck-pain',
    title: 'טיפול בכאבי צוואר',
    description: 'טיפול מקצועי ומקיף בכאבי צוואר, בעיות מפרק הצוואר, שרירים ורקמות רכות',
    details: [
      'כאבי צוואר ושרירי הצוואר',
      'בעיות מפרק הצוואר (Cervical Spine)',
      'מתיחות ופציעות שרירים בצוואר',
      'כאבי ראש הקשורים לצוואר',
      'בעיות יציבה המשפיעות על הצוואר',
      'שיפור גמישות ותנועתיות הצוואר',
    ],
    audience: [
      'כאבי צוואר ושרירים',
      'כאבי ראש הקשורים לצוואר',
      'בעיות יציבה המשפיעות על הצוואר',
      'כאבי צוואר מעבודה ממושכת מול מחשב',
    ],
    expectedResults:
      'הטיפול מתמקד בהפחתת כאב ושיפור תנועתיות הצוואר לפי הממצאים בבדיקה. אין לוח זמנים אחיד — התוכנית מתעדכנת לפי התגובה לטיפול.',
    color: 'from-[#004080] to-[#2080C0]',
    imagePath: '/images/services/neck-pain/service-image.jpg',
    blogHref: '/blog/neck-pain-complete-guide',
    blogLabel: 'קרא את המדריך המלא',
  },
  {
    id: 'knee-pain',
    title: 'טיפול בכאבי ברך',
    description: 'טיפול מקצועי ומקיף בכאבי ברך, בעיות מפרק הברך, פציעות ודלקות',
    details: [
      'כאבי ברך אקוטיים וכרוניים',
      'בעיות מניסקוס',
      'כאבי ברך לאחר פעילות',
      'דלקות בגידים (Patellar Tendinitis)',
      'בעיות רצועות הברך',
      'שיפור יציבות וחוזק הברך',
    ],
    audience: [
      'כאבי ברך אקוטיים או כרוניים',
      'בעיות מניסקוס',
      'דלקות בגידים',
      'כאבי ברך לאחר פעילות ספורטיבית',
    ],
    expectedResults:
      'עובדים על יציבות, כוח ותפקוד בהליכה ובפעילות. קצב השיקום תלוי בסוג הפגיעה, ואם יש צורך בשיקום לאחר ניתוח — ממשיכים בדף השיקום הפוסט-ניתוחי.',
    color: 'from-[#2080C0] to-[#40C0F0]',
    imagePath: '/images/services/knee-pain/service-image.jpg',
    blogHref: '/blog',
    blogLabel: 'קרא מאמרים',
    extraHref: '/services/post-surgery-ashdod',
    extraLabel: 'שיקום לאחר ניתוח באשדוד',
  },
  {
    id: 'sports-teams',
    title: 'ליווי קבוצות ספורט וספורטאים',
    description: 'שירותי פיזיותרפיה מקצועיים לליווי קבוצות ספורט וספורטאים, כולל טיפול בפציעות ספורט, מניעת פציעות ותכניות אימון מותאמות',
    details: [
      'ליווי קבוצות ספורט מקצועיות',
      'טיפול בפציעות ספורט אקוטיות',
      'מניעת פציעות ספורט',
      'תכניות אימון ושיקום לספורטאים',
      'ייעוץ והדרכה למאמנים',
      'טיפול על המגרש בזמן אימונים ותחרויות',
    ],
    audience: [
      'ספורטאים מקצועיים',
      'קבוצות ספורט',
      'פציעות ספורט',
      'מניעת פציעות ספורט',
    ],
    expectedResults:
      'הליווי נבנה לפי ענף הספורט, לוח התחרויות וסוג הפציעה. מבוטחי מאוחדת עם פציעת ספורט מופנים לדף המסלול הייעודי, בלי לשכפל כאן את תהליך ההתחייבות.',
    color: 'from-[#2A3080] to-[#2080C0]',
    imagePath: '/images/services/sports-teams/service-image.jpg',
    blogHref: '/blog/running-injuries-prevention-treatment-guide',
    blogLabel: 'מדריך לפציעות ריצה',
    extraHref: '/meuhedet',
    extraLabel: 'פציעות ספורט במאוחדת',
  },
]

export default function ServicesPage() {
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'שירותי פיזיותרפיה באשדוד - פיזיותרפיה.פלוס',
    description: 'רשימת שירותי הפיזיותרפיה בקליניקה במרכז כלניות, אשדוד',
    itemListElement: clinicServiceNav.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.title,
        url: `https://physio-plus.co.il${service.href}`,
      },
    })),
  }

  const inlineSchemas = inlineServices.map((service) => ({
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: service.title,
    description: service.description,
    procedureType: service.title,
    medicalSpecialty: {
      '@type': 'MedicalSpecialty',
      name: 'Physical Therapy',
    },
    provider: getClinicEntityRef(),
    url: `https://physio-plus.co.il/services#${service.id}`,
    duration: 'PT45M',
    followup: service.details.join(', '),
  }))

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      {inlineSchemas.map((schema) => (
        <script
          key={String(schema.url)}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <section className="relative text-white overflow-hidden py-12 sm:py-16" style={{ background: 'linear-gradient(to bottom right, #2A3080, #2080C0, #40C0F0)' }}>
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumbs items={[{ label: 'דף בית', href: '/' }, { label: 'שירותים', href: '/services' }]} />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">שירותי פיזיותרפיה באשדוד</h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl">
            מכון פיזיותרפיה פרטי במרכז כלניות: טיפול בכאבי גב ושריר-שלד, שיקום לאחר ניתוחים, שיקום וסטיבולרי, TMJ וביקורי בית.
          </p>
        </div>
      </section>

      <section className="py-8 bg-blue-50/60 border-y border-blue-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-700 leading-relaxed">
              מבוטחי <strong>מאוחדת</strong> עם פציעת ספורט?{' '}
              <Link href="/meuhedet" className="text-[#2080C0] font-semibold hover:underline">
                לדף פיזיותרפיה לפציעות ספורט במסגרת מאוחדת
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: '#2A3080' }}>
              עמודי שירות באשדוד
            </h2>
            <p className="text-lg text-gray-700">
              דפי שירות ייעודיים לחיפושים מקומיים, בנוסף לפירוט כאן בעמוד. פציעות ספורט במאוחדת נשארות בדף{' '}
              <Link href="/meuhedet" className="text-[#2080C0] font-semibold hover:underline">
                /meuhedet
              </Link>
              .
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {landingHubCards.map((card) => (
              <article
                key={card.id}
                id={card.id}
                className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow"
              >
                <Link href={card.href} className="block group" aria-label={`${card.title} — ${card.cta}`}>
                  <div className="relative h-48 overflow-hidden">
                    <ServiceImage
                      src={card.imagePath}
                      fallbackSrc={card.imagePath}
                      alt={card.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#2080C0] transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-4">{card.description}</p>
                    <span className="text-[#2080C0] font-semibold">{card.cta} ←</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold mb-4" style={{ color: '#2A3080' }}>
              עוד שירותים בקליניקה
            </h2>
            <ul className="flex flex-wrap gap-3">
              {clinicServiceNav
                .filter((item) => !serviceLandingPages.some((page) => page.hubId === item.id))
                .map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      className="inline-block bg-white border border-gray-200 rounded-lg px-4 py-2 text-[#2080C0] font-medium hover:border-[#2080C0]"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              <li>
                <Link
                  href="/contact"
                  className="inline-block bg-white border border-gray-200 rounded-lg px-4 py-2 text-[#2080C0] font-medium hover:border-[#2080C0]"
                >
                  יצירת קשר
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {inlineServices.map((service, index) => (
              <article
                key={service.id}
                id={service.id}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}
              >
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4" style={{ color: '#2A3080' }}>
                    {service.title}
                  </h2>
                  <div className="mb-6 p-4 bg-blue-50 rounded-lg border-r-4" style={{ borderColor: '#2080C0' }}>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: '#2A3080' }}>
                    מה כולל הטיפול?
                  </h3>
                  <ol className="space-y-3 mb-6 list-decimal list-inside">
                    {service.details.slice(0, 4).map((detail) => (
                      <li key={detail} className="text-lg text-gray-700">
                        {detail}
                      </li>
                    ))}
                  </ol>
                  <h3 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: '#2A3080' }}>
                    למי מתאים?
                  </h3>
                  <ul className="space-y-2 mb-6">
                    {service.audience.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <svg className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: '#2080C0' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-lg text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <h3 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: '#2A3080' }}>
                    איך מתקדמים?
                  </h3>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    {service.expectedResults}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href="/contact"
                      className="inline-block text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl text-center"
                      style={{ background: 'linear-gradient(to left, #2080C0, #2A3080)' }}
                      aria-label={`קבע תור לטיפול ב${service.title}`}
                    >
                      קבע תור לטיפול
                    </Link>
                    <Link
                      href={service.blogHref}
                      className="inline-block text-[#2080C0] border-2 border-[#2080C0] font-bold py-3 px-8 rounded-lg transition-all duration-200 hover:bg-[#2080C0] hover:text-white text-center"
                    >
                      {service.blogLabel}
                    </Link>
                    {service.extraHref ? (
                      <Link
                        href={service.extraHref}
                        className="inline-block text-[#2A3080] border-2 border-[#2A3080] font-bold py-3 px-8 rounded-lg transition-all duration-200 hover:bg-[#2A3080] hover:text-white text-center"
                      >
                        {service.extraLabel}
                      </Link>
                    ) : null}
                  </div>
                </div>
                <div className="flex-1 w-full">
                  <div className="h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-xl shadow-xl overflow-hidden relative">
                    <ServiceImage
                      src={service.imagePath}
                      fallbackSrc={service.imagePath}
                      alt={`${service.title} - טיפול פיזיותרפי מקצועי בקליניקת פיזיותרפיה.פלוס באשדוד`}
                      className="object-cover w-full h-full"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-10 pointer-events-none`} aria-hidden="true"></div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <NeighborhoodHubLinks
        heading="פיזיותרפיה לפי אזור באשדוד"
        intro="אותה קליניקה במרכז כלניות. דפי רובע להגעה, חניה ושירותים — בלי סניפים מדומים."
      />

      <section className="py-16 text-white" style={{ background: 'linear-gradient(to left, #2A3080, #2080C0)' }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            מוכנים להתחיל את תהליך השיקום?
          </h2>
          <p className="text-lg sm:text-xl mb-8 text-white">
            צרו איתנו קשר עוד היום וקבלו ייעוץ מקצועי — הקליניקה במרכז כלניות, אשדוד
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-[#2A3080] hover:bg-blue-50 font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105 text-lg"
          >
            קבע טיפול עכשיו
          </Link>
        </div>
      </section>
    </div>
  )
}
