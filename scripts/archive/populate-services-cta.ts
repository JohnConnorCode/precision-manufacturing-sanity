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

async function populateServicesCTA() {
  console.log('🔧 Populating servicesSection.cta field...\n')

  try {
    const mutations = [
      {
        patch: {
          id: 'drafts.homepage',
          set: {
            'servicesSection.cta': {
              enabled: true,
              text: 'Get Quote',
              href: '/contact',
              variant: 'primary',
            },
          },
        },
      },
    ]

    console.log('📝 Applying mutation to drafts.homepage...\n')

    for (const mutation of mutations) {
      await client.mutate([mutation])
      console.log('✅ Successfully set servicesSection.cta')
    }

    console.log('\n✨ Services CTA is now editable in Sanity Studio!')
    console.log('📍 Navigate to: Homepage → Services Section → Call to Action Button\n')

  } catch (error: any) {
    console.error('❌ Error:', error.message)
    if (error.response) {
      console.error('Response:', JSON.stringify(error.response, null, 2))
    }
  }
}

populateServicesCTA()
  .then(() => {
    console.log('✨ Done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 Fatal error:', error)
    process.exit(1)
  })
