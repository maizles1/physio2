import type { Metadata } from "next";
import Script from "next/script";
import { Assistant } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SkipLink from "@/components/SkipLink";
import ErrorBoundary from "@/components/ErrorBoundary";
import FloatingButtons from "@/components/FloatingButtons";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import PageTracking from "@/components/PageTracking";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import ToastContainer from "@/components/Toast";
import PerformanceTracker from "@/components/PerformanceTracker";

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
  description: "פיזיותרפיה פרטית באשדוד - פיזיותרפיה.פלוס. מכון פיזיותרפיה פרטי באשדוד. אנדריי מייזלס, פיזיותרפיסט פרטי באשדוד, פיזיותרפיסט מקצועי בעל תואר שני, פיזיותרפיסט לשעבר של נבחרת ישראל בג&apos;ודו, מתמחה בטיפול בכאבי גב, כתף, צוואר וברך, שיקום לאחר ניתוחים, שיקום וסטיבולרי וטיפול במפרק הלסת. מרכז כלניות, אשדוד. 050-883-8982",
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
        url: 'https://physio-plus.co.il/images/og/home.jpg',
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

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'פיזיותרפיה.פלוס - פיזיותרפיה פרטית באשדוד',
  alternateName: 'Physiotherapy.Plus',
  description: 'פיזיותרפיה פרטית באשדוד - מכון פיזיותרפיה פרטי באשדוד',
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
  alternateName: 'Physio Plus',
  description: 'פיזיותרפיה פרטית באשדוד - קליניקת פיזיותרפיה מקצועית. פיזיותרפיסט פרטי באשדוד, פיזיותרפיסט לשעבר של נבחרת ישראל בג\'ודו.',
  url: 'https://physio-plus.co.il',
  logo: 'https://physio-plus.co.il/images/logo/clinic-logo.png',
  image: 'https://physio-plus.co.il/images/andrey-meizels.JPG',
  telephone: '+972-50-883-8982',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'מרכז כלניות',
    addressLocality: 'אשדוד',
    addressCountry: 'IL',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '31.783106159195388',
    longitude: '34.65489203389065',
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
  priceRange: '₪₪',
  medicalSpecialty: ['Physical Therapy', 'Sports Medicine', 'Vestibular Rehabilitation'],
  founder: {
    '@type': 'Person',
    name: 'אנדריי מייזלס',
    jobTitle: 'פיזיותרפיסט מומחה',
    description: 'פיזיותרפיסט לשעבר של נבחרת ישראל בג\'ודו',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
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
          name: 'שיקום וסטיבולרי - טיפול בסחרחורות',
          url: 'https://physio-plus.co.il/services#vestibular',
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
          name: 'טיפול בכאבי כתף',
          url: 'https://physio-plus.co.il/services#shoulder-pain',
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
    ],
  },
  areaServed: [
    { 
      '@type': 'City', 
      name: 'אשדוד',
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '31.8044',
        longitude: '34.6553',
      },
    },
    { 
      '@type': 'City', 
      name: 'אשקלון',
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '31.6688',
        longitude: '34.5744',
      },
    },
    { 
      '@type': 'City', 
      name: 'קריית גת',
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '31.6100',
        longitude: '34.7719',
      },
    },
    { 
      '@type': 'City', 
      name: 'ראשון לציון',
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '31.9730',
        longitude: '34.7925',
      },
    },
  ],
  serviceArea: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: '31.783106159195388',
      longitude: '34.65489203389065',
    },
    geoRadius: {
      '@type': 'Distance',
      value: '50',
      unitCode: 'KMT', // Kilometers
    },
  },
  acceptedPaymentMethod: [
    { '@type': 'PaymentMethod', name: 'ביטוח משלים כללית' },
    { '@type': 'PaymentMethod', name: 'קופת חולים מאוחדת' },
    { '@type': 'PaymentMethod', name: 'משרד הביטחון' },
    { '@type': 'PaymentMethod', name: 'ביטוחים פרטיים' },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '150',
    bestRating: '5',
  },
  sameAs: [
    'https://www.facebook.com/yourpage',
    'https://www.instagram.com/yourpage',
    // Add Google Business Profile URL when available
    // Example: 'https://www.google.com/maps/place/...',
  ],
  // Google Business Profile ID (if available)
  // Add this when you have the Google Business Profile ID
  // googleBusinessProfileId: process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_PROFILE_ID || '',
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://physio-plus.co.il/#localbusiness',
  name: 'פיזיותרפיה.פלוס',
  alternateName: 'Physio Plus',
  description: 'פיזיותרפיה פרטית באשדוד - קליניקת פיזיותרפיה מקצועית. פיזיותרפיסט פרטי באשדוד, פיזיותרפיסט לשעבר של נבחרת ישראל בג\'ודו.',
  url: 'https://physio-plus.co.il',
  logo: 'https://physio-plus.co.il/images/logo/clinic-logo.png',
  image: 'https://physio-plus.co.il/images/andrey-meizels.JPG',
  telephone: '+972-50-883-8982',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'מרכז כלניות',
    addressLocality: 'אשדוד',
    addressRegion: 'אשדוד',
    addressCountry: 'IL',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '31.783106159195388',
    longitude: '34.65489203389065',
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
  priceRange: '₪₪',
  paymentAccepted: ['ביטוח משלים כללית', 'קופת חולים מאוחדת', 'משרד הביטחון', 'ביטוחים פרטיים'],
  currenciesAccepted: 'ILS',
}

