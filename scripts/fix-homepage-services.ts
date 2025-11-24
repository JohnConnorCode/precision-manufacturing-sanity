import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skoDqXfFqDrVj735nbtXKTBby81kkVTphHF94Vz2qDZZFwoMMwoh3FRWBmmIctzalhAFPGvACjjpQTWh0I3sUmKMUJ0dZ0Ds2znOcCuwbOZpqvxzI6CrtkwEvcIrxcAOfoJUWvzfaVWv3qD1eBaVLwFl1VoKY7OKCNqmUas0JTiCmizvnkTr',
  useCdn: false
})

async function fixHomepageServices() {
  console.log('🔧 FIXING HOMEPAGE SERVICES SECTION\n')

  // Fix 1: Update homepage services section eyebrow
  console.log('1️⃣ Fixing services section eyebrow...')
  const homepage = await client.fetch(`*[_type == "homepage"][0] { _id, servicesSection }`)

  if (homepage) {
    await client
      .patch(homepage._id)
      .set({
        'servicesSection.eyebrow': 'COMPREHENSIVE MANUFACTURING SOLUTIONS',
        'servicesSection.subtitle': '' // Remove subtitle
      })
      .commit()
    console.log('   ✅ Fixed services section eyebrow and removed subtitle\n')
  }

  // Fix 2: Update Precision Metrology service
  console.log('2️⃣ Updating Precision Metrology service...')
  const metrologyService = await client.fetch(`
    *[_type == "service" && slug.current == "precision-metrology"][0] {
      _id,
      capabilities
    }
  `)

  if (metrologyService) {
    await client
      .patch(metrologyService._id)
      .set({
        capabilities: [
          { _key: 'cap1', _type: 'capability', text: '0.00005" accuracy' },
          { _key: 'cap2', _type: 'capability', text: 'GD&T analysis' },
          { _key: 'cap3', _type: 'capability', text: 'AS9102 certified' }
        ]
      })
      .commit()
    console.log('   ✅ Added capabilities to Precision Metrology\n')
  }

  // Fix 3: Update Engineering Services
  console.log('3️⃣ Updating Engineering Services...')
  const engineeringService = await client.fetch(`
    *[_type == "service" && slug.current == "engineering-services"][0] {
      _id,
      capabilities
    }
  `)

  if (engineeringService) {
    await client
      .patch(engineeringService._id)
      .set({
        capabilities: [
          { _key: 'cap1', _type: 'capability', text: 'DFM analysis' },
          { _key: 'cap2', _type: 'capability', text: 'Process planning' },
          { _key: 'cap3', _type: 'capability', text: 'Cost optimization' }
        ]
      })
      .commit()
    console.log('   ✅ Added capabilities to Engineering Services\n')
  }

  console.log('✅ ALL HOMEPAGE FIXES COMPLETE!')
  console.log('\nNote: Images for Precision Metrology and Engineering Services')
  console.log('need to be added manually in Sanity Studio.')
}

fixHomepageServices().catch(console.error)
