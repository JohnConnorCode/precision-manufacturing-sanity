import { getSiteUrl } from '@/lib/site-url';
import ContactPageClient from './page-client';
import { getContact } from '@/sanity/lib/queries';
import { draftMode } from 'next/headers';

// ISR for automatic updates when Sanity content changes (supports draft mode preview)
export const revalidate = 60;

export default async function ContactPage() {
  const { isEnabled } = await draftMode();
  // Fetch data from CMS
  const contactData = await getContact(isEnabled);

  return <ContactPageClient data={contactData as any} />;
}

// Generate metadata for SEO - pulls from Sanity CMS with fallbacks
export async function generateMetadata() {
  const { isEnabled } = await draftMode();
  const contactData = await getContact(isEnabled);
  const baseUrl = getSiteUrl();

  // Pull SEO data from Sanity with fallbacks
  const metadata = {
    title: contactData?.seo?.metaTitle || 'Contact IIS - Precision Machining Quote & Consultation',
    description: contactData?.seo?.metaDescription || 'Contact Integrated Inspection Systems for precision machining quotes, technical consultations, and project inquiries. AS9100, ISO 9001 certified, ITAR registered facility.',
    keywords: contactData?.seo?.metaKeywords || 'contact IIS, precision machining quote, CNC machining quote, CMM inspection quote, aerospace machining inquiry, technical consultation, metrology services quote, Oregon machining',
    ogImage: contactData?.seo?.ogImage?.asset?.url || null,
    ogImageAlt: contactData?.seo?.ogImage?.alt || 'Contact IIS - Integrated Inspection Systems',
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
      canonical: `${baseUrl}/contact`,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: `${baseUrl}/contact`,
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
