import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skoDqXfFqDrVj735nbtXKTBby81kkVTphHF94Vz2qDZZFwoMMwoh3FRWBmmIctzalhAFPGvACjjpQTWh0I3sUmKMUJ0dZ0Ds2znOcCuwbOZpqvxzI6CrtkwEvcIrxcAOfoJUWvzfaVWv3qD1eBaVLwFl1VoKY7OKCNqmUas0JTiCmizvnkTr',
  useCdn: false
})

async function checkStructure() {
  console.log('🔍 Checking all resources structure...\n')

  const resources = await client.fetch(
    `*[_type == "resource"] {
      _id,
      title,
      category,
      "categoryRef": category->title,
      "categorySlug": category->slug.current,
      "slug": slug.current,
      publishedAt
    }`
  )

  console.log(`Found ${resources.length} resources:\n`)
  resources.forEach((r: any) => {
    console.log(`  - ${r.title}`)
    console.log(`    Slug: ${r.slug}`)
    console.log(`    Category object: ${JSON.stringify(r.category)}`)
    console.log(`    Category title: ${r.categoryRef || 'NULL'}`)
    console.log(`    Category slug: ${r.categorySlug || 'NULL'}`)
    console.log(`    Published: ${r.publishedAt || 'NULL'}\n`)
  })

  // Also check if there are ANY category-related document types
  console.log('\n🔍 Checking for all document types...\n')
  const allTypes = await client.fetch(
    `array::unique(*[]._type)`
  )

  console.log(`Found ${allTypes.length} document types:`)
  console.log(allTypes.filter((t: string) => t.toLowerCase().includes('cat') || t.toLowerCase().includes('resource')).join(', '))
}

checkStructure().catch(console.error)
