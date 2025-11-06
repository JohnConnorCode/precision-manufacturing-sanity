import TermsPageClient from './page-client';
import { getTerms, getAllServices, getAllIndustries } from '@/sanity/lib/queries';

// Force static generation with long revalidation
export const revalidate = 3600;

export default async function TermsPage() {
  // Fetch data from CMS
  const [termsData, allServices, allIndustries] = await Promise.all([
    getTerms(),
    getAllServices(),
    getAllIndustries(),
  ]);

  return (
    <TermsPageClient
      data={termsData as any}
      allServices={allServices}
      allIndustries={allIndustries}
    />
  );
}

// Generate metadata for SEO
export async function generateMetadata() {
  const baseUrl = 'https://iismet.com';

  const metadata = {
    title: 'Terms & Conditions | Purchase Order Terms - IIS Precision Manufacturing',
    description: 'Review Integrated Inspection Systems purchase order terms and conditions. Comprehensive supplier guidelines covering quality, warranty, delivery, compliance, and export control requirements for aerospace and defense manufacturing.',
    keywords: 'purchase order terms, supplier terms and conditions, manufacturing contract terms, AS9100 requirements, aerospace supplier requirements, defense contractor terms, quality requirements, ITAR compliance',
    ogImage: `${baseUrl}/og-image-terms.jpg`
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
      canonical: `${baseUrl}/compliance/terms`,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: `${baseUrl}/compliance/terms`,
      siteName: 'IIS Precision Manufacturing',
      title: metadata.title,
      description: metadata.description,
      images: [
        {
          url: metadata.ogImage,
          width: 1200,
          height: 630,
          alt: 'IIS Terms & Conditions',
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
    classification: 'Legal',
  };
}
