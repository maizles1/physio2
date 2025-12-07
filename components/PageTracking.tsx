/**
 * קומפוננטה למעקב אחר דפים - Client Component
 */

'use client'

import { Suspense } from 'react'
import { PageTrackingComponent, useScrollTracking, useTimeOnPageTracking } from './GoogleAnalytics'

function PageTrackingInner() {
  useScrollTracking()
  useTimeOnPageTracking()
  return null
}

export default function PageTracking() {
  return (
    <>
      <PageTrackingComponent />
      <Suspense fallback={null}>
        <PageTrackingInner />
      </Suspense>
    </>
  )
}



