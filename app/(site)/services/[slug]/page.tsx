import { getServiceBySlug, getAllServices } from '@/sanity/lib/queries';
import { ServiceContent } from '../service-content';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/theme';
import { theme } from '@/lib/theme';
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
  const serviceData = await getServiceBySlug(slug);

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
  const services = await getAllServices();
  return services.map((service: any) => ({
    slug: service.slug?.current || service.slug,
  }));
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const serviceData = await getServiceBySlug(slug);

  if (!serviceData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className={cn(theme.typography.h1, 'mb-4')}>Service Not Found</h1>
          <p className={cn(theme.typography.body, 'text-slate-600 mb-8')}>
            The service you're looking for could not be found.
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
