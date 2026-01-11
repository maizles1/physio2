import HeroSection from '@/components/HeroSection'
import dynamic from 'next/dynamic'
import { Metadata } from 'next'

// Lazy load heavy components below the fold
const ImageCarousel = dynamic(() => import('@/components/ImageCarousel'), {
  loading: () => (
    <section className="section-spacing bg-gray-50">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="h-[400px] sm:h-[500px] md:h-[550px] bg-gray-200 rounded-lg animate-pulse" />
        </div>
      </div>
    </section>
  ),
})

const VideosSection = dynamic(() => import('@/components/VideosSection'), {
  loading: () => (
    <section className="section-spacing bg-white">
      <div className="container">
        <div className="h-64 bg-gray-100 rounded-lg animate-pulse" />
      </div>
    </section>
  ),
})

const InsuranceSection = dynamic(() => import('@/components/InsuranceSection'))
const ServicesPreview = dynamic(() => import('@/components/ServicesPreview'))
const AboutPreview = dynamic(() => import('@/components/AboutPreview'))
const TestimonialsPreview = dynamic(() => import('@/components/TestimonialsPreview'))
const FAQSection = dynamic(() => import('@/components/FAQSection'))
const CTASection = dynamic(() => import('@/components/CTASection'))

export const metadata: Metadata = {
  title: 'פיזיותרפיסט פרטי באשדוד | פיזיותרפיה.פלוס - אנדריי מייזלס',
  description: 'פיזיותרפיה פרטית באשדוד - פיזיותרפיסט פרטי מומלץ באשדוד. אנדריי מייזלס, פיזיותרפיסט מקצועי בעל תואר שני, פיזיותרפיסט לשעבר של נבחרת ישראל בג\'ודו. מכון פיזיותרפיה פרטי באשדוד במרכז כלניות. טיפול בכאבי גב, כתף, צוואר וברך, שיקום לאחר ניתוחים, שיקום וסטיבולרי וטיפול במפרק הלסת. 050-883-8982',
  keywords: [
    'פיזיותרפיה פרטית באשדוד',
    'פיזיותרפיסט פרטי באשדוד',
    'פיזיותרפיסט מומלץ באשדוד',
    'מכון פיזיותרפיה פרטי באשדוד',
    'פיזיותרפיה',
    'פיזיותרפיה.פלוס',
    'מכון פיזיותרפיה פרטי',
    'פיזיותרפיסט באשדוד',
    'אנדריי מייזלס',
    'טיפול בכאבי גב',
    'טיפול בכאבי כתף',
    'טיפול בכאבי צוואר',
    'טיפול בכאבי ברך',
    'שיקום לאחר ניתוחים',
    'שיקום וסטיבולרי',
    'טיפול בסחרחורות',
    'טיפול במפרק הלסת',
    'TMJ',
    'אשדוד',
  ],
  openGraph: {
    title: 'פיזיותרפיסט פרטי באשדוד | פיזיותרפיה.פלוס - אנדריי מייזלס',
    description: 'פיזיותרפיה פרטית באשדוד - פיזיותרפיסט פרטי מומלץ באשדוד. אנדריי מייזלס, פיזיותרפיסט מקצועי בעל תואר שני, פיזיותרפיסט לשעבר של נבחרת ישראל בג\'ודו.',
    url: 'https://physio-plus.co.il',
    images: [
      {
        url: 'https://physio-plus.co.il/images/og/home.jpg',
        width: 1200,
        height: 630,
        alt: 'פיזיותרפיה.פלוס - פיזיותרפיסט פרטי באשדוד',
      },
    ],
  },
  alternates: {
    canonical: 'https://physio-plus.co.il',
  },
  other: {
    'geo.region': 'IL',
    'geo.placename': 'אשדוד',
    'geo.position': '31.8044;34.6553',
    'ICBM': '31.8044, 34.6553',
  },
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <ImageCarousel />
      <VideosSection />
      <TestimonialsPreview />
      <InsuranceSection />
      <ServicesPreview />
      <AboutPreview />
      <FAQSection />
      <CTASection />
    </>
  )
}
