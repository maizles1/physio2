'use client'

import { useEffect } from 'react'
import { initWebVitalsTracking } from '@/lib/performance'
import { initErrorTracking } from '@/lib/error-tracking'

export default function PerformanceTracker() {
  useEffect(() => {
    // Initialize Web Vitals tracking
    initWebVitalsTracking()

    // Initialize error tracking
    initErrorTracking()
  }, [])

  return null
}
