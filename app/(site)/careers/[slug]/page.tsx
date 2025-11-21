import { notFound } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import JobContent from './job-content';

export const revalidate = 3600; // Revalidate every hour

async function getSiteSettings() {
  const query = `*[_type == "siteSettings"][0] {
    hrEmail,
    contact {
      phone,
      email
    }
  }`;
  return await client.fetch(query);
}

async function getJobBySlug(slug: string) {
  const query = `*[_type == "jobPosting" && slug.current == $slug && published == true][0] {
    _id,
    title,
    department,
    location,
    employmentType,
    salaryRange,
    slug,
    overview,
    responsibilities,
    qualifications,
    preferredQualifications,
    benefits,
    applicationEmail,
    applicationInstructions,
    published,
    datePosted
  }`;

  return await client.fetch(query, { slug });
}

async function getAllJobs() {
  const query = `*[_type == "jobPosting" && published == true] {
    "slug": slug.current
  }`;
  return await client.fetch(query);
}

export async function generateStaticParams() {
  const jobs = await getAllJobs();
  return jobs.map((job: any) => ({
    slug: job.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);

  if (!job) {
    return {
      title: 'Job Not Found',
    };
  }

  return {
    title: `${job.title} - Careers at IIS`,
    description: job.overview || `Join our team as a ${job.title} in ${job.department}`,
    openGraph: {
      title: `${job.title} - Careers at IIS`,
      description: job.overview || `Join our team as a ${job.title}`,
    },
  };
}

export default async function JobPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [job, siteSettings] = await Promise.all([
    getJobBySlug(slug),
    getSiteSettings()
  ]);

  if (!job) {
    notFound();
  }

  return <JobContent job={job} siteSettings={siteSettings} />;
}
