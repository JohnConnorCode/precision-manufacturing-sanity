import { DocumentLocation, DocumentLocationsState } from 'sanity/presentation'

// Enhanced locate function for Presentation Tool (Visual Editing)
// This enables editors to preview content in real-time as they edit
export function locate(
  params: { id: string; type: string },
  context: any
): DocumentLocation | DocumentLocationsState | null {
  // Homepage
  if (params.type === 'homepage') {
    return {
      message: 'This document is used on the homepage',
      tone: 'positive',
      locations: [
        {
          title: 'Homepage',
          href: '/',
        },
      ],
    }
  }

  // Services
  if (params.type === 'service') {
    const doc = context.getDocument(params.id)
    const slug = doc?.slug?.current
    if (!slug) {
      return {
        message: 'Add a slug to preview this service',
        tone: 'caution',
      }
    }
    return {
      message: 'This service is published on the services page',
      tone: 'positive',
      locations: [
        {
          title: 'Service Page',
          href: `/services/${slug}`,
        },
        {
          title: 'Services Overview',
          href: '/services',
        },
      ],
    }
  }

  // Industries
  if (params.type === 'industry') {
    const doc = context.getDocument(params.id)
    const slug = doc?.slug?.current
    if (!slug) {
      return {
        message: 'Add a slug to preview this industry',
        tone: 'caution',
      }
    }
    return {
      message: 'This industry is published on the industries page',
      tone: 'positive',
      locations: [
        {
          title: 'Industry Page',
          href: `/industries/${slug}`,
        },
        {
          title: 'Industries Overview',
          href: '/industries',
        },
      ],
    }
  }

  // Resources (articles)
  if (params.type === 'resource') {
    const doc = context.getDocument(params.id)
    const slug = doc?.slug?.current
    const category = doc?.category
    if (!slug || !category) {
      return {
        message: 'Add a slug and category to preview this resource',
        tone: 'caution',
      }
    }
    return {
      message: 'This resource is published in the resources section',
      tone: 'positive',
      locations: [
        {
          title: 'Resource Page',
          href: `/resources/${category}/${slug}`,
        },
        {
          title: 'Resources Overview',
          href: '/resources',
        },
      ],
    }
  }

  // Custom Pages
  if (params.type === 'page') {
    const doc = context.getDocument(params.id)
    const slug = doc?.slug?.current
    if (!slug) {
      return {
        message: 'Add a slug to preview this page',
        tone: 'caution',
      }
    }
    return {
      message: 'This custom page is live on the website',
      tone: 'positive',
      locations: [
        {
          title: 'Custom Page',
          href: `/${slug}`,
        },
      ],
    }
  }

  // Singleton pages
  const singletons: Record<string, string> = {
    about: '/about',
    contact: '/contact',
    careers: '/careers',
    terms: '/compliance/terms',
    supplierRequirements: '/compliance/supplier-requirements',
  }

  if (params.type in singletons) {
    return {
      message: `This document is used on the ${params.type} page`,
      tone: 'positive',
      locations: [
        {
          title: params.type.charAt(0).toUpperCase() + params.type.slice(1),
          href: singletons[params.type],
        },
      ],
    }
  }

  // Site configuration (navigation, footer, etc.)
  if (['navigation', 'footer', 'siteSettings'].includes(params.type)) {
    return {
      message: 'This configuration is used across the entire site',
      tone: 'positive',
      locations: [
        {
          title: 'All Pages',
          href: '/',
        },
      ],
    }
  }

  return null
}
