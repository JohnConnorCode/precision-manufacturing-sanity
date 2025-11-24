/**
 * Comprehensive Sanity CMS Audit Script
 *
 * Checks all schemas for best practices and completeness:
 * - Validation rules
 * - Preview configurations
 * - Image hotspot settings
 * - Alt text requirements
 * - Visibility toggles
 * - Descriptions
 * - Initial values
 * - And more...
 *
 * Usage: npx tsx scripts/audit-sanity-setup.ts
 */

import { schemaTypes } from '../sanity/schemas'

interface AuditIssue {
  severity: 'error' | 'warning' | 'info'
  type: string
  field?: string
  message: string
}

const issues: AuditIssue[] = []

function addIssue(severity: AuditIssue['severity'], type: string, message: string, field?: string) {
  issues.push({ severity, type, field, message })
}

// Check if a field has validation
function hasValidation(field: any): boolean {
  return field.validation !== undefined
}

// Check if image has hotspot
function hasHotspot(field: any): boolean {
  return field.options?.hotspot === true
}

// Check if image has alt text field
function hasAltTextField(field: any): boolean {
  if (field.type === 'image' && field.fields) {
    return field.fields.some((f: any) => f.name === 'alt')
  }
  return false
}

// Check if array has visibility toggle
function hasVisibilityToggle(arrayItem: any): boolean {
  if (arrayItem.fields) {
    return arrayItem.fields.some((f: any) => f.name === 'enabled' || f.name === 'published')
  }
  return false
}

// Recursively audit fields
function auditFields(fields: any[], schemaName: string, parentPath: string = '') {
  for (const field of fields) {
    const fieldPath = parentPath ? `${parentPath}.${field.name}` : field.name

    // Check image fields
    if (field.type === 'image') {
      if (!hasHotspot(field)) {
        addIssue('warning', schemaName, `Image field missing hotspot: ${fieldPath}`, fieldPath)
      }

      if (!hasAltTextField(field)) {
        addIssue('error', schemaName, `Image field missing alt text field: ${fieldPath}`, fieldPath)
      }
    }

    // Check slug fields
    if (field.type === 'slug') {
      if (!field.options?.source) {
        addIssue('warning', schemaName, `Slug field missing source option: ${fieldPath}`, fieldPath)
      }

      if (!hasValidation(field)) {
        addIssue('warning', schemaName, `Slug field should have required validation: ${fieldPath}`, fieldPath)
      }
    }

    // Check required fields without validation
    if (field.name === 'title' || field.name === 'name') {
      if (!hasValidation(field)) {
        addIssue('warning', schemaName, `Important field missing validation: ${fieldPath}`, fieldPath)
      }
    }

    // Check array fields
    if (field.type === 'array' && field.of) {
      for (const arrayItem of field.of) {
        // Check if buttons/items arrays have visibility toggles
        if (field.name === 'buttons' || field.name === 'items' || field.name === 'benefits') {
          if (arrayItem.type === 'object' && !hasVisibilityToggle(arrayItem)) {
            addIssue('info', schemaName, `Array item could benefit from visibility toggle: ${fieldPath}`, fieldPath)
          }
        }

        // Recursively check nested fields
        if (arrayItem.fields) {
          auditFields(arrayItem.fields, schemaName, fieldPath)
        }
      }
    }

    // Check object fields
    if (field.type === 'object' && field.fields) {
      auditFields(field.fields, schemaName, fieldPath)
    }

    // Check for missing descriptions on complex fields
    if (!field.description && (field.type === 'array' || field.type === 'object')) {
      addIssue('info', schemaName, `Complex field could benefit from description: ${fieldPath}`, fieldPath)
    }
  }
}

// Audit document schemas
function auditDocuments() {
  console.log('🔍 Auditing Sanity schemas for best practices...\n')

  for (const schema of schemaTypes) {
    if (schema.type === 'document') {
      const schemaName = schema.name

      // Check for preview configuration
      if (!(schema as any).preview) {
        addIssue('warning', schemaName, 'Document missing preview configuration')
      }

      // Check for title field
      const hasTitle = schema.fields?.some((f: any) => f.name === 'title' || f.name === 'name')
      if (!hasTitle && !(schema as any).__experimental_singleton) {
        addIssue('warning', schemaName, 'Document has no title/name field')
      }

      // Check for slug on non-singleton pages
      const hasSlug = schema.fields?.some((f: any) => f.type === 'slug')
      if (!hasSlug && !(schema as any).__experimental_singleton && schemaName !== 'teamMember' && schemaName !== 'jobPosting') {
        addIssue('info', schemaName, 'Document may need slug field for URL routing')
      }

      // Check collection documents for published field
      if (!(schema as any).__experimental_singleton && ['service', 'industry', 'resource', 'teamMember'].includes(schemaName)) {
        const hasPublished = schema.fields?.some((f: any) => f.name === 'published')
        if (!hasPublished) {
          addIssue('warning', schemaName, 'Collection document missing "published" visibility toggle')
        }
      }

      // Check for ordering options on collections
      if (!(schema as any).__experimental_singleton && !(schema as any).orderings) {
        addIssue('info', schemaName, 'Collection document missing orderings configuration')
      }

      // Audit all fields
      if (schema.fields) {
        auditFields(schema.fields, schemaName)
      }
    }
  }
}

// Generate report
function generateReport() {
  console.log('=' .repeat(70))
  console.log('📊 SANITY CMS AUDIT REPORT\n')

  const errors = issues.filter(i => i.severity === 'error')
  const warnings = issues.filter(i => i.severity === 'warning')
  const infos = issues.filter(i => i.severity === 'info')

  if (issues.length === 0) {
    console.log('🎉 Perfect! No issues found. Sanity CMS is fully optimized.\n')
  } else {
    console.log(`Found ${issues.length} issue(s):\n`)
    console.log(`  ❌ Errors: ${errors.length}`)
    console.log(`  ⚠️  Warnings: ${warnings.length}`)
    console.log(`  ℹ️  Info: ${infos.length}\n`)

    // Group by document type
    const byType: Record<string, AuditIssue[]> = {}
    for (const issue of issues) {
      if (!byType[issue.type]) {
        byType[issue.type] = []
      }
      byType[issue.type].push(issue)
    }

    // Display by document type
    for (const [type, typeIssues] of Object.entries(byType)) {
      console.log(`\n📄 ${type}:`)

      // Errors first
      const typeErrors = typeIssues.filter(i => i.severity === 'error')
      if (typeErrors.length > 0) {
        console.log('  ❌ Errors:')
        typeErrors.forEach(issue => {
          console.log(`     - ${issue.message}`)
        })
      }

      // Then warnings
      const typeWarnings = typeIssues.filter(i => i.severity === 'warning')
      if (typeWarnings.length > 0) {
        console.log('  ⚠️  Warnings:')
        typeWarnings.forEach(issue => {
          console.log(`     - ${issue.message}`)
        })
      }

      // Then info
      const typeInfos = typeIssues.filter(i => i.severity === 'info')
      if (typeInfos.length > 0) {
        console.log('  ℹ️  Suggestions:')
        typeInfos.forEach(issue => {
          console.log(`     - ${issue.message}`)
        })
      }
    }
  }

  console.log('\n' + '=' .repeat(70))
}

// Run audit
auditDocuments()
generateReport()
