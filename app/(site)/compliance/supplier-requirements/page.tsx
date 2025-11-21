import { notFound } from 'next/navigation';
import SupplierRequirementsPageClient from './page-client';
import { getSupplierRequirements } from '@/sanity/lib/queries';

// Force static generation with long revalidation
export const revalidate = 3600;

export default async function SupplierRequirementsPage() {
  // Fetch data from CMS
  const supplierRequirementsData = await getSupplierRequirements();

  // Return 404 if document doesn't exist yet in Sanity
  if (!supplierRequirementsData) {
    notFound();
  }

  return <SupplierRequirementsPageClient data={supplierRequirementsData as any} />;
}

// Generate metadata for SEO
export async function generateMetadata() {
  const baseUrl = 'https://iismet.com';

  const metadata = {
    title: 'Supplier Quality Requirements | AS9100 Standards - IIS Precision Manufacturing',
    description: 'Comprehensive supplier quality requirements for aerospace and precision manufacturing. AS9100D, ISO 9001:2015, ITAR compliance, and industry best practices for supply chain excellence.',
    keywords: 'supplier requirements, AS9100D, ISO 9001, supplier quality, aerospace supplier standards, ITAR compliance, quality system requirements, supplier approval process, manufacturing standards',
    ogImage: `${baseUrl}/og-image-supplier-requirements.jpg`
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
      canonical: `${baseUrl}/compliance/supplier-requirements`,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: `${baseUrl}/compliance/supplier-requirements`,
      siteName: 'IIS Precision Manufacturing',
      title: metadata.title,
      description: metadata.description,
      images: [
        {
          url: metadata.ogImage,
          width: 1200,
          height: 630,
          alt: 'IIS Supplier Quality Requirements',
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
    category: 'Business',
    classification: 'Quality Standards',
  };
}
