"use client";

import { Gauge, Cpu, Shield, Target, Award, Clock, Activity, Zap, CheckCircle2, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/section-header';
import { useTheme } from '@/lib/contexts/ThemeContext';
import { getGradientStyle, hexToRgba } from '@/lib/theme-utils';
import { usePrefersReducedMotion } from '@/lib/motion';
import { SECTION_CONFIGS, getInitialState, getAnimateState, getViewportConfig } from '@/lib/animation-config';

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

  // Icon mapping for CMS data
  const iconMap: Record<string, any> = {
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
    <section className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
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

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            heading={title}
            gradientWordPosition="last"
            description={subtitle}
            centered={true}
            className="[&_h2]:text-white [&_p]:text-slate-400"
          />
        </div>

        {/* Metrics Grid - Premium Card Design */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon || Gauge;
            const headerDelay = SECTION_CONFIGS.metricsGrid.headerCompletion;
            const metricDelay = headerDelay + SECTION_CONFIGS.metricsGrid.getDelay(index);
            const viewportConfig = getViewportConfig();

            return (
              <motion.div
                key={metric.label}
                initial={getInitialState(prefersReducedMotion)}
                whileInView={getAnimateState(metricDelay, 0.6, prefersReducedMotion)}
                viewport={viewportConfig}
                className="group relative"
              >
                <div
                  className="relative bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-6 transition-all duration-300 hover:bg-slate-900/70"
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

                  {/* Icon */}
                  <div className="relative w-12 h-12 rounded-xl p-[1px] mb-4" style={getGradientStyle(theme.colors)}>
                    <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Metric Value */}
                  <div className="text-2xl md:text-3xl font-black text-white mb-1 tracking-tight">
                    {metric.value}
                  </div>

                  {/* Label */}
                  <div className="text-xs font-bold uppercase tracking-[0.15em] mb-2" style={{ color: theme.colors.primary }}>
                    {metric.label}
                  </div>

                  {/* Description */}
                  <div className="text-xs text-slate-500 leading-relaxed">
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
