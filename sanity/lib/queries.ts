/**
 * GROQ queries for fetching content from Sanity
 * Documentation: https://www.sanity.io/docs/groq
 */

import { client } from './client'

// ============================================================================
// SERVICES
// ============================================================================

export async function getAllServices() {
  const query = `*[_type == "service"] | order(order asc) {
    _id,
    title,
    slug,
    shortDescription,
    description,
    order,
    highlight,
    iconName,
    specs,
    image,
    hero,
    overview,
    capabilities,
    services,
    technicalSpecs,
    process,
    equipment,
    materials,
    processes,
    seo
  }`

  return await client.fetch(query)
}

export async function getServiceBySlug(slug: string) {
  const query = `*[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    shortDescription,
    description,
    order,
    highlight,
    image,
    hero,
    overview,
    capabilities,
    services,
    technicalSpecs,
    process,
    equipment,
    materials,
    processes,
    seo
  }`

  return await client.fetch(query, { slug })
}

// ============================================================================
// INDUSTRIES
// ============================================================================

export async function getAllIndustries() {
  const query = `*[_type == "industry"] | order(order asc) {
    _id,
    title,
    slug,
    shortDescription,
    description,
    order,
    image,
    features,
    hero,
    overview,
    capabilities,
    regulatory,
    applications,
    components,
    qualityStandards,
    processBenefits,
    seo
  }`

  return await client.fetch(query)
}

export async function getIndustryBySlug(slug: string) {
  const query = `*[_type == "industry" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    shortDescription,
    description,
    order,
    image,
    features,
    hero,
    overview,
    capabilities,
    regulatory,
    applications,
    components,
    qualityStandards,
    processBenefits,
    seo
  }`

  return await client.fetch(query, { slug })
}

// ============================================================================
// RESOURCES
// ============================================================================

export async function getAllResources() {
  const query = `*[_type == "resource"] | order(publishDate desc) {
    _id,
    title,
    slug,
    excerpt,
    content,
    category,
    difficulty,
    readTime,
    publishDate,
    author,
    featured,
    tags,
    seo
  }`

  return await client.fetch(query)
}

export async function getResourceBySlug(slug: string) {
  const query = `*[_type == "resource" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    category,
    difficulty,
    readTime,
    publishDate,
    author,
    featured,
    tags,
    seo
  }`

  return await client.fetch(query, { slug })
}

export async function getResourcesByCategory(category: string) {
  const query = `*[_type == "resource" && category == $category] | order(publishDate desc) {
    _id,
    title,
    slug,
    excerpt,
    category,
    difficulty,
    readTime,
    publishDate,
    author,
    featured,
    tags
  }`

  return await client.fetch(query, { category })
}

export async function getFeaturedResources() {
  const query = `*[_type == "resource" && featured == true] | order(publishDate desc) [0...6] {
    _id,
    title,
    slug,
    excerpt,
    category,
    difficulty,
    readTime,
    publishDate,
    author,
    featured
  }`

  return await client.fetch(query)
}

// ============================================================================
// TEAM MEMBERS
// ============================================================================

export async function getAllTeamMembers() {
  const query = `*[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    title,
    bio,
    photo,
    order,
    linkedin,
    email
  }`

  return await client.fetch(query)
}

// ============================================================================
// GLOBALS
// ============================================================================

export async function getSiteSettings() {
  const query = `*[_type == "siteSettings"][0] {
    companyName,
    tagline,
    description,
    contactEmail,
    contactPhone,
    address,
    socialMedia,
    defaultSEO
  }`

  return await client.fetch(query)
}

export async function getNavigation() {
  const query = `*[_type == "navigation"][0] {
    topBar,
    menuItems,
    cta
  }`

  return await client.fetch(query)
}

export async function getHomepage() {
  const query = `*[_type == "homepage"][0] {
    hero,
    stats,
    servicesSection,
    industriesSection,
    technicalSpecs,
    imageShowcase,
    resourcesSection,
    cta
  }`

  return await client.fetch(query)
}

export async function getFooter() {
  const query = `*[_type == "footer"][0] {
    companyDescription,
    socialLinks,
    footerLinks,
    contactInfo,
    copyright
  }`

  return await client.fetch(query)
}

export async function getAbout() {
  const query = `*[_type == "about"][0] {
    hero,
    companyStats,
    story,
    timeline,
    values,
    capabilities,
    certifications,
    cta
  }`

  return await client.fetch(query)
}

export async function getContact() {
  const query = `*[_type == "contact"][0] {
    hero,
    contactInfo,
    certifications,
    bottomStats
  }`

  return await client.fetch(query)
}

export async function getCareers() {
  const query = `*[_type == "careers"][0] {
    hero,
    whyWorkHere,
    benefits,
    values,
    opportunities,
    cta
  }`

  return await client.fetch(query)
}

export async function getTerms() {
  const query = `*[_type == "terms"][0] {
    header,
    sections,
    contact
  }`

  return await client.fetch(query)
}

export async function getSupplierRequirements() {
  const query = `*[_type == "supplierRequirements"][0] {
    hero,
    sections,
    requirements,
    additionalSections,
    footerNote
  }`

  return await client.fetch(query)
}

export async function getUIText() {
  const query = `*[_type == "uiText"][0] {
    buttons,
    headings
  }`

  return await client.fetch(query)
}

export async function getPageContent() {
  const query = `*[_type == "pageContent"][0] {
    capabilities,
    qualityAssurance,
    hero,
    sections
  }`

  return await client.fetch(query)
}
