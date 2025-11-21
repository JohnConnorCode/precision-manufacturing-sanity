"use client";

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import * as Icons from 'lucide-react';
import Link from 'next/link';
import ParallaxImage from '@/components/ui/parallax-image';
import SectionHeader from '@/components/ui/section-header';
import { spacing, colors } from '@/lib/design-system';
import { useTheme } from '@/lib/contexts/ThemeContext';
import { hexToRgba } from '@/lib/theme-utils';
import { usePrefersReducedMotion } from '@/lib/motion';
import { SECTION_CONFIGS, getInitialState, getAnimateState, getViewportConfig } from '@/lib/animation-config';
import { Industry, SectionHeader as SectionHeaderData } from '@/lib/types/cms';

// Dynamic icon component - supports ALL Lucide icons
function DynamicIcon({ name, className }: { name?: string; className?: string }) {
  const Icon = name ? (Icons as any)[name] || Icons.Circle : Icons.Circle;
  return <Icon className={className} />;
}

// NO fallback industries - use ONLY Sanity data

interface IndustriesProps {
  data?: Industry[];
  sectionData?: SectionHeaderData;
}

export default function Industries({ data, sectionData }: IndustriesProps) {
  const theme = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();

  // Use CMS data with text fallbacks for section headers
  const industriesData = (Array.isArray(data) ? data : (data ? [data] : [])).filter(Boolean);
  const displayIndustries = industriesData || [];

  // Use section data from CMS with text fallbacks
  const eyebrow = sectionData?.eyebrow;
  const heading = sectionData?.heading;
  const description = sectionData?.description;
  const subdescription = sectionData?.subdescription;
  const hasHeaderContent = Boolean(eyebrow || heading || description);

  return (
    <section className={`${spacing.section} ${colors.bgLight}`}>
      <div className={spacing.containerWide}>
        {hasHeaderContent && (
          <SectionHeader
            eyebrow={eyebrow}
            heading={heading}
            gradientWordPosition="last"
            description={description}
          />
        )}

        {subdescription && (
          <p className="text-base md:text-lg text-slate-600 text-center max-w-3xl mx-auto mb-12">
            {subdescription}
          </p>
        )}

        <div className={`grid grid-cols-1 md:grid-cols-3 ${spacing.grid}`}>
          {displayIndustries.map((industry: Industry, index: number) => {
            const headerDelay = SECTION_CONFIGS.threeColumnGrid.headerCompletion;
            const cardDelay = headerDelay + SECTION_CONFIGS.threeColumnGrid.getDelay(index);
            const viewportConfig = getViewportConfig();

            // Get image URL - handle both Sanity image objects and direct URLs
            const imageUrl = typeof industry.image === 'string'
              ? industry.image
              : (industry.image as any)?.asset?.url || null;
            const displayImage = imageUrl;

            const card = (
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <Card
                  className={`overflow-hidden hover:shadow-xl transition-all duration-300 ${colors.borderLight}`}
                  style={{
                    '--hover-border': hexToRgba(theme.colors.primary, 0.5),
                  } as React.CSSProperties}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = hexToRgba(theme.colors.primary, 0.5)}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = ''}
                >
                    <div className="relative h-56 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50">
                      <ParallaxImage
                        src={displayImage}
                        alt={industry.title}
                        className="w-full h-full group-hover:scale-110 transition-transform duration-700"
                        speed={0.2}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/50 to-transparent" />

                      {/* Icon and title overlay on image */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="flex items-start gap-3 mb-3">
                          <div
                            className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
                            style={{ backgroundColor: theme.colors.primary }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.colors.secondary}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme.colors.primary}
                          >
                            <DynamicIcon name={industry.iconName} className="h-6 w-6 text-white" />
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
            );

            return (
              <motion.div
                key={industry.title}
                initial={getInitialState(prefersReducedMotion)}
                whileInView={getAnimateState(cardDelay, 0.6, prefersReducedMotion)}
                viewport={viewportConfig}
                className="group"
              >
                {industry.href ? (
                  <Link href={industry.href} className="block">
                    {card}
                  </Link>
                ) : (
                  card
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
