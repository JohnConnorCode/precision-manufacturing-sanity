// Simple Presentation locations mapping for on-page editing
// Maps documents to one or more frontend routes in the site

type Doc = {
  _type?: string
  slug?: { current?: string }
  category?: string
}

export function locate(params: { document: Doc }) {
  const doc = params?.document || {}
  const slug = doc.slug?.current
  const locations: Array<{ title: string; href: string }> = []

  switch (doc._type) {
    case 'page':
      if (slug) locations.push({ title: 'Page', href: `/${slug}` })
      break
    case 'homepage':
      locations.push({ title: 'Homepage', href: '/' })
      break
    case 'about':
      locations.push({ title: 'About page', href: '/about' })
      break
    case 'contact':
      locations.push({ title: 'Contact page', href: '/contact' })
      break
    case 'careers':
      locations.push({ title: 'Careers page', href: '/careers' })
      break
    case 'terms':
      locations.push({ title: 'Terms & Conditions', href: '/compliance/terms' })
      break
    case 'supplierRequirements':
      locations.push({ title: 'Supplier Requirements', href: '/compliance/supplier-requirements' })
      break
    case 'service':
      if (slug) {
        locations.push({ title: 'Service page', href: `/services/${slug}` })
      }
      locations.push({ title: 'Services index', href: '/services' })
      break
    case 'industry':
      if (slug) {
        locations.push({ title: 'Industry page', href: `/industries/${slug}` })
      }
      locations.push({ title: 'Industries index', href: '/industries' })
      break
    case 'resource':
      if (slug) {
        const category = doc.category || 'manufacturing-processes'
        locations.push({ title: 'Resource article', href: `/resources/${category}/${slug}` })
      }
      locations.push({ title: 'Resources index', href: '/resources' })
      break
    case 'navigation':
    case 'footer':
      locations.push({ title: 'Homepage', href: '/' })
      break
    default:
      break
  }

  return { locations }
}
