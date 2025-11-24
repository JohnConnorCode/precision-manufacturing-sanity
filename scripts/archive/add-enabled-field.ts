import * as dotenv from 'dotenv'
import { createClient } from '@sanity/client'

// Load environment variables
dotenv.config({ path: '.env.local' })

// Create client with write token
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
})

async function addEnabledField() {
  console.log('🔍 Adding enabled: true to array items...\n')

  try {
    // Fetch the homepage document
    const homepage = await client.fetch(`*[_type == "homepage"][0]`)

    if (!homepage) {
      console.error('❌ Homepage document not found')
      return
    }

    console.log('✓ Found homepage document\n')

    // Helper function to add enabled: true to array items
    const addEnabled = (items: any[]) => {
      if (!items) return items
      return items.map(item => ({
        ...item,
        enabled: item.enabled !== undefined ? item.enabled : true
      }))
    }

    // Build mutations for each array that needs enabled field
    const mutations: any[] = []

    // 1. imageShowcase.stats
    if (homepage.imageShowcase?.stats) {
      const stats = addEnabled(homepage.imageShowcase.stats)
      mutations.push({
        patch: {
          id: 'drafts.homepage',
          set: { 'imageShowcase.stats': stats }
        }
      })
      console.log('✓ Will update imageShowcase.stats')
    }

    // 2. imageShowcase.showcaseImages
    if (homepage.imageShowcase?.showcaseImages) {
      const images = addEnabled(homepage.imageShowcase.showcaseImages)
      mutations.push({
        patch: {
          id: 'drafts.homepage',
          set: { 'imageShowcase.showcaseImages': images }
        }
      })
      console.log('✓ Will update imageShowcase.showcaseImages')
    }

    // 3. stats.items
    if (homepage.stats?.items) {
      const items = addEnabled(homepage.stats.items)
      mutations.push({
        patch: {
          id: 'drafts.homepage',
          set: { 'stats.items': items }
        }
      })
      console.log('✓ Will update stats.items')
    }

    // 4. technicalSpecs
    if (homepage.technicalSpecs) {
      const specs = addEnabled(homepage.technicalSpecs)
      mutations.push({
        patch: {
          id: 'drafts.homepage',
          set: { 'technicalSpecs': specs }
        }
      })
      console.log('✓ Will update technicalSpecs')
    }

    // 5. resourcesSection.featuredSeries
    if (homepage.resourcesSection?.featuredSeries) {
      const series = addEnabled(homepage.resourcesSection.featuredSeries)
      mutations.push({
        patch: {
          id: 'drafts.homepage',
          set: { 'resourcesSection.featuredSeries': series }
        }
      })
      console.log('✓ Will update resourcesSection.featuredSeries')
    }

    console.log(`\n📝 Applying ${mutations.length} mutations...\n`)

    // Apply all mutations
    for (const mutation of mutations) {
      await client.mutate([mutation])
      console.log('✅ Applied mutation for', Object.keys(mutation.patch.set)[0])
    }

    console.log('\n✅ All array items now have enabled field!')

  } catch (error: any) {
    console.error('❌ Error:', error.message)
    if (error.response) {
      console.error('Response:', JSON.stringify(error.response, null, 2))
    }
  }
}

addEnabledField()
  .then(() => {
    console.log('\n✨ Done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Fatal error:', error)
    process.exit(1)
  })
