import Link from 'next/link';
import { Clock, ArrowRight, Lightbulb } from 'lucide-react';
import HeroSection from '@/components/ui/hero-section';
import { getAllResources, getPageContent } from '@/sanity/lib/queries';
import { PortableTextContent } from '@/components/portable-text-components';
import AnimatedSection from '@/components/ui/animated-section';
import type { Metadata } from 'next';

// Use dynamic rendering with ISR for reliable builds
export const dynamic = 'force-dynamic';
export const revalidate = 60; // Revalidate every 60 seconds

// Comprehensive SEO metadata with social sharing optimization
export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = 'https://iismet.com';
  const pageUrl = `${baseUrl}/resources`;
  const ogImage = `${baseUrl}/og-image-resources.jpg`;

  let resources = [];
  try {
    resources = await getAllResources() || [];
  } catch (error) {
    console.warn('Failed to fetch resources for metadata:', error);
  }

  return {
    title: 'Technical Resources & Manufacturing Guides | CNC, Metrology & Quality | IIS',
    description: `${resources.length}+ expert guides on precision machining, CNC processes, metrology, quality control, and manufacturing best practices. Technical articles for aerospace, defense, and advanced manufacturing.`,
    keywords: 'CNC machining guides, metrology tutorials, precision manufacturing resources, quality control best practices, manufacturing technical articles, aerospace manufacturing guides, GD&T resources, first article inspection guides',
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: pageUrl,
      siteName: 'IIS Precision Manufacturing',
      title: 'Technical Resources & Manufacturing Knowledge Center',
      description: `${resources.length}+ expert guides covering precision machining, metrology, quality control, and manufacturing excellence.`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'IIS Technical Resources - Manufacturing Knowledge Base',
          type: 'image/jpeg',
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@iisprecision',
      creator: '@iisprecision',
      title: 'Technical Resources | IIS Manufacturing',
      description: `${resources.length}+ expert guides on precision machining, metrology, and quality control.`,
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

export default async function ResourcesPage() {
  const [resources, pageContent] = await Promise.all([
    getAllResources(),
    getPageContent(),
  ]);

  // Map Sanity slug structure (slug.current) to simple slug
  const formattedResources = resources.map((resource: any) => ({
    ...resource,
    slug: resource.slug?.current || resource.slug,
  }));

  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        backgroundImage={pageContent?.resourcesPage?.hero?.backgroundImageUrl || pageContent?.resourcesPage?.hero?.backgroundImage?.asset?.url || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2400&q=90'}
        imageAlt="Technical resources and manufacturing knowledge"
        badge={pageContent?.resourcesPage?.hero?.badge ? { text: pageContent.resourcesPage.hero.badge } : undefined}
        title={
          pageContent?.resourcesPage?.hero?.title ? (
            <span className="text-white">{pageContent.resourcesPage.hero.title}</span>
          ) : (
            <>
              <span className="text-white">Master</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Precision Manufacturing</span>
            </>
          )
        }
        description={pageContent?.resourcesPage?.hero?.descriptionRich ? (
          <PortableTextContent value={pageContent.resourcesPage.hero.descriptionRich} />
        ) : (
          pageContent?.resourcesPage?.hero?.description || `Expert guides, technical specifications, and tools to help you make informed decisions about precision manufacturing for aerospace, defense, medical, and energy applications. ${formattedResources.length} technical articles available.`
        )}
        titleSize={pageContent?.resourcesPage?.hero?.titleSize}
        descriptionSize={pageContent?.resourcesPage?.hero?.descriptionSize}
      />

      {/* Articles Grid */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-background via-slate-50/5 to-background">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-600/20 mb-6">
                <Lightbulb className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-400">{pageContent?.resourcesPage?.header?.eyebrow || 'Browse Knowledge Base'}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {pageContent?.resourcesPage?.header?.title || (<>
                  Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Resources</span>
                </>)}
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {pageContent?.resourcesPage?.header?.description || 'In-depth guides and technical documentation for precision manufacturing excellence'}
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {formattedResources.map((resource: any, index: number) => (
              <AnimatedSection key={resource._id} delay={index * 0.1}>
                <Link
                  href={`/resources/${resource.category}/${resource.slug}`}
                  className="group relative bg-card border border-border rounded-xl p-6 hover:border-blue-600/50 hover:shadow-xl hover:shadow-blue-600/5 transition-all duration-300 hover:-translate-y-1 block"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className={`text-xs font-medium px-3 py-1.5 rounded-lg border ${
                      resource.difficulty === 'Beginner'
                        ? 'bg-green-500/10 text-green-400 border-green-500/20'
                        : resource.difficulty === 'Intermediate'
                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                        : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                    }`}>
                      {resource.difficulty}
                    </span>
                    <div className="flex items-center text-muted-foreground text-sm">
                      <Clock className="h-4 w-4 mr-1.5 text-blue-400" />
                      <span>{resource.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-blue-600 transition-colors">
                    {resource.title}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed">
                    {resource.excerpt}
                  </p>

                  <div className="flex items-center text-blue-600 text-sm font-medium">
                    Read Article
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
