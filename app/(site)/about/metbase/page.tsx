import MetbasePageClient from '@/components/pages/MetbasePageClient';
import { getMetbase } from '@/sanity/lib/queries';
import { draftMode } from 'next/headers';

// ISR for automatic updates when Sanity content changes (supports draft mode preview)
export const revalidate = 60;

export default async function MetbasePage() {
  const { isEnabled } = await draftMode();
  const metbaseData = await getMetbase(isEnabled);

  return <MetbasePageClient data={metbaseData} />;
}

export async function generateMetadata() {
  const { isEnabled } = await draftMode();
  const metbaseData = await getMetbase(isEnabled);
  const baseUrl = 'https://iismet.com';

  const metadata = {
    title: metbaseData?.seo?.metaTitle || 'Metbase - Proprietary Database Software | IIS - Integrated Inspection Systems',
    description: metbaseData?.seo?.metaDescription || 'Metbase is IIS\'s proprietary database software providing ISO 9001 & AS9100 compliance for traceability, inspection data management, and robotic programming with over 15 years of historical data access.',
    ogImage: metbaseData?.seo?.ogImage?.asset?.url || null,
    ogImageAlt: metbaseData?.seo?.ogImage?.alt || 'Metbase Database Software by IIS',
  };

  return {
    title: metadata.title,
    description: metadata.description,
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
      canonical: `${baseUrl}/about/metbase`,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: `${baseUrl}/about/metbase`,
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
    category: 'Technology',
    classification: 'Software',
  };
}
