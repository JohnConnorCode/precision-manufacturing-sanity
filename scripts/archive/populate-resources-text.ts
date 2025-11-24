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

async function populateResourcesText() {
  console.log('🔍 Populating resourcesSection.additionalSeriesText...\n')

  try {
    const mutations = [
      {
        patch: {
          id: 'drafts.homepage',
          set: {
            'resourcesSection.additionalSeriesText': '6 Complete Series • 21+ Technical Articles',
          },
        },
      },
    ]

    console.log('📝 Applying mutation...')
    const result = await client.mutate(mutations)

    console.log('✅ Field updated!')

    // Verify the update
    console.log('\n🔍 Verifying update...')
    const updated = await client.fetch(`*[_type == "homepage"][0].resourcesSection.additionalSeriesText`)
    console.log('additionalSeriesText:', updated)

  } catch (error: any) {
    console.error('❌ Error:', error.message)
    if (error.response) {
      console.error('Response:', JSON.stringify(error.response, null, 2))
    }
  }
}

populateResourcesText()
  .then(() => {
    console.log('\n✨ Done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Fatal error:', error)
    process.exit(1)
  })
