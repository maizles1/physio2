import { toSitemapLastmod, tryParseHebrewDate } from './date-utils'

export const SITEMAP_BASE_URL = 'https://physio-plus.co.il'
export const SITEMAP_XMLNS = 'http://www.sitemaps.org/schemas/sitemap/0.9'
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000
const STATIC_PAGE_LASTMOD = '2025-01-01'
const SAFE_PATH = /^\/[A-Za-z0-9/_-]*$/
const SAFE_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/i

export const FALLBACK_SERVICE_PATHS = [
  '/services/back-pain-ashdod',
  '/services/post-surgery-ashdod',
  '/services/vestibular-ashdod',
  '/services/tmj-ashdod',
  '/services/home-visits-ashdod',
] as const

export type SitemapChangeFreq =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never'

export type SitemapUrl = {
  loc: string
  lastmod?: string
  changefreq?: SitemapChangeFreq
  priority?: number
}

export type SitemapPost = {
  slug?: unknown
  date?: unknown
}

export type SitemapInput = {
  posts?: SitemapPost[] | unknown
  servicePaths?: unknown
  now?: Date
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function formatPriority(value: number): string {
  if (!Number.isFinite(value)) {
    return '0.5'
  }
  const clamped = Math.min(1, Math.max(0, value))
  return String(Number(clamped.toFixed(2)))
}

function toAbsoluteUrl(path: string): string | null {
  if (typeof path !== 'string' || !path.startsWith('/')) {
    return null
  }
  if (path.includes('#') || path.includes('?') || /\s/.test(path)) {
    return null
  }
  if (path !== '/' && !SAFE_PATH.test(path)) {
    return null
  }

  const url = path === '/' ? SITEMAP_BASE_URL : `${SITEMAP_BASE_URL}${path}`
  if (url !== SITEMAP_BASE_URL && !url.startsWith(`${SITEMAP_BASE_URL}/`)) {
    return null
  }
  return url
}

function sitemapUrl(
  path: string,
  options: {
    lastmod?: unknown
    changefreq: SitemapChangeFreq
    priority: number
  }
): SitemapUrl | null {
  try {
    const loc = toAbsoluteUrl(path)
    if (!loc) {
      return null
    }

    const lastmod = toSitemapLastmod(options.lastmod)
    return {
      loc,
      ...(lastmod ? { lastmod } : {}),
      changefreq: options.changefreq,
      priority: options.priority,
    }
  } catch (error) {
    console.warn('[sitemap] Skipping bad entry', path, error)
    return null
  }
}

function compactUrls(entries: Array<SitemapUrl | null | undefined>): SitemapUrl[] {
  const seen = new Set<string>()
  const urls: SitemapUrl[] = []
  for (const entry of entries) {
    if (!entry?.loc || seen.has(entry.loc)) {
      continue
    }
    seen.add(entry.loc)
    urls.push(entry)
  }
  return urls
}

export function normalizeServicePaths(value: unknown): string[] {
  try {
    if (!Array.isArray(value)) {
      return [...FALLBACK_SERVICE_PATHS]
    }

    const paths = value
      .filter((path): path is string => typeof path === 'string' && path.startsWith('/services/'))
      .map((path) => path.trim())
      .filter((path) => toAbsoluteUrl(path) !== null)

    return paths.length > 0 ? paths : [...FALLBACK_SERVICE_PATHS]
  } catch {
    return [...FALLBACK_SERVICE_PATHS]
  }
}

function blogEntries(posts: unknown, now: Date): {
  urls: SitemapUrl[]
  latestPostDate?: Date
} {
  if (!Array.isArray(posts)) {
    return { urls: [] }
  }

  const urls: SitemapUrl[] = []
  let latestPostDate: Date | undefined

  for (const post of posts) {
    try {
      const slug = typeof post?.slug === 'string' ? post.slug.trim() : ''
      if (!slug || !SAFE_SLUG.test(slug)) {
        continue
      }

      const postDate = tryParseHebrewDate(post?.date)
      const isRecent =
        postDate !== undefined && now.getTime() - postDate.getTime() < THIRTY_DAYS_MS

      const item = sitemapUrl(`/blog/${slug}`, {
        lastmod: postDate,
        changefreq: isRecent ? 'weekly' : 'monthly',
        priority: isRecent ? 0.8 : 0.7,
      })
      if (item) {
        urls.push(item)
      }

      if (postDate && (!latestPostDate || postDate.getTime() > latestPostDate.getTime())) {
        latestPostDate = postDate
      }
    } catch (error) {
      console.warn('[sitemap] Skipping bad blog post', error)
    }
  }

  return { urls, latestPostDate }
}

export function fallbackSitemapUrls(now: Date = new Date()): SitemapUrl[] {
  const lastmod = toSitemapLastmod(now) ?? STATIC_PAGE_LASTMOD
  const paths = [
    '/',
    '/services',
    ...FALLBACK_SERVICE_PATHS,
    '/meuhedet',
    '/about',
    '/blog',
    '/contact',
    '/testimonials',
    '/faq',
    '/accessibility',
    '/privacy',
    '/terms',
  ]

  return paths.map((path) => ({
    loc: path === '/' ? SITEMAP_BASE_URL : `${SITEMAP_BASE_URL}${path}`,
    lastmod,
    changefreq: path === '/' || path === '/blog' || path === '/services' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : 0.8,
  }))
}

export function collectSitemapUrls(input: SitemapInput = {}): SitemapUrl[] {
  try {
    const now = isUsableNow(input.now) ? input.now : new Date()
    const servicePaths = normalizeServicePaths(input.servicePaths)
    const { urls: postUrls, latestPostDate } = blogEntries(input.posts, now)

    const entries = compactUrls([
      sitemapUrl('/', { lastmod: now, changefreq: 'weekly', priority: 1 }),
      sitemapUrl('/services', { lastmod: now, changefreq: 'weekly', priority: 0.9 }),
      ...servicePaths.map((path) =>
        sitemapUrl(path, { lastmod: now, changefreq: 'monthly', priority: 0.85 })
      ),
      sitemapUrl('/meuhedet', { lastmod: now, changefreq: 'monthly', priority: 0.9 }),
      sitemapUrl('/about', { lastmod: now, changefreq: 'monthly', priority: 0.8 }),
      sitemapUrl('/blog', {
        lastmod: latestPostDate ?? now,
        changefreq: 'weekly',
        priority: 0.8,
      }),
      ...postUrls,
      sitemapUrl('/contact', { lastmod: now, changefreq: 'monthly', priority: 0.8 }),
      sitemapUrl('/testimonials', { lastmod: now, changefreq: 'monthly', priority: 0.7 }),
      sitemapUrl('/faq', { lastmod: now, changefreq: 'monthly', priority: 0.7 }),
      sitemapUrl('/accessibility', {
        lastmod: STATIC_PAGE_LASTMOD,
        changefreq: 'yearly',
        priority: 0.5,
      }),
      sitemapUrl('/privacy', {
        lastmod: STATIC_PAGE_LASTMOD,
        changefreq: 'yearly',
        priority: 0.5,
      }),
      sitemapUrl('/terms', {
        lastmod: STATIC_PAGE_LASTMOD,
        changefreq: 'yearly',
        priority: 0.5,
      }),
    ])

    return entries.length > 0 ? entries : fallbackSitemapUrls(now)
  } catch (error) {
    console.error('[sitemap] Generation failed; returning fallback URLs', error)
    return fallbackSitemapUrls()
  }
}

function isUsableNow(value: unknown): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime())
}

