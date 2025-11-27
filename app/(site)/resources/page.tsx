import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import HeroSection from '@/components/ui/hero-section';
import { Card } from '@/components/ui/card';
import { getAllResources, getPageContent } from '@/sanity/lib/queries';
import { PortableTextContent } from '@/components/portable-text-components';
import AnimatedSection from '@/components/ui/animated-section';
import SectionHeader from '@/components/ui/section-header';
import { typography, spacing, cn } from '@/lib/design-system';
import type { Metadata } from 'next';

// Enable ISR with 60 second revalidation
export const revalidate = 60;

// Comprehensive SEO metadata with social sharing optimization
export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = 'https://iismet.com';
  const pageUrl = `${baseUrl}/resources`;
  const ogImage = `${baseUrl}/og-image-resources.jpg`;

  let resources = [];
  try {
    resources = await getAllResources() || [];
  } catch {
    // Silently fail and use empty array
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
        backgroundImage={pageContent?.resourcesPage?.hero?.backgroundImageUrl || pageContent?.resourcesPage?.hero?.backgroundImage?.asset?.url || ''}
        imageAlt={pageContent?.resourcesPage?.hero?.backgroundImage?.alt || ''}
        badge={pageContent?.resourcesPage?.hero?.badge ? { text: pageContent.resourcesPage.hero.badge } : undefined}
        title={
          pageContent?.resourcesPage?.hero?.title ? (() => {
            // Split title to highlight last word in blue gradient
            const title = pageContent.resourcesPage.hero.title;
            const words = title.split(' ');
            if (words.length <= 1) {
              return <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">{title}</span>;
            }
            const firstPart = words.slice(0, -1).join(' ');
            const lastWord = words[words.length - 1];
            return (
              <span>
                <span className="text-white">{firstPart} </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">{lastWord}</span>
              </span>
            );
          })() : (
            <>
              <span className="text-white">Master</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Precision Manufacturing</span>
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
      <section className="relative py-24 md:py-32 bg-gradient-to-b from-slate-50 to-white">
        <div className={spacing.containerWide}>
          <AnimatedSection>
            <SectionHeader
              eyebrow={pageContent?.resourcesPage?.header?.eyebrow || 'Knowledge Base'}
              heading={pageContent?.resourcesPage?.header?.title || 'Technical Resources'}
              gradientWordPosition="last"
              description={pageContent?.resourcesPage?.header?.description || 'In-depth guides and technical documentation for precision manufacturing excellence'}
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {formattedResources.map((resource: any, index: number) => (
              <AnimatedSection key={resource._id} delay={index * 0.1}>
                <Link
                  href={`/resources/${resource.category}/${resource.slug}`}
                  className="block h-full group"
                >
                  <Card className="h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30">
                    <div className="flex items-start justify-between mb-4">
                      <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${
                        resource.difficulty === 'beginner'
                          ? 'bg-green-500/10 text-green-600 border-green-500/20'
                          : resource.difficulty === 'intermediate'
                          ? 'bg-blue-500/10 text-blue-600 border-blue-500/20'
                          : 'bg-purple-500/10 text-purple-600 border-purple-500/20'
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

                    <p className={cn(typography.small, 'mb-4 line-clamp-3 leading-relaxed')}>
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
        </div>
      </section>
    </div>
  );
}
