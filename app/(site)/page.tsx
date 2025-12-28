import { draftMode } from 'next/headers';
import Hero from '@/components/sections/Hero';
import ClientLogos from '@/components/sections/ClientLogos';
import TechnicalSpecs from '@/components/sections/TechnicalSpecs';
import Services from '@/components/sections/Services';
import Industries from '@/components/sections/Industries';
import ImageShowcase from '@/components/sections/ImageShowcase';
import OperationalExcellence from '@/components/sections/OperationalExcellence';
import Resources from '@/components/sections/Resources';
import CTA from '@/components/sections/CTA';
import StructuredData from '@/components/seo/StructuredData';
import {
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generateWebsiteSchema,
  generateProductCatalogSchema,
  generateFAQSchema
} from '@/lib/structured-data';
import { getAllServices, getAllIndustries, getHomepage, getSiteSettings } from '@/sanity/lib/queries';
import { portableTextToPlainTextMemoized as portableTextToPlainText } from '@/lib/performance';
import type { SanityImage } from '@/lib/types/cms';

// Types for Sanity data
interface SanityServiceData {
  title: string;
  slug?: { current?: string } | string;
  shortDescription?: string;
  description?: unknown;
  image?: SanityImage;
  imageUrl?: string;
  iconName?: string;
  specs?: (string | { text?: string; spec?: string })[];
  highlight?: boolean;
}

interface SanityIndustryData {
  title: string;
  slug?: { current?: string } | string;
  shortDescription?: string;
  description?: unknown;
  image?: SanityImage;
  imageUrl?: string;
  iconName?: string;
  features?: (string | { feature?: string })[];
}

// Use ISR for automatic updates when Sanity content changes
export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const { isEnabled: isDraft } = await draftMode();
  const baseUrl = 'https://iismet.com';

  // Parallel data fetching - 4x faster than sequential
  const [servicesData, industriesData, homepageData, siteSettings] = await Promise.all([
    getAllServices(isDraft) as Promise<SanityServiceData[] | null>,
    getAllIndustries(isDraft) as Promise<SanityIndustryData[] | null>,
    getHomepage(isDraft),
    getSiteSettings(isDraft)
  ]);

  // Format data for display
  const formattedServices = servicesData?.map((service) => ({
    ...service,
    description: service.shortDescription || portableTextToPlainText(service.description),
    href: `/services/${typeof service.slug === 'string' ? service.slug : service.slug?.current}`,
    image: service.image?.asset?.url || service.imageUrl,
  }));

  const formattedIndustries = industriesData?.map((industry) => ({
    ...industry,
    description: industry.shortDescription || portableTextToPlainText(industry.description),
    href: `/industries/${typeof industry.slug === 'string' ? industry.slug : industry.slug?.current}`,
    image: industry.image?.asset?.url || industry.imageUrl,
  }));

  const heroData = homepageData?.hero || undefined;

  // Always use stats for header, technicalSpecs for the spec items
  const technicalSpecsData = {
    title: homepageData?.stats?.title || 'Precision By The Numbers',
    subtitle: homepageData?.stats?.subtitle || 'Industry-leading capabilities backed by decades of aerospace and defense manufacturing expertise',
    enabled: homepageData?.technicalSpecs?.enabled,
    specs: Array.isArray(homepageData?.technicalSpecs)
      ? homepageData.technicalSpecs
      : homepageData?.technicalSpecs?.specs
  };

  // Organization data for structured markup - 100% from Sanity CMS
  const organizationData = {
    name: siteSettings?.company?.name,
    alternateName: siteSettings?.company?.alternateName,
    url: siteSettings?.company?.websiteUrl || baseUrl,
    logo: siteSettings?.company?.logoUrl,
    description: siteSettings?.company?.description,
    foundingDate: siteSettings?.company?.foundingYear,
    address: {
      streetAddress: siteSettings?.contact?.address,
      addressLocality: siteSettings?.contact?.city,
      addressRegion: siteSettings?.contact?.state,
      postalCode: siteSettings?.contact?.zip,
      addressCountry: siteSettings?.contact?.country
    },
    contactPoint: {
      telephone: siteSettings?.contact?.phone,
      email: siteSettings?.contact?.email,
      contactType: "customer service"
    },
    sameAs: [
      siteSettings?.social?.linkedin,
      siteSettings?.social?.twitter,
      siteSettings?.social?.facebook
    ].filter(Boolean) // Remove empty values
  };

  // Generate all structured data schemas
  const organizationSchema = generateOrganizationSchema(organizationData);
  const localBusinessSchema = generateLocalBusinessSchema(organizationData);
  const websiteSchema = generateWebsiteSchema(organizationData.url);
  const productCatalogSchema = generateProductCatalogSchema();
  const faqSchema = generateFAQSchema();

  return (
    <>
      {/* Comprehensive Structured Data for World-Class SEO */}
      <StructuredData data={[
        organizationSchema,
        localBusinessSchema,
        websiteSchema,
        productCatalogSchema,
        faqSchema
      ]} />

      {heroData?.enabled !== false && <Hero data={heroData} />}
      {homepageData?.clientLogos?.enabled !== false && <ClientLogos data={homepageData?.clientLogos} />}
      {homepageData?.servicesSection?.enabled !== false && (
        <Services data={formattedServices || undefined} sectionData={homepageData?.servicesSection || undefined} />
      )}
      {technicalSpecsData?.enabled !== false && <TechnicalSpecs data={technicalSpecsData || undefined} />}
      {homepageData?.industriesSection?.enabled !== false && (
        <Industries data={formattedIndustries || undefined} sectionData={homepageData?.industriesSection || undefined} />
      )}
      {homepageData?.imageShowcase?.enabled !== false && (
        <ImageShowcase data={homepageData?.imageShowcase || undefined} />
      )}
      {homepageData?.operationalExcellence?.enabled !== false && <OperationalExcellence data={homepageData?.operationalExcellence || undefined} />}
      {homepageData?.resourcesSection?.enabled !== false && <Resources data={homepageData?.resourcesSection || undefined} />}
      {homepageData?.cta?.enabled !== false && <CTA data={homepageData?.cta || undefined} />}
    </>
  );
}

