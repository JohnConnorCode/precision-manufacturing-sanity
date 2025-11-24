import { createClient } from '@sanity/client'

// Create Sanity client with write token
const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skoDqXfFqDrVj735nbtXKTBby81kkVTphHF94Vz2qDZZFwoMMwoh3FRWBmmIctzalhAFPGvACjjpQTWh0I3sUmKMUJ0dZ0Ds2znOcCuwbOZpqvxzI6CrtkwEvcIrxcAOfoJUWvzfaVWv3qD1eBaVLwFl1VoKY7OKCNqmUas0JTiCmizvnkTr',
  useCdn: false
})

async function fixDataIssues() {
  console.log('🔍 Finding resources with null category...\n')

  // Find resources with null category
  const resourcesWithNullCategory = await client.fetch(
    `*[_type == "resource" && (category == null || !defined(category))] {
      _id,
      title,
      category,
      publishedAt,
      "slug": slug.current
    }`
  )

  console.log(`Found ${resourcesWithNullCategory.length} resources with null category:\n`)
  resourcesWithNullCategory.forEach((r: any) => {
    console.log(`  - ${r.title}`)
    console.log(`    ID: ${r._id}`)
    console.log(`    Slug: ${r.slug}`)
    console.log(`    Category: ${r.category}`)
    console.log(`    Published: ${r.publishedAt}\n`)
  })

  // Fix the Inconel resource
  const inconelResource = resourcesWithNullCategory.find((r: any) =>
    r.title?.toLowerCase().includes('inconel')
  )

  if (inconelResource) {
    console.log(`\n✅ Fixing: ${inconelResource.title}\n`)

    // Category field is a string, not a reference - set it directly
    await client
      .patch(inconelResource._id)
      .set({
        category: 'manufacturing-processes',
        publishedAt: new Date().toISOString()
      })
      .commit()

    console.log(`✅ Fixed category and publishedAt for: ${inconelResource.title}`)
    console.log(`   Category set to: manufacturing-processes`)
    console.log(`   Published at: ${new Date().toISOString()}\n`)
  }

  // Check for team members without photos
  console.log('\n🔍 Checking team members...\n')
  const teamMembers = await client.fetch(
    `*[_type == "teamMember"] {
      _id,
      name,
      "hasPhoto": defined(photo.asset._ref)
    }`
  )

  console.log(`Found ${teamMembers.length} team members`)
  const membersWithoutPhotos = teamMembers.filter((m: any) => !m.hasPhoto)
  console.log(`${membersWithoutPhotos.length} without photos:`)
  membersWithoutPhotos.forEach((m: any) => {
    console.log(`  - ${m.name} (ID: ${m._id})`)
  })

  console.log('\n✅ Data fix script complete!')
}

fixDataIssues().catch(console.error)
