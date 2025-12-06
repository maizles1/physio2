import { NextResponse } from 'next/server'
import { getAllFormattedReviews, calculateAverageRating, type FormattedReview } from '@/lib/google-reviews'
import { isGoogleBusinessConfigured } from '@/config/google-business.config'

export const dynamic = 'force-dynamic'
export const revalidate = 3600 // Revalidate every hour

export interface ReviewsResponse {
  reviews: FormattedReview[]
  averageRating: number
  totalReviews: number
  source: 'google' | 'mixed' | 'error'
  error?: string
}

export async function GET(): Promise<NextResponse<ReviewsResponse>> {
  try {
    // Check if Google Business is configured
    if (!isGoogleBusinessConfigured()) {
      return NextResponse.json({
        reviews: [],
        averageRating: 0,
        totalReviews: 0,
        source: 'error',
        error: 'Google Business API not configured. Please set NEXT_PUBLIC_GOOGLE_PLACE_ID and GOOGLE_MAPS_API_KEY environment variables.',
      })
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
    console.error('Error in reviews API route:', error)
    
    return NextResponse.json(
      {
        reviews: [],
        averageRating: 0,
        totalReviews: 0,
        source: 'error',
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    )
  }
}








