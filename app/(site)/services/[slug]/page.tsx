import { getServiceBySlug, getAllServices } from '@/sanity/lib/queries';
import { draftMode } from 'next/headers';
import { ServiceContent } from '../service-content';
import { Button } from '@/components/ui/button';
import { typography, cn } from '@/lib/design-system';
import Link from 'next/link';

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

  return {
    title: serviceData.seo?.metaTitle || serviceData.title,
    description: serviceData.seo?.metaDescription || serviceData.description,
    openGraph: {
      title: serviceData.seo?.metaTitle || serviceData.title,
      description: serviceData.seo?.metaDescription || serviceData.description,
    },
  };
}

// No build-time path generation; resolve at request time

export async function generateStaticParams() {
  try {
    const services = await getAllServices();
    if (!services || services.length === 0) return [];
    return services.map((service: any) => ({
      slug: service.slug?.current || service.slug,
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
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className={cn(typography.h1, 'mb-4')}>Service Not Found</h1>
          <p className={cn(typography.body, 'text-slate-600 mb-8')}>
            The service you&apos;re looking for could not be found.
          </p>
          <Button asChild>
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    );
  }

  return <ServiceContent serviceData={serviceData} slug={slug} />;
}
