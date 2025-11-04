import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

/**
 * Draft Preview API Route
 *
 * Enables Next.js Draft Mode for previewing unpublished Sanity content.
 *
 * Usage:
 * /api/preview?secret=YOUR_SECRET&collection=services&slug=my-service
 * /api/preview?secret=YOUR_SECRET&global=homepage
 *
 * Security:
 * - Requires PREVIEW_SECRET_TOKEN environment variable
 * - Validates secret token before enabling preview
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  // Extract parameters
  const secret = searchParams.get('secret')
  const collection = searchParams.get('collection')
  const slug = searchParams.get('slug')
  const globalSlug = searchParams.get('global')

  // Verify the secret token
  const validSecret = process.env.PREVIEW_SECRET_TOKEN

  if (!validSecret) {
    return new Response('Preview mode not configured. Set PREVIEW_SECRET_TOKEN.', {
      status: 500,
    })
  }

  if (secret !== validSecret) {
    return new Response('Invalid preview secret', { status: 401 })
  }

  // Determine the redirect path
  let path = '/'

  if (globalSlug) {
    // Global pages
    const globalPaths: Record<string, string> = {
      homepage: '/',
      about: '/about',
      contact: '/contact',
      careers: '/careers',
      terms: '/compliance/terms',
      'supplier-requirements': '/compliance/supplier-requirements',
    }
    path = globalPaths[globalSlug] || '/'
  } else if (collection && slug) {
    // Collection documents
    if (collection === 'services') {
      path = `/services/${slug}`
    } else if (collection === 'industries') {
      path = `/industries/${slug}`
    } else if (collection === 'resources') {
      // Resources need category - default to manufacturing-processes
      const category = searchParams.get('category') || 'manufacturing-processes'
      path = `/resources/${category}/${slug}`
    }
  } else {
    return new Response('Missing required parameters', { status: 400 })
  }

  // Enable Draft Mode
  const draft = await draftMode()
  draft.enable()

  // Redirect to the preview page
  redirect(path)
}
