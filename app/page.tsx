import HeroSection from '@/components/HeroSection'
import ImageCarousel from '@/components/ImageCarousel'
import VideosSection from '@/components/VideosSection'
import InsuranceSection from '@/components/InsuranceSection'
import ServicesPreview from '@/components/ServicesPreview'
import AboutPreview from '@/components/AboutPreview'
import TestimonialsPreview from '@/components/TestimonialsPreview'
import FAQSection from '@/components/FAQSection'
import CTASection from '@/components/CTASection'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'פיזיותרפיה.פלוס - מכון פיזיותרפיה פרטי באשדוד | אנדריי מייזלס',
  description: 'פיזיותרפיה.פלוס - מכון פיזיותרפיה פרטי באשדוד. אנדריי מייזלס, פיזיותרפיסט מקצועי בעל תואר שני, פיזיותרפיסט לשעבר של נבחרת ישראל בג\'ודו, מתמחה בטיפול בכאבי גב, כתף, צוואר וברך, שיקום לאחר ניתוחים, שיקום וסטיבולרי וטיפול במפרק הלסת. מרכז כלניות, אשדוד. 050-883-8982',
  keywords: [
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
    canonical: 'https://physiotherapy.plus',
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
      <TestimonialsPreview />
      <FAQSection />
      <CTASection />
    </>
  )
}
