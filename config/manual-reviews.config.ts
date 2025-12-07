/**
 * קונפיגורציה לביקורות ידניות
 * הוסף ביקורות כאן - העתק מ-Google My Business
 */

export interface ManualReview {
  id: string
  authorName: string
  rating: number
  date: string // תאריך בפורמט: "15 בינואר 2025" או "לפני חודש"
  relativeTimeDescription: string // לדוגמה: "לפני שבוע", "לפני חודשיים"
  text: string // תוכן הביקורת
  profilePhotoUrl?: string // (אופציונלי) URL לתמונת פרופיל
}

/**
 * ביקורות ידניות - העתק מ-Google My Business
 * 
 * איך להוסיף ביקורת:
 * 1. לך ל-Google My Business שלך
 * 2. העתק את פרטי הביקורת
 * 3. הוסף כאן בתבנית הבאה:
 */
export const manualReviews: ManualReview[] = [
  // דוגמה לביקורת - מחק את זה והוסף את הביקורות שלך:
  // {
  //   id: 'review-1',
  //   authorName: 'שם המחבר',
  //   rating: 5,
  //   date: '15 בינואר 2025',
  //   relativeTimeDescription: 'לפני שבוע',
  //   text: 'תוכן הביקורת כאן...',
  //   profilePhotoUrl: 'https://...', // (אופציונלי)
  // },
  
  // הוסף כאן את הביקורות שלך מ-Google My Business:
  
]

/**
 * פונקציה למיון ביקורות לפי תאריך (החדשות ראשונות)
 */
export function sortReviewsByDate(reviews: ManualReview[]): ManualReview[] {
  return [...reviews].reverse() // אם הוספת מהחדש לישן, זה יציג מהחדש לישן
}

/**
 * פונקציה לקבלת כל הביקורות
 */
export function getAllManualReviews(): ManualReview[] {
  return manualReviews
}

/**
 * פונקציה לקבלת 3 ביקורות ראשונות
 */
export function getTopManualReviews(limit: number = 3): ManualReview[] {
  return manualReviews.slice(0, limit)
}



