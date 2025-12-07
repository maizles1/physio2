/**
 * קונפיגורציה לסקריפט ניטור SEO
 * גרסה JavaScript לתאימות עם Node.js scripts
 */

require('dotenv').config({ path: '.env.local' })

const seoMonitoringConfig = {
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
    to: (process.env.SEO_REPORT_EMAIL_TO || 'your-email@example.com').split(','),
    smtp: {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587', 10),
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
function getFullUrl(path) {
  const baseUrl = seoMonitoringConfig.siteUrl.replace(/\/$/, '')
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${baseUrl}${cleanPath}`
}

function shouldSendAlert(score, threshold) {
  return score < threshold
}

function formatScore(score) {
  return `${Math.round(score)}/100`
}

function getScoreColor(score, threshold) {
  if (score >= threshold) return '#10b981' // green
  if (score >= threshold * 0.8) return '#f59e0b' // yellow
  return '#ef4444' // red
}

module.exports = {
  seoMonitoringConfig,
  getFullUrl,
  shouldSendAlert,
  formatScore,
  getScoreColor,
}



