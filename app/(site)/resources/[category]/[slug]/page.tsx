import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, ArrowLeft, Calendar, Tag, ArrowRight } from 'lucide-react';
import { getResourceBySlug, getAllResources } from '@/sanity/lib/queries';
import { draftMode } from 'next/headers';
import { PortableTextContent } from '@/components/portable-text-components';
import { PremiumButton } from '@/components/ui/premium-button';
import SectionHeader from '@/components/ui/section-header';

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
      case 'beginner': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'intermediate': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'advanced': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
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
      <nav className="py-6 px-4 border-b border-border bg-card/50">
        <div className="max-w-4xl mx-auto">
          <Link href="/resources" className="inline-flex items-center text-muted-foreground hover:text-blue-600 transition-colors mb-2">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Resources
          </Link>
          <div className="text-sm text-muted-foreground">
            <Link href="/resources" className="hover:text-blue-600 transition-colors">Resources</Link>
            <span className="mx-2">/</span>
            <Link href={`/resources/${category}`} className="hover:text-blue-600 transition-colors">{categoryDisplayName}</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium">{resource.title}</span>
          </div>
        </div>
      </nav>

      {/* Article Header */}
      <article>
        <header className="py-12 px-4 bg-gradient-to-b from-background to-slate-50/30 opacity-0 animate-fade-in" style={{ animationFillMode: 'forwards' }}>
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className={`px-3 py-1 rounded-full text-sm border ${getDifficultyColor(resource.difficulty)}`}>
                {resource.difficulty}
              </span>
              <div className="flex items-center gap-4 text-muted-foreground text-sm">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {resource.readTime}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(resource.publishDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-black mb-6 text-foreground leading-tight">
              {resource.title}
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {resource.excerpt}
            </p>

            {resource.tags && resource.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {resource.tags.map((tagObj: any) => {
                  const tagText = typeof tagObj === 'string' ? tagObj : tagObj.tag;
                  return (
                    <span key={tagText} className="bg-blue-600/10 text-blue-600 border border-blue-600/20 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {tagText}
                    </span>
                  );
                })}
              </div>
            )}

            {resource.author && (
              <p className="text-sm text-muted-foreground">
                By <span className="font-medium text-foreground">{resource.author}</span>
              </p>
            )}
          </div>
        </header>

        {/* Featured Image */}
        {resource.featuredImage?.asset?.url && (
          <section className="py-8 px-4 opacity-0 animate-fade-up" style={{ animationDelay: '0.15s', animationFillMode: 'forwards' }}>
            <div className="max-w-4xl mx-auto">
              <img
                src={resource.featuredImage.asset.url}
                alt={resource.featuredImage.alt || resource.title}
                className="w-full rounded-2xl shadow-lg object-cover max-h-[500px]"
              />
              {resource.featuredImage.caption && (
                <p className="text-center text-sm text-muted-foreground mt-3">
                  {resource.featuredImage.caption}
                </p>
              )}
            </div>
          </section>
        )}

        {/* Article Content */}
        <section className="py-8 px-4 opacity-0 animate-fade-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          <div className="max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-sm">
              {resource.content ? (
                <PortableTextContent value={resource.content} />
              ) : (
                <p className="text-slate-500 text-center">No content available for this resource.</p>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 px-4 opacity-0 animate-fade-up" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-600/10 to-indigo-600/10 border border-blue-600/20 rounded-2xl p-8 text-center">
              <SectionHeader
                heading="Ready to Get Started?"
                gradientWordPosition="last"
                description="Contact us to discuss your precision manufacturing needs and learn how we can help bring your project to life."
                className="mb-6"
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
      </article>
    </div>
  );
}
