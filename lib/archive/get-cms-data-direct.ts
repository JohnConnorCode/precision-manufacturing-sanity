/**
 * Direct MongoDB Access for Payload CMS Data
 *
 * Provides optimized data fetching with draft mode support.
 *
 * Draft Mode:
 * - draft=false (default): Returns only published content (_status: 'published')
 * - draft=true: Returns all content including drafts
 *
 * Usage with Next.js draftMode():
 * ```ts
 * import { draftMode } from 'next/headers'
 * const { isEnabled } = await draftMode()
 * const data = await getServicesFromCMS(isEnabled)
 * ```
 */
import { MongoClient, Db } from 'mongodb';
import { lexicalToText } from './lexical-to-text';

const DB_NAME = 'precision-manufacturing';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

// In-memory cache with TTL for instant subsequent requests
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cache = new Map<string, CacheEntry<any>>();
const CACHE_TTL = 60000; // 60 seconds (matches ISR revalidate time)

function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;

  const age = Date.now() - entry.timestamp;
  if (age > CACHE_TTL) {
    cache.delete(key);
    return null;
  }

  return entry.data;
}

function setCache<T>(key: string, data: T): void {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
}

async function getDatabase(): Promise<Db> {
  if (cachedDb) {
    return cachedDb;
  }

  if (!cachedClient) {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI environment variable is required');
    }
    cachedClient = new MongoClient(uri, {
      serverSelectionTimeoutMS: 5000, // Reduced from 30s
      socketTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });
    await cachedClient.connect();
  }

  cachedDb = cachedClient.db(DB_NAME);
  return cachedDb;
}

// Icon name mapping for services and industries
const iconNameMap: Record<string, string> = {
  '5-axis-machining': 'Cog',
  'adaptive-machining': 'Cpu',
  'metrology': 'Gauge',
  'engineering': 'Users',
  'defense': 'Shield',
  'energy': 'Zap',
  'aerospace': 'Plane',
};

export async function getServicesFromCMS(draft = false) {
  // Check cache first (skip cache for draft mode)
  const cacheKey = `services:${draft}`;
  if (!draft) {
    const cached = getCached(cacheKey);
    if (cached) {
      console.log('[Cache] ✓ Served', cached.length, 'services from memory cache');
      return cached;
    }
  }

  try {
    const db = await getDatabase();
    const filter = draft ? {} : { _status: { $in: ['published', null] } };
    const services = await db.collection('services').find(filter).sort({ order: 1 }).toArray();

    console.log('[Direct DB] ✓ Fetched', services.length, 'services from MongoDB');

    // Hardcoded fallback images
    const fallbackImages: Record<string, string> = {
      '5-axis-machining': 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=90',
      'adaptive-machining': 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=90',
      'metrology': 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=90',
      'engineering': 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=90',
    };

    const result = services.map((service: any) => ({
      title: service.title,
      description: service.shortDescription || lexicalToText(service.description),
      iconName: iconNameMap[service.slug] || 'Cog',
      href: `/services/${service.slug}`,
      specs: service.specs || [],
      image: fallbackImages[service.slug] || 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=90',
      highlight: service.slug === '5-axis-machining',
    }));

    // Cache the result for future requests
    if (!draft) {
      setCache(cacheKey, result);
    }

    return result;
  } catch (error) {
    console.error('Error fetching services from MongoDB:', error);
    // Return hardcoded fallback data to maintain site functionality
    return [
      {
        title: "5-Axis Machining",
        description: "Advanced multi-axis CNC capabilities for complex aerospace and defense components",
        iconName: "Cog",
        href: "/services/5-axis-machining",
        specs: [],
        image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=90',
        highlight: true
      },
      {
        title: "Adaptive Machining",
        description: "Intelligent material removal strategies for optimal efficiency",
        iconName: "Cpu",
        href: "/services/adaptive-machining",
        specs: [],
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=90',
        highlight: false
      },
      {
        title: "Metrology Services",
        description: "Comprehensive measurement and inspection services",
        iconName: "Gauge",
        href: "/services/metrology",
        specs: [],
        image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=90',
        highlight: false
      },
      {
        title: "Engineering Services",
        description: "Design, analysis, and optimization expertise",
        iconName: "Users",
        href: "/services/engineering",
        specs: [],
        image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=90',
        highlight: false
      }
    ];
  }
}

