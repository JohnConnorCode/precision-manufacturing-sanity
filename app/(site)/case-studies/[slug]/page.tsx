import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import CaseStudyContent from './case-study-content';
import { client } from '@/sanity/lib/client';

export const revalidate = 60;

// Query for case study
async function getCaseStudy(slug: string, _isDraft: boolean = false) {
  const query = `*[_type == "caseStudy" && slug.current == $slug && published == true][0] {
    title,
    "slug": slug.current,
    subtitle,
    client,
    duration,
    challenge,
    solution,
    results,
    testimonial,
    technologies,
    certifications,
    "heroImage": heroImage.asset->url,
    "heroImageAlt": heroImage.alt,
    "galleryImages": galleryImages[] {
      "url": asset->url,
      alt,
      caption
    },
    industry-> {
      title,
      "slug": slug.current,
      "imageUrl": image.asset->url
    },
    seo
  }`;
  return client.fetch(query, { slug });
}

async function getAllCaseStudies() {
  const query = `*[_type == "caseStudy" && published == true] {
    "slug": slug.current
  }`;
  return client.fetch(query);
}

export async function generateStaticParams() {
  const caseStudies = await getAllCaseStudies();
  return caseStudies.map((study: { slug: string }) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getCaseStudy(slug);

  if (!caseStudy) {
    return {
      title: 'Case Study Not Found',
    };
  }

  return {
    title: caseStudy.seo?.metaTitle || `${caseStudy.title} | Case Study | IIS`,
    description: caseStudy.seo?.metaDescription || caseStudy.challenge?.slice(0, 160),
    openGraph: {
      title: caseStudy.title,
      description: caseStudy.challenge,
      images: caseStudy.heroImage ? [{ url: caseStudy.heroImage }] : [],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { isEnabled: isDraft } = await draftMode();
  const caseStudy = await getCaseStudy(slug, isDraft);

  if (!caseStudy) {
    notFound();
  }

  return <CaseStudyContent data={caseStudy} />;
}
