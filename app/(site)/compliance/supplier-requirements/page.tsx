import { getSiteUrl } from '@/lib/site-url';
import { notFound } from 'next/navigation';
import SupplierRequirementsPageClient from './page-client';
import { getSupplierRequirements } from '@/sanity/lib/queries';
import { draftMode } from 'next/headers';

// ISR for automatic updates when Sanity content changes (supports draft mode preview)
export const revalidate = 3600;

export default async function SupplierRequirementsPage() {
  const { isEnabled: isDraft } = await draftMode();
  const supplierRequirementsData = await getSupplierRequirements(isDraft);

  // Return 404 if document doesn't exist yet in Sanity
  if (!supplierRequirementsData) {
    notFound();
  }

  // Cast: query return type and client component prop type represent the same CMS document
  return <SupplierRequirementsPageClient data={supplierRequirementsData as any} />;
}

// Generate metadata for SEO
export async function generateMetadata() {
  const baseUrl = getSiteUrl();

  const metadata = {
    title: 'Supplier Quality Requirements | AS9100 Standards - IIS - Integrated Inspection Systems',
    description: 'Comprehensive supplier quality requirements for aerospace and precision machining. AS9100D, ISO 9001:2015, ITAR compliance, and industry best practices for supply chain excellence.',
    keywords: 'supplier requirements, AS9100D, ISO 9001, supplier quality, aerospace supplier standards, ITAR compliance, quality system requirements, supplier approval process, machining standards',
    ogImage: null as string | null
  };

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    authors: [{ name: 'IIS - Integrated Inspection Systems', url: baseUrl }],
    creator: 'IIS - Integrated Inspection Systems',
    publisher: 'IIS - Integrated Inspection Systems',
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
      canonical: `${baseUrl}/compliance/supplier-requirements`,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: `${baseUrl}/compliance/supplier-requirements`,
      siteName: 'IIS - Integrated Inspection Systems',
      title: metadata.title,
      description: metadata.description,
      images: metadata.ogImage ? [
        {
          url: metadata.ogImage,
          width: 1200,
          height: 630,
          alt: 'IIS Supplier Quality Requirements',
          type: 'image/jpeg',
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@iisprecision',
      creator: '@iisprecision',
      title: metadata.title,
      description: metadata.description,
      images: metadata.ogImage ? [metadata.ogImage] : [],
    },
    category: 'Business',
    classification: 'Quality Standards',
  };
}
