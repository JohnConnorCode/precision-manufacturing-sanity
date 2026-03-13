"use client";

import { Gauge, Cpu, Shield, Target, Award, Clock, Activity, Zap, CheckCircle2, Calendar, LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/section-header';
import { useTheme } from '@/lib/contexts/ThemeContext';
import { getGradientStyle, hexToRgba } from '@/lib/theme-utils';
import { usePrefersReducedMotion } from '@/lib/motion';
import { SECTION_CONFIGS } from '@/lib/animation-config';
import { useAnimateInView, ANIM_STATES, ANIM_TRANSITION } from '@/lib/use-animate-in-view';
import { spacing } from '@/lib/design-system';

interface TechnicalSpecsData {
  title?: string;
  subtitle?: string;
  specs?: Array<{
    label: string;
    value: string;
    unit?: string;
    enabled?: boolean;
    description?: string;
    iconName?: string;
  }>;
}

interface TechnicalSpecsProps {
  data?: TechnicalSpecsData;
}

export default function TechnicalSpecs({ data }: TechnicalSpecsProps) {
  const theme = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();

  // Animation hook for scroll-triggered animations that work on refresh
  const metricsAnim = useAnimateInView<HTMLDivElement>();

  // Icon mapping for CMS data
  const iconMap: Record<string, LucideIcon> = {
    Gauge,
    Cpu,
    Shield,
    Activity,
    Clock,
    Target,
    Zap,
    Award,
    CheckCircle2,
    Calendar,
  };

  // Convert CMS data to metrics format - filter out disabled specs, return null if no specs
  if (!data?.specs || data.specs.length === 0) {
    return null;
  }

  const metrics = data.specs
    .filter(spec => spec.enabled !== false)
    .map((spec) => {
      const iconKey = spec.iconName || spec.label;
      const IconComponent = iconKey && iconMap[iconKey] ? iconMap[iconKey] : Gauge;
      return {
        icon: IconComponent,
        value: spec.value,
        label: spec.label ? spec.label.toUpperCase() : '',
        description: spec.description || '',
      };
    });

  const title = data?.title;
  const subtitle = data?.subtitle;

  return (
    <section className={`${spacing.section} relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 dark-section`}>
      {/* Premium Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a_1px,transparent_1px)] bg-[size:50px_50px] opacity-20" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(to right, ${hexToRgba(theme.colors.primary, 0.2)}, transparent, ${hexToRgba(theme.colors.secondary, 0.2)})`
          }}
        />
      </div>

      <div className={`${spacing.containerWide} relative z-10`}>
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            heading={title}
            gradientWordPosition="last"
            description={subtitle}
            centered={true}
            className="[&_h2]:text-tone-inverse [&_p]:text-slate-300"
          />
        </div>

        {/* Metrics Grid - Premium Card Design */}
        {/* Dynamic grid: 4 cols for even counts, 3 cols for counts divisible by 3 (like 9), else 4 */}
        <div ref={metricsAnim.ref} className={`grid grid-cols-2 ${metrics.length % 3 === 0 && metrics.length % 4 !== 0 ? 'md:grid-cols-3' : 'md:grid-cols-4'} ${spacing.grid}`}>
          {metrics.map((metric, index) => {
            const Icon = metric.icon || Gauge;
            const headerDelay = SECTION_CONFIGS.metricsGrid.headerCompletion;
            const metricDelay = headerDelay + SECTION_CONFIGS.metricsGrid.getDelay(index);

            return (
              <motion.div
                key={metric.label}
                initial={prefersReducedMotion ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
                animate={metricsAnim.shouldAnimate ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
                transition={{ ...ANIM_TRANSITION, delay: prefersReducedMotion ? 0 : metricDelay }}
                className="group relative"
              >
                <div
                  className="relative bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-4 transition-all duration-300 hover:bg-slate-900/70"
                  style={{
                    '--hover-border-color': hexToRgba(theme.colors.primary, 0.3),
                    '--hover-shadow': `0 0 50px ${hexToRgba(theme.colors.primary, 0.15)}`,
                  } as React.CSSProperties}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = hexToRgba(theme.colors.primary, 0.3);
                    e.currentTarget.style.boxShadow = `0 0 50px ${hexToRgba(theme.colors.primary, 0.15)}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '';
                    e.currentTarget.style.boxShadow = '';
                  }}
                >
                  {/* Gradient Glow Effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl -z-10"
                    style={getGradientStyle(theme.colors)}
                  />

                  {/* Icon + Value Row */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className="relative w-10 h-10 rounded-lg p-[1px] flex-shrink-0" style={getGradientStyle(theme.colors)}>
                      <div className="w-full h-full bg-slate-900 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-tone-inverse" />
                      </div>
                    </div>
                    <div className="text-2xl md:text-3xl font-black text-tone-inverse tracking-tight">
                      {metric.value}
                    </div>
                  </div>

                  {/* Label */}
                  <div className="text-[10px] font-bold uppercase tracking-[0.15em] mb-1" style={{ color: theme.colors.primary }}>
                    {metric.label}
                  </div>

                  {/* Description */}
                  <div className="text-xs text-slate-400 leading-relaxed">
                    {metric.description}
                  </div>

                  {/* Subtle Animation Line */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-px transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                    style={getGradientStyle(theme.colors)}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
