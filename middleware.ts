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
  const host = headers.get('host') || ''
  const origin = headers.get('origin')
  const protocol = headers.get('x-forwarded-proto') || 'https'

  // URL Canonicalization: Redirect www to non-www and http to https
  if (host.startsWith('www.')) {
    const newHost = host.replace(/^www\./, '')
    const url = request.nextUrl.clone()
    url.host = newHost
    url.protocol = 'https:'
    return NextResponse.redirect(url, 301)
  }

  // Redirect http to https (skip on localhost so local dev works)
  const isLocalhost = host.includes('localhost') || host.startsWith('127.0.0.1')
  if (!isLocalhost && protocol === 'http') {
    const url = request.nextUrl.clone()
    url.protocol = 'https:'
    return NextResponse.redirect(url, 301)
  }

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

  // If rate limited, return early
  if (!rateLimitResult.allowed) {
    const rateLimitResponse = createRateLimitResponse(rateLimitResult.resetTime)
    rateLimitResponse.headers.set('X-RateLimit-Limit', String(rateLimitConfig.maxRequests))
    rateLimitResponse.headers.set('X-RateLimit-Remaining', String(rateLimitResult.remaining))
    rateLimitResponse.headers.set(
      'X-RateLimit-Reset',
      new Date(rateLimitResult.resetTime).toISOString()
    )
    return rateLimitResponse
  }

  // Create response for allowed requests
  const response = NextResponse.next()

  // Add rate limit headers
  response.headers.set('X-RateLimit-Limit', String(rateLimitConfig.maxRequests))
  response.headers.set('X-RateLimit-Remaining', String(rateLimitResult.remaining))
  response.headers.set(
    'X-RateLimit-Reset',
    new Date(rateLimitResult.resetTime).toISOString()
  )

  // API authentication for API routes
  if (pathname.startsWith('/api/')) {
    // Public endpoints that don't require authentication
    const publicEndpoints = ['/api/reviews']
    const isPublicEndpoint = publicEndpoints.includes(pathname)

    // Only require authentication for non-public endpoints when API auth is enabled
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
    const host = headers.get('host')
    
    // Secure origin validation - prevent subdomain spoofing
    let isAllowedOrigin = false
    if (!origin) {
      isAllowedOrigin = true // No origin header (same-origin request)
    } else {
      try {
        const originUrl = new URL(origin)
        const originHostname = originUrl.hostname
        
        // Check if it's a Vercel domain (automatic allow)
        const isVercelDomain = 
          originHostname.endsWith('.vercel.app') ||
          originHostname.endsWith('.vercel-dns.com') ||
          originHostname.includes('.vercel.app')
        
        // If host matches origin, it's same-origin (always allow)
        // This allows custom domains configured in Vercel
        const isSameOrigin = host && (
          host === originHostname || 
          host === originUrl.host ||
          // Allow if host and origin are the same domain (for custom domains)
          (host.replace(/^www\./, '') === originHostname.replace(/^www\./, ''))
        )
        
        // In production on Vercel, if the request comes from the same host,
        // it's safe to allow (Vercel validates custom domains)
        const isVercelProduction = process.env.VERCEL && process.env.NODE_ENV === 'production'
        const isCustomDomainOnVercel = isVercelProduction && host && host === originHostname
        
        // Exact match check first
        if (securityConfig.cors.allowedOrigins.includes(origin)) {
          isAllowedOrigin = true
        } else if (isVercelDomain || isSameOrigin || isCustomDomainOnVercel) {
          // Automatically allow:
          // 1. Vercel domains (.vercel.app)
          // 2. Same-origin requests
          // 3. Custom domains on Vercel (validated by Vercel)
          isAllowedOrigin = true
        } else {
          // For subdomain matching, ensure it's a valid subdomain (not prefix spoofing)
          // Example: "https://physio-plus.co.il" allows "https://www.physio-plus.co.il"
          // But NOT "https://evil-physio-plus.co.il"
          isAllowedOrigin = securityConfig.cors.allowedOrigins.some((allowed) => {
            try {
              const allowedUrl = new URL(allowed)
              const allowedHostname = allowedUrl.hostname
              
              // Exact match
              if (originHostname === allowedHostname) {
                return true
              }
              
              // Subdomain check: origin must end with .allowedHostname
              // e.g., "www.physio-plus.co.il" ends with ".physio-plus.co.il"
              if (originHostname.endsWith('.' + allowedHostname)) {
                return true
              }
              
              return false
            } catch {
              // Invalid URL in allowed origins - skip
              return false
            }
          })
        }
      } catch (error) {
        // Invalid origin URL - reject
        isAllowedOrigin = false
      }
    }

    // Always set CORS headers if origin is present and allowed, or if it's same-origin
    if (isAllowedOrigin) {
      if (origin) {
        response.headers.set('Access-Control-Allow-Origin', origin)
      } else if (host) {
        // For same-origin requests without origin header, allow the host
        response.headers.set('Access-Control-Allow-Origin', `https://${host}`)
      }
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
