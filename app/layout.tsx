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
  other: {
    'facebook-domain-verification': 'ckan6zgvnc71v4gv1yuxlcsb1s5kw4',
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
  alternateName: 'Physio Plus',
  description: 'קליניקת פיזיותרפיה מקצועית באשדוד. פיזיותרפיסט לשעבר של נבחרת ישראל בג\'ודו.',
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
    { '@type': 'City', name: 'אשדוד' },
    { '@type': 'City', name: 'אשקלון' },
    { '@type': 'City', name: 'קריית גת' },
    { '@type': 'City', name: 'ראשון לציון' },
  ],
  acceptedPaymentMethod: [
    { '@type': 'PaymentMethod', name: 'ביטוח משלים כללית' },
    { '@type': 'PaymentMethod', name: 'קופת חולים מאוחדת' },
    { '@type': 'PaymentMethod', name: 'משרד הביטחון' },
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
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <head>
        {/* Preconnect to Google Tag Manager for better performance */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-58XQH9KN');`,
          }}
        />
        {/* End Google Tag Manager */}
        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-705216601"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-705216601');
            `,
          }}
        />
        {/* End Google tag (gtag.js) */}
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
