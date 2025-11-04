/**
 * Verify Sanity project connection and show what's actually in the database
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

console.log('🔍 SANITY CONNECTION VERIFICATION')
console.log('═'.repeat(80))
console.log(`Project ID: ${projectId}`)
console.log(`Dataset: ${dataset}`)
console.log(`Studio URL: https://${projectId}.sanity.studio`)
console.log(`Manage URL: https://www.sanity.io/manage/personal/project/${projectId}`)
console.log('═'.repeat(80))

const client = createClient({
  projectId: projectId,
  dataset: dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_TOKEN,
})

async function verifyConnection() {
  try {
    console.log('\n📦 Fetching Homepage Hero Data from Database...\n')

    // Get the ACTUAL data from Sanity
    const query = `*[_type == "homepage"][0] {
      _id,
      _updatedAt,
      heroEnhanced {
        mainTitle,
        subtitle,
        tagline
      }
    }`

    const data = await client.fetch(query)

    if (!data) {
      console.log('❌ NO HOMEPAGE DOCUMENT FOUND!')
      console.log('\nTrying to list all document types...')
      const allDocs = await client.fetch(`*[_type == "homepage"] { _type, _id, _updatedAt }`)
      console.log('Documents found:', allDocs)
      return
    }

    console.log('✅ Homepage document found!')
    console.log(`   Document ID: ${data._id}`)
    console.log(`   Last updated: ${new Date(data._updatedAt).toLocaleString()}`)
    console.log('')
    console.log('📝 Hero Content in Database:')
    console.log('─'.repeat(80))
    console.log(`mainTitle:    "${data.heroEnhanced?.mainTitle || 'NOT SET'}"`)
    console.log(`subtitle:     "${data.heroEnhanced?.subtitle || 'NOT SET'}"`)
    console.log(`tagline:      "${data.heroEnhanced?.tagline || 'NOT SET'}"`)
    console.log('─'.repeat(80))

    console.log('\n🔎 What to check in Sanity Studio:')
    console.log('1. Go to: http://localhost:3000/studio')
    console.log('2. Open: Content > Homepage')
    console.log('3. Expand: "Enhanced Hero Section"')
    console.log('4. Check if these fields match what you see above ⬆️')
    console.log('')
    console.log('⚠️  If they DON\'T match:')
    console.log('   - You might be editing in a different dataset (check top right in Studio)')
    console.log('   - The Studio might not have saved/published your changes')
    console.log('   - There might be a different project deployed somewhere')

  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

verifyConnection()
