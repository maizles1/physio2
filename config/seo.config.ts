/**
 * קובץ קונפיגורציה מרכזי ל-SEO
 * כולל את כל ההגדרות והמילות מפתח לכל עמוד
 */

export interface SEOConfig {
  siteName: string
  siteUrl: string
  defaultTitle: string
  defaultDescription: string
  defaultKeywords: string[]
  author: string
  locale: string
  businessName: string
  businessAddress: {
    street: string
    city: string
    country: string
    postalCode?: string
  }
  coordinates: {
    latitude: string
    longitude: string
  }
  contact: {
    phone: string
    email?: string
  }
  openingHours: {
    [key: string]: { opens: string; closes: string } | null
  }
  social: {
    facebook?: string
    instagram?: string
    linkedin?: string
    youtube?: string
  }
  googleAnalyticsId?: string
  googleSearchConsoleId?: string
}

export const seoConfig: SEOConfig = {
  siteName: 'פיזיותרפיה.פלוס - מרכז הפיזיותרפיה של אשדוד',
  siteUrl: 'https://physio-plus.co.il',
  defaultTitle: 'פיזיותרפיסט פרטי באשדוד | פיזיותרפיה.פלוס - מרכז כלניות',
  defaultDescription: 'פיזיותרפיסט פרטי מומלץ באשדוד. מכון פיזיותרפיה פרטי באשדוד במרכז כלניות. טיפול מקצועי בכאבי גב, צוואר, TMJ, שיקום אורטופדי ושיקום וסטיבולרי. פיזיותרפיסט מומלץ עם ניסיון של 15+ שנה.',
  defaultKeywords: [
    'פיזיותרפיסט פרטי באשדוד',
    'פיזיותרפיסט מומלץ באשדוד',
    'מכון פיזיותרפיה פרטי באשדוד',
    'פיזיותרפיה אשדוד',
    'מרכז כלניות אשדוד',
    'טיפול בכאבי גב אשדוד',
    'טיפול בכאבי צוואר אשדוד',
    'TMJ אשדוד',
    'שיקום אורטופדי אשדוד',
    'שיקום וסטיבולרי אשדוד',
    'פיזיותרפיסט מקצועי אשדוד',
  ],
  author: 'אנדריי מייזלס',
  locale: 'he_IL',
  businessName: 'פיזיותרפיה.פלוס - מרכז הפיזיותרפיה של אשדוד',
  businessAddress: {
    street: 'מרכז כלניות',
    city: 'אשדוד',
    country: 'IL',
  },
  coordinates: {
    latitude: '31.8044',
    longitude: '34.6553',
  },
  contact: {
    phone: '050-883-8982',
  },
  openingHours: {
    monday: { opens: '08:00', closes: '20:00' },
    tuesday: { opens: '08:00', closes: '20:00' },
    wednesday: { opens: '08:00', closes: '20:00' },
    thursday: { opens: '08:00', closes: '20:00' },
    friday: { opens: '08:00', closes: '14:00' },
    saturday: null,
    sunday: { opens: '08:00', closes: '20:00' },
  },
  social: {
    facebook: 'https://www.facebook.com/a.mphysiotherapy1',
    instagram: 'https://www.instagram.com/physiotherapy.plus/',
  },
  // הוסף את ה-IDs כשזמינים
  // googleAnalyticsId: 'G-XXXXXXXXXX',
  // googleSearchConsoleId: 'your-verification-code',
}

/**
 * פונקציות עזר ל-SEO
 */

/**
 * חישוב זמן קריאה משוער למאמר
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200 // ממוצע קריאה בעברית
  const text = content.replace(/<[^>]*>/g, '') // הסרת HTML tags
  const wordCount = text.split(/\s+/).filter(word => word.length > 0).length
  return Math.ceil(wordCount / wordsPerMinute)
}

/**
 * יצירת meta description אופטימלי (150-160 תווים)
 */
export function optimizeMetaDescription(description: string): string {
  if (description.length <= 160) return description
  return description.substring(0, 157).trim() + '...'
}

/**
 * יצירת title tag אופטימלי (50-60 תווים)
 */
export function optimizeTitle(title: string): string {
  if (title.length <= 60) return title
  return title.substring(0, 57).trim() + '...'
}

/**
 * יצירת keywords string מ-array
 */
export function formatKeywords(keywords: string[]): string {
  return keywords.join(', ')
}

/**
 * יצירת canonical URL
 */
export function getCanonicalUrl(path: string = ''): string {
  const baseUrl = seoConfig.siteUrl.replace(/\/$/, '')
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${baseUrl}${cleanPath}`
}

/**
 * יצירת Open Graph image URL
 */
export function getOGImageUrl(imagePath?: string): string {
  if (imagePath) {
    return imagePath.startsWith('http') 
      ? imagePath 
      : `${seoConfig.siteUrl}${imagePath}`
  }
  return `${seoConfig.siteUrl}/images/logo/clinic-logo.png`
}




