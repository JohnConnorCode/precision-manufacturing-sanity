'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { PremiumButton } from '@/components/ui/premium-button';
import Image from 'next/image';
import SectionHeader from '@/components/ui/section-header';
import HeroSection from '@/components/ui/hero-section';
import { PortableTextContent } from '@/components/portable-text-components';
import { typography, spacing, styles, cn } from '@/lib/design-system';
import { usePrefersReducedMotion } from '@/lib/motion';
import { SECTION_CONFIGS, getInitialState, getAnimateState, getViewportConfig } from '@/lib/animation-config';
import { ArrowRight, CheckCircle, Settings, Shield, Zap, Cog, Target, FileText, Award, Activity, TrendingDown, Wrench, LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Settings,
  Shield,
  Zap,
  Cog,
  Target,
  FileText,
  Award,
  Activity,
  TrendingDown,
  Wrench,
};

// Sanity image source type
interface SanityImageSource {
  asset?: { _ref?: string; url?: string };
  url?: string;
  alt?: string;
}

// Portable text block type
interface PortableTextBlock {
  _type: string;
  _key?: string;
  [key: string]: unknown;
}

// Feature item type
interface FeatureItem {
  feature?: string;
}

// Capability list item type
interface CapabilityListItem {
  capability?: string;
}

// Capability stat type (label/value pairs)
interface CapabilityStat {
  enabled?: boolean;
  label?: string;
  value?: string;
  description?: string;
}

// Capability card type (title/description with features)
interface CapabilityCard {
  enabled?: boolean;
  title?: string;
  description?: string;
  iconName?: string;
  image?: SanityImageSource;
  imageUrl?: string;
  featuresLabel?: string;
  features?: FeatureItem[];
  capabilitiesLabel?: string;
  capabilitiesList?: CapabilityListItem[];
}

// Benefit type
interface Benefit {
  enabled?: boolean;
  title?: string;
  description?: string;
  iconName?: string;
}

// Service offering type
interface ServiceOffering {
  enabled?: boolean;
  title?: string;
  description?: string;
  descriptionRich?: PortableTextBlock[];
  iconName?: string;
  image?: SanityImageSource;
  imageUrl?: string;
  featuresLabel?: string;
  features?: FeatureItem[];
  capabilitiesLabel?: string;
  capabilities?: CapabilityListItem[];
}

// Material type item
interface MaterialType {
  type?: string;
}

// Material category type
interface MaterialCategory {
  enabled?: boolean;
  category?: string;
  types?: MaterialType[];
}

// Application challenge type
interface ApplicationChallenge {
  challenge?: string;
}

// Application type
interface ApplicationItem {
  enabled?: boolean;
  title?: string;
  description?: string;
  timeline?: string;
  listLabel?: string;
  image?: SanityImageSource;
  imageUrl?: string;
  challenges?: ApplicationChallenge[];
}

// Quality standard type
interface QualityStandard {
  enabled?: boolean;
  title?: string;
  description?: string;
  iconName?: string;
}

// Process type
interface ProcessItem {
  title?: string;
  description?: string;
  descriptionRich?: PortableTextBlock[];
}

// CTA button type
interface CTAButton {
  enabled?: boolean;
  text?: string;
  href?: string;
  variant?: 'primary' | 'secondary';
}

// Title size type matching HeroSection
type TitleSize = 'base' | 'xs' | 'sm' | 'lg' | 'xl' | '2xl' | '3xl';
// Description size type matching HeroSection
type DescriptionSize = 'base' | 'xs' | 'sm' | 'lg' | 'xl';

// Full service data type
interface ServiceData {
  title: string;
  hero?: {
    title?: string;
    subtitle?: string;
    badge?: string;
    backgroundImage?: SanityImageSource;
    backgroundImageUrl?: string;
    descriptionRich?: PortableTextBlock[];
    titleSize?: TitleSize;
    descriptionSize?: DescriptionSize;
  };
  image?: SanityImageSource;
  imageUrl?: string;
  overview?: {
    description?: string;
    descriptionRich?: PortableTextBlock[];
  };
  capabilities?: (CapabilityStat | CapabilityCard)[];
  benefits?: Benefit[];
  services?: ServiceOffering[];
  servicesHeading?: string;
  servicesDescription?: string;
  servicesDescriptionRich?: PortableTextBlock[];
  materials?: MaterialCategory[];
  materialsHeading?: string;
  materialsDescription?: string;
  applications?: ApplicationItem[];
  applicationsHeading?: string;
  applicationsDescription?: string;
  applicationsListLabel?: string;
  capabilitiesSectionHeading?: string;
  capabilitiesSectionDescription?: string;
  qualityStandards?: QualityStandard[];
  qualityStandardsHeading?: string;
  qualityStandardsDescription?: string;
  qualityImage?: {
    image?: SanityImageSource;
    imageUrl?: string;
    url?: string;
    alt?: string;
  };
  processes?: ProcessItem[];
  processHeading?: string;
  processDescription?: string;
  cta?: {
    badge?: string;
    title?: string;
    description?: string;
    buttons?: CTAButton[];
  };
}

