import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skoDqXfFqDrVj735nbtXKTBby81kkVTphHF94Vz2qDZZFwoMMwoh3FRWBmmIctzalhAFPGvACjjpQTWh0I3sUmKMUJ0dZ0Ds2znOcCuwbOZpqvxzI6CrtkwEvcIrxcAOfoJUWvzfaVWv3qD1eBaVLwFl1VoKY7OKCNqmUas0JTiCmizvnkTr',
  useCdn: false
})

async function fixSanity() {
  const homepage = await client.fetch(`*[_type == 'homepage'][0] { _id }`)

  // Clear ALL top-level conflicting fields, keeping only the header object
  await client
    .patch(homepage._id)
    .unset([
      'servicesSection.eyebrow',
      'servicesSection.heading',
      'servicesSection.headingWord1',
      'servicesSection.headingWord2',
      'servicesSection.title'
    ])
    .commit()

  console.log('✅ Cleared all top-level conflicting fields from Sanity')
  console.log('Now ONLY the header object contains the data')
}

fixSanity()
