import { Button } from '@/components/ui/button';
import HeroSection from '@/components/ui/hero-section';
import { PortableTextContent } from '@/components/portable-text-components';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getAllIndustries, getPageContent } from '@/sanity/lib/queries';
import AnimatedSection from '@/components/ui/animated-section';
import type { Metadata } from 'next';

// Helper function to convert Portable Text to plain text
function portableTextToPlainText(blocks: any): string {
  if (!blocks) return '';
  if (typeof blocks === 'string') return blocks;
  if (!Array.isArray(blocks)) return '';

  return blocks
    .map((block: any) => {
      if (block._type !== 'block' || !block.children) return '';
      return block.children.map((child: any) => child.text).join('');
    })
    .join(' ');
}

// Force static generation for INSTANT routing (no server delays)
export const dynamic = 'force-static';
export const revalidate = 60; // Revalidate every 60 seconds

// Comprehensive SEO metadata with social sharing optimization
export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = 'https://iismet.com';
  const pageUrl = `${baseUrl}/industries`;
  const ogImage = `${baseUrl}/og-image-industries.jpg`;

  return {
    title: 'Industries We Serve | Aerospace, Defense & Energy Manufacturing | IIS',
    description: 'Precision manufacturing for aerospace, defense, and energy industries. AS9100D certified, ITAR registered. Mission-critical components with full traceability, first article inspection, and comprehensive quality documentation.',
    keywords: 'aerospace manufacturing, defense manufacturing, energy sector machining, AS9100D certified, ITAR registered, military components, aircraft parts, turbine components, mission-critical manufacturing',
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: pageUrl,
      siteName: 'IIS Precision Manufacturing',
      title: 'Industries We Serve - Aerospace, Defense & Energy Precision Manufacturing',
      description: 'Trusted partner for mission-critical components. AS9100D certified, ITAR registered. Serving aerospace, defense, and energy with uncompromising quality.',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'IIS Industries - Aerospace, Defense and Energy Manufacturing',
          type: 'image/jpeg',
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@iisprecision',
      creator: '@iisprecision',
      title: 'Industries We Serve | IIS Precision Manufacturing',
      description: 'Aerospace, defense & energy manufacturing. AS9100D certified, ITAR registered for mission-critical components.',
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

export default async function IndustriesPage() {
  const [industries, pageContent] = await Promise.all([
    getAllIndustries(),
    getPageContent(),
  ]);

  // Format industries with slug and plain text description
  const formattedIndustries = industries.map((industry: any) => ({
    ...industry,
    slug: industry.slug?.current || industry.slug,
    description: industry.shortDescription || portableTextToPlainText(industry.description),
  }));

  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        backgroundImage={pageContent?.industriesPage?.hero?.backgroundImageUrl || pageContent?.industriesPage?.hero?.backgroundImage?.asset?.url || 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=2400&q=90'}
        imageAlt="Industrial manufacturing - precision components for critical industries"
        title={
          pageContent?.industriesPage?.hero?.title ? (
            <span className="text-white">{pageContent.industriesPage.hero.title}</span>
          ) : (
            <span className="text-white">
              Industries <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">We Serve</span>
            </span>
          )
        }
        description={pageContent?.industriesPage?.hero?.descriptionRich ? (
          <PortableTextContent value={pageContent.industriesPage.hero.descriptionRich} />
        ) : (
          pageContent?.industriesPage?.hero?.description || 'Trusted partner for aerospace, defense, and energy sectors, delivering mission-critical components with uncompromising quality and precision.'
        )}
        titleSize={pageContent?.industriesPage?.hero?.titleSize}
        descriptionSize={pageContent?.industriesPage?.hero?.descriptionSize}
        buttons={pageContent?.industriesPage?.hero?.buttons || [
          { label: 'Explore Industries', href: '#industries', variant: 'primary' },
          { label: 'Industry Consultation', href: '/contact', variant: 'secondary' },
        ]}
        height="large"
        alignment="center"
      />

      {/* Industries Grid */}
      <section id="industries" className="py-20">
        <div className="container">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">{pageContent?.industriesPage?.header?.title || 'Core Industries'}</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                {pageContent?.industriesPage?.header?.description || 'Specialized manufacturing solutions for the most demanding industries, backed by decades of experience and industry-leading certifications.'}
              </p>
            </div>
          </AnimatedSection>

          <div className="space-y-8">
            {formattedIndustries.map((industry: any, index: number) => (
              <AnimatedSection key={industry.title} delay={index * 0.15}>
                <div className="bg-white border border-slate-200 rounded-lg p-8">
                  <h3 className="text-3xl font-bold mb-4">{industry.title}</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed text-lg">
                    {industry.description}
                  </p>
                  <Button asChild variant="outline">
                    <Link href={`/industries/${industry.slug}`}>
                      Learn More About {industry.title}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <AnimatedSection>
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">{pageContent?.industriesPage?.cta?.heading || 'Partner with Industry Experts'}</h2>
              <p className="text-xl text-slate-600 mb-8">
                {pageContent?.industriesPage?.cta?.description || "Join the industry leaders who trust us with their most critical manufacturing requirements. Let's discuss your specific needs."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="px-8 py-6 bg-slate-900 hover:bg-slate-800 text-white font-semibold" asChild>
                  <Link href={pageContent?.industriesPage?.cta?.primaryButton?.href || '/contact'}>
                    {pageContent?.industriesPage?.cta?.primaryButton?.label || 'Schedule Consultation'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="px-8 py-6 font-semibold">
                  <Link href={pageContent?.industriesPage?.cta?.secondaryButton?.href || '/services'}>
                    {pageContent?.industriesPage?.cta?.secondaryButton?.label || 'View Our Services'}
                  </Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
