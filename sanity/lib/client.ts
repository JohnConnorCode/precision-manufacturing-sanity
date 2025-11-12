import { createClient } from 'next-sanity'

// Determine studio URL dynamically for both local and production environments
const getStudioUrl = () => {
  if (process.env.NEXT_PUBLIC_STUDIO_URL) {
    return process.env.NEXT_PUBLIC_STUDIO_URL
  }
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return new URL('/studio', process.env.NEXT_PUBLIC_SITE_URL).toString()
  }
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
