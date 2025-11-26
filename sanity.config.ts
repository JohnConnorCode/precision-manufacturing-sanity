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
import StudioLogo from './sanity/components/StudioLogo'

/**
 * Get the preview URL origin based on environment.
 * Works for both local development and production deployment.
 *
 * Priority:
 * 1. NEXT_PUBLIC_SITE_URL (explicit override)
 * 2. VERCEL_URL (Vercel production/preview deployments)
 * 3. Fallback to localhost for local development
 */
function getPreviewOrigin(): string {
  // Explicit site URL takes priority (set in Vercel env vars for production)
  if (process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL !== 'http://localhost:3000') {
    return process.env.NEXT_PUBLIC_SITE_URL
  }
  // Vercel deployments (production and preview)
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  // Local development fallback
  return 'http://localhost:3000'
}

// Define singleton document types (v3 best practice)
const singletonTypes = new Set([
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
])

// Define allowed actions for singleton documents
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

export default defineConfig({
  name: 'default',
  title: 'IIS Precision Manufacturing',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  basePath: '/studio',

  // Custom branding for IIS Precision Manufacturing
  studio: {
    components: {
      logo: StudioLogo,
    },
  },

  plugins: [
    presentationTool({
      previewUrl: {
        origin: getPreviewOrigin(),
        draftMode: {
          enable: '/api/draft',
        },
      },
      resolve: {
        locations: locate,
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
    // Filter out singleton types from the global "New document" menu
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    // For singleton types, filter out actions that are not explicitly included
    // Custom actions are preserved via resolveDocumentActions
    actions: (input, context) => {
      const isSingleton = singletonTypes.has(context.schemaType)

      // Apply custom actions first
      const withCustomActions = resolveDocumentActions(input, context)

      // Then filter for singletons
      return isSingleton
        ? withCustomActions.filter(({ action }) => action && singletonActions.has(action))
        : withCustomActions
    },
    badges: resolveBadges,
  },
})
