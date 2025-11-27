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
  sectionData?: SectionHeaderData & {
    header?: {
      eyebrow?: string;
      title?: string;
      titleHighlight?: string;
      description?: string;
    };
  };
}

export default function Industries({ data, sectionData }: IndustriesProps) {
  const theme = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();

  // Use CMS data with text fallbacks for section headers
  const industriesData = (Array.isArray(data) ? data : (data ? [data] : [])).filter(Boolean);
  const displayIndustries = industriesData || [];

  // Use section data from CMS - prefer header object, fallback to direct fields
  const eyebrow = sectionData?.header?.eyebrow || sectionData?.eyebrow;
  const headerTitle = sectionData?.header?.title;
  const headerTitleHighlight = sectionData?.header?.titleHighlight;
  const heading = headerTitle && headerTitleHighlight
    ? `${headerTitle} ${headerTitleHighlight}`
    : sectionData?.heading;
  const description = sectionData?.header?.description || sectionData?.description;
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
          <p className="text-base md:text-lg text-slate-600 text-center max-w-3xl mx-auto mb-6">
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
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <Card
                  className="overflow-hidden h-full transition-all duration-300 border-slate-200/60 hover:border-blue-500/30 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_20px_-5px_rgba(0,0,0,0.1)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15),0_10px_20px_-5px_rgba(0,0,0,0.1)]"
                  style={{
                    '--hover-border': hexToRgba(theme.colors.primary, 0.5),
                  } as React.CSSProperties}
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
                            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 shadow-lg shadow-blue-600/30 group-hover:shadow-xl group-hover:shadow-blue-600/40 group-hover:scale-105"
                            style={{ backgroundColor: theme.colors.primary }}
                          >
                            <DynamicIcon name={industry.iconName} className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-white leading-tight pt-2 tracking-tight">
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
                                className="text-[10px] font-semibold text-white/90 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-md uppercase tracking-wider border border-white/10"
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
