import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'מצב לא מקוון - פיזיותרפיה.פלוס',
  description: 'אין חיבור לאינטרנט. אנא בדוק את החיבור שלך ונסה שוב.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function OfflinePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] bg-gray-50 text-center py-12 px-4">
      <div className="max-w-md mx-auto">
        <svg
          className="w-24 h-24 mx-auto mb-6 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18.364 5.636a9 9 0 010 12.728m0 0l-5.829-5.829m5.829 5.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.122-2.122m2.122 2.122L12 12m-3.536-3.536a5 5 0 010 7.072m0 0l-2.122-2.122m2.122 2.122L9 12"
          />
        </svg>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">אין חיבור לאינטרנט</h1>
        <p className="text-lg text-gray-600 mb-8">
          נראה שאין לך חיבור לאינטרנט כרגע. אנא בדוק את החיבור שלך ונסה שוב.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="btn btn-primary btn-large"
            aria-label="רענן את הדף"
          >
            רענן את הדף
          </button>
          <Link
            href="/"
            className="btn btn-secondary btn-large"
            aria-label="חזור לדף הבית"
          >
            חזור לדף הבית
          </Link>
        </div>
      </div>
    </div>
  )
}
