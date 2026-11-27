// TEMPORARY: gallery of hero designs for the owner. Remove before merging to main.
import type { Metadata } from 'next'
import Link from 'next/link'
import { heroRound2 } from '@/components/home/heroRound2'

export const metadata: Metadata = { title: 'אפשרויות לראש דף הבית', robots: { index: false, follow: false } }

export default function HeroGallery() {
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-6 text-center">
        <h1 className="text-2xl font-bold text-[#2A3080] mb-1">שני קונספטים חדשים (למעלה) + הסבבים הקודמים</h1>
        <div className="text-gray-700">גללו למטה. כל עיצוב מסומן במספר. מתחת לכל אחד יש קישור לכל דף הבית איתו.</div>
      </div>
      {heroRound2.filter((o) => o.Hero).map(({ key, name, text, Hero }, i) => (
        <section key={key} className="mb-10">
          <div className="bg-[#F59E0B] px-4 py-3 text-center text-white shadow-md">
            <div className="text-xl font-extrabold">עיצוב {i + 1}: {name}</div>
            <div className="text-sm font-medium">{text}</div>
          </div>
          {Hero && <Hero />}
          <div className="bg-white py-4 text-center">
            <Link href={`/preview-home/${key}`} className="font-bold text-[#1a6ea5] underline underline-offset-4">
              לראות את כל דף הבית עם עיצוב {i + 1}
            </Link>
          </div>
        </section>
      ))}
    </div>
  )
}
