import { client } from '@/sanity/lib/client';
import { notFound } from 'next/navigation';
import IndustryDetailPage from '@/components/industries/industry-detail-page';

interface IndustryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Enable ISR with 1 hour revalidation
export const revalidate = 3600;

async function getIndustryBySlug(slug: string) {
  const query = `*[_type == "industry" && slug.current == $slug && published == true][0]{
    _id,
    title,
    slug,
    shortDescription,
    hero,
    stats,
    marketOverview,
    expertise,
    certifications,
    capabilities,
    components,
    applications,
    qualityStandards,
    processBenefits,
    regulatory,
    seo
  }`;

  return await client.fetch(query, { slug });
}

export async function generateMetadata({ params }: IndustryPageProps) {
  const { slug } = await params;
  const industry = await getIndustryBySlug(slug);

  if (!industry) {
    return {
      title: 'Industry Not Found',
      description: 'The requested industry could not be found.',
    };
  }

  return {
    title: industry.seo?.metaTitle || `${industry.title} | Precision Manufacturing`,
    description: industry.seo?.metaDescription || industry.shortDescription,
    openGraph: {
      title: industry.seo?.metaTitle || industry.title,
      description: industry.seo?.metaDescription || industry.shortDescription,
    },
  };
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const industry = await getIndustryBySlug(slug);

  if (!industry) {
    notFound();
  }

  return <IndustryDetailPage industry={industry} />;
}
