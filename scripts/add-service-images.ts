import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skoDqXfFqDrVj735nbtXKTBby81kkVTphHF94Vz2qDZZFwoMMwoh3FRWBmmIctzalhAFPGvACjjpQTWh0I3sUmKMUJ0dZ0Ds2znOcCuwbOZpqvxzI6CrtkwEvcIrxcAOfoJUWvzfaVWv3qD1eBaVLwFl1VoKY7OKCNqmUas0JTiCmizvnkTr',
  useCdn: false
})

async function uploadImageFromUrl(url: string, filename: string) {
  try {
    const response = await fetch(url)
    const buffer = await response.arrayBuffer()
    const asset = await client.assets.upload('image', Buffer.from(buffer), {
      filename,
      contentType: 'image/jpeg',
    })
    return asset
  } catch (error) {
    console.error(`Failed to upload ${filename}:`, error)
    return null
  }
}

async function addServiceImages() {
  console.log('🔧 ADDING SERVICE IMAGES\n')

  // Image URLs from Unsplash (similar quality to existing services)
  const metrologyImageUrl = 'https://images.unsplash.com/photo-1581092918484-8313e1f65a2d?w=800&q=90'
  const engineeringImageUrl = 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=800&q=90'

  // Upload Precision Metrology image
  console.log('1️⃣ Uploading Precision Metrology image...')
  const metrologyAsset = await uploadImageFromUrl(metrologyImageUrl, 'precision-metrology.jpg')

  if (metrologyAsset) {
    const metrologyService = await client.fetch(`*[_type == "service" && slug.current == "precision-metrology"][0] { _id }`)
    if (metrologyService) {
      await client
        .patch(metrologyService._id)
        .set({
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: metrologyAsset._id
            },
            alt: 'Precision measurement and inspection equipment'
          }
        })
        .commit()
      console.log('   ✅ Added image to Precision Metrology\n')
    }
  }

  // Upload Engineering Services image
  console.log('2️⃣ Uploading Engineering Services image...')
  const engineeringAsset = await uploadImageFromUrl(engineeringImageUrl, 'engineering-services.jpg')

  if (engineeringAsset) {
    const engineeringService = await client.fetch(`*[_type == "service" && slug.current == "engineering-services"][0] { _id }`)
    if (engineeringService) {
      await client
        .patch(engineeringService._id)
        .set({
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: engineeringAsset._id
            },
            alt: 'Engineering design and consultation services'
          }
        })
        .commit()
      console.log('   ✅ Added image to Engineering Services\n')
    }
  }

  console.log('✅ ALL SERVICE IMAGES ADDED!')
}

addServiceImages().catch(console.error)
