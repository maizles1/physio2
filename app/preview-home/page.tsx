// TEMPORARY: side-by-side gallery of hero options for the owner. Remove before merging to main.
import type { Metadata } from 'next'
import Link from 'next/link'
import HeroSection from '@/components/HeroSection'
import { heroOptions } from '@/components/home/heroOptions'

export const metadata: Metadata = { title: 'אפשרויות לראש דף הבית', robots: { index: false, follow: false } }

export default function HeroGallery() {
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-6 text-center">
        <h1 className="text-2xl font-bold text-[#2A3080] mb-1">7 אפשרויות לראש דף הבית</h1>
        <p className="text-gray-700">גללו למטה. כל אפשרות מסומנת במספר. מתחת לכל אחת יש קישור לכל העמוד איתה.</p>
      </div>
      {heroOptions.map((o, i) => (
        <section key={o.kind} className="mb-10">
          <div className="bg-[#F59E0B] px-4 py-3 text-center text-white shadow-md">
            <div className="text-xl font-extrabold">אפשרות {i + 1}: {o.name}</div>
            <div className="text-sm font-medium">{o.text}</div>
          </div>
          <HeroSection visual={o.kind} />
          <div className="bg-white py-4 text-center">
            <Link href={`/preview-home/${o.kind}`} className="font-bold text-[#1a6ea5] underline underline-offset-4">
              לראות את כל דף הבית עם אפשרות {i + 1}
            </Link>
          </div>
        </section>
      ))}
    </div>
  )
}
