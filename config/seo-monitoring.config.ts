/**
 * קונפיגורציה לסקריפט ניטור SEO
 * כולל הגדרות לבדיקות, אימייל, ו-URLs
 */

export interface SEOMonitoringConfig {
  siteUrl: string
  pagesToCheck: string[]
  email: {
    enabled: boolean
    from: string
    to: string[]
    smtp: {
      host: string
      port: number
      secure: boolean
      auth: {
        user: string
        pass: string
      }
    }
  }
  lighthouse: {
    enabled: boolean
    categories: ('performance' | 'accessibility' | 'best-practices' | 'seo')[]
    device: 'mobile' | 'desktop'
  }
  pagespeed: {
    enabled: boolean
    apiKey?: string
  }
  cron: {
    enabled: boolean
    schedule: string // cron expression
  }
  thresholds: {
    performance: number // 0-100
    accessibility: number
    bestPractices: number
    seo: number
    pageSpeed: number
  }
}

// Note: This file uses CommonJS require for compatibility with Node.js scripts
// The actual config will be loaded in the scripts using require()

export const seoMonitoringConfig: SEOMonitoringConfig = {
  siteUrl: 'https://physiotherapy.plus',
  pagesToCheck: [
    '/',
    '/about',
    '/services',
    '/blog',
    '/contact',
    '/faq',
    '/testimonials',
  ],
  email: {
    enabled: true,
    from: process.env.SEO_REPORT_EMAIL_FROM || 'noreply@physiotherapy.plus',
    to: process.env.SEO_REPORT_EMAIL_TO?.split(',') || ['your-email@example.com'],
    smtp: {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || '',
      },
    },
  },
  lighthouse: {
    enabled: true,
    categories: ['performance', 'accessibility', 'best-practices', 'seo'],
    device: 'mobile',
  },
  pagespeed: {
    enabled: true,
    apiKey: process.env.GOOGLE_PAGESPEED_API_KEY || '',
  },
  cron: {
    enabled: true,
    schedule: '0 9 * * 0', // כל יום ראשון בשעה 9:00
  },
  thresholds: {
    performance: 90,
    accessibility: 90,
    bestPractices: 90,
    seo: 95,
    pageSpeed: 90,
  },
}

/**
 * פונקציות עזר
 */

export function getFullUrl(path: string): string {
  const baseUrl = seoMonitoringConfig.siteUrl.replace(/\/$/, '')
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${baseUrl}${cleanPath}`
}

export function shouldSendAlert(score: number, threshold: number): boolean {
  return score < threshold
}

export function formatScore(score: number): string {
  return `${Math.round(score)}/100`
}

export function getScoreColor(score: number, threshold: number): string {
  if (score >= threshold) return '#10b981' // green
  if (score >= threshold * 0.8) return '#f59e0b' // yellow
  return '#ef4444' // red
}




