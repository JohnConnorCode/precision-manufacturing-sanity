/**
 * Sanity Live Mode Configuration
 *
 * This sets up live editing for Sanity Presentation Tool.
 * Uses defineLive() from next-sanity v9+ to handle:
 * - Stega encoding for click-to-edit in preview
 * - WebSocket connections for live updates
 * - Draft mode handling
 */

import { defineLive } from 'next-sanity'
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

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    stega: {
      enabled: true,
      studioUrl: getStudioUrl(),
    },
  }),
  // Server token for fetching draft content
  serverToken: process.env.SANITY_API_READ_TOKEN,
  // Browser token for live updates (optional, enables mutations)
  browserToken: process.env.SANITY_API_READ_TOKEN,
  // Fetch options for live mode
  fetchOptions: {
    revalidate: 0, // Disable caching for live editing
  },
})