export async function getIndustriesFromCMS(draft = false) {
  // Check cache first (skip cache for draft mode)
  const cacheKey = `industries:${draft}`;
  if (!draft) {
    const cached = getCached(cacheKey);
    if (cached) {
      console.log('[Cache] ✓ Served', cached.length, 'industries from memory cache');
      return cached;
    }
  }

  try {
    const db = await getDatabase();
    const filter = draft ? {} : { _status: { $in: ['published', null] } };
    const industries = await db.collection('industries').find(filter).sort({ order: 1 }).toArray();

    console.log('[Direct DB] ✓ Fetched', industries.length, 'industries from MongoDB');

    // Hardcoded fallback images
    const fallbackImages: Record<string, string> = {
      'defense': 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122',
      'energy': 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e',
      'aerospace': 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1',
    };

    const result = industries.map((industry: any) => ({
      title: industry.title,
      description: lexicalToText(industry.description),
      iconName: iconNameMap[industry.slug] || 'Factory',
      href: `/industries/${industry.slug}`,
      image: fallbackImages[industry.slug] || 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1',
      features: industry.features || [],
    }));

    // Cache the result for future requests
    if (!draft) {
      setCache(cacheKey, result);
    }

    return result;
  } catch (error) {
    console.error('Error fetching industries from MongoDB:', error);
    // Return hardcoded fallback data
    return [
      {
        title: "Aerospace",
        description: "AS9100 certified manufacturing for critical flight components",
        iconName: "Plane",
        href: "/industries/aerospace",
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1',
        features: []
      },
      {
        title: "Defense",
        description: "ITAR registered facility for defense contracts",
        iconName: "Shield",
        href: "/industries/defense",
        image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122',
        features: []
      },
      {
        title: "Energy",
        description: "Precision components for power generation",
        iconName: "Zap",
        href: "/industries/energy",
        image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e',
        features: []
      }
    ];
  }
}

export async function getHomepageFromCMS() {
  // Check cache first
  const cacheKey = 'homepage';
  const cached = getCached(cacheKey);
  if (cached) {
    console.log('[Cache] ✓ Served homepage data from memory cache');
    return cached;
  }

  try {
    const db = await getDatabase();
    // Payload 3.x stores each global in its own collection
    const homepage = await db.collection('homepage').findOne({});

    if (!homepage) {
      console.log('[Direct DB] ⚠️  Homepage global not found');
      return null;
    }

    console.log('[Direct DB] ✓ Fetched homepage data from MongoDB');

    // Helper to recursively convert all Lexical richtext to plain text
    const sanitizeData = (obj: any): any => {
      if (!obj) return obj;
      if (typeof obj !== 'object') return obj;

      // If it's a Lexical richtext object, convert to text
      if (obj.root && obj.root.children) {
        return lexicalToText(obj);
      }

      // If it's an array, process each item
      if (Array.isArray(obj)) {
        return obj.map(item => sanitizeData(item));
      }

      // If it's a plain object, process each property
      const result: any = {};
      for (const key in obj) {
        result[key] = sanitizeData(obj[key]);
      }
      return result;
    };

    // Transform badges array format if present, then sanitize entire hero
    const transformedHero = homepage.hero ? sanitizeData({
      ...homepage.hero,
      badges: homepage.hero.badges?.map((b: any) =>
        typeof b === 'string' ? b : b.badge
      ) || []
    }) : null;

    const result = {
      hero: transformedHero,
      stats: sanitizeData(homepage.stats),
      cta: sanitizeData(homepage.cta),
      technicalSpecs: sanitizeData(homepage.technicalSpecs),
      imageShowcase: sanitizeData(homepage.imageShowcase),
      resources: sanitizeData(homepage.resources),
    };

    // Cache the result for future requests
    setCache(cacheKey, result);

    return result;
  } catch (error) {
    console.error('Error fetching homepage from MongoDB:', error);
    return null;
  }
}

