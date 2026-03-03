import { MetadataRoute } from 'next';
import { client } from '@/sanity/lib/client';

async function getServices() {
  const query = `*[_type == "service" && published == true] {
    "slug": slug.current,
    _updatedAt
  }`;
  return client.fetch(query).catch(() => []);
}

async function getIndustries() {
  const query = `*[_type == "industry" && published == true] {
    "slug": slug.current,
    _updatedAt
  }`;
  return client.fetch(query).catch(() => []);
}

async function getResources() {
  const query = `*[_type == "resource" && published == true] {
    "slug": slug.current,
    category,
    _updatedAt
  }`;
  return client.fetch(query).catch(() => []);
}

async function getJobPostings() {
  const query = `*[_type == "jobPosting" && published == true] {
    "slug": slug.current,
    _updatedAt
  }`;
  return client.fetch(query).catch(() => []);
}

async function getCaseStudies() {
  const query = `*[_type == "caseStudy" && published == true] {
    "slug": slug.current,
    _updatedAt
  }`;
  return client.fetch(query).catch(() => []);
}

async function getResourceCategories() {
  const query = `*[_type == "resourceCategory"] | order(order asc) {
    "slug": slug.current,
    _updatedAt
  }`;
  return client.fetch(query).catch(() => []);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://iismet.com';

  const [services, industries, resources, jobPostings, caseStudies, resourceCategories] = await Promise.all([
    getServices(),
    getIndustries(),
    getResources(),
    getJobPostings(),
    getCaseStudies(),
    getResourceCategories(),
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
    {
      url: `${baseUrl}/case-studies`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/certifications`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Resource category landing pages (from Sanity CMS)
  const categoryPages: MetadataRoute.Sitemap = resourceCategories
    .filter((cat: { slug: string }) => cat.slug)
    .map((cat: { slug: string; _updatedAt: string }) => ({
      url: `${baseUrl}/resources/${cat.slug}`,
      lastModified: new Date(cat._updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

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

  // Dynamic resource pages (correct URL: /resources/{category}/{slug})
  const resourcePages: MetadataRoute.Sitemap = resources
    .filter((r: { slug: string; category: string }) => r.slug && r.category)
    .map((resource: { slug: string; category: string; _updatedAt: string }) => ({
      url: `${baseUrl}/resources/${resource.category}/${resource.slug}`,
      lastModified: new Date(resource._updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

  // Dynamic job posting pages
  const jobPages: MetadataRoute.Sitemap = jobPostings
    .filter((j: { slug: string }) => j.slug)
    .map((job: { slug: string; _updatedAt: string }) => ({
      url: `${baseUrl}/careers/${job.slug}`,
      lastModified: new Date(job._updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

  // Dynamic case study pages
  const caseStudyPages: MetadataRoute.Sitemap = caseStudies
    .filter((cs: { slug: string }) => cs.slug)
    .map((cs: { slug: string; _updatedAt: string }) => ({
      url: `${baseUrl}/case-studies/${cs.slug}`,
      lastModified: new Date(cs._updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

  return [
    ...staticPages,
    ...categoryPages,
    ...servicePages,
    ...industryPages,
    ...resourcePages,
    ...jobPages,
    ...caseStudyPages,
  ];
}
