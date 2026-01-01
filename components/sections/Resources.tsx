"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BookOpen, ArrowRight, Clock, GraduationCap, TrendingUp, LucideIcon } from 'lucide-react';
import { PremiumButton } from '@/components/ui/premium-button';
import SectionHeader from '@/components/ui/section-header';
import { useTheme } from '@/lib/contexts/ThemeContext';
import { hexToRgba } from '@/lib/theme-utils';
import { usePrefersReducedMotion } from '@/lib/motion';
import { SECTION_CONFIGS, getInitialState, getAnimateState, getViewportConfig } from '@/lib/animation-config';
import { ResourcesData, ResourceSeries, ResourceBenefit } from '@/lib/types/cms';
import { DotGridBackground } from '@/lib/background-patterns';

// Icon mapping for CMS data
const iconMap: Record<string, LucideIcon> = {
  BookOpen,
  GraduationCap,
  TrendingUp,
};

// NO fallback resources - use ONLY Sanity data

interface ResourcesProps {
  data?: ResourcesData;
}

export default function Resources({ data }: ResourcesProps) {
  const theme = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();
  const sectionHeaderDelay = SECTION_CONFIGS.threeColumnGrid.headerCompletion;

  // Use ONLY CMS data - NO fallbacks
  if (!data || !data.header || !Array.isArray(data.featuredSeries)) {
    return null;
  }

  const resourcesData = data;
  const additionalSeriesText = (resourcesData as any)?.additionalSeriesText;
  const ctaData = resourcesData.cta;
  const showCta = Boolean(ctaData && (ctaData.title || ctaData.description));

  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 overflow-hidden dark-section">
      {/* Background Pattern */}
      <DotGridBackground color="rgb(59, 130, 246)" spacing={40} dotPosition={1} opacity={0.05} />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <SectionHeader
            eyebrow={resourcesData.header.badge}
            heading={resourcesData.header.title}
            gradientWordPosition="last"
            description={resourcesData.header.description}
            className="[&_h2]:text-tone-inverse [&_p]:text-slate-300 [&_p]:text-xl"
          />

        {/* Featured Series Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {resourcesData.featuredSeries.filter((series: any) => series.enabled !== false).map((series: ResourceSeries, index: number) => {
            const cardDelay = sectionHeaderDelay + SECTION_CONFIGS.threeColumnGrid.getDelay(index);
            const viewportConfig = getViewportConfig();
            const seriesSlug = series.slug;
            if (!seriesSlug) {
              return null;
            }

            return (
              <motion.div
                key={`${series.slug}-${index}`}
                initial={getInitialState(prefersReducedMotion)}
                whileInView={getAnimateState(cardDelay, 0.6, prefersReducedMotion)}
                viewport={viewportConfig}
              >
                <Link href={`/resources/series/${seriesSlug}`}>
                  <article
                    className="group h-full bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                    style={{
                      borderColor: 'rgb(var(--slate-800))',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = hexToRgba(theme.colors.primary, 0.5);
                      e.currentTarget.style.boxShadow = `0 25px 50px -12px ${hexToRgba(theme.colors.primary, 0.1)}`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgb(var(--slate-800))';
                      e.currentTarget.style.boxShadow = '';
                    }}
                  >
                  {/* Series Header */}
                  <div className="p-6 border-b border-slate-800">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-4xl">{series.icon}</span>
                      <span
                        className="backdrop-blur-sm border px-3 py-1 rounded-full text-sm font-medium"
                        style={{
                          backgroundColor: hexToRgba(theme.colors.primary, 0.1),
                          color: hexToRgba(theme.colors.primary, 0.8),
                          borderColor: hexToRgba(theme.colors.primary, 0.2)
                        }}
                      >
                        {series.articleCount} Articles
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-tone-inverse mb-2">
                      {series.title}
                    </h3>
                  </div>

                  {/* Series Content */}
                  <div className="p-6">
                    <p className="text-slate-300 mb-6 leading-relaxed">
                      {series.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                      <div className="flex items-center gap-4 text-sm text-slate-400">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{series.readTime}</span>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs ${
                          (series.level || series.difficulty)?.toLowerCase() === 'beginner' ? 'bg-green-400/10 text-green-400 border border-green-400/20' :
                          (series.level || series.difficulty)?.toLowerCase() === 'intermediate' ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20' :
                          'bg-red-400/10 text-red-400 border border-red-400/20'
                        }`}>
                          {series.level || series.difficulty}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 font-medium transition-colors" style={{ color: hexToRgba(theme.colors.primary, 0.8) }}>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Series & CTA */}
        {showCta && (
          <motion.div
          initial={getInitialState(prefersReducedMotion)}
          whileInView={getAnimateState(0.4, 0.6, prefersReducedMotion)}
          viewport={getViewportConfig()}
          className="border rounded-2xl p-8 md:p-12"
          style={{
            background: `linear-gradient(to right, ${hexToRgba(theme.colors.primary, 0.1)}, ${hexToRgba(theme.colors.secondary, 0.1)}, ${hexToRgba(theme.colors.primary, 0.1)})`,
            borderColor: hexToRgba(theme.colors.primary, 0.2)
          }}
        >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1 text-center md:text-left">
                {additionalSeriesText && (
                  <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
                    <TrendingUp className="w-5 h-5" style={{ color: hexToRgba(theme.colors.primary, 0.8) }} />
                    <span className="text-sm font-medium" style={{ color: hexToRgba(theme.colors.primary, 0.8) }}>{additionalSeriesText}</span>
                  </div>
                )}
                <h3 className="text-2xl md:text-3xl font-bold text-tone-inverse mb-3">
                  {ctaData?.title}
                </h3>
                <p className="text-lg text-slate-300">
                  {ctaData?.description}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                {(Array.isArray(ctaData?.buttons) ? ctaData.buttons : [])
                  .filter(button => button.enabled !== false && button.text && button.href)
                  .map((button, index: number) => (
                  <Link key={button.text} href={button.href}>
                    <PremiumButton size="lg" variant={button.variant === 'primary' ? 'default' : 'secondary'}>
                      {index === 0 && <BookOpen className="w-5 h-5" />}
                      {button.text}
                    </PremiumButton>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Benefits Grid */}
        {Array.isArray(resourcesData.benefits) && resourcesData.benefits.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {resourcesData.benefits.filter(benefit => benefit.enabled !== false).map((benefit: ResourceBenefit, index: number) => {
              const IconComponent = (benefit.iconName && iconMap[benefit.iconName]) || BookOpen;
              const benefitDelay = sectionHeaderDelay + SECTION_CONFIGS.threeColumnGrid.getDelay(index);
              const viewportConfig = getViewportConfig();

              return (
                <motion.div
                  key={benefit.title || index}
                  initial={getInitialState(prefersReducedMotion)}
                  whileInView={getAnimateState(benefitDelay, 0.6, prefersReducedMotion)}
                  viewport={viewportConfig}
                  className="text-center p-6 bg-slate-900/30 rounded-xl border border-slate-800/50"
                >
                  <div
                    className="inline-flex items-center justify-center w-12 h-12 rounded-xl border mb-4"
                    style={{
                      background: `linear-gradient(to bottom right, ${hexToRgba(theme.colors.primary, 0.2)}, ${hexToRgba(theme.colors.secondary, 0.2)})`,
                      borderColor: hexToRgba(theme.colors.primary, 0.3),
                      color: hexToRgba(theme.colors.primary, 0.8)
                    }}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-tone-inverse mb-2">{benefit.title}</h4>
                  <p className="text-slate-400 text-sm">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
