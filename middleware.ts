import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Trusted origins for draft mode CORS
const ALLOWED_ORIGINS = [
  'https://iismet.sanity.studio',
  'https://iismet.com',
  'https://www.iismet.com',
]

// Add Vercel preview URLs and local dev
if (process.env.VERCEL_URL) {
  ALLOWED_ORIGINS.push(`https://${process.env.VERCEL_URL}`)
}
if (process.env.NEXT_PUBLIC_SITE_URL) {
  ALLOWED_ORIGINS.push(process.env.NEXT_PUBLIC_SITE_URL)
}

/**
 * Middleware for handling Sanity Presentation Tool draft mode
 *
 * Adds CORS headers to draft mode API endpoints to allow Sanity Studio
 * to communicate with the preview iframe properly.
 * Only whitelisted origins are allowed (prevents CSRF on draft endpoints).
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Allow Sanity Studio to communicate with draft mode endpoints
  if (request.nextUrl.pathname.startsWith('/api/draft-mode')) {
    const origin = request.headers.get('origin')

    // Allow whitelisted origins, Sanity Studio domains, and Vercel preview URLs
    const isAllowed = origin && (
      ALLOWED_ORIGINS.includes(origin) ||
      origin.endsWith('.sanity.studio') ||
      origin.endsWith('.sanity.io') ||
      origin.endsWith('.vercel.app') ||
      origin === 'http://localhost:3000'
    )

    if (isAllowed) {
      response.headers.set('Access-Control-Allow-Origin', origin)
      response.headers.set('Access-Control-Allow-Credentials', 'true')
    }

    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  }

  return response
}

export const config = {
  matcher: ['/api/draft-mode/:path*'],
}
