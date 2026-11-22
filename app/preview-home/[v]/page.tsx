// TEMPORARY: full-page previews of the hero options for the owner. Remove before merging to main.
import type { Metadata } from 'next'
import HomePage from '@/components/home/HomePage'
import type { HeroVisualKind } from '@/components/home/HeroVisual'

export const metadata: Metadata = { robots: { index: false, follow: false } }

export function generateStaticParams() {
  return [{ v: 'photo' }, { v: 'body' }, { v: 'collage' }]
}

export default async function Page({ params }: { params: Promise<{ v: string }> }) {
  const { v } = await params
  const visual: HeroVisualKind = v === 'photo' || v === 'collage' ? v : 'body'
  return <HomePage visual={visual} />
}
