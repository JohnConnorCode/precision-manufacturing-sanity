import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skoDqXfFqDrVj735nbtXKTBby81kkVTphHF94Vz2qDZZFwoMMwoh3FRWBmmIctzalhAFPGvACjjpQTWh0I3sUmKMUJ0dZ0Ds2znOcCuwbOZpqvxzI6CrtkwEvcIrxcAOfoJUWvzfaVWv3qD1eBaVLwFl1VoKY7OKCNqmUas0JTiCmizvnkTr',
  useCdn: false
})

async function fixServicesSection() {
  const homepage = await client.fetch(`*[_type == 'homepage'][0] { _id }`)

  // Set the TOP-LEVEL fields that the schema expects
  // Remove the nested header object entirely to avoid conflicts
  await client
    .patch(homepage._id)
    .set({
      'servicesSection.eyebrow': 'COMPREHENSIVE MANUFACTURING SOLUTIONS',
      'servicesSection.heading': 'PRECISION SERVICES',
      'servicesSection.description': 'Four core service pillars delivering unmatched precision and reliability'
    })
    .unset([
      'servicesSection.header',           // Remove nested header object
      'servicesSection.headingWord1',     // Remove word1/word2 (use heading instead)
      'servicesSection.headingWord2',
      'servicesSection.title'             // Remove any other conflicting fields
    ])
    .commit()

  console.log('✅ Fixed servicesSection data structure')
  console.log('   - Set top-level eyebrow: COMPREHENSIVE MANUFACTURING SOLUTIONS')
  console.log('   - Set top-level heading: PRECISION SERVICES')
  console.log('   - Set top-level description: Four core service pillars...')
  console.log('   - Removed nested header object')
  console.log('   - Removed headingWord1/headingWord2 (using heading instead)')

  // Verify
  const result = await client.fetch(`*[_type == 'homepage'][0].servicesSection {
    eyebrow,
    heading,
    headingWord1,
    headingWord2,
    description,
    header
  }`)

  console.log('\n📋 Verification:')
  console.log(JSON.stringify(result, null, 2))
}

fixServicesSection()
