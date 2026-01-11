import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'דף לא נמצא - 404 | פיזיותרפיה.פלוס',
  description: 'הדף שביקשת לא נמצא. חזור לדף הבית או עיין בתפריט הניווט.',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: 'https://physio-plus.co.il/404',
  },
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary-gradient bg-clip-text text-transparent mb-4">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            הדף לא נמצא
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            נראה שהדף שביקשת לא קיים או הועבר למיקום אחר.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block btn btn-primary btn-large"
          >
            חזור לדף הבית
          </Link>
          
          <div className="pt-8">
            <p className="text-gray-600 mb-4">או נסה אחד מהקישורים הבאים:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/services"
                className="text-primary hover:underline"
              >
                שירותים
              </Link>
              <Link
                href="/about"
                className="text-primary hover:underline"
              >
                אודות
              </Link>
              <Link
                href="/blog"
                className="text-primary hover:underline"
              >
                בלוג
              </Link>
              <Link
                href="/contact"
                className="text-primary hover:underline"
              >
                צור קשר
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
