/**
 * Utilities לעבודה עם מאמרי הבלוג
 */
import { blogPosts, BlogPost } from '@/config/blog.config'
import { compareHebrewDates } from './date-utils'

/**
 * קבלת כל המאמרים
 */
export function getAllPosts(): BlogPost[] {
  return blogPosts
}

/**
 * קבלת מאמר לפי slug
 */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug)
}

/**
 * קבלת מאמרים לפי קטגוריה
 */
export function getPostsByCategory(categoryId: string): BlogPost[] {
  return blogPosts.filter(post => post.categoryId === categoryId)
}

/**
 * קבלת מאמרים קשורים
 */
export function getRelatedPosts(post: BlogPost, limit: number = 3): BlogPost[] {
  if (!post.relatedPosts || post.relatedPosts.length === 0) {
    // אם אין קישורים ספציפיים, נחזיר מאמרים מאותה קטגוריה
    return blogPosts
      .filter(p => p.id !== post.id && p.categoryId === post.categoryId)
      .slice(0, limit)
  }
  
  return blogPosts
    .filter(p => post.relatedPosts!.includes(p.slug) && p.id !== post.id)
    .slice(0, limit)
}

/**
 * חיפוש במאמרים
 */
export function searchPosts(query: string): BlogPost[] {
  const lowerQuery = query.toLowerCase()
  return blogPosts.filter(post => 
    post.title.toLowerCase().includes(lowerQuery) ||
    post.excerpt.toLowerCase().includes(lowerQuery) ||
    post.content.toLowerCase().includes(lowerQuery) ||
    (post.keywords && post.keywords.some(kw => kw.toLowerCase().includes(lowerQuery)))
  )
}

/**
 * קבלת כל הקטגוריות
 */
export function getAllCategories(): string[] {
  const categories = new Set<string>()
  blogPosts.forEach(post => {
    if (post.categoryId) {
      categories.add(post.categoryId)
    }
  })
  return Array.from(categories)
}

/**
 * קבלת מאמרים לפי תאריך (מהחדש לישן)
 */
export function getPostsByDate(limit?: number): BlogPost[] {
  const sorted = [...blogPosts].sort((a, b) => {
    return compareHebrewDates(a.date, b.date)
  })
  return limit ? sorted.slice(0, limit) : sorted
}

/**
 * קבלת המאמרים הפופולריים (לפי קישורים פנימיים)
 */
export function getPopularPosts(limit: number = 5): BlogPost[] {
  // נחשב כמה פעמים כל מאמר מקושר ממאמרים אחרים
  const linkCounts = new Map<string, number>()
  
  blogPosts.forEach(post => {
    if (post.relatedPosts) {
      post.relatedPosts.forEach(slug => {
        linkCounts.set(slug, (linkCounts.get(slug) || 0) + 1)
      })
    }
  })
  
  // נמיין לפי מספר הקישורים
  const sorted = blogPosts
    .map(post => ({
      post,
      count: linkCounts.get(post.slug) || 0
    }))
    .sort((a, b) => b.count - a.count)
    .map(item => item.post)
  
  return sorted.slice(0, limit)
}



