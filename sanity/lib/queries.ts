/**
 * GROQ queries for fetching content from Sanity
 * Documentation: https://www.sanity.io/docs/groq
 */

import { getClient } from './client'

// ============================================================================
// SERVICES
// ============================================================================

export async function getAllServices(preview = false) {
  try {
    const pub = preview ? '' : ' && published == true'
    const query = `*[_type == "service"${pub}] | order(order asc) {
      _id,
      title,
      slug,
      shortDescription,
      description,
      order,
      highlight,
      iconName,
      specs,
      image{
        asset->{url,_id},
        alt
      },
      hero{
        backgroundImage{asset->{url,_id}},
        badge, subtitle
      },
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

    return await getClient(preview).fetch(query)
  } catch (error) {
    console.warn('Failed to fetch services from Sanity:', error)
    return []
  }
}

export async function getServiceBySlug(slug: string, preview = false) {
  try {
    const pub = preview ? '' : ' && published == true'
    const query = `*[_type == "service" && slug.current == $slug${pub}][0] {
      _id,
      title,
      slug,
      shortDescription,
      description,
      order,
      highlight,
      image{asset->{url,_id}, alt},
      hero{
        backgroundImage{asset->{url,_id}},
        badge, subtitle
      },
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

    return await getClient(preview).fetch(query, { slug })
  } catch (error) {
    console.warn(`Failed to fetch service with slug "${slug}":`, error)
    return null
  }
}

// ============================================================================
// INDUSTRIES
// ============================================================================

export async function getAllIndustries(preview = false) {
  try {
    const pub = preview ? '' : ' && published == true'
    const query = `*[_type == "industry"${pub}] | order(order asc) {
      _id,
      title,
      slug,
      shortDescription,
      description,
      order,
      image{asset->{url,_id}, alt},
      features,
      hero{ backgroundImage{asset->{url,_id}}, badge, subtitle },
      overview,
      capabilities,
      regulatory,
      applications,
      components,
      qualityStandards,
      processBenefits,
      seo
    }`

    return await getClient(preview).fetch(query)
  } catch (error) {
    console.warn('Failed to fetch industries from Sanity:', error)
    return []
  }
}

export async function getIndustryBySlug(slug: string, preview = false) {
  try {
    const pub = preview ? '' : ' && published == true'
    const query = `*[_type == "industry" && slug.current == $slug${pub}][0] {
      _id,
      title,
      slug,
      shortDescription,
      description,
      order,
      image{asset->{url,_id}, alt},
      features,
      hero{ backgroundImage{asset->{url,_id}}, badge, subtitle },
      overview,
      capabilities,
      regulatory,
      applications,
      components,
      qualityStandards,
      processBenefits,
      seo
    }`

    return await getClient(preview).fetch(query, { slug })
  } catch (error) {
    console.warn(`Failed to fetch industry with slug "${slug}":`, error)
    return null
  }
}

// ============================================================================
// RESOURCES
// ============================================================================

export async function getAllResources(preview = false) {
  const pub = preview ? '' : ' && published == true'
  const query = `*[_type == "resource"${pub}] | order(publishDate desc) {
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

  return await getClient(preview).fetch(query)
}

export async function getResourceBySlug(slug: string, preview = false) {
  try {
  const pub = preview ? '' : ' && published == true'
  const query = `*[_type == "resource" && slug.current == $slug${pub}][0] {
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

  return await getClient(preview).fetch(query, { slug })
  } catch (error) {
    console.warn('Failed to fetch getResourceBySlug:', error)
    return null
  }
}

export async function getResourcesByCategory(category: string, preview = false) {
  try {
  const pub = preview ? '' : ' && published == true'
  const query = `*[_type == "resource" && category == $category${pub}] | order(publishDate desc) {
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

  return await getClient(preview).fetch(query, { category })
  } catch (error) {
    console.warn('Failed to fetch getResourcesByCategory:', error)
    return []
  }
}

export async function getFeaturedResources(preview = false) {
  try {
  const pub = preview ? '' : ' && published == true'
  const query = `*[_type == "resource" && featured == true${pub}] | order(publishDate desc) [0...6] {
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

  return await getClient(preview).fetch(query)
  } catch (error) {
    console.warn('Failed to fetch getFeaturedResources:', error)
    return null
  }
}

// ============================================================================
// TEAM MEMBERS
// ============================================================================

export async function getAllTeamMembers(preview = false) {
  try {
  const pub = preview ? '' : ' && published == true'
  const query = `*[_type == "teamMember"${pub}] | order(order asc) {
    _id,
    name,
    title,
    bio,
    photo,
    order,
    linkedin,
    email
  }`

  return await getClient(preview).fetch(query)
  } catch (error) {
    console.warn('Failed to fetch getAllTeamMembers:', error)
    return []
  }
}

// ============================================================================
// GLOBALS
// ============================================================================

export async function getSiteSettings(preview = false) {
  try {
  const query = `*[_type == "siteSettings"][0] {
    announcement,
    company,
    contact,
    social,
    seo
  }`

  return await getClient(preview).fetch(query)
  } catch (error) {
    console.warn('Failed to fetch getSiteSettings:', error)
    return null
  }
}

export async function getNavigation(preview = false) {
  try {
  const query = `*[_type == "navigation"][0] {
    topBar,
    styles,
    menuItems,
    cta
  }`

  return await getClient(preview).fetch(query)
  } catch (error) {
    console.warn('Failed to fetch getNavigation:', error)
    return null
  }
}

export async function getHomepage(preview = false) {
  try {
  const query = `*[_type == "homepage"][0] {
    hero,
    heroEnhanced {
      mainTitle,
      subtitle,
      tagline,
      badges,
      ctaPrimary,
      ctaSecondary,
      slides[] {
        imageUrl,
        imageAlt,
        image {
          asset->{
            _id,
            url
          },
          alt
        }
      }
    },
    stats,
    servicesSection,
    industriesSection,
    technicalSpecs,
    imageShowcase,
    resourcesSection,
    cta
  }`

  return await getClient(preview).fetch(query)
  } catch (error) {
    console.warn('Failed to fetch getHomepage:', error)
    return null
  }
}

export async function getFooter(preview = false) {
  try {
  const query = `*[_type == "footer"][0] {
    company,
    social,
    servicesLinks,
    resourcesLinks,
    quickLinks,
    contact,
    copyright
  }`

  return await getClient(preview).fetch(query)
  } catch (error) {
    console.warn('Failed to fetch getFooter:', error)
    return null
  }
}

export async function getAbout(preview = false) {
  try {
  const query = `*[_type == "about"][0] {
    hero{ backgroundImage{asset->{url,_id}}, badge, badgeIconName, title, titleHighlight, description, buttons },
    companyStats,
    story{ title, paragraph1, paragraph2, paragraph3, image{asset->{url,_id}, alt} },
    timeline,
    values,
    capabilities,
    certifications,
    cta
  }`

  return await getClient(preview).fetch(query)
  } catch (error) {
    console.warn('Failed to fetch getAbout:', error)
    return null
  }
}

export async function getContact(preview = false) {
  try {
  const query = `*[_type == "contact"][0] {
    hero{ backgroundImage{asset->{url,_id}}, badge, badgeIconName, title, titleHighlight, description, buttonLabel, buttonHref },
    contactInfo,
    certifications,
    bottomStats
  }`

  return await getClient(preview).fetch(query)
  } catch (error) {
    console.warn('Failed to fetch getContact:', error)
    return null
  }
}

export async function getCareers(preview = false) {
  try {
  const query = `*[_type == "careers"][0] {
    hero{ backgroundImage{asset->{url,_id}}, badge, badgeIconName, title, titleHighlight, description, buttons },
    whyWorkHere{ heading, paragraph1, paragraph2, paragraph3, image{asset->{url,_id}}, imageAlt },
    benefits{ heading, description, items },
    values{ heading, description, items },
    opportunities{ heading, description, positions },
    cta{ heading, description, buttons }
  }`

  return await getClient(preview).fetch(query)
  } catch (error) {
    console.warn('Failed to fetch getCareers:', error)
    return null
  }
}

export async function getTerms(preview = false) {
  try {
  const query = `*[_type == "terms"][0] {
    header,
    sections,
    contact
  }`

  return await getClient(preview).fetch(query)
  } catch (error) {
    console.warn('Failed to fetch getTerms:', error)
    return null
  }
}

export async function getSupplierRequirements(preview = false) {
  try {
  const query = `*[_type == "supplierRequirements"][0] {
    hero,
    sections,
    requirements,
    additionalSections,
    footerNote
  }`

  return await getClient(preview).fetch(query)
  } catch (error) {
    console.warn('Failed to fetch getSupplierRequirements:', error)
    return null
  }
}

export async function getUIText(preview = false) {
  try {
  const query = `*[_type == "uiText"][0] {
    buttons,
    headings
  }`

  return await getClient(preview).fetch(query)
  } catch (error) {
    console.warn('Failed to fetch getUIText:', error)
    return null
  }
}

export async function getPageContent(preview = false) {
  try {
  const query = `*[_type == "pageContent"][0] {
    capabilities,
    qualityAssurance,
    hero{
      backgroundImage{asset->{url,_id}},
      badge, title, subtitle, description, buttons
    },
    servicesPage{
      hero{
        backgroundImage{asset->{url,_id}},
        badge, title, subtitle, description, buttons
      },
      qualityIntro,
      qualityImage{asset->{url,_id}},
      qualityImageUrl,
      cta{heading, description, primaryButton, secondaryButton}
    },
    industriesPage{
      hero{ backgroundImage{asset->{url,_id}}, badge, title, subtitle, description, buttons },
      header{ title, description },
      cta{ heading, description, primaryButton, secondaryButton }
    },
    resourcesPage{
      hero{ backgroundImage{asset->{url,_id}}, badge, title, subtitle, description, buttons },
      header{ title, description, eyebrow }
    },
    sections
  }`

  return await getClient(preview).fetch(query)
  } catch (error) {
    console.warn('Failed to fetch getPageContent:', error)
    return null
  }
}

// ============================================================================
// PAGE BUILDER
// ============================================================================

export async function getPageBySlug(slug: string, preview = false) {
  try {
  const pub = preview ? '' : ' && published == true'
  const query = `*[_type == "page" && slug.current == $slug${pub}][0]{
    _id,
    title,
    slug,
    sections[],
    seo
  }`
  return await getClient(preview).fetch(query, { slug })
  } catch (error) {
    console.warn('Failed to fetch getPageBySlug:', error)
    return null
  }
}

export async function getAllPageSlugs(preview = false) {
  try {
  const pub = preview ? '' : ' && published == true'
  const query = `*[_type == "page"${pub}]{
    'slug': slug.current
  }`
  return await getClient(preview).fetch(query)
  } catch (error) {
    console.warn('Failed to fetch getAllPageSlugs:', error)
    return []
  }
}
