'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { PremiumButton } from '@/components/ui/premium-button';
import ParallaxImagePro from '@/components/ui/parallax-image-pro';
import SectionHeader from '@/components/ui/section-header';
import HeroSection from '@/components/ui/hero-section';
import { PortableTextContent } from '@/components/portable-text-components';
import { theme, styles, cn } from '@/lib/theme';
import { usePrefersReducedMotion } from '@/lib/motion';
import { SECTION_CONFIGS, getInitialState, getAnimateState, getViewportConfig } from '@/lib/animation-config';
import { ArrowRight, CheckCircle, Settings, Shield, Zap, Cog, Target, FileText, Award, Activity } from 'lucide-react';

const iconMap: Record<string, any> = {
  Settings,
  Shield,
  Zap,
  Cog,
  Target,
  FileText,
  Award,
  Activity,
};

interface ServiceContentProps {
  serviceData: any;
  slug: string;
}

export function ServiceContent({ serviceData, slug: _slug }: ServiceContentProps) {
  const service = serviceData as any;
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
    service.hero?.backgroundImageUrl;
  const heroDescription = service.hero?.descriptionRich
    ? <PortableTextContent value={service.hero.descriptionRich} />
    : (service.overview?.descriptionRich
        ? <PortableTextContent value={service.overview.descriptionRich} />
        : service.overview?.description);

  const heroButtons = Array.isArray(service.hero?.buttons) && service.hero.buttons.length > 0
    ? service.hero.buttons
        .filter((button: any) => button?.enabled !== false && button?.text && button?.href)
        .map((button: any) => ({
          label: button.text,
          href: button.href,
          variant: (button.variant === 'secondary' ? 'secondary' : 'primary') as 'primary' | 'secondary',
        }))
    : [
        { label: 'Get Quote', href: '/contact', variant: 'primary' as const },
        { label: 'View Capabilities', href: '/services', variant: 'secondary' as const },
      ];

  const capabilities = Array.isArray(service.capabilities)
    ? service.capabilities.filter((item: any) => item?.label && item?.value)
    : [];
  const serviceOfferings = Array.isArray(service.services)
    ? service.services.filter((item: any) => item?.title)
    : [];
  const materials = Array.isArray(service.materials)
    ? service.materials.filter((item: any) => item?.category)
    : [];
  const applications = Array.isArray(service.applications)
    ? service.applications.filter((item: any) => item?.title)
    : [];
  const qualityStandards = Array.isArray(service.qualityStandards)
    ? service.qualityStandards.filter((item: any) => item?.title || item?.description)
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
    ? service.processes.filter((item: any) => item?.title)
    : [];

  const servicesHeading = service.servicesHeading || `${heroTitle} Services`;
  const servicesDescriptionNode = service.servicesDescriptionRich
    ? <PortableTextContent value={service.servicesDescriptionRich} />
    : (service.servicesDescription
        ? <p className={cn(theme.typography.lead, 'max-w-3xl mx-auto')}>{service.servicesDescription}</p>
        : service.overview?.descriptionRich
          ? <PortableTextContent value={service.overview.descriptionRich} />
          : null);

  const materialsHeading = service.materialsHeading;
  const materialsDescription = service.materialsDescription;

  const applicationsHeading = service.applicationsHeading;
  const applicationsDescription = service.applicationsDescription;
  const applicationsListLabel = service.applicationsListLabel;

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
        title={<span className="text-white">{heroTitle}</span>}
        subtitle={service.hero?.subtitle}
        description={heroDescription}
        titleSize={service.hero?.titleSize}
        descriptionSize={service.hero?.descriptionSize}
        buttons={heroButtons}
      />

      {capabilities.length > 0 && (
        <section className={styles.sectionLight}>
          <div className={theme.spacing.container}>
            <motion.div
              initial={initialState}
              whileInView={createFade(0, 0.8)}
              viewport={viewportConfig}
              className={styles.grid4Col}
            >
              {capabilities.map((capability: any, index: number) => {
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
                    <div className={cn(theme.typography.badge, 'text-slate-700 mb-2')}>
                      {capability.label}
                    </div>
                    <div className={theme.typography.small}>{capability.description}</div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      )}

      {serviceOfferings.length > 0 && (
        <section className={theme.spacing.section}>
          <div className={theme.spacing.container}>
            <motion.div
              initial={initialState}
              whileInView={createFade(0, 0.8)}
              viewport={viewportConfig}
              className="text-center mb-16"
            >
              <h2 className={cn(theme.typography.h2, 'mb-6')}>{servicesHeading}</h2>
              <div className={cn(theme.typography.lead, 'max-w-3xl mx-auto')}>
                {servicesDescriptionNode}
              </div>
            </motion.div>

            <div className={styles.grid2Col}>
              {serviceOfferings.map((offering: any, index: number) => {
                const OfferingIcon = iconMap[offering.iconName] || Settings;
                const offeringImage = offering.image?.asset?.url || offering.imageUrl;
                const offeringAlt = offering.image?.alt || offering.title;
                const delay = getStaggerDelay(SECTION_CONFIGS.twoColumnGrid, index);

                return (
                  <motion.div
                    key={offering.title}
                    initial={initialState}
                    whileInView={createFade(delay, 0.6)}
                    viewport={viewportConfig}
                  >
                    <Card className={cn(styles.featureCard, 'group h-full overflow-hidden')}>
                      {offeringImage && (
                        <div className="relative h-64 overflow-hidden">
                          <ParallaxImagePro
                            src={offeringImage}
                            alt={offeringAlt}
                            className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                            speed={0.2}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute bottom-4 left-4">
                            <OfferingIcon className="w-8 h-8 text-white" />
                          </div>
                        </div>
                      )}

                      <div className="p-8">
                        <h3 className={cn(theme.typography.h4, 'mb-4 group-hover:text-blue-600 transition-colors')}>
                          {offering.title}
                        </h3>
                        {offering.descriptionRich ? (
                          <div className={cn(theme.typography.body, 'mb-6')}>
                            <PortableTextContent value={offering.descriptionRich} />
                          </div>
                        ) : (
                          <p className={cn(theme.typography.body, 'mb-6')}>
                            {offering.description}
                          </p>
                        )}

                        {offering.features && offering.features.length > 0 && (
                          <div className="mb-6">
                            <h4 className={cn(theme.typography.label, 'mb-3')}>
                              {offering.featuresLabel || 'Key Features'}
                            </h4>
                            <div className="grid grid-cols-1 gap-2">
                              {offering.features.map((feature: any) => (
                                <div key={feature.feature} className={cn('flex items-center', theme.typography.small)}>
                                  <CheckCircle className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                                  {feature.feature}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {offering.capabilities && offering.capabilities.length > 0 && (
                          <div className="mb-6">
                            <h4 className={cn(theme.typography.label, 'mb-3')}>
                              {offering.capabilitiesLabel || 'Capabilities'}
                            </h4>
                            <div className="space-y-1">
                              {offering.capabilities.map((capability: any) => (
                                <div key={capability.capability} className={cn('flex items-center', theme.typography.small)}>
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
        <section className={styles.sectionLight}>
          <div className={theme.spacing.container}>
            <motion.div
              initial={initialState}
              whileInView={createFade(0, 0.8)}
              viewport={viewportConfig}
              className="text-center mb-16"
            >
              <h2 className={cn(theme.typography.h2, 'mb-6')}>{materialsHeading}</h2>
              <p className={cn(theme.typography.lead, 'max-w-3xl mx-auto')}>
                {materialsDescription}
              </p>
            </motion.div>

            <div className={styles.grid4Col}>
              {materials.map((material: any, index: number) => {
                const delay = getStaggerDelay(SECTION_CONFIGS.fourColumnGrid, index);
                return (
                  <motion.div
                    key={material.category}
                    initial={initialState}
                    whileInView={createFade(delay, 0.6)}
                    viewport={viewportConfig}
                  >
                    <Card className={cn(styles.featureCard, 'h-full')}>
                      <h3 className={cn(theme.typography.h5, 'mb-3')}>{material.category}</h3>

                      {material.types && material.types.length > 0 && (
                        <div className="mb-4 space-y-1">
                          {material.types.map((type: any) => (
                            <div key={type.type} className="flex items-center text-xs text-slate-600">
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
        <section className={styles.sectionLight}>
          <div className={theme.spacing.container}>
            <motion.div
              initial={initialState}
              whileInView={createFade(0, 0.8)}
              viewport={viewportConfig}
              className="text-center mb-16"
            >
              <h2 className={cn(theme.typography.h2, 'mb-6')}>{applicationsHeading}</h2>
              <p className={cn(theme.typography.lead, 'max-w-3xl mx-auto')}>
                {applicationsDescription}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {applications.map((app: any, index: number) => {
                const appImage = app.image?.asset?.url || app.imageUrl;
                const appAlt = app.image?.alt || app.title;
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
                        <div className="relative h-56">
                          <ParallaxImagePro
                            src={appImage}
                            alt={appAlt}
                            className="w-full h-full"
                            speed={0.15}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className={cn(theme.typography.h4, 'mb-3')}>{app.title}</h3>
                        <p className={cn(theme.typography.body, 'mb-4')}>{app.description}</p>
                        {app.timeline && (
                          <div className="mb-4">
                            <p className={cn(theme.typography.label, 'text-xs uppercase tracking-[0.3em] text-slate-500 mb-1')}>
                              Timeline:
                            </p>
                            <p className={cn(theme.typography.body, 'text-slate-700')}>{app.timeline}</p>
                          </div>
                        )}
                        {app.challenges && app.challenges.length > 0 && (
                          <div>
                            <h4 className={cn(theme.typography.label, 'mb-2 text-sm')}>{listLabel}</h4>
                            <div className="space-y-1">
                              {app.challenges.map((item: any) => (
                                <div key={item.challenge} className="flex items-center text-sm text-slate-600">
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
        <section className={theme.spacing.section}>
          <div className={theme.spacing.container}>
            <motion.div
              initial={initialState}
              whileInView={createFade(0, 0.8)}
              viewport={viewportConfig}
              className="text-center mb-16"
            >
              <h2 className={cn(theme.typography.h2, 'mb-6')}>{qualityHeading}</h2>
              <p className={cn(theme.typography.lead, 'max-w-3xl mx-auto')}>
                {qualityDescription}
              </p>
            </motion.div>

            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-center">
              <div className="space-y-4 text-center lg:text-left">
                {qualityStandards.map((standard: any, index: number) => {
                  const delay = getStaggerDelay(SECTION_CONFIGS.twoColumnGrid, index);
                  return (
                    <motion.p
                      key={`${standard.title}-${index}`}
                      initial={initialState}
                      whileInView={createFade(delay, 0.5)}
                      viewport={viewportConfig}
                      className={cn(theme.typography.body, 'text-slate-100')}
                    >
                      {standard.title}
                      {standard.description ? ` — ${standard.description}` : ''}
                    </motion.p>
                  );
                })}
              </div>

              {qualityImageSrc && (
                <div className="relative h-[360px] rounded-3xl overflow-hidden">
                  <ParallaxImagePro
                    src={qualityImageSrc}
                    alt={qualityImageAlt}
                    className="h-full w-full"
                    gradient="dark"
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {processes.length > 0 && (
        <section className={theme.spacing.section}>
          <div className={theme.spacing.container}>
            <motion.div
              initial={initialState}
              whileInView={createFade(0, 0.8)}
              viewport={viewportConfig}
              className="text-center mb-16"
            >
              <h2 className={cn(theme.typography.h2, 'mb-6')}>{processHeading}</h2>
              <p className={cn(theme.typography.lead, 'max-w-3xl mx-auto')}>
                {processDescription}
              </p>
            </motion.div>

            <div className={styles.grid4Col}>
              {processes.map((process: any, index: number) => {
                const delay = getStaggerDelay(SECTION_CONFIGS.fourColumnGrid, index);
                return (
                  <motion.div
                    key={process.title}
                    initial={initialState}
                    whileInView={createFade(delay, 0.6)}
                    viewport={viewportConfig}
                  >
                    <Card className={cn(styles.featureCard, 'h-full')}>
                      <div className={cn('w-12 h-12 text-white rounded-lg flex items-center justify-center text-xl font-bold mb-4', theme.colors.primary.gradient)}>
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <h3 className={cn(theme.typography.h5, 'mb-3')}>{process.title}</h3>
                      {process.descriptionRich ? (
                        <div className={cn(theme.typography.small, 'mb-4')}>
                          <PortableTextContent value={process.descriptionRich} />
                        </div>
                      ) : (
                        <p className={cn(theme.typography.small, 'mb-4')}>{process.description}</p>
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
        <div className={theme.spacing.container}>
          <div className="text-center max-w-4xl mx-auto">
            <SectionHeader
              eyebrow={ctaData.badge}
              heading={ctaData.title || 'Ready to Get Started?'}
              gradientWordPosition="last"
              description={ctaData.description}
              className="[&_h2]:text-white [&_p]:text-slate-300 mb-8"
            />
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {(ctaData.buttons || [])
                .filter((button: any) => button?.enabled !== false && button?.text && button?.href)
                .map((button: any, index: number) => {
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
                    <Link key={key} href={button.href}>
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
