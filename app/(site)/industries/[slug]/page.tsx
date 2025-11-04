import { getIndustryBySlug, getAllIndustries } from '@/sanity/lib/queries';
import { draftMode } from 'next/headers';
import { IndustryContent } from '../industry-content';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/theme';
import { theme } from '@/lib/theme';
import Link from 'next/link';

interface IndustryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Enable ISR with 1 hour revalidation
export const revalidate = 3600;

export async function generateMetadata({ params }: IndustryPageProps) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  const industryData = await getIndustryBySlug(slug, isEnabled);

  if (!industryData) {
    return {
      title: 'Industry Not Found',
      description: 'The requested industry could not be found.',
    };
  }

  return {
    title: industryData.seo?.metaTitle || industryData.title,
    description: industryData.seo?.metaDescription || industryData.description,
    openGraph: {
      title: industryData.seo?.metaTitle || industryData.title,
      description: industryData.seo?.metaDescription || industryData.description,
    },
  };
}

export async function generateStaticParams() {
  const industries = await getAllIndustries();
  return industries.map((industry: any) => ({
    slug: industry.slug?.current || industry.slug,
  }));
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  const industryData = await getIndustryBySlug(slug, isEnabled);

  if (!industryData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className={cn(theme.typography.h1, 'mb-4')}>Industry Not Found</h1>
          <p className={cn(theme.typography.body, 'text-slate-600 mb-8')}>
            The industry you're looking for could not be found.
          </p>
          <Button asChild>
            <Link href="/industries">View All Industries</Link>
          </Button>
        </div>
      </div>
    );
  }

  return <IndustryContent industryData={industryData} slug={slug} />;
}