// Generate metadata for SEO - pulls from Sanity CMS with fallbacks
export async function generateMetadata() {
  const baseUrl = 'https://iismet.com';
  const [homepageData, siteSettings] = await Promise.all([
    getHomepage(),
    getSiteSettings()
  ]);

  // Pull SEO data from Sanity with fallbacks (fallbacks allowed for SEO resilience)
  const metadata = {
    title: homepageData?.seo?.metaTitle || 'IIS - Integrated Inspection Systems | Engineering, Metrology, Machining & Database Services',
    description: homepageData?.seo?.metaDescription || 'Integrated Inspection Systems (IIS): Engineering, Metrology, Machining & Database Services since 1995. Proprietary MetBase® software links CMM, CNC & vision systems. AS9100, ISO 9001 certified, ITAR registered. Serving aerospace, manufacturing & government.',
    keywords: homepageData?.seo?.metaKeywords || 'IIS, Integrated Inspection Systems, engineering services, metrology, machining, database services, MetBase software, CMM inspection, CNC machining, AS9100, ISO 9001, ITAR, aerospace, precision manufacturing, Oregon',
    ogImage: homepageData?.seo?.ogImage?.asset?.url || `${baseUrl}/og-image-home.jpg`,
    ogImageAlt: homepageData?.seo?.ogImage?.alt || 'IIS Precision Manufacturing - Advanced CNC Machining Services',
  };

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    authors: [{ name: 'IIS Precision Manufacturing', url: baseUrl }],
    creator: 'IIS Precision Manufacturing',
    publisher: 'IIS Precision Manufacturing',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: baseUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: baseUrl,
      siteName: 'IIS Precision Manufacturing',
      title: metadata.title,
      description: metadata.description,
      images: [
        {
          url: metadata.ogImage,
          width: 1200,
          height: 630,
          alt: metadata.ogImageAlt,
          type: 'image/jpeg',
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@iisprecision',
      creator: '@iisprecision',
      title: metadata.title,
      description: metadata.description,
      images: [metadata.ogImage],
    },
    // verification: {
    //   // Add search engine verification codes when obtained from:
    //   // - Google Search Console: https://search.google.com/search-console
    //   // - Bing Webmaster Tools: https://www.bing.com/webmasters
    //   // google: 'your-google-verification-code',
    //   // other: { 'msvalidate.01': 'your-bing-verification-code' },
    // },
    category: 'Business',
    classification: 'Manufacturing',
    other: {
      'business:contact_data:street_address': siteSettings?.contact?.address,
      'business:contact_data:locality': siteSettings?.contact?.city,
      'business:contact_data:region': siteSettings?.contact?.state,
      'business:contact_data:postal_code': siteSettings?.contact?.zip,
      'business:contact_data:country_name': siteSettings?.contact?.country,
      'business:contact_data:phone_number': siteSettings?.contact?.phone,
      'business:contact_data:website': baseUrl,
    },
  };
}
