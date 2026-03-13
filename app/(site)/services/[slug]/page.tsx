import { getSiteUrl } from '@/lib/site-url';
import { getServiceBySlug, getAllServices } from '@/sanity/lib/queries';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { ServiceContent } from '../service-content';
import { generateBreadcrumbSchema } from '@/lib/structured-data';

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Enable ISR with 1 hour revalidation
export const revalidate = 3600;

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  const serviceData = await getServiceBySlug(slug, isEnabled);

  if (!serviceData) {
    return {
      title: 'Service Not Found',
      description: 'The requested service could not be found.',
    };
  }

  const baseUrl = getSiteUrl();
  const title = serviceData.seo?.metaTitle || serviceData.title;
  const description = serviceData.seo?.metaDescription || serviceData.description;
  const ogImage = serviceData.seo?.ogImage?.asset?.url || serviceData.heroImage?.asset?.url;

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/services/${slug}`,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: `${baseUrl}/services/${slug}`,
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

// No build-time path generation; resolve at request time

export async function generateStaticParams() {
  try {
    const services = await getAllServices();
    if (!services || services.length === 0) return [];
    return services.map((service: { slug?: string }) => ({
      slug: service.slug,
    }));
  } catch (error) {
    console.warn('Failed to generate static params for services:', error);
    return [];
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  const serviceData = await getServiceBySlug(slug, isEnabled);

  if (!serviceData) {
    notFound();
  }

  const baseUrl = getSiteUrl();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: baseUrl },
    { name: 'Services', url: `${baseUrl}/services` },
    { name: serviceData.title, url: `${baseUrl}/services/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ServiceContent serviceData={serviceData} slug={slug} />
    </>
  );
}
