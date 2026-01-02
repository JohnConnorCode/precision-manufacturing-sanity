import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, BookOpen } from 'lucide-react';
import { getResourcesByCategory } from '@/sanity/lib/queries';
import HeroSection from '@/components/ui/hero-section';
import AnimatedSection from '@/components/ui/animated-section';
import ResourceCard from '@/components/ui/resource-card';
import SectionHeader from '@/components/ui/section-header';
import { PremiumButton } from '@/components/ui/premium-button';
import { spacing } from '@/lib/design-system';

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

// Static category definitions with images - using actual manufacturing images from Sanity
const categoryDefinitions: Record<string, { title: string; description: string; image?: string }> = {
  'manufacturing-processes': {
    title: 'Manufacturing Processes',
    description: 'Comprehensive guides on precision manufacturing processes, CNC machining, and advanced production techniques.',
    image: 'https://cdn.sanity.io/images/vgacjlhu/production/514525a24860527cf951fd9f65acac15e7d8fb10-1024x1536.png' // 5-axis machining
  },
  'industry-applications': {
    title: 'Industry Applications',
    description: 'Industry-specific manufacturing applications and solutions for aerospace, defense, medical, and energy sectors.',
    image: 'https://cdn.sanity.io/images/vgacjlhu/production/e59c2ca9901e61dce18c6c4d20b38cf807c3a31b-1536x1024.png' // Adaptive machining
  },
  'quality-compliance': {
    title: 'Quality & Compliance',
    description: 'Quality control, inspection standards, and regulatory compliance for precision manufacturing.',
    image: 'https://cdn.sanity.io/images/vgacjlhu/production/a1e0b8424e0f5bfe09ed65269b8745649b0578cf-800x533.jpg' // Metrology
  },
  'material-science': {
    title: 'Material Science',
    description: 'Advanced materials, material properties, and selection guides for precision manufacturing applications.',
    image: 'https://cdn.sanity.io/images/vgacjlhu/production/825642bea34fd176d1b91ff2e8ca5b0ce5870e84-4864x2736.jpg' // Machining
  },
  'calculators-tools': {
    title: 'Calculators & Tools',
    description: 'Useful calculators, estimation tools, and resources for manufacturing professionals.',
    image: 'https://cdn.sanity.io/images/vgacjlhu/production/21a64aa81eb06febd7a23492b477b60edf92cdd3-1536x1024.png' // Engineering
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
      {/* Hero Section with proper dark hero mode */}
      <HeroSection
        backgroundImage={categoryData.image || ''}
        imageAlt={categoryData.title}
        height="medium"
        alignment="center"
        darkHero={true}
        badge={{ text: 'RESOURCES' }}
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
                {formattedResources.map((resource: any, index: number) => (
                  <AnimatedSection key={resource._id} delay={Math.min(index * 0.05, 0.3)}>
                    <ResourceCard resource={resource} />
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
