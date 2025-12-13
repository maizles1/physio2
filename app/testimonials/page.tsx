import { Metadata } from 'next'
import { Suspense } from 'react'
import LeaveReviewButton from '@/components/LeaveReviewButton'
import TestimonialsContent from '@/components/TestimonialsContent'
import ThankYouMessage from '@/components/ThankYouMessage'

export const metadata: Metadata = {
  title: 'עדויות מטופלים - המלצות על פיזיותרפיה.פלוס',
  description: 'קראו עדויות והמלצות של מטופלים על השירותים והטיפול במכון פיזיותרפיה.פלוס. חוות דעת אמיתיות ממטופלים מרוצים.',
  openGraph: {
    title: 'עדויות מטופלים - פיזיותרפיה.פלוס',
    description: 'חוות דעת והמלצות של מטופלים על הטיפול בקליניקה',
    url: 'https://physio-plus.co.il/testimonials',
  },
}

export default function TestimonialsPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden py-12 sm:py-16" style={{ background: 'linear-gradient(to bottom right, #2A3080, #2080C0, #40C0F0)' }}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">עדויות מטופלים</h1>
            <p className="text-lg sm:text-xl text-white mb-6">קראו מה אומרים המטופלים שלנו על השירותים והטיפול בקליניקה</p>
            
            {/* Leave Review Button */}
            <div className="mt-6">
              <LeaveReviewButton redirectTo="/review" variant="outline" />
            </div>
          </div>
        </div>
      </section>

      {/* Thank You Message */}
      <ThankYouMessageWrapper />

      {/* Testimonials Content */}
      <Suspense fallback={<TestimonialsLoading />}>
        <TestimonialsContent />
      </Suspense>
    </div>
  )
}

function ThankYouMessageWrapper() {
  return (
    <Suspense fallback={null}>
      <ThankYouMessage />
    </Suspense>
  )
}

function TestimonialsLoading() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 animate-pulse"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-full" />
                  <div className="flex-1">
                    <div className="h-4 bg-gray-300 rounded w-24 mb-2" />
                    <div className="h-3 bg-gray-300 rounded w-16" />
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <div key={j} className="w-5 h-5 bg-gray-300 rounded" />
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded" />
                  <div className="h-4 bg-gray-300 rounded w-5/6" />
                  <div className="h-4 bg-gray-300 rounded w-4/6" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
