import { getLlmsTxt } from '@/config/geo.config'

export const dynamic = 'force-static'

export function GET() {
  return new Response(getLlmsTxt(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
