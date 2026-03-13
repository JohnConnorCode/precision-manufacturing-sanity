import { getSiteUrl } from '@/lib/site-url';
import { Button } from '@/components/ui/button';
import { PremiumButton } from '@/components/ui/premium-button';
import HeroSection from '@/components/ui/hero-section';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getIndustriesPage } from '@/sanity/lib/queries';
import AnimatedSection from '@/components/ui/animated-section';
import { NoIndustriesState } from '@/components/ui/empty-state';
import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { spacing, cardStyles, typography, styles } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import { getToneTypography } from '@/lib/typography';
import { gradientTextStyle } from '@/lib/theme-utils';
import { DynamicIcon } from '@/components/ui/dynamic-icon';
import type { CMSButton, IndustryStat, IndustryItem, WhyChooseItem, ProvenResultMetric } from '@/lib/types/cms';

// ISR for automatic updates when Sanity content changes (supports draft mode preview)
export const revalidate = 60;

// Comprehensive SEO metadata with social sharing optimization - pulls from Sanity CMS
export async function generateMetadata(): Promise<Metadata> {
  const { isEnabled: isDraft } = await draftMode();
  const industriesPage = await getIndustriesPage(isDraft);
  const baseUrl = getSiteUrl();
  const pageUrl = `${baseUrl}/industries`;

  // Pull SEO data from Sanity with fallbacks
  const seoTitle = industriesPage?.seo?.metaTitle;
  const seoDescription = industriesPage?.seo?.metaDescription;
  const seoKeywords = industriesPage?.seo?.keywords?.join(', ');
  const ogImage = industriesPage?.seo?.ogImage?.asset?.url || null;
  const ogImageAlt = industriesPage?.seo?.ogImage?.alt || '';

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

export default async function IndustriesPage() {
  const { isEnabled: isDraft } = await draftMode();
  const industriesPageData = await getIndustriesPage(isDraft);

  const darkTone = getToneTypography('dark');

  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        backgroundImage={industriesPageData?.hero?.backgroundImage?.asset?.url || industriesPageData?.hero?.backgroundImageUrl || ''}
        imageAlt={industriesPageData?.hero?.backgroundImage?.alt || ''}
        title={(() => {
          const heading = industriesPageData?.hero?.heading || industriesPageData?.hero?.title || '';
          const highlight = industriesPageData?.hero?.headingHighlight || '';
          const beforeHighlight = heading.replace(highlight, '').trim();

          return (
            <span>
              {beforeHighlight && <span className="text-inherit">{beforeHighlight} </span>}
              <span style={gradientTextStyle}>{highlight}</span>
            </span>
          );
        })()}
        description={industriesPageData?.hero?.subheading}
        buttons={(industriesPageData?.hero?.buttons || []).filter((button: CMSButton) => button?.enabled !== false)}
        height="large"
        alignment="center"
      />

      {/* Key Statistics */}
      {industriesPageData?.content?.overviewStats && industriesPageData.content.overviewStats.length > 0 && (
        <section className={`${spacing.section} bg-slate-50 dark:bg-slate-900`}>
          <div className={spacing.container}>
            <AnimatedSection>
              {(() => {
                const enabledStats = industriesPageData.content.overviewStats.filter((stat: IndustryStat) => stat?.enabled !== false);
                const colClass = enabledStats.length === 3 ? 'lg:grid-cols-3' : enabledStats.length === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-4';
                return (
              <div className={`grid grid-cols-1 md:grid-cols-2 ${colClass} gap-8`}>
                {enabledStats
                  .map((stat: IndustryStat, index: number) => (
                  <div key={index} className="text-center">
                    <div className="text-4xl md:text-5xl font-black text-blue-600 dark:text-blue-400 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm md:text-base text-slate-900 dark:text-tone-inverse font-semibold uppercase tracking-wide mb-2">
                      {stat.label}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {stat.description}
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

      {/* Industries Grid */}
      <section id="industries" className={spacing.section}>
        <div className={spacing.container}>
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className={cn(styles.heading.section, 'mb-6')}>
                {industriesPageData?.content?.industriesSection?.title}
              </h2>
              <p className={cn(typography.description, 'max-w-3xl mx-auto')}>
                {industriesPageData?.content?.industriesSection?.description}
              </p>
            </div>
          </AnimatedSection>

          {(!industriesPageData?.content?.industries || industriesPageData.content.industries.filter((i: IndustryItem) => i?.enabled !== false).length === 0) ? (
            <NoIndustriesState />
          ) : (
          <div className="space-y-12">
            {industriesPageData?.content?.industries
              ?.filter((industry: IndustryItem) => industry?.enabled !== false)
              ?.map((industry: IndustryItem, index: number) => (
              <AnimatedSection key={industry.name} delay={index * 0.15}>
                <div className={cardStyles.base}>
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Image */}
                    {industry.image?.asset?.url && (
                      <div className="relative h-64 md:h-auto">
                        <Image
                          src={industry.image.asset.url}
                          alt={industry.image.alt || industry.name || ''}
                          fill
                          className="object-cover"
                          sizes="(min-width: 768px) 50vw, 100vw"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-8">
                      <h3 className="text-3xl font-bold mb-4">{industry.name}</h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                        {industry.description}
                      </p>

                      <div className="grid sm:grid-cols-2 gap-6 mb-6">
                        {/* Certifications */}
                        {industry.certifications && industry.certifications.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-sm uppercase tracking-wide text-slate-900 dark:text-tone-inverse mb-3">
                              Certifications
                            </h4>
                            <ul className="space-y-2">
                              {industry.certifications.map((cert: string, i: number) => (
                                <li key={i} className="text-sm text-slate-600 dark:text-slate-400 flex items-start">
                                  <span className="text-blue-600 mr-2">•</span>
                                  {cert}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Expertise */}
                        {industry.expertise && industry.expertise.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-sm uppercase tracking-wide text-slate-900 dark:text-tone-inverse mb-3">
                              Expertise
                            </h4>
                            <ul className="space-y-2">
                              {industry.expertise.map((exp: string, i: number) => (
                                <li key={i} className="text-sm text-slate-600 dark:text-slate-400 flex items-start">
                                  <span className="text-blue-600 mr-2">•</span>
                                  {exp}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <Button asChild variant="outline" size="lg">
                        <Link href={`/industries/${industry.slug || (industry.name ?? '').toLowerCase().replace(/\s+/g, '-')}`}>
                          {industry.cardCtaText ? `${industry.cardCtaText} ` : ''}{industry.name}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
          )}
        </div>
      </section>

      {/* Why Choose IIS */}
      {industriesPageData?.content?.whyChooseUs && industriesPageData.content.whyChooseUs.length > 0 && (
        <section className={`${spacing.section} bg-white dark:bg-slate-950`}>
          <div className={spacing.container}>
            <AnimatedSection>
              <div className="text-center mb-16">
                <h2 className={cn(styles.heading.section, 'mb-6')}>
                  {industriesPageData?.content?.whyChooseSection?.title}
                </h2>
                <p className={cn(typography.description, 'max-w-3xl mx-auto')}>
                  {industriesPageData?.content?.whyChooseSection?.description}
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {industriesPageData.content.whyChooseUs
                .filter((item: WhyChooseItem) => item?.enabled !== false)
                .map((item: WhyChooseItem, index: number) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <div className={`${cardStyles.base} p-8 h-full`}>
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center mr-4">
                        <DynamicIcon name={item.icon || 'Circle'} className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                      </div>
                      <h3 className="text-2xl font-bold">{item.title}</h3>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">{item.description}</p>
                    {item.features && item.features.length > 0 && (
                      <div className="space-y-3">
                        {item.features.map((feature: string, i: number) => (
                          <div key={i} className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-3" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Proven Results */}
      {industriesPageData?.content?.provenResults && industriesPageData.content.provenResults.length > 0 && (
        <section className={`${spacing.section} bg-slate-950 dark-section`}>
          <div className={spacing.container}>
            <AnimatedSection>
              <div className="text-center mb-16">
                <h2
                  className={cn(
                    'text-4xl md:text-5xl font-bold mb-6',
                    darkTone.heading
                  )}
                >
                  {industriesPageData?.content?.resultsSection?.title}
                </h2>
                <p
                  className={cn(
                    'text-xl max-w-3xl mx-auto',
                    darkTone.body
                  )}
                >
                  {industriesPageData?.content?.resultsSection?.description}
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {industriesPageData.content.provenResults
                .filter((metric: ProvenResultMetric) => metric?.enabled !== false)
                .map((metric: ProvenResultMetric, index: number) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <div className={`${cardStyles.dark} text-center p-6`}>
                    <div className="text-4xl md:text-5xl font-black text-blue-400 mb-2">
                      {metric.value}
                    </div>
                    <div className={cn('text-lg font-semibold mb-2', darkTone.heading)}>
                      {metric.metric}
                    </div>
                    <p className={cn('text-sm', darkTone.muted)}>{metric.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className={`${spacing.section} bg-slate-50 dark:bg-slate-900`}>
        <div className={spacing.container}>
          <AnimatedSection>
            <div className="text-center max-w-4xl mx-auto">
              <h2 className={cn(styles.heading.section, 'mb-6')}>{industriesPageData?.cta?.heading}</h2>
              <p className={cn(typography.description, 'mb-8')}>
                {industriesPageData?.cta?.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {industriesPageData?.cta?.primaryButton?.enabled !== false && (
                  <Link href={industriesPageData?.cta?.primaryButton?.href || '/contact'}>
                    <PremiumButton size="lg" variant="default">
                      {industriesPageData?.cta?.primaryButton?.label}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </PremiumButton>
                  </Link>
                )}
                {industriesPageData?.cta?.secondaryButton?.enabled !== false && (
                  <Link href={industriesPageData?.cta?.secondaryButton?.href || '/services'}>
                    <PremiumButton size="lg" variant="secondary">
                      {industriesPageData?.cta?.secondaryButton?.label}
                    </PremiumButton>
                  </Link>
                )}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
