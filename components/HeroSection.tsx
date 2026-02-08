'use client'

import Link from 'next/link'
import Image from 'next/image'
import { gtag } from '@/components/GoogleAnalytics'

const whatsappNumber = '972508838982'
const whatsappMessage = encodeURIComponent('שלום, אני מעוניין/ת לקבוע תור')

export default function HeroSection() {
  const handleWhatsAppClick = () => {
    gtag.event('whatsapp_click', 'engagement', 'hero_section')
  }
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

      {/* Insurance Logos - Top Left */}
      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-20 flex flex-col gap-1 sm:gap-1.5">
        <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm rounded px-1.5 py-1 sm:px-2 sm:py-1.5 shadow-md">
          <Image
            src="/images/insurance/Clalit-Logo.png"
            alt="כללית"
            width={50}
            height={25}
            className="max-h-[30px] sm:max-h-[40px] md:max-h-[45px] w-auto object-contain opacity-90"
            loading="lazy"
            quality={90}
          />
        </div>
        <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm rounded px-1.5 py-1 sm:px-2 sm:py-1.5 shadow-md">
            <Image
            src="/images/insurance/Meuhedet-Logo.png"
            alt="מאוחדת"
            width={50}
            height={25}
            className="max-h-[30px] sm:max-h-[40px] md:max-h-[45px] w-auto object-contain opacity-90"
            loading="lazy"
            quality={90}
          />
        </div>
        <div className="flex items-center justify-center bg-white border border-white rounded px-1.5 py-1 sm:px-2 sm:py-1.5 shadow-lg">
            <Image
            src="/images/insurance/Ministry-of-defense-logo.png"
            alt="משרד הביטחון"
            width={50}
            height={25}
            className="max-h-[30px] sm:max-h-[40px] md:max-h-[45px] w-auto object-contain"
            loading="lazy"
            quality={90}
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
                  quality={90}
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
                פיזיותרפיה פרטית באשדוד - פיזיותרפיסט פרטי באשדוד: סטנדרט אולימפי. יחס אישי.
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

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 px-2">
            <Link
              href="/contact"
              className="btn btn-secondary btn-large w-full sm:w-auto"
              aria-label="קבע טיפול עכשיו"
            >
              קבע טיפול עכשיו
            </Link>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-white bg-[#25D366] hover:bg-[#20BD5A] transition-all duration-200 shadow-lg hover:shadow-xl border-0"
              aria-label="שלח הודעת WhatsApp"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>
          <p className="text-center text-white/90 text-sm mt-4 px-2">
            זמינות 24–48 שעות · מקצועי תואר שני
          </p>
        </div>
      </div>
    </section>
  )
}