"use client";

import * as LucideIcons from 'lucide-react';
import HeroSection from '@/components/ui/hero-section';
import AnimatedSection from '@/components/ui/animated-section';
import SectionHeader from '@/components/ui/section-header';
import { Card } from '@/components/ui/card';
import { typography } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import { PortableText } from '@portabletext/react';

const fallbackIcon = (LucideIcons as any).Circle;

function resolveIcon(name?: string) {
  if (!name) return fallbackIcon;
  const normalized = name
    .split(/[\s_-]+/)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join('');
  return (LucideIcons as any)[normalized] || (LucideIcons as any)[name] || fallbackIcon;
}

function renderPortableContent(content?: unknown) {
  if (!content) return null;
  if (typeof content === 'string') {
    return <p className={cn(typography.body, 'text-slate-600 dark:text-slate-400 leading-relaxed')}>{content}</p>;
  }
  if (Array.isArray(content)) {
    return (
      <div className={cn(typography.body, 'prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400')}>
        <PortableText value={content as any} />
      </div>
    );
  }
  return null;
}

interface SupplierRequirementsPageClientProps {
  data: any;
}

export default function SupplierRequirementsPageClient({ data }: SupplierRequirementsPageClientProps) {
  const pageData = data;

  if (!pageData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - matches site pattern */}
      <HeroSection
        height="medium"
        alignment="left"
        darkHero={true}
        badge={{ text: 'QUALITY STANDARDS' }}
        title={
          pageData.hero.titleHighlight ? (
            <span>
              <span className="text-inherit">{pageData.hero.title} </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600">
                {pageData.hero.titleHighlight}
              </span>
            </span>
          ) : (() => {
            // Split title to highlight last word in blue gradient
            const title = pageData.hero.title || '';
            const words = title.split(' ');
            if (words.length <= 1) {
              return <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600">{title}</span>;
            }
            const firstPart = words.slice(0, -1).join(' ');
            const lastWord = words[words.length - 1];
            return (
              <span>
                <span className="text-inherit">{firstPart} </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600">{lastWord}</span>
              </span>
            );
          })()
        }
        description={
          <div className="text-slate-300">
            <p className="mb-6">{pageData.hero.description}</p>
            <div className="flex flex-wrap gap-3 mb-6">
              {(pageData.hero?.badges || []).map((badge: any, idx: number) => {
                const BadgeIcon = resolveIcon(badge?.iconName);
                return (
                  <span key={idx} className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-600/20 text-blue-400 border border-blue-600/30">
                    <BadgeIcon className="w-3 h-3 mr-2" />
                    {badge.text}
                  </span>
                );
              })}
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                {pageData.hero.versionStatus}
              </span>
              <span>{pageData.hero.effectiveDate}</span>
              <span>{pageData.hero.reviewPeriod}</span>
            </div>
          </div>
        }
        titleSize="lg"
      />

      {/* Purpose and Scope Sections */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {(pageData.sections || []).map((section: any, index: number) => {
              const SectionIcon = resolveIcon(section?.iconName);
              return (
                <AnimatedSection key={section._key || section.id || index} delay={index * 0.1}>
                  <Card className="p-6 md:p-8 h-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700 hover:shadow-lg dark:hover:shadow-slate-950/50 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-600/10 flex items-center justify-center flex-shrink-0">
                        <SectionIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl font-black text-blue-600 dark:text-blue-400">{section.number}</span>
                          <h2 className={cn(typography.h5, 'text-slate-900 dark:text-tone-inverse')}>{section.title}</h2>
                        </div>
                        {renderPortableContent(section.content)}
                      </div>
                    </div>
                  </Card>
                </AnimatedSection>
              );
            })}
          </div>

          {/* Requirements Header */}
          <AnimatedSection>
            <SectionHeader
              eyebrow="Section 3"
              heading="Supplier Quality Requirements"
              gradientWordPosition="last"
              description="Detailed requirements for supplier quality management"
              className="mb-12"
            />
          </AnimatedSection>

          {/* Requirements Cards */}
          <div className="space-y-4">
            {(pageData.requirements || []).map((req: any, index: number) => {
              const ReqIcon = resolveIcon(req.iconName);
              return (
                <AnimatedSection key={req._key || req.number || index} delay={Math.min(index * 0.05, 0.3)}>
                  <Card className="p-6 bg-white dark:bg-slate-900 border-l-4 border-l-blue-600 border border-slate-200/80 dark:border-slate-700 hover:shadow-lg dark:hover:shadow-slate-950/50 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-600/10 flex items-center justify-center flex-shrink-0">
                        <ReqIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{req.number}</span>
                          {req.title && <h3 className={cn(typography.h5, 'text-slate-900 dark:text-tone-inverse')}>{req.title}</h3>}
                        </div>
                        {req.content && (
                          <div className="mb-4">{renderPortableContent(req.content)}</div>
                        )}
                        {req.additional && (
                          <div className="mb-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 p-4">
                            {renderPortableContent(req.additional)}
                          </div>
                        )}
                        {req.list && (
                          <ul className="space-y-2">
                            {(req.list || []).map((item: any, idx: number) => (
                              <li key={idx} className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                                <span className="text-slate-600 dark:text-slate-400">{typeof item === 'string' ? item : (item as any).item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </Card>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Sections */}
      {(pageData.additionalSections || []).length > 0 && (
        <section className="py-16 md:py-24 bg-white dark:bg-slate-950">
          <div className="container max-w-5xl mx-auto px-4">
            <div className="space-y-6">
              {(pageData.additionalSections || []).map((section: any, index: number) => {
                const AddSectionIcon = resolveIcon(section?.iconName);
                return (
                  <AnimatedSection key={section.number} delay={Math.min(index * 0.1, 0.3)}>
                    <Card className="p-6 md:p-8 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 border-2 border-blue-600/20 dark:border-blue-600/30">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-blue-600/10 flex items-center justify-center flex-shrink-0">
                          <AddSectionIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-4">
                            <span className="text-2xl font-black text-blue-600 dark:text-blue-400">{section.number}</span>
                            <h2 className={cn(typography.h4, 'text-slate-900 dark:text-tone-inverse')}>{section.title}</h2>
                          </div>
                          {section.content && (
                            <div className="mb-4">{renderPortableContent(section.content)}</div>
                          )}
                          {section.list && (
                            <ul className="space-y-2">
                              {(section.list || []).map((item: any, idx: number) => (
                                <li key={idx} className="flex items-start gap-3">
                                  <div className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                                  <span className="text-slate-600 dark:text-slate-400">{typeof item === 'string' ? item : (item as any).item}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </Card>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Footer Note */}
      {pageData.footerNote && (
        <AnimatedSection>
          <section className="py-16 md:py-24 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 dark-section">
            <div className="container max-w-4xl mx-auto px-4">
              <div className="p-8 md:p-10 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-2xl border border-blue-600/20">
                <div className="flex items-center gap-4 mb-4">
                  {(() => {
                    const FooterIcon = resolveIcon(pageData.footerNote?.iconName);
                    return <FooterIcon className="w-8 h-8 text-blue-400" />;
                  })()}
                  <h3 className="text-xl md:text-2xl font-bold text-tone-inverse">{pageData.footerNote.heading}</h3>
                </div>
                <div className="text-slate-300 leading-relaxed">
                  {renderPortableContent(pageData.footerNote.content) || (
                    <p className="text-slate-300">{pageData.footerNote.content}</p>
                  )}
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>
      )}
    </div>
  );
}
