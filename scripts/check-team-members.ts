import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skoDqXfFqDrVj735nbtXKTBby81kkVTphHF94Vz2qDZZFwoMMwoh3FRWBmmIctzalhAFPGvACjjpQTWh0I3sUmKMUJ0dZ0Ds2znOcCuwbOZpqvxzI6CrtkwEvcIrxcAOfoJUWvzfaVWv3qD1eBaVLwFl1VoKY7OKCNqmUas0JTiCmizvnkTr',
  useCdn: false
})

async function checkTeamMembers() {
  console.log('🔍 Checking team member status...\n')

  const teamMembers = await client.fetch(
    `*[_type == "teamMember"] {
      _id,
      name,
      title,
      bio,
      "hasPhoto": defined(photo.asset._ref),
      "photoUrl": photo.asset->url,
      email,
      order
    } | order(order asc)`
  )

  console.log(`Found ${teamMembers.length} team members:\n`)

  const withPhotos = teamMembers.filter((m: any) => m.hasPhoto)
  const withoutPhotos = teamMembers.filter((m: any) => !m.hasPhoto)
  const drafts = teamMembers.filter((m: any) => m._id.startsWith('drafts.'))
  const published = teamMembers.filter((m: any) => !m._id.startsWith('drafts.'))

  console.log(`📊 Summary:`)
  console.log(`   Total: ${teamMembers.length}`)
  console.log(`   Published: ${published.length}`)
  console.log(`   Drafts: ${drafts.length}`)
  console.log(`   With photos: ${withPhotos.length}`)
  console.log(`   Without photos: ${withoutPhotos.length}\n`)

  if (drafts.length > 0) {
    console.log(`📝 Draft team members (likely test data):`)
    drafts.forEach((m: any) => {
      console.log(`   - ${m.name} (${m._id}) - Photo: ${m.hasPhoto ? '✅' : '❌'}`)
    })
    console.log()
  }

  if (published.length > 0) {
    console.log(`✅ Published team members:`)
    published.forEach((m: any) => {
      console.log(`   - ${m.name} (${m.title || 'No title'}) - Photo: ${m.hasPhoto ? '✅' : '❌'}`)
    })
    console.log()
  }

  // Check if about page references team members
  const aboutPage = await client.fetch(
    `*[_type == "page" && slug.current == "about"][0] {
      _id,
      title,
      "hasTeamSection": defined(sections[_type == "teamSection"])
    }`
  )

  if (aboutPage) {
    console.log(`📄 About page: ${aboutPage.title}`)
    console.log(`   Has team section: ${aboutPage.hasTeamSection ? '✅ Yes' : '❌ No'}`)
  }
}

checkTeamMembers().catch(console.error)
