'use client'

import { useState } from 'react'
import type { ServiceFaq } from '@/config/service-pages.config'

type ServiceFaqAccordionProps = {
  faqs: ServiceFaq[]
}

export default function ServiceFaqAccordion({ faqs }: ServiceFaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  if (faqs.length === 0) return null

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={faq.question}
          className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <button
            type="button"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-6 py-4 text-right flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
            aria-expanded={openIndex === index}
            aria-controls={`service-faq-answer-${index}`}
          >
            <span className="text-base sm:text-lg font-bold text-gray-900 flex-1">
              {faq.question}
            </span>
            <svg
              className={`w-6 h-6 text-[#2080C0] flex-shrink-0 mr-4 transition-transform duration-300 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div
            id={`service-faq-answer-${index}`}
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              openIndex === index ? 'max-h-[40rem] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            {openIndex === index ? (
              <div className="px-6 pb-4">
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  )
}
