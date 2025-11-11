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
      seo {
        metaTitle,
        metaDescription,
        metaKeywords,
        ogImage{ asset->{url,_id}, alt }
      }
    }`

    return await getClient(preview).fetch(query)
  } catch (error) {
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
      seo {
        metaTitle,
        metaDescription,
        metaKeywords,
        ogImage{ asset->{url,_id}, alt }
      }
    }`

    return await getClient(preview).fetch(query, { slug })
  } catch (error) {
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
      iconName,
      image{asset->{url,_id}, alt},
      imageUrl,
      features,
      hero{ backgroundImage{asset->{url,_id}}, badge, subtitle },
      overview,
      capabilities,
      regulatory,
      applications,
      components,
      qualityStandards,
      processBenefits,
      seo {
        metaTitle,
        metaDescription,
        metaKeywords,
        ogImage{ asset->{url,_id}, alt }
      }
    }`

    return await getClient(preview).fetch(query)
  } catch (error) {
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
      iconName,
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
      seo {
        metaTitle,
        metaDescription,
        metaKeywords,
        ogImage{ asset->{url,_id}, alt }
      }
    }`

    return await getClient(preview).fetch(query, { slug })
  } catch (error) {
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
    theme,
    logo {
      logoType,
      customLogo {
        asset->{
          url,
          _id
        },
        alt
      },
      svgColor,
      showCompanyText,
      enableAnimation
    },
    company,
    contact,
    social,
    seo
  }`

  return await getClient(preview).fetch(query)
  } catch (error) {
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
    return null
  }
}

export async function getHomepage(preview = false) {
  try {
  const query = `*[_type == "homepage"][0] {
    hero {
      backgroundGradient,
      headingTextColor,
      taglineTextColor,
      heroVerticalPadding,
      word1,
      word2,
      word3,
      heroFontSize,
      tagline,
      badges,
      ctaPrimary,
      ctaSecondary,
      ctaTertiary,
      slides[] {
        image {
          asset->{
            _id,
            url
          },
          alt,
          caption
        }
      }
    },
    stats,
    servicesSection,
    industriesSection,
    technicalSpecs,
    imageShowcase,
    resourcesSection {
      header {
        badge,
        title,
        description
      },
      backgroundColor,
      titleColor,
      badgeColor,
      featuredSeries[] {
        _key,
        title,
        slug,
        description,
        articleCount,
        readTime,
        difficulty,
        level,
        icon,
        gradient
      },
      benefits[] {
        _key,
        enabled,
        iconName,
        title,
        description
      },
      cta {
        title,
        description,
        buttons[] {
          _key,
          enabled,
          text,
          href,
          variant
        }
      }
    },
    cta
  }`

  return await getClient(preview).fetch(query)
  } catch (error) {
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
    leadership,
    cta,
    seo
  }`

  return await getClient(preview).fetch(query)
  } catch (error) {
    return null
  }
}

export async function getContact(preview = false) {
  try {
  const query = `*[_type == "contact"][0] {
    hero{ backgroundImage{asset->{url,_id}}, badge, badgeIconName, title, titleHighlight, description, buttonLabel, buttonHref },
    contactInfo,
    certifications,
    bottomStats,
    seo
  }`

  return await getClient(preview).fetch(query)
  } catch (error) {
    return null
  }
}

export async function getCareers(preview = false) {
  try {
  const query = `*[_type == "careers"][0] {
    hero{
      backgroundImage{asset->{url,_id}, alt},
      backgroundImageUrl,
      imageAlt,
      badge,
      badgeIconName,
      title,
      titleHighlight,
      description,
      buttons
    },
    whyWorkHere{
      heading,
      paragraph1,
      paragraph2,
      paragraph3,
      image{asset->{url,_id}, alt},
      imageUrl,
      imageAlt
    },
    benefits{
      title,
      description,
      items[]{ title, description, iconName }
    },
    values{
      title,
      description,
      items[]{ title, description, iconName }
    },
    opportunities{
      title,
      description,
      jobs[]{ title, department, type, description, qualifications, link, location }
    },
    cta{
      title,
      description,
      buttons[]{ label, href, variant }
    },
    seo
  }`

  return await getClient(preview).fetch(query)
  } catch (error) {
    return null
  }
}

export async function getTerms(preview = false) {
  try {
  const query = `*[_type == "terms"][0] {
    header{
      title,
      subtitle,
      effectiveDate,
      version
    },
    sections[]{
      _key,
      icon,
      title,
      content
    },
    contact{
      heading,
      description,
      email,
      phone,
      department
    },
    seo{
      metaTitle,
      metaDescription,
      ogImage{asset->{url,_id}, alt}
    }
  }`

  return await getClient(preview).fetch(query)
  } catch (error) {
    return null
  }
}

