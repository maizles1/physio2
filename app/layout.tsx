import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SkipLink from "@/components/SkipLink";
import ErrorBoundary from "@/components/ErrorBoundary";
import FloatingButtons from "@/components/FloatingButtons";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import PageTracking from "@/components/PageTracking";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "פיזיותרפיה.פלוס - מכון פיזיותרפיה פרטי באשדוד | אנדריי מייזלס",
    template: "%s | פיזיותרפיה.פלוס",
  },
  description: "פיזיותרפיה.פלוס - מכון פיזיותרפיה פרטי באשדוד. אנדריי מייזלס, פיזיותרפיסט מקצועי בעל תואר שני, פיזיותרפיסט לשעבר של נבחרת ישראל בג&apos;ודו, מתמחה בטיפול בכאבי גב, כתף, צוואר וברך, שיקום לאחר ניתוחים, שיקום וסטיבולרי וטיפול במפרק הלסת. מרכז כלניות, אשדוד. 050-883-8982",
  keywords: [
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
    url: 'https://physiotherapy.plus',
    siteName: 'פיזיותרפיה.פלוס',
    title: 'פיזיותרפיה.פלוס - מכון פיזיותרפיה פרטי באשדוד',
    description: 'אנדריי מייזלס, פיזיותרפיסט מקצועי בעל תואר שני, פיזיותרפיסט לשעבר של נבחרת ישראל בג\'ודו, מתמחה בטיפול בכאבי גב, כתף, צוואר וברך, שיקום לאחר ניתוחים ושיקום וסטיבולרי.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'פיזיותרפיה.פלוס - מכון פיזיותרפיה פרטי באשדוד',
    description: 'אנדריי מייזלס, פיזיותרפיסט מקצועי בעל תואר שני, פיזיותרפיסט לשעבר של נבחרת ישראל בג\'ודו באשדוד',
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
    canonical: 'https://physiotherapy.plus',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'פיזיותרפיה.פלוס',
  alternateName: 'Physiotherapy.Plus',
  url: 'https://physiotherapy.plus',
  logo: 'https://physiotherapy.plus/images/logo/clinic-logo.png',
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
  url: 'https://physiotherapy.plus',
  telephone: '050-883-8982',
  image: 'https://physiotherapy.plus/images/logo/clinic-logo.png',
  logo: 'https://physiotherapy.plus/images/logo/clinic-logo.png',
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
          url: 'https://physiotherapy.plus/services#back-pain',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'טיפול בכאבי כתף',
          url: 'https://physiotherapy.plus/services#shoulder-pain',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'טיפול בכאבי צוואר וברך',
          url: 'https://physiotherapy.plus/services#neck-knee-pain',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'שיקום לאחר ניתוחים',
          url: 'https://physiotherapy.plus/services#post-surgery',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'שיקום וסטיבולרי - טיפול בסחרחורות',
          url: 'https://physiotherapy.plus/services#vestibular',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'טיפול במפרק הלסת (TMJ)',
          url: 'https://physiotherapy.plus/services#tmj',
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
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
