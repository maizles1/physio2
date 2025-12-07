/**
 * Security Configuration
 * הגדרות אבטחה מרכזיות לאפליקציה
 */

export interface SecurityConfig {
  rateLimiting: {
    enabled: boolean
    windowMs: number // זמן החלון במילישניות
    maxRequests: number // מקסימום בקשות בחלון
    apiMaxRequests: number // מקסימום בקשות ל-API routes
    skipSuccessfulRequests: boolean
  }
  apiAuth: {
    enabled: boolean
    headerName: string
    queryParamName: string
  }
  cors: {
    enabled: boolean
    allowedOrigins: string[]
    allowedMethods: string[]
    allowedHeaders: string[]
    allowCredentials: boolean
  }
  securityHeaders: {
    enabled: boolean
    strictTransportSecurity: {
      maxAge: number
      includeSubDomains: boolean
      preload: boolean
    }
  }
}

/**
 * Default security configuration
 */
export const securityConfig: SecurityConfig = {
  rateLimiting: {
    enabled: true,
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 100, // 100 requests per minute for general routes
    apiMaxRequests: 10, // 10 requests per minute for API routes
    skipSuccessfulRequests: false,
  },
  apiAuth: {
    enabled: process.env.NODE_ENV === 'production', // Enable only in production
    headerName: 'X-API-Key',
    queryParamName: 'apiKey',
  },
  cors: {
    enabled: true,
    allowedOrigins: (() => {
      // Base allowed origins from environment or default
      const baseOrigins = process.env.ALLOWED_ORIGINS
        ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim()).filter(o => o.length > 0)
        : ['https://physiotherapy.plus', 'https://www.physiotherapy.plus']
      
      // Automatically add Vercel preview and production domains at build time
      // Note: Runtime Vercel domains and custom domains are handled in middleware.ts
      const vercelUrl = process.env.VERCEL_URL
      
      if (vercelUrl && !vercelUrl.includes('localhost') && !vercelUrl.includes('127.0.0.1')) {
        const vercelOrigin = vercelUrl.startsWith('http') 
          ? vercelUrl 
          : `https://${vercelUrl}`
        if (!baseOrigins.includes(vercelOrigin)) {
          baseOrigins.push(vercelOrigin)
        }
      }
      
      // Add common Vercel patterns
      if (process.env.NEXT_PUBLIC_VERCEL_URL) {
        const publicVercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL
        if (!publicVercelUrl.includes('localhost') && !publicVercelUrl.includes('127.0.0.1')) {
          const publicOrigin = publicVercelUrl.startsWith('http') 
            ? publicVercelUrl 
            : `https://${publicVercelUrl}`
          if (!baseOrigins.includes(publicOrigin)) {
            baseOrigins.push(publicOrigin)
          }
        }
      }
      
      // In production on Vercel, allow all domains that Vercel serves
      // This is safe because Vercel only serves domains configured in their dashboard
      if (process.env.VERCEL && process.env.NODE_ENV === 'production') {
        // Vercel environment variable indicates we're on Vercel
        // Custom domains are validated by Vercel, so we can be more permissive
      }
      
      return baseOrigins
    })(),
    allowedMethods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'X-API-Key'],
    allowCredentials: false,
  },
  securityHeaders: {
    enabled: true,
    strictTransportSecurity: {
      maxAge: 31536000, // 1 year
      includeSubDomains: true,
      preload: false,
    },
  },
}

/**
 * Get API secret key from environment
 */
export function getApiSecretKey(): string | undefined {
  return process.env.API_SECRET_KEY
}

/**
 * Constant-time string comparison to prevent timing attacks
 */
function constantTimeEquals(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false
  }
  
  let result = 0
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  
  return result === 0
}

/**
 * Validate API key with constant-time comparison to prevent timing attacks
 */
export function validateApiKey(providedKey: string | null | undefined): boolean {
  if (!securityConfig.apiAuth.enabled) {
    return true // Skip validation in development
  }

  const secretKey = getApiSecretKey()
  if (!secretKey) {
    console.warn('[Security] API_SECRET_KEY not configured')
    return false
  }

  if (!providedKey) {
    return false
  }

  // Use constant-time comparison to prevent timing attacks
  return constantTimeEquals(providedKey, secretKey)
}

/**
 * Get rate limit configuration for a specific route
 */
export function getRateLimitConfig(route: string): {
  windowMs: number
  maxRequests: number
} {
  const isApiRoute = route.startsWith('/api/')
  
  return {
    windowMs: securityConfig.rateLimiting.windowMs,
    maxRequests: isApiRoute
      ? securityConfig.rateLimiting.apiMaxRequests
      : securityConfig.rateLimiting.maxRequests,
  }
}

