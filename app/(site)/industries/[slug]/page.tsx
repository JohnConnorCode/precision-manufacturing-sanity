import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import IndustryDetailPage from '@/components/industries/industry-detail-page';
import { getIndustryBySlug } from '@/sanity/lib/queries';

interface IndustryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// ISR for automatic updates when Sanity content changes (supports draft mode preview)
export const revalidate = 3600;

export async function generateMetadata({ params }: IndustryPageProps) {
  const { slug } = await params;
  const { isEnabled: isDraft } = await draftMode();
  const industry = await getIndustryBySlug(slug, isDraft);

  if (!industry) {
    return {
      title: 'Industry Not Found',
      description: 'The requested industry could not be found.',
    };
  }

  const baseUrl = 'https://iismet.com';
  const title = industry.seo?.metaTitle || `${industry.title} | Precision Machining`;
  const description = industry.seo?.metaDescription || industry.shortDescription;
  const ogImage = industry.seo?.ogImage?.asset?.url || industry.image?.asset?.url;

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/industries/${slug}`,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: `${baseUrl}/industries/${slug}`,
      siteName: 'IIS - Integrated Inspection Systems',
      title,
      description,
      ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630, alt: title }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const { isEnabled: isDraft } = await draftMode();
  const industry = await getIndustryBySlug(slug, isDraft);

  if (!industry) {
    notFound();
  }

  return <IndustryDetailPage industry={industry} />;
}
