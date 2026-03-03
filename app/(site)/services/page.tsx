import { Button } from '@/components/ui/button';
import { PremiumButton } from '@/components/ui/premium-button';
import { Card } from '@/components/ui/card';
import HeroSection from '@/components/ui/hero-section';
import { typography, spacing, styles, cn } from '@/lib/design-system';
import { ArrowRight, Award } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllServices, getPageContent, getServicesPage } from '@/sanity/lib/queries';
import AnimatedSection from '@/components/ui/animated-section';
import { NoServicesState } from '@/components/ui/empty-state';
import type { Metadata } from 'next';
import type { ServiceItem, ServiceCapability, QualityAssuranceItem, CMSButton, ServiceSpec, PortableTextBlock } from '@/lib/types/cms';
import { draftMode } from 'next/headers';
import { portableTextToPlainTextMemoized as portableTextToPlainText } from '@/lib/performance';

// Defensive converter: accepts strings, PT arrays, or simple objects
function toPlainText(value: string | PortableTextBlock[] | { text?: string; spec?: string; label?: string } | null | undefined): string {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return portableTextToPlainText(value);
  if (typeof value === 'object') {
    // Common patterns: {text}, {spec}, {label}
    return value.text || value.spec || value.label || '';
  }
  return String(value ?? '');
}

// ISR for automatic updates when Sanity content changes (supports draft mode preview)
export const revalidate = 60;

