import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skoDqXfFqDrVj735nbtXKTBby81kkVTphHF94Vz2qDZZFwoMMwoh3FRWBmmIctzalhAFPGvACjjpQTWh0I3sUmKMUJ0dZ0Ds2znOcCuwbOZpqvxzI6CrtkwEvcIrxcAOfoJUWvzfaVWv3qD1eBaVLwFl1VoKY7OKCNqmUas0JTiCmizvnkTr',
  useCdn: false
})

async function fixServicesHeader() {
  const homepage = await client.fetch(`*[_type == 'homepage'][0] { _id }`)

  await client
    .patch(homepage._id)
    .set({
      // Set header to use single heading instead of word1/word2
      'servicesSection.header.heading': 'PRECISION SERVICES',
      // Clear word1/word2 so component uses heading instead
      'servicesSection.header.headingWord1': null,
      'servicesSection.header.headingWord2': null
    })
    .commit()

  console.log('✅ Fixed services section header')
}

fixServicesHeader()
