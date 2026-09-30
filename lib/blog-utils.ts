/**
 * Utilities לעבודה עם מאמרי הבלוג
 */
import { blogPosts, BlogPost, BlogFaqItem } from '@/config/blog.config'
import { compareHebrewDates } from './date-utils'

const FAQ_HEADING = /שאלות(?:\s+ותשובות)?\s+נפוצות/
const QUESTION_PREFIX = /^(?:שאלה|ש)\s*[:：]\s*/
const ANSWER_PREFIX = /^(?:תשובה|ת)\s*[:：]\s*/

function stripTags(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * מחלץ שאלות ותשובות מקטע "שאלות נפוצות" בתוכן מאמר.
 * תומך בשלושת המבנים שקיימים במאמרים:
 *   <h3>שאלה</h3><p>תשובה</p>
 *   <h3>שאלה: ...</h3><p><strong>תשובה:</strong> ...</p>
 *   <p><strong>שאלה: ...</strong></p><p><strong>תשובה:</strong> ...</p>
 */
export function extractFaqFromContent(html: string): BlogFaqItem[] {
  const h2Blocks = html.split(/(?=<h2[\s>])/i)
  const faqBlock = h2Blocks.find((block) => {
    const heading = block.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i)
    return heading ? FAQ_HEADING.test(stripTags(heading[1])) : false
  })
  if (!faqBlock) return []

  const body = faqBlock.replace(/<h2[^>]*>[\s\S]*?<\/h2>/i, '')
  const items: BlogFaqItem[] = []

  // מבנה עם h3
  const h3Parts = body.split(/(?=<h3[\s>])/i).filter((part) => /<h3[\s>]/i.test(part))
  if (h3Parts.length > 0) {
    for (const part of h3Parts) {
      const heading = part.match(/<h3[^>]*>([\s\S]*?)<\/h3>/i)
      if (!heading) continue
      const question = stripTags(heading[1]).replace(QUESTION_PREFIX, '')
      const answer = stripTags(part.replace(heading[0], '')).replace(ANSWER_PREFIX, '')
      if (question && answer) items.push({ question, answer })
    }
    return items
  }

  // מבנה עם <p><strong>שאלה:</strong></p>
  const paragraphs = body.match(/<p[^>]*>[\s\S]*?<\/p>|<ul[^>]*>[\s\S]*?<\/ul>|<ol[^>]*>[\s\S]*?<\/ol>/gi) ?? []
  let current: BlogFaqItem | null = null
  for (const paragraph of paragraphs) {
    const text = stripTags(paragraph)
    if (QUESTION_PREFIX.test(text)) {
      if (current?.answer) items.push(current)
      current = { question: text.replace(QUESTION_PREFIX, ''), answer: '' }
      continue
    }
    if (!current) continue
    const answerPart = text.replace(ANSWER_PREFIX, '')
    current.answer = current.answer ? `${current.answer} ${answerPart}` : answerPart
  }
  if (current?.answer) items.push(current)
  return items
}

/** שאלות ותשובות למאמר: מהשדה המפורש, או חילוץ אוטומטי מהתוכן */
export function getPostFaq(post: BlogPost): BlogFaqItem[] {
  if (post.faq && post.faq.length > 0) return post.faq
  return extractFaqFromContent(post.content)
}

/** כותרת קצרה לתגית title ולשיתוף */
export function getPostSeoTitle(post: BlogPost): string {
  return post.seoTitle?.trim() || post.title
}

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



