import { getLlmsTxt } from '@/config/geo.config'
import { getAllPosts } from '@/config/blog.config'
import { toIsoDate } from '@/lib/date-utils'

export const dynamic = 'force-static'

export function GET() {
  const articles = getAllPosts().map((post) => ({
    slug: post.slug,
    title: post.seoTitle?.trim() || post.title,
    excerpt: post.seoDescription?.trim() || post.excerpt,
    date: post.date,
    dateIso: toIsoDate(post.date),
    summaryEn: post.summaryEn,
  }))
  return new Response(getLlmsTxt(articles), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
