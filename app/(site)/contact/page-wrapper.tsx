import ContactPageClient from './page-client';
import { getContact } from '@/sanity/lib/queries';

// Force static generation with long revalidation
export const revalidate = 3600;

export default async function ContactPageWrapper() {
  // Fetch data from CMS
  const contactData = await getContact();

  return <ContactPageClient data={contactData as any} />;
}

// Generate metadata for SEO
export async function generateMetadata() {
  const baseUrl = 'https://iismet.com';

  const metadata = {
    title: 'Contact IIS - Precision Machining Quote & Consultation',
    description: 'Contact Integrated Inspection Systems for precision machining quotes, technical consultations, and project inquiries. AS9100, ISO 9001 certified, ITAR registered. 24-hour quote response.',
    keywords: 'contact IIS, precision machining quote, CNC machining quote, CMM inspection quote, aerospace machining inquiry, technical consultation, metrology services quote, Oregon machining',
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
          alt: 'Contact IIS - Integrated Inspection Systems',
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
