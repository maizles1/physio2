/**
 * סקריפט לבדיקת SEO מקיפה
 * בודק: PageSpeed, Lighthouse, Meta tags, Structured Data, Broken links
 */

const lighthouse = require('lighthouse')
const chromeLauncher = require('chrome-launcher')
const cheerio = require('cheerio')
const fetch = require('node-fetch')
const fs = require('fs').promises
const path = require('path')
const { seoMonitoringConfig, getFullUrl, formatScore, getScoreColor, shouldSendAlert } = require('../config/seo-monitoring.config.js')

// Ensure config is loaded correctly
const config = seoMonitoringConfig

/**
 * בדיקת Lighthouse
 */
async function runLighthouse(url) {
  if (!config.lighthouse.enabled) {
    return null
  }

  try {
    const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] })
    const options = {
      logLevel: 'info',
      output: 'json',
      onlyCategories: config.lighthouse.categories,
      port: chrome.port,
    }

    const runnerResult = await lighthouse(url, options)
    await chrome.kill()

    const scores = {
      performance: runnerResult.lhr.categories.performance?.score * 100 || 0,
      accessibility: runnerResult.lhr.categories.accessibility?.score * 100 || 0,
      bestPractices: runnerResult.lhr.categories['best-practices']?.score * 100 || 0,
      seo: runnerResult.lhr.categories.seo?.score * 100 || 0,
    }

    return {
      scores,
      audits: runnerResult.lhr.audits,
      url,
    }
  } catch (error) {
    console.error(`Lighthouse error for ${url}:`, error.message)
    return null
  }
}

/**
 * בדיקת PageSpeed Insights
 */
