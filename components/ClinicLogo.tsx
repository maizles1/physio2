'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function ClinicLogo() {
  const [logoError, setLogoError] = useState(false)

  return (
    <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center shadow-md overflow-hidden relative bg-white border border-gray-200 p-1">
      {!logoError ? (
        <Image
          src="/images/logo/clinic-logo.png"
          alt="לוגו פיזיותרפיה.פלוס"
          width={48}
          height={48}
          className="object-contain w-full h-full max-w-full max-h-full"
          onError={() => setLogoError(true)}
          priority
          quality={90}
        />
      ) : (
        <svg className="w-6 h-6 md:w-8 md:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )}
    </div>
  )
}

