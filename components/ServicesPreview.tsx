import Link from 'next/link'
import Image from 'next/image'

const services = [
  {
    title: 'טיפול בכאבי שלד שריר',
    description: 'טיפול מקצועי ומקיף בכאבי גב, כתף, צוואר, ברך ומפרקים אחרים. טיפול מותאם אישית לכל מטופל',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    href: '/services',
    color: 'from-[#2080C0] to-[#2A3080]',
    imagePath: '/images/services/back-pain/service-image.jpg',
  },
  {
    title: 'שיקום מניתוחים',
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
    title: 'טיפול בסחרחורות',
    description: 'טיפול מקצועי בסחרחורות, ורטיגו ובעיות שיווי משקל באמצעות שיקום וסטיבולרי מתקדם',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    href: '/services#vestibular',
    color: 'from-[#2080C0] to-[#40C0F0]',
    imagePath: '/images/services/vestibular/service-image.jpg',
  },
  {
    title: 'שיקום מפרק לסת',
    description: 'טיפול מקצועי בכאבי לסת, נעילת לסת, בעיות במפרק הטמפורומנדיבולרי (TMJ) וקשיי לעיסה',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    href: '/services#tmj',
    color: 'from-[#40C0F0] to-[#2A3080]',
    imagePath: '/images/services/tmj/service-image.jpg',
  },
  {
    title: 'ביקורי בית באשדוד',
    description: 'שירותי פיזיותרפיה מקצועיים בביקורי בית באשדוד והסביבה. טיפול מקצועי בנוחות הבית שלך',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    href: '/services',
    color: 'from-[#004080] to-[#2080C0]',
    imagePath: '/images/carousel/clinic-1.jpg',
  },
]

export default function ServicesPreview() {
  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            השירותים שלנו
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            אנו מציעים מגוון רחב של שירותי פיזיותרפיה מקצועיים המותאמים לצרכי כל מטופל
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
            className="btn btn-primary"
            aria-label="צפה בכל השירותים שלנו"
          >
            צפה בכל השירותים
          </Link>
        </div>
      </div>
    </section>
  )
}
