'use client'

import Link from 'next/link'
import { neighborhoodHub, neighborhoodPages } from '@/config/neighborhood-pages.config'

type NeighborhoodHubLinksProps = {
  variant?: 'cards' | 'list'
  heading?: string
  intro?: string
  excludeSlug?: string
  showHubLink?: boolean
}

export default function NeighborhoodHubLinks({
  variant = 'cards',
  heading = 'פיזיותרפיה באשדוד לפי אזור',
  intro = 'הקליניקה במרכז כלניות. בחרו את הרובע שלכם להנחיות הגעה ולשירותים הרלוונטיים.',
  excludeSlug,
  showHubLink = true,
}: NeighborhoodHubLinksProps) {
  const pages = excludeSlug
    ? neighborhoodPages.filter((page) => page.slug !== excludeSlug)
    : neighborhoodPages

  if (variant === 'list') {
    return (
      <nav aria-label="אזורי פיזיותרפיה באשדוד">
        <p className="font-bold text-gray-900 mb-2">{heading}</p>
        <ul className="space-y-2">
          <li>
            <Link href={neighborhoodHub.path} className="text-[#2080C0] font-medium hover:underline">
              כל האזורים באשדוד
            </Link>
          </li>
          {pages.map((page) => (
            <li key={page.slug}>
              <Link href={`/ashdod/${page.slug}`} className="text-[#2080C0] font-medium hover:underline">
                {page.navTitle}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    )
  }

  return (
    <section className="py-12 bg-gray-50" aria-labelledby="ashdod-areas-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 id="ashdod-areas-heading" className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: '#2A3080' }}>
              {heading}
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl">{intro}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pages.map((page) => (
              <article
                key={page.slug}
                className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  <Link href={`/ashdod/${page.slug}`} className="hover:text-[#2080C0] transition-colors">
                    {page.navTitle}
                  </Link>
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">{page.cardDescription}</p>
                <Link href={`/ashdod/${page.slug}`} className="text-[#2080C0] font-semibold hover:underline">
                  לפיזיותרפיה ב{page.navTitle} ←
                </Link>
              </article>
            ))}
          </div>
          {showHubLink ? (
            <p className="mt-6">
              <Link href={neighborhoodHub.path} className="text-[#2080C0] font-semibold hover:underline">
                לכל דפי האזור באשדוד
              </Link>
            </p>
          ) : null}
        </div>
      </div>
    </section>
  )
}
