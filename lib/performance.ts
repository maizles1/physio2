/**
 * Performance monitoring utilities
 * Tracks Web Vitals and sends them to Google Analytics
 */

export interface WebVitals {
  name: string
  value: number
  id: string
  delta?: number
  rating?: 'good' | 'needs-improvement' | 'poor'
}

/**
 * Track Web Vitals to Google Analytics
 */
export function trackWebVitals(metric: WebVitals) {
  if (typeof window === 'undefined' || !window.gtag) {
    return
  }

  // Send to Google Analytics
  window.gtag('event', metric.name, {
    event_category: 'Web Vitals',
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    event_label: metric.id,
    non_interaction: true,
  })

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${metric.name}:`, {
      value: metric.value,
      rating: metric.rating,
      id: metric.id,
    })
  }
}

/**
 * Initialize Web Vitals tracking
 */
export function initWebVitalsTracking() {
  if (typeof window === 'undefined') {
    return
  }

  // Only load web-vitals in browser
  import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
    onCLS(trackWebVitals)
    onFCP(trackWebVitals)
    onLCP(trackWebVitals)
    onTTFB(trackWebVitals)
    onINP(trackWebVitals) // onINP replaces onFID in web-vitals v3+
  }).catch((error) => {
    console.warn('Failed to load web-vitals:', error)
  })
}

// Extend Window interface
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void
  }
}
