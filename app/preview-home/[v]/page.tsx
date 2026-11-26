// TEMPORARY: full-page previews of the hero designs for the owner. Remove before merging to main.
import type { Metadata } from 'next'
import HomePage from '@/components/home/HomePage'
import { heroRound2 } from '@/components/home/heroRound2'

export const metadata: Metadata = { robots: { index: false, follow: false } }

export function generateStaticParams() {
  return heroRound2.map((o) => ({ v: o.key }))
}

export default async function Page({ params }: { params: Promise<{ v: string }> }) {
  const { v } = await params
  const option = heroRound2.find((o) => o.key === v) ?? heroRound2[0]
  const { Hero } = option
  return <HomePage hero={<Hero />} highlights={!('highlights' in option && option.highlights === false)} />
}
