#!/usr/bin/env tsx
/**
 * Fix: Keep only 1 button in hero like reference site
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
  console.log('🔧 Setting hero to 1 button only (matching reference site)...')

  await client
    .patch('homepage')
    .set({
      'heroEnhanced.ctaPrimary': {
        text: 'View Capabilities',
        href: '/services'
      }
    })
    .unset(['heroEnhanced.ctaSecondary'])
    .commit()

  console.log('✅ Done! Hero now has 1 button:')
  console.log('  - "View Capabilities" → /services')
}

fixHeroButtons()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Error:', error)
    process.exit(1)
  })
