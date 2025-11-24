import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skoDqXfFqDrVj735nbtXKTBby81kkVTphHF94Vz2qDZZFwoMMwoh3FRWBmmIctzalhAFPGvACjjpQTWh0I3sUmKMUJ0dZ0Ds2znOcCuwbOZpqvxzI6CrtkwEvcIrxcAOfoJUWvzfaVWv3qD1eBaVLwFl1VoKY7OKCNqmUas0JTiCmizvnkTr',
  useCdn: false
})

async function fixAllMissingData() {
  console.log('🔧 FIXING ALL MISSING SANITY DATA\n')

  // Fix 1: Update site settings with missing company info
  console.log('1️⃣ Fixing Site Settings...')
  const siteSettings = await client.fetch(`*[_type == "siteSettings"][0] { _id }`)

  if (siteSettings) {
    await client
      .patch(siteSettings._id)
      .set({
        'company.websiteUrl': 'https://iismet.com',
        'company.email': 'officemgr@iismet.com'
      })
      .commit()
    console.log('   ✅ Set company websiteUrl and email\n')
  }

  // Fix 2: Set publish dates for resources missing them
  console.log('2️⃣ Fixing Resources publishDate...')
  const resourcesWithoutDate = await client.fetch(`
    *[_type == "resource" && !defined(publishDate)] {
      _id,
      title
    }
  `)

  console.log(`   Found ${resourcesWithoutDate.length} resources without publishDate`)

  const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD

  for (const resource of resourcesWithoutDate) {
    await client
      .patch(resource._id)
      .set({ publishDate: today })
      .commit()
    console.log(`   ✅ Set publishDate for: ${resource.title}`)
  }

  // Fix 3: Fix Inconel resource that's missing metadata
  console.log('\n3️⃣ Fixing Inconel resource metadata...')
  const inconelResource = await client.fetch(`
    *[_type == "resource" && slug.current == "inconel-superalloy-machining-thermal-challenges"][0] {
      _id,
      title,
      author,
      difficulty,
      readTime
    }
  `)

  if (inconelResource) {
    const updates: any = {}
    if (!inconelResource.author) updates.author = 'IIS Engineering Team'
    if (!inconelResource.difficulty) updates.difficulty = 'advanced'
    if (!inconelResource.readTime) updates.readTime = '8 min read'

    if (Object.keys(updates).length > 0) {
      await client
        .patch(inconelResource._id)
        .set(updates)
        .commit()
      console.log(`   ✅ Fixed Inconel metadata:`, updates)
    } else {
      console.log('   ✅ Inconel already has all metadata')
    }
  }

  console.log('\n✅ ALL FIXES COMPLETE!')
  console.log('\nRun verification script to confirm...')
}

fixAllMissingData().catch(console.error)
