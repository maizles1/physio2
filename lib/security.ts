/**
 * Security Utilities
 * כלי עזר לאבטחה: rate limiting, input sanitization, error handling
 */

import { validateApiKey } from '@/config/security.config'

/**
 * Simple in-memory rate limiter
 * In production, consider using Redis or similar
 */
interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const rateLimitStore: RateLimitStore = {}

/**
 * Check if request should be rate limited
 */
export function checkRateLimit(
  identifier: string,
  maxRequests: number,
  windowMs: number
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now()
  const key = identifier
  const record = rateLimitStore[key]

  // Clean up expired entries (simple cleanup)
  if (record && record.resetTime < now) {
    delete rateLimitStore[key]
  }

  // Check if limit exceeded
  if (record && record.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.resetTime,
    }
  }

  // Initialize or update record
  if (!record || record.resetTime < now) {
    rateLimitStore[key] = {
      count: 1,
      resetTime: now + windowMs,
    }
  } else {
    rateLimitStore[key].count++
  }

  const currentRecord = rateLimitStore[key]
  return {
    allowed: true,
    remaining: Math.max(0, maxRequests - currentRecord.count),
    resetTime: currentRecord.resetTime,
  }
}

/**
 * Get client identifier (IP address)
 */
export function getClientIdentifier(headers: Headers): string {
  // Try to get real IP from various headers (for proxies/load balancers)
  const forwardedFor = headers.get('x-forwarded-for')
  const realIp = headers.get('x-real-ip')
  const cfConnectingIp = headers.get('cf-connecting-ip') // Cloudflare

  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }
  if (realIp) {
    return realIp
  }
  if (cfConnectingIp) {
    return cfConnectingIp
  }

  // Fallback to a default identifier
  return 'unknown'
}

/**
 * Sanitize string input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') {
    return ''
  }

  return input
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
    .slice(0, 10000) // Max length
}

/**
 * Sanitize error message for production
 */
export function sanitizeError(error: unknown, isDevelopment: boolean = false): string {
  if (isDevelopment) {
    // In development, show full error
    if (error instanceof Error) {
      return error.message
    }
    return String(error)
  }

  // In production, return generic message
  return 'An error occurred. Please try again later.'
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate phone number (Israeli format)
 */
export function isValidPhone(phone: string): boolean {
  const cleanPhone = phone.replace(/\D/g, '')
  return (
    (cleanPhone.length === 10 && (cleanPhone.startsWith('0') || cleanPhone.startsWith('5'))) ||
    (cleanPhone.length === 12 && cleanPhone.startsWith('972'))
  )
}

/**
 * Extract API key from request
 */
export function extractApiKey(headers: Headers, searchParams: URLSearchParams): string | null {
  // Try header first
  const headerKey = headers.get('X-API-Key')
  if (headerKey) {
    return headerKey
  }

  // Try query parameter
  const queryKey = searchParams.get('apiKey')
  if (queryKey) {
    return queryKey
  }

  return null
}

/**
 * Validate API key from request
 */
export function validateApiKeyFromRequest(
  headers: Headers,
  searchParams: URLSearchParams
): boolean {
  const providedKey = extractApiKey(headers, searchParams)
  return validateApiKey(providedKey)
}

/**
 * Create rate limit response
 */
export function createRateLimitResponse(resetTime: number): Response {
  const resetDate = new Date(resetTime)
  return new Response(
    JSON.stringify({
      error: 'Too many requests',
      message: 'Rate limit exceeded. Please try again later.',
    }),
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': String(Math.ceil((resetTime - Date.now()) / 1000)),
        'X-RateLimit-Reset': resetDate.toISOString(),
      },
    }
  )
}

/**
 * Clean up old rate limit entries (call periodically)
 */
export function cleanupRateLimitStore(): void {
  const now = Date.now()
  Object.keys(rateLimitStore).forEach((key) => {
    if (rateLimitStore[key].resetTime < now) {
      delete rateLimitStore[key]
    }
  })
}

// Cleanup every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupRateLimitStore, 5 * 60 * 1000)
}
