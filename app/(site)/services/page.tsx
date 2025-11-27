import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import HeroSection from '@/components/ui/hero-section';
import { typography, spacing, styles, overlays, cn } from '@/lib/design-system';
import { ArrowRight, Award } from 'lucide-react';
import Link from 'next/link';
import ParallaxImagePro from '@/components/ui/parallax-image-pro';
import { getAllServices, getPageContent, getServicesPage } from '@/sanity/lib/queries';
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
  const [services, servicesPageData, pageContent] = await Promise.all([
    getAllServices(),
    getServicesPage(),
    getPageContent()
  ]);

  const sharedServicesPage = pageContent?.servicesPage;

  // Format services with slug and plain text description
  const formattedServices = services?.map((service: any, _slug: number) => ({
    ...service,
    slug: service.slug?.current || service.slug,
    description: toPlainText(service.shortDescription) || portableTextToPlainText(service.description),
    href: `/services/${service.slug?.current || service.slug}`,
  })) || [];

  const capabilities = (servicesPageData?.content?.capabilities || []).filter(
    (capability: any) => capability?.label && capability?.value && capability?.description
  );

  const qualityAssurance = (servicesPageData?.content?.qualityAssurance || []).filter(
    (item: any) => item?.title
  );

  const heroBackgroundImage =
    servicesPageData?.hero?.backgroundImage?.asset?.url ||
    sharedServicesPage?.hero?.backgroundImage?.asset?.url ||
    sharedServicesPage?.hero?.backgroundImageUrl;
  const heroImageAlt =
    servicesPageData?.hero?.backgroundImage?.alt ||
    sharedServicesPage?.hero?.backgroundImage?.alt ||
    '';
  const heroHeading =
    servicesPageData?.hero?.heading ||
    sharedServicesPage?.hero?.title ||
    sharedServicesPage?.hero?.heading;
  const heroDescription =
    servicesPageData?.hero?.description ||
    sharedServicesPage?.hero?.description;
  const heroBadge =
    servicesPageData?.hero?.badge ||
    sharedServicesPage?.hero?.badge;
  const heroButtonsSource = (servicesPageData?.hero?.buttons && servicesPageData.hero.buttons.length > 0)
    ? servicesPageData.hero.buttons
    : sharedServicesPage?.hero?.buttons || [];
  const heroButtons = heroButtonsSource
    .filter((button: any) => button?.enabled !== false && button?.label && button?.href)
    .map((button: any) => ({
      label: button.label,
      href: button.href,
      variant: button.variant as 'primary' | 'secondary' | undefined,
    }));
  const showHero = Boolean(heroHeading || heroDescription || heroBackgroundImage);

  const qualityIntro = sharedServicesPage?.qualityIntro;
  const qualityImageUrl =
    sharedServicesPage?.qualityImage?.asset?.url ||
    sharedServicesPage?.qualityImageUrl;
  const qualityImageAlt = sharedServicesPage?.qualityImage?.alt || '';
  const qualityHeading =
    (servicesPageData as any)?.content?.qualitySectionTitle ||
    (sharedServicesPage as any)?.qualityHeading;

  const ctaHeading =
    servicesPageData?.cta?.heading ||
    sharedServicesPage?.cta?.heading;
  const ctaDescription =
    servicesPageData?.cta?.description ||
    sharedServicesPage?.cta?.description;
  const ctaButtons = (Array.isArray(servicesPageData?.cta?.buttons) && servicesPageData.cta.buttons.length > 0)
    ? servicesPageData.cta.buttons
        .filter((button: any) => button?.enabled !== false && button?.label && button?.href)
    : [
        sharedServicesPage?.cta?.primaryButton
          ? { ...sharedServicesPage.cta.primaryButton, variant: 'primary' }
          : null,
        sharedServicesPage?.cta?.secondaryButton
          ? { ...sharedServicesPage.cta.secondaryButton, variant: 'secondary' }
          : null,
      ].filter(Boolean) as Array<{ label: string; href: string; variant?: string }>;
  const showCta = Boolean(ctaHeading || ctaDescription || ctaButtons.length);

  return (
    <div className="min-h-screen bg-background">
      {showHero && (
        <HeroSection
          backgroundImage={heroBackgroundImage || ''}
          imageAlt={heroImageAlt}
          badge={heroBadge ? { text: heroBadge } : undefined}
          title={
            heroHeading ? (
              <span className="text-white">{heroHeading}</span>
            ) : (
              ''
            )
          }
          description={heroDescription}
          buttons={heroButtons}
          height="large"
          alignment="center"
        />
      )}

      {/* Capabilities Overview - only show if there are enabled capabilities */}
      {capabilities.filter((c: any) => c?.enabled !== false).length > 0 && (
        <section id="capabilities" className="py-24 md:py-32 bg-gradient-to-b from-slate-50 to-white">
          <div className={spacing.container}>
            <AnimatedSection>
              <div className={styles.grid4Col}>
                {capabilities
                  .filter((capability: any) => capability?.enabled !== false)
                  .map((capability: any) => (
                  <div
                    key={capability.label}
                    className="text-center"
                  >
                    <div className={styles.statValue}>
                      {capability.value}
                    </div>
                    <div className={cn(typography.badge, "text-slate-700 mb-2")}>
                      {capability.label}
                    </div>
                    <div className={typography.small}>
                      {capability.description}
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Services Grid */}
      <section id="services" className="py-24 md:py-32 lg:py-20">
        <div className={spacing.container}>
          {(servicesPageData?.content?.sectionTitle || servicesPageData?.content?.sectionDescription) && (
            <AnimatedSection>
              <div className="text-center mb-16">
                {servicesPageData?.content?.sectionTitle && (
                  <h2 className={cn(typography.subsectionTitle, "mb-6")}>
                    {servicesPageData.content.sectionTitle}
                  </h2>
                )}
                {servicesPageData?.content?.sectionDescription && (
                  <p className={cn(typography.description, "max-w-3xl mx-auto")}>
                    {servicesPageData.content.sectionDescription}
                  </p>
                )}
              </div>
            </AnimatedSection>
          )}

          <div className={styles.grid2Col}>
            {formattedServices.map((service: any, index: number) => {
              // Extract image URL safely
              const imageUrl = service.image?.asset?.url || service.image;

              return (
              <AnimatedSection key={service.title} delay={index * 0.1}>
                <Card className={cn(styles.featureCard, "group h-full overflow-hidden")}>
                  {imageUrl && (
                    <div className="relative h-64 overflow-hidden">
                      <ParallaxImagePro
                        src={imageUrl}
                        alt={service.title}
                        className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                        speed={0.2}
                        gradient="none"
                      />
                      <div className={`absolute inset-0 ${overlays.card}`} />
                      {/* Optional icon overlay can go here if provided by CMS */}
                    </div>
                  )}

                  <div className="p-8">
                    <h3 className={cn(typography.cardTitle, "mb-4 group-hover:text-blue-600 transition-colors")}>
                      {service.title}
                    </h3>
                    <p className={cn(typography.body, "mb-6")}>
                      {service.description}
                    </p>

                    {Array.isArray(service.specs) && service.specs.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 mb-6">
                        {service.specs.slice(0,4).map((spec: any, idx: number) => (
                          <div key={idx} className={cn("flex items-center", typography.small)}>
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                            {toPlainText(spec)}
                          </div>
                        ))}
                      </div>
                    )}

                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="w-full"
                    >
                      <Link href={service.href}>
                        {service.cardCtaText}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              </AnimatedSection>
            );
            })}
          </div>
        </div>
      </section>

      {(qualityIntro || qualityAssurance.length > 0) && (
        <section className={styles.sectionLight}>
          <div className={spacing.container}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <AnimatedSection>
                <div>
                  {qualityHeading && (
                    <h2 className={cn(typography.subsectionTitle, "mb-6")}>{qualityHeading}</h2>
                  )}
                  {qualityIntro && (
                    <p className={cn(typography.description, "mb-8")}>
                      {qualityIntro}
                    </p>
                  )}

                  <div className="space-y-4">
                    {qualityAssurance
                      .filter((item: any) => item?.enabled !== false)
                      .map((item: any) => (
                      <div
                        key={item.title}
                        className="flex items-center"
                      >
                        <Award className="w-5 h-5 text-slate-600 mr-3" />
                        <span className={typography.body}>{item.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {qualityImageUrl && (
                <AnimatedSection delay={0.2}>
                  <div className="relative">
                    <ParallaxImagePro
                      src={qualityImageUrl}
                      alt={qualityImageAlt || ''}
                      className="w-full h-96 rounded-lg"
                      speed={0.2}
                    />
                  </div>
                </AnimatedSection>
              )}
            </div>
          </div>
        </section>
      )}

      {showCta && (
        <section className={spacing.section}>
          <div className={spacing.container}>
            <AnimatedSection>
              <div className="text-center max-w-4xl mx-auto">
                {ctaHeading && (
                  <h2 className={cn(typography.subsectionTitle, "mb-6")}>
                    {ctaHeading}
                  </h2>
                )}
                {ctaDescription && (
                  <p className={cn(typography.description, "mb-8")}>
                    {ctaDescription}
                  </p>
                )}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {ctaButtons.map((button: any, index: number) => (
                    <Button
                      key={`${button.label}-${index}`}
                      size="lg"
                      className={button.variant === 'secondary' ? styles.ctaSecondary : styles.ctaPrimary}
                      variant={button.variant === 'secondary' ? 'outline' : 'default'}
                      asChild
                    >
                      <Link href={button.href}>
                        {button.label || button.text}
                        {index === 0 && <ArrowRight className="ml-2 h-4 w-4" />}
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}
    </div>
  );
}
