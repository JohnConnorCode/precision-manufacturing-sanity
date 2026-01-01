'use client'

import { usePathname } from 'next/navigation'
import { Edit3 } from 'lucide-react'

/**
 * Route Configuration
 * Maps frontend routes to Payload admin URLs
 */
const GLOBAL_ROUTES: Record<string, string> = {
  '/': 'homepage',
  '/about': 'about',
  '/contact': 'contact',
  '/careers': 'careers',
  '/compliance/terms': 'terms',
  '/compliance/supplier-requirements': 'supplier-requirements',
}

/**
 * AdminEditButton - Client Component
 *
 * Floating action button that links to Payload admin panel
 * for editing the current page.
 *
 * Auto-detects:
 * - Global pages (homepage, about, contact, etc.)
 * - Collection documents (services, industries, resources)
 * - Nested routes (resources with category)
 */
export function AdminEditButton() {
  const pathname = usePathname()

  // Don't show on admin pages
  if (!pathname || pathname.startsWith('/admin')) {
    return null
  }

  const adminUrl = getAdminUrl(pathname)

  return (
    <a
      href={adminUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-blue-600 text-tone-inverse px-4 py-3 rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-200 group"
      title="Edit this page in Payload admin"
      aria-label="Edit this page in Payload admin"
    >
      <Edit3 className="w-5 h-5" />
      <span className="text-sm font-medium hidden sm:inline">Edit Page</span>
    </a>
  )
}

/**
 * Determines the correct Payload admin URL for the current route
 */
function getAdminUrl(pathname: string): string {
  const baseUrl = '/admin'

  // Check for exact global page match
  const globalSlug = GLOBAL_ROUTES[pathname]
  if (globalSlug) {
    return `${baseUrl}/globals/${globalSlug}`
  }

  // Parse dynamic routes
  const segments = pathname.split('/').filter(Boolean)

  // Services: /services/[slug]
  if (segments[0] === 'services' && segments[1]) {
    return `${baseUrl}/collections/services?where[slug][equals]=${segments[1]}`
  }

  // Industries: /industries/[slug]
  if (segments[0] === 'industries' && segments[1]) {
    return `${baseUrl}/collections/industries?where[slug][equals]=${segments[1]}`
  }

  // Resources: /resources/[category]/[slug]
  if (segments[0] === 'resources') {
    if (segments[2]) {
      // Detail page: /resources/category/slug
      return `${baseUrl}/collections/resources?where[slug][equals]=${segments[2]}`
    }
    if (segments[1]) {
      // Category page - no specific edit target, go to resources collection
      return `${baseUrl}/collections/resources`
    }
    // Resources index
    return `${baseUrl}/collections/resources`
  }

  // Default: admin dashboard
  return baseUrl
}
