import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { resolve } from 'path'

// Load environment variables
dotenv.config({ path: resolve(__dirname, '../.env.local') })

// Create client with environment variables
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'vgacjlhu',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

/**
 * Fix published field issue
 * Sets published: true for all services and industries that have null
 */
async function fixPublishedFields() {
  console.log('🔍 Finding documents with null published field...\n')

  // Fetch all services and industries with null published field
  const query = `*[_type in ["service", "industry"] && published == null] {
    _id,
    _type,
    title,
    published
  }`

  const docs = await client.fetch(query)

  console.log(`Found ${docs.length} documents to update:`)
  docs.forEach((doc: any) => {
    console.log(`  - ${doc._type}: ${doc.title} (published: ${doc.published})`)
  })

  if (docs.length === 0) {
    console.log('\n✅ All documents already have published field set!')
    return
  }

  console.log('\n🔧 Updating documents...\n')

  // Update each document
  for (const doc of docs) {
    try {
      await client
        .patch(doc._id)
        .set({ published: true })
        .commit()

      console.log(`✅ Updated ${doc._type}: ${doc.title}`)
    } catch (error) {
      console.error(`❌ Failed to update ${doc._type}: ${doc.title}`, error)
    }
  }

  console.log('\n✅ All documents updated!')
  console.log('\n🎉 Services and industries should now be visible on the site!')
}

// Run the fix
fixPublishedFields().catch((error) => {
  console.error('❌ Error running script:', error)
  process.exit(1)
})
