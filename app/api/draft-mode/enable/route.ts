import { validatePreviewUrl } from '@sanity/preview-url-secret'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { client } from '@/sanity/lib/client'

/**
 * Draft Mode Enable Route for Sanity Presentation Tool
 *
 * Manual implementation of defineEnableDraftMode to handle
 * edge cases in Vercel's production runtime.
 */
export async function GET(request: Request) {
  const token = process.env.SANITY_API_READ_TOKEN

  if (!token) {
    return new Response(
      JSON.stringify({ error: 'Missing SANITY_API_READ_TOKEN' }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    )
  }

  const clientWithToken = client.withConfig({ token })

  let result: { isValid: boolean; redirectTo?: string }

  try {
    result = await validatePreviewUrl(clientWithToken, request.url)
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[draft-mode/enable] validatePreviewUrl error:', msg)
    return new Response(
      JSON.stringify({ error: 'Preview validation failed', detail: msg }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    )
  }

  if (!result.isValid) {
    return new Response('Invalid secret', { status: 401 })
  }

  const dm = await draftMode()
  dm.enable()

  const redirectTo = result.redirectTo || '/'
  redirect(redirectTo)
}
