import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import ClinicNapCta from '@/components/ClinicNapCta'
import NeighborhoodHubLinks from '@/components/NeighborhoodHubLinks'
import ServiceFaqAccordion from '@/components/ServiceFaqAccordion'
import type { NeighborhoodPageData } from '@/config/neighborhood-pages.config'
import { neighborhoodHub } from '@/config/neighborhood-pages.config'
import { getNeighborhoodPageUrl } from '@/config/neighborhood-pages.config'
import { clinicEntity, clinicSchemaIds, getAshdodAreaServed, getClinicEntityRef } from '@/config/geo.config'

type NeighborhoodLandingPageProps = {
  page: NeighborhoodPageData
}

export default function NeighborhoodLandingPage({ page }: NeighborhoodLandingPageProps) {
  const pageUrl = getNeighborhoodPageUrl(page.slug)
  const clinicRef = getClinicEntityRef()

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    name: page.h1,
    description: page.metaDescription,
    url: pageUrl,
    inLanguage: 'he-IL',
    isPartOf: { '@id': clinicSchemaIds.website },
    about: {
      '@type': 'Place',
      name: page.placeName,
      containedInPlace: getAshdodAreaServed(),
    },
    mainEntity: {
      '@type': 'MedicalBusiness',
      '@id': clinicSchemaIds.medicalBusiness,
    },
    provider: clinicRef,
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: page.h1,
    serviceType: 'Physiotherapy',
    description: page.metaDescription,
    url: pageUrl,
    provider: clinicRef,
    areaServed: {
      '@type': 'Place',
      name: page.placeName,
      containedInPlace: getAshdodAreaServed(),
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: pageUrl,
      servicePhone: clinicEntity.phoneE164,
      serviceLocation: clinicRef,
    },
  }

  const faqSchema =
    page.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: page.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }
      : null

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}

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
              { label: page.navTitle, href: `/ashdod/${page.slug}` },
            ]}
          />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">{page.h1}</h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl">{page.lead}</p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {page.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-lg text-gray-700 leading-relaxed mb-5">
                {paragraph}
              </p>
            ))}

            <h2 className="text-xl sm:text-2xl font-bold mb-4 mt-8" style={{ color: '#2A3080' }}>
              למי זה מתאים באזור {page.navTitle}?
            </h2>
            <ul className="space-y-2 mb-8">
              {page.whoWeHelp.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: '#2080C0' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-lg text-gray-700">{item}</span>
                </li>
              ))}
            </ul>

            <h2 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: '#2A3080' }}>
              איך מגיעים לקליניקה במרכז כלניות?
            </h2>
            <ul className="space-y-2 mb-8">
              {page.gettingThere.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: '#2080C0' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-lg text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-gray-700 mb-8">
              כתובת הקליניקה: <strong>{clinicEntity.addressLine}</strong>. טלפון:{' '}
              <a href={`tel:${clinicEntity.phoneE164}`} className="text-[#2080C0] font-medium hover:underline" dir="ltr">
                {clinicEntity.phoneDisplay}
              </a>
              . פרטי ניווט, WhatsApp ואימייל — ב
              <Link href="/contact" className="text-[#2080C0] font-medium hover:underline">
                עמוד צור קשר
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {page.faqs.length > 0 ? (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center" style={{ color: '#2A3080' }}>
                שאלות נפוצות
              </h2>
              <ServiceFaqAccordion faqs={page.faqs} />
            </div>
          </div>
        </section>
      ) : null}

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold mb-4" style={{ color: '#2A3080' }}>
                שירותים רלוונטיים באשדוד
              </h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/services" className="text-[#2080C0] font-medium hover:underline">
                    כל שירותי הפיזיותרפיה
                  </Link>
                </li>
                {page.relatedServices.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-[#2080C0] font-medium hover:underline">
                      {link.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/contact" className="text-[#2080C0] font-medium hover:underline">
                    יצירת קשר וקביעת תור
                  </Link>
                </li>
              </ul>
            </div>
            {page.relatedReads.length > 0 ? (
              <div>
                <h2 className="text-xl font-bold mb-4" style={{ color: '#2A3080' }}>
                  לקריאה נוספת
                </h2>
                <ul className="space-y-2">
                  {page.relatedReads.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-[#2080C0] font-medium hover:underline">
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <NeighborhoodHubLinks
        excludeSlug={page.slug}
        heading="אזורים נוספים באשדוד"
        intro="דפים קצרים לרובעים אחרים — בלי כתובות מדומות ובלי סניפים שלא קיימים."
      />

      <ClinicNapCta whatsappMessage={page.whatsappMessage} heading={page.ctaHeading} />
    </div>
  )
}
