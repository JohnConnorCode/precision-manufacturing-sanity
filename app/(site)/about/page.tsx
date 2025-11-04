import AboutPageClient from '@/components/pages/AboutPageClient';
import { getAbout, getAllTeamMembers } from '@/sanity/lib/queries';
import { draftMode } from 'next/headers';

// Use ISR for automatic updates when Sanity content changes
export const dynamic = 'force-static';
export const revalidate = 60; // Revalidate every 60 seconds

export default async function AboutPage() {
  // Fetch data from CMS
  const { isEnabled } = await draftMode();
  const [aboutData, teamMembers] = await Promise.all([
    getAbout(isEnabled),
    getAllTeamMembers(isEnabled)
  ]);

  return <AboutPageClient data={{ ...aboutData, teamMembers } as any} />;
}

// Generate metadata for SEO
export async function generateMetadata() {
  const baseUrl = 'https://iismet.com';

  const metadata = {
    title: 'About IIS - Integrated Inspection Systems | 30 Years of Precision Manufacturing Excellence',
    description: 'Founded in 1995, Integrated Inspection Systems (IIS) has grown from a basement startup to an industry-leading provider of precision manufacturing, metrology, and engineering services. ISO 9001, AS9100 certified, ITAR registered. Serving aerospace, defense, and advanced industries.',
    keywords: 'IIS history, precision manufacturing company, aerospace manufacturing, ISO 9001 certified, AS9100 certified, ITAR registered, MetBase software, CMM inspection company, CNC machining services, Oregon manufacturing, Clackamas Oregon',
    ogImage: `${baseUrl}/og-image-about.jpg`
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
      canonical: `${baseUrl}/about`,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: `${baseUrl}/about`,
      siteName: 'IIS Precision Manufacturing',
      title: metadata.title,
      description: metadata.description,
      images: [
        {
          url: metadata.ogImage,
          width: 1200,
          height: 630,
          alt: 'IIS Precision Manufacturing - About Our Company',
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
