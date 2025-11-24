import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skoDqXfFqDrVj735nbtXKTBby81kkVTphHF94Vz2qDZZFwoMMwoh3FRWBmmIctzalhAFPGvACjjpQTWh0I3sUmKMUJ0dZ0Ds2znOcCuwbOZpqvxzI6CrtkwEvcIrxcAOfoJUWvzfaVWv3qD1eBaVLwFl1VoKY7OKCNqmUas0JTiCmizvnkTr',
  useCdn: false
})

async function verifyFix() {
  console.log('🔍 Verifying Inconel resource fix...\n')

  const inconelResource = await client.fetch(
    `*[_type == "resource" && slug.current == "inconel-superalloy-machining-thermal-challenges"][0] {
      _id,
      title,
      category,
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
  console.log(`Published: ${inconelResource.publishedAt || 'NULL'}`)

  // Verify fix
  if (inconelResource.category === 'manufacturing-processes' && inconelResource.publishedAt) {
    console.log('\n✅ FIX VERIFIED! Resource is properly configured.')
    console.log(`   URL will be: /resources/manufacturing-processes/${inconelResource.slug}`)
  } else {
    console.log('\n❌ FIX FAILED!')
    if (!inconelResource.category) {
      console.log('   - Category is still null')
    }
    if (!inconelResource.publishedAt) {
      console.log('   - PublishedAt is still null')
    }
  }

  // Check all resources for null categories
  const nullCategoryResources = await client.fetch(
    `*[_type == "resource" && (category == null || !defined(category))] { title, "slug": slug.current }`
  )

  if (nullCategoryResources.length > 0) {
    console.log(`\n⚠️  Warning: ${nullCategoryResources.length} resources still have null category:`)
    nullCategoryResources.forEach((r: any) => {
      console.log(`   - ${r.title} (${r.slug})`)
    })
  } else {
    console.log('\n✅ All resources now have valid categories!')
  }
}

verifyFix().catch(console.error)
