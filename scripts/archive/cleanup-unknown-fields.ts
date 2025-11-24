/**
 * Cleanup Unknown Fields Script
 *
 * Removes orphaned fields from Sanity documents that are not defined in schemas.
 * These fields exist in documents but have no schema definition, making them
 * uneditable in Studio and indicating schema drift.
 *
 * Usage: npx tsx scripts/cleanup-unknown-fields.ts
 */

import { config } from 'dotenv'
import { resolve } from 'path'
import { createClient } from 'next-sanity'

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
})

if (!process.env.SANITY_API_WRITE_TOKEN) {
  console.error('❌ SANITY_API_WRITE_TOKEN not found in .env.local')
  process.exit(1)
}

// Known unknown fields to remove (add more as discovered)
// Format: path array for nested fields, e.g. ['hero', 'badge'] means hero.badge
const UNKNOWN_FIELDS_TO_REMOVE = {
  // Homepage orphaned fields
  homepage: [
    // Root level
    'certifications',
    // Nested in hero object
    ['hero', 'backgroundImageUrl'],
    ['hero', 'badge'],
    ['hero', 'badgeIconName'],
    ['hero', 'buttons'],
    ['hero', 'description'],
    ['hero', 'title'],
    ['hero', 'titleHighlight'],
  ],
  // Add other document types as needed
}

async function cleanupUnknownFields() {
  console.log('🔍 Scanning for unknown fields across all documents...\n')

  for (const [docType, fieldsToRemove] of Object.entries(UNKNOWN_FIELDS_TO_REMOVE)) {
    console.log(`📄 Checking ${docType} documents...`)

    // Query documents of this type
    const documents = await client.fetch(`*[_type == $docType]`, { docType })

    if (!documents || documents.length === 0) {
      console.log(`   ℹ️  No ${docType} documents found\n`)
      continue
    }

    for (const doc of documents) {
      const foundFields: Array<string | string[]> = []

      // Check each field (can be string for root level or array for nested)
      for (const field of fieldsToRemove) {
        if (typeof field === 'string') {
          // Root level field
          if (field in doc) {
            foundFields.push(field)
          }
        } else if (Array.isArray(field)) {
          // Nested field - navigate the path
          let current: any = doc
          let exists = true
          for (const key of field.slice(0, -1)) {
            if (current && typeof current === 'object' && key in current) {
              current = current[key]
            } else {
              exists = false
              break
            }
          }
          if (exists && current && typeof current === 'object' && field[field.length - 1] in current) {
            foundFields.push(field)
          }
        }
      }

      if (foundFields.length === 0) {
        console.log(`   ✅ ${doc._id}: Clean (no unknown fields)`)
        continue
      }

      console.log(`   🧹 ${doc._id}: Removing ${foundFields.length} unknown field(s):`)
      foundFields.forEach(field => {
        const fieldPath = Array.isArray(field) ? field.join('.') : field
        console.log(`      - ${fieldPath}`)
      })

      try {
        // Create unset patch for all unknown fields
        const patch = client.patch(doc._id)
        foundFields.forEach(field => {
          if (typeof field === 'string') {
            patch.unset([field])
          } else if (Array.isArray(field)) {
            patch.unset(field)
          }
        })

        await patch.commit()
        console.log(`   ✅ Successfully cleaned ${doc._id}\n`)
      } catch (error) {
        console.error(`   ❌ Error cleaning ${doc._id}:`, error)
      }
    }

    console.log('')
  }

  console.log('✅ Cleanup complete!\n')
}

// Run cleanup
cleanupUnknownFields()
  .then(() => {
    console.log('🎉 All unknown fields have been removed.')
    console.log('💡 Tip: Refresh Sanity Studio to see the changes.')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Fatal error:', error)
    process.exit(1)
  })
