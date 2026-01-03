"use client";

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Cog, Cpu, Gauge, Users, ArrowRight, CheckCircle, LucideIcon, Target, Zap, Wrench, Settings, Microscope, PenTool } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import SectionHeader from '@/components/ui/section-header';
import { PremiumButton } from '@/components/ui/premium-button';
import { spacing, colors } from '@/lib/design-system';
import { usePrefersReducedMotion } from '@/lib/motion';
import { useTheme } from '@/lib/contexts/ThemeContext';
import { getPrimaryColorStyle } from '@/lib/theme-utils';
import { SECTION_CONFIGS } from '@/lib/animation-config';
import { useAnimateInView, ANIM_STATES, ANIM_TRANSITION } from '@/lib/use-animate-in-view';
import { Service, SectionHeader as SectionHeaderData } from '@/lib/types/cms';
import { DotGridBackground } from '@/lib/background-patterns';

// Icon mapping for CMS data
const iconMap: Record<string, LucideIcon> = {
  'Cog': Cog,
  'Cpu': Cpu,
  'Gauge': Gauge,
  'Users': Users,
  'Target': Target,
  'Zap': Zap,
  'Wrench': Wrench,
  'Settings': Settings,
  'Microscope': Microscope,
  'PenTool': PenTool,
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
    cardCtaText?: string;
  };
}

export default function Services({ data, sectionData }: ServicesProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const theme = useTheme();

  // Animation hooks for scroll-triggered animations that work on refresh
  const cardsAnim = useAnimateInView<HTMLDivElement>();
  const ctaAnim = useAnimateInView<HTMLDivElement>();

  // Use CMS data with text fallbacks for section headers
  const servicesData = (Array.isArray(data) ? data : (data ? [data] : [])).filter(Boolean);
  const displayServices = servicesData || [];

  // Section data from CMS (no hard-coded fallbacks)
  const eyebrow = sectionData?.header?.eyebrow || sectionData?.eyebrow;
  const headingWord1 = sectionData?.header?.headingWord1 || sectionData?.headingWord1;
  const headingWord2 = sectionData?.header?.headingWord2 || sectionData?.headingWord2;
  const heading = sectionData?.header?.heading || sectionData?.heading;
  const description = sectionData?.header?.description || sectionData?.description;
  const hasHeaderContent = Boolean(eyebrow || headingWord1 || headingWord2 || heading || description);
  const ctaLink = sectionData?.cta?.enabled !== false && sectionData?.cta?.href && sectionData?.cta?.text
    ? { href: sectionData.cta.href, text: sectionData.cta.text }
    : null;
  const subdescription = sectionData?.subdescription;
  const cardCtaText = sectionData?.cardCtaText || 'View Details';

  return (
    <section className={`relative ${spacing.section} overflow-hidden ${colors.bgLight} dark:bg-slate-950`}>
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
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 text-center max-w-4xl mx-auto mb-6">
            {subdescription}
          </p>
        )}

        <div ref={cardsAnim.ref} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ${spacing.grid}`}>
          {displayServices.map((service: Service, index: number) => {
            // Handle both CMS data (iconName) and hardcoded data (icon)
            const Icon = service.iconName ? (iconMap[service.iconName] || Cog) : (service.icon || Cog);
            const baseDelay = SECTION_CONFIGS.fourColumnGrid.headerCompletion;
            const cardDelay = baseDelay + SECTION_CONFIGS.fourColumnGrid.getDelay(index);

            return (
              <motion.div
                key={service.title}
                initial={prefersReducedMotion ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
                animate={cardsAnim.shouldAnimate ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
                transition={{ ...ANIM_TRANSITION, delay: prefersReducedMotion ? 0 : cardDelay }}
                className="group"
              >
                <Link href={service.href} className="block h-full">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    <Card
                      className="h-full min-h-[480px] overflow-hidden transition-all duration-300 hover:shadow-2xl border-0 bg-white dark:bg-slate-900 relative shadow-lg dark:shadow-slate-950/50"
                    >
                    {/* Image Header */}
                    <div className="relative h-52 overflow-hidden">
                      {service.image && (
                        <>
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
                        </>
                      )}

                      {/* Floating Icon with Premium Effect */}
                      <div className="absolute bottom-4 left-5">
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-all duration-300"
                          style={{
                            background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                          }}
                        >
                          <Icon className="h-7 w-7 text-tone-inverse" />
                        </div>
                      </div>

                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      <h3
                        className="text-lg font-bold mb-3 text-slate-900 dark:text-tone-inverse group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2"
                      >
                        {service.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed line-clamp-3">
                        {service.description}
                      </p>

                      {/* Specs with subtle background */}
                      <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 mb-5 flex-1">
                        <ul className="space-y-2">
                          {(service.specs || []).slice(0, 3).map((spec, specIndex: number) => {
                            // Handle both string and object formats
                            const specText = typeof spec === 'string' ? spec : (spec.text || spec.spec);
                            return (
                              <li key={specIndex} className="flex items-start text-xs text-slate-700 dark:text-slate-300">
                                <CheckCircle className="h-3.5 w-3.5 mr-2 mt-0.5 flex-shrink-0" style={getPrimaryColorStyle(theme.colors)} />
                                <span className="leading-relaxed">{specText}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                      {/* Card CTA Link - Text controlled via Sanity CMS */}
                      <div
                        className="flex items-center font-semibold text-sm transition-all duration-300 mt-auto"
                        style={{ color: theme.colors.primary }}
                      >
                        <span className="group-hover:mr-2 transition-all duration-300">{cardCtaText}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
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
            ref={ctaAnim.ref}
            initial={prefersReducedMotion ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
            animate={ctaAnim.shouldAnimate ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
            transition={{ ...ANIM_TRANSITION, delay: prefersReducedMotion ? 0 : 0.5 }}
            className="text-center mt-16 md:mt-20"
          >
            <Link href={ctaLink.href}>
              <PremiumButton size="lg">
                {ctaLink.text}
                <ArrowRight className="ml-2 h-5 w-5" />
              </PremiumButton>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
