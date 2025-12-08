import Link from 'next/link'
import Image from 'next/image'

const services = [
  {
    title: 'טיפול בכאבי גב',
    description: 'טיפול מקצועי ומקיף בכאבי גב אקוטיים וכרוניים, כולל כאבי גב תחתון, עליון ומתיחה בגב',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    href: '/services#back-pain',
    color: 'from-[#2080C0] to-[#2A3080]',
    imagePath: '/images/services/back-pain/service-image.jpg',
  },
  {
    title: 'טיפול בכאבי כתף',
    description: 'שיקום וטיפול בכאבי כתף, בעיות מפרק הכתף, דלקות גידים ופציעות כתף שונות',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    href: '/services#shoulder-pain',
    color: 'from-[#40C0F0] to-[#2080C0]',
    imagePath: '/images/services/shoulder-pain/service-image.jpg',
  },
  {
    title: 'טיפול בכאבי צוואר',
    description: 'טיפול מקצועי ומקיף בכאבי צוואר, בעיות מפרק הצוואר, שרירים ורקמות רכות',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    href: '/services#neck-pain',
    color: 'from-[#004080] to-[#2080C0]',
    imagePath: '/images/services/neck-pain/service-image.jpg',
  },
  {
    title: 'טיפול בכאבי ברך',
    description: 'טיפול מקצועי ומקיף בכאבי ברך, בעיות מפרק הברך, פציעות ודלקות',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    href: '/services#knee-pain',
    color: 'from-[#2080C0] to-[#40C0F0]',
    imagePath: '/images/services/knee-pain/service-image.jpg',
  },
  {
    title: 'שיקום לאחר ניתוחים',
    description: 'תוכניות שיקום מותאמות אישית לאחר ניתוחים אורטופדיים, כולל ניתוחי מפרקים, שברים וניתוחי עמוד שדרה',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    href: '/services#post-surgery',
    color: 'from-[#2A3080] to-[#004080]',
    imagePath: '/images/services/post-surgery/service-image.jpg',
  },
  {
    title: 'שיקום וסטיבולרי - טיפול בסחרחורות',
    description: 'טיפול מקצועי בסחרחורות, ורטיגו ובעיות שיווי משקל באמצעות שיקום וסטיבולרי מתקדם',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    href: '/services#vestibular',
    color: 'from-[#2080C0] to-[#40C0F0]',
    imagePath: '/images/services/vestibular/service-image.jpg',
  },
  {
    title: 'טיפול במפרק הלסת (TMJ)',
    description: 'טיפול מקצועי בכאבי לסת, נעילת לסת, בעיות במפרק הטמפורומנדיבולרי וקשיי לעיסה',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    href: '/services#tmj',
    color: 'from-[#40C0F0] to-[#2A3080]',
    imagePath: '/images/services/tmj/service-image.jpg',
  },
]

export default function ServicesPreview() {
  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            השירותים שלנו
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            אנו מציעים מגוון רחב של שירותי פיזיותרפיה מקצועיים המותאמים לצרכי כל מטופל
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link
              key={index}
              href={service.href}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-blue-300"
              aria-label={`${service.title} - ${service.description}. למידע נוסף`}
            >
              {/* תמונה קטנה */}
              <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 w-full overflow-hidden">
                <Image
                  src={service.imagePath}
                  alt={service.title}
                  fill
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
              </div>
              
              {/* תוכן */}
              <div className="p-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                  <div aria-hidden="true">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-4 text-blue-600 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                  <span>למידע נוסף</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            aria-label="צפה בכל השירותים שלנו"
          >
            צפה בכל השירותים
          </Link>
        </div>
      </div>
    </section>
  )
}
