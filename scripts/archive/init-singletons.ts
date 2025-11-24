import { client } from '../sanity/lib/client'

// List of all singleton document types that need to exist
const singletonTypes = [
  'homepage',
  'siteSettings',
  'navigation',
  'footer',
  'about',
  'contact',
  'careers',
  'terms',
  'supplierRequirements',
  'servicesPage',
  'industriesPage',
  'uiText',
  'pageContent',
]

async function initializeSingletons() {
  console.log('🔍 Checking for missing singleton documents...\n')

  for (const type of singletonTypes) {
    try {
      const existing = await client.fetch(`*[_type == $type][0]._id`, { type })

      if (!existing) {
        console.log(`📝 Creating ${type} singleton...`)
        const result = await client.create({
          _id: type,
          _type: type,
          // Add minimal required fields - these will be populated in Studio
        })
        console.log(`✅ Created ${type} (ID: ${result._id})`)
      } else {
        console.log(`✓ ${type} already exists (ID: ${existing})`)
      }
    } catch (error: any) {
      console.error(`❌ Error with ${type}:`, error.message)
    }
  }

  console.log('\n✨ Singleton initialization complete!')
  console.log('You can now edit these documents in Sanity Studio at http://localhost:3000/studio')
}

initializeSingletons()
  .then(() => {
    console.log('\n👉 Next steps:')
    console.log('   1. Start dev server: npm run dev')
    console.log('   2. Open Studio: http://localhost:3000/studio')
    console.log('   3. Populate content in each singleton document')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Fatal error:', error)
    process.exit(1)
  })