const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': 'https://physio-plus.co.il/#professionalservice',
  name: 'פיזיותרפיה.פלוס - שירותי פיזיותרפיה מקצועיים',
  description: 'שירותי פיזיותרפיה מקצועיים באשדוד: טיפול בכאבי גב, כתף, צוואר וברך, שיקום לאחר ניתוחים, שיקום וסטיבולרי וטיפול במפרק הלסת.',
  url: 'https://physio-plus.co.il',
  provider: {
    '@type': 'MedicalBusiness',
    name: 'פיזיותרפיה.פלוס',
    url: 'https://physio-plus.co.il',
  },
  areaServed: {
    '@type': 'City',
    name: 'אשדוד',
  },
  serviceType: [
    'Physical Therapy',
    'Orthopedic Physical Therapy',
    'Sports Medicine',
    'Vestibular Rehabilitation',
    'Post-Surgical Rehabilitation',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'שירותי פיזיותרפיה',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'טיפול בכאבי גב',
          description: 'טיפול מקצועי ומקיף בכאבי גב אקוטיים וכרוניים',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'טיפול בכאבי כתף',
          description: 'שיקום וטיפול בכאבי כתף ובעיות מפרק הכתף',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'שיקום לאחר ניתוחים',
          description: 'תוכניות שיקום מותאמות אישית לאחר ניתוחים אורטופדיים',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'שיקום וסטיבולרי',
          description: 'טיפול מקצועי בסחרחורות, ורטיגו ובעיות שיווי משקל',
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'פיזיותרפיה.פלוס',
            url: 'https://physio-plus.co.il',
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: 'https://physio-plus.co.il/search?q={search_term_string}',
              },
              'query-input': 'required name=search_term_string',
            },
          }) }}
        />
      </head>
      <body className="antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-58XQH9KN"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {/* Google Tag Manager - Load after page is interactive */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-58XQH9KN');`,
          }}
        />
        {/* Google tag (gtag.js) - Load lazily */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-705216601"
          strategy="lazyOnload"
        />
        <Script
          id="google-analytics"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-705216601');
            `,
          }}
        />
        <ErrorBoundary>
          <ServiceWorkerRegistration />
          <GoogleAnalytics />
          <PageTracking />
          <PerformanceTracker />
          <ToastContainer />
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
