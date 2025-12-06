'use client'

import Link from 'next/link'

export default function SkipLink() {
  return (
    <Link
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:right-4 focus:z-[100] focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      דלג לתוכן הראשי
    </Link>
  )
}

