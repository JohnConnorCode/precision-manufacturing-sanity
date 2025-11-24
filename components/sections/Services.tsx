"use client";

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Cog, Cpu, Gauge, Users, ArrowRight, CheckCircle, LucideIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import SectionHeader from '@/components/ui/section-header';
import { spacing, colors, borderRadius } from '@/lib/design-system';
import { usePrefersReducedMotion } from '@/lib/motion';
import { useTheme } from '@/lib/contexts/ThemeContext';
import { getPrimaryColorStyle, hexToRgba } from '@/lib/theme-utils';
import { SECTION_CONFIGS, getInitialState, getAnimateState, getViewportConfig } from '@/lib/animation-config';
import { Service, SectionHeader as SectionHeaderData } from '@/lib/types/cms';
import { DotGridBackground } from '@/lib/background-patterns';

// Icon mapping for CMS data
const iconMap: Record<string, LucideIcon> = {
  'Cog': Cog,
  'Cpu': Cpu,
  'Gauge': Gauge,
  'Users': Users,
};

// NO fallback services - use ONLY Sanity data

interface ServicesProps {
  data?: Service[];
  sectionData?: SectionHeaderData & {
    header?: {
      eyebrow?: string;
      heading?: string;
      headingWord1?: string;
      headingWord2?: string;
      description?: string;
    };
    cta?: {
      enabled?: boolean;
      text?: string;
      href?: string;
      variant?: string;
    };
  };
}

export default function Services({ data, sectionData }: ServicesProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const theme = useTheme();

  // Use CMS data with text fallbacks for section headers
  const servicesData = (Array.isArray(data) ? data : (data ? [data] : [])).filter(Boolean);
  const displayServices = servicesData || [];

  // Section data from CMS (no hard-coded fallbacks)
  const eyebrow = sectionData?.header?.eyebrow || sectionData?.eyebrow;
  const headingWord1 = sectionData?.headingWord1 || sectionData?.header?.headingWord1;
  const headingWord2 = sectionData?.headingWord2 || sectionData?.header?.headingWord2;
  const heading = sectionData?.header?.heading || sectionData?.heading;
  const description = sectionData?.header?.description || sectionData?.description;
  const hasHeaderContent = Boolean(eyebrow || headingWord1 || headingWord2 || heading || description);
  const ctaLink = sectionData?.cta?.enabled !== false && sectionData?.cta?.href && sectionData?.cta?.text
    ? { href: sectionData.cta.href, text: sectionData.cta.text }
    : null;
  const subdescription = sectionData?.subdescription;

  return (
    <section className={`relative ${spacing.section} overflow-hidden ${colors.bgLight}`}>
      {/* Subtle Background Pattern */}
      <DotGridBackground spacing={40} dotPosition={1} />

      <div className={`${spacing.containerWide} relative z-10`}>
        {hasHeaderContent && (
          <SectionHeader
            eyebrow={eyebrow}
            word1={headingWord1}
            word2={headingWord2}
            heading={!headingWord1 && !headingWord2 ? heading : undefined}
            description={description}
          />
        )}

        {subdescription && (
          <p className="text-base md:text-lg text-slate-600 text-center max-w-4xl mx-auto mb-12">
            {subdescription}
          </p>
        )}

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ${spacing.grid}`}>
          {displayServices.map((service: Service, index: number) => {
            // Handle both CMS data (iconName) and hardcoded data (icon)
            const Icon = service.iconName ? (iconMap[service.iconName] || Cog) : (service.icon || Cog);
            const baseDelay = SECTION_CONFIGS.fourColumnGrid.headerCompletion;
            const cardDelay = baseDelay + SECTION_CONFIGS.fourColumnGrid.getDelay(index);
            const viewportConfig = getViewportConfig();

            return (
              <motion.div
                key={service.title}
                initial={getInitialState(prefersReducedMotion)}
                whileInView={getAnimateState(cardDelay, 0.6, prefersReducedMotion)}
                viewport={viewportConfig}
                className="group perspective-1000"
              >
                <Link href={service.href} className="block h-full">
                  <motion.div
                    whileHover={{
                      y: -8,
                      rotateX: 5,
                      rotateY: 5,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 25
                      }
                    }}
                    whileTap={{ scale: 0.98 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <Card
                      className={`h-full overflow-hidden transition-all duration-300 hover:shadow-xl border-slate-200 bg-white relative ${
                        service.highlight ? 'ring-2' : ''
                      }`}
                      style={service.highlight ? { borderColor: hexToRgba(theme.colors.primary, 0.2) } : undefined}
                    >
                    {/* Image Header */}
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50">
                      {service.image && (
                        <>
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            className="object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-out"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        </>
                      )}

                      {/* Floating Icon with Premium Effect */}
                      <div className="absolute bottom-4 left-4">
                        <div
                          className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 group-hover:rotate-2 transition-all duration-300"
                          style={{
                            ...getPrimaryColorStyle(theme.colors),
                          }}
                        >
                          <Icon className="h-6 w-6" style={getPrimaryColorStyle(theme.colors)} />
                        </div>
                      </div>

                      {service.highlight && (
                        <div className="absolute top-4 right-4">
                          <span
                            className="px-3 py-1 text-white text-xs font-semibold rounded-full"
                            style={{ backgroundColor: theme.colors.primary }}
                          >
                            FEATURED
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3
                        className="text-xl font-bold mb-2 text-slate-900 transition-colors duration-300"
                        style={{ '--hover-color': theme.colors.primary } as React.CSSProperties}
                        onMouseEnter={(e) => e.currentTarget.style.color = theme.colors.primary}
                        onMouseLeave={(e) => e.currentTarget.style.color = ''}
                      >
                        {service.title}
                      </h3>
                      <p className="text-sm text-slate-800 mb-4 leading-relaxed">
                        {service.description}
                      </p>

                      <ul className="space-y-2 mb-5">
                        {(service.specs || []).map((spec, specIndex: number) => {
                          // Handle both string and object formats
                          const specText = typeof spec === 'string' ? spec : (spec.text || spec.spec);
                          return (
                            <li key={specIndex} className="flex items-start text-xs text-slate-800">
                              <CheckCircle className="h-3 w-3 mr-2 mt-0.5 flex-shrink-0" style={getPrimaryColorStyle(theme.colors)} />
                              <span>{specText}</span>
                            </li>
                          );
                        })}
                      </ul>

                      <div
                        className="flex items-center font-semibold text-sm transition-colors duration-300"
                        style={{ color: theme.colors.primary }}
                        onMouseEnter={(e) => e.currentTarget.style.color = theme.colors.secondary}
                        onMouseLeave={(e) => e.currentTarget.style.color = theme.colors.primary}
                      >
                        <div className="group-hover:translate-x-1 transition-transform duration-300">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Card>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        {ctaLink && (
          <motion.div
            initial={getInitialState(prefersReducedMotion)}
            whileInView={getAnimateState(0.5, 0.6, prefersReducedMotion)}
            viewport={getViewportConfig()}
            className="text-center mt-16 md:mt-20"
          >
            <Link
              href={ctaLink.href}
              className={`inline-flex items-center h-12 px-8 bg-gradient-to-r ${colors.primaryGradient} hover:${colors.primaryGradientHover} text-white font-semibold ${borderRadius.button} transition-all duration-300 shadow-lg hover:shadow-xl`}
            >
              {ctaLink.text}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
