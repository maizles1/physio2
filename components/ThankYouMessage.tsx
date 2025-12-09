'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'

function ThankYouMessageInner() {
  const searchParams = useSearchParams()
  const review = searchParams?.get('review')
  const shouldShow = review === 'thank-you'
  const [showMessage, setShowMessage] = useState(shouldShow)

  useEffect(() => {
    if (!shouldShow) {
      return
    }

    // Auto-hide after 5 seconds
    const hideTimer = setTimeout(() => {
      setShowMessage(false)
      // Remove query param from URL
      const url = new URL(window.location.href)
      url.searchParams.delete('review')
      window.history.replaceState({}, '', url.toString())
    }, 5000)

    return () => {
      clearTimeout(hideTimer)
    }
  }, [shouldShow])

  if (!showMessage) return null

  return (
    <div className="container py-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-green-50 border-r-4 border-green-500 rounded-lg p-4 mb-4 animate-fade-in">
          <div className="flex items-start gap-3">
            <svg
              className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-green-800 mb-1">
                תודה רבה על הביקורת שלך!
              </h3>
              <p className="text-green-700">
                הביקורת שלך חשובה לנו מאוד ומעזרת לאחרים למצוא את השירותים הטובים ביותר. 
                אנו מעריכים את הזמן שלקחת לשתף את החוויה שלך.
              </p>
            </div>
            <button
              onClick={() => setShowMessage(false)}
              className="text-green-500 hover:text-green-700 focus:outline-none"
              aria-label="סגור"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ThankYouMessage() {
  return (
    <Suspense fallback={null}>
      <ThankYouMessageInner />
    </Suspense>
  )
}
