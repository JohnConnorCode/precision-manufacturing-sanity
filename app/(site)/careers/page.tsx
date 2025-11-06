import CareersPageClient from './page-client';
import { getCareers, getAllServices, getAllIndustries } from '@/sanity/lib/queries';
import { draftMode } from 'next/headers';

// Force static generation with long revalidation
export const revalidate = 3600;

export default async function CareersPage() {
  const { isEnabled } = await draftMode();
  // Fetch data from CMS
  const [careersData, allServices, allIndustries] = await Promise.all([
    getCareers(isEnabled),
    getAllServices(isEnabled),
    getAllIndustries(isEnabled),
  ]);

  return (
    <CareersPageClient
      data={careersData as any}
      allServices={allServices}
      allIndustries={allIndustries}
    />
  );
}

// Generate metadata for SEO
export async function generateMetadata() {
  const baseUrl = 'https://iismet.com';

  const metadata = {
    title: 'Careers at IIS | Join Our Precision Manufacturing Team',
    description: 'Build your career with Integrated Inspection Systems, a leader in precision manufacturing for aerospace and defense. We\'re hiring engineers, technicians, machinists, and quality professionals. AS9100D, ISO 9001:2015 certified.',
    keywords: 'precision manufacturing careers, aerospace manufacturing jobs, CNC machinist jobs, quality engineer jobs, manufacturing engineer jobs, Oregon manufacturing careers, AS9100 jobs, ITAR careers, CMM inspector jobs',
    ogImage: `${baseUrl}/og-image-careers.jpg`
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
      canonical: `${baseUrl}/careers`,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: `${baseUrl}/careers`,
      siteName: 'IIS Precision Manufacturing',
      title: metadata.title,
      description: metadata.description,
      images: [
        {
          url: metadata.ogImage,
          width: 1200,
          height: 630,
          alt: 'Careers at IIS Precision Manufacturing',
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
    classification: 'Manufacturing',
  };
}
