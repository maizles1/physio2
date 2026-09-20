import type { Metadata } from "next";
import { Assistant } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SkipLink from "@/components/SkipLink";
import ErrorBoundary from "@/components/ErrorBoundary";
import FloatingButtons from "@/components/FloatingButtons";
import PageTracking from "@/components/PageTracking";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import ToastContainer from "@/components/Toast";
import PerformanceTracker from "@/components/PerformanceTracker";
import CookieConsent from "@/components/CookieConsent";
import { seoConfig } from "@/config/seo.config";
import {
  clinicEntity,
  clinicGeo,
  clinicSchemaIds,
  getAshdodAreaServed,
  getClinicPostalAddress,
  getMastersCredentialSchema,
  getOpeningHoursSpecification,
} from "@/config/geo.config";

const assistant = Assistant({
  subsets: ["latin", "hebrew"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
  variable: "--font-assistant",
});

export const metadata: Metadata = {
  title: {
    default: "פיזיותרפיה פרטית באשדוד - פיזיותרפיסט פרטי באשדוד | פיזיותרפיה.פלוס",
    template: "%s | פיזיותרפיה.פלוס",
  },
  description: "פיזיותרפיה פרטית באשדוד - אנדריי מייזלס, פיזיותרפיסט פרטי מומלץ (M.Sc). טיפול בכאבי גב, כתף, צוואר, TMJ ושיקום אורתופדי ווסטיבולרי. מרכז כלניות, אשדוד.",
  keywords: [
    "פיזיותרפיה",
    "פיזיותרפיה.פלוס",
    "פיזיותרפיה פרטית באשדוד",
    "מכון פיזיותרפיה פרטי",
    "מכון פיזיותרפיה פרטי באשדוד",
    "פיזיותרפיסט באשדוד",
    "פיזיותרפיסט פרטי באשדוד",
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
    title: 'פיזיותרפיה פרטית באשדוד - פיזיותרפיסט פרטי באשדוד | פיזיותרפיה.פלוס',
    description: 'פיזיותרפיה פרטית באשדוד - מכון פיזיותרפיה פרטי באשדוד. אנדריי מייזלס, פיזיותרפיסט פרטי באשדוד, פיזיותרפיסט מקצועי בעל תואר שני, פיזיותרפיסט לשעבר של נבחרת ישראל בג\'ודו, מתמחה בטיפול בכאבי גב, כתף, צוואר וברך, שיקום לאחר ניתוחים ושיקום וסטיבולרי.',
    images: [
      {
        url: 'https://physio-plus.co.il/images/logo/clinic-logo.png',
        width: 1200,
        height: 630,
        alt: 'פיזיותרפיה.פלוס - פיזיותרפיסט פרטי באשדוד',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'פיזיותרפיה פרטית באשדוד - פיזיותרפיסט פרטי באשדוד | פיזיותרפיה.פלוס',
    description: 'פיזיותרפיה פרטית באשדוד - מכון פיזיותרפיה פרטי באשדוד. אנדריי מייזלס, פיזיותרפיסט פרטי באשדוד, פיזיותרפיסט מקצועי בעל תואר שני, פיזיותרפיסט לשעבר של נבחרת ישראל בג\'ודו',
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
  other: {
    'facebook-domain-verification': 'ckan6zgvnc71v4gv1yuxlcsb1s5kw4',
    'google-site-verification': process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  },
};

const openingHoursSpecification = getOpeningHoursSpecification()

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': clinicSchemaIds.organization,
  name: 'פיזיותרפיה.פלוס - פיזיותרפיה פרטית באשדוד',
  alternateName: clinicEntity.brandEn,
  description: 'פיזיותרפיה פרטית באשדוד - מכון פיזיותרפיה פרטי באשדוד',
  url: seoConfig.siteUrl,
  logo: `${seoConfig.siteUrl}/images/logo/clinic-logo.png`,
  email: seoConfig.contact.email,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: clinicEntity.phoneE164,
    email: seoConfig.contact.email,
    contactType: 'Customer Service',
    areaServed: getAshdodAreaServed(),
    availableLanguage: ['Hebrew'],
  },
  location: {
    '@id': clinicSchemaIds.medicalBusiness,
  },
  sameAs: clinicEntity.sameAs,
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': ['MedicalBusiness', 'LocalBusiness'],
  '@id': clinicSchemaIds.medicalBusiness,
  name: clinicEntity.brandHe,
  alternateName: ['Physio Plus', clinicEntity.brandEn],
  description: 'פיזיותרפיה פרטית באשדוד - קליניקת פיזיותרפיה מקצועית. פיזיותרפיסט פרטי באשדוד, פיזיותרפיסט לשעבר של נבחרת ישראל בג\'ודו.',
  url: seoConfig.siteUrl,
  logo: `${seoConfig.siteUrl}/images/logo/clinic-logo.png`,
  image: `${seoConfig.siteUrl}/images/andrey-meizels.JPG`,
  telephone: clinicEntity.phoneE164,
  email: seoConfig.contact.email,
  address: getClinicPostalAddress(),
  geo: {
    '@type': 'GeoCoordinates',
    latitude: clinicGeo.latitude,
    longitude: clinicGeo.longitude,
  },
  openingHoursSpecification,
  priceRange: '₪₪',
  medicalSpecialty: ['Physical Therapy', 'Sports Medicine', 'Vestibular Rehabilitation'],
  founder: {
    '@type': 'Person',
    '@id': 'https://physio-plus.co.il/about#andrey-meizels',
    name: 'אנדריי מייזלס',
    url: 'https://physio-plus.co.il/about',
    jobTitle: 'פיזיותרפיסט מוסמך',
    description: 'פיזיותרפיסט מוסמך בעל תואר שני (M.Sc) בפיזיותרפיה מאוניברסיטת אריאל, לשעבר פיזיותרפיסט נבחרת ישראל בג\'ודו וסיירת חרוב',
    hasCredential: getMastersCredentialSchema(),
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
          name: 'טיפול במפרק הלסת TMJ',
          url: 'https://physio-plus.co.il/services#tmj',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'ליווי ספורטאים וקבוצות',
          url: 'https://physio-plus.co.il/services#sports-teams',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'ביקורי בית',
          url: 'https://physio-plus.co.il/services#home-visits',
          areaServed: getAshdodAreaServed(),
        },
      },
    ],
  },
  areaServed: getAshdodAreaServed(),
  acceptedPaymentMethod: [
    { '@type': 'PaymentMethod', name: 'ביטוח משלים כללית' },
    { '@type': 'PaymentMethod', name: 'קופת חולים מאוחדת' },
    { '@type': 'PaymentMethod', name: 'משרד הביטחון' },
    { '@type': 'PaymentMethod', name: 'ביטוחים פרטיים' },
  ],
  paymentAccepted: ['ביטוח משלים כללית', 'קופת חולים מאוחדת', 'משרד הביטחון', 'ביטוחים פרטיים'],
  currenciesAccepted: 'ILS',
  hasMap: 'https://maps.app.goo.gl/Yoq3HMBmmg8bpMbL7',
  // NOTE: aggregateRating intentionally lives only on pages that actually
  // render reviews (the testimonials page). Google requires the rating to
  // reference review content visible on the same page, so a site-wide rating
  // in the shared layout (shown even on /terms, /privacy) is non-compliant.
  sameAs: clinicEntity.sameAs,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <head>
        {/* Critical CSS - Inline for faster rendering */}
        <style dangerouslySetInnerHTML={{
          __html: `
            :root{--background:#ffffff;--foreground:#1a1a1a;--primary-dark:#2A3080;--primary:#2080C0;--primary-light:#40C0F0;--primary-darker:#004080;--secondary:#10b981;--secondary-dark:#059669;--accent:#f59e0b;--text:#1f2937;--text-light:#6b7280}
            body{background:var(--background);color:var(--foreground);font-family:'Assistant',-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans Hebrew",Arial,sans-serif;direction:rtl;line-height:1.7;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-size:16px;letter-spacing:0.01em;text-rendering:optimizeLegibility;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}
            .bg-primary-gradient{background:linear-gradient(to bottom right,#2A3080,#2080C0,#40C0F0)}
          `
        }} />
        {/* Preconnect to Google Tag Manager for better performance */}
        {/* Resource Hints for External Domains */}
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://maps.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.youtube.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://i.ytimg.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.web3forms.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch for Additional Domains */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
        <link rel="dns-prefetch" href="https://api.web3forms.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            '@id': clinicSchemaIds.website,
            name: clinicEntity.brandHe,
            alternateName: [clinicEntity.brandEn, 'Physio Plus'],
            url: seoConfig.siteUrl,
            inLanguage: 'he-IL',
            publisher: {
              '@id': clinicSchemaIds.organization,
            },
          }) }}
        />
      </head>
      <body className={`antialiased ${assistant.variable}`}>
        <ErrorBoundary>
          <div className="site-background" aria-hidden="true" />
          <ServiceWorkerRegistration />
          <PageTracking />
          <PerformanceTracker />
          <ToastContainer />
          <SkipLink />
          <div className="site-content-wrapper relative min-h-screen pb-20 md:pb-24">
            <Header />
            <main id="main-content" className="min-h-screen">
              {children}
            </main>
            <Footer />
          </div>
          <FloatingButtons />
          <CookieConsent />
        </ErrorBoundary>
      </body>
    </html>
  );
}
