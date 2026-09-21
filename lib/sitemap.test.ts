import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  FALLBACK_SERVICE_PATHS,
  MINIMAL_SITEMAP_XML,
  SITEMAP_BASE_URL,
  buildSitemapXml,
  collectSitemapUrls,
  renderSitemapXml,
} from './sitemap'

const SERVICE_URLS = FALLBACK_SERVICE_PATHS.map(
  (path) => `${SITEMAP_BASE_URL}${path}`
)

function parseUrls(xml: string): Array<{ loc?: string; lastmod?: string }> {
  const blocks = xml.match(/<url>[\s\S]*?<\/url>/g) ?? []
  return blocks.map((block) => ({
    loc: block.match(/<loc>(.*?)<\/loc>/)?.[1],
    lastmod: block.match(/<lastmod>(.*?)<\/lastmod>/)?.[1],
  }))
}

function assertWellFormedSitemap(xml: string) {
  assert.match(xml, /^<\?xml version="1.0" encoding="UTF-8"\?>/)
  assert.match(xml, /<urlset xmlns="http:\/\/www.sitemaps.org\/schemas\/sitemap\/0.9">/)
  assert.match(xml, /<\/urlset>\s*$/)
  assert.doesNotMatch(xml, /Invalid Date/)
  assert.doesNotMatch(xml, /undefined/)
  const urls = parseUrls(xml)
  assert.ok(urls.length > 0, 'expected at least one url')
  for (const entry of urls) {
    assert.ok(typeof entry.loc === 'string' && entry.loc.startsWith(SITEMAP_BASE_URL))
    if (entry.lastmod) {
      assert.match(String(entry.lastmod), /^\d{4}-\d{2}-\d{2}$/)
    }
  }
}

test('buildSitemapXml includes core and Ashdod service landing URLs', () => {
  const xml = buildSitemapXml({
    posts: [{ slug: 'plantar-fasciitis-complete-guide', date: '3 במאי 2026' }],
    servicePaths: [...FALLBACK_SERVICE_PATHS],
    now: new Date(2026, 8, 21),
  })

  assertWellFormedSitemap(xml)
  assert.match(xml, /<loc>https:\/\/physio-plus.co.il<\/loc>/)
  assert.match(xml, /<loc>https:\/\/physio-plus.co.il\/blog<\/loc>/)
  assert.match(
    xml,
    /<loc>https:\/\/physio-plus.co.il\/blog\/plantar-fasciitis-complete-guide<\/loc>/
  )
  for (const url of SERVICE_URLS) {
    assert.ok(xml.includes(`<loc>${url}</loc>`), `missing ${url}`)
  }
})

test('bad dates omit lastmod; unsafe slugs are skipped; XML stays 200-valid', () => {
  const xml = buildSitemapXml({
    posts: [
      { slug: 'good-post', date: '3 במאי 2026' },
      { slug: 'missing-date' },
      { slug: 'garbage-date', date: 'not a date' },
      { slug: 'overflow-date', date: '31 בפברואר 2025' },
      { slug: '', date: '3 במאי 2026' },
      { slug: 'https://evil.example/path', date: '3 במאי 2026' },
      { date: '3 במאי 2026' },
      null,
      undefined,
    ],
    servicePaths: 'not-an-array',
    now: new Date(2026, 8, 21),
  })

  assertWellFormedSitemap(xml)
  assert.match(xml, /<loc>https:\/\/physio-plus.co.il\/blog\/good-post<\/loc>/)
  assert.match(xml, /<loc>https:\/\/physio-plus.co.il\/blog\/garbage-date<\/loc>/)
  assert.match(xml, /<loc>https:\/\/physio-plus.co.il\/blog\/missing-date<\/loc>/)
  assert.match(xml, /<loc>https:\/\/physio-plus.co.il\/blog\/overflow-date<\/loc>/)
  assert.doesNotMatch(xml, /<loc>https:\/\/physio-plus.co.il\/blog\/garbage-date<\/loc>\s*<lastmod>/)
  assert.doesNotMatch(xml, /evil\.example/)
  assert.match(xml, /<priority>0.85<\/priority>/)
  for (const url of SERVICE_URLS) {
    assert.ok(xml.includes(`<loc>${url}</loc>`), `fallback missing ${url}`)
  }
})

test('Invalid Date lastmod is omitted and XML stays well-formed', () => {
  const urls = collectSitemapUrls({
    posts: [{ slug: 'no-date-post', date: 'not a date' }],
    servicePaths: [...FALLBACK_SERVICE_PATHS],
    now: new Date('not-a-real-date'),
  })
  const xml = renderSitemapXml(urls)
  assertWellFormedSitemap(xml)
  const noDate = parseUrls(xml).find((entry) =>
    String(entry.loc).endsWith('/blog/no-date-post')
  )
  assert.ok(noDate)
  assert.equal(noDate.lastmod, undefined)
})

test('buildSitemapXml never throws, even if inputs explode', () => {
  const explodingPosts = {
    [Symbol.iterator]() {
      throw new Error('posts exploded')
    },
  }

  assert.doesNotThrow(() => {
    const xml = buildSitemapXml({
      posts: explodingPosts as unknown as [],
      servicePaths: explodingPosts,
      now: new Date(NaN),
    })
    assertWellFormedSitemap(xml)
  })
})

test('minimal fallback XML is well-formed', () => {
  assertWellFormedSitemap(MINIMAL_SITEMAP_XML)
})