export async function getServiceBySlugFromCMS(slug: string, draft = false) {
  try {
    const db = await getDatabase();
    const filter = draft ? { slug } : { slug, _status: { $in: ['published', null] } };
    const service = await db.collection('services').findOne(filter);

    if (!service) {
      console.log(`[Direct DB] ⚠️  Service not found: ${slug}`);
      return null;
    }

    console.log(`[Direct DB] ✓ Fetched service: ${service.title}`);

    return {
      title: service.title,
      slug: service.slug,
      description: service.description,
      hero: service.hero,
      overview: service.overview,
      capabilities: service.capabilities,
      technicalSpecs: service.technicalSpecs,
      process: service.process,
      equipment: service.equipment,
      seo: service.seo,
    };
  } catch (error) {
    console.error(`Error fetching service ${slug} from MongoDB:`, error);
    return null;
  }
}

export async function getIndustryBySlugFromCMS(slug: string, draft = false) {
  try {
    const db = await getDatabase();
    const filter = draft ? { slug } : { slug, _status: { $in: ['published', null] } };
    const industry = await db.collection('industries').findOne(filter);

    if (!industry) {
      console.log(`[Direct DB] ⚠️  Industry not found: ${slug}`);
      return null;
    }

    console.log(`[Direct DB] ✓ Fetched industry: ${industry.title}`);

    return industry;
  } catch (error) {
    console.error(`Error fetching industry ${slug} from MongoDB:`, error);
    return null;
  }
}

export async function getResourcesFromCMS() {
  try {
    const db = await getDatabase();
    const resources = await db.collection('resources').find({}).toArray();

    console.log('[Direct DB] ✓ Fetched', resources.length, 'resources from MongoDB');

    return resources;
  } catch (error) {
    console.error('Error fetching resources from MongoDB:', error);
    return [];
  }
}

export async function getNavigationFromCMS() {
  try {
    const db = await getDatabase();
    const navigation = await db.collection('globals').findOne({ globalType: 'navigation' });

    if (!navigation) {
      console.log('[Direct DB] ⚠️  Navigation global not found');
      return null;
    }

    console.log('[Direct DB] ✓ Fetched navigation data from MongoDB');

    return navigation;
  } catch (error) {
    console.error('Error fetching navigation from MongoDB:', error);
    return null;
  }
}

export async function getFooterFromCMS() {
  try {
    const db = await getDatabase();
    const footer = await db.collection('globals').findOne({ globalType: 'footer' });

    if (!footer) {
      console.log('[Direct DB] ⚠️  Footer global not found');
      return null;
    }

    console.log('[Direct DB] ✓ Fetched footer data from MongoDB');

    return footer;
  } catch (error) {
    console.error('Error fetching footer from MongoDB:', error);
    return null;
  }
}

// Add missing functions for other pages
export async function getAboutFromCMS() {
  try {
    const db = await getDatabase();
    const about = await db.collection('globals').findOne({ globalType: 'about' });

    console.log('[Direct DB] ✓ Fetched about data from MongoDB');
    return about;
  } catch (error) {
    console.error('Error fetching about from MongoDB:', error);
    return null;
  }
}

export async function getCareersFromCMS() {
  try {
    const db = await getDatabase();
    const careers = await db.collection('globals').findOne({ globalType: 'careers' });

    console.log('[Direct DB] ✓ Fetched careers data from MongoDB');
    return careers;
  } catch (error) {
    console.error('Error fetching careers from MongoDB:', error);
    return null;
  }
}

