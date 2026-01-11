'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to console or error reporting service
    console.error('Global error:', error)
  }, [error])

  return (
    <html lang="he" dir="rtl">
      <body>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
          <div className="max-w-2xl w-full text-center">
            <div className="mb-8">
              <h1 className="text-9xl font-bold text-red-600 mb-4">
                שגיאה
              </h1>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                שגיאה כללית באתר
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                אירעה שגיאה בעת טעינת האתר. אנא נסה שוב מאוחר יותר.
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={reset}
                className="btn btn-primary btn-large"
              >
                נסה שוב
              </button>
              
              <div className="pt-8">
                <Link
                  href="/"
                  className="text-primary hover:underline"
                >
                  חזור לדף הבית
                </Link>
              </div>

              <div className="pt-4 text-sm text-gray-500">
                <p>אם הבעיה נמשכת, אנא צור קשר:</p>
                <a
                  href="tel:0508838982"
                  className="text-primary hover:underline"
                >
                  050-883-8982
                </a>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
