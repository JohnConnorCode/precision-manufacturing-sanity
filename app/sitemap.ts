import { MetadataRoute } from 'next';
import { client } from '@/sanity/lib/client';

// Fetch all published services with their slugs and update dates
async function getServices() {
  const query = `*[_type == "service" && published == true && !(_id in path("drafts.**"))] {
    "slug": slug.current,
    _updatedAt
  }`;
  return client.fetch(query).catch(() => []);
}

// Fetch all published industries with their slugs and update dates
async function getIndustries() {
  const query = `*[_type == "industry" && published == true && !(_id in path("drafts.**"))] {
    "slug": slug.current,
    _updatedAt
  }`;
  return client.fetch(query).catch(() => []);
}

// Fetch all published resources with their slugs and update dates
async function getResources() {
  const query = `*[_type == "resource" && published == true && !(_id in path("drafts.**"))] {
    "slug": slug.current,
    _updatedAt
  }`;
  return client.fetch(query).catch(() => []);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://iismet.com';

  // Fetch dynamic content from Sanity
  const [services, industries, resources] = await Promise.all([
    getServices(),
    getIndustries(),
    getResources(),
  ]);

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about/metbase`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/industries`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/compliance/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/compliance/supplier-requirements`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Dynamic service pages
  const servicePages: MetadataRoute.Sitemap = services
    .filter((s: { slug: string }) => s.slug)
    .map((service: { slug: string; _updatedAt: string }) => ({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: new Date(service._updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

  // Dynamic industry pages
  const industryPages: MetadataRoute.Sitemap = industries
    .filter((i: { slug: string }) => i.slug)
    .map((industry: { slug: string; _updatedAt: string }) => ({
      url: `${baseUrl}/industries/${industry.slug}`,
      lastModified: new Date(industry._updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

  // Dynamic resource pages
  const resourcePages: MetadataRoute.Sitemap = resources
    .filter((r: { slug: string }) => r.slug)
    .map((resource: { slug: string; _updatedAt: string }) => ({
      url: `${baseUrl}/resources/${resource.slug}`,
      lastModified: new Date(resource._updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

  return [...staticPages, ...servicePages, ...industryPages, ...resourcePages];
}
