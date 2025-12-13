import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SkipLink from "@/components/SkipLink";
import ErrorBoundary from "@/components/ErrorBoundary";
import FloatingButtons from "@/components/FloatingButtons";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import PageTracking from "@/components/PageTracking";

export const metadata: Metadata = {
  title: {
    default: "פיזיותרפיסט פרטי באשדוד | פיזיותרפיה.פלוס - אנדריי מייזלס",
    template: "%s | פיזיותרפיה.פלוס",
  },
  description: "פיזיותרפיסט פרטי מומלץ באשדוד. אנדריי מייזלס, פיזיותרפיסט מקצועי בעל תואר שני, פיזיותרפיסט לשעבר של נבחרת ישראל בג&apos;ודו. מכון פיזיותרפיה פרטי באשדוד במרכז כלניות. טיפול בכאבי גב, כתף, צוואר וברך, שיקום לאחר ניתוחים, שיקום וסטיבולרי וטיפול במפרק הלסת. 050-883-8982",
  keywords: [
    "פיזיותרפיסט פרטי באשדוד",
    "פיזיותרפיסט מומלץ באשדוד",
    "מכון פיזיותרפיה פרטי באשדוד",
    "פיזיותרפיה",
    "פיזיותרפיה.פלוס",
    "מכון פיזיותרפיה פרטי",
    "פיזיותרפיסט באשדוד",
    "אנדריי מייזלס",
    "טיפול בכאבי גב",
    "טיפול בכאבי כתף",
    "טיפול בכאבי צוואר",
    "טיפול בכאבי ברך",
    "שיקום לאחר ניתוחים",
    "שיקום וסטיבולרי",
    "טיפול בסחרחורות",
    "טיפול במפרק הלסת",
    "TMJ",
    "אשדוד",
    "מאוחדת",
    "הכללית",
    "ביטוחים פרטיים",
    "משרד הבטחון",
  ],
  authors: [{ name: 'אנדריי מייזלס' }],
  creator: 'אנדריי מייזלס',
  publisher: 'פיזיותרפיה.פלוס',
  openGraph: {
    type: 'website',
    locale: 'he_IL',
    url: 'https://physio-plus.co.il',
    siteName: 'פיזיותרפיה.פלוס',
    title: 'פיזיותרפיסט פרטי באשדוד | פיזיותרפיה.פלוס',
    description: 'פיזיותרפיסט פרטי מומלץ באשדוד. אנדריי מייזלס, פיזיותרפיסט מקצועי בעל תואר שני, פיזיותרפיסט לשעבר של נבחרת ישראל בג\'ודו. מכון פיזיותרפיה פרטי באשדוד במרכז כלניות. טיפול בכאבי גב, כתף, צוואר וברך, שיקום לאחר ניתוחים ושיקום וסטיבולרי.',
    images: [
      {
        url: 'https://physio-plus.co.il/images/logo/clinic-logo.png',
        width: 1200,
        height: 630,
        alt: 'פיזיותרפיה.פלוס - מכון פיזיותרפיה פרטי באשדוד',
      },
    ],
  },
  icons: {
    icon: [
      { url: '/images/logo/clinic-logo.png', type: 'image/png' },
      { url: '/images/logo/clinic-logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/logo/clinic-logo.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/images/logo/clinic-logo.png',
    apple: '/images/logo/clinic-logo.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'פיזיותרפיסט פרטי באשדוד | פיזיותרפיה.פלוס',
    description: 'פיזיותרפיסט פרטי מומלץ באשדוד. אנדריי מייזלס, פיזיותרפיסט מקצועי בעל תואר שני, פיזיותרפיסט לשעבר של נבחרת ישראל בג\'ודו. מכון פיזיותרפיה פרטי באשדוד במרכז כלניות.',
    images: ['https://physio-plus.co.il/images/logo/clinic-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://physio-plus.co.il',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'פיזיותרפיה.פלוס',
  alternateName: 'Physiotherapy.Plus',
  url: 'https://physio-plus.co.il',
  logo: 'https://physio-plus.co.il/images/logo/clinic-logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '050-883-8982',
    contactType: 'Customer Service',
    areaServed: 'IL',
    availableLanguage: ['Hebrew'],
  },
  sameAs: [
    // Add social media links here when available
  ],
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  name: 'פיזיותרפיה.פלוס',
  alternateName: 'Physiotherapy.Plus',
  description: 'מכון פיזיותרפיה פרטי באשדוד - טיפול מקצועי בכאבי גב, כתף, צוואר וברך, שיקום לאחר ניתוחים ושיקום וסטיבולרי',
  url: 'https://physio-plus.co.il',
  telephone: '050-883-8982',
  image: 'https://physio-plus.co.il/images/logo/clinic-logo.png',
  logo: 'https://physio-plus.co.il/images/logo/clinic-logo.png',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'מרכז כלניות',
    addressLocality: 'אשדוד',
    addressCountry: 'IL',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '31.8044',
    longitude: '34.6553',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '08:00',
      closes: '20:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Friday',
      opens: '08:00',
      closes: '14:00',
    },
  ],
  priceRange: '$$',
  paymentAccepted: 'Cash, Credit Card, Insurance',
  currenciesAccepted: 'ILS',
  medicalSpecialty: ['Physical Therapy', 'Rehabilitation', 'Orthopedic Physical Therapy'],
  areaServed: {
    '@type': 'City',
    name: 'אשדוד',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'שירותי פיזיותרפיה',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'טיפול בכאבי גב',
          url: 'https://physio-plus.co.il/services#back-pain',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'טיפול בכאבי כתף',
          url: 'https://physio-plus.co.il/services#shoulder-pain',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'טיפול בכאבי צוואר',
          url: 'https://physio-plus.co.il/services#neck-pain',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'טיפול בכאבי ברך',
          url: 'https://physio-plus.co.il/services#knee-pain',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'שיקום לאחר ניתוחים',
          url: 'https://physio-plus.co.il/services#post-surgery',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'שיקום וסטיבולרי - טיפול בסחרחורות',
          url: 'https://physio-plus.co.il/services#vestibular',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'טיפול במפרק הלסת (TMJ)',
          url: 'https://physio-plus.co.il/services#tmj',
        },
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/images/logo/clinic-logo.png" type="image/png" sizes="32x32" />
        <link rel="shortcut icon" href="/images/logo/clinic-logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/logo/clinic-logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Assistant:wght@300;400;500;600;700;800&display=swap" as="style" />
        <link rel="preconnect" href="https://www.google.com" />
        <link rel="preconnect" href="https://maps.googleapis.com" />
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://i.ytimg.com" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
      </head>
      <body className="antialiased">
        <ErrorBoundary>
          <GoogleAnalytics />
          <PageTracking />
          <SkipLink />
          <Header />
          <main id="main-content" className="min-h-screen">
            {children}
          </main>
          <Footer />
          <FloatingButtons />
        </ErrorBoundary>
      </body>
    </html>
  );
}