export async function getSupplierRequirements(preview = false) {
  try {
  const query = `*[_type == "supplierRequirements"][0] {
    hero{
      backgroundImage{asset->{url,_id}, alt},
      badges[]{_key, iconName, text},
      title,
      titleHighlight,
      description,
      versionStatus,
      effectiveDate,
      reviewPeriod
    },
    sections[]{
      _key,
      id,
      number,
      title,
      iconName,
      content,
      color
    },
    requirements[]{
      _key,
      number,
      title,
      iconName,
      content,
      additional,
      list[]{_key, item}
    },
    additionalSections[]{
      _key,
      number,
      title,
      iconName,
      content,
      list[]{_key, item}
    },
    footerNote{
      iconName,
      heading,
      content
    },
    seo{
      metaTitle,
      metaDescription,
      ogImage{asset->{url,_id}, alt}
    }
  }`

  return await getClient(preview).fetch(query)
  } catch (error) {
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
    return null
  }
}

/**
 * Fetch the Services Page singleton with all content and SEO
 */
export async function getServicesPage(preview = false) {
  try {
    const query = `*[_type == "servicesPage"][0]{
      _id,
      hero{
        badge,
        heading,
        description,
        backgroundImage{
          asset->{url, _id},
          alt,
          hotspot
        },
        buttons[]{
          _key,
          label,
          href,
          variant
        }
      },
      content{
        sectionTitle,
        sectionDescription,
        capabilities[]{
          _key,
          label,
          value,
          description
        },
        services[]{
          _key,
          title,
          description
        },
        qualityAssurance[]{
          _key,
          title
        }
      },
      cta{
        heading,
        description,
        buttons[]{
          _key,
          label,
          href,
          variant
        }
      },
      seo{
        metaTitle,
        metaDescription,
        ogImage{
          asset->{url, _id},
          alt
        },
        keywords[]
      }
    }`
    return await getClient(preview).fetch(query)
  } catch (error) {
    return null
  }
}

/**
 * Fetch the Industries Page singleton with all content and SEO
 */
export async function getIndustriesPage(preview = false) {
  try {
    const query = `*[_type == "industriesPage"][0]{
      _id,
      hero{
        badge,
        heading,
        headingHighlight,
        subheading,
        backgroundImage{
          asset->{url, _id},
          alt,
          hotspot
        },
        buttons[]{
          _key,
          label,
          href,
          variant
        }
      },
      content{
        overviewTitle,
        overviewStats[]{
          _key,
          value,
          label
        },
        industriesSection{
          title,
          description
        },
        industries[]{
          _key,
          name,
          description,
          image{
            asset->{url, _id},
            alt
          },
          applications[],
          stats[]{
            _key,
            label,
            value
          },
          certifications[],
          expertise[],
          icon
        },
        whyChooseSection{
          title,
          description
        },
        whyChooseUs[]{
          _key,
          icon,
          title,
          description,
          features[]
        },
        resultsSection{
          title,
          description
        },
        provenResults[]{
          _key,
          metric,
          value,
          description
        }
      },
      cta{
        heading,
        description,
        primaryButton{
          label,
          href
        },
        secondaryButton{
          label,
          href
        }
      },
      seo{
        metaTitle,
        metaDescription,
        ogImage{
          asset->{url, _id},
          alt
        },
        keywords[]
      }
    }`
    return await getClient(preview).fetch(query)
  } catch (error) {
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
    return []
  }
}

// Job Postings
export async function getAllJobPostings(preview = false) {
  try {
  const pub = preview ? '' : ' && published == true'
  const query = `*[_type == "jobPosting"${pub}] | order(featured desc, order asc, postedDate desc) {
    _id,
    title,
    'slug': slug.current,
    department,
    type,
    location,
    shortDescription,
    description,
    responsibilities,
    qualifications,
    preferredQualifications,
    benefits,
    salaryRange,
    applicationLink,
    applicationInstructions,
    published,
    featured,
    postedDate,
    closingDate
  }`
  return await getClient(preview).fetch(query)
  } catch (error) {
    return []
  }
}

export async function getJobPostingBySlug(slug: string, preview = false) {
  try {
  const pub = preview ? '' : ' && published == true'
  const query = `*[_type == "jobPosting" && slug.current == $slug${pub}][0] {
    _id,
    title,
    'slug': slug.current,
    department,
    type,
    location,
    shortDescription,
    description,
    responsibilities,
    qualifications,
    preferredQualifications,
    benefits,
    salaryRange,
    applicationLink,
    applicationInstructions,
    published,
    featured,
    postedDate,
    closingDate
  }`
  return await getClient(preview).fetch(query, { slug })
  } catch (error) {
    return null
  }
}
