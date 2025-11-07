import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId) {
  console.error('❌ Error: NEXT_PUBLIC_SANITY_PROJECT_ID not found in .env.local')
  process.exit(1)
}

if (!token) {
  console.error('❌ Error: SANITY_API_WRITE_TOKEN not found in .env.local')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

async function cleanIndustries() {
  console.log('🧹 Deleting all industries...\n')

  try {
    const industryIds = [
      'industry-defense',
      'industry-energy',
      'industry-aerospace'
    ]

    for (const id of industryIds) {
      try {
        await client.delete(id)
        console.log(`✓ Deleted: ${id}`)
      } catch (error) {
        console.warn(`⚠️  Could not delete ${id}:`, error)
      }
    }

    console.log('\n✅ Cleanup complete!')
  } catch (error) {
    console.error('❌ Cleanup failed:', error)
    process.exit(1)
  }
}

cleanIndustries()
