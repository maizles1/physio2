'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="relative text-white overflow-hidden" style={{ background: 'linear-gradient(to bottom right, #2A3080, #2080C0, #40C0F0)' }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Insurance Logos - Top Left */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 flex flex-col gap-2 sm:gap-3">
        <div className="flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 shadow-lg">
          <Image
            src="/images/insurance/Clalit-Logo.svg.png"
            alt="כללית"
            width={40}
            height={20}
            className="h-4 sm:h-5 w-auto object-contain opacity-90"
            unoptimized
          />
        </div>
        <div className="flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 shadow-lg">
          <Image
            src="/images/insurance/Meuhedet-Logo.png"
            alt="מאוחדת"
            width={40}
            height={20}
            className="h-4 sm:h-5 w-auto object-contain opacity-90"
            unoptimized
          />
        </div>
        <div className="flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 shadow-lg">
          <Image
            src="/images/insurance/Ministry-of-defense-logo.png"
            alt="משרד הביטחון"
            width={40}
            height={20}
            className="h-4 sm:h-5 w-auto object-contain opacity-90"
            unoptimized
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 sm:py-16 md:py-20 lg:py-24 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header with Image and Title */}
          <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 mb-8 sm:mb-12">
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
            <div className="flex-1 text-center lg:text-right order-1 lg:order-2">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 leading-tight px-2">
                פיזיותרפיה.פלוס<br />
                <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-blue-50 font-semibold">מקצוענות שמרגישים בגוף</span>
              </h1>
              <div className="max-w-2xl mx-auto lg:mr-0 mt-4 sm:mt-6 px-2">
                <p className="text-base sm:text-lg md:text-xl text-blue-50 leading-relaxed mb-3 sm:mb-4">
                  אנדריי מייזלס - פיזיותרפיסט מקצועי בעל תואר שני, פיזיותרפיסט לשעבר של נבחרת ישראל בג&apos;ודו, עם ניסיון עשיר בטיפול ושיקום. מתמחה בטיפול בכאבי גב, כתף, צוואר וברך, שיקום לאחר ניתוחים, שיקום וסטיבולרי וטיפול במפרק הלסת.
                </p>
                <p className="text-sm sm:text-base md:text-lg text-blue-100 leading-relaxed">
                  עם גישה מקצועית ומותאמת אישית, אני מסייע למטופליי להשיג שיפור משמעותי בתפקוד ואיכות החיים. כל טיפול מותאם אישית למטופל ומבוצע בצורה מקצועית וקפדנית.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-2">
            <Link
              href="/services"
              className="bg-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105 text-base sm:text-lg w-full sm:w-auto text-center"
              style={{ color: '#2A3080' }}
              aria-label="צפה בכל השירותים שלנו"
            >
              השירותים שלנו
            </Link>
            <Link
              href="/contact"
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105 text-base sm:text-lg w-full sm:w-auto border-2 border-white/30 text-center"
              aria-label="צור קשר איתנו"
            >
              צור קשר
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
