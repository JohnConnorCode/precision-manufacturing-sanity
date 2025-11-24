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

async function populateCTAFields() {
  console.log('🔍 Populating CTA section fields...\n')

  try {
    // Fetch current homepage document
    const homepage = await client.fetch(`*[_type == "homepage"][0]`)

    if (!homepage) {
      console.error('❌ Homepage document not found')
      return
    }

    console.log('✓ Found homepage document\n')
    console.log('Current CTA:', JSON.stringify(homepage.cta, null, 2))

    // Prepare the full CTA object with all existing fields plus new ones
    const updatedCta = {
      ...homepage.cta,
      badge: 'TRUSTED BY INDUSTRY LEADERS',
      certifications: [
        {
          _key: 'cert-1',
          enabled: true,
          icon: 'Clock',
          text: '24/7 Production'
        },
        {
          _key: 'cert-2',
          enabled: true,
          icon: 'Shield',
          text: 'ITAR Registered'
        },
        {
          _key: 'cert-3',
          enabled: true,
          icon: 'Award',
          text: 'AS9100D'
        },
      ],
      trustMessage: 'Trusted by leading aerospace and defense manufacturers worldwide',
      heading: 'Ready to Get Started?',
    }

    console.log('\n📝 Updating CTA object...')
    console.log('New CTA:', JSON.stringify(updatedCta, null, 2))

    // Patch the document with the entire cta object
    await client
      .patch('homepage')
      .set({ cta: updatedCta })
      .commit()

    console.log('✅ Successfully updated CTA section fields!')
    console.log('\nUpdated fields:')
    console.log('  • badge:', updatedCta.badge)
    console.log('  • certifications:', updatedCta.certifications.length, 'items')
    console.log('  • trustMessage:', updatedCta.trustMessage)
    console.log('  • heading:', updatedCta.heading)

  } catch (error: any) {
    console.error('❌ Error updating CTA fields:', error.message)
    if (error.response) {
      console.error('Response:', JSON.stringify(error.response, null, 2))
    }
  }
}

populateCTAFields()
  .then(() => {
    console.log('\n✨ Done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Fatal error:', error)
    process.exit(1)
  })
