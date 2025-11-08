import Hero from '@/components/sections/Hero';
import TechnicalSpecs from '@/components/sections/TechnicalSpecs';
import Services from '@/components/sections/Services';
import Industries from '@/components/sections/Industries';
import ImageShowcase from '@/components/sections/ImageShowcase';
import OperationalExcellence from '@/components/sections/OperationalExcellence';
import Resources from '@/components/sections/Resources';
import Stats from '@/components/sections/Stats';
import CTA from '@/components/sections/CTA';
import StructuredData from '@/components/seo/StructuredData';
import {
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generateWebsiteSchema,
  generateProductCatalogSchema,
  generateFAQSchema
} from '@/lib/structured-data';
import { getAllServices, getAllIndustries, getHomepage } from '@/sanity/lib/queries';
import { portableTextToPlainTextMemoized as portableTextToPlainText } from '@/lib/performance';

// Use ISR for automatic updates when Sanity content changes
export const dynamic = 'force-static';
export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  // Parallel data fetching - 3x faster than sequential
  const [servicesData, industriesData, homepageData] = await Promise.all([
    getAllServices(),
    getAllIndustries(),
    getHomepage()
  ]);

  // Format data for display
  const formattedServices = servicesData?.map((service: any) => ({
    ...service,
    description: service.shortDescription || portableTextToPlainText(service.description),
    href: `/services/${service.slug?.current || service.slug}`,
    image: service.image?.asset?.url || '', // Extract URL from Sanity image object
  }));

  const formattedIndustries = industriesData?.map((industry: any) => ({
    ...industry,
    description: industry.shortDescription || portableTextToPlainText(industry.description),
    href: `/industries/${industry.slug?.current || industry.slug}`,
    image: industry.image?.asset?.url || industry.imageUrl || '', // Extract URL from Sanity image object or imageUrl field
  }));

  const heroData = homepageData?.heroEnhanced || homepageData?.hero || undefined;

  // Organization data for structured markup
  const organizationData = {
    name: "Integrated Inspection Systems (IIS)",
    alternateName: "IIS",
    url: "https://iismet.com",
    logo: "https://iismet.com/logo.png",
    description: "Engineering, Metrology, Machining & Database Services since 1995. AS9100 & ISO 9001 certified precision machining and CMM inspection services. Proprietary MetBase® software for closed-loop data integration. ITAR registered. First article inspection, dimensional measurement, and process verification for aerospace, defense & manufacturing.",
    foundingDate: "1995",
    address: {
      streetAddress: "14310 SE Industrial Way",
      addressLocality: "Clackamas",
      addressRegion: "Oregon",
      postalCode: "97015",
      addressCountry: "US"
    },
    contactPoint: {
      telephone: "+1-503-231-9093",
      email: "officemgr@iismet.com",
      contactType: "customer service"
    },
    sameAs: [
      "https://www.linkedin.com/company/integrated-inspection-systems",
      "https://twitter.com/iismet"
    ]
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

      <Hero data={heroData} />
      <Services data={formattedServices || undefined} sectionData={homepageData?.servicesSection || undefined} />
      <TechnicalSpecs data={homepageData?.technicalSpecs || undefined} />
      <Industries data={formattedIndustries || undefined} sectionData={homepageData?.industriesSection || undefined} />
      <ImageShowcase data={homepageData?.imageShowcase || undefined} />
      <OperationalExcellence data={homepageData?.operationalExcellence || undefined} />
      <Resources data={homepageData?.resourcesSection || undefined} />
      <Stats data={homepageData?.stats || undefined} />
      <CTA data={homepageData?.cta || undefined} />
    </>
  );
}

// Generate metadata for SEO - pulls from Sanity CMS with fallbacks
export async function generateMetadata() {
  const homepageData = await getHomepage();
  const baseUrl = 'https://iismet.com';

  // Pull SEO data from Sanity with fallbacks
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
    verification: {
      google: 'google-verification-code', // Add actual verification code
      yandex: 'yandex-verification-code',
      yahoo: 'yahoo-verification-code',
      other: {
        'msvalidate.01': 'bing-verification-code',
      },
    },
    category: 'Business',
    classification: 'Manufacturing',
    other: {
      'business:contact_data:street_address': '14310 SE Industrial Way',
      'business:contact_data:locality': 'Clackamas',
      'business:contact_data:region': 'Oregon',
      'business:contact_data:postal_code': '97015',
      'business:contact_data:country_name': 'United States',
      'business:contact_data:phone_number': '+1-503-231-9093',
      'business:contact_data:website': baseUrl,
    },
  };
}
