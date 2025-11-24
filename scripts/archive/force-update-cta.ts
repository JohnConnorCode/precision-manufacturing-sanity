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

async function forceUpdateCTA() {
  console.log('🔍 Force updating CTA fields...\n')

  try {
    // Use mutation API to directly set the fields
    const mutations = [
      {
        patch: {
          id: 'drafts.homepage',
          set: {
            'cta.badge': 'TRUSTED BY INDUSTRY LEADERS',
            'cta.heading': 'Ready to Get Started?',
            'cta.trustMessage': 'Trusted by leading aerospace and defense manufacturers worldwide',
            'cta.certifications': [
              {
                _key: 'cert-1',
                _type: 'object',
                enabled: true,
                icon: 'Clock',
                text: '24/7 Production'
              },
              {
                _key: 'cert-2',
                _type: 'object',
                enabled: true,
                icon: 'Shield',
                text: 'ITAR Registered'
              },
              {
                _key: 'cert-3',
                _type: 'object',
                enabled: true,
                icon: 'Award',
                text: 'AS9100D'
              },
            ],
          },
        },
      },
    ]

    console.log('📝 Applying mutations...')
    const result = await client.mutate(mutations)

    console.log('✅ Mutations applied!')
    console.log('Result:', JSON.stringify(result, null, 2))

    // Verify the update
    console.log('\n🔍 Verifying update...')
    const updated = await client.fetch(`*[_type == "homepage"][0].cta{badge, heading, trustMessage, certifications}`)
    console.log('Updated CTA fields:', JSON.stringify(updated, null, 2))

  } catch (error: any) {
    console.error('❌ Error:', error.message)
    if (error.response) {
      console.error('Response:', JSON.stringify(error.response, null, 2))
    }
  }
}

forceUpdateCTA()
  .then(() => {
    console.log('\n✨ Done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Fatal error:', error)
    process.exit(1)
  })
