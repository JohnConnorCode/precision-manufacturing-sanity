import { config } from 'dotenv'
import { resolve } from 'path'

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') })

import { createClient } from 'next-sanity'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN,
})

async function publishAllContent() {
  console.log('🚀 Publishing all services and industries...\n')
  console.log(`Project ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`)
  console.log(`Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET}\n`)

  try {
    // Get all services (including those without published field)
    const services = await client.fetch(`*[_type == "service"]{_id, title, published}`)
    console.log(`Found ${services.length} services`)

    // Get all industries
    const industries = await client.fetch(`*[_type == "industry"]{_id, title, published}`)
    console.log(`Found ${industries.length} industries\n`)

    // Publish services
    console.log('Publishing services...')
    for (const service of services) {
      if (service.published !== true) {
        await client
          .patch(service._id)
          .set({ published: true })
          .commit()
        console.log(`  ✅ Published: ${service.title}`)
      } else {
        console.log(`  ⏭️  Already published: ${service.title}`)
      }
    }

    // Publish industries
    console.log('\nPublishing industries...')
    for (const industry of industries) {
      if (industry.published !== true) {
        await client
          .patch(industry._id)
          .set({ published: true })
          .commit()
        console.log(`  ✅ Published: ${industry.title}`)
      } else {
        console.log(`  ⏭️  Already published: ${industry.title}`)
      }
    }

    console.log('\n✨ All content published successfully!')
  } catch (error) {
    console.error('❌ Error publishing content:', error)
    process.exit(1)
  }
}

publishAllContent()
