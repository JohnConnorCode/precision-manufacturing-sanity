import { getSiteUrl } from '@/lib/site-url';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import CaseStudyContent from './case-study-content';
import { getClient } from '@/sanity/lib/client';

// ISR for automatic updates when Sanity content changes (supports draft mode preview)
export const revalidate = 60;

async function getCaseStudy(slug: string, preview = false) {
  const pub = preview ? '' : ' && published == true';
  const query = `*[_type == "caseStudy" && slug.current == $slug${pub}][0] {
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
  return getClient(preview).fetch(query, { slug });
}

async function getAllCaseStudies() {
  const query = `*[_type == "caseStudy" && published == true] {
    "slug": slug.current
  }`;
  return getClient().fetch(query);
}

async function getRelatedCaseStudies(currentSlug: string, preview = false) {
  const pub = preview ? '' : ' && published == true';
  const query = `*[_type == "caseStudy" && slug.current != $slug${pub}] | order(_createdAt desc) [0...3] {
    title,
    "slug": slug.current,
    subtitle,
    "heroImage": heroImage.asset->url,
    "heroImageAlt": heroImage.alt,
    industry-> {
      title,
      "slug": slug.current
    }
  }`;
  return getClient(preview).fetch(query, { slug: currentSlug });
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
  const { isEnabled: isDraft } = await draftMode();
  const caseStudy = await getCaseStudy(slug, isDraft);

  if (!caseStudy) {
    return {
      title: 'Case Study Not Found',
    };
  }

  const baseUrl = getSiteUrl();
  const title = caseStudy.seo?.metaTitle || `${caseStudy.title} | Case Study | IIS`;
  const description = caseStudy.seo?.metaDescription || caseStudy.challenge?.slice(0, 160);

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/case-studies/${slug}`,
    },
    openGraph: {
      type: 'article',
      locale: 'en_US',
      url: `${baseUrl}/case-studies/${slug}`,
      siteName: 'IIS - Integrated Inspection Systems',
      title,
      description,
      ...(caseStudy.heroImage && { images: [{ url: caseStudy.heroImage, width: 1200, height: 630, alt: title }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(caseStudy.heroImage && { images: [caseStudy.heroImage] }),
    },
    robots: {
      index: true,
      follow: true,
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
  const [caseStudy, relatedCaseStudies] = await Promise.all([
    getCaseStudy(slug, isDraft),
    getRelatedCaseStudies(slug, isDraft),
  ]);

  if (!caseStudy) {
    notFound();
  }

  return <CaseStudyContent data={caseStudy} relatedCaseStudies={relatedCaseStudies} />;
}
