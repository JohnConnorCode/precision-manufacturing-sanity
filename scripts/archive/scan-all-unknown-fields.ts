/**
 * Comprehensive Unknown Fields Scanner
 *
 * Scans ALL document types in Sanity and reports fields that exist in
 * documents but are not defined in schemas (orphaned/unknown fields).
 *
 * This helps identify schema drift across the entire CMS.
 *
 * Usage: npx tsx scripts/scan-all-unknown-fields.ts
 * Usage: npx tsx scripts/scan-all-unknown-fields.ts --fix  (to remove them)
 */

import { config } from 'dotenv'
import { resolve } from 'path'
import { createClient } from 'next-sanity'
import { schemaTypes } from '../sanity/schemas'

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

const FIX_MODE = process.argv.includes('--fix')

// Build schema field map for validation
function buildSchemaFieldMap() {
  const fieldMap: Record<string, Set<string>> = {}

  for (const schema of schemaTypes) {
    if (schema.type === 'document' && schema.fields) {
      const typeName = schema.name
      fieldMap[typeName] = new Set()

      // Add all top-level field names
      for (const field of schema.fields) {
        if (field.name) {
          fieldMap[typeName].add(field.name)
        }
      }

      // System fields are always valid
      fieldMap[typeName].add('_id')
      fieldMap[typeName].add('_type')
      fieldMap[typeName].add('_createdAt')
      fieldMap[typeName].add('_updatedAt')
      fieldMap[typeName].add('_rev')
    }
  }

  return fieldMap
}

// Recursively find unknown fields in nested objects
function findUnknownFieldsRecursive(
  obj: any,
  schemaFields: Set<string>,
  path: string[] = []
): string[][] {
  const unknownFields: string[][] = []

  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    return unknownFields
  }

  for (const key of Object.keys(obj)) {
    const currentPath = [...path, key]

    // Check if this field is unknown at root level
    if (path.length === 0 && !schemaFields.has(key)) {
      unknownFields.push(currentPath)
    }

    // Recursively check nested objects
    if (obj[key] && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      const nestedUnknown = findUnknownFieldsRecursive(obj[key], schemaFields, currentPath)
      unknownFields.push(...nestedUnknown)
    }
  }

  return unknownFields
}

async function scanAllDocuments() {
  console.log('🔍 Building schema field map...\n')
  const schemaFieldMap = buildSchemaFieldMap()

  console.log(`📋 Found ${Object.keys(schemaFieldMap).length} document types in schema\n`)

  let totalUnknownFields = 0
  let totalDocumentsAffected = 0
  const issuesByType: Record<string, number> = {}

  for (const [docType, validFields] of Object.entries(schemaFieldMap)) {
    console.log(`📄 Scanning ${docType} documents...`)

    try {
      // Query all documents of this type (including drafts)
      const documents = await client.fetch(
        `*[_type == $docType || _type == "drafts." + $docType]`,
        { docType }
      )

      if (!documents || documents.length === 0) {
        console.log(`   ℹ️  No documents found\n`)
        continue
      }

      let typeUnknownCount = 0
      let typeDocsAffected = 0

      for (const doc of documents) {
        const unknownFields = findUnknownFieldsRecursive(doc, validFields)

        if (unknownFields.length > 0) {
          typeDocsAffected++
          typeUnknownCount += unknownFields.length

          console.log(`   ⚠️  ${doc._id}: Found ${unknownFields.length} unknown field(s):`)
          unknownFields.forEach(fieldPath => {
            console.log(`      - ${fieldPath.join('.')}`)
          })

          if (FIX_MODE) {
            try {
              const patch = client.patch(doc._id)
              unknownFields.forEach(fieldPath => {
                patch.unset(fieldPath)
              })
              await patch.commit()
              console.log(`   ✅ Cleaned ${doc._id}`)
            } catch (error) {
              console.error(`   ❌ Error cleaning ${doc._id}:`, error)
            }
          }

          console.log('')
        }
      }

      if (typeDocsAffected > 0) {
        issuesByType[docType] = typeUnknownCount
        totalUnknownFields += typeUnknownCount
        totalDocumentsAffected += typeDocsAffected
        console.log(`   📊 Summary: ${typeDocsAffected} document(s) with ${typeUnknownCount} unknown field(s)\n`)
      } else {
        console.log(`   ✅ All ${documents.length} document(s) clean\n`)
      }
    } catch (error) {
      console.error(`   ❌ Error scanning ${docType}:`, error)
      console.log('')
    }
  }

  // Final summary
  console.log('=' .repeat(60))
  console.log('📊 SCAN COMPLETE\n')

  if (totalUnknownFields === 0) {
    console.log('🎉 No unknown fields found! Schema is perfectly in sync.')
  } else {
    console.log(`⚠️  Found ${totalUnknownFields} unknown field(s) across ${totalDocumentsAffected} document(s)\n`)
    console.log('Breakdown by document type:')
    for (const [docType, count] of Object.entries(issuesByType)) {
      console.log(`   ${docType}: ${count} unknown field(s)`)
    }

    if (FIX_MODE) {
      console.log('\n✅ All unknown fields have been removed!')
    } else {
      console.log('\n💡 To remove these fields, run:')
      console.log('   npx tsx scripts/scan-all-unknown-fields.ts --fix')
    }
  }

  console.log('=' .repeat(60))
}

// Run scanner
scanAllDocuments()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Fatal error:', error)
    process.exit(1)
  })
