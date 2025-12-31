/**
 * GROQ Query Fragments
 *
 * Reusable query fragments to ensure consistency and reduce duplication.
 * Import these fragments and interpolate them into your queries.
 *
 * @example
 * import { imageFragment, seoFragment } from './fragments'
 *
 * const query = `*[_type == "service"] {
 *   title,
 *   image { ${imageFragment} },
 *   seo { ${seoFragment} }
 * }`
 */

/**
 * Standard image fragment with asset URL and alt text.
 */
export const imageFragment = `
  asset->{ url, _id },
  alt,
  hotspot,
  crop
`

/**
 * Minimal image fragment (just URL and alt).
 */
export const imageMinimalFragment = `
  asset->{ url },
  alt
`

/**
 * Background image fragment with full metadata.
 */
export const backgroundImageFragment = `
  asset->{ url, _id, metadata { lqip, blurhash, dimensions } },
  alt,
  hotspot,
  crop
`

/**
 * SEO fields fragment.
 */
export const seoFragment = `
  metaTitle,
  metaDescription,
  ogImage { ${imageFragment} }
`

/**
 * CTA Button fragment.
 */
export const ctaButtonFragment = `
  enabled,
  label,
  href,
  variant
`

/**
 * Buttons array fragment.
 */
export const buttonsFragment = `
  enabled,
  label,
  href,
  variant,
  text
`

/**
 * Slug fragment.
 */
export const slugFragment = `
  current
`

/**
 * Hero section fragment (common across pages).
 */
export const heroFragment = `
  enabled,
  badge,
  badgeIconName,
  title,
  titleHighlight,
  subtitle,
  description,
  descriptionRich,
  backgroundImage { ${backgroundImageFragment} },
  backgroundImageUrl,
  buttons[] { ${buttonsFragment} }
`

/**
 * Contact info fragment.
 */
export const contactInfoFragment = `
  heading,
  description,
  addressLine1,
  addressLine2,
  addressLine3,
  phone,
  phoneLink,
  phoneDescription,
  email,
  emailDescription,
  hoursLine1,
  hoursLine2,
  submitButtonText,
  consultationHeading
`

/**
 * Team member fragment.
 */
export const teamMemberFragment = `
  _id,
  name,
  role,
  bio,
  image { ${imageFragment} },
  order,
  published
`

/**
 * Resource card fragment (for listings).
 */
export const resourceCardFragment = `
  _id,
  title,
  slug { ${slugFragment} },
  excerpt,
  category,
  difficulty,
  readTime,
  publishDate,
  featuredImage { ${imageFragment} },
  featured,
  published
`

/**
 * Service card fragment (for listings).
 */
export const serviceCardFragment = `
  _id,
  title,
  slug { ${slugFragment} },
  shortDescription,
  iconName,
  image { ${imageFragment} },
  highlight,
  order,
  published
`

/**
 * Industry card fragment (for listings).
 */
export const industryCardFragment = `
  _id,
  title,
  slug { ${slugFragment} },
  shortDescription,
  iconName,
  image { ${imageFragment} },
  highlight,
  order,
  published
`

/**
 * Job posting fragment.
 */
export const jobPostingFragment = `
  _id,
  title,
  slug { ${slugFragment} },
  department,
  location,
  employmentType,
  salaryRange,
  shortDescription,
  featured,
  published,
  order
`

/**
 * Site settings fragment.
 */
export const siteSettingsFragment = `
  siteName,
  tagline,
  contact {
    address,
    addressLine2,
    city,
    state,
    zip,
    phone,
    email
  },
  social {
    linkedin,
    twitter,
    facebook
  },
  defaultSeo { ${seoFragment} }
`

/**
 * Navigation item fragment.
 */
export const navItemFragment = `
  _key,
  label,
  href,
  enabled,
  highlight
`

/**
 * Navigation group fragment.
 */
export const navGroupFragment = `
  _key,
  label,
  enabled,
  items[] { ${navItemFragment} }
`

/**
 * Footer fragment.
 */
export const footerFragment = `
  columns[] {
    title,
    links[] {
      label,
      href,
      enabled
    }
  },
  bottomLinks[] {
    label,
    href,
    enabled
  },
  copyright,
  certifications[] {
    name,
    enabled
  }
`
