import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'שאלות נפוצות - FAQ',
  description: 'תשובות לשאלות הנפוצות על פיזיותרפיה.פלוס: ביטוחים, תהליך טיפול, החזרים, משך טיפול ועוד. מידע מקיף על שירותי הפיזיותרפיה באשדוד.',
  keywords: [
    'שאלות נפוצות פיזיותרפיה',
    'FAQ פיזיותרפיה',
    'שאלות על פיזיותרפיה',
    'מידע על טיפול פיזיותרפיה',
  ],
  openGraph: {
    title: 'שאלות נפוצות - פיזיותרפיה.פלוס',
    description: 'תשובות לשאלות הנפוצות ביותר על הטיפולים, ביטוחים ותהליך הטיפול. מידע מקיף על שירותי הפיזיותרפיה.',
    url: 'https://physio-plus.co.il/faq',
    type: 'website',
    locale: 'he_IL',
    images: [
      {
        url: 'https://physio-plus.co.il/images/logo/clinic-logo.png',
        width: 1200,
        height: 630,
        alt: 'שאלות נפוצות - פיזיותרפיה.פלוס',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'שאלות נפוצות - פיזיותרפיה.פלוס',
    description: 'תשובות לשאלות הנפוצות ביותר על הטיפולים והשירותים',
    images: ['https://physio-plus.co.il/images/logo/clinic-logo.png'],
  },
  alternates: {
    canonical: 'https://physio-plus.co.il/faq',
  },
  other: {
    'geo.region': 'IL',
    'geo.placename': 'אשדוד',
  },
}

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
