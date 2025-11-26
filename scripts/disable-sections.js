import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skoDqXfFqDrVj735nbtXKTBby81kkVTphHF94Vz2qDZZFwoMMwoh3FRWBmmIctzalhAFPGvACjjpQTWh0I3sUmKMUJ0dZ0Ds2znOcCuwbOZpqvxzI6CrtkwEvcIrxcAOfoJUWvzfaVWv3qD1eBaVLwFl1VoKY7OKCNqmUas0JTiCmizvnkTr'
})

async function disableSections() {
  try {
    // Update the published homepage document directly
    const result = await client
      .patch('homepage')
      .set({
        'technicalSpecs.enabled': false,
        'operationalExcellence.enabled': false,
        'resourcesSection.enabled': false
      })
      .commit()

    console.log('Successfully updated published homepage:', result._id)

    // Verify the update
    const updated = await client.fetch('*[_type == "homepage" && _id == "homepage"][0] { "technicalSpecsEnabled": technicalSpecs.enabled, "operationalExcellenceEnabled": operationalExcellence.enabled, "resourcesSectionEnabled": resourcesSection.enabled }')
    console.log('Verified published settings:', updated)

  } catch (error) {
    console.error('Error updating homepage:', error)
  }
}

disableSections()
