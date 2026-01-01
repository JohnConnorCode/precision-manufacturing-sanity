"use client";

import { AnimatedCounter } from '@/components/ui/animated-counter';
import SectionHeader from '@/components/ui/section-header';
import { useTheme } from '@/lib/contexts/ThemeContext';
import { getGradientStyle, getGradientTextStyle } from '@/lib/theme-utils';
import { SafeMotion, stagger } from '@/components/ui/safe-motion';
import { StatsData, StatItem } from '@/lib/types/cms';
import { DotGridBackground } from '@/lib/background-patterns';

interface StatsProps {
  data?: StatsData;
}

// NO fallback stats - use ONLY Sanity data

export default function Stats({ data }: StatsProps) {
  const theme = useTheme();

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
    <section className="py-20 md:py-24 bg-gradient-to-b from-slate-100 to-white dark:from-slate-900 dark:to-slate-950 relative overflow-hidden">
      {/* Background Pattern */}
      <DotGridBackground />

      <div className="container relative z-10">
        {/* Section Header */}
        <SectionHeader
          eyebrow={subtitle}
          heading={title}
          gradientWordPosition="last"
          className="[&_p]:uppercase"
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index: number) => (
            <SafeMotion key={index} scale={0.9} delay={stagger(index)} className="text-center">
              <div className="relative inline-block mb-3">
                <div className="absolute inset-0 rounded-full blur-xl opacity-20" style={getGradientStyle(theme.colors)} />
                <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg dark:shadow-slate-950/50">
                  <AnimatedCounter
                    value={stat.value}
                    decimals={stat.decimals}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    className="text-4xl md:text-5xl font-black"
                    style={getGradientTextStyle(theme.colors)}
                  />
                </div>
              </div>
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                {stat.label}
              </p>
            </SafeMotion>
          ))}
        </div>
      </div>
    </section>
  );
}
