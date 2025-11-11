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
      resolve: {
        mainDocuments: async (prev, context) => {
          // Fetch collections in parallel
          const [services, industries, resources, teamMembers, jobPostings] = await Promise.all([
            context.documentStore.listenQuery('*[_type == "service"] | order(order asc) [0...10]', {}, { perspective: 'drafts' }),
            context.documentStore.listenQuery('*[_type == "industry"] | order(order asc) [0...10]', {}, { perspective: 'drafts' }),
            context.documentStore.listenQuery('*[_type == "resource"] | order(_createdAt desc) [0...10]', {}, { perspective: 'drafts' }),
            context.documentStore.listenQuery('*[_type == "teamMember"] | order(order asc) [0...10]', {}, { perspective: 'drafts' }),
            context.documentStore.listenQuery('*[_type == "jobPosting"] | order(_createdAt desc) [0...10]', {}, { perspective: 'drafts' }),
          ])

          return [
            // Main Pages (Singletons)
            {
              id: 'homepage',
              title: 'Homepage',
              schemaType: 'homepage',
            },
            {
              id: 'about',
              title: 'About Page',
              schemaType: 'about',
            },
            {
              id: 'contact',
              title: 'Contact Page',
              schemaType: 'contact',
            },
            {
              id: 'careers',
              title: 'Careers Page',
              schemaType: 'careers',
            },
            {
              id: 'servicesPage',
              title: 'Services Overview Page',
              schemaType: 'servicesPage',
            },
            {
              id: 'industriesPage',
              title: 'Industries Overview Page',
              schemaType: 'industriesPage',
            },
            {
              id: 'terms',
              title: 'Terms & Conditions',
              schemaType: 'terms',
            },
            {
              id: 'supplierRequirements',
              title: 'Supplier Requirements',
              schemaType: 'supplierRequirements',
            },
            // Collection pages - services
            ...services.map((doc: any) => ({
              id: doc._id,
              title: `Service: ${doc.title || 'Untitled'}`,
              schemaType: 'service',
            })),
            // Collection pages - industries
            ...industries.map((doc: any) => ({
              id: doc._id,
              title: `Industry: ${doc.title || 'Untitled'}`,
              schemaType: 'industry',
            })),
            // Collection pages - resources
            ...resources.map((doc: any) => ({
              id: doc._id,
              title: `Resource: ${doc.title || 'Untitled'}`,
              schemaType: 'resource',
            })),
            // Collection pages - team members
            ...teamMembers.map((doc: any) => ({
              id: doc._id,
              title: `Team: ${doc.title || doc.name || 'Untitled'}`,
              schemaType: 'teamMember',
            })),
            // Collection pages - job postings
            ...jobPostings.map((doc: any) => ({
              id: doc._id,
              title: `Job: ${doc.title || 'Untitled'}`,
              schemaType: 'jobPosting',
            })),
          ]
        },
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
