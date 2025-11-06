import { createClient } from 'next-sanity'

// Validate project ID is configured
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const isValidProjectId = projectId && projectId !== 'your-project-id-here' && projectId.length > 0

// Use a placeholder project ID during build if not configured
// This prevents build failures while allowing the app to build
const buildTimeProjectId = isValidProjectId ? projectId : 'placeholder-build-id'

if (!isValidProjectId && process.env.NODE_ENV !== 'production') {
  console.warn(
    '⚠️  SANITY_PROJECT_ID is not configured. Using placeholder for build. ' +
    'Set NEXT_PUBLIC_SANITY_PROJECT_ID in your environment variables.'
  )
}

export const client = createClient({
  projectId: buildTimeProjectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // Set to true in production for faster response times
})

// Client for preview/draft mode
export const previewClient = createClient({
  projectId: buildTimeProjectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: 'previewDrafts',
  stega: {
    enabled: true,
    studioUrl:
      process.env.NEXT_PUBLIC_STUDIO_URL ||
      (process.env.NEXT_PUBLIC_SITE_URL
        ? new URL('/studio', process.env.NEXT_PUBLIC_SITE_URL).toString()
        : 'http://localhost:3000/studio'),
  },
})

// Helper to get client based on draft mode
export function getClient(preview = false) {
  // Enable stega annotations when in preview to power Visual Editing overlays
  const base = preview ? previewClient : client
  return base.withConfig({ stega: preview })
}
