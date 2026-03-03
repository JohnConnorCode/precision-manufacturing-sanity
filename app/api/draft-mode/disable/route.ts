import { draftMode } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Disable Draft Mode Route
 *
 * Disables the Next.js draft mode cookie and redirects back to the page.
 * Validates redirect parameter to prevent open redirect attacks.
 */
export async function GET(request: NextRequest) {
  const draft = await draftMode()
  draft.disable()

  const url = new URL(request.url)
  const redirectTo = url.searchParams.get('redirect') || '/'

  // Prevent open redirect: only allow relative paths (starting with /)
  const safePath = redirectTo.startsWith('/') && !redirectTo.startsWith('//') ? redirectTo : '/'

  return NextResponse.redirect(new URL(safePath, request.url))
}
