import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import ClinicNapCta from '@/components/ClinicNapCta'
import ServiceFaqAccordion from '@/components/ServiceFaqAccordion'
import ServiceImage from '@/components/ServiceImage'
import type { ServiceLandingPageData } from '@/config/service-pages.config'
import { absUrl } from '@/config/service-pages.config'
import { getAshdodAreaServed, getClinicEntityRef } from '@/config/geo.config'
import { seoConfig } from '@/config/seo.config'

type ServiceLandingPageProps = {
  page: ServiceLandingPageData
}

export default function ServiceLandingPage({ page }: ServiceLandingPageProps) {
  const pageUrl = absUrl(`/services/${page.slug}`)
  const clinicRef = getClinicEntityRef()

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: page.schemaName,
    serviceType: page.serviceType,
    description: page.schemaDescription,
    url: pageUrl,
    image: absUrl(page.imagePath),
    provider: clinicRef,
    areaServed: getAshdodAreaServed(),
    audience: {
      '@type': 'PeopleAudience',
      geographicArea: getAshdodAreaServed(),
    },
    termsOfService: absUrl('/terms'),
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: pageUrl,
      servicePhone: seoConfig.contact.phoneTel,
      serviceLocation:
        page.hubId === 'home-visits' ? getAshdodAreaServed() : clinicRef,
    },
    hoursAvailable: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
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
    ...(page.conditions.length > 0 ? { additionalType: 'https://schema.org/MedicalProcedure' } : {}),
  }

  const procedureSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: page.schemaName,
    description: page.schemaDescription,
    url: pageUrl,
    procedureType: page.schemaName,
    medicalSpecialty: {
      '@type': 'MedicalSpecialty',
      name: 'Physical Therapy',
    },
    howPerformed: page.approach,
    followup: page.includes.join(', '),
    preparation: 'מומלץ להביא מסמכים רפואיים רלוונטיים אם קיימים.',
    condition: page.conditions,
    provider: clinicRef,
    areaServed: getAshdodAreaServed(),
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(procedureSchema) }}
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
              { label: 'שירותים', href: '/services' },
              { label: page.navTitle, href: `/services/${page.slug}` },
            ]}
          />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">{page.h1}</h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl">{page.lead}</p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-10 items-start max-w-6xl mx-auto">
            <div className="flex-1">
              {page.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-lg text-gray-700 leading-relaxed mb-5">
                  {paragraph}
                </p>
              ))}

              <h2 className="text-xl sm:text-2xl font-bold mb-4 mt-8" style={{ color: '#2A3080' }}>
                מה כולל הטיפול?
              </h2>
              <ul className="space-y-2 mb-8">
                {page.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: '#2080C0' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-lg text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              <h2 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: '#2A3080' }}>
                למי זה מתאים?
              </h2>
              <ul className="space-y-2 mb-8">
                {page.suitableFor.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: '#2080C0' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-lg text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              <h2 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: '#2A3080' }}>
                איך מתקדמים בטיפול?
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">{page.approach}</p>
            </div>

            <div className="w-full lg:w-[42%] lg:sticky lg:top-28">
              <div className="rounded-xl shadow-xl overflow-hidden relative h-64 sm:h-80 lg:h-[420px]">
                <ServiceImage
                  src={page.imagePath}
                  fallbackSrc={page.fallbackImagePath}
                  alt={page.imageAlt}
                  className="object-cover w-full h-full"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  priority
                />
              </div>
            </div>
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
                שירותים קשורים
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

      <ClinicNapCta whatsappMessage={page.whatsappMessage} />
    </div>
  )
}
