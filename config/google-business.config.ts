/**
 * קובץ קונפיגורציה ל-Google My Business / Google Places API
 * כולל הגדרות לביקורות ופרטי העסק
 */

export interface GoogleReview {
  id?: string
  author_name: string
  author_url?: string
  profile_photo_url?: string
  rating: number
  relative_time_description: string
  text: string
  time: number
}

export interface GooglePlaceDetails {
  place_id: string
  name: string
  rating?: number
  user_ratings_total?: number
  reviews?: GoogleReview[]
  formatted_address?: string
}

/**
 * Place ID של Google My Business
 * ניתן למצוא ב-Google Maps או ב-Google My Business Console
 */
export function getPlaceId(): string {
  return process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || ''
}

/**
 * Google Maps API Key
 * דרוש לגישה ל-Google Places API
 */
export function getGoogleMapsApiKey(): string {
  return process.env.GOOGLE_MAPS_API_KEY || ''
}

/**
 * בדיקה האם ה-API מוגדר כראוי
 */
export function isGoogleBusinessConfigured(): boolean {
  return !!(getPlaceId() && getGoogleMapsApiKey())
}

/**
 * URL להשארת ביקורת ב-Google My Business
 * 
 * הערה: Google לא תומך ב-redirect אוטומטי לאחר מילוי ביקורת.
 * הקישור מעביר ישירות לדף השארת ביקורת ב-Google Search
 */
export function getReviewUrl(): string {
  const placeId = getPlaceId()
  if (!placeId) {
    return ''
  }

  // Google Search Review Link - פורמט ישיר להשארת ביקורת
  return `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`
}

/**
 * Google Places API endpoint
 */
export const GOOGLE_PLACES_API_BASE = 'https://maps.googleapis.com/maps/api/place/details/json'

