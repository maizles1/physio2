import dynamic from 'next/dynamic'
import { HeroBold } from '@/components/home/HeroConcepts'
import { BoldAbout, BoldContact, BoldFAQ, BoldInsurance, BoldJudo, BoldPainPicker, BoldReviews } from '@/components/home/BoldSections'

// Videos are below the fold; reserve their height so the page doesn't jump.
const BoldVideos = dynamic(() => import('@/components/home/BoldVideos'), {
  loading: () => <section className="min-h-[640px] sm:min-h-[600px]" style={{ background: '#14161F' }} aria-hidden="true" />,
})

/** The homepage body: black poster hero, judo, then the matching sections. */
export default function HomePage() {
  return (
    <>
      <HeroBold theme="ink" layout="poster" />
      <BoldJudo />
      <BoldPainPicker />
      <BoldReviews />
      <BoldInsurance />
      <BoldAbout />
      <BoldVideos />
      <BoldFAQ />
      <BoldContact />
    </>
  )
}
