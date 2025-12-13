'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="relative text-white overflow-hidden bg-primary-gradient section-spacing">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Insurance Logos - Top Left - קטן */}
      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 flex flex-col gap-1 sm:gap-1.5 hidden sm:flex">
        <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-md px-1.5 sm:px-2 py-1 sm:py-1.5 shadow-md">
          <Image
            src="/images/insurance/Clalit-Logo.png"
            alt="כללית"
            width={40}
            height={20}
            className="max-h-[60px] w-auto object-contain opacity-90"
            style={{ maxHeight: '60px', width: 'auto', height: 'auto' }}
            unoptimized
          />
        </div>
        <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-md px-1.5 sm:px-2 py-1 sm:py-1.5 shadow-md">
            <Image
            src="/images/insurance/Meuhedet-Logo.png"
            alt="מאוחדת"
            width={40}
            height={20}
            className="max-h-[60px] w-auto object-contain opacity-90"
            unoptimized
          />
        </div>
        <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-md px-1.5 sm:px-2 py-1 sm:py-1.5 shadow-md">
            <Image
            src="/images/insurance/Ministry-of-defense-logo.png"
            alt="משרד הביטחון"
            width={40}
            height={20}
            className="max-h-[60px] w-auto object-contain opacity-90"
            unoptimized
          />
        </div>
      </div>

      <div className="container relative z-10 pt-16 sm:pt-20">
        <div className="max-w-6xl mx-auto">
          {/* Header with Image and Title */}
          <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-10 mb-8 sm:mb-12">
            {/* Image */}
            <div className="flex-shrink-0 order-2 lg:order-1">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl bg-white/10">
                <Image
                  src="/images/andrey-meizels.JPG"
                  alt="אנדריי מייזלס, פיזיותרפיסט מקצועי"
                  width={320}
                  height={320}
                  className="w-full h-full object-cover"
                  priority
                  sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, (max-width: 1024px) 256px, 320px"
                  onError={(e) => {
                    // Fallback to placeholder if image doesn't exist
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    if (target.nextElementSibling) {
                      (target.nextElementSibling as HTMLElement).style.display = 'flex'
                    }
                  }}
                />
                <div className="w-full h-full hidden items-center justify-center" role="img" aria-label="אנדריי מייזלס, פיזיותרפיסט מקצועי">
                  <div className="text-center text-white">
                    <svg className="w-24 h-24 mx-auto mb-2 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <p className="text-sm opacity-75">תמונת אנדריי מייזלס</p>
                    <p className="text-xs opacity-50 mt-1">הוסף תמונה: /public/images/andrey-meizels.jpg</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Title and Description */}
            <div className="flex-1 text-center lg:text-right order-1 lg:order-2 pr-16 sm:pr-20 md:pr-24">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-relaxed tracking-wide px-2 text-white">
                פיזיותרפיסט פרטי באשדוד
              </h1>
              <div className="max-w-3xl mx-auto lg:mr-0 mt-4 sm:mt-6 px-2">
                <h2 className="mb-6 sm:mb-8 text-white leading-relaxed text-lg sm:text-xl">
                  אנדריי מייזלס | פיזיותרפיסט נבחרת ישראל בג׳ודו (לשעבר) | תואר שני בפיזיותרפיה
                </h2>
                <div className="hero-bio">
                  <p className="text-lg leading-relaxed mb-6 text-white">
                    אני מספק טיפול פיזיותרפי אישי ומדויק, המבוסס על פרוטוקולים קליניים עדכניים ושיטות שיקום של ספורטאי עילית. 
                    הטיפול מותאם פרטני לכל מטופל, עם דגש על אבחון עומק ותוצאות שנמדדות בשיפור תפקודי משמעותי.
                  </p>
                  
                  <ul className="benefits-list space-y-3 mb-6 text-white">
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 flex-shrink-0">✔️</span>
                      <div>
                        <strong>גישה קלינית מדויקת:</strong> אבחון מקצועי, זיהוי המקור הפיזיולוגי לפציעה ושילוב פתרונות טיפוליים מבוססי ראיות.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 flex-shrink-0">✔️</span>
                      <div>
                        <strong>שיקום מותאם אישית:</strong> שילוב טכניקות מנואליות (ידניות) מתקדמות, תרגול מובנה ושיקום אקטיבי להאצת ההחלמה.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 flex-shrink-0">✔️</span>
                      <div>
                        <strong>מעטפת מלאה:</strong> ליווי מקצועי צמוד, זמינות גבוהה לתורים וסיוע בקבלת החזרים מהביטוח.
                      </div>
                    </li>
                  </ul>

                  <p className="font-medium text-lg border-t border-white/20 pt-4 mt-4 inline-block text-white">
                    לכל מטופל אני מתייחס כאל שותף בתהליך — מהאבחון הראשוני ועד לחזרה לפעילות מלאה.
                    <br />
                    <span className="font-bold text-xl block mt-2">סטנדרט אולימפי. יחס אישי.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center items-center px-2">
            <Link
              href="/contact"
              className="btn btn-secondary btn-large w-full sm:w-auto"
              aria-label="בוא נתחיל. שריין תור"
            >
              בוא נתחיל. שריין תור
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}