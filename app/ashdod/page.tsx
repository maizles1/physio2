import { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import ClinicNapCta from '@/components/ClinicNapCta'
import NeighborhoodHubLinks from '@/components/NeighborhoodHubLinks'
import { neighborhoodHub, neighborhoodPages } from '@/config/neighborhood-pages.config'
import { absUrl } from '@/config/service-pages.config'
import {
  clinicEntity,
  clinicSchemaIds,
  getAshdodAreaServed,
  getClinicEntityRef,
  getGeoMeta,
} from '@/config/geo.config'

const pageUrl = absUrl(neighborhoodHub.path)

export const metadata: Metadata = {
  title: neighborhoodHub.title,
  description: neighborhoodHub.metaDescription,
  keywords: [
    'פיזיותרפיה אשדוד לפי אזור',
    'פיזיותרפיה מרכז כלניות',
    'פיזיותרפיה רובע א אשדוד',
    'פיזיותרפיה הסיטי אשדוד',
    'פיזיותרפיה מרינה אשדוד',
  ],
  openGraph: {
    title: `${neighborhoodHub.title} | פיזיותרפיה.פלוס`,
    description: neighborhoodHub.metaDescription,
    url: pageUrl,
    type: 'website',
    locale: 'he_IL',
    images: [
      {
        url: 'https://physio-plus.co.il/images/logo/clinic-logo.png',
        width: 1200,
        height: 630,
        alt: 'פיזיותרפיה.פלוס — קליניקה במרכז כלניות אשדוד',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${neighborhoodHub.title} | פיזיותרפיה.פלוס`,
    description: neighborhoodHub.metaDescription,
    images: ['https://physio-plus.co.il/images/logo/clinic-logo.png'],
  },
  alternates: {
    canonical: pageUrl,
  },
  other: getGeoMeta(),
}

export default function AshdodHubPage() {
  const clinicRef = getClinicEntityRef()

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${pageUrl}#webpage`,
    name: neighborhoodHub.h1,
    description: neighborhoodHub.metaDescription,
    url: pageUrl,
    inLanguage: 'he-IL',
    isPartOf: { '@id': clinicSchemaIds.website },
    about: getAshdodAreaServed(),
    mainEntity: {
      '@type': 'ItemList',
      name: 'אזורי פיזיותרפיה באשדוד',
      itemListElement: neighborhoodPages.map((page, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: page.navTitle,
        url: absUrl(`/ashdod/${page.slug}`),
      })),
    },
    provider: clinicRef,
  }

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <section
        className="relative text-white overflow-hidden py-12 sm:py-16"
        style={{ background: 'linear-gradient(to bottom right, #2A3080, #2080C0, #40C0F0)' }}
      >
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumbs
            items={[
              { label: 'דף בית', href: '/' },
              { label: 'פיזיותרפיה באשדוד', href: neighborhoodHub.path },
            ]}
          />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">{neighborhoodHub.h1}</h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl">{neighborhoodHub.lead}</p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed mb-5">
              פיזיותרפיה.פלוס היא קליניקה אחת ב{clinicEntity.addressLine}. אין סניפים ברבעים אחרים ואין כתובות רחוב
              שלא פרסמנו. דפי האזור כאן נועדו לעזור למי שמחפש פיזיותרפיה ליד הבית ברובע ספציפי: איך מגיעים, חניה,
              ומה השירותים הרלוונטיים.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              בחרנו ארבעה אזורים עם זווית שונה — המתחם שבו הקליניקה יושבת, הרובע הוותיק ליד הים, הסיטי/הקריה של
              העובדים, והמרינה עם הטיילת — ולא פיצלנו לכל 17 הרבעים. לכל דף יש קישור לשירותי{' '}
              <Link href="/services" className="text-[#2080C0] font-medium hover:underline">
                פיזיותרפיה באשדוד
              </Link>{' '}
              ול
              <Link href="/contact" className="text-[#2080C0] font-medium hover:underline">
                קביעת תור
              </Link>
              .
            </p>
            <address className="not-italic bg-blue-50 border border-blue-100 rounded-xl p-5 text-gray-800">
              <p>
                <span className="font-semibold">כתובת: </span>
                {clinicEntity.addressLine}
              </p>
              <p>
                <span className="font-semibold">טלפון: </span>
                <a href={`tel:${clinicEntity.phoneE164}`} className="text-[#2080C0] hover:underline" dir="ltr">
                  {clinicEntity.phoneDisplay}
                </a>
              </p>
              <p>
                <span className="font-semibold">שעות: </span>
                {clinicEntity.hoursHe}
              </p>
            </address>
          </div>
        </div>
      </section>

      <NeighborhoodHubLinks
        heading="בחרו אזור באשדוד"
        intro="ארבעה דפים קצרים. אותה קליניקה, אותם פרטי קשר."
        showHubLink={false}
      />

      <ClinicNapCta
        heading="קביעת תור באשדוד"
        whatsappMessage="שלום, אשמח לקבוע תור לפיזיותרפיה באשדוד"
      />
    </div>
  )
}
