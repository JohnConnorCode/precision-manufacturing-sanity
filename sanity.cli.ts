import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  },
  studioHost: 'iis-precision-manufacturing',
  /**
   * TypeGen configuration for generating TypeScript types from Sanity schemas.
   * Run: npm run typegen
   * @see https://www.sanity.io/docs/sanity-typegen
   */
  typegen: {
    generates: './sanity/types/sanity.types.ts',
  },
})
