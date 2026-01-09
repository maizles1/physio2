import LeaveReviewButton from './LeaveReviewButton'
import { getAllManualReviews, type ManualReview } from '@/config/manual-reviews.config'
import Image from 'next/image'

interface ReviewsResponse {
  reviews: ManualReview[]
  averageRating: number
  totalReviews: number
}

// Local testimonials as fallback if no manual reviews
const localTestimonials: ManualReview[] = [
  {
    id: 'local-1',
    authorName: 'דני כהן',
    rating: 5,
    date: new Date().toISOString(),
    relativeTimeDescription: 'לפני שבוע',
    text: 'הטיפול שקיבלתי בקליניקה היה מעולה. הצוות המקצועי והגישה האישית עזרו לי לחזור לפעילות תוך זמן קצר. המטפלים היו סבלניים וקשובים, והתוכנית שהותאמה לי הייתה מדויקת ובעלת תוצאות. ממליץ בחום!',
  },
  {
    id: 'local-2',
    authorName: 'שרה לוי',
    rating: 5,
    date: new Date().toISOString(),
    relativeTimeDescription: 'לפני שבועיים',
    text: 'לאחר ניתוח ברך, השיקום בקליניקה היה מדהים. הפיזיותרפיסטים סבלניים ומקצועיים, והתוצאות מעבר למצופה. הצליחו להחזיר לי את התפקוד המלא ולאפשר לי לחזור לחיי היומיום שלי בצורה נורמלית.',
  },
]

function getReviews(): ReviewsResponse {
  const manualReviews = getAllManualReviews()
  const allReviews = manualReviews.length > 0 ? manualReviews : localTestimonials
  
  const averageRating = allReviews.length > 0
    ? Math.round((allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length) * 10) / 10
    : 0

  return {
    reviews: allReviews,
    averageRating,
    totalReviews: allReviews.length,
  }
}


function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export default function TestimonialsContent() {
  const reviewsData = getReviews()
  const allReviews = reviewsData.reviews

  // Create structured data for reviews
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'פיזיותרפיה.פלוס',
    aggregateRating: allReviews.length > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: reviewsData.averageRating || 5,
      reviewCount: allReviews.length,
      bestRating: 5,
      worstRating: 1,
    } : undefined,
    review: allReviews.map((review) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.authorName,
      },
      datePublished: review.date,
      reviewBody: review.text,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Testimonials */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            {/* Average Rating */}
            {reviewsData.averageRating > 0 && (
              <div className="text-center mb-12">
                <div className="inline-flex flex-col items-center gap-3 bg-blue-50 rounded-xl px-8 py-6 border-2 border-blue-200">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-bold text-primary-dark">
                      {reviewsData.averageRating.toFixed(1)}
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-8 h-8 text-yellow-400"
                          fill={i < Math.round(reviewsData.averageRating) ? 'currentColor' : 'none'}
                          stroke={i < Math.round(reviewsData.averageRating) ? 'currentColor' : '#d1d5db'}
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <div className="text-gray-700 font-medium">
                    מתוך {reviewsData.totalReviews} ביקורות
                  </div>
                </div>
              </div>
            )}

            {/* Reviews Grid */}
            {allReviews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {allReviews.map((review) => (
                  <article
                    key={review.id}
                    className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      {review.profilePhotoUrl ? (
                        <Image
                          src={review.profilePhotoUrl}
                          alt={review.authorName}
                          width={64}
                          height={64}
                          className="w-16 h-16 rounded-full object-cover"
                          loading="lazy"
                          quality={85}
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                          {getInitials(review.authorName)}
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900">{review.authorName}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>{review.relativeTimeDescription}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-700 leading-relaxed italic">
                      &quot;{review.text}&quot;
                    </p>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-6">אין ביקורות זמינות כרגע.</p>
                <LeaveReviewButton />
              </div>
            )}

            {/* Call to Action */}
            <div className="mt-12 text-center">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
                <h2 className="text-2xl font-bold mb-4 text-primary-dark">
                  חווית טיפול טובה? נשמח לשמוע מכם!
                </h2>
                <p className="text-gray-600 mb-6">
                  השאירו ביקורת ב-Google ועזרו לאחרים למצוא את השירותים הטובים ביותר
                </p>
                <LeaveReviewButton redirectTo="/review" variant="primary" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
