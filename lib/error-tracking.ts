/**
 * Error tracking utilities
 * Tracks errors and sends them to Google Analytics
 */

export interface ErrorInfo {
  message: string
  source?: string
  lineno?: number
  colno?: number
  error?: Error
  stack?: string
  url?: string
  userAgent?: string
}

/**
 * Track error to Google Analytics
 */
export function trackError(errorInfo: ErrorInfo) {
  if (typeof window === 'undefined' || !window.gtag) {
    return
  }

  const errorMessage = errorInfo.error?.message || errorInfo.message || 'Unknown error'
  const errorSource = errorInfo.source || errorInfo.url || 'unknown'
  const errorLine = errorInfo.lineno || errorInfo.error?.stack?.split('\n')[1] || 'unknown'

  // Send to Google Analytics
  window.gtag('event', 'exception', {
    description: `${errorMessage} at ${errorSource}:${errorLine}`,
    fatal: false,
    error_message: errorMessage,
    error_source: errorSource,
    error_line: errorLine.toString(),
  })

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.error('[Error Tracking]', errorInfo)
  }
}

/**
 * Initialize error tracking
 */
export function initErrorTracking() {
  if (typeof window === 'undefined') {
    return
  }

  // Track unhandled errors
  window.addEventListener('error', (event) => {
    trackError({
      message: event.message,
      source: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: event.error,
      stack: event.error?.stack,
      url: window.location.href,
      userAgent: navigator.userAgent,
    })
  })

  // Track unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    trackError({
      message: event.reason?.message || 'Unhandled promise rejection',
      error: event.reason,
      stack: event.reason?.stack,
      url: window.location.href,
      userAgent: navigator.userAgent,
    })
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
