/**
 * Sanity Live Mode Configuration - next-sanity v11+
 *
 * Uses the new /live export for proper Presentation Tool integration.
 * This handles:
 * - Stega encoding for click-to-edit in preview
 * - Live content updates via WebSocket
 * - Draft mode handling
 */

import { defineLive } from 'next-sanity/live'
import { client } from './client'

// Get the studio URL dynamically
const getStudioUrl = () => {
  // In browser, use current origin
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/studio`
  }
  // Production
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return `${process.env.NEXT_PUBLIC_SITE_URL}/studio`
  }
  // Vercel preview
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/studio`
  }
  // Local development
  return 'http://localhost:3000/studio'
}

// Get the token - required for draft content
const token = process.env.SANITY_API_READ_TOKEN

if (!token) {
  console.warn('Missing SANITY_API_READ_TOKEN - draft mode will not work')
}

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    stega: {
      enabled: true,
      studioUrl: getStudioUrl(),
    },
  }),
  serverToken: token,
  browserToken: token,
})
