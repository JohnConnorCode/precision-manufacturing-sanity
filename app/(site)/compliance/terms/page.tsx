import { getSiteUrl } from '@/lib/site-url';
import TermsPageClient, { type TermsData } from './page-client';
import { getTerms } from '@/sanity/lib/queries';
import { draftMode } from 'next/headers';

// ISR for automatic updates when Sanity content changes (supports draft mode preview)
export const revalidate = 3600;

export default async function TermsPage() {
  const { isEnabled: isDraft } = await draftMode();
  const termsData = await getTerms(isDraft);

  return <TermsPageClient data={termsData as TermsData} />;
}

// Generate metadata for SEO
export async function generateMetadata() {
  const baseUrl = getSiteUrl();

  const metadata = {
    title: 'Terms & Conditions | Purchase Order Terms - IIS - Integrated Inspection Systems',
    description: 'Review Integrated Inspection Systems purchase order terms and conditions. Comprehensive supplier guidelines covering quality, warranty, delivery, compliance, and export control requirements for aerospace and defense machining.',
    keywords: 'purchase order terms, supplier terms and conditions, machining contract terms, AS9100 requirements, aerospace supplier requirements, defense contractor terms, quality requirements, ITAR compliance',
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
      canonical: `${baseUrl}/compliance/terms`,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: `${baseUrl}/compliance/terms`,
      siteName: 'IIS - Integrated Inspection Systems',
      title: metadata.title,
      description: metadata.description,
      images: metadata.ogImage ? [
        {
          url: metadata.ogImage,
          width: 1200,
          height: 630,
          alt: 'IIS Terms & Conditions',
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
    classification: 'Legal',
  };
}
