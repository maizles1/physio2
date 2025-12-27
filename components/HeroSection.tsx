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
      <div className="absolute top-1 left-1 sm:top-2 sm:left-2 z-20 flex flex-col gap-0.5 sm:gap-1">
        <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm rounded px-0.5 py-0.5 sm:px-1 sm:py-1 shadow-md">
          <Image
            src="/images/insurance/Clalit-Logo.png"
            alt="כללית"
            width={18}
            height={9}
            className="max-h-[15px] sm:max-h-[25px] w-auto object-contain opacity-90"
            unoptimized
          />
        </div>
        <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm rounded px-0.5 py-0.5 sm:px-1 sm:py-1 shadow-md">
            <Image
            src="/images/insurance/Meuhedet-Logo.png"
            alt="מאוחדת"
            width={18}
            height={9}
            className="max-h-[15px] sm:max-h-[25px] w-auto object-contain opacity-90"
            unoptimized
          />
        </div>
        <div className="flex items-center justify-center bg-white border border-white rounded px-0.5 py-0.5 sm:px-1 sm:py-1 shadow-lg">
            <Image
            src="/images/insurance/Ministry-of-defense-logo.png"
            alt="משרד הביטחון"
            width={18}
            height={9}
            className="max-h-[15px] sm:max-h-[25px] w-auto object-contain"
            unoptimized
          />
        </div>
      </div>

      <div className="container relative z-10 pt-12 sm:pt-16">
        <div className="max-w-6xl mx-auto">
          {/* Header with Image and Title */}
          <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-10 mb-8 sm:mb-12">
            {/* Image */}
            <div className="flex-shrink-0 order-1 lg:order-1">
              <div className="relative w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl bg-white/10">
                <Image
                  src="/images/andrey-meizels.JPG"
                  alt="אנדריי מייזלס, פיזיותרפיסט מקצועי"
                  fill
                  className="object-cover w-full h-full"
                  sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, (max-width: 1024px) 256px, 320px"
                  priority
                  unoptimized
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
            <div className="flex-1 text-center lg:text-right order-2 lg:order-2 px-2 sm:pr-20 md:pr-24 sm:pl-0 md:pl-28">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8 leading-tight sm:leading-relaxed tracking-wide text-white">
                פיזיותרפיסט פרטי באשדוד-  סטנדרט אולימפי. יחס אישי.
              </h1>
              <div className="max-w-3xl mx-auto lg:mx-0 lg:mr-0 mt-6 sm:mt-8 space-y-4 sm:space-y-6">
                <h2 className="mb-4 sm:mb-6 text-white leading-relaxed">
                  הידיים שטיפלו בנבחרת ישראל ב<span className="font-bold highlight-judo">ג&apos;ודו</span> – עכשיו זמינות לכאב שלך
                </h2>
                <div className="space-y-4 text-white leading-relaxed sm:leading-loose">
                  <p className="text-base sm:text-large">
                    כאב לא חייב לנהל לך את החיים. בקליניקה תקבל את הסטנדרט המקצועי של נבחרת ישראל: אבחון קליני, חשיבה רפואית מתקדמת והתאמה אישית של הטיפול.
                  </p>
                  <p className="text-base sm:text-large">
                    אני לא מוכר אשליות ולא מבטיח קסמים, אבל אני מתחייב לדבר אחד: 100% מהידע, הניסיון והמאמץ שלי מושקעים בשיקום שלך, בדיוק כפי שהייתי משקיע בספורטאי אולימפי.
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
              aria-label="צור קשר עוד היום"
            >
              צור קשר עוד היום
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}