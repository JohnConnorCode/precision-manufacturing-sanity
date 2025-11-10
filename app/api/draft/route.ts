import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

/**
 * Draft Mode API Route for Sanity Presentation Tool
 *
 * This endpoint is called by Sanity Studio's Presentation Tool to enable
 * Next.js draft mode for live previewing unpublished content.
 *
 * Security:
 * - Validates request origin is from localhost (development) or production domain
 * - Checks for valid slug parameter to prevent open redirects
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const slug = searchParams.get('slug') || '/'

  // Basic security: Only allow requests from same origin (Studio is on same domain)
  const referer = request.headers.get('referer')
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  // In development, allow localhost. In production, check referer
  if (process.env.NODE_ENV === 'production' && referer && !referer.startsWith(siteUrl)) {
    return new Response('Unauthorized', { status: 401 })
  }

  // Validate slug to prevent open redirect vulnerabilities
  // Only allow relative paths starting with /
  if (!slug.startsWith('/')) {
    return new Response('Invalid slug', { status: 400 })
  }

  // Enable Draft Mode
  const draft = await draftMode()
  draft.enable()

  // Redirect to the specified page
  redirect(slug)
}
