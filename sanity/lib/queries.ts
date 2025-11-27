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
    const query = `*[_type == "service" && !(_id in path("drafts.**"))${pub}] | order(order asc) {
      _id,
      title,
      slug,
      shortDescription,
      description,
      order,
      highlight,
      icon,
      specs,
      cardCtaText,
      image{
        asset->{url,_id},
        alt
      },
      imageUrl,
      hero{
        backgroundImage{asset->{url,_id}, alt},
        badge,
        title,
        subtitle,
        descriptionRich,
        titleSize,
        descriptionSize,
        buttons[]{
          text,
          href,
          variant,
          enabled
        }
      },
      overview{
        description,
        descriptionRich
      },
      capabilities,
      services[]{
        title,
        description,
        descriptionRich,
        featuresLabel,
        capabilitiesLabel,
        iconName,
        image{asset->{url,_id}, alt, caption},
        imageUrl,
        bullets,
        features,
        capabilities
      },
      servicesHeading,
      servicesDescription,
      servicesDescriptionRich,
      applicationsHeading,
      applicationsDescription,
      applicationsListLabel,
      applications[] {
        title,
        description,
        timeline,
        listLabel,
        challenges,
        image{asset->{url,_id}, alt, caption},
        imageUrl
      },
      technicalSpecs,
      process,
      equipment,
      materials,
      processes,
      cta,
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
    const query = `*[_type == "service" && slug.current == $slug && !(_id in path("drafts.**"))${pub}][0] {
      _id,
      title,
      slug,
      shortDescription,
      description,
      order,
      highlight,
      image{asset->{url,_id}, alt},
      imageUrl,
      hero{
        backgroundImage{asset->{url,_id}, alt},
        badge,
        title,
        subtitle,
        descriptionRich,
        titleSize,
        descriptionSize,
        buttons[]{
          text,
          href,
          variant,
          enabled
        }
      },
      overview{
        description,
        descriptionRich
      },
      capabilities,
      services[]{
        title,
        description,
        descriptionRich,
        featuresLabel,
        capabilitiesLabel,
        iconName,
        image{asset->{url,_id}, alt, caption},
        imageUrl,
        bullets,
        features,
        capabilities
      },
      servicesHeading,
      servicesDescription,
      servicesDescriptionRich,
      applicationsHeading,
      applicationsDescription,
      applicationsListLabel,
      applications[] {
        title,
        description,
        timeline,
        listLabel,
        challenges,
        image{asset->{url,_id}, alt, caption},
        imageUrl
      },
      technicalSpecs,
      process,
      equipment,
      materialsHeading,
      materialsDescription,
      materials,
      qualityStandardsHeading,
      qualityStandardsDescription,
      qualityStandards[]{
        title,
        description,
        iconName
      },
      qualityImage{
        image{asset->{url,_id}, alt},
        imageUrl,
        alt
      },
      processHeading,
      processDescription,
      processes,
      cta,
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
    const query = `*[_type == "industry" && !(_id in path("drafts.**"))${pub}] | order(order asc) {
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
      hero{
        backgroundImage{asset->{url,_id}, alt},
        backgroundImageUrl,
        badge,
        subtitle,
        descriptionRich,
        titleSize,
        descriptionSize,
        buttons[]{
          text,
          href,
          variant,
          enabled
        }
      },
      statistics,
      overview,
      capabilities,
      regulatory,
      applications,
      components{
        category,
        description,
        image{asset->{url,_id}, alt},
        imageUrl,
        parts,
        materials,
        requirements
      },
      qualityStandards,
      processBenefits,
      cta{
        heading,
        description,
        buttons[]{text, href, variant, enabled}
      },
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
    const query = `*[_type == "industry" && slug.current == $slug && !(_id in path("drafts.**"))${pub}][0] {
      _id,
      title,
      slug,
      shortDescription,
      description,
      order,
      iconName,
      image{asset->{url,_id}, alt},
      features,
      hero{
        backgroundImage{asset->{url,_id}, alt},
        backgroundImageUrl,
        badge,
        title,
        titleHighlight,
        subtitle,
        description,
        descriptionRich,
        titleSize,
        descriptionSize,
        buttons[]{
          text,
          href,
          variant,
          enabled
        }
      },
      stats,
      statistics,
      overview,
      marketOverview,
      expertise,
      expertiseSectionHeading,
      expertiseSectionDescription,
      capabilities,
      certifications,
      certificationsSectionHeading,
      certificationsSectionDescription,
      regulatory,
      applications,
      components{
        category,
        description,
        image{asset->{url,_id}, alt},
        imageUrl,
        parts,
        materials,
        requirements
      },
      qualityStandards,
      processBenefits,
      processBenefitsSectionHeading,
      processBenefitsSectionDescription,
      cta{
        heading,
        description,
        buttons[]{text, href, variant, enabled}
      },
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
  const query = `*[_type == "resource" && !(_id in path("drafts.**"))${pub}] | order(publishDate desc) {
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
    featuredImage{
      asset->{url, _id},
      alt,
      caption,
      attribution
    },
    tags,
    seo
  }`

  return await getClient(preview).fetch(query)
}

export async function getResourceBySlug(slug: string, preview = false) {
  try {
  const pub = preview ? '' : ' && published == true'
  const query = `*[_type == "resource" && slug.current == $slug && !(_id in path("drafts.**"))${pub}][0] {
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
    featuredImage{
      asset->{url, _id},
      alt,
      caption,
      attribution
    },
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
  const query = `*[_type == "resource" && category == $category && !(_id in path("drafts.**"))${pub}] | order(publishDate desc) {
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
  const query = `*[_type == "resource" && featured == true && !(_id in path("drafts.**"))${pub}] | order(publishDate desc) [0...6] {
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
    featuredImage{asset->{url, _id}, alt, caption}
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
    photo{
      asset->{url, _id},
      alt
    },
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
      enabled,
      backgroundGradient,
      headingTextColor,
      taglineTextColor,
      heroVerticalPadding,
      word1,
      word2,
      word3,
      heroFontSize,
      tagline,
      badges[] {
        _key,
        text,
        enabled
      },
      ctaPrimary,
      ctaSecondary,
      ctaTertiary,
      slides[] {
        _key,
        enabled,
        focal,
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
    stats {
      enabled,
      title,
      subtitle,
      backgroundColor,
      titleTextColor,
      subtitleTextColor,
      items[] {
        _key,
        enabled,
        value,
        label,
        description
      }
    },
    servicesSection {
      enabled,
      eyebrow,
      headingWord1,
      headingWord2,
      heading,
      description,
      subdescription,
      header {
        eyebrow,
        heading,
        headingWord1,
        headingWord2,
        description
      },
      cta {
        enabled,
        text,
        href,
        variant
      }
    },
    industriesSection {
      enabled,
      eyebrow,
      heading,
      description,
      subdescription,
      header {
        eyebrow,
        title,
        titleHighlight,
        description
      }
    },
    technicalSpecs {
      enabled,
      title,
      subtitle,
      specs[] {
        _key,
        enabled,
        label,
        value,
        description,
        iconName,
        gradient
      }
    },
    imageShowcase {
      enabled,
      header {
        eyebrow,
        title,
        titleHighlight,
        description
      },
      backgroundColor,
      titleColor,
      highlightColor,
      showcaseImages[] {
        _key,
        enabled,
        title,
        category,
        href,
        src,
        alt,
        image {
          asset->{url},
          alt
        }
      },
      stats[] {
        _key,
        enabled,
        iconName,
        value,
        label
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
    operationalExcellence {
      enabled,
      heading,
      description,
      benefits[] {
        _key,
        enabled,
        iconName,
        title,
        description
      }
    },
    resourcesSection {
      enabled,
      header {
        badge,
        title,
        description
      },
      backgroundColor,
      titleColor,
      badgeColor,
      additionalSeriesText,
      featuredSeries[] {
        _key,
        enabled,
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
    cta {
      enabled,
      title,
      subtitle,
      badge,
      certifications[] {
        _key,
        enabled,
        icon,
        text
      },
      trustMessage,
      buttons[] {
        text,
        href,
        variant,
        enabled
      }
    }
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
    hero{
      backgroundImage{asset->{url,_id}, alt},
      backgroundImageUrl,
      badge,
      badgeIconName,
      title,
      titleHighlight,
      description,
      buttons[]{
        _key,
        label,
        href,
        variant,
        enabled
      }
    },
    companyStats[]{
      _key,
      label,
      value,
      description,
      enabled
    },
    story{
      title,
      paragraph1,
      paragraph2,
      paragraph3,
      image{asset->{url,_id}, alt},
      imageUrl
    },
    timeline{
      title,
      description,
      milestones[]{
        _key,
        year,
        title,
        description,
        enabled
      }
    },
    values{
      title,
      description,
      items[]{
        _key,
        title,
        description,
        iconName,
        bullets,
        enabled
      }
    },
    capabilities[]{
      _key,
      title,
      description,
      items,
      enabled
    },
    certifications[]{
      _key,
      certification,
      enabled
    },
    leadership{
      title,
      description,
      team[]{
        _key,
        enabled,
        photo{asset->{url,_id}, alt},
        photoUrl,
        name,
        title,
        experience,
        background,
        focus
      }
    },
    cta{
      title,
      description,
      buttons[]{
        _key,
        label,
        href,
        variant,
        enabled
      }
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

export async function getContact(preview = false) {
  try {
  const query = `*[_type == "contact"][0] {
    hero{ backgroundImage{asset->{url,_id}}, badge, badgeIconName, title, titleHighlight, description, buttonLabel, buttonHref },
    contactInfo,
    certifications,
    bottomStats,
    locationImage{asset->{url, _id}, alt},
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
      buttons[]{
        _key,
        label,
        href,
        variant,
        enabled
      }
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
      items[]{
        _key,
        title,
        description,
        iconName,
        enabled
      }
    },
    values{
      title,
      description,
      items[]{
        _key,
        title,
        description,
        iconName,
        enabled
      }
    },
    opportunities{
      title,
      description
    },
    cta{
      title,
      description,
      buttons[]{
        _key,
        label,
        href,
        variant,
        enabled
      }
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
        backgroundImageUrl,
        badge, title, subtitle, description, buttons
      },
      qualityIntro,
      qualityImage{asset->{url,_id}},
      qualityImageUrl,
      cta{heading, description, primaryButton, secondaryButton}
    },
    industriesPage{
      hero{ backgroundImage{asset->{url,_id}}, backgroundImageUrl, badge, title, subtitle, description, buttons },
      header{ title, description },
      cta{ heading, description, primaryButton, secondaryButton }
    },
    resourcesPage{
      hero{ backgroundImage{asset->{url,_id}}, backgroundImageUrl, badge, title, subtitle, description, descriptionRich, titleSize, descriptionSize, buttons[]{ _key, label, href, variant, enabled } },
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
        backgroundImageUrl,
        buttons[]{
          _key,
          label,
          href,
          variant,
          enabled
        }
      },
      content{
        sectionTitle,
        sectionDescription,
        capabilities[]{
          _key,
          label,
          value,
          description,
          enabled
        },
        services[]{
          _key,
          title,
          description,
          enabled
        },
        qualityAssurance[]{
          _key,
          title,
          enabled
        }
      },
      cta{
        heading,
        description,
        buttons[]{
          _key,
          label,
          href,
          variant,
          enabled
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
        backgroundImageUrl,
        buttons[]{
          _key,
          label,
          href,
          variant,
          enabled
        }
      },
      content{
        overviewTitle,
        overviewStats[]{
          _key,
          value,
          label,
          description,
          enabled
        },
        industriesSection{
          title,
          description
        },
        industries[]{
          _key,
          name,
          slug,
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
          icon,
          cardCtaText,
          enabled
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
          features[],
          enabled
        },
        resultsSection{
          title,
          description
        },
        provenResults[]{
          _key,
          metric,
          value,
          description,
          enabled
        }
      },
      cta{
        heading,
        description,
        primaryButton{
          label,
          href,
          enabled
        },
        secondaryButton{
          label,
          href,
          enabled
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
  const query = `*[_type == "jobPosting"${pub}] | order(featured desc, order asc, datePosted desc) {
    _id,
    title,
    'slug': slug.current,
    department,
    employmentType,
    location,
    shortDescription,
    overview,
    responsibilities,
    qualifications,
    preferredQualifications,
    benefits,
    salaryRange,
    applicationEmail,
    applicationInstructions,
    published,
    featured,
    datePosted,
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
    employmentType,
    location,
    shortDescription,
    overview,
    responsibilities,
    qualifications,
    preferredQualifications,
    benefits,
    salaryRange,
    applicationEmail,
    applicationInstructions,
    published,
    featured,
    datePosted,
    closingDate
  }`
  return await getClient(preview).fetch(query, { slug })
  } catch (error) {
    return null
  }
}

// Get Metbase page content
export async function getMetbase(preview = false) {
  try {
    const query = `*[_type == "metbase"][0] {
      hero{
        backgroundImage{asset->{url,_id}, alt},
        badge,
        badgeIconName,
        title,
        titleHighlight,
        subtitle,
        description,
        buttons[]{
          _key,
          label,
          href,
          variant,
          enabled
        }
      },
      overview{
        title,
        description,
        highlights[]{
          _key,
          enabled,
          text,
          iconName
        }
      },
      features{
        title,
        description,
        items[]{
          _key,
          enabled,
          title,
          description,
          iconName
        }
      },
      analysisTool{
        title,
        description,
        image{asset->{url,_id}, alt, caption},
        capabilities[]{
          _key,
          enabled,
          text
        }
      },
      systemIntegration{
        title,
        description,
        image{asset->{url,_id}, alt, caption},
        benefits[]{
          _key,
          enabled,
          title,
          description,
          iconName
        }
      },
      closedLoop{
        title,
        description,
        image{asset->{url,_id}, alt, caption}
      },
      cta{
        title,
        description,
        buttons[]{
          _key,
          label,
          href,
          variant,
          enabled
        }
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

// Get error pages content
export async function getErrorPages(preview = false) {
  try {
    const query = `*[_type == "errorPages"][0] {
      notFound {
        heading,
        description,
        popularLinksHeading,
        popularLinks[] {
          label,
          href
        },
        errorCode
      },
      globalError {
        heading,
        description,
        tryAgainButtonText,
        supportMessagePrefix,
        supportLinkText
      }
    }`

    return await getClient(preview).fetch(query)
  } catch (error) {
    return null
  }
}
