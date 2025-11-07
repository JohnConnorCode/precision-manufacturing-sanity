import { DocumentLocationsState } from 'sanity/presentation'

// Enhanced locate function for Presentation Tool (Visual Editing)
// This enables editors to preview content in real-time as they edit
export async function locate(
  params: { id: string; type: string },
  context: any
): Promise<DocumentLocationsState | null> {
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
    return {
      message: 'This service appears on the services page',
      tone: 'positive',
      locations: [
        {
          title: 'Services Overview',
          href: '/services',
        },
      ],
    }
  }

  // Industries
  if (params.type === 'industry') {
    return {
      message: 'This industry appears on the industries page',
      tone: 'positive',
      locations: [
        {
          title: 'Industries Overview',
          href: '/industries',
        },
      ],
    }
  }

  // Resources (articles)
  if (params.type === 'resource') {
    return {
      message: 'This resource appears in the resources section',
      tone: 'positive',
      locations: [
        {
          title: 'Resources Overview',
          href: '/resources',
        },
      ],
    }
  }

  // Custom Pages
  if (params.type === 'page') {
    return {
      message: 'This custom page is live on the website',
      tone: 'positive',
      locations: [
        {
          title: 'Homepage',
          href: '/',
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
