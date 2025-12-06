import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {
  checkRateLimit,
  getClientIdentifier,
  validateApiKeyFromRequest,
  createRateLimitResponse,
} from '@/lib/security'
import { getRateLimitConfig, securityConfig } from '@/config/security.config'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const headers = request.headers
  const searchParams = request.nextUrl.searchParams

  // Skip rate limiting for static files and Next.js internals
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/static/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/robots.txt') ||
    pathname.startsWith('/sitemap.xml')
  ) {
    return NextResponse.next()
  }

  // Get rate limit configuration
  const rateLimitConfig = getRateLimitConfig(pathname)
  const clientId = getClientIdentifier(headers)

  // Check rate limit
  const rateLimitResult = checkRateLimit(
    `${clientId}:${pathname}`,
    rateLimitConfig.maxRequests,
    rateLimitConfig.windowMs
  )

  // Create response with rate limit headers
  const response = rateLimitResult.allowed
    ? NextResponse.next()
    : createRateLimitResponse(rateLimitResult.resetTime)

  // Add rate limit headers
  response.headers.set('X-RateLimit-Limit', String(rateLimitConfig.maxRequests))
  response.headers.set('X-RateLimit-Remaining', String(rateLimitResult.remaining))
  response.headers.set(
    'X-RateLimit-Reset',
    new Date(rateLimitResult.resetTime).toISOString()
  )

  // If rate limited, return early
  if (!rateLimitResult.allowed) {
    return response
  }

  // API authentication for API routes
  if (pathname.startsWith('/api/')) {
    // Skip authentication for public endpoints if configured
    const isPublicEndpoint = pathname === '/api/reviews' && !securityConfig.apiAuth.enabled

    if (!isPublicEndpoint && securityConfig.apiAuth.enabled) {
      const isValid = validateApiKeyFromRequest(headers, searchParams)

      if (!isValid) {
        return NextResponse.json(
          {
            error: 'Unauthorized',
            message: 'Invalid or missing API key',
          },
          { status: 401 }
        )
      }
    }
  }

  // CORS headers for API routes
  if (pathname.startsWith('/api/') && securityConfig.cors.enabled) {
    const origin = headers.get('origin')
    const isAllowedOrigin =
      !origin ||
      securityConfig.cors.allowedOrigins.includes(origin) ||
      securityConfig.cors.allowedOrigins.some((allowed) => origin.endsWith(allowed))

    if (isAllowedOrigin && origin) {
      response.headers.set('Access-Control-Allow-Origin', origin)
    }

    response.headers.set(
      'Access-Control-Allow-Methods',
      securityConfig.cors.allowedMethods.join(', ')
    )
    response.headers.set(
      'Access-Control-Allow-Headers',
      securityConfig.cors.allowedHeaders.join(', ')
    )
    response.headers.set('Access-Control-Max-Age', '86400')

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, {
        status: 204,
        headers: response.headers,
      })
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