async function checkPageSpeed(url) {
  if (!config.pagespeed.enabled || !config.pagespeed.apiKey) {
    return null
  }

  try {
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${config.pagespeed.apiKey}&strategy=mobile`
    const response = await fetch(apiUrl)
    const data = await response.json()

    if (data.error) {
      console.error('PageSpeed API error:', data.error.message)
      return null
    }

    const lighthouseResult = data.lighthouseResult
    return {
      mobile: {
        performance: lighthouseResult.categories.performance?.score * 100 || 0,
        fcp: lighthouseResult.audits['first-contentful-paint']?.numericValue || 0,
        lcp: lighthouseResult.audits['largest-contentful-paint']?.numericValue || 0,
        cls: lighthouseResult.audits['cumulative-layout-shift']?.numericValue || 0,
        tbt: lighthouseResult.audits['total-blocking-time']?.numericValue || 0,
      },
    }
  } catch (error) {
    console.error(`PageSpeed error for ${url}:`, error.message)
    return null
  }
}

/**
 * בדיקת Meta Tags
 */
async function checkMetaTags(url) {
  try {
    const response = await fetch(url)
    const html = await response.text()
    const $ = cheerio.load(html)

    const meta = {
      title: $('title').text() || '',
      description: $('meta[name="description"]').attr('content') || '',
      keywords: $('meta[name="keywords"]').attr('content') || '',
      ogTitle: $('meta[property="og:title"]').attr('content') || '',
      ogDescription: $('meta[property="og:description"]').attr('content') || '',
      ogImage: $('meta[property="og:image"]').attr('content') || '',
      canonical: $('link[rel="canonical"]').attr('href') || '',
      robots: $('meta[name="robots"]').attr('content') || '',
    }

    const issues = []
    if (!meta.title) issues.push('Missing title tag')
    if (!meta.description) issues.push('Missing meta description')
    if (meta.description && meta.description.length > 160) {
      issues.push(`Meta description too long (${meta.description.length} chars)`)
    }
    if (meta.title && meta.title.length > 60) {
      issues.push(`Title too long (${meta.title.length} chars)`)
    }
    if (!meta.canonical) issues.push('Missing canonical URL')
    if (!meta.ogTitle) issues.push('Missing Open Graph title')
    if (!meta.ogDescription) issues.push('Missing Open Graph description')

    return {
      meta,
      issues,
      hasIssues: issues.length > 0,
    }
  } catch (error) {
    console.error(`Meta tags check error for ${url}:`, error.message)
    return { meta: {}, issues: [`Error: ${error.message}`], hasIssues: true }
  }
}

/**
 * בדיקת Structured Data
 */
async function checkStructuredData(url) {
  try {
    const response = await fetch(url)
    const html = await response.text()
    const $ = cheerio.load(html)

    const scripts = $('script[type="application/ld+json"]')
    const schemas = []

    scripts.each((i, elem) => {
      try {
        const json = JSON.parse($(elem).html())
        schemas.push({
          type: json['@type'] || 'Unknown',
          valid: true,
        })
      } catch (e) {
        schemas.push({
          type: 'Invalid',
          valid: false,
          error: e.message,
        })
      }
    })

    return {
      count: schemas.length,
      schemas,
      hasIssues: schemas.some(s => !s.valid),
    }
  } catch (error) {
    console.error(`Structured data check error for ${url}:`, error.message)
    return { count: 0, schemas: [], hasIssues: true }
  }
}

/**
 * בדיקת Broken Links
 */
async function checkBrokenLinks(url) {
  try {
    const response = await fetch(url)
    const html = await response.text()
    const $ = cheerio.load(html)

    const links = []
    $('a[href]').each((i, elem) => {
      const href = $(elem).attr('href')
      if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
        links.push(href)
      }
    })

    const brokenLinks = []
    for (const link of links.slice(0, 20)) { // Check first 20 links
      try {
        const fullUrl = link.startsWith('http') ? link : getFullUrl(link)
        const linkResponse = await fetch(fullUrl, { method: 'HEAD' })
        if (linkResponse.status >= 400) {
          brokenLinks.push({ url: fullUrl, status: linkResponse.status })
        }
      } catch (error) {
        brokenLinks.push({ url: link, status: 'Error', error: error.message })
      }
    }

    return {
      totalLinks: links.length,
      checkedLinks: Math.min(20, links.length),
      brokenLinks,
      hasIssues: brokenLinks.length > 0,
    }
  } catch (error) {
    console.error(`Broken links check error for ${url}:`, error.message)
    return { totalLinks: 0, checkedLinks: 0, brokenLinks: [], hasIssues: false }
  }
}

/**
 * בדיקה מקיפה של עמוד
 */
async function auditPage(url) {
  console.log(`\n🔍 Auditing: ${url}`)

  const [lighthouseResult, pageSpeedResult, metaTags, structuredData, brokenLinks] = await Promise.all([
    runLighthouse(url),
    checkPageSpeed(url),
    checkMetaTags(url),
    checkStructuredData(url),
    checkBrokenLinks(url),
  ])

  return {
    url,
    timestamp: new Date().toISOString(),
    lighthouse: lighthouseResult,
    pageSpeed: pageSpeedResult,
    metaTags,
    structuredData,
    brokenLinks,
  }
}

/**
 * בדיקה של כל העמודים
 */
async function auditAllPages() {
  console.log('🚀 Starting SEO Audit...\n')
  console.log(`Checking ${config.pagesToCheck.length} pages...`)

  const results = []
  for (const page of config.pagesToCheck) {
    const fullUrl = getFullUrl(page)
    const result = await auditPage(fullUrl)
    results.push(result)
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000))
  }

  return results
}

/**
 * שמירת תוצאות לקובץ
 */
async function saveResults(results) {
  const reportsDir = path.join(__dirname, '../reports')
  await fs.mkdir(reportsDir, { recursive: true })

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const filename = `seo-audit-${timestamp}.json`
  const filepath = path.join(reportsDir, filename)

  await fs.writeFile(filepath, JSON.stringify(results, null, 2))
  console.log(`\n✅ Results saved to: ${filepath}`)

  return filepath
}

/**
 * Main function
 */
async function main() {
  try {
    const results = await auditAllPages()
    const filepath = await saveResults(results)

    console.log('\n✅ SEO Audit completed!')
    console.log(`📊 Results saved to: ${filepath}`)
    
    // Return results for use by other scripts
    return { results, filepath }
  } catch (error) {
    console.error('❌ SEO Audit failed:', error)
    process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  main()
}

module.exports = { auditPage, auditAllPages, main }



