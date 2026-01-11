/**
 * קומפוננטה ל-Google Analytics 4
 * כוללת event tracking אוטומטי
 */

'use client'

import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { seoConfig } from '@/config/seo.config'

// רק אם יש Google Analytics ID
const GA_ID = seoConfig.googleAnalyticsId

/**
 * Event tracking functions
 */
export const gtag = {
  // Track page view
  pageview: (url: string) => {
    if (typeof window !== 'undefined' && window.gtag && GA_ID) {
      window.gtag('config', GA_ID, {
        page_path: url,
      })
    }
  },

  // Track custom events
  event: (action: string, category: string, label?: string, value?: number, additionalParams?: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
        ...additionalParams,
      })
    }
  },

  // Track click to call
  clickToCall: (phoneNumber: string) => {
    gtag.event('click_to_call', 'engagement', phoneNumber)
  },

  // Track form submission
  formSubmit: (formName: string) => {
    gtag.event('form_submit', 'engagement', formName)
  },

  // Track button click
  buttonClick: (buttonName: string) => {
    gtag.event('button_click', 'engagement', buttonName)
  },

  // Track scroll depth
  scrollDepth: (depth: number) => {
    gtag.event('scroll_depth', 'engagement', `${depth}%`, depth)
  },

  // Track time on page
  timeOnPage: (seconds: number) => {
    gtag.event('time_on_page', 'engagement', `${seconds} seconds`, seconds)
  },

  // Track video play
  videoPlay: (videoTitle: string) => {
    gtag.event('video_play', 'media', videoTitle)
  },

  // Track external link click
  externalLink: (url: string) => {
    gtag.event('external_link', 'outbound', url)
  },

  // Track view item (service)
  viewItem: (itemName: string, itemId?: string) => {
    gtag.event('view_item', 'engagement', itemName, undefined)
    if (itemId) {
      gtag.event('view_item', 'engagement', itemName, undefined, {
        item_id: itemId,
        item_name: itemName,
      })
    }
  },

  // Track purchase/conversion (appointment booking)
  purchase: (value: number, transactionId: string, items?: Array<{ name: string; value: number }>) => {
    gtag.event('purchase', 'conversion', transactionId, value, {
      transaction_id: transactionId,
      value: value,
      currency: 'ILS',
      items: items,
    })
  },

// Extend Window interface
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void
    dataLayer: unknown[]
  }
}

/**
 * Google Analytics Script Component
 */
export default function GoogleAnalytics() {
  if (!GA_ID) {
    return null
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}

/**
 * Component למעקב אחר שינויי דף
 */
function PageTrackingInner() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (GA_ID) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
      gtag.pageview(url)
    }
  }, [pathname, searchParams])
  
  return null
}

export function PageTrackingComponent() {
  return (
    <Suspense fallback={null}>
      <PageTrackingInner />
    </Suspense>
  )
}

/**
 * Hook למעקב אחר scroll depth
 */
export function useScrollTracking() {
  useEffect(() => {
    if (!GA_ID) return

    const trackScrollDepth = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = Math.round((scrollTop / docHeight) * 100)

      // Track at 25%, 50%, 75%, 100%
      const milestones = [25, 50, 75, 100]
      milestones.forEach((milestone) => {
        if (scrollPercent >= milestone && scrollPercent < milestone + 5) {
          gtag.scrollDepth(milestone)
        }
      })
    }

    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          trackScrollDepth()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
}

/**
 * Hook למעקב אחר זמן על הדף
 */
export function useTimeOnPageTracking() {
  useEffect(() => {
    if (!GA_ID) return

    const startTime = Date.now()

    const trackTimeOnPage = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000)
      if (timeSpent > 30) {
        // Track only if spent more than 30 seconds
        gtag.timeOnPage(timeSpent)
      }
    }

    // Track when user leaves the page
    window.addEventListener('beforeunload', trackTimeOnPage)
    
    // Track every 60 seconds
    const interval = setInterval(() => {
      trackTimeOnPage()
    }, 60000)

    return () => {
      window.removeEventListener('beforeunload', trackTimeOnPage)
      clearInterval(interval)
      trackTimeOnPage()
    }
  }, [])
}










