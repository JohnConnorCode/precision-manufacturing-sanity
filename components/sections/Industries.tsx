"use client";

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Plane, Zap, Shield, LucideIcon } from 'lucide-react';
import Link from 'next/link';
import ParallaxImage from '@/components/ui/parallax-image';
import AnimatedSection from '@/components/ui/animated-section';
import { typography, spacing, colors, borderRadius } from '@/lib/design-system';

// Icon mapping for CMS data
const iconMap: Record<string, LucideIcon> = {
  'Shield': Shield,
  'Zap': Zap,
  'Plane': Plane,
};

interface IndustriesProps {
  data?: any;
  sectionData?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    subdescription?: string;
  };
}

export default function Industries({ data, sectionData }: IndustriesProps) {
  // Use CMS data only
  const industriesData = data;

  // Use section data from CMS only
  const eyebrow = sectionData?.eyebrow;
  const heading = sectionData?.heading;
  const description = sectionData?.description;

  // Don't render if no data from CMS
  if (!industriesData || industriesData.length === 0) {
    return null;
  }

  return (
    <section className={`${spacing.section} ${colors.bgLight}`}>
      <div className={spacing.containerWide}>
        <AnimatedSection className={`text-center ${spacing.headingBottom}`}>
          {/* Clear Section Purpose */}
          <p className={`${typography.eyebrow} ${colors.textMedium} mb-4`}>
            {eyebrow}
          </p>

          <h2 className={`${typography.sectionHeading} mb-6`}>
            {heading}
          </h2>

          <p className={`${typography.descriptionMuted} max-w-3xl mx-auto`}>
            {description}
          </p>
        </AnimatedSection>

        <div className={`grid grid-cols-1 md:grid-cols-3 ${spacing.grid}`}>
          {industriesData.map((industry: any, index: number) => {
            // Handle both CMS data (iconName) and hardcoded data (icon)
            const Icon = industry.iconName ? (iconMap[industry.iconName] || Plane) : (industry.icon || Plane);
            return (
              <AnimatedSection key={industry.title} delay={index * 0.1} className="group">
                <Link href={industry.href} className="block">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    <Card className={`overflow-hidden hover:shadow-xl transition-all duration-300 ${colors.borderLight} hover:border-blue-600/50`}>
                    <div className="relative h-56 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50">
                      {industry.image && (
                        <>
                          <ParallaxImage
                            src={industry.image}
                            alt={industry.title}
                            className="w-full h-full group-hover:scale-110 transition-transform duration-700"
                            speed={0.2}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/50 to-transparent" />
                        </>
                      )}

                      {/* Icon and title overlay on image */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-600 transition-colors">
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-white leading-tight pt-2">
                            {industry.title}
                          </h3>
                        </div>

                        {/* Feature badges on image */}
                        <div className="flex flex-wrap gap-2">
                          {industry.features?.map((feature: any, index: number) => {
                            // Handle both string and object formats
                            const featureText = typeof feature === 'string' ? feature : feature.feature;
                            return (
                              <span
                                key={index}
                                className="text-[10px] font-semibold text-white/90 bg-white/10 backdrop-blur-sm px-2 py-1 rounded uppercase tracking-wider"
                              >
                                {featureText}
                              </span>
                            );
                          }) || null}
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-white">
                      <p className={`text-sm ${colors.textMedium} leading-relaxed`}>
                        {industry.description}
                      </p>
                    </div>
                  </Card>
                  </motion.div>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}