/**
 * Script to populate missing images in industriesPage with placeholder images from Sanity
 * Uses existing image assets as placeholders to ensure all content is fully populated
 */

import { client } from '../sanity/lib/client'

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
  console.log('Sample images:', images.slice(0, 3).map((img: any) => img.originalFilename))

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
          asset->{_id, url}
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

  // Prepare placeholder images (cycle through available images)
  const placeholderImages = [
    images[0]?._id, // First image for first industry
    images[1]?._id || images[0]?._id, // Second image or fallback to first
    images[2]?._id || images[0]?._id, // Third image or fallback to first
  ]

  console.log('\n🔧 Preparing to update industries with placeholder images...')

  // Update each industry that needs an image
  const updates = industriesNeedingImages.map((industry: any, index: number) => {
    const imageAssetId = placeholderImages[index % placeholderImages.length]

    return client
      .patch(industriesPage._id)
      .setIfMissing({ 'content.industries': [] })
      .set({
        [`content.industries[_key=="${industry._key}"].image`]: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAssetId.replace('image-', '').replace('-jpg', '').replace('-png', '')
          },
          alt: `${industry.name} industry manufacturing`,
        }
      })
  })

  // Execute all updates
  console.log(`\n🚀 Updating ${updates.length} industries...`)

  try {
    await Promise.all(updates.map((update: any) => update.commit()))
    console.log('✅ Successfully populated all placeholder images!')
    console.log('\n📋 Summary:')
    console.log(`  - Updated ${updates.length} industry entries`)
    console.log(`  - Used ${Math.min(placeholderImages.length, updates.length)} placeholder images`)
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
