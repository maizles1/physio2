import Link from 'next/link'
import { getTopManualReviews, type ManualReview } from '@/config/manual-reviews.config'
import { getReviewUrl } from '@/config/google-business.config'

// Fallback testimonials if no manual reviews available
const fallbackTestimonials: ManualReview[] = [
  {
    id: 'local-1',
    authorName: 'דני כהן',
    rating: 5,
    date: new Date().toISOString(),
    relativeTimeDescription: 'לפני שבוע',
    text: 'הטיפול שקיבלתי בקליניקה היה מעולה. הצוות המקצועי והגישה האישית עזרו לי לחזור לפעילות תוך זמן קצר. ממליץ בחום!',
  },
  {
    id: 'local-2',
    authorName: 'שרה לוי',
    rating: 5,
    date: new Date().toISOString(),
    relativeTimeDescription: 'לפני שבועיים',
    text: 'לאחר ניתוח ברך, השיקום בקליניקה היה מדהים. הפיזיותרפיסטים סבלניים ומקצועיים, והתוצאות מעבר למצופה.',
  },
  {
    id: 'local-3',
    authorName: 'יוסי אברהם',
    rating: 5,
    date: new Date().toISOString(),
    relativeTimeDescription: 'לפני חודש',
    text: 'סבלתי מכאבי גב כרוניים במשך שנים. הטיפול בקליניקה שינה את חיי. היום אני יכול לחזור לפעילות יומיומית ללא כאבים.',
  },
  {
    id: 'local-4',
    authorName: 'מיכל דוד',
    rating: 5,
    date: new Date().toISOString(),
    relativeTimeDescription: 'לפני חודשיים',
    text: 'טיפול מקצועי ואיכפתי. הצוות הקשיב והתאים תוכנית אישית. התוצאות לא איחרו להגיע. ממליצה בחום.',
  },
]

export default function TestimonialsPreview() {
  const topReviews = getTopManualReviews(4)
  const testimonials = topReviews.length > 0 ? topReviews : fallbackTestimonials
  const reviewUrl = getReviewUrl()

  // Ensure we have at least 4 testimonials
  const displayTestimonials = [...testimonials]
  while (displayTestimonials.length < 4 && displayTestimonials.length < fallbackTestimonials.length) {
    const fallback = fallbackTestimonials[displayTestimonials.length]
    displayTestimonials.push(fallback)
  }

  return (
    <section className="section-spacing bg-gray-50 section-reveal">
      <div className="container">
        <div className="text-center mb-6">
          <h2 className="mb-1 text-gray-900">
            מה אומרים המטופלים שלנו
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            מטופלים רבים מרוצים מהשירותים שלנו וממליצים עלינו בחום
          </p>
          {reviewUrl && (
            <p className="mt-3">
              <a
                href={reviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[var(--secondary)] font-semibold hover:text-[var(--secondary-dark)] underline"
                aria-label="השאר ביקורת ב-Google"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                השאר ביקורת ב-Google
              </a>
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {displayTestimonials.slice(0, 4).map((testimonial) => (
            <article
              key={testimonial.id}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
              role="article"
              aria-label={`המלצה של ${testimonial.authorName}`}
            >
              <div className="flex gap-1 mb-4" aria-label={`דירוג: ${testimonial.rating} מתוך 5 כוכבים`}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                &quot;{testimonial.text && testimonial.text.length > 150 ? testimonial.text.substring(0, 150) + '...' : testimonial.text || ''}&quot;
              </p>
              <div className="border-t border-gray-200 pt-4">
                <div className="font-bold text-gray-900">{testimonial.authorName}</div>
                <div className="text-sm text-gray-600">
                  {testimonial.relativeTimeDescription}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/testimonials"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            aria-label="צפה בכל המלצות המטופלים"
          >
            צפה בכל ההמלצות
          </Link>
        </div>
      </div>
    </section>
  )
}
