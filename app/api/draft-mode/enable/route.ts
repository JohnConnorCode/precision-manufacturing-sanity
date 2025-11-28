import { defineEnableDraftMode } from 'next-sanity/draft-mode'
import { client } from '@/sanity/lib/client'

/**
 * Draft Mode Enable Route for Sanity Presentation Tool (next-sanity v11+)
 *
 * Uses the new defineEnableDraftMode helper which handles:
 * - Preview URL secret validation
 * - Draft mode cookie setting
 * - Proper redirect handling
 */
export const { GET } = defineEnableDraftMode({
  client: client.withConfig({
    token: process.env.SANITY_API_READ_TOKEN,
  }),
})
