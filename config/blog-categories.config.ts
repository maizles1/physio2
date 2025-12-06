/**
 * קטגוריות הבלוג - קובץ הגדרה מרכזי
 */

export interface BlogCategory {
  id: string
  name: string
  slug: string
  color: string
  backgroundColor: string
  description: string
}

export const blogCategories: BlogCategory[] = [
  {
    id: 'shoulder-pain',
    name: 'טיפול בכאבי כתף',
    slug: 'shoulder-pain',
    color: '#2080C0',
    backgroundColor: '#E3F2FD',
    description: 'מאמרים על טיפול בכאבי כתף ושיקום כתף',
  },
  {
    id: 'back-pain',
    name: 'טיפול בכאבי גב',
    slug: 'back-pain',
    color: '#2080C0',
    backgroundColor: '#E3F2FD',
    description: 'מאמרים על טיפול בכאבי גב ושיקום גב',
  },
  {
    id: 'knee-pain',
    name: 'טיפול בברך',
    slug: 'knee-pain',
    color: '#2080C0',
    backgroundColor: '#E3F2FD',
    description: 'מאמרים על טיפול בכאבי ברך ושיקום ברך',
  },
  {
    id: 'neck-pain',
    name: 'טיפול בכאבי צוואר',
    slug: 'neck-pain',
    color: '#2080C0',
    backgroundColor: '#E3F2FD',
    description: 'מאמרים על טיפול בכאבי צוואר',
  },
  {
    id: 'post-surgery',
    name: 'שיקום לאחר ניתוח',
    slug: 'post-surgery',
    color: '#2080C0',
    backgroundColor: '#E3F2FD',
    description: 'מאמרים על שיקום לאחר ניתוחים אורטופדיים',
  },
  {
    id: 'vestibular',
    name: 'שיקום וסטיבולרי',
    slug: 'vestibular',
    color: '#2080C0',
    backgroundColor: '#E3F2FD',
    description: 'מאמרים על טיפול בסחרחורות ושיקום וסטיבולרי',
  },
  {
    id: 'tmj',
    name: 'TMJ / מפרק הלסת',
    slug: 'tmj',
    color: '#2080C0',
    backgroundColor: '#E3F2FD',
    description: 'מאמרים על טיפול במפרק הלסת',
  },
  {
    id: 'exercises',
    name: 'תרגילי פיזיותרפיה',
    slug: 'exercises',
    color: '#2080C0',
    backgroundColor: '#E3F2FD',
    description: 'מדריכי תרגילים וטיפים לביצוע תרגילים',
  },
  {
    id: 'prevention',
    name: 'טיפים למניעה',
    slug: 'prevention',
    color: '#2080C0',
    backgroundColor: '#E3F2FD',
    description: 'טיפים למניעת פציעות וכאבים',
  },
  {
    id: 'running-injuries',
    name: 'פציעות ריצה',
    slug: 'running-injuries',
    color: '#2080C0',
    backgroundColor: '#E3F2FD',
    description: 'מאמרים על פציעות ריצה, מניעה וטיפול',
  },
  {
    id: 'disc-herniation',
    name: 'פריצות דיסק ובלט דיסק',
    slug: 'disc-herniation',
    color: '#2080C0',
    backgroundColor: '#E3F2FD',
    description: 'מאמרים על פריצות דיסק, בלט דיסק וטיפול',
  },
  {
    id: 'frozen-shoulder',
    name: 'כתף קפואה',
    slug: 'frozen-shoulder',
    color: '#2080C0',
    backgroundColor: '#E3F2FD',
    description: 'מאמרים על כתף קפואה וטיפול',
  },
  {
    id: 'frozen-shoulder-swimmers',
    name: 'כתף קפואה וכתף שחיינים',
    slug: 'frozen-shoulder-swimmers',
    color: '#2080C0',
    backgroundColor: '#E3F2FD',
    description: 'מאמרים על כתף קפואה, כתף שחיינים ותסמונת הצביטה בכתף',
  },
  {
    id: 'ergonomics',
    name: 'ארגונומיה',
    slug: 'ergonomics',
    color: '#2080C0',
    backgroundColor: '#E3F2FD',
    description: 'מאמרים על ארגונומיה נכונה בעבודה',
  },
  {
    id: 'joint-replacement',
    name: 'החלפת מפרק',
    slug: 'joint-replacement',
    color: '#2080C0',
    backgroundColor: '#E3F2FD',
    description: 'מאמרים על שיקום לאחר החלפת מפרק',
  },
  {
    id: 'vertigo',
    name: 'ורטיגו וסחרחורות',
    slug: 'vertigo',
    color: '#2080C0',
    backgroundColor: '#E3F2FD',
    description: 'מאמרים על ורטיגו, סחרחורות וטיפול',
  },
  {
    id: 'treatment-process',
    name: 'תהליך הטיפול',
    slug: 'treatment-process',
    color: '#2080C0',
    backgroundColor: '#E3F2FD',
    description: 'מאמרים על איך נראה טיפול פיזיותרפיה',
  },
  {
    id: 'when-to-see-orthopedist',
    name: 'מתי לאורטופד ומתי לפיזיותרפיסט',
    slug: 'when-to-see-orthopedist',
    color: '#2080C0',
    backgroundColor: '#E3F2FD',
    description: 'הדרכה על מתי לפנות לאורתופד ומתי לפיזיותרפיסט',
  },
]

export function getCategoryById(id: string): BlogCategory | undefined {
  return blogCategories.find(cat => cat.id === id)
}

export function getCategoryBySlug(slug: string): BlogCategory | undefined {
  return blogCategories.find(cat => cat.slug === slug)
}



