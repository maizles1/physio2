import { NextResponse } from 'next/server'
import { blogContentReviewedOn, getAllPosts } from '@/config/blog.config'
import { getServiceLandingPaths } from '@/config/service-pages.config'
import {
  MINIMAL_SITEMAP_XML,
  buildSitemapXml,
  type SitemapPost,
} from '@/lib/sitemap'

export const runtime = 'nodejs'
export const dynamic = 'force-static'
export const revalidate = 3600

const XML_HEADERS = {
  'Content-Type': 'application/xml; charset=utf-8',
  'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
}

function xmlResponse(xml: string): NextResponse {
  return new NextResponse(xml, {
    status: 200,
    headers: XML_HEADERS,
  })
}

function loadPosts(): SitemapPost[] {
  try {
    const posts = getAllPosts()
    if (!Array.isArray(posts)) return []
    return posts.map((post) => ({ ...post, reviewed: blogContentReviewedOn }))
  } catch (error) {
    console.error('[sitemap] Failed to load blog posts', error)
    return []
  }
}

function loadServicePaths(): string[] | undefined {
  try {
    return getServiceLandingPaths()
  } catch (error) {
    console.error('[sitemap] Failed to load service paths', error)
    return undefined
  }
}

export async function GET() {
  try {
    const xml = buildSitemapXml({
      posts: loadPosts(),
      servicePaths: loadServicePaths(),
    })
    return xmlResponse(xml || MINIMAL_SITEMAP_XML)
  } catch (error) {
    console.error('[sitemap] Unexpected failure; returning minimal XML 200', error)
    return xmlResponse(MINIMAL_SITEMAP_XML)
  }
}

export async function HEAD() {
  return new NextResponse(null, {
    status: 200,
    headers: XML_HEADERS,
  })
}
