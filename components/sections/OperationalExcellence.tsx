"use client";

import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import SectionHeader from '@/components/ui/section-header';
import { useTheme } from '@/lib/contexts/ThemeContext';
import { usePrefersReducedMotion } from '@/lib/motion';
import { SECTION_CONFIGS, getInitialState, getAnimateState, getViewportConfig } from '@/lib/animation-config';

// Dynamic icon component
function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const Icon = (Icons as any)[name] || Icons.Circle;
  return <Icon className={className} />;
}

interface Benefit {
  iconName?: string;
  title: string;
  description: string;
}

interface OperationalExcellenceData {
  heading?: string;
  description?: string;
  benefits?: Benefit[];
}

interface OperationalExcellenceProps {
  data?: OperationalExcellenceData;
}

// NO fallback benefits - use ONLY Sanity data

export default function OperationalExcellence({ data }: OperationalExcellenceProps) {
  const theme = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();

  // Use CMS data, return null if no benefits data
  if (!data?.benefits || data.benefits.length === 0) {
    return null;
  }

  const heading = data?.heading;
  const description = data?.description;
  const benefits = data.benefits;

  return (
    <section className="py-24 md:py-32 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <SectionHeader
            heading={heading}
            gradientWordPosition="last"
            description={description}
            className="[&_h2]:text-white [&_p]:text-slate-300"
          />
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {benefits.filter((benefit: any) => benefit.enabled !== false).map((benefit, index) => {
            const headerDelay = SECTION_CONFIGS.listItems.headerCompletion;
            const benefitDelay = headerDelay + SECTION_CONFIGS.listItems.getDelay(index);
            const viewportConfig = getViewportConfig();

            return (
              <motion.div
                key={index}
                initial={getInitialState(prefersReducedMotion)}
                whileInView={getAnimateState(benefitDelay, 0.6, prefersReducedMotion)}
                viewport={viewportConfig}
                className="text-center"
              >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full text-white mb-6" style={{ backgroundColor: theme.colors.primary }}>
                <DynamicIcon name={benefit.iconName || 'Circle'} className="w-8 h-8" />
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold mb-4">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="text-slate-300 leading-relaxed">
                {benefit.description}
              </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { OperationalExcellence };
