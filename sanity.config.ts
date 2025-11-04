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
import { presentationTool } from '@sanity/presentation'
import { locate } from './sanity/presentation'

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
      },
      locate,
    } as any),
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
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
        const doc: any = document
        const slug = doc?.slug?.current
        if (!doc) return prev
        switch (doc?._type) {
          case 'service':
            return slug ? `${baseUrl}/services/${slug}` : baseUrl
          case 'industry':
            return slug ? `${baseUrl}/industries/${slug}` : baseUrl
          case 'resource':
            return slug ? `${baseUrl}/resources/${doc?.category}/${slug}` : `${baseUrl}/resources`
          case 'homepage':
            return baseUrl
          case 'about':
            return `${baseUrl}/about`
          case 'contact':
            return `${baseUrl}/contact`
          case 'careers':
            return `${baseUrl}/careers`
          case 'terms':
            return `${baseUrl}/compliance/terms`
          case 'supplierRequirements':
            return `${baseUrl}/compliance/supplier-requirements`
          default:
            return prev
        }
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
