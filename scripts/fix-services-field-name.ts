import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skoDqXfFqDrVj735nbtXKTBby81kkVTphHF94Vz2qDZZFwoMMwoh3FRWBmmIctzalhAFPGvACjjpQTWh0I3sUmKMUJ0dZ0Ds2znOcCuwbOZpqvxzI6CrtkwEvcIrxcAOfoJUWvzfaVWv3qD1eBaVLwFl1VoKY7OKCNqmUas0JTiCmizvnkTr',
  useCdn: false
})

async function fixServicesFieldName() {
  console.log('🔧 FIXING SERVICES FIELD NAME (capabilities → specs)\n')

  // Fix Precision Metrology - rename capabilities to specs
  console.log('1️⃣ Fixing Precision Metrology...')
  const metrologyService = await client.fetch(`
    *[_type == "service" && slug.current == "precision-metrology"][0] {
      _id,
      capabilities
    }
  `)

  if (metrologyService?.capabilities) {
    await client
      .patch(metrologyService._id)
      .set({
        specs: metrologyService.capabilities
      })
      .unset(['capabilities'])
      .commit()
    console.log('   ✅ Renamed capabilities to specs for Precision Metrology\n')
  }

  // Fix Engineering Services - rename capabilities to specs
  console.log('2️⃣ Fixing Engineering Services...')
  const engineeringService = await client.fetch(`
    *[_type == "service" && slug.current == "engineering-services"][0] {
      _id,
      capabilities
    }
  `)

  if (engineeringService?.capabilities) {
    await client
      .patch(engineeringService._id)
      .set({
        specs: engineeringService.capabilities
      })
      .unset(['capabilities'])
      .commit()
    console.log('   ✅ Renamed capabilities to specs for Engineering Services\n')
  }

  console.log('✅ DONE! Services now use correct field name.')
}

fixServicesFieldName().catch(console.error)
