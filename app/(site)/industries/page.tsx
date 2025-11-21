import { Button } from '@/components/ui/button';
import HeroSection from '@/components/ui/hero-section';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getAllIndustries, getIndustriesPage } from '@/sanity/lib/queries';
import AnimatedSection from '@/components/ui/animated-section';
import type { Metadata } from 'next';
import { portableTextToPlainTextMemoized as portableTextToPlainText } from '@/lib/performance';
import * as Icons from 'lucide-react';

// Dynamic icon component
function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const Icon = (Icons as any)[name] || Icons.Circle;
  return <Icon className={className} />;
}

// Force static generation for INSTANT routing (no server delays)
export const dynamic = 'force-static';
export const revalidate = 60; // Revalidate every 60 seconds

// Comprehensive SEO metadata with social sharing optimization - pulls from Sanity CMS
export async function generateMetadata(): Promise<Metadata> {
  const industriesPage = await getIndustriesPage();
  const baseUrl = 'https://iismet.com';
  const pageUrl = `${baseUrl}/industries`;

  // Pull SEO data from Sanity with fallbacks
  const seoTitle = industriesPage?.seo?.metaTitle || 'Industries We Serve | Aerospace, Defense & Energy Manufacturing | IIS';
  const seoDescription = industriesPage?.seo?.metaDescription || 'Precision manufacturing for aerospace, defense, and energy industries. AS9100D certified, ITAR registered. Mission-critical components with full traceability, first article inspection, and comprehensive quality documentation.';
  const seoKeywords = industriesPage?.seo?.keywords?.join(', ') || 'aerospace manufacturing, defense manufacturing, energy sector machining, AS9100D certified, ITAR registered, military components, aircraft parts, turbine components, mission-critical manufacturing';
  const ogImage = industriesPage?.seo?.ogImage?.asset?.url || `${baseUrl}/og-image-industries.jpg`;
  const ogImageAlt = industriesPage?.seo?.ogImage?.alt || 'IIS Industries - Aerospace, Defense and Energy Manufacturing';

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: pageUrl,
      siteName: 'IIS Precision Manufacturing',
      title: seoTitle,
      description: seoDescription,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
          type: 'image/jpeg',
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@iisprecision',
      creator: '@iisprecision',
      title: seoTitle,
      description: seoDescription,
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
  const [industries, industriesPageData] = await Promise.all([
    getAllIndustries(),
    getIndustriesPage(),
  ]);

  // Format industries with slug and plain text description
  const _formattedIndustries = industries.map((industry: any) => ({
    ...industry,
    slug: industry.slug?.current || industry.slug,
    description: industry.shortDescription || portableTextToPlainText(industry.description),
  }));

  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        backgroundImage={industriesPageData?.hero?.backgroundImage?.asset?.url || ''}
        imageAlt={industriesPageData?.hero?.backgroundImage?.alt || ''}
        badge={industriesPageData?.hero?.badge || '🏭 CRITICAL INDUSTRY SOLUTIONS'}
        title={
          industriesPageData?.hero?.heading ? (
            <span className="text-white">
              {industriesPageData.hero.heading.replace(industriesPageData.hero.headingHighlight || 'We Serve', '')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                {industriesPageData.hero.headingHighlight || 'We Serve'}
              </span>
            </span>
          ) : (
            <span className="text-white">
              Industries <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">We Serve</span>
            </span>
          )
        }
        description={industriesPageData?.hero?.subheading || 'Trusted partner for aerospace, defense, and energy sectors, delivering mission-critical components with uncompromising quality and precision.'}
        buttons={(industriesPageData?.hero?.buttons || [
          { label: 'Explore Industries', href: '#industries', variant: 'primary' },
          { label: 'Industry Consultation', href: '/contact', variant: 'secondary' },
        ]).filter((button: any) => button?.enabled !== false)}
        height="large"
        alignment="center"
      />

      {/* Key Statistics */}
      {industriesPageData?.content?.overviewStats && industriesPageData.content.overviewStats.length > 0 && (
        <section className="py-16 bg-slate-50">
          <div className="container">
            <AnimatedSection>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {industriesPageData.content.overviewStats
                  .filter((stat: any) => stat?.enabled !== false)
                  .map((stat: any, index: number) => (
                  <div key={index} className="text-center">
                    <div className="text-4xl md:text-5xl font-black text-blue-600 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm md:text-base text-slate-900 font-semibold uppercase tracking-wide mb-2">
                      {stat.label}
                    </div>
                    <div className="text-sm text-slate-600">
                      {stat.description}
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Industries Grid */}
      <section id="industries" className="py-20">
        <div className="container">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {industriesPageData?.content?.industriesSection?.title || 'Core Industries'}
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                {industriesPageData?.content?.industriesSection?.description || 'Specialized manufacturing solutions for the most demanding industries, backed by decades of experience and industry-leading certifications.'}
              </p>
            </div>
          </AnimatedSection>

          <div className="space-y-12">
            {industriesPageData?.content?.industries
              ?.filter((industry: any) => industry?.enabled !== false)
              ?.map((industry: any, index: number) => (
              <AnimatedSection key={industry.name} delay={index * 0.15}>
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Image */}
                    {industry.image?.asset?.url && (
                      <div className="relative h-64 md:h-auto">
                        <img
                          src={industry.image.asset.url}
                          alt={industry.image.alt || industry.name}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-8">
                      <h3 className="text-3xl font-bold mb-4">{industry.name}</h3>
                      <p className="text-slate-600 mb-6 leading-relaxed">
                        {industry.description}
                      </p>

                      <div className="grid sm:grid-cols-2 gap-6 mb-6">
                        {/* Certifications */}
                        {industry.certifications && industry.certifications.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-sm uppercase tracking-wide text-slate-900 mb-3">
                              Certifications
                            </h4>
                            <ul className="space-y-2">
                              {industry.certifications.map((cert: string, i: number) => (
                                <li key={i} className="text-sm text-slate-600 flex items-start">
                                  <span className="text-blue-600 mr-2">•</span>
                                  {cert}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Expertise */}
                        {industry.expertise && industry.expertise.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-sm uppercase tracking-wide text-slate-900 mb-3">
                              Expertise
                            </h4>
                            <ul className="space-y-2">
                              {industry.expertise.map((exp: string, i: number) => (
                                <li key={i} className="text-sm text-slate-600 flex items-start">
                                  <span className="text-blue-600 mr-2">•</span>
                                  {exp}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <Button asChild variant="outline">
                        <Link href={`/industries/${industry.name.toLowerCase().replace(/\s+/g, '-')}`}>
                          {industry.cardCtaText || 'Learn More About'} {industry.name}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose IIS */}
      {industriesPageData?.content?.whyChooseUs && industriesPageData.content.whyChooseUs.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container">
            <AnimatedSection>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  {industriesPageData?.content?.whyChooseSection?.title || 'Why Industry Leaders Choose Us'}
                </h2>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                  {industriesPageData?.content?.whyChooseSection?.description || 'Proven capabilities and unwavering commitment to quality make us the preferred manufacturing partner for critical applications.'}
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {industriesPageData.content.whyChooseUs
                .filter((item: any) => item?.enabled !== false)
                .map((item: any, index: number) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <div className="p-8 border border-slate-200 rounded-lg hover:border-slate-300 transition-all duration-300 hover:shadow-lg h-full">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mr-4">
                        <DynamicIcon name={item.icon || 'Circle'} className="w-6 h-6 text-slate-700" />
                      </div>
                      <h3 className="text-2xl font-bold">{item.title}</h3>
                    </div>
                    <p className="text-slate-600 mb-6 leading-relaxed">{item.description}</p>
                    {item.features && item.features.length > 0 && (
                      <div className="space-y-3">
                        {item.features.map((feature: string, i: number) => (
                          <div key={i} className="flex items-center text-sm text-slate-600">
                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-3" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Proven Results */}
      {industriesPageData?.content?.provenResults && industriesPageData.content.provenResults.length > 0 && (
        <section className="py-20 bg-slate-900 text-white">
          <div className="container">
            <AnimatedSection>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  {industriesPageData?.content?.resultsSection?.title || 'Proven Results'}
                </h2>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                  {industriesPageData?.content?.resultsSection?.description || 'Measurable performance metrics that demonstrate our commitment to excellence and continuous improvement.'}
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {industriesPageData.content.provenResults
                .filter((metric: any) => metric?.enabled !== false)
                .map((metric: any, index: number) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <div className="text-center border border-slate-700 rounded-lg p-6 hover:border-blue-500 transition-colors">
                    <div className="text-4xl md:text-5xl font-black text-blue-400 mb-2">
                      {metric.value}
                    </div>
                    <div className="text-lg font-semibold mb-2">{metric.metric}</div>
                    <p className="text-sm text-slate-400">{metric.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <AnimatedSection>
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">{industriesPageData?.cta?.heading || 'Partner with Industry Experts'}</h2>
              <p className="text-xl text-slate-600 mb-8">
                {industriesPageData?.cta?.description || "Join the industry leaders who trust us with their most critical manufacturing requirements. Let's discuss your specific needs."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {industriesPageData?.cta?.primaryButton?.enabled !== false && (
                  <Button size="lg" className="px-8 py-6 bg-slate-900 hover:bg-slate-800 text-white font-semibold" asChild>
                    <Link href={industriesPageData?.cta?.primaryButton?.href || '/contact'}>
                      {industriesPageData?.cta?.primaryButton?.label || 'Schedule Consultation'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                )}
                {industriesPageData?.cta?.secondaryButton?.enabled !== false && (
                  <Button size="lg" variant="outline" asChild className="px-8 py-6 font-semibold">
                    <Link href={industriesPageData?.cta?.secondaryButton?.href || '/services'}>
                      {industriesPageData?.cta?.secondaryButton?.label || 'View Our Services'}
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
