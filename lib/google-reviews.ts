/**
 * Utility functions לעבודה עם ביקורות מ-Google Places API
 */

import { GoogleReview, GOOGLE_PLACES_API_BASE, getPlaceId, getGoogleMapsApiKey } from '@/config/google-business.config'

export interface FormattedReview {
  id: string
  authorName: string
  authorUrl?: string
  profilePhotoUrl?: string
  rating: number
  date: string
  relativeTimeDescription: string
  text: string
  source: 'google' | 'local'
}

/**
 * טעינת ביקורות מ-Google Places API
 */
export async function fetchGoogleReviews(): Promise<GoogleReview[]> {
  const placeId = getPlaceId()
  const apiKey = getGoogleMapsApiKey()

  // בדיקה מפורטת של ההגדרות
  if (!placeId) {
    console.warn('[Google Reviews] Place ID לא מוגדר - אנא הגדר NEXT_PUBLIC_GOOGLE_PLACE_ID ב-.env.local')
    return []
  }

  if (!apiKey) {
    console.warn('[Google Reviews] API Key לא מוגדר - אנא הגדר GOOGLE_MAPS_API_KEY ב-.env.local')
    return []
  }

  try {
    const url = `${GOOGLE_PLACES_API_BASE}?place_id=${encodeURIComponent(placeId)}&fields=reviews,rating,user_ratings_total&key=${encodeURIComponent(apiKey)}&language=iw`
    
    console.log('[Google Reviews] מנסה לטעון ביקורות מ-Google Places API...')
    console.log('[Google Reviews] Place ID:', placeId.substring(0, 10) + '...')
    
    const response = await fetch(url, {
      cache: 'no-store' // Don't cache to always get fresh reviews
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`[Google Reviews] שגיאת HTTP: ${response.status} ${response.statusText}`, errorText)
      throw new Error(`Google Places API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    // בדיקת סטטוס מהתגובה
    if (data.status === 'ZERO_RESULTS') {
      console.warn('[Google Reviews] לא נמצאו ביקורות עבור ה-Place ID הזה')
      return []
    }

    if (data.status !== 'OK') {
      console.error(`[Google Reviews] שגיאת API: ${data.status}`, data.error_message || '')
      throw new Error(`Google Places API status: ${data.status}${data.error_message ? ` - ${data.error_message}` : ''}`)
    }

    if (data.result && data.result.reviews && Array.isArray(data.result.reviews)) {
      const reviews = data.result.reviews as GoogleReview[]
      console.log(`[Google Reviews] נטענו ${reviews.length} ביקורות בהצלחה`)
      return reviews
    }

    console.warn('[Google Reviews] אין ביקורות בנתונים שהתקבלו')
    return []
  } catch (error) {
    console.error('[Google Reviews] שגיאה בטעינת ביקורות:', error)
    if (error instanceof Error) {
      console.error('[Google Reviews] פרטי השגיאה:', error.message)
    }
    return []
  }
}

/**
 * עיצוב ביקורת לפורמט אחיד
 */
export function formatGoogleReview(review: GoogleReview): FormattedReview {
  return {
    id: review.id || `google-${review.time}`,
    authorName: review.author_name,
    authorUrl: review.author_url,
    profilePhotoUrl: review.profile_photo_url,
    rating: review.rating,
    date: new Date(review.time * 1000).toISOString(),
    relativeTimeDescription: review.relative_time_description,
    text: review.text,
    source: 'google',
  }
}

/**
 * טעינת כל הביקורות (מ-Google) בפורמט אחיד
 */
export async function getAllFormattedReviews(): Promise<FormattedReview[]> {
  try {
    const googleReviews = await fetchGoogleReviews()
    
    if (googleReviews.length === 0) {
      console.warn('[Google Reviews] לא התקבלו ביקורות מ-Google')
      return []
    }

    const formattedReviews = googleReviews.map(formatGoogleReview)
    console.log(`[Google Reviews] עוצבו ${formattedReviews.length} ביקורות בהצלחה`)
    return formattedReviews
  } catch (error) {
    console.error('[Google Reviews] שגיאה בעיצוב ביקורות:', error)
    return []
  }
}

/**
 * חישוב ממוצע דירוגים
 */
export function calculateAverageRating(reviews: FormattedReview[]): number {
  if (reviews.length === 0) return 0
  
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
  return Math.round((sum / reviews.length) * 10) / 10 // Round to 1 decimal place
}

