import Link from 'next/link'
import { getTopManualReviews } from '@/config/manual-reviews.config'
import { getReviewUrl } from '@/config/google-business.config'

export default function MeuhedetReviewsStrip() {
  const reviews = getTopManualReviews(3)
  const reviewUrl = getReviewUrl()

  if (reviews.length === 0) return null

  return (
    <section className="py-14 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex gap-0.5" aria-label="דירוג 5 מתוך 5 כוכבים ב-Google">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-700">5.0 · Google</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: '#2A3080' }}>
                מה אומרים המטופלים
              </h2>
            </div>
            {reviewUrl && (
              <a
                href={reviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#2080C0] hover:underline shrink-0"
              >
                כל הביקורות ב-Google
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {reviews.map((review) => (
              <blockquote
                key={review.id}
                className="rounded-2xl border border-gray-200 bg-gray-50 p-5 shadow-sm"
              >
                <div className="flex gap-0.5 mb-3" aria-hidden="true">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  &quot;{review.text.length > 180 ? review.text.substring(0, 180) + '...' : review.text}&quot;
                </p>
                <footer className="text-sm">
                  <cite className="font-bold text-gray-900 not-italic">{review.authorName}</cite>
                  <span className="text-gray-500 mr-2"> · {review.relativeTimeDescription}</span>
                </footer>
              </blockquote>
            ))}
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            <Link href="/testimonials" className="text-[#2080C0] font-semibold hover:underline">
              צפו בכל ההמלצות
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
