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
        origin: typeof window === 'undefined'
          ? (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000')
          : window.location.origin,
        draftMode: {
          enable: '/api/draft',
          disable: '/api/disable-draft',
        },
      },
      locate,
      mainDocuments: [
        { id: 'homepage', type: 'homepage', title: 'Homepage' },
        { id: 'about', type: 'about', title: 'About Page' },
        { id: 'contact', type: 'contact', title: 'Contact Page' },
        { id: 'careers', type: 'careers', title: 'Careers Page' },
      ],
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
