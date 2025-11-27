import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, ArrowRight, ArrowLeft, BookOpen } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { getResourcesByCategory } from '@/sanity/lib/queries';
import AnimatedSection from '@/components/ui/animated-section';
import { typography, spacing, cn } from '@/lib/design-system';

// Enable ISR with 1 hour revalidation
export const revalidate = 3600;

export async function generateStaticParams() {
  return [
    { category: 'manufacturing-processes' },
    { category: 'industry-applications' },
    { category: 'quality-compliance' },
    { category: 'material-science' },
    { category: 'calculators-tools' },
  ];
}

// Static category definitions
const categoryDefinitions: Record<string, { title: string; description: string }> = {
  'manufacturing-processes': {
    title: 'Manufacturing Processes',
    description: 'Comprehensive guides on precision manufacturing processes, CNC machining, and advanced production techniques.'
  },
  'industry-applications': {
    title: 'Industry Applications',
    description: 'Industry-specific manufacturing applications and solutions for aerospace, defense, medical, and energy sectors.'
  },
  'quality-compliance': {
    title: 'Quality & Compliance',
    description: 'Quality control, inspection standards, and regulatory compliance for precision manufacturing.'
  },
  'material-science': {
    title: 'Material Science',
    description: 'Advanced materials, material properties, and selection guides for precision manufacturing applications.'
  },
  'calculators-tools': {
    title: 'Calculators & Tools',
    description: 'Useful calculators, estimation tools, and resources for manufacturing professionals.'
  },
};

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const categoryData = categoryDefinitions[category];

  if (!categoryData) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${categoryData.title} | Technical Resources | IIS`,
    description: categoryData.description,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const categoryData = categoryDefinitions[category];

  if (!categoryData) {
    notFound();
  }

  const resources = await getResourcesByCategory(category) || [];

  // Map Sanity slug structure (slug.current) to simple slug
  const formattedResources = resources.map((resource: any) => ({
    ...resource,
    slug: resource.slug?.current || resource.slug,
  }));

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.08)_0%,_transparent_50%)]" />

        <div className={cn(spacing.containerWide, 'relative z-10')}>
          <AnimatedSection>
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Resources
            </Link>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-600/20 mb-6">
              <BookOpen className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-400">Resources</span>
            </div>

            <h1 className={cn(typography.heroHeading, 'text-white mb-6')}>
              {categoryData.title.split(' ').slice(0, -1).join(' ')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                {categoryData.title.split(' ').slice(-1)}
              </span>
            </h1>

            <p className={cn(typography.descriptionLight, 'max-w-3xl mb-8')}>
              {categoryData.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <span className="bg-slate-800/80 text-slate-300 px-4 py-2 rounded-full text-sm font-medium border border-slate-700">
                {formattedResources.length} {formattedResources.length === 1 ? 'Article' : 'Articles'}
              </span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-slate-50 to-white">
        <div className={spacing.containerWide}>
          {formattedResources.length === 0 ? (
            <AnimatedSection>
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className={cn(typography.h3, 'mb-4')}>No resources found</h3>
                <p className={cn(typography.body, 'mb-8')}>
                  No resources found in this category yet. Check back soon!
                </p>
                <Link
                  href="/resources"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                >
                  Browse All Resources
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </AnimatedSection>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {formattedResources.map((resource: any, index: number) => (
                <AnimatedSection key={resource._id} delay={index * 0.1}>
                  <Link
                    href={`/resources/${category}/${resource.slug}`}
                    className="block h-full group"
                  >
                    <Card className="h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30">
                      <div className="flex items-start justify-between mb-4">
                        <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${
                          resource.difficulty === 'beginner'
                            ? 'bg-green-500/10 text-green-600 border-green-500/20'
                            : resource.difficulty === 'intermediate'
                            ? 'bg-amber-500/10 text-amber-600 border-amber-500/20'
                            : 'bg-red-500/10 text-red-600 border-red-500/20'
                        }`}>
                          {resource.difficulty ? resource.difficulty.charAt(0).toUpperCase() + resource.difficulty.slice(1) : 'General'}
                        </span>
                        <div className="flex items-center text-slate-500 text-sm">
                          <Clock className="h-4 w-4 mr-1.5 text-blue-500" />
                          <span>{resource.readTime}</span>
                        </div>
                      </div>

                      <h3 className={cn(typography.cardTitle, 'mb-3 group-hover:text-blue-600 transition-colors')}>
                        {resource.title}
                      </h3>

                      <p className={cn(typography.small, 'mb-4 line-clamp-2')}>
                        {resource.excerpt}
                      </p>

                      <div className="flex items-center text-blue-600 text-sm font-semibold mt-auto">
                        Read Article
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Card>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