export function renderSitemapXml(urls: SitemapUrl[]): string {
  const body = urls
    .map((entry) => {
      const loc = escapeXml(entry.loc)
      const lastmod = entry.lastmod ? `\n<lastmod>${escapeXml(entry.lastmod)}</lastmod>` : ''
      const changefreq = entry.changefreq
        ? `\n<changefreq>${escapeXml(entry.changefreq)}</changefreq>`
        : ''
      const priority =
        typeof entry.priority === 'number'
          ? `\n<priority>${formatPriority(entry.priority)}</priority>`
          : ''
      return `<url>\n<loc>${loc}</loc>${lastmod}${changefreq}${priority}\n</url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="${SITEMAP_XMLNS}">\n${body}\n</urlset>\n`
}

export const MINIMAL_SITEMAP_XML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="${SITEMAP_XMLNS}">
<url>
<loc>${SITEMAP_BASE_URL}</loc>
</url>
</urlset>
`

export function buildSitemapXml(input: SitemapInput = {}): string {
  try {
    const urls = collectSitemapUrls(input)
    if (urls.length === 0) {
      return MINIMAL_SITEMAP_XML
    }
    return renderSitemapXml(urls)
  } catch (error) {
    console.error('[sitemap] XML render failed; returning minimal sitemap', error)
    return MINIMAL_SITEMAP_XML
  }
}