// Comprehensive SEO metadata with social sharing optimization - pulls from Sanity CMS
export async function generateMetadata(): Promise<Metadata> {
  const servicesPage = await getServicesPage();
  const baseUrl = 'https://iismet.com';
  const pageUrl = `${baseUrl}/services`;

  // Pull SEO data from Sanity with fallbacks
  const seoTitle = servicesPage?.seo?.metaTitle || 'Precision Machining Services | 5-Axis CNC, Metrology, Engineering | IIS';
  const seoDescription = servicesPage?.seo?.metaDescription || 'Advanced machining services: 5-axis CNC machining, precision metrology, adaptive machining, engineering support. AS9100D certified, ±0.0001" tolerances, 150+ materials. ITAR registered for aerospace & defense.';
  const seoKeywords = servicesPage?.seo?.keywords?.join(', ') || 'precision machining, 5-axis CNC machining, metrology services, CMM inspection, adaptive machining, engineering services, AS9100D, ITAR, aerospace machining, defense machining, tight tolerance machining';
  const ogImage = servicesPage?.seo?.ogImage?.asset?.url || null;
  const ogImageAlt = servicesPage?.seo?.ogImage?.alt || 'IIS - Integrated Inspection Systems Services - CNC Machining and Metrology';

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
      siteName: 'IIS - Integrated Inspection Systems',
      title: seoTitle,
      description: seoDescription,
      images: ogImage ? [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
          type: 'image/jpeg',
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@iisprecision',
      creator: '@iisprecision',
      title: seoTitle,
      description: seoDescription,
      images: ogImage ? [ogImage] : [],
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
  const { isEnabled: isDraft } = await draftMode();
  // Parallel data fetching - 2x faster than sequential
  const [services, servicesPageData, pageContent] = await Promise.all([
    getAllServices(isDraft),
    getServicesPage(isDraft),
    getPageContent(isDraft)
  ]);

  const sharedServicesPage = pageContent?.servicesPage;

  // Format services with slug and plain text description
  const formattedServices = services?.map((service: ServiceItem, _slug: number) => {
    const slugStr = typeof service.slug === 'string' ? service.slug : service.slug?.current || '';
    return {
      ...service,
      slug: slugStr,
      description: toPlainText(service.shortDescription) || portableTextToPlainText(service.description),
      href: `/services/${slugStr}`,
    };
  }) || [];

  const capabilities = (servicesPageData?.content?.capabilities || []).filter(
    (capability: ServiceCapability) => capability?.label && capability?.value && capability?.description
  );

  const qualityAssurance = (servicesPageData?.content?.qualityAssurance || []).filter(
    (item: QualityAssuranceItem) => item?.title
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
  const _heroBadge =
    servicesPageData?.hero?.badge ||
    sharedServicesPage?.hero?.badge;
  const heroButtonsSource = (servicesPageData?.hero?.buttons && servicesPageData.hero.buttons.length > 0)
    ? servicesPageData.hero.buttons
    : sharedServicesPage?.hero?.buttons || [];
  const heroButtons = heroButtonsSource
    .filter((button: CMSButton) => button?.enabled !== false && button?.label && button?.href)
    .map((button: CMSButton) => ({
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
    servicesPageData?.content?.qualitySectionTitle ||
    sharedServicesPage?.qualityHeading;

  const ctaHeading =
    servicesPageData?.cta?.heading ||
    sharedServicesPage?.cta?.heading;
  const ctaDescription =
    servicesPageData?.cta?.description ||
    sharedServicesPage?.cta?.description;
  const ctaButtons = (Array.isArray(servicesPageData?.cta?.buttons) && servicesPageData.cta.buttons.length > 0)
    ? servicesPageData.cta.buttons
        .filter((button: CMSButton) => button?.enabled !== false && button?.label && button?.href)
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
          title={(() => {
            // Using inline styles for WebKit compatibility (Tailwind text-transparent doesn't work)
            const gradientStyle = {
              background: 'linear-gradient(to right, #3b82f6, #4f46e5)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            } as React.CSSProperties;

            if (!heroHeading) return '';
            // Split title to highlight last word in gradient (matches detail pages)
            const words = heroHeading.split(' ');
            if (words.length === 1) {
              return <span style={gradientStyle}>{heroHeading}</span>;
            }
            const firstPart = words.slice(0, -1).join(' ');
            const lastWord = words[words.length - 1];
            return (
              <span>
                <span className="text-inherit">{firstPart} </span>
                <span style={gradientStyle}>{lastWord}</span>
              </span>
            );
          })()}
          description={heroDescription}
          buttons={heroButtons}
          height="large"
          alignment="center"
          showScrollIndicator
        />
      )}

      {/* Capabilities Overview - only show if there are enabled capabilities */}
      {capabilities.filter((c: ServiceCapability) => c?.enabled !== false).length > 0 && (
        <section id="capabilities" className="py-24 md:py-32 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
          <div className={spacing.container}>
            <AnimatedSection>
              {(() => {
                const filteredCaps = capabilities.filter((c: ServiceCapability) => c?.enabled !== false);
                const count = filteredCaps.length;
                return (
                  <div className={cn(
                    'grid gap-6 md:gap-8',
                    count === 1 && 'grid-cols-1 max-w-md mx-auto',
                    count === 2 && 'grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto',
                    count === 3 && 'grid-cols-1 md:grid-cols-3',
                    count === 4 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
                    count === 5 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5',
                    count === 6 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
                    count > 6 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
                  )}>
                    {filteredCaps.map((capability: ServiceCapability) => (
                      <div
                        key={capability.label}
                        className="text-center"
                      >
                        <div className="text-3xl md:text-4xl font-bold" style={{
                          background: 'linear-gradient(to right, #3b82f6, #4f46e5)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}>
                          {capability.value}
                        </div>
                        <div className={cn(typography.badge, "text-slate-700 dark:text-slate-300 mb-2")}>
                          {capability.label}
                        </div>
                        <div className={typography.small}>
                          {capability.description}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
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

          {formattedServices.length === 0 ? (
            <NoServicesState />
          ) : (
          <div className={styles.grid2Col}>
            {formattedServices.map((service: ServiceItem & { href: string; description: string }, index: number) => {
              // Extract image URL safely
              const imageUrl = typeof service.image === 'string' ? service.image : service.image?.asset?.url;

              return (
              <AnimatedSection key={service.title} delay={index * 0.1}>
                <Card className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_20px_-5px_rgba(0,0,0,0.1)] dark:shadow-slate-950/50 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] hover:border-slate-300/80 dark:hover:border-slate-600 transition-all duration-300 group h-full overflow-hidden">
                  {imageUrl && (
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
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
                        {service.specs.slice(0,4).map((spec: string | ServiceSpec, idx: number) => (
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
          )}
        </div>
      </section>

      {(qualityIntro || qualityAssurance.length > 0) && (
        <section className="py-24 md:py-32 lg:py-20 bg-slate-900 dark-section">
          <div className={spacing.container}>
            <AnimatedSection>
              <div className="text-center mb-12">
                {qualityHeading && (
                  <h2 className={cn(typography.subsectionTitle, "mb-4 text-tone-inverse")}>{qualityHeading}</h2>
                )}
                {qualityIntro && (
                  <p className={cn(typography.description, "max-w-3xl mx-auto text-slate-300")}>
                    {qualityIntro}
                  </p>
                )}
              </div>
            </AnimatedSection>

            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-center">
              <AnimatedSection>
                <div className="space-y-4 text-center lg:text-left">
                  {qualityAssurance
                    .filter((item: QualityAssuranceItem) => item?.enabled !== false)
                    .map((item: QualityAssuranceItem) => (
                    <div
                      key={item.title}
                      className="flex items-start gap-3"
                    >
                      <Award className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span className={cn(typography.body, "text-slate-200")}>{item.title}</span>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              {qualityImageUrl && (
                <AnimatedSection delay={0.2}>
                  <div className="relative h-[360px] rounded-2xl overflow-hidden">
                    <Image
                      src={qualityImageUrl}
                      alt={qualityImageAlt || ''}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/20 to-slate-950/60" />
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
                  {ctaButtons.map((button: CMSButton, index: number) => (
                    button.variant === 'secondary' ? (
                      <Button
                        key={`${button.label}-${index}`}
                        size="lg"
                        className={styles.ctaSecondary}
                        variant="outline"
                        asChild
                      >
                        <Link href={button.href || '#'}>
                          {button.label || button.text}
                        </Link>
                      </Button>
                    ) : (
                      <Link key={`${button.label}-${index}`} href={button.href || '#'}>
                        <PremiumButton size="lg">
                          {button.label || button.text}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </PremiumButton>
                      </Link>
                    )
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
