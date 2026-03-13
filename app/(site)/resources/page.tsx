import { getSiteUrl } from '@/lib/site-url';
import HeroSection from '@/components/ui/hero-section';
import ResourceCard from '@/components/ui/resource-card';
import { getAllResources, getPageContent } from '@/sanity/lib/queries';
import { PortableTextContent } from '@/components/portable-text-components';
import AnimatedSection from '@/components/ui/animated-section';
import SectionHeader from '@/components/ui/section-header';
import { NoResourcesState } from '@/components/ui/empty-state';
import { spacing } from '@/lib/design-system';
import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import type { ResourceItem } from '@/lib/types/cms';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';
import { PremiumButton } from '@/components/ui/premium-button';
import { gradientTextStyle } from '@/lib/theme-utils';

// Extended type with fields from the GROQ query that aren't on the base ResourceItem
interface FormattedResource {
  _id: string;
  title: string;
  slug: string;
  category: string;
  excerpt?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  readTime?: string;
  published?: boolean;
  publishedAt?: string;
  author?: string;
  featuredImage?: {
    asset?: { url: string; _id: string };
    alt?: string;
    attribution?: string;
  };
}

// Enable ISR with 60 second revalidation
export const revalidate = 60;

// Comprehensive SEO metadata with social sharing optimization
export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = getSiteUrl();
  const pageUrl = `${baseUrl}/resources`;

  let resources: FormattedResource[] = [];
  try {
    resources = (await getAllResources() || []) as FormattedResource[];
  } catch {
    // Silently fail and use empty array
  }

  // Use the first featured resource image as OG image, or null
  const ogImage: string | null = resources.find(r => r.featuredImage?.asset?.url)?.featuredImage?.asset?.url || null;

  return {
    title: 'Technical Resources & Machining Guides | CNC, Metrology & Quality | IIS',
    description: `${resources.length}+ expert guides on precision machining, CNC processes, metrology, quality control, and industry best practices. Technical articles for aerospace, defense, and advanced industries.`,
    keywords: 'CNC machining guides, metrology tutorials, precision machining resources, quality control best practices, technical articles, aerospace machining guides, GD&T resources, first article inspection guides',
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: pageUrl,
      siteName: 'IIS - Integrated Inspection Systems',
      title: 'Technical Resources & Machining Knowledge Center',
      description: `${resources.length}+ expert guides covering precision machining, metrology, quality control, and inspection excellence.`,
      images: ogImage ? [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'IIS Technical Resources - Machining Knowledge Base',
          type: 'image/jpeg',
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@iisprecision',
      creator: '@iisprecision',
      title: 'Technical Resources | IIS Machining & Inspection',
      description: `${resources.length}+ expert guides on precision machining, metrology, and quality control.`,
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

export default async function ResourcesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { isEnabled: isDraft } = await draftMode();
  const params = await searchParams;
  const activeCategory = params.category || '';

  const [resources, pageContent] = await Promise.all([
    getAllResources(isDraft),
    getPageContent(isDraft),
  ]);

  const formattedResources: FormattedResource[] = resources.map((resource: ResourceItem & Record<string, unknown>) => ({
    ...resource,
    _id: resource._id || '',
    title: resource.title || '',
    category: resource.category || '',
    slug: resource.slug || '',
  })) as FormattedResource[];

  // Extract unique categories
  const categories = Array.from(
    new Set(formattedResources.map((r) => r.category).filter(Boolean))
  ).sort() as string[];

  // Filter by category if active
  const filteredResources = activeCategory
    ? formattedResources.filter((r) => r.category === activeCategory)
    : formattedResources;

  // Featured resource: first resource (or first filtered resource)
  const featured = filteredResources[0];
  const gridResources = filteredResources.slice(1);

  // Format category label
  const formatCategory = (cat: string) =>
    cat.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        backgroundImage={pageContent?.resourcesPage?.hero?.backgroundImageUrl || pageContent?.resourcesPage?.hero?.backgroundImage?.asset?.url || ''}
        imageAlt={pageContent?.resourcesPage?.hero?.backgroundImage?.alt || ''}
        darkHero={true}
        title={(() => {
          if (!pageContent?.resourcesPage?.hero?.title) {
            return '';
          }
          // Split title to highlight last word in blue gradient
          const title = pageContent.resourcesPage.hero.title;
          const words = title.split(' ');
          if (words.length <= 1) {
            return <span style={gradientTextStyle}>{title}</span>;
          }
          const firstPart = words.slice(0, -1).join(' ');
          const lastWord = words[words.length - 1];
          return (
            <span>
              <span className="text-inherit">{firstPart} </span>
              <span style={gradientTextStyle}>{lastWord}</span>
            </span>
          );
        })()}
        description={pageContent?.resourcesPage?.hero?.descriptionRich ? (
          <PortableTextContent value={pageContent.resourcesPage.hero.descriptionRich} />
        ) : (
          pageContent?.resourcesPage?.hero?.description
        )}
        titleSize={pageContent?.resourcesPage?.hero?.titleSize}
        descriptionSize={pageContent?.resourcesPage?.hero?.descriptionSize}
      />

      {/* Articles Section */}
      <section className={`relative ${spacing.section} bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950`}>
        <div className={spacing.containerWide}>
          <AnimatedSection>
            <SectionHeader
              eyebrow={pageContent?.resourcesPage?.header?.eyebrow || `${formattedResources.length}+ Technical Guides`}
              heading={pageContent?.resourcesPage?.header?.title}
              gradientWordPosition="last"
              description={pageContent?.resourcesPage?.header?.description}
            />
          </AnimatedSection>

          {/* Category Filter Pills */}
          {categories.length > 1 && (
            <AnimatedSection delay={0.1}>
              <nav aria-label="Filter resources by category" className="flex flex-wrap justify-center gap-2 mb-12">
                <Link
                  href="/resources"
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    !activeCategory
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  All Resources
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat}
                    href={`/resources?category=${cat}`}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      activeCategory === cat
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                  >
                    {formatCategory(cat)}
                  </Link>
                ))}
              </nav>
            </AnimatedSection>
          )}

          {formattedResources.length === 0 ? (
            <div className="col-span-full">
              <NoResourcesState />
            </div>
          ) : (
            <>
              {/* Featured Resource Card */}
              {featured && (
                <AnimatedSection delay={0.15}>
                  <Link
                    href={`/resources/${featured.category}/${featured.slug}`}
                    className="block group mb-12"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_20px_-5px_rgba(0,0,0,0.1)] dark:shadow-slate-950/50 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] hover:border-slate-300/80 dark:hover:border-slate-600 transition-all duration-300">
                      {/* Image */}
                      <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[320px] overflow-hidden bg-slate-100 dark:bg-slate-800">
                        {featured.featuredImage?.asset?.url ? (
                          <Image
                            src={featured.featuredImage.asset.url}
                            alt={featured.featuredImage?.alt || featured.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            priority
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
                            <BookOpen className="w-16 h-16 text-slate-300 dark:text-slate-600" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {/* Featured badge */}
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/25">
                            Featured
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex flex-col justify-center p-8 lg:p-10">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                            <BookOpen className="w-3 h-3" />
                            {formatCategory(featured.category)}
                          </span>
                          {featured.readTime && (
                            <span className="flex items-center text-slate-500 dark:text-slate-400 text-sm">
                              <Clock className="h-3.5 w-3.5 mr-1 text-blue-500" />
                              {featured.readTime}
                            </span>
                          )}
                        </div>

                        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-tone-inverse mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                          {featured.title}
                        </h3>

                        {featured.excerpt && (
                          <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-3 leading-relaxed">
                            {featured.excerpt}
                          </p>
                        )}

                        <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-semibold">
                          Read Article
                          <ArrowRight className="h-4 w-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              )}

              {/* Resource Grid */}
              {gridResources.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {gridResources.map((resource, index) => (
                    <AnimatedSection key={resource._id} delay={Math.min(index * 0.05, 0.3)}>
                      <ResourceCard
                        resource={resource as unknown as { _id: string; title: string; slug: string; category: string; excerpt?: string; difficulty?: 'beginner' | 'intermediate' | 'advanced'; readTime?: string; featuredImage?: { asset?: { url: string; _id: string }; alt?: string; attribution?: string } }}
                        priority={index < 6}
                      />
                    </AnimatedSection>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className={`relative ${spacing.section} overflow-hidden dark-section`}>
        <div className="absolute inset-0 bg-slate-950">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/50 via-transparent to-indigo-950/50" />
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
          <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
        </div>

        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center relative z-10">
          <AnimatedSection>
            <SectionHeader
              eyebrow={pageContent?.resourcesPage?.cta?.eyebrow}
              heading={pageContent?.resourcesPage?.cta?.heading}
              gradientWordPosition="last"
              description={pageContent?.resourcesPage?.cta?.description}
              className="[&_h2]:text-tone-inverse [&_p]:text-slate-300 mb-10"
            />
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {(pageContent?.resourcesPage?.cta?.buttons || [])
                .filter((btn: { enabled?: boolean }) => btn.enabled !== false)
                .map((btn: { label?: string; href?: string; variant?: string }, i: number) => (
                  <Link key={i} href={btn.href || '/contact'}>
                    <PremiumButton size="lg" variant={(btn.variant as 'default' | 'secondary') || 'default'}>
                      {btn.label}
                      {btn.variant !== 'secondary' && <ArrowRight className="ml-2 h-5 w-5" />}
                    </PremiumButton>
                  </Link>
                ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
