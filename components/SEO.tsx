/**
 * קומפוננטה SEO גנרית לשימוש בכל עמוד
 * כוללת meta tags, Open Graph, Twitter Cards, ו-structured data
 */

import { Metadata } from 'next'
import { seoConfig, optimizeMetaDescription, optimizeTitle, getCanonicalUrl, getOGImageUrl } from '@/config/seo.config'

export interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  canonical?: string
  image?: string
  type?: 'website' | 'article' | 'profile'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
  noindex?: boolean
  nofollow?: boolean
  structuredData?: object | object[]
}

/**
 * יצירת Metadata object ל-Next.js
 */
export function generateSEOMetadata(props: SEOProps): Metadata {
  const {
    title,
    description,
    keywords = [],
    canonical,
    image,
    type = 'website',
    publishedTime,
    modifiedTime,
    author,
    section,
    tags = [],
    noindex = false,
    nofollow = false,
  } = props

  const finalTitle = title 
    ? optimizeTitle(`${title} | ${seoConfig.siteName}`)
    : seoConfig.defaultTitle

  const finalDescription = description
    ? optimizeMetaDescription(description)
    : seoConfig.defaultDescription

  const finalKeywords = keywords.length > 0
    ? [...seoConfig.defaultKeywords, ...keywords]
    : seoConfig.defaultKeywords

  const canonicalUrl = canonical || getCanonicalUrl()
  const ogImage = getOGImageUrl(image)

  const metadata: Metadata = {
    title: finalTitle,
    description: finalDescription,
    keywords: finalKeywords,
    authors: [{ name: author || seoConfig.author }],
    creator: seoConfig.author,
    publisher: seoConfig.businessName,
    robots: {
      index: !noindex,
      follow: !nofollow,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: type === 'article' ? 'article' : 'website',
      locale: seoConfig.locale,
      url: canonicalUrl,
      siteName: seoConfig.siteName,
      title: finalTitle,
      description: finalDescription,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: finalTitle,
        },
      ],
      ...(type === 'article' && {
        publishedTime,
        modifiedTime,
        authors: [author || seoConfig.author],
        section,
        tags,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description: finalDescription,
      images: [ogImage],
    },
    alternates: {
      canonical: canonicalUrl,
    },
    other: {
      'geo.region': 'IL',
      'geo.placename': seoConfig.businessAddress.city,
      'geo.position': `${seoConfig.coordinates.latitude};${seoConfig.coordinates.longitude}`,
      'ICBM': `${seoConfig.coordinates.latitude}, ${seoConfig.coordinates.longitude}`,
      ...(type === 'article' && {
        'article:author': author || seoConfig.author,
        'article:published_time': publishedTime,
        'article:modified_time': modifiedTime || publishedTime,
        ...(section && { 'article:section': section }),
      }),
    },
  }

  return metadata
}

/**
 * קומפוננטה ל-Structured Data
 */
export function StructuredData({ data }: { data: object | object[] }) {
  const dataArray = Array.isArray(data) ? data : [data]
  
  return (
    <>
      {dataArray.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  )
}

/**
 * יצירת LocalBusiness Schema
 */
export function generateLocalBusinessSchema(additionalData?: Partial<typeof seoConfig>) {
  const config = { ...seoConfig, ...additionalData }
  
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: config.businessName,
    alternateName: config.siteName,
    description: config.defaultDescription,
    url: config.siteUrl,
    telephone: config.contact.phone,
    image: getOGImageUrl(),
    logo: getOGImageUrl(),
    address: {
      '@type': 'PostalAddress',
      streetAddress: config.businessAddress.street,
      addressLocality: config.businessAddress.city,
      addressCountry: config.businessAddress.country,
      ...(config.businessAddress.postalCode && { postalCode: config.businessAddress.postalCode }),
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: config.coordinates.latitude,
      longitude: config.coordinates.longitude,
    },
    openingHoursSpecification: Object.entries(config.openingHours)
      .filter(([, hours]) => hours !== null)
      .map(([day, hours]) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: day.charAt(0).toUpperCase() + day.slice(1),
        opens: hours!.opens,
        closes: hours!.closes,
      })),
    priceRange: '$$',
    medicalSpecialty: [
      'Physical Therapy',
      'Rehabilitation',
      'Orthopedic Physical Therapy',
      'Vestibular Rehabilitation',
    ],
    areaServed: {
      '@type': 'City',
      name: config.businessAddress.city,
    },
  }
}

/**
 * יצירת Article Schema
 */
export function generateArticleSchema({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author,
  publisher,
  articleSection,
  keywords,
}: {
  headline: string
  description: string
  image?: string
  datePublished: string
  dateModified?: string
  author?: string
  publisher?: string
  articleSection?: string
  keywords?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    image: image ? getOGImageUrl(image) : getOGImageUrl(),
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: author || seoConfig.author,
      url: `${seoConfig.siteUrl}/about`,
    },
    publisher: {
      '@type': 'MedicalBusiness',
      name: publisher || seoConfig.businessName,
      url: seoConfig.siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: getOGImageUrl(),
      },
    },
    ...(articleSection && { articleSection }),
    ...(keywords && { keywords }),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': getCanonicalUrl(),
    },
  }
}


