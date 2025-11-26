import { createClient } from 'next-sanity'

/**
 * Get the Studio URL for both local and production environments.
 *
 * Priority:
 * 1. NEXT_PUBLIC_SANITY_STUDIO_URL (explicit override)
 * 2. NEXT_PUBLIC_SITE_URL + /studio (production)
 * 3. VERCEL_URL + /studio (Vercel deployments)
 * 4. Fallback to localhost
 */
const getStudioUrl = () => {
  // Explicit studio URL override
  if (process.env.NEXT_PUBLIC_SANITY_STUDIO_URL && process.env.NEXT_PUBLIC_SANITY_STUDIO_URL !== 'http://localhost:3000/studio') {
    return process.env.NEXT_PUBLIC_SANITY_STUDIO_URL
  }
  // Production site URL
  if (process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL !== 'http://localhost:3000') {
    return new URL('/studio', process.env.NEXT_PUBLIC_SITE_URL).toString()
  }
  // Vercel deployments
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}/studio`
  }
  // Local development fallback
  return 'http://localhost:3000/studio'
}

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // Required for embedded studios
  perspective: 'published',
  // Add stega for Presentation Tool to work
  stega: {
    enabled: false, // Only enabled in preview mode
    studioUrl: getStudioUrl(),
  },
})

// Client for preview/draft mode with write access
export const previewClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
  perspective: 'previewDrafts', // Shows drafts when available, otherwise published
  stega: {
    enabled: true,
    studioUrl: getStudioUrl(),
  },
})

// Helper to get client based on draft mode
export function getClient(preview = false) {
  return preview ? previewClient : client
}
