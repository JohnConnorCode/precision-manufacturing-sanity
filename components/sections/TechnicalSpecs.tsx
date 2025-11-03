"use client";

import { motion } from 'framer-motion';
import { Gauge, Cpu, Shield, Target, Award, Clock, Activity, Zap } from 'lucide-react';
import AnimatedSection from '@/components/ui/animated-section';
import { typography, spacing, colors, borderRadius } from '@/lib/design-system';

interface TechnicalSpecsData {
  title?: string;
  subtitle?: string;
  specs?: Array<{
    label: string;
    value: string;
    unit?: string;
  }>;
}

interface TechnicalSpecsProps {
  data?: TechnicalSpecsData;
}

export default function TechnicalSpecs({ data }: TechnicalSpecsProps) {
  const defaultMetrics = [
    {
      icon: Gauge,
      value: "±0.0001\"",
      label: "PRECISION",
      description: "Ultra-tight tolerances",
      gradient: "from-blue-600 to-indigo-600"
    },
    {
      icon: Cpu,
      value: "5-AXIS",
      label: "CNC CAPABILITY",
      description: "Simultaneous machining",
      gradient: "from-blue-600 to-indigo-600"
    },
    {
      icon: Shield,
      value: "AS9100D",
      label: "CERTIFIED",
      description: "Aerospace quality",
      gradient: "from-blue-600 to-indigo-600"
    },
    {
      icon: Activity,
      value: "99.73%",
      label: "FIRST PASS YIELD",
      description: "Quality rate",
      gradient: "from-indigo-600 to-purple-600"
    },
    {
      icon: Clock,
      value: "24/7",
      label: "PRODUCTION",
      description: "Continuous operation",
      gradient: "from-blue-600 to-indigo-600"
    },
    {
      icon: Target,
      value: "99.8%",
      label: "ON-TIME",
      description: "Delivery performance",
      gradient: "from-blue-600 to-indigo-600"
    },
    {
      icon: Zap,
      value: "30",
      label: "YEARS",
      description: "Manufacturing excellence",
      gradient: "from-indigo-600 to-purple-600"
    },
    {
      icon: Award,
      value: "ITAR",
      label: "REGISTERED",
      description: "Defense compliant",
      gradient: "from-blue-600 to-indigo-600"
    }
  ];

  // Convert CMS data to metrics format if available
  const metrics = data?.specs ? data.specs.map((spec, index) => ({
    icon: defaultMetrics[index % defaultMetrics.length].icon,
    value: spec.value + (spec.unit || ''),
    label: spec.label.toUpperCase(),
    description: `${spec.label} specification`,
    gradient: defaultMetrics[index % defaultMetrics.length].gradient
  })) : defaultMetrics;

  const title = data?.title || 'Precision By The Numbers';
  const subtitle = data?.subtitle || 'Industry-leading capabilities backed by decades of aerospace and defense manufacturing expertise';

  return (
    <section className={`${spacing.section} relative overflow-hidden ${colors.bgLight}`}>
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className={`${spacing.containerWide} relative z-10`}>
        <AnimatedSection className={`text-center ${spacing.headingBottom} max-w-4xl mx-auto`}>
          <p className={`${typography.eyebrow} ${colors.textMedium} mb-4`}>
            COMPREHENSIVE MANUFACTURING SOLUTIONS
          </p>
          <h2 className={`${typography.sectionHeading} ${colors.textDark} mb-6`}>
            {title.includes('Numbers') ? (
              <>
                Precision By The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Numbers</span>
              </>
            ) : (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{title}</span>
            )}
          </h2>
          <p className={`${typography.descriptionMuted}`}>
            {subtitle}
          </p>
        </AnimatedSection>

        {/* Metrics Grid - Clean Professional Design */}
        <div className={`grid grid-cols-2 md:grid-cols-4 ${spacing.grid}`}>
          {metrics.map((metric, index) => {
            const Icon = metric.icon || Gauge;
            return (
              <AnimatedSection
                key={metric.label}
                delay={index * 0.05}
                className="group"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className={`relative bg-white border ${colors.borderLight} ${borderRadius.card} p-6 hover:border-blue-600/30 hover:shadow-xl transition-all duration-300`}
                >
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${metric.gradient} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Metric Value */}
                  <div className={`text-2xl md:text-3xl font-black ${colors.textDark} mb-1 tracking-tight`}>
                    {metric.value}
                  </div>

                  {/* Label */}
                  <div className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-2">
                    {metric.label}
                  </div>

                  {/* Description */}
                  <div className={`text-xs ${colors.textMedium} leading-relaxed`}>
                    {metric.description}
                  </div>

                  {/* Subtle Bottom Accent */}
                  <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r ${metric.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>

      </div>
    </section>
  );
}