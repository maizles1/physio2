import { MetadataRoute } from 'next'
import { getAllPosts } from '@/config/blog.config'
import { parseHebrewDate } from '@/lib/date-utils'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://physio-plus.co.il'
  const blogPosts = getAllPosts()
  const now = new Date()

  // יצירת רשימת URL-ים למאמרי הבלוג עם lastModified דינמי
  const blogUrls: MetadataRoute.Sitemap = blogPosts.map((post) => {
    const postDate = parseHebrewDate(post.date)
    // אם המאמר חדש (בחודש האחרון), עדכן אותו יותר
    const isRecent = (now.getTime() - postDate.getTime()) < 30 * 24 * 60 * 60 * 1000
    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: postDate,
      changeFrequency: (isRecent ? 'weekly' : 'monthly') as const,
      priority: isRecent ? 0.8 : 0.7,
    }
  })

  // עדכון lastModified של עמוד הבלוג לפי המאמר החדש ביותר
  const latestPostDate = blogPosts.length > 0 
    ? parseHebrewDate(blogPosts[0].date)
    : now

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: latestPostDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...blogUrls,
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/accessibility`,
      lastModified: new Date('2025-01-01'), // Static page - set initial date
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date('2025-01-01'), // Static page - set initial date
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date('2025-01-01'), // Static page - set initial date
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]
}

