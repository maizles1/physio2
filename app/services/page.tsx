import { Metadata } from 'next'
import Link from 'next/link'
import ServiceImage from '@/components/ServiceImage'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'שירותי פיזיותרפיה - טיפול בכאבי גב, כתף, צוואר וברך | פיזיותרפיה.פלוס',
  description: 'מגוון רחב של שירותי פיזיותרפיה מקצועיים: טיפול בכאבי גב, כתף, צוואר וברך, שיקום לאחר ניתוחים, שיקום וסטיבולרי וטיפול במפרק הלסת. מכון פיזיותרפיה פרטי באשדוד.',
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
  ],
  openGraph: {
    title: 'שירותי פיזיותרפיה - פיזיותרפיה.פלוס',
    description: 'טיפול מקצועי בכאבי גב, כתף, צוואר וברך, שיקום לאחר ניתוחים ושיקום וסטיבולרי.',
    url: 'https://physio-plus.co.il/services',
  },
  alternates: {
    canonical: 'https://physio-plus.co.il/services',
  },
  other: {
    'geo.region': 'IL',
    'geo.placename': 'אשדוד',
  },
}

const services = [
  {
    id: 'back-pain',
    title: 'טיפול בכאבי גב',
    description: 'טיפול מקצועי ומקיף בכאבי גב אקוטיים וכרוניים, כולל כאבי גב תחתון, עליון ומתיחה בגב',
    details: [
      'טיפול בכאבי גב תחתון (Lower Back Pain)',
      'כאבי גב עליון וצוואר',
      'מתיחות ופציעות שרירים בגב',
      'בעיות דיסק ועצבים',
      'שיפור יציבה ותנועה',
      'חיזוק שרירי הליבה',
    ],
    icon: '🦴',
    color: 'from-[#2080C0] to-[#2A3080]',
    imagePath: '/images/services/back-pain/service-image.jpg',
    fallbackImagePath: '/images/services/back-pain/service-image.svg',
  },
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
    icon: '💪',
    color: 'from-[#40C0F0] to-[#2080C0]',
    imagePath: '/images/services/shoulder-pain/service-image.jpg',
    fallbackImagePath: '/images/services/shoulder-pain/service-image.svg',
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
    icon: '🦴',
    color: 'from-[#004080] to-[#2080C0]',
    imagePath: '/images/services/neck-pain/service-image.jpg',
    fallbackImagePath: '/images/services/neck-pain/service-image.svg',
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
    icon: '🦵',
    color: 'from-[#2080C0] to-[#40C0F0]',
    imagePath: '/images/services/knee-pain/service-image.jpg',
    fallbackImagePath: '/images/services/knee-pain/service-image.svg',
  },
  {
    id: 'post-surgery',
    title: 'שיקום לאחר ניתוחים',
    description: 'תוכניות שיקום מותאמות אישית לאחר ניתוחים אורטופדיים, כולל ניתוחי מפרקים, שברים וניתוחי עמוד שדרה',
    details: [
      'שיקום לאחר ניתוחי ברך',
      'שיקום לאחר ניתוחי כתף',
      'שיקום לאחר ניתוחי עמוד שדרה',
      'שיקום לאחר שברים',
      'טיפול בצלקות ובצקות',
      'החזרה הדרגתית לפעילות יומיומית',
    ],
    icon: '🏥',
    color: 'from-[#2A3080] to-[#004080]',
    imagePath: '/images/services/post-surgery/service-image.jpg',
    fallbackImagePath: '/images/services/post-surgery/service-image.svg',
  },
  {
    id: 'vestibular',
    title: 'שיקום וסטיבולרי - טיפול בסחרחורות',
    description: 'טיפול מקצועי בסחרחורות, ורטיגו ובעיות שיווי משקל באמצעות שיקום וסטיבולרי מתקדם',
    details: [
      'טיפול בורטיגו (Vertigo)',
      'סחרחורות ובעיות שיווי משקל',
      'שיקום וסטיבולרי מקצועי',
      'תרגילי איזון ושיווי משקל',
      'טיפול בבעיות BPPV',
      'שיפור יציבות והליכה',
    ],
    icon: '🌀',
    color: 'from-[#2080C0] to-[#40C0F0]',
    imagePath: '/images/services/vestibular/service-image.png',
    fallbackImagePath: '/images/services/vestibular/service-image.svg',
  },
  {
    id: 'tmj',
    title: 'טיפול במפרק הלסת (TMJ)',
    description: 'טיפול מקצועי בכאבי לסת, נעילת לסת, בעיות במפרק הטמפורומנדיבולרי וקשיי לעיסה',
    details: [
      'כאבי לסת ומפרק הלסת',
      'נעילת לסת והגבלת פתיחה',
      'בעיות TMJ (Temporomandibular Joint)',
      'קשיי לעיסה ובליעה',
      'כאבי פנים וצוואר קשורים',
      'שיפור תפקוד הלסת',
    ],
    icon: '😬',
    color: 'from-[#40C0F0] to-[#2A3080]',
    imagePath: '/images/services/tmj/service-image.png',
    fallbackImagePath: '/images/services/tmj/service-image.svg',
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
    icon: '⚽',
    color: 'from-[#2A3080] to-[#2080C0]',
    imagePath: '/images/services/sports-teams/service-image.jpg',
    fallbackImagePath: '/images/services/sports-teams/service-image.svg',
  },
  {
    id: 'home-visits',
    title: 'ביקורי בית באשדוד',
    description: 'שירותי פיזיותרפיה מקצועיים בביקורי בית באשדוד והסביבה. טיפול מקצועי בנוחות הבית שלך',
    details: [
      'ביקורי בית באשדוד והסביבה',
      'טיפול מקצועי בנוחות הבית',
      'שיקום לאחר ניתוחים בבית',
      'טיפול בקשישים ובמתקשים להגיע לקליניקה',
      'טיפול בפציעות בבית',
      'תוכניות שיקום מותאמות אישית',
    ],
    icon: '🏠',
    color: 'from-[#004080] to-[#2080C0]',
    imagePath: '/images/services/home-visits/service-image.jpg',
    fallbackImagePath: '/images/services/home-visits/service-image.svg',
  },
]

