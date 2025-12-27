import HeroSection from '@/components/HeroSection'
import ImageCarousel from '@/components/ImageCarousel'
import VideosSection from '@/components/VideosSection'
import InsuranceSection from '@/components/InsuranceSection'
import ServicesPreview from '@/components/ServicesPreview'
import AboutPreview from '@/components/AboutPreview'
import FAQSection from '@/components/FAQSection'
import CTASection from '@/components/CTASection'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'פיזיותרפיסט פרטי באשדוד | פיזיותרפיה.פלוס - אנדריי מייזלס',
  description: 'פיזיותרפיסט פרטי מומלץ באשדוד. אנדריי מייזלס, פיזיותרפיסט מקצועי בעל תואר שני, פיזיותרפיסט לשעבר של נבחרת ישראל בג\'ודו. מכון פיזיותרפיה פרטי באשדוד במרכז כלניות. טיפול בכאבי גב, כתף, צוואר וברך, שיקום לאחר ניתוחים, שיקום וסטיבולרי וטיפול במפרק הלסת. 050-883-8982',
  keywords: [
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
      <InsuranceSection />
      <ServicesPreview />
      <AboutPreview />
      <FAQSection />
      <CTASection />
    </>
  )
}
