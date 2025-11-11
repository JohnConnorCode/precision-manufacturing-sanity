"use client";

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Plane, Zap, Shield, LucideIcon } from 'lucide-react';
import Link from 'next/link';
import ParallaxImage from '@/components/ui/parallax-image';
import SectionHeader from '@/components/ui/section-header';
import { typography, spacing, colors } from '@/lib/design-system';
import { portableTextToPlainTextMemoized as portableTextToPlainText } from '@/lib/performance';
import { useTheme } from '@/lib/contexts/ThemeContext';
import { hexToRgba } from '@/lib/theme-utils';
import { usePrefersReducedMotion } from '@/lib/motion';
import { SECTION_CONFIGS, getInitialState, getAnimateState, getViewportConfig } from '@/lib/animation-config';
import { Industry, SectionHeader as SectionHeaderData } from '@/lib/types/cms';

// Icon mapping for CMS data
const iconMap: Record<string, LucideIcon> = {
  'Shield': Shield,
  'Zap': Zap,
  'Plane': Plane,
};

// Fallback industries data
const fallbackIndustries = [
  {
    title: 'Defense & Government',
    description: 'ITAR registered with rapid prototyping and secure facility capabilities',
    iconName: 'Shield',
    href: '/industries/defense',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=90',
    features: ['ITAR registered', 'Secure facility', 'Rapid prototyping']
  },
  {
    title: 'Energy & Power',
    description: 'Superalloy expertise with large part capability and field service support',
    iconName: 'Zap',
    href: '/industries/energy',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=90',
    features: ['Superalloy expertise', 'Large part capability', 'Field service support']
  },
  {
    title: 'Aerospace & Aviation',
    description: 'AS9100D certified with NADCAP accreditation and zero defect delivery',
    iconName: 'Plane',
    href: '/industries/aerospace',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=90',
    features: ['AS9100D certified', 'NADCAP accredited', 'Zero defect delivery']
  }
];

interface IndustriesProps {
  data?: Industry[];
  sectionData?: SectionHeaderData;
}

export default function Industries({ data, sectionData }: IndustriesProps) {
  const theme = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();

  // Use CMS data with fallback
  const industriesData = (Array.isArray(data) ? data : (data ? [data] : [])).filter(Boolean);
  const displayIndustries = (industriesData && industriesData.length > 0) ? industriesData : fallbackIndustries;

  // Use section data from CMS with fallbacks
  const eyebrow = sectionData?.eyebrow || 'SPECIALIZED SECTOR EXPERTISE';
  const heading = sectionData?.heading || 'INDUSTRY LEADERS';
  const description = sectionData?.description || 'Three decades of trusted precision manufacturing across critical sectors';

  return (
    <section className={`${spacing.section} ${colors.bgLight}`}>
      <div className={spacing.containerWide}>
        <SectionHeader
          eyebrow={eyebrow}
          heading={heading}
          gradientWordPosition="last"
          description={description}
        />

        <div className={`grid grid-cols-1 md:grid-cols-3 ${spacing.grid}`}>
          {displayIndustries.map((industry: Industry, index: number) => {
            // Handle both CMS data (iconName) and hardcoded data (icon)
            const Icon = industry.iconName ? (iconMap[industry.iconName] || Plane) : (industry.icon || Plane);
            const cardDelay = SECTION_CONFIGS.threeColumnGrid.getDelay(index);
            const viewportConfig = getViewportConfig();

            return (
              <motion.div
                key={industry.title}
                initial={getInitialState(prefersReducedMotion)}
                whileInView={getAnimateState(cardDelay, 0.6, prefersReducedMotion)}
                viewport={viewportConfig}
                className="group"
              >
                <Link href={industry.href} className="block">
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
                          <div
                            className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
                            style={{ backgroundColor: theme.colors.primary }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.colors.secondary}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme.colors.primary}
                          >
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
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}