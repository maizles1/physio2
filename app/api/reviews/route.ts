import { NextResponse } from 'next/server'
import { getAllFormattedReviews, calculateAverageRating, type FormattedReview } from '@/lib/google-reviews'
import { isGoogleBusinessConfigured } from '@/config/google-business.config'
import { sanitizeError } from '@/lib/security'

export const dynamic = 'force-dynamic'
export const revalidate = 3600 // Revalidate every hour

export interface ReviewsResponse {
  reviews: FormattedReview[]
  averageRating: number
  totalReviews: number
  source: 'google' | 'mixed' | 'error'
  error?: string
}

const isDevelopment = process.env.NODE_ENV === 'development'

export async function GET(): Promise<NextResponse<ReviewsResponse>> {
  try {
    // Check if Google Business is configured
    if (!isGoogleBusinessConfigured()) {
      // In production, don't expose configuration details
      const errorMessage = isDevelopment
        ? 'Google Business API not configured. Please set NEXT_PUBLIC_GOOGLE_PLACE_ID and GOOGLE_MAPS_API_KEY environment variables.'
        : 'Service temporarily unavailable. Please try again later.'

      return NextResponse.json(
        {
          reviews: [],
          averageRating: 0,
          totalReviews: 0,
          source: 'error',
          error: errorMessage,
        },
        { status: 503 } // Service Unavailable
      )
    }

    // Fetch reviews from Google
    const reviews = await getAllFormattedReviews()
    const averageRating = calculateAverageRating(reviews)

    return NextResponse.json({
      reviews,
      averageRating,
      totalReviews: reviews.length,
      source: reviews.length > 0 ? 'google' : 'error',
    })
  } catch (error) {
    // Log full error details server-side
    console.error('Error in reviews API route:', error)
    
    // Return sanitized error message to client
    const errorMessage = sanitizeError(error, isDevelopment)
    
    return NextResponse.json(
      {
        reviews: [],
        averageRating: 0,
        totalReviews: 0,
        source: 'error',
        error: errorMessage,
      },
      { status: 500 }
    )
  }
}








