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
    allowedOrigins: process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(',')
      : ['https://physiotherapy.plus', 'https://www.physiotherapy.plus'],
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

