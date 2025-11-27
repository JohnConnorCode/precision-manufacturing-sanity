import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, ArrowLeft, Calendar, Tag, ArrowRight, BookOpen } from 'lucide-react';
import { getResourceBySlug, getAllResources } from '@/sanity/lib/queries';
import { draftMode } from 'next/headers';
import { PortableTextContent } from '@/components/portable-text-components';
import { PremiumButton } from '@/components/ui/premium-button';
import SectionHeader from '@/components/ui/section-header';
import { Card } from '@/components/ui/card';
import AnimatedSection from '@/components/ui/animated-section';
import { typography, cn } from '@/lib/design-system';

// Enable ISR with 1 hour revalidation
export const revalidate = 3600;
export const dynamic = 'force-dynamic';

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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-500/10 border-green-500/20';
      case 'intermediate': return 'text-amber-600 bg-amber-500/10 border-amber-500/20';
      case 'advanced': return 'text-red-600 bg-red-500/10 border-red-500/20';
      default: return 'text-slate-600 bg-slate-500/10 border-slate-500/20';
    }
  };

  // Format category name for display
  const categoryDisplayName = category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb Navigation */}
      <nav className="py-6 px-4 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <Link href="/resources" className="inline-flex items-center text-slate-500 hover:text-blue-600 transition-colors mb-2 group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Resources
          </Link>
          <div className="text-sm text-slate-500">
            <Link href="/resources" className="hover:text-blue-600 transition-colors">Resources</Link>
            <span className="mx-2">/</span>
            <Link href={`/resources/${category}`} className="hover:text-blue-600 transition-colors">{categoryDisplayName}</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900 font-medium">{resource.title}</span>
          </div>
        </div>
      </nav>

      {/* Article Header */}
      <article>
        <AnimatedSection>
          <header className="py-16 md:py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className={`px-3 py-1.5 rounded-full text-sm font-semibold border ${getDifficultyColor(resource.difficulty)}`}>
                  {resource.difficulty ? resource.difficulty.charAt(0).toUpperCase() + resource.difficulty.slice(1) : 'General'}
                </span>
                <div className="flex items-center gap-4 text-slate-500 text-sm">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-blue-500" />
                    {resource.readTime}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    {new Date(resource.publishDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>

              <h1 className={cn(typography.heroHeading, 'mb-6 text-slate-900')}>
                {resource.title}
              </h1>

              <p className={cn(typography.description, 'text-slate-600 mb-8')}>
                {resource.excerpt}
              </p>

              {resource.tags && resource.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {resource.tags.map((tagObj: any) => {
                    const tagText = typeof tagObj === 'string' ? tagObj : tagObj.tag;
                    return (
                      <span key={tagText} className="bg-blue-600/10 text-blue-600 border border-blue-600/20 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5">
                        <Tag className="w-3 h-3" />
                        {tagText}
                      </span>
                    );
                  })}
                </div>
              )}

              {resource.author && (
                <p className={cn(typography.small, 'text-slate-500')}>
                  By <span className="font-semibold text-slate-700">{resource.author}</span>
                </p>
              )}
            </div>
          </header>
        </AnimatedSection>

        {/* Featured Image */}
        {resource.featuredImage?.asset?.url && (
          <AnimatedSection delay={0.15}>
            <section className="py-8 px-4">
              <div className="max-w-4xl mx-auto">
                <div className="relative rounded-2xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)]">
                  <img
                    src={resource.featuredImage.asset.url}
                    alt={resource.featuredImage.alt || resource.title}
                    className="w-full object-cover max-h-[500px]"
                  />
                </div>
                {resource.featuredImage.caption && (
                  <p className="text-center text-sm text-slate-500 mt-4">
                    {resource.featuredImage.caption}
                  </p>
                )}
              </div>
            </section>
          </AnimatedSection>
        )}

        {/* Article Content */}
        <AnimatedSection delay={0.2}>
          <section className="py-12 px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="p-8 md:p-12">
                {resource.content ? (
                  <div className="prose prose-slate prose-lg max-w-none
                    prose-headings:font-bold prose-headings:tracking-tight
                    prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                    prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                    prose-p:leading-relaxed prose-p:text-slate-600
                    prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-slate-900 prose-strong:font-semibold
                    prose-ul:my-4 prose-li:text-slate-600
                    prose-blockquote:border-l-blue-600 prose-blockquote:bg-slate-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
                    prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-slate-800
                    prose-pre:bg-slate-900 prose-pre:text-slate-100">
                    <PortableTextContent value={resource.content} />
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500">No content available for this resource.</p>
                  </div>
                )}
              </Card>
            </div>
          </section>
        </AnimatedSection>

        {/* CTA Section */}
        <AnimatedSection delay={0.4}>
          <section className="py-16 px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-blue-600/10 via-indigo-600/10 to-blue-600/10 border border-blue-600/20 rounded-2xl p-8 md:p-12 text-center">
                <SectionHeader
                  heading="Ready to Get Started?"
                  gradientWordPosition="last"
                  description="Contact us to discuss your precision manufacturing needs and learn how we can help bring your project to life."
                  className="mb-8"
                />
                <Link href="/contact">
                  <PremiumButton size="lg" variant="default">
                    Contact Us Today
                    <ArrowRight className="ml-2 h-4 w-4" />
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