export async function getContactFromCMS() {
  try {
    const db = await getDatabase();
    const contact = await db.collection('globals').findOne({ globalType: 'contact' });

    console.log('[Direct DB] ✓ Fetched contact data from MongoDB');
    return contact;
  } catch (error) {
    console.error('Error fetching contact from MongoDB:', error);
    return null;
  }
}

export async function getTermsFromCMS() {
  try {
    const db = await getDatabase();
    const terms = await db.collection('globals').findOne({ globalType: 'terms' });

    console.log('[Direct DB] ✓ Fetched terms data from MongoDB');
    return terms;
  } catch (error) {
    console.error('Error fetching terms from MongoDB:', error);
    return null;
  }
}

export async function getSupplierRequirementsFromCMS() {
  try {
    const db = await getDatabase();
    const supplierReqs = await db.collection('globals').findOne({ globalType: 'supplier-requirements' });

    console.log('[Direct DB] ✓ Fetched supplier requirements from MongoDB');
    return supplierReqs;
  } catch (error) {
    console.error('Error fetching supplier requirements from MongoDB:', error);
    return null;
  }
}

export async function getResourceBySlugFromCMS(slug: string, draft = false) {
  try {
    const db = await getDatabase();
    const filter = draft ? { slug } : { slug, _status: { $in: ['published', null] } };
    const resource = await db.collection('resources').findOne(filter);

    if (!resource) {
      console.log(`[Direct DB] ⚠️  Resource not found: ${slug}`);
      return null;
    }

    console.log(`[Direct DB] ✓ Fetched resource: ${resource.title}`);
    return resource;
  } catch (error) {
    console.error(`Error fetching resource ${slug} from MongoDB:`, error);
    return null;
  }
}

export async function getResourcesByCategoryFromCMS(category: string) {
  try {
    const db = await getDatabase();
    const resources = await db.collection('resources').find({ category }).toArray();

    console.log(`[Direct DB] ✓ Fetched ${resources.length} resources for category: ${category}`);
    return resources;
  } catch (error) {
    console.error(`Error fetching resources for category ${category}:`, error);
    return [];
  }
}

export async function getAllResourcesFromCMS() {
  try {
    const db = await getDatabase();
    const resources = await db.collection('resources').find({}).toArray();

    console.log('[Direct DB] ✓ Fetched all resources from MongoDB');
    return resources;
  } catch (error) {
    console.error('Error fetching all resources from MongoDB:', error);
    return [];
  }
}

export async function getSiteSettingsFromCMS() {
  try {
    const db = await getDatabase();
    const siteSettings = await db.collection('globals').findOne({ globalType: 'site-settings' });

    if (!siteSettings) {
      console.log('[Direct DB] ⚠️  Site settings global not found');
      return null;
    }

    console.log('[Direct DB] ✓ Fetched site settings from MongoDB');
    return siteSettings;
  } catch (error) {
    console.error('Error fetching site settings from MongoDB:', error);
    return null;
  }
}

export async function getUITextFromCMS() {
  try {
    const db = await getDatabase();
    const uiText = await db.collection('globals').findOne({ globalType: 'ui-text' });

    if (!uiText) {
      console.log('[Direct DB] ⚠️  UI text global not found');
      return null;
    }

    console.log('[Direct DB] ✓ Fetched UI text from MongoDB');
    return uiText;
  } catch (error) {
    console.error('Error fetching UI text from MongoDB:', error);
    return null;
  }
}

export async function getTeamMembersFromCMS(draft = false) {
  try {
    const db = await getDatabase();
    const filter = draft ? {} : { _status: { $in: ['published', null] } };
    const teamMembers = await db.collection('team-members').find(filter).sort({ order: 1 }).toArray();

    console.log('[Direct DB] ✓ Fetched', teamMembers.length, 'team members from MongoDB');
    return teamMembers;
  } catch (error) {
    console.error('Error fetching team members from MongoDB:', error);
    return [];
  }
}