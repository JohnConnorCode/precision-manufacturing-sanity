import { getSiteUrl } from '@/lib/site-url';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, BookOpen } from 'lucide-react';
import { draftMode } from 'next/headers';
import { getResourcesByCategory, getResourceCategory, getAllResourceCategories } from '@/sanity/lib/queries';
import HeroSection from '@/components/ui/hero-section';
import AnimatedSection from '@/components/ui/animated-section';
import ResourceCard from '@/components/ui/resource-card';
import SectionHeader from '@/components/ui/section-header';
import { PremiumButton } from '@/components/ui/premium-button';
import { spacing } from '@/lib/design-system';
import type { ResourceItem, ResourceCategoryInfo } from '@/lib/types/cms';

// ISR for automatic updates when Sanity content changes (supports draft mode preview)
export const revalidate = 3600;

export async function generateStaticParams() {
  const categories = await getAllResourceCategories();
  return categories.map((cat: ResourceCategoryInfo & Record<string, unknown>) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const { isEnabled: isDraft } = await draftMode();
  const categoryData = await getResourceCategory(category, isDraft);

  if (!categoryData) {
    return {
      title: 'Category Not Found',
    };
  }

  const baseUrl = getSiteUrl();
  const title = `${categoryData.title} | Technical Resources | IIS`;
  const description = categoryData.description;

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/resources/${category}`,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: `${baseUrl}/resources/${category}`,
      siteName: 'IIS - Integrated Inspection Systems',
      title,
      description,
      ...(categoryData.image && { images: [{ url: categoryData.image, width: 1200, height: 630, alt: categoryData.title }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(categoryData.image && { images: [categoryData.image] }),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const { isEnabled: isDraft } = await draftMode();
  const categoryData = await getResourceCategory(category, isDraft);

  if (!categoryData) {
    notFound();
  }

  const resources = await getResourcesByCategory(category, isDraft) || [];

  // Map Sanity slug structure (slug.current) to simple slug
  const formattedResources = resources.map((resource: ResourceItem & Record<string, unknown>) => ({
    ...resource,
    slug: (typeof resource.slug === 'object' ? resource.slug?.current : resource.slug) || '',
  }));

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with proper dark hero mode */}
      <HeroSection
        backgroundImage={categoryData.image || ''}
        imageAlt={categoryData.imageAlt || categoryData.title}
        height="medium"
        alignment="center"
        darkHero={true}
        title={(() => {
          // Using inline styles for WebKit compatibility (Tailwind text-transparent doesn't work)
          const gradientStyle = {
            background: 'linear-gradient(to right, #3b82f6, #4f46e5)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          } as React.CSSProperties;

          const title = categoryData.title || '';
          const words = title.split(' ');
          if (words.length <= 1) {
            return <span style={gradientStyle}>{title}</span>;
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
        description={categoryData.description}
        buttons={[
          {
            label: 'Back to Resources',
            href: '/resources',
            variant: 'secondary'
          }
        ]}
      />

      {/* Resources Grid */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
        <div className={spacing.containerWide}>
          <AnimatedSection>
            <SectionHeader
              eyebrow={`${formattedResources.length} ${formattedResources.length === 1 ? 'Article' : 'Articles'}`}
              heading={categoryData.title}
              gradientWordPosition="last"
              description="Explore our comprehensive guides and technical resources"
              className="mb-12"
            />
          </AnimatedSection>

          {formattedResources.length === 0 ? (
            <AnimatedSection>
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">No resources found</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-8">
                  No resources found in this category yet. Check back soon!
                </p>
                <Link href="/resources">
                  <PremiumButton>
                    Browse All Resources
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </PremiumButton>
                </Link>
              </div>
            </AnimatedSection>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {formattedResources.map((resource: ResourceItem & { slug: string } & Record<string, unknown>, index: number) => (
                  <AnimatedSection key={resource._id} delay={Math.min(index * 0.05, 0.3)}>
                    <ResourceCard resource={resource as unknown as { _id: string; title: string; slug: string; category: string; excerpt?: string; difficulty?: 'beginner' | 'intermediate' | 'advanced'; readTime?: string; featuredImage?: { asset?: { url: string; _id: string }; alt?: string; attribution?: string } }} />
                  </AnimatedSection>
                ))}
              </div>

              <AnimatedSection delay={0.4}>
                <div className="text-center mt-16">
                  <Link href="/resources">
                    <PremiumButton variant="secondary" size="lg">
                      View All Resources
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </PremiumButton>
                  </Link>
                </div>
              </AnimatedSection>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
