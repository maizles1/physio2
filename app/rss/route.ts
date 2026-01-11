import { NextResponse } from 'next/server'
import { getAllPosts } from '@/config/blog.config'
import { parseHebrewDate } from '@/lib/date-utils'

export async function GET() {
  const baseUrl = 'https://physio-plus.co.il'
  const blogPosts = getAllPosts()

  const rssItems = blogPosts
    .slice(0, 20) // Latest 20 posts
    .map((post) => {
      const pubDate = parseHebrewDate(post.date)
      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${pubDate.toUTCString()}</pubDate>
      <author>אנדריי מייזלס</author>
      <category><![CDATA[${post.category}]]></category>
    </item>`
    })
    .join('')

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>בלוג פיזיותרפיה - פיזיותרפיה.פלוס</title>
    <link>${baseUrl}/blog</link>
    <description>מאמרים מקצועיים על פיזיותרפיה, טיפים לבריאות ושיקום, תרגילי פיזיותרפיה ומידע מקצועי על טיפולים</description>
    <language>he-IL</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss" rel="self" type="application/rss+xml" />
    ${rssItems}
  </channel>
</rss>`

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
