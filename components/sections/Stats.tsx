"use client";

import { motion } from 'framer-motion';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import SectionHeader from '@/components/ui/section-header';
import { useTheme } from '@/lib/contexts/ThemeContext';
import { getGradientStyle, getGradientTextStyle } from '@/lib/theme-utils';
import { usePrefersReducedMotion } from '@/lib/motion';
import { SECTION_CONFIGS, getScaleInitialState, getScaleAnimateState, getViewportConfig } from '@/lib/animation-config';
import { StatsData, StatItem } from '@/lib/types/cms';
import { DotGridBackground } from '@/lib/background-patterns';

interface StatsProps {
  data?: StatsData;
}

// NO fallback stats - use ONLY Sanity data

export default function Stats({ data }: StatsProps) {
  const theme = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();

  // Use ONLY CMS data - return null if no data
  const statsArray = data?.items || data?.stats;
  if (!statsArray || statsArray.length === 0) {
    return null;
  }

  const stats = statsArray.map((stat: StatItem) => {
    // Parse numeric value from string for animation
    const valueStr = String(stat.value);
    const numValue = parseFloat(valueStr.replace(/[^0-9.-]/g, ''));
    const suffix = valueStr.replace(/[0-9.-]/g, '');
    return {
      value: numValue,
      suffix: suffix || '',
      label: stat.label,
      decimals: numValue < 1 ? 4 : numValue < 100 ? 2 : 0,
      prefix: undefined
    };
  });

  const title = data?.title;
  const subtitle = data?.subtitle;

  if (!title || !subtitle) {
    return null;
  }

  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
      {/* Background Pattern */}
      <DotGridBackground />

      {/* Subtle radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial-subtle pointer-events-none" />

      <div className="container relative z-10">
        {/* Section Header */}
        <SectionHeader
          eyebrow={subtitle}
          heading={title}
          gradientWordPosition="last"
          className="[&_p]:uppercase"
        />

        {/* Stats Grid - Premium Design */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index: number) => {
            const headerDelay = SECTION_CONFIGS.fourColumnGrid.headerCompletion;
            const statDelay = headerDelay + SECTION_CONFIGS.fourColumnGrid.getDelay(index);
            const viewportConfig = getViewportConfig();

            return (
              <motion.div
                key={index}
                initial={getScaleInitialState(prefersReducedMotion)}
                whileInView={getScaleAnimateState(statDelay, 0.6, prefersReducedMotion)}
                viewport={viewportConfig}
                className="text-center group"
              >
                <div className="relative inline-block mb-4">
                  {/* Premium glow effect */}
                  <div
                    className="absolute inset-0 rounded-2xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                    style={getGradientStyle(theme.colors)}
                  />
                  {/* Card with premium shadow */}
                  <div className="relative bg-white rounded-2xl p-6 md:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_20px_-5px_rgba(0,0,0,0.1)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] transition-all duration-300 border border-slate-100 hover:border-slate-200">
                    <AnimatedCounter
                      value={stat.value}
                      decimals={stat.decimals}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight"
                      style={getGradientTextStyle(theme.colors)}
                    />
                  </div>
                </div>
                <p className="text-xs md:text-sm font-semibold text-slate-600 uppercase tracking-[0.15em]">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
