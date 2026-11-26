// TEMPORARY: full-page previews of the hero options for the owner. Remove before merging to main.
import type { Metadata } from 'next'
import HomePage from '@/components/home/HomePage'
import { heroOptions } from '@/components/home/heroOptions'

export const metadata: Metadata = { robots: { index: false, follow: false } }

export function generateStaticParams() {
  return heroOptions.map((o) => ({ v: o.kind }))
}

export default async function Page({ params }: { params: Promise<{ v: string }> }) {
  const { v } = await params
  const option = heroOptions.find((o) => o.kind === v) ?? heroOptions[0]
  return <HomePage visual={option.kind} />
}
