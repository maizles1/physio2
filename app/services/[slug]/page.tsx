import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ServiceLandingPage from '@/components/ServiceLandingPage'
import {
  absUrl,
  getServiceLandingPage,
  serviceLandingPages,
} from '@/config/service-pages.config'
import { getGeoMeta } from '@/config/geo.config'

export const dynamicParams = false

type ServicePageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return serviceLandingPages.map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const page = getServiceLandingPage(slug)

  if (!page) {
    return { title: 'שירות לא נמצא' }
  }

  const url = absUrl(`/services/${page.slug}`)
  const image = absUrl(page.imagePath)

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
          alt: page.imageAlt,
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

export default async function ServiceSlugPage({ params }: ServicePageProps) {
  const { slug } = await params
  const page = getServiceLandingPage(slug)

  if (!page) {
    notFound()
  }

  return <ServiceLandingPage page={page} />
}
