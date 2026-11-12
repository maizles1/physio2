#!/usr/bin/env node
/**
 * Tag check: makes sure the marketing tags still work after a site change.
 *
 *   npm run tag-check                         # live site
 *   npm run tag-check -- http://localhost:3000  # local build (npm run build && npm start)
 *
 * Opens the site in Chrome at phone size and checks:
 *   - consent defaults are set and GTM (GTM-MK3F6SVQ) loads after the first scroll
 *   - GA4 page_view, the Google Ads page tag and the Meta PageView are sent
 *   - WhatsApp and phone taps send their Google Ads conversion, both as the very
 *     first action and after scrolling, and only once
 *   - the lead form's form_submit event sends the form conversion
 *   - a visitor who declined cookies gets Consent Mode "denied" (gcs=G100)
 *
 * WhatsApp/phone navigations are blocked and no real form is sent, so running
 * it creates no leads or messages. It does send test hits to Google/Meta.
 * Exits with code 1 if any check fails.
 */
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const BASE = (process.argv[2] || 'https://physio-plus.co.il').replace(/\/$/, '') + '/'

// Click conversions live in config/seo.config.ts (googleAdsClickConversions).
const seoConfigPath = fileURLToPath(new URL('../config/seo.config.ts', import.meta.url))
const seoConfig = readFileSync(seoConfigPath, 'utf8')
const label = (key) => seoConfig.match(new RegExp(`${key}: 'AW-\\d+/([^']+)'`))?.[1]
const LABELS = {
  whatsapp: label('whatsapp'),
  phone: label('phone'),
  // These two are set only in GTM. Update if the GTM tags change.
  form: 'bGZjCP_V8KwBENmAo9AC',
}
// Meta skips hits from headless browsers, so look like a normal phone.
const UA =
  'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Mobile Safari/537.36'

const results = []
const check = (name, ok, detail = '') => {
  results.push({ name, ok })
  console.log(`${ok ? '✔' : '✖'} ${name}${detail ? `  (${detail})` : ''}`)
}

async function launch() {
  try {
    return await chromium.launch({ channel: 'chrome' })
  } catch {
    return await chromium.launch()
  }
}

/** Opens the page, runs `steps`, and returns what was sent. */
async function visit(browser, { consent, steps }) {
  const ctx = await browser.newContext({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true, userAgent: UA })
  if (consent) await ctx.addInitScript((c) => localStorage.setItem('cookie_consent', c), consent)
  await ctx.route(/wa\.me|api\.whatsapp\.com/, (r) => r.abort())
  const sent = { urls: [] }
  ctx.on('request', (r) => sent.urls.push(r.url()))
  const page = await ctx.newPage()
  page.on('popup', (p) => p.close().catch(() => {}))
  try {
    await page.goto(BASE, { waitUntil: 'load', timeout: 30000 })
  } catch (err) {
    console.log(`✖ Could not open ${BASE}: ${String(err.message || err).split('\n')[0]}`)
    process.exit(1)
  }
  // Keep tel: links from trying to dial.
  await page.evaluate(() =>
    document.querySelectorAll('a[href^="tel:"]').forEach((a) => a.addEventListener('click', (e) => e.preventDefault()))
  )
  let state = {}
  try {
    state = (await steps(page)) || {}
  } catch (err) {
    console.log(`  (step failed: ${String(err.message || err).split('\n')[0]})`)
  }
  await page.waitForTimeout(5000)
  await ctx.close()
  const count = (re) => sent.urls.filter((u) => re.test(u)).length
  const has = (s) => sent.urls.some((u) => u.includes(s))
  return { count, has, urls: sent.urls, state }
}

const scrollAndWaitForGtm = async (page) => {
  await page.mouse.wheel(0, 300)
  await page.waitForFunction(() => !!window.google_tag_manager, null, { timeout: 15000 }).catch(() => {})
  await page.waitForTimeout(1500)
}
const tap = (page, sel) => page.locator(sel).first().tap({ noWaitAfter: true, timeout: 10000 })

const browser = await launch()
console.log(`Tag check: ${BASE}\n`)

// 1. Page view after a scroll.
const pv = await visit(browser, {
  steps: async (page) => {
    // Set by CookieConsent right after hydration, before GTM loads.
    const consentInit = await page
      .waitForFunction(() => !!document.getElementById('gtag-consent-init'), null, { timeout: 5000 })
      .then(() => page.evaluate(() => !document.getElementById('google-tag-manager')))
      .catch(() => false)
    await scrollAndWaitForGtm(page)
    return { consentInit }
  },
})
check('Consent defaults set before GTM', pv.state.consentInit)
check('GTM loads after first scroll', pv.has('googletagmanager.com/gtm.js?id=GTM-MK3F6SVQ'))
check('GA4 page_view sent', pv.urls.some((u) => /\/g\/collect/.test(u) && u.includes('en=page_view')))
check('Google Ads tag active', pv.has('AW-705216601') || pv.has('/705216601/'))
check('Meta PageView sent', pv.urls.some((u) => u.includes('facebook.com/tr') && u.includes('ev=PageView')))

// 2. Click conversions: first action vs after scroll, counted once each.
for (const [kind, sel] of [
  ['WhatsApp', 'a[href*="wa.me"]:visible'],
  ['Phone', 'a[href^="tel:"]:visible'],
]) {
  const lbl = kind === 'WhatsApp' ? LABELS.whatsapp : LABELS.phone
  const re = new RegExp(lbl)
  const first = await visit(browser, { steps: (page) => tap(page, sel) })
  const later = await visit(browser, { steps: async (page) => { await scrollAndWaitForGtm(page); await tap(page, sel) } })
  const a = first.count(re)
  const b = later.count(re)
  check(`${kind} conversion on first tap`, a > 0, `${a} requests`)
  check(`${kind} conversion after scroll`, b > 0, `${b} requests`)
  // One conversion is ~3 requests; a double count would roughly double that.
  check(`${kind} not double counted`, a > 0 && b > 0 && a <= b + 1 && b <= a + 1, `${a} vs ${b}`)
}

// 3. Lead form conversion (the form fires gtag form_submit; no real lead is sent).
const form = await visit(browser, {
  steps: async (page) => {
    await scrollAndWaitForGtm(page)
    await page.evaluate(() => window.gtag && window.gtag('event', 'form_submit', { event_category: 'lead', event_label: 'tag_check' }))
  },
})
check('Form conversion on form_submit', form.count(new RegExp(LABELS.form)) > 0)

// 4. Declined cookies → Google gets "denied".
const declined = await visit(browser, { consent: 'declined', steps: scrollAndWaitForGtm })
const gcs = [...new Set(declined.urls.map((u) => u.match(/[?&]gcs=([^&]+)/)?.[1]).filter(Boolean))]
check('Declined visitor sends consent denied to Google', gcs.length > 0 && gcs.every((g) => g === 'G100'), gcs.join(','))

await browser.close()
const failed = results.filter((r) => !r.ok)
console.log(`\n${results.length - failed.length}/${results.length} checks passed`)
if (failed.length) {
  console.log('FAILED:\n' + failed.map((f) => `  - ${f.name}`).join('\n'))
  process.exit(1)
}
