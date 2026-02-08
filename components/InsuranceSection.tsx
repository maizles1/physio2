import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

interface InsuranceOption {
  title: string
  description: string
  icon: React.ReactElement
  logoPath: string
  color: string
  bgColor: string
}

const insuranceOptions: InsuranceOption[] = [
  {
    title: 'עובדים עם מאוחדת',
    description: 'ניתן לקבל טיפולי פיזיותרפיה דרך המסלול הפרטי של הקופה.',
    icon: (
      <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    logoPath: '/images/insurance/Meuhedet-Logo.png',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    title: 'החזרים של הכללית',
    description: 'מטופלי קופת חולים כללית יכולים לקבל החזרים על טיפולי פיזיותרפיה לפי תנאי הביטוח המשלים שלהם.',
    icon: (
      <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    logoPath: '/images/insurance/Clalit-Logo.png',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    title: 'החזרים מביטוחים פרטיים',
    description: 'ביטוחים פרטיים ומשלימים כוללים לרוב כיסוי לטיפולי פיזיותרפיה. ניתן לבדוק עם הביטוח שלכם.',
    icon: (
      <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    logoPath: '/images/insurance/private-insurance-logo.svg',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    title: 'ספק של משרד הביטחון',
    description: 'הקליניקה מוכרת כספק של משרד הביטחון. נכי מלחמה ונפגעי פעולות איבה יכולים לקבל טיפול בקליניקה.',
    icon: (
      <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    logoPath: '/images/insurance/Ministry-of-defense-logo.png',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
]

export default function InsuranceSection() {
  return (
    <section className="section-spacing bg-white">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="mb-3 sm:mb-4 text-primary-dark">
              עם מי אנחנו עובדים
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
              הקליניקה עובדת עם קופות החולים וביטוחים שונים. בדקו את זכאותכם
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {insuranceOptions.map((option, index) => (
              <div
                key={index}
                className={`${option.bgColor} rounded-xl p-4 sm:p-6 border border-gray-200 hover:shadow-lg transition-shadow`}
              >
                <div className="mb-3 sm:mb-4 h-16 sm:h-20 md:h-24 flex items-center justify-center relative px-2 w-full" aria-hidden="true">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={option.logoPath}
                      alt={`${option.title} - לוגו`}
                      width={160}
                      height={64}
                      className="object-contain w-full h-full max-h-full max-w-full"
                      loading="lazy"
                      quality={90}
                    />
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900">
                  {option.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
                  {option.description}
                </p>
                <Link
                  href="/contact"
                  className={`${option.color} font-medium hover:opacity-80 transition-opacity inline-flex items-center gap-2 text-sm sm:text-base`}
                  aria-label={`${option.title} - לפרטים נוספים`}
                >
                  לפרטים נוספים
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
