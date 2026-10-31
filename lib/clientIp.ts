/** Client IP detection for rate limiting. Kept free of imports so it can be unit-tested. */

/**
 * Validate IP address format
 */
function isValidIpAddress(ip: string): boolean {
  // IPv4 regex
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/
  // IPv6 regex (simplified)
  const ipv6Regex = /^([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}$/
  
  return ipv4Regex.test(ip) || ipv6Regex.test(ip)
}

/**
 * Get client identifier (IP address) with validation
 */
export function getClientIdentifier(headers: Headers): string {
  // On Vercel, x-real-ip and x-forwarded-for are set by the platform and
  // overwrite anything the client sends. Do NOT trust cf-connecting-ip:
  // the site isn't behind Cloudflare, so a client could set it to any
  // value and get a fresh rate-limit bucket on every request.
  const realIp = headers.get('x-real-ip')
  const forwardedFor = headers.get('x-forwarded-for')

  // Validate and return X-Real-IP
  if (realIp) {
    const ip = realIp.trim()
    if (isValidIpAddress(ip)) {
      return ip
    }
  }

  // X-Forwarded-For can contain multiple IPs (client, proxy1, proxy2...)
  // Take the first one (original client) but validate it
  if (forwardedFor) {
    const firstIp = forwardedFor.split(',')[0].trim()
    if (isValidIpAddress(firstIp)) {
      return firstIp
    }
  }

  // Fallback to a default identifier
  return 'unknown'
}
