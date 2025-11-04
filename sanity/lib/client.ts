import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // Set to true in production for faster response times
})

// Client for preview/draft mode
export const previewClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
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
