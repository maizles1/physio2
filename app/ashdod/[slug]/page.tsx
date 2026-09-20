import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import NeighborhoodLandingPage from '@/components/NeighborhoodLandingPage'
import {
  getNeighborhoodPage,
  getNeighborhoodPageUrl,
  neighborhoodPages,
} from '@/config/neighborhood-pages.config'
import { getGeoMeta } from '@/config/geo.config'

export const dynamicParams = false

type NeighborhoodSlugPageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return neighborhoodPages.map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({ params }: NeighborhoodSlugPageProps): Promise<Metadata> {
  const { slug } = await params
  const page = getNeighborhoodPage(slug)

  if (!page) {
    return { title: 'אזור לא נמצא' }
  }

  const url = getNeighborhoodPageUrl(page.slug)
  const image = 'https://physio-plus.co.il/images/logo/clinic-logo.png'

  return {
    title: page.title,
    description: page.metaDescription,
    keywords: page.keywords,
    openGraph: {
      title: `${page.title} | פיזיותרפיה.פלוס`,
      description: page.metaDescription,
      url,
      type: 'website',
      locale: 'he_IL',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: page.h1,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${page.title} | פיזיותרפיה.פלוס`,
      description: page.metaDescription,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
    other: getGeoMeta(),
  }
}

export default async function NeighborhoodSlugPage({ params }: NeighborhoodSlugPageProps) {
  const { slug } = await params
  const page = getNeighborhoodPage(slug)

  if (!page) {
    notFound()
  }

  return <NeighborhoodLandingPage page={page} />
}
