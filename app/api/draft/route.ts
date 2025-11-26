import { validatePreviewUrl } from '@sanity/preview-url-secret'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { client } from '@/sanity/lib/client'

/**
 * Draft Mode API Route for Sanity Presentation Tool
 *
 * Validates the preview URL secret from Sanity and enables draft mode.
 * The token must have permissions to read preview URL secrets.
 */
export async function GET(request: Request) {
  const token = process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_WRITE_TOKEN

  if (!token) {
    console.error('Missing SANITY_API_READ_TOKEN or SANITY_API_WRITE_TOKEN')
    return new Response('Server configuration error', { status: 500 })
  }

  const clientWithToken = client.withConfig({ token })

  try {
    const { isValid, redirectTo = '/' } = await validatePreviewUrl(
      clientWithToken,
      request.url
    )

    if (!isValid) {
      return new Response('Invalid secret', { status: 401 })
    }

    const draft = await draftMode()
    draft.enable()
    redirect(redirectTo)
  } catch (error) {
    console.error('Draft mode error:', error)
    return new Response('Failed to enable draft mode', { status: 500 })
  }
}
