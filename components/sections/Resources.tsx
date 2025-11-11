"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BookOpen, ArrowRight, Clock, GraduationCap, TrendingUp } from 'lucide-react';
import { PremiumButton } from '@/components/ui/premium-button';
import SectionHeader from '@/components/ui/section-header';
import { useTheme } from '@/lib/contexts/ThemeContext';
import { getGradientStyle, getGradientTextStyle, hexToRgba } from '@/lib/theme-utils';
import { usePrefersReducedMotion } from '@/lib/motion';
import { SECTION_CONFIGS, getInitialState, getAnimateState, getViewportConfig } from '@/lib/animation-config';

// Icon mapping for CMS data
const iconMap: Record<string, any> = {
  BookOpen,
  GraduationCap,
  TrendingUp,
};

interface ResourcesProps {
  data?: any;
}

export default function Resources({ data }: ResourcesProps) {
  const theme = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();
  // ALL content must come from Sanity CMS
  if (!data || !data.header || !data.featuredSeries) {
    return null;
  }

  const resourcesData = data;
  return (
    <section className="relative py-24 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(59, 130, 246) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container relative z-10">
        <div className="mb-16">
          <SectionHeader
            eyebrow={resourcesData.header.badge}
            heading={resourcesData.header.title}
            gradientWordPosition="last"
            description={resourcesData.header.description}
            className="[&_h2]:text-white [&_p]:text-slate-300 [&_p]:text-xl"
          />
        </div>

        {/* Featured Series Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {resourcesData.featuredSeries.map((series: any, index: number) => {
            const cardDelay = SECTION_CONFIGS.threeColumnGrid.getDelay(index);
            const viewportConfig = getViewportConfig();

            return (
              <div key={`${series.slug}-${index}`}>
                <Link href={`/resources/series/${series.slug}`}>
                  <motion.article
                    initial={getInitialState(prefersReducedMotion)}
                    whileInView={getAnimateState(cardDelay, 0.6, prefersReducedMotion)}
                    viewport={viewportConfig}
                  className="group h-full bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                  style={{
                    '--hover-border-color': hexToRgba(theme.colors.primary, 0.5),
                    '--hover-shadow-color': hexToRgba(theme.colors.primary, 0.1)
                  } as React.CSSProperties}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = hexToRgba(theme.colors.primary, 0.5);
                    e.currentTarget.style.boxShadow = `0 25px 50px -12px ${hexToRgba(theme.colors.primary, 0.1)}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgb(30 41 59)'; // slate-800
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
                    <h3 className="text-2xl font-bold text-white mb-2">
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
                          (series.level || series.difficulty) === 'Beginner' ? 'bg-green-400/10 text-green-400 border border-green-400/20' :
                          (series.level || series.difficulty) === 'Intermediate' ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20' :
                          'bg-red-400/10 text-red-400 border border-red-400/20'
                        }`}>
                          {series.level || series.difficulty}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 font-medium transition-colors" style={{ color: hexToRgba(theme.colors.primary, 0.8) }}>
                        <span className="text-sm">Explore</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </motion.article>
              </Link>
              </div>
            );
          })}
        </div>

        {/* Additional Series & CTA */}
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
                <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
                  <TrendingUp className="w-5 h-5" style={{ color: hexToRgba(theme.colors.primary, 0.8) }} />
                  <span className="text-sm font-medium" style={{ color: hexToRgba(theme.colors.primary, 0.8) }}>6 Complete Series • 21+ Technical Articles</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  {resourcesData.cta.title}
                </h3>
                <p className="text-lg text-slate-300">
                  {resourcesData.cta.description}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                {resourcesData.cta.buttons.filter((button: any) => button.enabled !== false).map((button: any, index: number) => (
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

        {/* Benefits Grid */}
        {resourcesData.benefits && resourcesData.benefits.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {resourcesData.benefits.filter((benefit: any) => benefit.enabled !== false).map((benefit: any, index: number) => {
              const IconComponent = iconMap[benefit.iconName] || BookOpen;
              const benefitDelay = SECTION_CONFIGS.threeColumnGrid.getDelay(index);
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
                  <h4 className="text-lg font-bold text-white mb-2">{benefit.title}</h4>
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