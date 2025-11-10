import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'
import { schemaTypes } from './sanity/schemas'
import { structure } from './sanity/structure'
import { resolveDocumentActions } from './sanity/actions'
import { resolveBadges } from './sanity/badges'
import { previewPane } from './sanity/plugins/previewPane'
import { assetManager } from './sanity/plugins/assetManager'
import { contentRelationships } from './sanity/plugins/contentRelationships'
import { collaboration } from './sanity/plugins/collaboration'
import { analytics } from './sanity/plugins/analytics'
import { presentationTool } from 'sanity/presentation'
import { locate } from './sanity/locate'

export default defineConfig({
  name: 'default',
  title: 'IIS Precision Manufacturing',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  basePath: '/studio',

  plugins: [
    presentationTool({
      previewUrl: {
        origin: process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
        preview: (doc) => {
          // Map document types to their preview URLs
          const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

          // Singleton pages
          if (doc._type === 'homepage') return `${baseUrl}/`
          if (doc._type === 'about') return `${baseUrl}/about`
          if (doc._type === 'contact') return `${baseUrl}/contact`
          if (doc._type === 'careers') return `${baseUrl}/careers`
          if (doc._type === 'terms') return `${baseUrl}/compliance/terms`
          if (doc._type === 'supplierRequirements') return `${baseUrl}/compliance/supplier-requirements`

          // Collection pages with slugs
          if (doc._type === 'service' && doc.slug?.current) {
            return `${baseUrl}/services/${doc.slug.current}`
          }
          if (doc._type === 'industry' && doc.slug?.current) {
            return `${baseUrl}/industries/${doc.slug.current}`
          }
          if (doc._type === 'resource' && doc.slug?.current && doc.category) {
            return `${baseUrl}/resources/${doc.category}/${doc.slug.current}`
          }

          // Default to homepage
          return `${baseUrl}/`
        },
        draftMode: {
          enable: '/api/draft',
        },
      },
      resolve: {
        locations: locate as any,
      },
    }),
    structureTool({
      structure,
    }),
    visionTool(),
    media(),
    previewPane(),
    assetManager(),
    contentRelationships(),
    collaboration(),
    analytics(),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    actions: resolveDocumentActions,
    badges: resolveBadges,
  },
})
