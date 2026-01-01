import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, ArrowLeft, Calendar, Tag, ArrowRight, User, BookOpen } from 'lucide-react';
import { getResourceBySlug, getAllResources } from '@/sanity/lib/queries';
import { draftMode } from 'next/headers';
import { PortableTextContent } from '@/components/portable-text-components';
import { PremiumButton } from '@/components/ui/premium-button';
import SectionHeader from '@/components/ui/section-header';
import { Card } from '@/components/ui/card';
import HeroSection from '@/components/ui/hero-section';
import AnimatedSection from '@/components/ui/animated-section';
import ResourceCard from '@/components/ui/resource-card';
import { typography, spacing, cn } from '@/lib/design-system';

// Enable ISR with 1 hour revalidation
export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const resources = await getAllResources();
    if (!resources || resources.length === 0) return [];
    return resources.map((resource: any) => ({
      category: typeof resource.category === 'string' ? resource.category : (resource.category?.name || 'general'),
      slug: resource.slug?.current || resource.slug,
    }));
  } catch (error) {
    console.warn('Failed to generate static params for resources:', error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  const resource = await getResourceBySlug(slug, isEnabled);

  if (!resource) {
    return {
      title: 'Resource Not Found | IIS',
      description: 'The requested resource could not be found.',
    };
  }

  return {
    title: resource.seo?.metaTitle || `${resource.title} | IIS`,
    description: resource.seo?.metaDescription || resource.excerpt,
    openGraph: {
      title: resource.seo?.metaTitle || resource.title,
      description: resource.seo?.metaDescription || resource.excerpt,
      images: resource.featuredImage?.asset?.url ? [{ url: resource.featuredImage.asset.url }] : undefined,
    },
  };
}

export default async function ResourcePage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  const { isEnabled } = await draftMode();
  const resource = await getResourceBySlug(slug, isEnabled);

  if (!resource) {
    notFound();
  }

  // Fetch related resources (same category, excluding current)
  const allResources = await getAllResources();
  const relatedResources = allResources
    .filter((r: any) => {
      const rCategory = typeof r.category === 'string' ? r.category : r.category?.name;
      const rSlug = r.slug?.current || r.slug;
      return rCategory === category && rSlug !== slug;
    })
    .slice(0, 3)
    .map((r: any) => ({
      ...r,
      slug: r.slug?.current || r.slug,
    }));

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'intermediate': return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      case 'advanced': return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/30';
    }
  };

  // Format category name for display
  const categoryDisplayName = category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const heroImage = resource.featuredImage?.asset?.url || '';

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Featured Image */}
      <HeroSection
        backgroundImage={heroImage}
        imageAlt={resource.featuredImage?.alt || resource.title}
        height="medium"
        alignment="center"
        darkHero={true}
        badge={{ text: categoryDisplayName.toUpperCase() }}
        title={
          <span className="text-inherit">{resource.title}</span>
        }
        description={
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-300 text-sm md:text-base">
            {resource.difficulty && (
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(resource.difficulty)}`}>
                {resource.difficulty.charAt(0).toUpperCase() + resource.difficulty.slice(1)}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-blue-400" />
              {resource.readTime}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-blue-400" />
              {new Date(resource.publishDate || new Date()).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            {resource.author && (
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-blue-400" />
                {resource.author}
              </span>
            )}
          </div>
        }
        titleSize="lg"
      />

      {/* Breadcrumb Navigation */}
      <AnimatedSection>
        <nav className="py-4 px-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
          <div className={spacing.container}>
            <Link href="/resources" className="inline-flex items-center text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-2 group text-sm">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Resources
            </Link>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              <Link href="/resources" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Resources</Link>
              <span className="mx-2">/</span>
              <Link href={`/resources/${category}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{categoryDisplayName}</Link>
              <span className="mx-2">/</span>
              <span className="text-slate-900 dark:text-tone-inverse font-medium truncate">{resource.title}</span>
            </div>
          </div>
        </nav>
      </AnimatedSection>

      {/* Article Content */}
      <article>
        {/* Excerpt & Tags */}
        <AnimatedSection delay={0.1}>
          <section className="py-12 px-4 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
            <div className="max-w-4xl mx-auto">
              <p className={cn(typography.lead, 'text-slate-600 dark:text-slate-300 mb-6 text-center')}>
                {resource.excerpt}
              </p>

              {resource.tags && resource.tags.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2">
                  {resource.tags.map((tagObj: any) => {
                    const tagText = typeof tagObj === 'string' ? tagObj : tagObj.tag;
                    if (!tagText) return null;
                    return (
                      <span key={tagText} className="bg-blue-600/10 text-blue-600 dark:text-blue-400 border border-blue-600/20 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5">
                        <Tag className="w-3 h-3" />
                        {tagText}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        </AnimatedSection>

        {/* Featured Image (if exists and different from hero) */}
        {resource.featuredImage?.asset?.url && resource.featuredImage.caption && (
          <AnimatedSection delay={0.15}>
            <section className="py-8 px-4">
              <div className="max-w-4xl mx-auto">
                <div className="relative rounded-2xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)]">
                  <Image
                    src={resource.featuredImage.asset.url}
                    alt={resource.featuredImage.alt || resource.title}
                    width={1200}
                    height={600}
                    className="w-full object-cover"
                  />
                </div>
                <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-4 italic">
                  {resource.featuredImage.caption}
                </p>
              </div>
            </section>
          </AnimatedSection>
        )}

        {/* Main Content */}
        <AnimatedSection delay={0.2}>
          <section className="py-12 md:py-16 px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="p-8 md:p-12 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700 shadow-lg">
                {resource.content ? (
                  <div className="prose prose-slate prose-lg max-w-none dark:prose-invert
                    prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900 dark:prose-headings:text-tone-inverse
                    prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-slate-200 dark:prose-h2:border-slate-700 prose-h2:pb-3
                    prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                    prose-p:leading-relaxed prose-p:text-slate-600 dark:prose-p:text-slate-300
                    prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-slate-900 dark:prose-strong:text-tone-inverse prose-strong:font-semibold
                    prose-ul:my-4 prose-li:text-slate-600 dark:prose-li:text-slate-300 prose-li:marker:text-blue-600
                    prose-ol:my-4
                    prose-blockquote:border-l-4 prose-blockquote:border-blue-600 prose-blockquote:bg-slate-50 dark:prose-blockquote:bg-slate-800/50 prose-blockquote:py-3 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-slate-600 dark:prose-blockquote:text-slate-300
                    prose-code:bg-slate-100 dark:prose-code:bg-slate-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-slate-800 dark:prose-code:text-slate-200 prose-code:text-sm prose-code:font-mono
                    prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:rounded-xl prose-pre:shadow-lg
                    prose-img:rounded-xl prose-img:shadow-lg">
                    <PortableTextContent value={resource.content} />
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-500 dark:text-slate-400">No content available for this resource.</p>
                  </div>
                )}
              </Card>
            </div>
          </section>
        </AnimatedSection>

        {/* Related Resources */}
        {relatedResources.length > 0 && (
          <AnimatedSection delay={0.3}>
            <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
              <div className={spacing.container}>
                <SectionHeader
                  eyebrow="Continue Learning"
                  heading="Related Resources"
                  gradientWordPosition="last"
                  description={`More articles in ${categoryDisplayName}`}
                  className="mb-12"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {relatedResources.map((related: any, index: number) => (
                    <AnimatedSection key={related._id} delay={0.1 * index}>
                      <ResourceCard resource={related} />
                    </AnimatedSection>
                  ))}
                </div>

                <div className="text-center mt-12">
                  <Link href="/resources">
                    <PremiumButton variant="secondary" size="lg">
                      View All Resources
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </PremiumButton>
                  </Link>
                </div>
              </div>
            </section>
          </AnimatedSection>
        )}

        {/* CTA Section */}
        <AnimatedSection delay={0.4}>
          <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 dark-section">
            <div className="max-w-4xl mx-auto text-center">
              <SectionHeader
                eyebrow="Ready to Start?"
                heading="Apply What You've Learned"
                gradientWordPosition="last"
                description="Contact us to discuss your precision manufacturing needs and learn how we can help bring your project to life."
                className="[&_h2]:text-tone-inverse [&_p]:text-slate-300 mb-8"
              />
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <PremiumButton size="lg">
                    Get a Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </PremiumButton>
                </Link>
                <Link href="/services">
                  <PremiumButton size="lg" variant="secondary">
                    Explore Services
                  </PremiumButton>
                </Link>
              </div>
            </div>
          </section>
        </AnimatedSection>
      </article>
    </div>
  );
}
