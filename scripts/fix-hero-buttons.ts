#!/usr/bin/env tsx
/**
 * Fix: Remove tertiary CTA button from homepage hero
 */

import { createClient } from '@sanity/client'
import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'vgacjlhu',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_WRITE_TOKEN!,
  apiVersion: '2024-01-01',
  useCdn: false,
})

async function fixHeroButtons() {
  console.log('🔧 Removing tertiary button from homepage hero...')

  await client
    .patch('homepage')
    .unset(['heroEnhanced.ctaTertiary'])
    .commit()

  console.log('✅ Done! Hero now has 2 buttons instead of 3')
}

fixHeroButtons()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Error:', error)
    process.exit(1)
  })
