import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import HeroSection from '@/components/ui/hero-section';
import { PortableTextContent } from '@/components/portable-text-components';
import { theme, styles, cn } from '@/lib/theme';
import { ArrowRight, Award } from 'lucide-react';
import Link from 'next/link';
import ParallaxImagePro from '@/components/ui/parallax-image-pro';
import { getAllServices, getServicesPage } from '@/sanity/lib/queries';
import AnimatedSection from '@/components/ui/animated-section';
import type { Metadata } from 'next';
import { portableTextToPlainTextMemoized as portableTextToPlainText } from '@/lib/performance';

// Defensive converter: accepts strings, PT arrays, or simple objects
function toPlainText(value: any): string {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return portableTextToPlainText(value);
  if (typeof value === 'object') {
    // Common patterns: {text}, {spec}, {label}
    return value.text || value.spec || value.label || '';
  }
  return String(value ?? '');
}

// Force static generation for INSTANT routing (no server delays)
export const dynamic = 'force-static';
export const revalidate = 60; // Revalidate every 60 seconds

// Comprehensive SEO metadata with social sharing optimization - pulls from Sanity CMS
export async function generateMetadata(): Promise<Metadata> {
  const servicesPage = await getServicesPage();
  const baseUrl = 'https://iismet.com';
  const pageUrl = `${baseUrl}/services`;

  // Pull SEO data from Sanity with fallbacks
  const seoTitle = servicesPage?.seo?.metaTitle || 'Precision Manufacturing Services | 5-Axis CNC, Metrology, Engineering | IIS';
  const seoDescription = servicesPage?.seo?.metaDescription || 'Advanced manufacturing services: 5-axis CNC machining, precision metrology, adaptive machining, engineering design. AS9100D certified, ±0.0001" tolerances, 150+ materials. ITAR registered for aerospace & defense.';
  const seoKeywords = servicesPage?.seo?.keywords?.join(', ') || 'precision manufacturing, 5-axis CNC machining, metrology services, CMM inspection, adaptive machining, engineering services, AS9100D, ITAR, aerospace machining, defense manufacturing, tight tolerance machining';
  const ogImage = servicesPage?.seo?.ogImage?.asset?.url || `${baseUrl}/og-image-services.jpg`;
  const ogImageAlt = servicesPage?.seo?.ogImage?.alt || 'IIS Precision Manufacturing Services - CNC Machining and Metrology';

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: pageUrl,
      siteName: 'IIS Precision Manufacturing',
      title: seoTitle,
      description: seoDescription,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
          type: 'image/jpeg',
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@iisprecision',
      creator: '@iisprecision',
      title: seoTitle,
      description: seoDescription,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function ServicesPage() {
  // Parallel data fetching - 2x faster than sequential
  const [services, servicesPageData] = await Promise.all([
    getAllServices(),
    getServicesPage()
  ]);

  // Format services with slug and plain text description
  const formattedServices = services?.map((service: any, _slug: number) => ({
    ...service,
    slug: service.slug?.current || service.slug,
    description: toPlainText(service.shortDescription) || portableTextToPlainText(service.description),
    href: `/services/${service.slug?.current || service.slug}`,
  })) || [];

  // Use CMS data or fallback to defaults
  const capabilities = [
    { label: 'Materials Certified', value: '150+', description: 'Aerospace & defense grade materials' },
    { label: 'Precision Tolerance', value: '±0.0001"', description: 'Guaranteed dimensional accuracy' },
    { label: 'Production Capacity', value: '24/7', description: 'Continuous manufacturing capability' },
    { label: 'Quality System', value: 'AS9100D', description: 'Full aerospace certification' }
  ];

  const qualityAssurance = servicesPageData?.qualityAssurance || [
    { title: 'AS9100D aerospace quality management' },
    { title: 'ISO 9001:2015 certified processes' },
    { title: 'ITAR registered for defense contracts' },
    { title: 'CMMC compliant for cybersecurity' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        backgroundImage={servicesPageData?.hero?.backgroundImage?.asset?.url || 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=2400&q=90'}
        imageAlt={servicesPageData?.hero?.backgroundImage?.alt || 'Advanced manufacturing services - precision CNC machining and quality control'}
        badge={servicesPageData?.hero?.badge ? { text: servicesPageData.hero.badge } : undefined}
        title={
          servicesPageData?.hero?.heading ? (
            <span className="text-white">{servicesPageData.hero.heading}</span>
          ) : (
            <>
              <span className="text-white">Our</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Services</span>
            </>
          )
        }
        description={servicesPageData?.hero?.description || 'Advanced manufacturing capabilities delivering precision components for aerospace, defense, and energy sectors with industry-leading quality standards.'}
        buttons={[
          {
            label: 'Request Quote',
            href: '/contact',
            variant: 'primary'
          },
          {
            label: 'View Core Competencies',
            href: '#capabilities',
            variant: 'secondary'
          }
        ]}
        height="large"
        alignment="center"
      />

      {/* Capabilities Overview */}
      <section id="capabilities" className={styles.sectionLight}>
        <div className={theme.spacing.container}>
          <AnimatedSection>
            <div className={cn(styles.grid4Col, "mb-20")}>
              {capabilities.map((capability: any) => (
                <div
                  key={capability.label}
                  className="text-center"
                >
                  <div className={styles.statValue}>
                    {capability.value}
                  </div>
                  <div className={cn(theme.typography.badge, "text-slate-700 mb-2")}>
                    {capability.label}
                  </div>
                  <div className={theme.typography.small}>
                    {capability.description}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className={theme.spacing.section}>
        <div className={theme.spacing.container}>
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className={cn(theme.typography.h2, "mb-6")}>{servicesPageData?.content?.sectionTitle || 'Manufacturing Core Competencies'}</h2>
              <p className={cn(theme.typography.lead, "max-w-3xl mx-auto")}>
                {servicesPageData?.content?.sectionDescription || 'Comprehensive precision manufacturing services backed by advanced technology and industry certifications.'}
              </p>
            </div>
          </AnimatedSection>

          <div className={styles.grid2Col}>
            {formattedServices.map((service: any, index: number) => (
              <AnimatedSection key={service.title} delay={index * 0.1}>
                <Card className={cn(styles.featureCard, "group h-full overflow-hidden")}>
                  <div className="relative h-64 overflow-hidden">
                    <ParallaxImagePro
                      src={(service.image && service.image.asset && service.image.asset.url) || service.image || 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1600&q=90'}
                      alt={service.title}
                      className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                      speed={0.2}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    {/* Optional icon overlay can go here if provided by CMS */}
                  </div>

                  <div className="p-8">
                    <h3 className={cn(theme.typography.h4, "mb-4 group-hover:text-blue-600 transition-colors")}>
                      {service.title}
                    </h3>
                    <p className={cn(theme.typography.body, "mb-6")}>
                      {service.description}
                    </p>

                    {Array.isArray(service.specs) && service.specs.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 mb-6">
                        {service.specs.slice(0,4).map((spec: any, idx: number) => (
                          <div key={idx} className={cn("flex items-center", theme.typography.small)}>
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                            {toPlainText(spec)}
                          </div>
                        ))}
                      </div>
                    )}

                    <Button
                      asChild
                      variant="outline"
                      className={cn(styles.ctaSecondary, "w-full group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900")}
                    >
                      <Link href={service.href}>
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Assurance Section */}
      <section className={styles.sectionLight}>
        <div className={theme.spacing.container}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div>
                <h2 className={cn(theme.typography.h2, "mb-6")}>Quality Assurance</h2>
                <p className={cn(theme.typography.lead, "mb-8")}>
                  Our comprehensive quality management system ensures every component meets or exceeds specifications with full traceability and documentation.
                </p>

                <div className="space-y-4">
                  {qualityAssurance.map((item: any) => (
                    <div
                      key={item.title}
                      className="flex items-center"
                    >
                      <Award className="w-5 h-5 text-slate-600 mr-3" />
                      <span className={theme.typography.body}>{item.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="relative">
                <ParallaxImagePro
                  src='https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1600&q=90'
                  alt="Quality assurance"
                  className="w-full h-96 rounded-lg"
                  speed={0.2}
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={theme.spacing.section}>
        <div className={theme.spacing.container}>
          <AnimatedSection>
            <div className="text-center max-w-4xl mx-auto">
              <h2 className={cn(theme.typography.h2, "mb-6")}>Ready to Start Your Project?</h2>
              <p className={cn(theme.typography.lead, "mb-8")}>
                Partner with us for precision manufacturing solutions that meet the highest industry standards.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className={styles.ctaPrimary} asChild>
                  <Link href="/contact?interest=quote">
                    Get Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className={styles.ctaSecondary}>
                  <Link href="/contact">
                    Contact Us
                  </Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
