import { getSiteUrl } from '@/lib/site-url';
import CareersPageClient from './page-client';
import { getCareers, getAllJobPostings } from '@/sanity/lib/queries';
import { draftMode } from 'next/headers';

// Job listings change frequently - use short revalidation
export const revalidate = 60;

export default async function CareersPage() {
  const { isEnabled } = await draftMode();
  // Fetch data from CMS
  const [careersData, jobPostings] = await Promise.all([
    getCareers(isEnabled),
    getAllJobPostings(isEnabled)
  ]);

  return <CareersPageClient data={careersData} jobPostings={jobPostings} />;
}

// Generate metadata for SEO - pulls from Sanity CMS with fallbacks
export async function generateMetadata() {
  const { isEnabled } = await draftMode();
  const careersData = await getCareers(isEnabled);
  const baseUrl = getSiteUrl();

  // Pull SEO data from Sanity with fallbacks
  const metadata = {
    title: careersData?.seo?.metaTitle || 'Careers at IIS | Join Our Precision Machining Team',
    description: careersData?.seo?.metaDescription || 'Build your career with Integrated Inspection Systems, a leader in precision machining for aerospace and defense. We\'re hiring engineers, technicians, machinists, and quality professionals. AS9100D, ISO 9001:2015 certified.',
    keywords: 'precision machining careers, aerospace machining jobs, CNC machinist jobs, quality engineer jobs, machining engineer jobs, Oregon machining careers, AS9100 jobs, ITAR careers, CMM inspector jobs',
    ogImage: careersData?.seo?.ogImage?.asset?.url || null,
    ogImageAlt: careersData?.seo?.ogImage?.alt || 'Careers at IIS - Integrated Inspection Systems',
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
      canonical: `${baseUrl}/careers`,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: `${baseUrl}/careers`,
      siteName: 'IIS - Integrated Inspection Systems',
      title: metadata.title,
      description: metadata.description,
      images: metadata.ogImage ? [
        {
          url: metadata.ogImage,
          width: 1200,
          height: 630,
          alt: metadata.ogImageAlt,
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
    classification: 'Machining & Inspection',
  };
}
