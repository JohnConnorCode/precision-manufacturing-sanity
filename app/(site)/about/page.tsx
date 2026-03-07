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
  return <AboutPageClient data={aboutData as any} />;
}

// Generate metadata for SEO - pulls from Sanity CMS with fallbacks
export async function generateMetadata() {
  const { isEnabled } = await draftMode();
  const aboutData = await getAbout(isEnabled);
  const baseUrl = getSiteUrl();

  // Pull SEO data from Sanity with fallbacks
  const metadata = {
    title: aboutData?.seo?.metaTitle || 'About IIS - Integrated Inspection Systems | 30 Years of Precision Machining Excellence',
    description: aboutData?.seo?.metaDescription || 'Founded in 1995, Integrated Inspection Systems (IIS) has grown from a basement startup to an industry-leading provider of precision machining, metrology, and engineering services. ISO 9001, AS9100 certified, ITAR registered. Serving aerospace, defense, and advanced industries.',
    keywords: aboutData?.seo?.metaKeywords || 'IIS history, precision machining company, aerospace machining, ISO 9001 certified, AS9100 certified, ITAR registered, MetBase software, CMM inspection company, CNC machining services, Oregon machining, Clackamas Oregon',
    ogImage: aboutData?.seo?.ogImage?.asset?.url || null,
    ogImageAlt: aboutData?.seo?.ogImage?.alt || 'IIS - Integrated Inspection Systems - About Our Company',
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
