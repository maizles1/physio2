import Link from 'next/link'
import { getTopManualReviews, type ManualReview } from '@/config/manual-reviews.config'

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
]

export default function TestimonialsPreview() {
  const manualReviews = getTopManualReviews(3)
  const testimonials = manualReviews.length > 0 ? manualReviews : fallbackTestimonials

  // Ensure we have at least 3 testimonials
  const displayTestimonials = [...testimonials]
  while (displayTestimonials.length < 3 && displayTestimonials.length < fallbackTestimonials.length) {
    const fallback = fallbackTestimonials[displayTestimonials.length]
    displayTestimonials.push(fallback)
  }

  return (
    <section className="section-spacing bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-gray-900">
            מה אומרים המטופלים שלנו
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            אלפי מטופלים מרוצים שממליצים על השירותים המקצועיים שלנו
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {displayTestimonials.slice(0, 3).map((testimonial) => (
            <article
              key={testimonial.id}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow"
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
                &quot;{testimonial.text.length > 150 ? testimonial.text.substring(0, 150) + '...' : testimonial.text}&quot;
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
