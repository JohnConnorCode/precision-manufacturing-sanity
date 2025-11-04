/**
 * Check if services and industries have proper image data
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
})

async function checkData() {
  console.log('🔍 Checking Services Data...\n')

  const services = await client.fetch(`*[_type == "service" && published == true] | order(order asc) {
    _id,
    title,
    image {
      asset-> {
        _id,
        url
      },
      alt
    }
  }`)

  services.forEach((s, i) => {
    const hasImage = !!s.image?.asset?.url
    console.log(`${i + 1}. ${s.title}`)
    console.log(`   Image: ${hasImage ? '✅ ' + s.image.asset.url.substring(0, 50) + '...' : '❌ MISSING'}`)
    console.log(`   Alt: ${s.image?.alt || '❌ MISSING'}`)
  })

  console.log('\n🔍 Checking Industries Data...\n')

  const industries = await client.fetch(`*[_type == "industry" && published == true] | order(order asc) {
    _id,
    title,
    image {
      asset-> {
        _id,
        url
      },
      alt
    }
  }`)

  industries.forEach((ind, i) => {
    const hasImage = !!ind.image?.asset?.url
    console.log(`${i + 1}. ${ind.title}`)
    console.log(`   Image: ${hasImage ? '✅ ' + ind.image.asset.url.substring(0, 50) + '...' : '❌ MISSING'}`)
    console.log(`   Alt: ${ind.image?.alt || '❌ MISSING'}`)
  })

  console.log('\n📊 Summary:')
  const servicesWithImages = services.filter(s => s.image?.asset?.url).length
  const industriesWithImages = industries.filter(i => i.image?.asset?.url).length

  console.log(`Services: ${servicesWithImages}/${services.length} have images`)
  console.log(`Industries: ${industriesWithImages}/${industries.length} have images`)

  if (servicesWithImages < services.length || industriesWithImages < industries.length) {
    console.log('\n⚠️  Some items are missing images - this will cause empty src errors')
  } else {
    console.log('\n✅ All items have images!')
  }
}

checkData()
