'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Building2, Clock } from 'lucide-react';
import { PremiumButton } from '@/components/ui/premium-button';
import AnimatedSection from '@/components/ui/animated-section';
import { spacing, cn } from '@/lib/design-system';

interface CaseStudy {
  _id: string;
  title: string;
  slug: string;
  subtitle?: string;
  client?: string;
  duration?: string;
  challenge?: string;
  heroImage?: string;
  heroImageAlt?: string;
  industry?: {
    title: string;
    slug: string;
  };
  results?: Array<{
    metric: string;
    value: string;
    description?: string;
  }>;
  technologies?: string[];
  certifications?: string[];
}

interface CMSButton {
  label: string;
  href: string;
  variant?: string;
  enabled?: boolean;
}

interface CaseStudiesContentProps {
  caseStudies: CaseStudy[];
  industries: Array<{ slug: string; title: string }>;
  featuredLabel?: string;
  filterLabel?: string;
  noResultsMessage?: string;
  cta?: {
    title?: string;
    description?: string;
    buttons?: CMSButton[];
  };
}

export default function CaseStudiesContent({
  caseStudies,
  industries,
  featuredLabel,
  filterLabel,
  noResultsMessage,
  cta,
}: CaseStudiesContentProps) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filtered = activeFilter
    ? caseStudies.filter((cs) => cs.industry?.slug === activeFilter)
    : caseStudies;

  const showCta = Boolean(cta?.title || cta?.description);
  const ctaButtons = (cta?.buttons || []).filter((b) => b.enabled !== false && b.label && b.href);

  return (
    <>
      {/* Filter Bar */}
      {industries.length > 1 && (
        <section className="py-8 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <div className={spacing.container}>
            <div className="flex flex-wrap items-center gap-3">
              {filterLabel && (
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mr-2">
                  {filterLabel}
                </span>
              )}
              <button
                onClick={() => setActiveFilter(null)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                  activeFilter === null
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600'
                )}
              >
                All
              </button>
              {industries.map((industry) => (
                <button
                  key={industry.slug}
                  onClick={() => setActiveFilter(industry.slug)}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                    activeFilter === industry.slug
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600'
                  )}
                >
                  {industry.title}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Case Studies Grid */}
      <section className="py-24 md:py-32">
        <div className={spacing.container}>
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-slate-500 dark:text-slate-400">
                {noResultsMessage || 'No case studies found.'}
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Featured Case Study - Full Width Hero Card */}
              {filtered.length > 0 && (
                <AnimatedSection>
                  <Link href={`/case-studies/${filtered[0].slug}`} className="block group">
                    <div className="relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300">
                      <div className="grid md:grid-cols-2">
                        {/* Featured Image */}
                        {filtered[0].heroImage && (
                          <div className="relative h-64 md:h-[400px] overflow-hidden">
                            <Image
                              src={filtered[0].heroImage}
                              alt={filtered[0].heroImageAlt || filtered[0].title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-700"
                              sizes="(max-width: 768px) 100vw, 50vw"
                              priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-transparent" />
                            {filtered[0].industry && (
                              <div className="absolute top-4 left-4">
                                <span className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600/90 backdrop-blur-sm rounded-full">
                                  {filtered[0].industry.title}
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                        {/* Featured Content */}
                        <div className="p-8 md:p-10 flex flex-col justify-center">
                          <div className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 mb-4">
                            {featuredLabel || 'Featured Case Study'}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
                            {filtered[0].client && (
                              <div className="flex items-center gap-1.5">
                                <Building2 className="w-3.5 h-3.5" />
                                <span>{filtered[0].client}</span>
                              </div>
                            )}
                            {filtered[0].duration && (
                              <div className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5" />
                                <span>{filtered[0].duration}</span>
                              </div>
                            )}
                          </div>
                          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {filtered[0].title}
                          </h3>
                          {filtered[0].challenge && (
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6 line-clamp-3">
                              {filtered[0].challenge}
                            </p>
                          )}
                          {/* Result Metrics */}
                          {filtered[0].results && filtered[0].results.length > 0 && (
                            <div className="flex flex-wrap gap-6 mb-6">
                              {filtered[0].results.slice(0, 3).map((result, idx) => (
                                <div key={idx}>
                                  <div className="text-2xl font-bold" style={{
                                    background: 'linear-gradient(to right, #3b82f6, #4f46e5)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                  }}>{result.value}</div>
                                  <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">{result.metric}</div>
                                </div>
                              ))}
                            </div>
                          )}
                          <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold">
                            <span>Read Full Case Study</span>
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              )}

              {/* Remaining Case Studies Grid */}
              {filtered.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filtered.slice(1).map((caseStudy, index) => (
                    <AnimatedSection key={caseStudy._id} delay={index * 0.1}>
                      <Link href={`/case-studies/${caseStudy.slug}`} className="block group h-full">
                        <div className="h-full bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300">
                          {/* Image */}
                          {caseStudy.heroImage && (
                            <div className="relative h-56 overflow-hidden">
                              <Image
                                src={caseStudy.heroImage}
                                alt={caseStudy.heroImageAlt || caseStudy.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                              {/* Industry Badge */}
                              {caseStudy.industry && (
                                <div className="absolute top-4 left-4">
                                  <span className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600/90 backdrop-blur-sm rounded-full">
                                    {caseStudy.industry.title}
                                  </span>
                                </div>
                              )}

                              {/* Result Highlight */}
                              {caseStudy.results && caseStudy.results.length > 0 && (
                                <div className="absolute bottom-4 left-4">
                                  <div className="px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
                                    <span className="text-lg font-bold text-white">{caseStudy.results[0].value}</span>
                                    <span className="text-xs text-white/80 ml-1.5">{caseStudy.results[0].metric}</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Content */}
                          <div className="p-6">
                            {/* Meta */}
                            <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-3">
                              {caseStudy.client && (
                                <div className="flex items-center gap-1.5">
                                  <Building2 className="w-3.5 h-3.5" />
                                  <span>{caseStudy.client}</span>
                                </div>
                              )}
                              {caseStudy.duration && (
                                <div className="flex items-center gap-1.5">
                                  <Clock className="w-3.5 h-3.5" />
                                  <span>{caseStudy.duration}</span>
                                </div>
                              )}
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                              {caseStudy.title}
                            </h3>

                            {/* Challenge summary */}
                            {caseStudy.challenge && (
                              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3 mb-4">
                                {caseStudy.challenge}
                              </p>
                            )}

                            {/* Technologies */}
                            {caseStudy.technologies && caseStudy.technologies.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mb-4">
                                {caseStudy.technologies.slice(0, 3).map((tech) => (
                                  <span
                                    key={tech}
                                    className="px-2 py-0.5 text-xs font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded"
                                  >
                                    {tech}
                                  </span>
                                ))}
                                {caseStudy.technologies.length > 3 && (
                                  <span className="px-2 py-0.5 text-xs text-slate-400 dark:text-slate-500">
                                    +{caseStudy.technologies.length - 3} more
                                  </span>
                                )}
                              </div>
                            )}

                            {/* CTA */}
                            <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold text-sm">
                              <span>View Case Study</span>
                              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </AnimatedSection>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      {showCta && (
        <section className="py-24 md:py-32 bg-slate-50 dark:bg-slate-900">
          <div className={spacing.container}>
            <AnimatedSection>
              <div className="text-center max-w-4xl mx-auto">
                {cta?.title && (
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                    {cta.title}
                  </h2>
                )}
                {cta?.description && (
                  <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                    {cta.description}
                  </p>
                )}
                {ctaButtons.length > 0 && (
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {ctaButtons.map((button, index) => (
                      <Link key={`${button.label}-${index}`} href={button.href}>
                        <PremiumButton size="lg" variant={button.variant === 'secondary' ? 'secondary' : 'default'}>
                          {button.label}
                          {index === 0 && <ArrowRight className="ml-2 h-4 w-4" />}
                        </PremiumButton>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}
    </>
  );
}
