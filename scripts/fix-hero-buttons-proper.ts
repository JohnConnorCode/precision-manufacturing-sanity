#!/usr/bin/env tsx
/**
 * Fix: Update hero buttons to point to actual routes
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
  console.log('🔧 Updating hero buttons to point to existing routes...')

  await client
    .patch('homepage')
    .set({
      'heroEnhanced.ctaPrimary': {
        text: 'View Services',
        href: '/services'
      },
      'heroEnhanced.ctaSecondary': {
        text: 'Contact Us',
        href: '/contact'
      }
    })
    .commit()

  console.log('✅ Done! Hero buttons now point to:')
  console.log('  - Primary: "View Services" → /services')
  console.log('  - Secondary: "Contact Us" → /contact')
}

fixHeroButtons()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Error:', error)
    process.exit(1)
  })
