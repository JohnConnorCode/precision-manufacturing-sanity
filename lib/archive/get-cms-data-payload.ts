/**
 * Payload CMS Local API Access (POC)
 *
 * This file demonstrates the correct pattern for accessing Payload CMS data
 * using the Local API instead of direct MongoDB queries.
 *
 * Benefits:
 * - ✅ Validation and data integrity
 * - ✅ Access control enforcement
 * - ✅ Hooks and middleware execution
 * - ✅ Type safety with generated types
 * - ✅ Follows Payload best practices
 *
 * Draft Mode:
 * - draft=false (default): Returns only published content
 * - draft=true: Returns all content including drafts
 *
 * Usage:
 * ```ts
 * import { draftMode } from 'next/headers'
 * const { isEnabled } = await draftMode()
 * const data = await getServicesFromCMS(isEnabled)
 * ```
 */
import { getPayloadHMR } from '@payloadcms/next/utilities';
import configPromise from '@/payload.config';
import { lexicalToText } from './lexical-to-text';

// Icon name mapping for services and industries (reused from original)
const iconNameMap: Record<string, string> = {
  '5-axis-machining': 'Cog',
  'adaptive-machining': 'Cpu',
  'metrology': 'Gauge',
  'engineering': 'Users',
  'defense': 'Shield',
  'energy': 'Zap',
  'aerospace': 'Plane',
};

// Fallback images (reused from original)
const fallbackImages: Record<string, string> = {
  '5-axis-machining': 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=90',
  'adaptive-machining': 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=90',
  'metrology': 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=90',
  'engineering': 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=90',
  'defense': 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122',
  'energy': 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e',
  'aerospace': 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1',
};

/**
 * Build Payload where clause for draft mode filtering
 */
function buildDraftFilter(draft: boolean) {
  if (draft) {
    // Return all content including drafts
    return {};
  }
  // Only return published content
  return {
    _status: {
      in: ['published']
    }
  };
}

/**
 * POC: Get services using Payload Local API
 *
 * This demonstrates the migration from direct MongoDB access to Payload API.
 */
export async function getServicesFromCMS(draft = false) {
  try {
    const payload = await getPayloadHMR({ config: configPromise });

    const result = await payload.find({
      collection: 'services',
      where: buildDraftFilter(draft) as any,
      sort: 'order',
      limit: 1000,
      depth: 1,
      draft
    });

    console.log('[Payload API] ✓ Fetched', result.docs.length, 'services');

    if (!result.docs || result.docs.length === 0) {
      console.warn('[Payload API] No services found, using fallback');
      return getFallbackServices();
    }

    return result.docs.map((service: any) => ({
      title: service.title,
      description: service.shortDescription || lexicalToText(service.description),
      iconName: iconNameMap[service.slug] || 'Cog',
      href: `/services/${service.slug}`,
      specs: service.specs || [],
      image: fallbackImages[service.slug] || fallbackImages['adaptive-machining'],
      highlight: service.slug === '5-axis-machining',
    }));

  } catch (error) {
    console.error('[Payload API] Error fetching services:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
    // Return fallback data to prevent blank pages
    return getFallbackServices();
  }
}

/**
 * POC: Get industries using Payload Local API
 */
export async function getIndustriesFromCMS(draft = false) {
  try {
    const payload = await getPayloadHMR({ config: configPromise });

    const result = await payload.find({
      collection: 'industries',
      where: buildDraftFilter(draft) as any,
      sort: 'order',
      limit: 1000,
      depth: 1,
      draft
    });

    console.log('[Payload API] ✓ Fetched', result.docs.length, 'industries');

    if (!result.docs || result.docs.length === 0) {
      console.warn('[Payload API] No industries found, using fallback');
      return getFallbackIndustries();
    }

    return result.docs.map((industry: any) => ({
      title: industry.title,
      description: lexicalToText(industry.description),
      iconName: iconNameMap[industry.slug] || 'Factory',
      href: `/industries/${industry.slug}`,
      image: fallbackImages[industry.slug] || fallbackImages['aerospace'],
      features: industry.features || [],
    }));

  } catch (error) {
    console.error('[Payload API] Error fetching industries:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
    return getFallbackIndustries();
  }
}

/**
 * POC: Get single service by slug using Payload Local API
 */
export async function getServiceBySlugFromCMS(slug: string, draft = false) {
  try {
    const payload = await getPayloadHMR({ config: configPromise });

    const result = await payload.find({
      collection: 'services',
      where: {
        ...buildDraftFilter(draft) as any,
        slug: {
          equals: slug
        }
      },
      limit: 1,
      depth: 2,
      draft
    });

    console.log('[Payload API] ✓ Fetched service:', slug);

    return result.docs[0] || null;

  } catch (error) {
    console.error('[Payload API] Error fetching service by slug:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
    return null;
  }
}

// Fallback data for graceful degradation
function getFallbackServices() {
  return [
    {
      title: "5-Axis Machining",
      description: "Advanced multi-axis CNC capabilities for complex aerospace and defense components",
      iconName: "Cog",
      href: "/services/5-axis-machining",
      specs: [],
      image: fallbackImages['5-axis-machining'],
      highlight: true
    },
    {
      title: "Adaptive Machining",
      description: "Intelligent material removal strategies for optimal efficiency",
      iconName: "Cpu",
      href: "/services/adaptive-machining",
      specs: [],
      image: fallbackImages['adaptive-machining'],
      highlight: false
    },
    {
      title: "Metrology Services",
      description: "Comprehensive measurement and inspection services",
      iconName: "Gauge",
      href: "/services/metrology",
      specs: [],
      image: fallbackImages['metrology'],
      highlight: false
    },
    {
      title: "Engineering Services",
      description: "Design, analysis, and optimization expertise",
      iconName: "Users",
      href: "/services/engineering",
      specs: [],
      image: fallbackImages['engineering'],
      highlight: false
    }
  ];
}

function getFallbackIndustries() {
  return [
    {
      title: "Aerospace",
      description: "Precision manufacturing for aerospace applications",
      iconName: "Plane",
      href: "/industries/aerospace",
      image: fallbackImages['aerospace'],
      features: []
    },
    {
      title: "Defense",
      description: "Advanced manufacturing for defense systems",
      iconName: "Shield",
      href: "/industries/defense",
      image: fallbackImages['defense'],
      features: []
    },
    {
      title: "Energy",
      description: "Manufacturing solutions for the energy sector",
      iconName: "Zap",
      href: "/industries/energy",
      image: fallbackImages['energy'],
      features: []
    }
  ];
}
