import { Metadata } from 'next'
import { seoConfig } from '@/config/seo.config'
import {
  clinicEntity,
  clinicGeo,
  clinicSchemaIds,
  getAshdodAreaServed,
  getClinicPostalAddress,
  getOpeningHoursSpecification,
} from '@/config/geo.config'

export const metadata: Metadata = {
  title: 'צור קשר',
  description: 'צרו קשר עם מכון פיזיותרפיה.פלוס באשדוד. טלפון: 050-883-8982, כתובת: יקינטון 3, מרכז כלניות, אשדוד. זמינים בימים ראשון-חמישי 08:00-20:00, שישי 08:00-14:00.',
  keywords: [
    'צור קשר פיזיותרפיה',
    'פיזיותרפיה אשדוד',
    'טלפון פיזיותרפיסט',
    'כתובת קליניקה אשדוד',
  ],
  openGraph: {
    title: 'צור קשר - פיזיותרפיה.פלוס',
    description: 'צרו קשר עם מכון פיזיותרפיה.פלוס באשדוד',
    url: 'https://physio-plus.co.il/contact',
    images: [
      {
        url: 'https://physio-plus.co.il/images/logo/clinic-logo.png',
        width: 1200,
        height: 630,
        alt: 'צור קשר - פיזיותרפיה.פלוס',
      },
    ],
  },
  alternates: {
    canonical: 'https://physio-plus.co.il/contact',
  },
  other: {
    'geo.region': 'IL',
    'geo.placename': 'אשדוד',
    'geo.position': '31.783106159195388;34.65489203389065',
    'ICBM': '31.783106159195388, 34.65489203389065',
  },
}

const medicalBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['MedicalBusiness', 'LocalBusiness'],
  '@id': clinicSchemaIds.medicalBusiness,
  name: clinicEntity.brandHe,
  url: seoConfig.siteUrl,
  telephone: clinicEntity.phoneE164,
  email: seoConfig.contact.email,
  address: getClinicPostalAddress(),
  geo: {
    '@type': 'GeoCoordinates',
    latitude: clinicGeo.latitude,
    longitude: clinicGeo.longitude,
  },
  openingHoursSpecification: getOpeningHoursSpecification(),
  areaServed: getAshdodAreaServed(),
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalBusinessSchema) }}
      />
      {children}
    </>
  )
}










