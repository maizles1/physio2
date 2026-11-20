import Image from 'next/image'
import { Phone, MessageCircle } from 'lucide-react'
import MeuhedetContactLink from '@/components/MeuhedetContactLink'
import HeroLeadLink from '@/components/home/HeroLeadLink'
import { seoConfig, getContactPhoneTel } from '@/config/seo.config'
import { GOOGLE_RATING_DISPLAY } from '@/config/google-business.config'

const PAGE = 'home'
const whatsappHref = `https://wa.me/972508838982?text=${encodeURIComponent('שלום, אשמח לתאם אבחון')}`

const STAR_PATH =
  'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'

export default function HeroSection() {
  return (
    <section
      className="relative text-white overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1b2063 0%, #2A3080 45%, #2080C0 100%)' }}
    >
      <svg className="pointer-events-none absolute -left-40 -top-40 h-[640px] w-[640px] opacity-[0.08]" viewBox="0 0 640 640" fill="none" aria-hidden="true">
        {[300, 240, 180, 120, 60].map((r) => (
          <circle key={r} cx="320" cy="320" r={r} stroke="#ffffff" strokeWidth="2" />
        ))}
      </svg>

      <div className="container mx-auto px-4 relative z-10 pt-5 pb-20 sm:pt-12 sm:pb-24 lg:pt-14 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          {/* Text */}
          <div className="order-2 lg:order-1">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/25 px-3.5 py-1 text-sm font-semibold text-white mb-3">
              פיזיותרפיה.פלוס · מרכז כלניות, אשדוד
            </p>
            <h1 className="text-[2rem] sm:text-4xl lg:text-5xl font-bold mb-3 text-white leading-tight">
              פיזיותרפיסט פרטי באשדוד
            </h1>
            <p className="text-lg sm:text-xl font-semibold text-[#9fd6f7] mb-3">שיקום ברמה אולימפית</p>
            <p className="text-base sm:text-lg text-white/95 leading-relaxed mb-6 max-w-xl">
              אנדריי מייזלס (M.Sc), לשעבר הפיזיותרפיסט של נבחרת ישראל בג&apos;ודו. כאבי גב, צוואר, כתף וברך, שיקום
              אחרי ניתוח, ורטיגו ומפרק הלסת. כבר במפגש הראשון יודעים מה הבעיה ומה התוכנית.
            </p>

            <div className="grid grid-cols-1 sm:flex sm:flex-row gap-3">
              <MeuhedetContactLink
                page={PAGE}
                type="phone"
                href={`tel:${getContactPhoneTel()}`}
                section="hero"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-base font-bold text-[#2A3080] shadow-lg hover:bg-gray-100 transition-colors"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                התקשרו: {seoConfig.contact.phone}
              </MeuhedetContactLink>
              <MeuhedetContactLink
                page={PAGE}
                type="whatsapp"
                href={whatsappHref}
                section="hero"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-7 py-3.5 text-base font-bold text-white shadow-md hover:bg-[#1ebe57] transition-colors"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                כתבו ב-WhatsApp
              </MeuhedetContactLink>
            </div>
            <HeroLeadLink />
          </div>

          {/* Photo */}
          <div className="order-1 lg:order-2">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative aspect-[16/9] sm:aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/20 bg-[#1b2063]">
                <Image
                  src="/images/andrey-meizels.JPG"
                  alt="אנדריי מייזלס (M.Sc), פיזיותרפיסט פרטי באשדוד ומנהל קליני של פיזיותרפיה.פלוס"
                  fill
                  priority
                  className="object-cover object-[50%_25%]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-4 right-4 flex items-center gap-3 rounded-2xl bg-white px-4 py-2.5 shadow-xl">
                <div className="text-2xl font-extrabold leading-none text-[#2A3080]">{GOOGLE_RATING_DISPLAY}</div>
                <div>
                  <span className="inline-flex gap-0.5" aria-hidden="true">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <svg key={i} className="w-4 h-4" viewBox="0 0 20 20" fill="#FBBF24">
                        <path d={STAR_PATH} />
                      </svg>
                    ))}
                  </span>
                  <div className="text-xs font-medium text-gray-600">ביקורות מטופלים בגוגל</div>
                </div>
              </div>
              <div className="absolute -bottom-4 left-4 hidden sm:block w-28 overflow-hidden rounded-2xl border-4 border-white shadow-xl">
                <div className="relative aspect-square">
                  <Image
                    src="/images/carousel/clinic-5.jpg"
                    alt="אנדריי מייזלס עם נבחרת ישראל בג'ודו באליפות העולם"
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
