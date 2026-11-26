import HeroSection from '@/components/HeroSection'
import type { HeroVisualKind } from '@/components/home/HeroVisual'
import { HomeHighlights, HomePainPicker, HomeSteps } from '@/components/home/HomeSections'
import dynamic from 'next/dynamic'
import { ImageSkeleton } from '@/components/LoadingSkeleton'

// Lazy load heavy components below the fold
const VideosSection = dynamic(() => import('@/components/VideosSection'), {
  loading: () => (
    <section className="section-spacing bg-white">
      <div className="container">
        <ImageSkeleton className="w-full" aspectRatio="16/9" />
      </div>
    </section>
  ),
})

const InsuranceSection = dynamic(() => import('@/components/InsuranceSection'))
const AboutPreview = dynamic(() => import('@/components/AboutPreview'))
const TestimonialsPreview = dynamic(() => import('@/components/TestimonialsPreview'))
const FAQSection = dynamic(() => import('@/components/FAQSection'))
const CTASection = dynamic(() => import('@/components/CTASection'))


/** Homepage body, shared by the homepage and the draft previews. */
export default function HomePage({
  visual = 'body',
  hero,
  highlights = true,
}: {
  visual?: HeroVisualKind
  hero?: React.ReactNode
  highlights?: boolean
}) {
  return (
    <>
      {hero ?? <HeroSection visual={visual} />}
      {highlights && <HomeHighlights />}
      <HomePainPicker />
      <TestimonialsPreview />
      <HomeSteps />
      <InsuranceSection />
      <AboutPreview />
      <VideosSection />
      <FAQSection />
      <CTASection />
    </>
  )
}
