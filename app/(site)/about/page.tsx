import { getSiteUrl } from '@/lib/site-url';
import AboutPageClient from '@/components/pages/AboutPageClient';
import { getAbout } from '@/sanity/lib/queries';
import { draftMode } from 'next/headers';

// ISR for automatic updates when Sanity content changes (supports draft mode preview)
export const revalidate = 60;

export default async function AboutPage() {
  // Fetch data from CMS
  const { isEnabled } = await draftMode();
  const aboutData = await getAbout(isEnabled);

  // Cast: AboutPage query type and AboutPageData client type represent the same CMS document
  // AboutPage query type and AboutPageData client type represent the same CMS document
  return <AboutPageClient data={aboutData as React.ComponentProps<typeof AboutPageClient>['data']} />;
}

// Generate metadata for SEO - pulls from Sanity CMS with fallbacks
export async function generateMetadata() {
  const { isEnabled } = await draftMode();
  const aboutData = await getAbout(isEnabled);
  const baseUrl = getSiteUrl();

  // Pull SEO data from Sanity with fallbacks
  const metadata = {
    title: aboutData?.seo?.metaTitle,
    description: aboutData?.seo?.metaDescription,
    keywords: aboutData?.seo?.metaKeywords,
    ogImage: aboutData?.seo?.ogImage?.asset?.url || null,
    ogImageAlt: aboutData?.seo?.ogImage?.alt || '',
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
      canonical: `${baseUrl}/about`,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: `${baseUrl}/about`,
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
