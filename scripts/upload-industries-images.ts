/**
 * Upload placeholder images for Industries Page
 * Uses Unsplash images as placeholders
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import https from 'https'
import { Readable } from 'stream'

// Load environment variables
dotenv.config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !token) {
  console.error('❌ Error: Missing environment variables')
  process.exit(1)
}

const writeClient = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false
})

// Download image from URL
async function downloadImage(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      const chunks: Buffer[] = []
      response.on('data', (chunk) => chunks.push(chunk))
      response.on('end', () => resolve(Buffer.concat(chunks)))
      response.on('error', reject)
    }).on('error', reject)
  })
}

// Upload image to Sanity
async function uploadImageToSanity(imageBuffer: Buffer, filename: string): Promise<any> {
  try {
    const stream = Readable.from(imageBuffer)
    const asset = await writeClient.assets.upload('image', stream, {
      filename,
      contentType: 'image/jpeg'
    })
    console.log(`✓ Uploaded ${filename}`)
    return asset
  } catch (error) {
    console.error(`❌ Error uploading ${filename}:`, error)
    throw error
  }
}

async function uploadIndustryImages() {
  console.log('🌱 Uploading placeholder images to Sanity...\n')

  const images = {
    hero: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=2400&q=90',
    aerospace: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1200&q=90',
    defense: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=90',
    energy: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&q=90'
  }

  const uploadedImages: Record<string, any> = {}

  // Upload all images
  for (const [key, url] of Object.entries(images)) {
    console.log(`Downloading ${key} image...`)
    const buffer = await downloadImage(url)
    const asset = await uploadImageToSanity(buffer, `${key}-industry.jpg`)
    uploadedImages[key] = asset
  }

  console.log('\n✅ All images uploaded successfully!\n')

  // Update Industries Page with image references
  console.log('📝 Updating Industries Page document with image references...')

  const industriesPage = await writeClient.fetch('*[_type == "industriesPage"][0]')

  if (!industriesPage) {
    console.error('❌ Industries Page document not found')
    return
  }

  // Build the patch operations
  const patch = writeClient
    .patch(industriesPage._id)
    .set({
      'hero.backgroundImage': {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: uploadedImages.hero._id
        },
        alt: 'Industrial manufacturing - precision components for critical industries'
      },
      'content.industries[0].image': {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: uploadedImages.aerospace._id
        },
        alt: 'Aerospace manufacturing - precision components'
      },
      'content.industries[1].image': {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: uploadedImages.defense._id
        },
        alt: 'Defense manufacturing - military components'
      },
      'content.industries[2].image': {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: uploadedImages.energy._id
        },
        alt: 'Energy sector manufacturing - turbine components'
      }
    })

  await patch.commit()

  console.log('✅ Industries Page updated with images!\n')
  console.log('🎉 All done! Images are now visible on the Industries page.')
  console.log('   Visit http://localhost:3000/industries to see them.')
}

uploadIndustryImages().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})
