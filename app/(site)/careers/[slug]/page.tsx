import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import { getJobPostingBySlug, getAllJobPostings, getSiteSettings } from '@/sanity/lib/queries';
import JobContent from './job-content';

// ISR for automatic updates when Sanity content changes (supports draft mode preview)
export const revalidate = 3600;

export async function generateStaticParams() {
  const jobs = await getAllJobPostings();
  return jobs.map((job: any) => ({
    slug: job.slug?.current || job.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { isEnabled: isDraft } = await draftMode();
  const job = await getJobPostingBySlug(slug, isDraft);

  if (!job) {
    return {
      title: 'Job Not Found',
    };
  }

  const baseUrl = 'https://iismet.com';
  const title = `${job.title} - Careers at IIS`;
  const description = job.overview || `Join our team as a ${job.title} in ${job.department}`;

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/careers/${slug}`,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: `${baseUrl}/careers/${slug}`,
      siteName: 'IIS - Integrated Inspection Systems',
      title,
      description,
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function JobPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { isEnabled: isDraft } = await draftMode();
  const [job, siteSettings] = await Promise.all([
    getJobPostingBySlug(slug, isDraft),
    getSiteSettings(isDraft)
  ]);

  if (!job) {
    notFound();
  }

  return <JobContent job={job} siteSettings={siteSettings} />;
}
