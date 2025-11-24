/**
 * Standalone script to populate missing images in industriesPage
 * Uses hardcoded config to avoid environment variable issues
 */

import { createClient } from '@sanity/client'

// Hardcoded configuration from .env.local
const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skoDqXfFqDrVj735nbtXKTBby81kkVTphHF94Vz2qDZZFwoMMwoh3FRWBmmIctzalhAFPGvACjjpQTWh0I3sUmKMUJ0dZ0Ds2znOcCuwbOZpqvxzI6CrtkwEvcIrxcAOfoJUWvzfaVWv3qD1eBaVLwFl1VoKY7OKCNqmUas0JTiCmizvnkTr',
  useCdn: false,
})

async function populatePlaceholderImages() {
  console.log('🔍 Fetching available image assets from Sanity...')

  // Get existing image assets
  const images = await client.fetch(`*[_type == "sanity.imageAsset"][0..10]{
    _id,
    url,
    originalFilename,
    "assetId": _id
  }`)

  if (!images || images.length === 0) {
    console.error('❌ No image assets found in Sanity!')
    return
  }

  console.log(`✅ Found ${images.length} image assets`)
  console.log('Sample images:', images.slice(0, 3).map((img: any) => img.originalFilename || img._id))

  // Get industriesPage document
  console.log('\n🔍 Fetching industriesPage document...')
  const industriesPage = await client.fetch(`*[_type == "industriesPage"][0]{
    _id,
    _rev,
    content{
      industries[]{
        _key,
        name,
        description,
        image{
          asset->{_id, url},
          alt
        }
      }
    }
  }`)

  if (!industriesPage) {
    console.error('❌ industriesPage document not found!')
    return
  }

  console.log('✅ Found industriesPage document')
  console.log(`Industries count: ${industriesPage.content?.industries?.length || 0}`)

  // Check which industries are missing images
  const industries = industriesPage.content?.industries || []
  const industriesNeedingImages = industries.filter((ind: any) => !ind.image?.asset?._id)

  console.log(`\n📊 Industries needing images: ${industriesNeedingImages.length}/${industries.length}`)

  if (industriesNeedingImages.length === 0) {
    console.log('✅ All industries already have images!')
    return
  }

  console.log('\n📋 Industries needing images:')
  industriesNeedingImages.forEach((ind: any) => {
    console.log(`  - ${ind.name}`)
  })

  // Prepare placeholder images (cycle through available images)
  const placeholderImages = [
    images[0]?._id, // First image for first industry
    images[1]?._id || images[0]?._id, // Second image or fallback to first
    images[2]?._id || images[0]?._id, // Third image or fallback to first
  ]

  console.log('\n🖼️  Using placeholder images:')
  placeholderImages.forEach((id, i) => {
    const img = images.find((img: any) => img._id === id)
    console.log(`  ${i + 1}. ${img?.originalFilename || id}`)
  })

  console.log('\n🔧 Updating industries with placeholder images...')

  // Build patches for each industry needing an image
  const patches = industriesNeedingImages.map((industry: any, index: number) => {
    const imageAssetFullId = placeholderImages[index % placeholderImages.length]

    console.log(`  → ${industry.name}: ${imageAssetFullId}`)

    return {
      industry,
      imageRef: imageAssetFullId, // Use full ID as-is
      altText: `${industry.name} industry manufacturing`
    }
  })

  // Update the document with all patches at once
  try {
    const updatedIndustries = industries.map((industry: any) => {
      const patch = patches.find((p: { industry: any; imageRef: string; altText: string }) => p.industry._key === industry._key)
      if (patch) {
        return {
          ...industry,
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: patch.imageRef
            },
            alt: patch.altText
          }
        }
      }
      return industry
    })

    await client
      .patch(industriesPage._id)
      .set({ 'content.industries': updatedIndustries })
      .commit()

    console.log('\n✅ Successfully populated all placeholder images!')
    console.log('\n📋 Summary:')
    console.log(`  - Updated ${patches.length} industry entries`)
    console.log(`  - Used ${Math.min(placeholderImages.length, patches.length)} placeholder images`)
    console.log('\n✨ All images now populated! Check http://localhost:3001/industries')
  } catch (error) {
    console.error('❌ Error updating images:', error)
    throw error
  }
}

// Run the script
populatePlaceholderImages()
  .then(() => {
    console.log('\n✅ Script completed successfully!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Script failed:', error)
    process.exit(1)
  })
