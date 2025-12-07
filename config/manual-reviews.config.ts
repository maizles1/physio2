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
  // העתק את הביקורות מ-Google Business והדבק כאן
  // כל ביקורת צריכה להיות בפורמט הבא:
  
  // {
  //   id: 'review-1',                    // מזהה ייחודי - שנה לכל ביקורת (review-1, review-2, וכו')
  //   authorName: 'שם המחבר',            // שם המחבר מ-Google Business
  //   rating: 5,                         // דירוג: מספר בין 1-5 (מספר הכוכבים)
  //   date: '15 בינואר 2025',            // תאריך הביקורת (למשל: "15 בינואר 2025" או "10 בדצמבר 2024")
  //   relativeTimeDescription: 'לפני שבוע', // זמן יחסי (למשל: "לפני שבוע", "לפני חודש", "לפני 3 חודשים")
  //   text: 'תוכן הביקורת המלא כאן...',   // הטקסט המלא של הביקורת מ-Google
  //   // profilePhotoUrl: 'https://...', // (אופציונלי) קישור לתמונת פרופיל - אפשר להשאיר ריק
  // },
  
  // דוגמה לביקורת:
  // {
  //   id: 'review-1',
  //   authorName: 'דני כהן',
  //   rating: 5,
  //   date: '15 בינואר 2025',
  //   relativeTimeDescription: 'לפני שבוע',
  //   text: 'הטיפול שקיבלתי בקליניקה היה מעולה. הצוות המקצועי והגישה האישית עזרו לי לחזור לפעילות תוך זמן קצר. ממליץ בחום!',
  // },
  
  // הוסף כאן את הביקורות שלך מ-Google Business:
  // העתק את הפרטים מכל ביקורת והדבק כאן בתבנית לעיל
  
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



