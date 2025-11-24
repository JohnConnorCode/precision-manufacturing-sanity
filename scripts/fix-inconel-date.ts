import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skoDqXfFqDrVj735nbtXKTBby81kkVTphHF94Vz2qDZZFwoMMwoh3FRWBmmIctzalhAFPGvACjjpQTWh0I3sUmKMUJ0dZ0Ds2znOcCuwbOZpqvxzI6CrtkwEvcIrxcAOfoJUWvzfaVWv3qD1eBaVLwFl1VoKY7OKCNqmUas0JTiCmizvnkTr',
  useCdn: false
})

async function fixInconelDate() {
  console.log('🔍 Finding Inconel resource...\n')

  const inconelResource = await client.fetch(
    `*[_type == "resource" && slug.current == "inconel-superalloy-machining-thermal-challenges"][0] {
      _id,
      title,
      category,
      publishDate,
      publishedAt,
      "slug": slug.current
    }`
  )

  if (!inconelResource) {
    console.log('❌ Inconel resource not found!')
    return
  }

  console.log(`Resource: ${inconelResource.title}`)
  console.log(`Slug: ${inconelResource.slug}`)
  console.log(`Category: ${inconelResource.category || 'NULL'}`)
  console.log(`publishDate: ${inconelResource.publishDate || 'NULL'}`)
  console.log(`publishedAt: ${inconelResource.publishedAt || 'NULL'}`)

  // Fix: Set publishDate (not publishedAt!)
  const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD format

  console.log(`\n✅ Setting publishDate to: ${today}`)

  await client
    .patch(inconelResource._id)
    .set({
      publishDate: today
    })
    .commit()

  console.log('✅ Date fixed!')

  // Verify
  const updated = await client.fetch(
    `*[_type == "resource" && slug.current == "inconel-superalloy-machining-thermal-challenges"][0] {
      publishDate
    }`
  )

  console.log(`\n📊 Verification:`)
  console.log(`   publishDate is now: ${updated.publishDate}`)

  if (updated.publishDate === today) {
    console.log('\n✅ FIX VERIFIED! Date is correctly set.')
  } else {
    console.log('\n❌ FIX FAILED! Date is still incorrect.')
  }
}

fixInconelDate().catch(console.error)
