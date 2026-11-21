import { Phone, MessageCircle } from 'lucide-react'
import MeuhedetContactLink from '@/components/MeuhedetContactLink'
import HeroLeadLink from '@/components/home/HeroLeadLink'
import { seoConfig, getContactPhoneTel } from '@/config/seo.config'
import HeroVisual, { type HeroVisualKind } from '@/components/home/HeroVisual'

const PAGE = 'home'
const whatsappHref = `https://wa.me/972508838982?text=${encodeURIComponent('שלום, אשמח לתאם אבחון')}`

export default function HeroSection({ visual = 'photo' }: { visual?: HeroVisualKind }) {
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
              מכון פיזיותרפיה פרטי באשדוד
            </h1>
            <p className="text-lg sm:text-xl font-semibold text-[#9fd6f7] mb-3">שיקום ברמה אולימפית</p>
            <p className="text-base sm:text-lg text-white/95 leading-relaxed mb-6 max-w-xl">
              צוות פיזיותרפיסטים בניהולו הקליני של אנדריי מייזלס (M.Sc), לשעבר פיזיותרפיסט נבחרת ישראל בג&apos;ודו.
              כאבי גב, צוואר, כתף וברך, שיקום אחרי ניתוח, ורטיגו ומפרק הלסת. כבר במפגש הראשון יודעים מה הבעיה ומה
              התוכנית.
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

          <div className="order-1 lg:order-2">
            <HeroVisual kind={visual} />
          </div>
        </div>
      </div>
    </section>
  )
}
