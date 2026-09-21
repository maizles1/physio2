import { MetadataRoute } from 'next'
import { getAllPosts } from '@/config/blog.config'
import { isValidDate, tryParseHebrewDate } from '@/lib/date-utils'
import { getServiceLandingPaths } from '@/config/service-pages.config'

export const runtime = 'nodejs'
export const dynamic = 'force-static'

const BASE_URL = 'https://physio-plus.co.il'
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000
const STATIC_PAGE_LASTMOD = '2025-01-01T00:00:00.000Z'

const FALLBACK_SERVICE_PATHS = [
  '/services/back-pain-ashdod',
  '/services/post-surgery-ashdod',
  '/services/vestibular-ashdod',
  '/services/tmj-ashdod',
  '/services/home-visits-ashdod',
] as const

type SitemapEntry = MetadataRoute.Sitemap[number]

function toLastModifiedIso(value: unknown): string | undefined {
  if (typeof value === 'string' && value.trim()) {
    const fromString = new Date(value)
    if (isValidDate(fromString)) {
      try {
        return fromString.toISOString()
      } catch {
        return undefined
      }
    }
  }

  if (!isValidDate(value)) {
    return undefined
  }

  try {
    return value.toISOString()
  } catch {
    return undefined
  }
}

function sitemapEntry(
  path: string,
  options: {
    lastModified?: unknown
    changeFrequency: SitemapEntry['changeFrequency']
    priority: number
  }
): SitemapEntry | null {
  try {
    if (typeof path !== 'string' || !path.startsWith('/')) {
      return null
    }

    const url = path === '/' ? BASE_URL : `${BASE_URL}${path}`
    if (!url.startsWith(`${BASE_URL}/`) && url !== BASE_URL) {
      return null
    }

    const lastModified = toLastModifiedIso(options.lastModified)
    return {
      url,
      ...(lastModified ? { lastModified } : {}),
      changeFrequency: options.changeFrequency,
      priority: options.priority,
    }
  } catch (error) {
    console.warn('[sitemap] Skipping bad entry', path, error)
    return null
  }
}

function compactEntries(
  entries: Array<SitemapEntry | null | undefined>
): MetadataRoute.Sitemap {
  return entries.filter((item): item is SitemapEntry => Boolean(item?.url))
}

function getServicePaths(): string[] {
  try {
    const paths = getServiceLandingPaths()
    if (!Array.isArray(paths)) {
      return [...FALLBACK_SERVICE_PATHS]
    }

    const valid = paths.filter(
      (path): path is string =>
        typeof path === 'string' && path.startsWith('/services/') && path.length > '/services/'.length
    )

    return valid.length > 0 ? valid : [...FALLBACK_SERVICE_PATHS]
  } catch (error) {
    console.error('[sitemap] Failed to load service landing paths', error)
    return [...FALLBACK_SERVICE_PATHS]
  }
}

function getBlogEntries(now: Date): {
  urls: MetadataRoute.Sitemap
  latestPostDate?: Date
} {
  try {
    const posts = getAllPosts()
    if (!Array.isArray(posts)) {
      return { urls: [] }
    }

    const urls: MetadataRoute.Sitemap = []
    let latestPostDate: Date | undefined

    for (const post of posts) {
      try {
        const slug = typeof post?.slug === 'string' ? post.slug.trim() : ''
        if (!slug) {
          continue
        }

        const postDate = tryParseHebrewDate(post?.date)
        const isRecent =
          postDate !== undefined && now.getTime() - postDate.getTime() < THIRTY_DAYS_MS

        const item = sitemapEntry(`/blog/${slug}`, {
          lastModified: postDate,
          changeFrequency: isRecent ? 'weekly' : 'monthly',
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
  } catch (error) {
    console.error('[sitemap] Failed to load blog posts', error)
    return { urls: [] }
  }
}

function fallbackSitemap(): MetadataRoute.Sitemap {
  const lastModified = toLastModifiedIso(new Date()) ?? STATIC_PAGE_LASTMOD
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
    url: path === '/' ? BASE_URL : `${BASE_URL}${path}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: path === '/' ? 1 : 0.8,
  }))
}

export default function sitemap(): MetadataRoute.Sitemap {
  try {
    const now = new Date()
    const servicePaths = getServicePaths()
    const { urls: blogUrls, latestPostDate } = getBlogEntries(now)

    const entries = compactEntries([
      sitemapEntry('/', { lastModified: now, changeFrequency: 'weekly', priority: 1.0 }),
      sitemapEntry('/services', { lastModified: now, changeFrequency: 'weekly', priority: 0.9 }),
      ...servicePaths.map((path) =>
        sitemapEntry(path, { lastModified: now, changeFrequency: 'monthly', priority: 0.85 })
      ),
      sitemapEntry('/meuhedet', { lastModified: now, changeFrequency: 'monthly', priority: 0.9 }),
      sitemapEntry('/about', { lastModified: now, changeFrequency: 'monthly', priority: 0.8 }),
      sitemapEntry('/blog', {
        lastModified: latestPostDate ?? now,
        changeFrequency: 'weekly',
        priority: 0.8,
      }),
      ...blogUrls,
      sitemapEntry('/contact', { lastModified: now, changeFrequency: 'monthly', priority: 0.8 }),
      sitemapEntry('/testimonials', { lastModified: now, changeFrequency: 'monthly', priority: 0.7 }),
      sitemapEntry('/faq', { lastModified: now, changeFrequency: 'monthly', priority: 0.7 }),
      sitemapEntry('/accessibility', {
        lastModified: STATIC_PAGE_LASTMOD,
        changeFrequency: 'yearly',
        priority: 0.5,
      }),
      sitemapEntry('/privacy', {
        lastModified: STATIC_PAGE_LASTMOD,
        changeFrequency: 'yearly',
        priority: 0.5,
      }),
      sitemapEntry('/terms', {
        lastModified: STATIC_PAGE_LASTMOD,
        changeFrequency: 'yearly',
        priority: 0.5,
      }),
    ])

    return entries.length > 0 ? entries : fallbackSitemap()
  } catch (error) {
    console.error('[sitemap] Generation failed; returning fallback URLs', error)
    try {
      return fallbackSitemap()
    } catch (fallbackError) {
      console.error('[sitemap] Fallback generation failed', fallbackError)
      return [{ url: BASE_URL }]
    }
  }
}
