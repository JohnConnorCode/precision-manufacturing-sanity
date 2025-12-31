/**
 * Sanity Types Index
 *
 * Central export point for all Sanity-related types.
 *
 * Usage:
 * import type { ServiceCard, HomepageQueryResult, SanityImage } from '@/sanity/types'
 *
 * Note: We use explicit exports to avoid conflicts between auto-generated
 * schema types (sanity.types.ts) and query result types (query.types.ts).
 */

// Auto-generated types from schema (run `npm run typegen` to update)
// These represent raw Sanity document shapes
export * from './sanity.types'

// Query result types (manually maintained)
// These represent GROQ projection results
// Only export types that don't conflict with auto-generated types
export type {
  // Common types (unique to query.types)
  SanityImage,
  SanitySlug,
  SEO,
  CTAButton,
  PortableTextBlock,

  // Service types
  ServiceCard,
  ServiceDetail,

  // Industry types
  IndustryCard,
  IndustryDetail,

  // Resource types
  ResourceCard,
  ResourceDetail,

  // Renamed query result types (avoid conflicts)
  TeamMemberQueryResult,
  JobPostingQueryResult,
  HomepageHero,
  HomepageLogos,
  HomepageStats,
  HomepageQueryResult,
  SiteContact,
  SiteSocial,
  SiteSettingsQueryResult,
  NavigationQueryResult,
  FooterColumn,
  FooterQueryResult,
  ContactPage,
  CareersPage,
  AboutPage,
  PageSection,
  GenericPage,
} from './query.types'
