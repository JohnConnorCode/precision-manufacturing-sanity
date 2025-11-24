import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skoDqXfFqDrVj735nbtXKTBby81kkVTphHF94Vz2qDZZFwoMMwoh3FRWBmmIctzalhAFPGvACjjpQTWh0I3sUmKMUJ0dZ0Ds2znOcCuwbOZpqvxzI6CrtkwEvcIrxcAOfoJUWvzfaVWv3qD1eBaVLwFl1VoKY7OKCNqmUas0JTiCmizvnkTr',
  useCdn: false
})

async function cleanupTeamMembers() {
  console.log('🧹 Cleaning up draft team members...\n')

  // Find draft team members
  const draftTeamMembers = await client.fetch(
    `*[_type == "teamMember" && _id match "drafts.*"] {
      _id,
      name,
      title
    }`
  )

  if (draftTeamMembers.length === 0) {
    console.log('✅ No draft team members found. Nothing to delete.\n')
    return
  }

  console.log(`Found ${draftTeamMembers.length} draft team members to delete:`)
  draftTeamMembers.forEach((m: any) => {
    console.log(`  - ${m.name} (${m.title || 'No title'}) - ID: ${m._id}`)
  })

  console.log('\n🗑️  Deleting draft team members...\n')

  for (const member of draftTeamMembers) {
    try {
      await client.delete(member._id)
      console.log(`✅ Deleted: ${member.name} (${member._id})`)
    } catch (error) {
      console.log(`❌ Failed to delete ${member.name}: ${error}`)
    }
  }

  console.log('\n✅ Cleanup complete!\n')

  // Verify published team members are still there
  const publishedTeamMembers = await client.fetch(
    `*[_type == "teamMember" && !(_id match "drafts.*")] {
      _id,
      name,
      title
    }`
  )

  console.log(`📊 Remaining published team members: ${publishedTeamMembers.length}`)
  publishedTeamMembers.forEach((m: any) => {
    console.log(`  - ${m.name} (${m.title || 'No title'})`)
  })
}

cleanupTeamMembers().catch(console.error)