export default function ServicesPage() {
  const serviceSchemas = services.map((service) => ({
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: service.title,
    description: service.description,
    procedureType: service.title,
    medicalSpecialty: {
      '@type': 'MedicalSpecialty',
      name: 'Physical Therapy',
    },
    provider: {
      '@type': 'MedicalBusiness',
      name: 'פיזיותרפיה.פלוס',
      url: 'https://physio-plus.co.il',
    },
    url: `https://physio-plus.co.il/services#${service.id}`,
  }))

  return (
    <div className="bg-white">
      {serviceSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden py-12 sm:py-16" style={{ background: 'linear-gradient(to bottom right, #2A3080, #2080C0, #40C0F0)' }}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumbs items={[{ label: 'דף בית', href: '/' }, { label: 'שירותים', href: '/services' }]} />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">השירותים שלנו</h1>
          <p className="text-lg sm:text-xl text-white">מגוון רחב של שירותי פיזיותרפיה מקצועיים המותאמים לצרכי כל מטופל</p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}
              >
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4" style={{ color: '#2A3080' }}>
                    {service.title}
                  </h2>
                  <p className="text-lg sm:text-xl text-gray-700 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-6">
                    {service.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <svg className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: '#2080C0' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-lg text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href="/contact"
                      className="inline-block text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl text-center"
                      style={{ background: 'linear-gradient(to left, #2080C0, #2A3080)' }}
                    >
                      צור קשר
                    </Link>
                    <Link
                      href="/blog"
                      className="inline-block text-[#2080C0] border-2 border-[#2080C0] font-bold py-3 px-8 rounded-lg transition-all duration-200 hover:bg-[#2080C0] hover:text-white text-center"
                    >
                      קרא מאמרים
                    </Link>
                  </div>
                </div>
                <div className="flex-1 w-full">
                  <div className={`h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-xl shadow-xl overflow-hidden relative`}>
                    <ServiceImage
                      src={service.imagePath}
                      fallbackSrc={service.fallbackImagePath}
                      alt={service.title}
                      className="object-cover w-full h-full"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={index < 2}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-10 pointer-events-none`} aria-hidden="true"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-white" style={{ background: 'linear-gradient(to left, #2A3080, #2080C0)' }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            מוכנים להתחיל את תהליך השיקום?
          </h2>
          <p className="text-lg sm:text-xl mb-8 text-white">
            צרו איתנו קשר עוד היום וקבלו ייעוץ מקצועי
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-[#2A3080] hover:bg-blue-50 font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105 text-lg"
          >
            צור קשר
          </Link>
        </div>
      </section>
    </div>
  )
}
