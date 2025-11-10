import { defineEnableDraftMode } from 'next-sanity/draft-mode'
import { client } from '@/sanity/lib/client'

/**
 * Draft Mode API Route for Sanity Presentation Tool
 *
 * Uses official Sanity method for secure draft mode enablement.
 * This validates requests and sets secure HTTP-only cookies.
 *
 * Security handled by next-sanity:
 * - Origin validation
 * - Secure cookie management
 * - Token-based authentication
 */
export const { GET } = defineEnableDraftMode({
  client: client.withConfig({
    token: process.env.SANITY_API_READ_TOKEN,
  }),
})
