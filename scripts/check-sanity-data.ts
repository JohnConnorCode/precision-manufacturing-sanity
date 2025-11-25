import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skoDqXfFqDrVj735nbtXKTBby81kkVTphHF94Vz2qDZZFwoMMwoh3FRWBmmIctzalhAFPGvACjjpQTWh0I3sUmKMUJ0dZ0Ds2znOcCuwbOZpqvxzI6CrtkwEvcIrxcAOfoJUWvzfaVWv3qD1eBaVLwFl1VoKY7OKCNqmUas0JTiCmizvnkTr',
  useCdn: false
})

async function checkData() {
  const result = await client.fetch(`
    *[_type == 'homepage'][0].servicesSection {
      eyebrow,
      heading,
      headingWord1,
      headingWord2,
      description,
      headerEyebrow,
      headerHeading,
      headerHeadingWord1,
      headerHeadingWord2,
      headerDescription,
      header
    }
  `)

  console.log(JSON.stringify(result, null, 2))
}

checkData()
