import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { resolve } from 'path'

// Load environment variables
dotenv.config({ path: resolve(__dirname, '../.env.local') })

// Create client with environment variables
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

/**
 * Service images and specs data based on commit 03cbbe9
 */
const servicesData = {
  '5-axis-machining': {
    imageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=90',
    alt: '5-axis CNC machining precision aerospace component',
    specs: [
      { text: '±0.0001" tolerance' },
      { text: 'Titanium & super alloys' },
      { text: 'Up to 60" parts' },
    ],
  },
  'adaptive-machining': {
    imageUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=90',
    alt: 'Adaptive machining in-process verification',
    specs: [
      { text: 'In-process verification' },
      { text: 'Automated compensation' },
      { text: 'Zero defect goal' },
    ],
  },
  'metrology': {
    imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=90',
    alt: 'CMM metrology inspection aerospace quality',
    specs: [
      { text: '0.00005" accuracy' },
      { text: 'GD&T analysis' },
      { text: 'AS9102 certified' },
    ],
  },
  'engineering': {
    imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=90',
    alt: 'Engineering support CAD design optimization',
    specs: [
      { text: 'DFM analysis' },
      { text: 'Process planning' },
      { text: 'Cost optimization' },
    ],
  },
}

/**
 * Industry images data based on commit 03cbbe9
 */
const industriesData = {
  'defense': {
    imageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=90',
    alt: 'Defense manufacturing ITAR registered facility',
  },
  'energy': {
    imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=90',
    alt: 'Energy sector precision manufacturing turbine components',
  },
  'aerospace': {
    imageUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=90',
    alt: 'Aerospace manufacturing AS9100D certified components',
  },
}

/**
 * Populate images and specs for services and industries
 */
async function populateServicesAndIndustries() {
  console.log('🔍 Fetching services and industries...\n')

  // Fetch all services
  const services = await client.fetch(`*[_type == "service"]{ _id, slug }`)

  // Fetch all industries
  const industries = await client.fetch(`*[_type == "industry"]{ _id, slug }`)

  console.log(`Found ${services.length} services and ${industries.length} industries\n`)

  // Update services
  console.log('🔧 Updating services with images and specs...\n')

  for (const service of services) {
    const slug = service.slug?.current
    if (!slug) continue

    const data = servicesData[slug as keyof typeof servicesData]
    if (!data) {
      console.log(`⚠️  No data for service: ${slug}`)
      continue
    }

    try {
      // Create image object with URL reference
      const updates: any = {
        specs: data.specs,
      }

      // Note: For image URLs, we need to use Sanity's image type
      // Since we're using external URLs, we'll add a temporary image field
      // In production, these should be uploaded to Sanity's asset store
      if (data.imageUrl) {
        updates.imageUrl = data.imageUrl
        updates.imageAlt = data.alt
      }

      await client.patch(service._id).set(updates).commit()

      console.log(`✅ Updated service: ${slug}`)
      console.log(`   - Added ${data.specs.length} specs`)
      console.log(`   - Added image URL`)
    } catch (error) {
      console.error(`❌ Failed to update service ${slug}:`, error)
    }
  }

  // Update industries
  console.log('\n🔧 Updating industries with images...\n')

  for (const industry of industries) {
    const slug = industry.slug?.current
    if (!slug) continue

    const data = industriesData[slug as keyof typeof industriesData]
    if (!data) {
      console.log(`⚠️  No data for industry: ${slug}`)
      continue
    }

    try {
      const updates: any = {}

      if (data.imageUrl) {
        updates.imageUrl = data.imageUrl
        updates.imageAlt = data.alt
      }

      await client.patch(industry._id).set(updates).commit()

      console.log(`✅ Updated industry: ${slug}`)
      console.log(`   - Added image URL`)
    } catch (error) {
      console.error(`❌ Failed to update industry ${slug}:`, error)
    }
  }

  console.log('\n✅ All services and industries updated successfully!')
  console.log('\n📝 Note: Image URLs are currently external (Unsplash)')
  console.log('   For production, consider uploading these to Sanity Media Library')
}

// Run the script
populateServicesAndIndustries().catch((error) => {
  console.error('❌ Error running script:', error)
  process.exit(1)
})
