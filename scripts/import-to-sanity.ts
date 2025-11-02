/**
 * Import transformed data to Sanity
 * Run: node --import tsx scripts/import-to-sanity.ts
 */

import fs from 'fs'
import path from 'path'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_WRITE_TOKEN || '',
  apiVersion: '2024-01-01',
  useCdn: false,
})

const transformedDir = path.join(__dirname, '../migrations/transformed')

async function importData() {
  console.log('🚀 Starting Sanity data import...\n')

  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.error('❌ Error: NEXT_PUBLIC_SANITY_PROJECT_ID not set in .env.local')
    process.exit(1)
  }

  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error('❌ Error: SANITY_API_WRITE_TOKEN not set in .env.local')
    process.exit(1)
  }

  try {
    // Import collections
    const collections = ['services', 'industries', 'resources', 'team-members']

    for (const collection of collections) {
      console.log(`📦 Importing ${collection}...`)
      const data = JSON.parse(
        fs.readFileSync(path.join(transformedDir, `${collection}.json`), 'utf-8')
      )

      for (const doc of data) {
        await client.createOrReplace(doc)
      }

      console.log(`   ✓ Imported ${data.length} ${collection}`)
    }

    // Import globals (singletons)
    const globals = [
      'site-settings',
      'navigation',
      'homepage',
      'footer',
      'about',
      'contact',
      'careers',
      'terms',
      'supplier-requirements',
      'ui-text',
      'page-content',
    ]

    for (const globalName of globals) {
      console.log(`🌍 Importing global: ${globalName}...`)
      const data = JSON.parse(
        fs.readFileSync(path.join(transformedDir, `global-${globalName}.json`), 'utf-8')
      )

      await client.createOrReplace(data)
      console.log(`   ✓ Imported ${globalName}`)
    }

    console.log('\n✅ Import complete!')
    console.log('\n📊 Next steps:')
    console.log('1. Open Sanity Studio: npm run dev → http://localhost:3000/studio')
    console.log('2. Verify all content imported correctly')
    console.log('3. Continue with Phase 6: Code Migration')

  } catch (error: any) {
    console.error('\n❌ Import failed:', error.message)
    if (error.statusCode === 401) {
      console.error('\n💡 Check that SANITY_API_WRITE_TOKEN is correct in .env.local')
    }
    process.exit(1)
  }
}

importData()