interface ServiceContentProps {
  serviceData: ServiceData;
  slug: string;
}

export function ServiceContent({ serviceData, slug: _slug }: ServiceContentProps) {
  const service = serviceData;
  const router = useRouter();
  const prefersReducedMotion = usePrefersReducedMotion();
  const viewportConfig = getViewportConfig();
  const initialState = getInitialState(prefersReducedMotion);
  const createFade = (delay = 0, duration = 0.8) => getAnimateState(delay, duration, prefersReducedMotion);
  const getStaggerDelay = (config: { headerCompletion?: number; getDelay: (index: number) => number }, index: number) => {
    const headerDelay = config?.headerCompletion || 0;
    return headerDelay + (config?.getDelay ? config.getDelay(index) : 0);
  };

  const heroTitle = service.hero?.title || service.title;
  const heroImage =
    service.hero?.backgroundImage?.asset?.url ||
    service.hero?.backgroundImage?.url ||
    service.hero?.backgroundImageUrl ||
    service.image?.asset?.url ||
    service.imageUrl ||
    '';
  const heroDescription = service.hero?.descriptionRich
    ? <PortableTextContent value={service.hero.descriptionRich} />
    : (service.overview?.descriptionRich
        ? <PortableTextContent value={service.overview.descriptionRich} />
        : service.overview?.description);

  // Hero buttons removed - no CTAs in hero section

  // Stats-style capabilities (label/value pairs)
  const capabilityStats = Array.isArray(service.capabilities)
    ? service.capabilities.filter((item: CapabilityStat | CapabilityCard): item is CapabilityStat =>
        item?.enabled !== false && 'label' in item && 'value' in item && !!item.label && !!item.value)
    : [];
  // Card-style capabilities (title/description with features)
  const capabilityCards = Array.isArray(service.capabilities)
    ? service.capabilities.filter((item: CapabilityStat | CapabilityCard): item is CapabilityCard =>
        item?.enabled !== false && 'title' in item && !!item.title && !('label' in item))
    : [];
  // Benefits section
  const benefits = Array.isArray(service.benefits)
    ? service.benefits.filter((item: Benefit) => item?.enabled !== false && item?.title)
    : [];
  const serviceOfferings = Array.isArray(service.services)
    ? service.services.filter((item: ServiceOffering) => item?.enabled !== false && item?.title)
    : [];
  const materials = Array.isArray(service.materials)
    ? service.materials.filter((item: MaterialCategory) => item?.enabled !== false && item?.category)
    : [];
  const applications = Array.isArray(service.applications)
    ? service.applications.filter((item: ApplicationItem) => item?.enabled !== false && item?.title)
    : [];
  const qualityStandards = Array.isArray(service.qualityStandards)
    ? service.qualityStandards.filter((item: QualityStandard) => item?.enabled !== false && (item?.title || item?.description))
    : [];
  const qualityImageSrc =
    service.qualityImage?.image?.asset?.url ||
    service.qualityImage?.imageUrl ||
    service.qualityImage?.url ||
    null;
  const qualityImageAlt =
    service.qualityImage?.image?.alt ||
    service.qualityImage?.alt ||
    `${service.title} quality standards`;
  const processes = Array.isArray(service.processes)
    ? service.processes.filter((item: ProcessItem) => item?.title)
    : [];

  const servicesHeading = service.servicesHeading || `${heroTitle} Services`;
  const servicesDescriptionNode = service.servicesDescriptionRich
    ? <PortableTextContent value={service.servicesDescriptionRich} />
    : (service.servicesDescription
        ? <p className={cn(typography.lead, 'max-w-3xl mx-auto')}>{service.servicesDescription}</p>
        : service.overview?.descriptionRich
          ? <PortableTextContent value={service.overview.descriptionRich} />
          : null);

  const materialsHeading = service.materialsHeading;
  const materialsDescription = service.materialsDescription;

  const applicationsHeading = service.applicationsHeading;
  const applicationsDescription = service.applicationsDescription;
  const applicationsListLabel = service.applicationsListLabel;

  const capabilitiesHeading = service.capabilitiesSectionHeading;
  const capabilitiesDescription = service.capabilitiesSectionDescription;

  const processHeading = service.processHeading;
  const processDescription = service.processDescription;

  const qualityHeading = service.qualityStandardsHeading;
  const qualityDescription = service.qualityStandardsDescription;

  const ctaData = service.cta;

  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        backgroundImage={heroImage}
        imageAlt={service.hero?.backgroundImage?.alt || service.title}
        height="large"
        alignment="center"
        showScrollIndicator
        badge={{ text: service.hero?.badge || 'SERVICE', icon: Target }}
        title={(() => {
          // Split title to highlight last word in blue gradient
          const words = heroTitle.split(' ');
          if (words.length === 1) {
            return <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600">{heroTitle}</span>;
          }
          const firstPart = words.slice(0, -1).join(' ');
          const lastWord = words[words.length - 1];
          return (
            <span>
              <span className="text-inherit">{firstPart} </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600">{lastWord}</span>
            </span>
          );
        })()}
        subtitle={service.hero?.subtitle}
        description={heroDescription}
        titleSize={service.hero?.titleSize}
        descriptionSize={service.hero?.descriptionSize}
      />

      {capabilityStats.length > 0 && (
        <section className="py-24 md:py-32 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
          <div className={spacing.container}>
            <motion.div
              initial={initialState}
              whileInView={createFade(0, 0.8)}
              viewport={viewportConfig}
              className={styles.grid4Col}
            >
              {capabilityStats.map((capability: CapabilityStat, index: number) => {
                const delay = getStaggerDelay(SECTION_CONFIGS.fourColumnGrid, index);
                return (
                  <motion.div
                    key={`${capability.label}-${capability.value}`}
                    initial={initialState}
                    whileInView={createFade(delay, 0.6)}
                    viewport={viewportConfig}
                    className="text-center"
                  >
                    <div className={styles.statValue}>{capability.value}</div>
                    <div className={cn(typography.badge, 'text-slate-700 dark:text-slate-300 mb-2')}>
                      {capability.label}
                    </div>
                    <div className={typography.small}>{capability.description}</div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      )}

      {/* Capability Cards Section - for services with rich capability data */}
      {capabilityCards.length > 0 && (
        <section className="py-24 md:py-32 lg:py-20">
          <div className={spacing.container}>
            {(capabilitiesHeading || capabilitiesDescription) && (
              <motion.div
                initial={initialState}
                whileInView={createFade(0, 0.8)}
                viewport={viewportConfig}
                className="text-center mb-16"
              >
                {capabilitiesHeading && (
                  <h2 className={cn(typography.h2, 'mb-6')}>{capabilitiesHeading}</h2>
                )}
                {capabilitiesDescription && (
                  <p className={cn(typography.lead, 'max-w-3xl mx-auto')}>
                    {capabilitiesDescription}
                  </p>
                )}
              </motion.div>
            )}

            <div className={styles.grid2Col}>
              {capabilityCards.map((capability: CapabilityCard, index: number) => {
                const CapIcon = capability.iconName ? (iconMap[capability.iconName] || Settings) : Settings;
                const capImage = capability.image?.asset?.url || capability.imageUrl;
                const capAlt = capability.image?.alt || capability.title || 'Capability';
                const delay = getStaggerDelay(SECTION_CONFIGS.twoColumnGrid, index);

                return (
                  <motion.div
                    key={capability.title}
                    initial={initialState}
                    whileInView={createFade(delay, 0.6)}
                    viewport={viewportConfig}
                  >
                    <Card className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_20px_-5px_rgba(0,0,0,0.1)] dark:shadow-slate-950/50 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] hover:border-slate-300/80 dark:hover:border-slate-600 transition-all duration-300 group h-full overflow-hidden">
                      {capImage && (
                        <div className="relative h-52 overflow-hidden">
                          <Image
                            src={capImage}
                            alt={capAlt}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute bottom-4 left-4">
                            <CapIcon className="w-8 h-8 text-tone-inverse" />
                          </div>
                        </div>
                      )}

                      <div className="p-6 md:p-8">
                        <h3 className={cn(typography.h4, 'mb-3 group-hover:text-blue-600 transition-colors')}>
                          {capability.title}
                        </h3>
                        <p className={cn(typography.body, 'mb-4')}>
                          {capability.description}
                        </p>

                        {capability.features && capability.features.length > 0 && (
                          <div className="mb-4">
                            <h4 className={cn(typography.label, 'mb-2')}>
                              {capability.featuresLabel || 'Features'}
                            </h4>
                            <div className="grid grid-cols-2 gap-1">
                              {capability.features.map((f: FeatureItem) => (
                                <div key={f.feature} className={cn('flex items-center', typography.small)}>
                                  <CheckCircle className="w-3 h-3 text-blue-600 mr-1.5 flex-shrink-0" />
                                  {f.feature}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {capability.capabilitiesList && capability.capabilitiesList.length > 0 && (
                          <div>
                            <h4 className={cn(typography.label, 'mb-2')}>
                              {capability.capabilitiesLabel || 'Benefits'}
                            </h4>
                            <div className="space-y-1">
                              {capability.capabilitiesList.map((c: CapabilityListItem) => (
                                <div key={c.capability} className={cn('flex items-center', typography.small)}>
                                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" />
                                  {c.capability}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Benefits Section */}
      {benefits.length > 0 && (
        <section className="py-24 md:py-32 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
          <div className={spacing.container}>
            <motion.div
              initial={initialState}
              whileInView={createFade(0, 0.8)}
              viewport={viewportConfig}
              className="text-center mb-12"
            >
              <h2 className={cn(typography.h2, 'mb-4')}>Key Benefits</h2>
            </motion.div>

            <div className={styles.grid4Col}>
              {benefits.map((benefit: Benefit, index: number) => {
                const BenefitIcon = benefit.iconName ? (iconMap[benefit.iconName] || Award) : Award;
                const delay = getStaggerDelay(SECTION_CONFIGS.fourColumnGrid, index);

                return (
                  <motion.div
                    key={benefit.title}
                    initial={initialState}
                    whileInView={createFade(delay, 0.6)}
                    viewport={viewportConfig}
                  >
                    <Card className={cn(styles.featureCard, 'h-full text-center p-6')}>
                      <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4', 'bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600')}>
                        <BenefitIcon className="w-6 h-6 text-tone-inverse" />
                      </div>
                      <h3 className={cn(typography.h5, 'mb-2')}>{benefit.title}</h3>
                      <p className={typography.small}>{benefit.description}</p>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {serviceOfferings.length > 0 && (
        <section className="py-24 md:py-32 lg:py-20">
          <div className={spacing.container}>
            <motion.div
              initial={initialState}
              whileInView={createFade(0, 0.8)}
              viewport={viewportConfig}
              className="text-center mb-16"
            >
              <h2 className={cn(typography.h2, 'mb-6')}>{servicesHeading}</h2>
              <div className={cn(typography.lead, 'max-w-3xl mx-auto')}>
                {servicesDescriptionNode}
              </div>
            </motion.div>

            <div className={styles.grid2Col}>
              {serviceOfferings.map((offering: ServiceOffering, index: number) => {
                const OfferingIcon = offering.iconName ? (iconMap[offering.iconName] || Settings) : Settings;
                const offeringImage = offering.image?.asset?.url || offering.imageUrl;
                const offeringAlt = offering.image?.alt || offering.title || 'Service offering';
                const delay = getStaggerDelay(SECTION_CONFIGS.twoColumnGrid, index);

                return (
                  <motion.div
                    key={offering.title}
                    initial={initialState}
                    whileInView={createFade(delay, 0.6)}
                    viewport={viewportConfig}
                  >
                    <Card className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_20px_-5px_rgba(0,0,0,0.1)] dark:shadow-slate-950/50 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] hover:border-slate-300/80 dark:hover:border-slate-600 transition-all duration-300 group h-full overflow-hidden">
                      {offeringImage && (
                        <div className="relative h-64 overflow-hidden">
                          <Image
                            src={offeringImage}
                            alt={offeringAlt}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute bottom-4 left-4">
                            <OfferingIcon className="w-8 h-8 text-tone-inverse" />
                          </div>
                        </div>
                      )}

                      <div className="p-6 md:p-8">
                        <h3 className={cn(typography.h4, 'mb-4 group-hover:text-blue-600 transition-colors')}>
                          {offering.title}
                        </h3>
                        {offering.descriptionRich ? (
                          <div className={cn(typography.body, 'mb-6')}>
                            <PortableTextContent value={offering.descriptionRich} />
                          </div>
                        ) : (
                          <p className={cn(typography.body, 'mb-6')}>
                            {offering.description}
                          </p>
                        )}

                        {offering.features && offering.features.length > 0 && (
                          <div className="mb-6">
                            <h4 className={cn(typography.label, 'mb-3')}>
                              {offering.featuresLabel || 'Key Features'}
                            </h4>
                            <div className="grid grid-cols-1 gap-2">
                              {offering.features.map((feature: FeatureItem) => (
                                <div key={feature.feature} className={cn('flex items-center', typography.small)}>
                                  <CheckCircle className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                                  {feature.feature}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {offering.capabilities && offering.capabilities.length > 0 && (
                          <div className="mb-6">
                            <h4 className={cn(typography.label, 'mb-3')}>
                              {offering.capabilitiesLabel || 'Capabilities'}
                            </h4>
                            <div className="space-y-1">
                              {offering.capabilities.map((capability: CapabilityListItem) => (
                                <div key={capability.capability} className={cn('flex items-center', typography.small)}>
                                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" />
                                  {capability.capability}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {materials.length > 0 && (
        <section className="py-24 md:py-32 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
          <div className={spacing.container}>
            <motion.div
              initial={initialState}
              whileInView={createFade(0, 0.8)}
              viewport={viewportConfig}
              className="text-center mb-16"
            >
              <h2 className={cn(typography.h2, 'mb-6')}>{materialsHeading}</h2>
              <p className={cn(typography.lead, 'max-w-3xl mx-auto')}>
                {materialsDescription}
              </p>
            </motion.div>

            <div className={styles.grid4Col}>
              {materials.map((material: MaterialCategory, index: number) => {
                const delay = getStaggerDelay(SECTION_CONFIGS.fourColumnGrid, index);
                return (
                  <motion.div
                    key={material.category}
                    initial={initialState}
                    whileInView={createFade(delay, 0.6)}
                    viewport={viewportConfig}
                  >
                    <Card className={cn(styles.featureCard, 'h-full')}>
                      <h3 className={cn(typography.h5, 'mb-3')}>{material.category}</h3>

                      {material.types && material.types.length > 0 && (
                        <div className="mb-4 space-y-1">
                          {material.types.map((type: MaterialType) => (
                            <div key={type.type} className="flex items-center text-xs text-slate-600 dark:text-slate-400">
                              <div className="w-1 h-1 bg-blue-500 rounded-full mr-2" />
                              {type.type}
                            </div>
                          ))}
                        </div>
                      )}
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {applications.length > 0 && (
        <section className="py-24 md:py-32 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
          <div className={spacing.container}>
            <motion.div
              initial={initialState}
              whileInView={createFade(0, 0.8)}
              viewport={viewportConfig}
              className="text-center mb-16"
            >
              <h2 className={cn(typography.h2, 'mb-6')}>{applicationsHeading}</h2>
              <p className={cn(typography.lead, 'max-w-3xl mx-auto')}>
                {applicationsDescription}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {applications.map((app: ApplicationItem, index: number) => {
                const appImage = app.image?.asset?.url || app.imageUrl;
                const appAlt = app.image?.alt || app.title || 'Application';
                const delay = getStaggerDelay(SECTION_CONFIGS.threeColumnGrid, index);
                const listLabel = app.listLabel || applicationsListLabel;

                return (
                  <motion.div
                    key={app.title}
                    initial={initialState}
                    whileInView={createFade(delay, 0.6)}
                    viewport={viewportConfig}
                  >
                    <Card className={cn(styles.featureCard, 'h-full overflow-hidden')}>
                      {appImage && (
                        <div className="relative h-56 overflow-hidden">
                          <Image
                            src={appImage}
                            alt={appAlt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className={cn(typography.h4, 'mb-3')}>{app.title}</h3>
                        <p className={cn(typography.body, 'mb-4')}>{app.description}</p>
                        {app.timeline && (
                          <div className="mb-4">
                            <p className={cn(typography.label, 'text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 mb-1')}>
                              Timeline:
                            </p>
                            <p className={cn(typography.body, 'text-slate-700 dark:text-slate-300')}>{app.timeline}</p>
                          </div>
                        )}
                        {app.challenges && app.challenges.length > 0 && (
                          <div>
                            <h4 className={cn(typography.label, 'mb-2 text-sm')}>{listLabel}</h4>
                            <div className="space-y-1">
                              {app.challenges.map((item: ApplicationChallenge) => (
                                <div key={item.challenge} className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" />
                                  {item.challenge}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {qualityStandards.length > 0 && (
        <section className="py-24 md:py-32 lg:py-20 bg-slate-900">
          <div className={spacing.container}>
            <motion.div
              initial={initialState}
              whileInView={createFade(0, 0.8)}
              viewport={viewportConfig}
              className="text-center mb-12"
            >
              <h2 className={cn(typography.h2, 'mb-4 text-tone-inverse')}>{qualityHeading}</h2>
              <p className={cn(typography.lead, 'max-w-3xl mx-auto text-slate-300')}>
                {qualityDescription}
              </p>
            </motion.div>

            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-center">
              <div className="space-y-4 text-center lg:text-left">
                {qualityStandards.map((standard: QualityStandard, index: number) => {
                  const delay = getStaggerDelay(SECTION_CONFIGS.twoColumnGrid, index);
                  const StandardIcon = standard.iconName ? (iconMap[standard.iconName] || Shield) : Shield;
                  return (
                    <motion.div
                      key={`${standard.title}-${index}`}
                      initial={initialState}
                      whileInView={createFade(delay, 0.5)}
                      viewport={viewportConfig}
                      className="flex items-start gap-3"
                    >
                      <StandardIcon className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <p className={cn(typography.body, 'text-slate-200')}>
                        {standard.title}
                        {standard.description ? ` — ${standard.description}` : ''}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              {qualityImageSrc && (
                <div className="relative h-[360px] rounded-2xl overflow-hidden">
                  <Image
                    src={qualityImageSrc}
                    alt={qualityImageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/20 to-slate-950/60" />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {processes.length > 0 && (
        <section className="py-24 md:py-32 lg:py-20">
          <div className={spacing.container}>
            <motion.div
              initial={initialState}
              whileInView={createFade(0, 0.8)}
              viewport={viewportConfig}
              className="text-center mb-16"
            >
              <h2 className={cn(typography.h2, 'mb-6')}>{processHeading}</h2>
              <p className={cn(typography.lead, 'max-w-3xl mx-auto')}>
                {processDescription}
              </p>
            </motion.div>

            <div className={styles.grid4Col}>
              {processes.map((process: ProcessItem, index: number) => {
                const delay = getStaggerDelay(SECTION_CONFIGS.fourColumnGrid, index);
                return (
                  <motion.div
                    key={process.title}
                    initial={initialState}
                    whileInView={createFade(delay, 0.6)}
                    viewport={viewportConfig}
                  >
                    <Card className={cn(styles.featureCard, 'h-full')}>
                      <div className={cn('w-12 h-12 text-tone-inverse rounded-lg flex items-center justify-center text-xl font-bold mb-4', 'bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600')}>
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <h3 className={cn(typography.h5, 'mb-3')}>{process.title}</h3>
                      {process.descriptionRich ? (
                        <div className={cn(typography.small, 'mb-4')}>
                          <PortableTextContent value={process.descriptionRich} />
                        </div>
                      ) : (
                        <p className={cn(typography.small, 'mb-4')}>{process.description}</p>
                      )}

                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className={styles.sectionDark}>
        <div className={spacing.container}>
          <div className="text-center max-w-4xl mx-auto">
            <SectionHeader
              eyebrow={ctaData?.badge}
              heading={ctaData?.title || 'Ready to Get Started?'}
              gradientWordPosition="last"
              description={ctaData?.description}
              className="[&_h2]:text-tone-inverse [&_p]:text-slate-300 mb-8"
            />
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {(ctaData?.buttons || [])
                .filter((button: CTAButton) => button?.enabled !== false && button?.text && button?.href)
                .map((button: CTAButton, index: number) => {
                  const key = `${button.text}-${index}`;
                  const variant = button.variant === 'secondary' ? 'secondary' : 'default';
                  if (index === 0) {
                    return (
                      <PremiumButton
                        key={key}
                        size="lg"
                        variant={variant}
                        onClick={() => button.href && router.push(button.href)}
                      >
                        {button.text}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </PremiumButton>
                    );
                  }

                  return (
                    <Link key={key} href={button.href!}>
                      <PremiumButton size="lg" variant={variant}>
                        {button.text}
                      </PremiumButton>
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
