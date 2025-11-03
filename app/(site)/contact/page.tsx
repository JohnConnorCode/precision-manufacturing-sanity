import ContactPageClient from './page-client';
import { getContact } from '@/sanity/lib/queries';

// Force static generation for INSTANT routing (no server delays)
export const dynamic = 'force-static';
export const revalidate = false; // Fully static, rebuild on deploy

export default async function ContactPage() {
  // Fetch data from CMS
  const contactData = await getContact();

  return <ContactPageClient data={contactData as any} />;
}

// Generate metadata for SEO
export async function generateMetadata() {
  const baseUrl = 'https://iismet.com';

  const metadata = {
    title: 'Contact IIS - Precision Manufacturing Quote & Consultation',
    description: 'Contact Integrated Inspection Systems for precision manufacturing quotes, technical consultations, and project inquiries. AS9100, ISO 9001 certified, ITAR registered. 24-hour quote response.',
    keywords: 'contact IIS, precision manufacturing quote, CNC machining quote, CMM inspection quote, aerospace manufacturing inquiry, technical consultation, metrology services quote, Oregon manufacturing',
    ogImage: `${baseUrl}/og-image-contact.jpg`
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
      canonical: `${baseUrl}/contact`,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: `${baseUrl}/contact`,
      siteName: 'IIS Precision Manufacturing',
      title: metadata.title,
      description: metadata.description,
      images: [
        {
          url: metadata.ogImage,
          width: 1200,
          height: 630,
          alt: 'Contact IIS Precision Manufacturing',
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
