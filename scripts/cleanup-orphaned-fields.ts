#!/usr/bin/env tsx
/**
 * Cleanup Script: Remove orphaned schema fields from service documents
 *
 * Problem: Documents contain fields that don't exist in the current schema:
 * - hero.backgroundImageSource (should be hero.backgroundImage with asset)
 * - services[].imageSource (should be services[].image with asset)
 *
 * This causes Sanity Studio to display broken UI and errors.
 */

import { createClient } from '@sanity/client'
import { config } from 'dotenv'
import { resolve } from 'path'

// Load .env.local file
config({ path: resolve(process.cwd(), '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'vgacjlhu',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_WRITE_TOKEN!,
  apiVersion: '2024-01-01',
  useCdn: false,
})

async function cleanupOrphanedFields() {
  console.log('🔍 Fetching all service documents...')

  const services = await client.fetch<any[]>(`*[_type == "service"] {
    _id,
    _rev,
    title,
    hero,
    services,
    image,
    overview,
    process
  }`)

  console.log(`Found ${services.length} service documents\n`)

  for (const service of services) {
    console.log(`\n📝 Processing: ${service.title} (${service._id})`)

    const patches: any[] = []

    // Check for orphaned fields in hero
    if (service.hero?.backgroundImageSource) {
      console.log('  ⚠️  Found orphaned field: hero.backgroundImageSource')
      patches.push(client.patch(service._id).unset(['hero.backgroundImageSource']))
    }

    // Check for orphaned fields in main image
    if (service.imageSource) {
      console.log('  ⚠️  Found orphaned field: imageSource')
      patches.push(client.patch(service._id).unset(['imageSource']))
    }

    // Check for orphaned fields in services array
    if (service.services && Array.isArray(service.services)) {
      const hasOrphanedServiceFields = service.services.some((s: any) => s.imageSource)
      if (hasOrphanedServiceFields) {
        console.log('  ⚠️  Found orphaned fields in services array: imageSource')
        // Clean each service item
        const cleanedServices = service.services.map((s: any) => {
          const { imageSource, ...rest } = s
          return rest
        })
        patches.push(client.patch(service._id).set({ services: cleanedServices }))
      }
    }

    // Check for orphaned fields in overview
    if (service.overview?.imageSource) {
      console.log('  ⚠️  Found orphaned field: overview.imageSource')
      patches.push(client.patch(service._id).unset(['overview.imageSource']))
    }

    // Check for orphaned fields in process array
    if (service.process && Array.isArray(service.process)) {
      const hasOrphanedProcessFields = service.process.some((p: any) => p.imageSource)
      if (hasOrphanedProcessFields) {
        console.log('  ⚠️  Found orphaned fields in process array: imageSource')
        const cleanedProcess = service.process.map((p: any) => {
          const { imageSource, ...rest } = p
          return rest
        })
        patches.push(client.patch(service._id).set({ process: cleanedProcess }))
      }
    }

    // Execute all patches
    if (patches.length > 0) {
      console.log(`  🔧 Applying ${patches.length} cleanup operations...`)
      for (const patch of patches) {
        await patch.commit()
      }
      console.log('  ✅ Cleaned up successfully')
    } else {
      console.log('  ✓ No orphaned fields found')
    }
  }

  console.log('\n✨ Cleanup complete!\n')
  console.log('Next steps:')
  console.log('1. Go to http://localhost:3000/studio')
  console.log('2. Open each service document')
  console.log('3. Upload images for hero backgrounds and service cards')
  console.log('4. Save and publish')
}

// Run cleanup
cleanupOrphanedFields()
  .then(() => {
    console.log('\n✅ All done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Error:', error)
    process.exit(1)
  })
