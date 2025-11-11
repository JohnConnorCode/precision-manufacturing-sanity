import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Middleware for handling Sanity Presentation Tool draft mode
 *
 * Adds CORS headers to draft mode API endpoints to allow Sanity Studio
 * to communicate with the preview iframe properly.
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Allow Sanity Studio to communicate with draft mode endpoints
  if (request.nextUrl.pathname.startsWith('/api/draft') ||
      request.nextUrl.pathname.startsWith('/api/disable-draft')) {
    // Allow requests from Sanity Studio
    const origin = request.headers.get('origin')
    if (origin) {
      response.headers.set('Access-Control-Allow-Origin', origin)
      response.headers.set('Access-Control-Allow-Credentials', 'true')
    }

    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  }

  return response
}

export const config = {
  matcher: ['/api/draft/:path*', '/api/disable-draft/:path*'],
}
