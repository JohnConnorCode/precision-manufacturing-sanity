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
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
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

async function fixMetrologyImage() {
  console.log('🔧 FIXING PRECISION METROLOGY IMAGE\n')

  // Use a known working Unsplash image (measurement/precision equipment)
  const metrologyImageUrl = 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=90'

  console.log('1️⃣ Uploading Precision Metrology image...')
  const metrologyAsset = await uploadImageFromUrl(metrologyImageUrl, 'precision-metrology-measurement.jpg')

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
  } else {
    console.log('   ❌ Failed to upload image\n')
  }

  console.log('✅ DONE!')
}

fixMetrologyImage().catch(console.error)
