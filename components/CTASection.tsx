import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="section-spacing bg-primary-gradient text-white">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            מוכנים להתחיל את תהליך השיקום?
          </h2>
          <p className="text-lg sm:text-xl mb-8 text-white">
            צרו איתנו קשר עוד היום וקבלו ייעוץ מקצועי
          </p>
          <div className="flex justify-center items-center">
            <Link
              href="/contact"
              className="btn btn-secondary btn-large"
              aria-label="צור קשר איתנו - עמוד יצירת קשר"
            >
              צור קשר
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>טיפול ביטוח</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>זמינות גבוהה</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

