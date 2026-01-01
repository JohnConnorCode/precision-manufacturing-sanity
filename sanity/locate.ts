import { DocumentLocationResolver } from 'sanity/presentation'
import { map } from 'rxjs'

// Enhanced locate function for Presentation Tool (Visual Editing)
// This enables editors to preview content in real-time as they edit
export const locate: DocumentLocationResolver = (params, context) => {
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

  // Services Overview Page
  if (params.type === 'servicesPage') {
    return {
      message: 'This is the services overview page',
      tone: 'positive',
      locations: [
        {
          title: 'Services Page',
          href: '/services',
        },
      ],
    }
  }

  // Individual Services - appear on services page and their own detail page
  if (params.type === 'service') {
    return context.documentStore.listenQuery(
      `*[_type == "service" && _id == $id][0]{ slug }`,
      { id: params.id },
      { perspective: 'drafts' }
    ).pipe(
      map((doc: any) => ({
        message: 'This service appears on the services page and has its own detail page',
        tone: 'positive' as const,
        locations: [
          {
            title: 'Services Overview',
            href: '/services',
          },
          ...(doc?.slug?.current ? [{
            title: 'Service Detail Page',
            href: `/services/${doc.slug.current}`,
          }] : []),
        ],
      }))
    )
  }

  // Industries Overview Page
  if (params.type === 'industriesPage') {
    return {
      message: 'This is the industries overview page',
      tone: 'positive',
      locations: [
        {
          title: 'Industries Page',
          href: '/industries',
        },
      ],
    }
  }

  // Individual Industries - appear on industries page and their own detail page
  if (params.type === 'industry') {
    return context.documentStore.listenQuery(
      `*[_type == "industry" && _id == $id][0]{ slug }`,
      { id: params.id },
      { perspective: 'drafts' }
    ).pipe(
      map((doc: any) => ({
        message: 'This industry appears on the industries page and has its own detail page',
        tone: 'positive' as const,
        locations: [
          {
            title: 'Industries Overview',
            href: '/industries',
          },
          ...(doc?.slug?.current ? [{
            title: 'Industry Detail Page',
            href: `/industries/${doc.slug.current}`,
          }] : []),
        ],
      }))
    )
  }

  // Resources (articles) - appear on resources page and their own detail page
  if (params.type === 'resource') {
    return context.documentStore.listenQuery(
      `*[_type == "resource" && _id == $id][0]{ slug, category }`,
      { id: params.id },
      { perspective: 'drafts' }
    ).pipe(
      map((doc: any) => ({
        message: 'This resource appears in the resources section',
        tone: 'positive' as const,
        locations: [
          {
            title: 'Resources Overview',
            href: '/resources',
          },
          ...(doc?.slug?.current ? [{
            title: 'Resource Detail Page',
            href: `/resources/${doc.category || 'manufacturing-processes'}/${doc.slug.current}`,
          }] : []),
        ],
      }))
    )
  }

  // Team Members - appear on about page
  if (params.type === 'teamMember') {
    return {
      message: 'This team member appears on the about page',
      tone: 'positive',
      locations: [
        {
          title: 'About Page (Team Section)',
          href: '/about',
        },
      ],
    }
  }

  // Job Postings - appear on careers page and their own detail page
  if (params.type === 'jobPosting') {
    return context.documentStore.listenQuery(
      `*[_type == "jobPosting" && _id == $id][0]{ slug }`,
      { id: params.id },
      { perspective: 'drafts' }
    ).pipe(
      map((doc: any) => ({
        message: 'This job posting appears on the careers page',
        tone: 'positive' as const,
        locations: [
          {
            title: 'Careers Page',
            href: '/careers',
          },
          ...(doc?.slug?.current ? [{
            title: 'Job Detail Page',
            href: `/careers/${doc.slug.current}`,
          }] : []),
        ],
      }))
    )
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
  const singletons: Record<string, { href: string; title: string }> = {
    about: { href: '/about', title: 'About Page' },
    contact: { href: '/contact', title: 'Contact Page' },
    careers: { href: '/careers', title: 'Careers Page' },
    terms: { href: '/compliance/terms', title: 'Terms & Conditions' },
    supplierRequirements: { href: '/compliance/supplier-requirements', title: 'Supplier Requirements' },
  }

  if (params.type in singletons) {
    const singleton = singletons[params.type]
    return {
      message: `This document is used on the ${singleton.title.toLowerCase()}`,
      tone: 'positive',
      locations: [
        {
          title: singleton.title,
          href: singleton.href,
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
