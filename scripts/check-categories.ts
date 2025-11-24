import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skoDqXfFqDrVj735nbtXKTBby81kkVTphHF94Vz2qDZZFwoMMwoh3FRWBmmIctzalhAFPGvACjjpQTWh0I3sUmKMUJ0dZ0Ds2znOcCuwbOZpqvxzI6CrtkwEvcIrxcAOfoJUWvzfaVWv3qD1eBaVLwFl1VoKY7OKCNqmUas0JTiCmizvnkTr',
  useCdn: false
})

async function checkCategories() {
  console.log('🔍 Checking resource categories...\n')

  const categories = await client.fetch(
    `*[_type == "resourceCategory"] {
      _id,
      title,
      "slug": slug.current
    }`
  )

  console.log(`Found ${categories.length} categories:`)
  categories.forEach((cat: any) => {
    console.log(`  - ${cat.title} (slug: ${cat.slug}, id: ${cat._id})`)
  })
}

checkCategories().catch(console.error)
