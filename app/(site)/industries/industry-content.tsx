'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Award, TrendingUp, Target } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { typography, spacing, styles, cn } from '@/lib/design-system';
import HeroSection from '@/components/ui/hero-section';
import React from 'react';
import { getHeroImageAlt, getHeroImageUrl } from '@/lib/hero-images';
import type { SanityImageSource } from '@/lib/image-utils';

const hasText = (value?: string | null): value is string =>
  typeof value === 'string' && value.trim().length > 0;

const toDisplayText = (value?: string | null) => (hasText(value) ? value.trim() : '');

const keyFor = (prefix: string, index: number, value?: string | null) => {
  const text = toDisplayText(value).toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'item';
  return `${prefix}-${index}-${text}`;
};

// Hero button type
interface HeroButton {
  _key?: string;
  enabled?: boolean;
  label?: string;
  href?: string;
  variant?: 'primary' | 'secondary';
}

// Key driver item
interface KeyDriver {
  driver?: string;
}

// Challenge item
interface Challenge {
  challenge?: string;
}

// Technical detail item
interface TechnicalDetail {
  detail?: string;
}

// Capability type
interface CapabilityItem {
  title?: string;
  description?: string;
  technicalDetails?: TechnicalDetail[];
}

// Component part/material/requirement types
interface ComponentPart {
  part?: string;
}

interface ComponentMaterial {
  material?: string;
}

interface ComponentRequirement {
  requirement?: string;
}

// Component category type
interface ComponentCategory {
  category?: string;
  description?: string;
  image?: string;
  parts?: ComponentPart[];
  materials?: ComponentMaterial[];
  requirements?: ComponentRequirement[];
}

// Expertise item type
interface ExpertiseItem {
  title?: string;
  description?: string;
  imageUrl?: string;
  components?: string[];
  materials?: string[];
  requirements?: string[];
}

// Certification type
interface Certification {
  name?: string;
  description?: string;
  scope?: string;
}

// Standard type
interface Standard {
  name?: string;
  description?: string;
}

// Application requirement type
interface ApplicationRequirement {
  requirement?: string;
}

// Application type
interface Application {
  name?: string;
  description?: string;
  requirements?: ApplicationRequirement[];
}

// Quality standard type
interface QualityStandard {
  standard?: string;
}

// Process benefit feature type
interface ProcessBenefitFeature {
  feature?: string;
}

// Process benefit type
interface ProcessBenefit {
  title?: string;
  description?: string;
  features?: ProcessBenefitFeature[];
}

// CTA button type
interface CTAButton {
  _key?: string;
  enabled?: boolean;
  label?: string;
  href?: string;
  variant?: 'primary' | 'secondary';
}

// Full industry data type
interface IndustryData {
  title: string;
  hero?: {
    backgroundImage?: SanityImageSource | string;
    badge?: string;
    subtitle?: string;
    description?: string;
    buttons?: HeroButton[];
  };
  overview?: {
    description?: string;
    marketSize?: string;
    keyDrivers?: (KeyDriver | string)[];
    challenges?: (Challenge | string)[];
  };
  capabilities?: CapabilityItem[];
  components?: ComponentCategory[];
  expertise?: ExpertiseItem[];
  regulatory?: {
    certifications?: Certification[];
    standards?: Standard[];
  };
  applications?: Application[];
  qualityStandards?: (QualityStandard | string)[];
  processBenefits?: ProcessBenefit[];
  cta?: {
    title?: string;
    description?: string;
    buttons?: CTAButton[];
  };
}

interface IndustryContentProps {
  industryData: IndustryData;
  slug: string;
}

export function IndustryContent({ industryData }: IndustryContentProps) {
  const industry = industryData;

  const heroImage = getHeroImageUrl(industry.hero?.backgroundImage);
  const heroImageAlt = getHeroImageAlt(industry.hero?.backgroundImage, industry.title);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection
        backgroundImage={heroImage}
        imageAlt={heroImageAlt}
        height="large"
        alignment="center"
        showScrollIndicator={true}
        badge={{
          text: industry.hero?.badge || industry.title.toUpperCase(),
          icon: Target,
        }}
        title={(() => {
          // Using inline styles for WebKit compatibility (Tailwind text-transparent doesn't work)
          const gradientStyle = {
            background: 'linear-gradient(to right, #3b82f6, #4f46e5)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          } as React.CSSProperties;

          const words = industry.title.split(' ');
          if (words.length === 1) {
            return <span style={gradientStyle}>{industry.title}</span>;
          }
          const firstPart = words.slice(0, -1).join(' ');
          const lastWord = words[words.length - 1];
          return (
            <span>
              <span className="text-inherit">{firstPart} </span>
              <span style={gradientStyle}>{lastWord}</span>
            </span>
          );
        })()}
        subtitle={industry.hero?.subtitle}
        description={industry.hero?.description || industry.overview?.description}
        buttons={(industry.hero?.buttons || [])
          .filter((btn: HeroButton) => btn?.enabled !== false && btn?.label && btn?.href)
          .map(btn => ({ label: btn.label!, href: btn.href!, variant: btn.variant }))}
      />

      {/* Market Overview */}
      {industry.overview && (
        <section className={styles.sectionLight}>
          <div className={spacing.container}>
            <div className={styles.grid2Col}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className={cn(typography.h2, 'mb-6')}>Market Overview</h2>
                {hasText(industry.overview.description) && (
                  <p className={cn(typography.lead, 'mb-6')}>
                    {toDisplayText(industry.overview.description)}
                  </p>
                )}

                {hasText(industry.overview.marketSize) && (
                  <div className="mb-6">
                    <h3 className={cn(typography.h4, 'mb-2')}>Market Size</h3>
                    <p className={cn(typography.body)}>
                      {toDisplayText(industry.overview.marketSize)}
                    </p>
                  </div>
                )}

                {industry.overview.keyDrivers && industry.overview.keyDrivers.length > 0 && (
                  <div>
                    <h3 className={cn(typography.h4, 'mb-4')}>Key Market Drivers</h3>
                    <div className="space-y-3">
                      {industry.overview.keyDrivers.map((item: KeyDriver | string, index: number) => {
                        const driverText = typeof item === 'string' ? item : item?.driver;
                        if (!hasText(driverText)) return null;
                        return (
                          <div key={keyFor('driver', index, driverText)} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                            <span className={cn(typography.body)}>{toDisplayText(driverText)}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </motion.div>

              {industry.overview?.challenges && industry.overview.challenges.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.8 }}
                  viewport={{ once: true }}
                  className="bg-slate-50 dark:bg-slate-900 p-8 rounded-lg"
                >
                  <h3 className={cn(typography.h3, 'mb-6')}>Key Challenges</h3>
                  <div className="space-y-4">
                    {industry.overview.challenges.map((item: Challenge | string, index: number) => {
                      const challengeText = typeof item === 'string' ? item : item?.challenge;
                      if (!hasText(challengeText)) return null;
                      return (
                        <div key={keyFor('challenge', index, challengeText)} className="flex items-start">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                            <span className="text-red-600 font-bold text-sm">{index + 1}</span>
                          </div>
                          <span className={cn(typography.body)}>{toDisplayText(challengeText)}</span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Capabilities Section */}
      {industry.capabilities && industry.capabilities.length > 0 && (
        <section className={spacing.section}>
          <div className={spacing.container}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className={cn(typography.h2, 'mb-6')}>Our Capabilities</h2>
              <p className={cn(typography.lead, 'max-w-3xl mx-auto')}>
                Specialized manufacturing capabilities for {industry.title.toLowerCase()} applications.
              </p>
            </motion.div>

            <div className={styles.grid2Col}>
              {industry.capabilities.map((capability: CapabilityItem, index: number) => {
                const capabilityTitle = toDisplayText(capability.title);
                const capabilityDescription = toDisplayText(capability.description);
                const hasTechnicalDetails = Array.isArray(capability.technicalDetails) && capability.technicalDetails.some(detail => hasText(detail?.detail));
                if (!capabilityTitle && !capabilityDescription && !hasTechnicalDetails) {
                  return null;
                }
                return (
                  <motion.div
                    key={keyFor('capability', index, capability.title)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <Card className={cn(styles.featureCard, 'h-full')}>
                      <h3 className={cn(typography.h4, 'mb-4')}>{capabilityTitle || 'Capability'}</h3>
                      {capabilityDescription && (
                        <p className={cn(typography.body, 'mb-6')}>{capabilityDescription}</p>
                      )}

                      {capability.technicalDetails && capability.technicalDetails.length > 0 && (
                        <div>
                          <h4 className={cn(typography.label, 'mb-3')}>Technical Details</h4>
                          <div className="space-y-2">
                            {capability.technicalDetails.map((detail: TechnicalDetail, detailIndex: number) => {
                              const detailText = detail?.detail;
                              if (!hasText(detailText)) return null;
                              return (
                                <div
                                  key={keyFor('capability-detail', detailIndex, detailText)}
                                  className="flex items-center text-sm text-slate-600 dark:text-slate-400"
                                >
                                  <CheckCircle className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                                  {toDisplayText(detailText)}
                                </div>
                              );
                            })}
                          </div>
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

      {/* Components Section - Full Width Alternating Layout */}
      {industry.components && industry.components.length > 0 && (
        <section className={styles.sectionLight}>
          <div className={spacing.container}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className={cn(typography.h2, 'mb-6')}>Component Expertise</h2>
              <p className={cn(typography.lead, 'max-w-3xl mx-auto')}>
                Precision manufacturing for critical {industry.title.toLowerCase()} components.
              </p>
            </motion.div>

            <div className="space-y-20">
              {industry.components.map((component: ComponentCategory, index: number) => {
                const componentTitle = toDisplayText(component.category);
                const componentDescription = toDisplayText(component.description);
                const hasParts = Array.isArray(component.parts) && component.parts.some(part => hasText(part?.part));
                const hasMaterials = Array.isArray(component.materials) && component.materials.some(material => hasText(material?.material));
                const hasRequirements = Array.isArray(component.requirements) && component.requirements.some(req => hasText(req?.requirement));
                const componentImageUrl = getHeroImageUrl(component.image, 1200, 800);
                if (!componentTitle && !componentDescription && !hasParts && !hasMaterials && !hasRequirements && !componentImageUrl) {
                  return null;
                }
                return (
                  <motion.div
                    key={keyFor('component', index, component.category)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.8 }}
                    viewport={{ once: true }}
                    className={cn(
                      'grid lg:grid-cols-2 gap-12 items-center',
                      index % 2 === 0 ? '' : 'lg:grid-flow-dense'
                    )}
                  >
                    {/* Content */}
                    <div className={index % 2 === 0 ? '' : 'lg:col-start-2'}>
                      <h3 className={cn(typography.h3, 'mb-4')}>{componentTitle || 'Component'}</h3>
                      {componentDescription && (
                        <p className={cn(typography.lead, 'mb-8 text-slate-600 dark:text-slate-400')}>
                          {componentDescription}
                        </p>
                      )}

                      {hasParts && (
                        <div className="mb-8">
                          <h4 className={cn(typography.h5, 'mb-4')}>Component Parts</h4>
                          <div className="grid gap-3">
                            {component.parts?.map((part: ComponentPart, partIndex: number) => {
                              const partName = part?.part;
                              if (!hasText(partName)) return null;
                              return (
                                <div key={keyFor('component-part', partIndex, partName)} className="flex items-center">
                                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                                  <span className={cn(typography.body)}>{toDisplayText(partName)}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {hasMaterials && (
                        <div className="mb-8">
                          <h4 className={cn(typography.h5, 'mb-4')}>Materials</h4>
                          <div className="flex flex-wrap gap-2">
                            {component.materials?.map((material: ComponentMaterial, materialIndex: number) => {
                              const materialName = material?.material;
                              if (!hasText(materialName)) return null;
                              return (
                                <span
                                  key={keyFor('component-material', materialIndex, materialName)}
                                  className="px-4 py-2 bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium"
                                >
                                  {toDisplayText(materialName)}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      )}

                    {hasRequirements && (
                      <div>
                        <h4 className={cn(typography.h5, 'mb-4')}>Requirements</h4>
                        <div className="grid gap-2">
                          {component.requirements?.map((requirement: ComponentRequirement, requirementIndex: number) => {
                            const requirementText = requirement?.requirement;
                            if (!hasText(requirementText)) return null;
                            return (
                              <div key={keyFor('component-requirement', requirementIndex, requirementText)} className="flex items-start">
                                <Target className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                                <span className={cn(typography.body, 'text-slate-600 dark:text-slate-400')}>{toDisplayText(requirementText)}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                    <div className={index % 2 === 0 ? '' : 'lg:col-start-1 lg:row-start-1'}>
                      {componentImageUrl && (
                        <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                          <Image
                            src={componentImageUrl}
                            alt={componentTitle || 'Component'}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Expertise Section */}
      {industry.expertise && industry.expertise.length > 0 && (
        <section className={spacing.section}>
          <div className={spacing.container}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className={cn(typography.h2, 'mb-6')}>Our Expertise</h2>
              <p className={cn(typography.lead, 'max-w-3xl mx-auto')}>
                Specialized knowledge and capabilities for {industry.title.toLowerCase()} applications.
              </p>
            </motion.div>

            <div className="space-y-24">
              {industry.expertise.map((item: ExpertiseItem, index: number) => {
                const expertiseTitle = toDisplayText(item.title);
                const expertiseDescription = toDisplayText(item.description);
                const hasComponents = Array.isArray(item.components) && item.components.some(component => hasText(component));
                const hasMaterials = Array.isArray(item.materials) && item.materials.some(material => hasText(material));
                const hasRequirements = Array.isArray(item.requirements) && item.requirements.some(req => hasText(req));
                const expertiseImageUrl = getHeroImageUrl(item.imageUrl, 1200, 800);
                if (!expertiseTitle && !expertiseDescription && !hasComponents && !hasMaterials && !hasRequirements && !expertiseImageUrl) {
                  return null;
                }

                return (
                  <motion.div
                    key={keyFor('expertise', index, item.title)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.8 }}
                    viewport={{ once: true }}
                    className={cn(
                      'grid lg:grid-cols-2 gap-12 items-center',
                      index % 2 === 0 ? '' : 'lg:grid-flow-dense'
                    )}
                  >
                    {/* Content */}
                    <div className={index % 2 === 0 ? '' : 'lg:col-start-2'}>
                      <h3 className={cn(typography.h3, 'mb-6')}>{expertiseTitle || 'Expertise'}</h3>
                      {expertiseDescription && (
                        <p className={cn(typography.body, 'mb-8 text-slate-600 dark:text-slate-400')}>
                          {expertiseDescription}
                        </p>
                      )}

                      {/* Components */}
                      {hasComponents && (
                        <div className="mb-8">
                          <h4 className={cn(typography.h5, 'mb-4')}>Components</h4>
                          <div className="grid gap-3">
                            {item.components?.map((component: string, componentIndex: number) => {
                              if (!hasText(component)) return null;
                              return (
                                <div key={keyFor('expertise-component', componentIndex, component)} className="flex items-center">
                                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                                  <span className={cn(typography.body)}>{toDisplayText(component)}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Materials */}
                      {hasMaterials && (
                        <div className="mb-8">
                          <h4 className={cn(typography.h5, 'mb-4')}>Materials</h4>
                          <div className="flex flex-wrap gap-2">
                            {item.materials?.map((material: string, materialIndex: number) => {
                              if (!hasText(material)) return null;
                              return (
                                <span
                                  key={keyFor('expertise-material', materialIndex, material)}
                                  className="px-4 py-2 bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium"
                                >
                                  {toDisplayText(material)}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Requirements */}
                      {hasRequirements && (
                        <div>
                          <h4 className={cn(typography.h5, 'mb-4')}>Requirements</h4>
                          <div className="grid gap-2">
                            {item.requirements?.map((req: string, reqIndex: number) => {
                              if (!hasText(req)) return null;
                              return (
                                <div key={keyFor('expertise-requirement', reqIndex, req)} className="flex items-start">
                                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2 flex-shrink-0" />
                                  <span className={cn(typography.small, 'text-slate-600 dark:text-slate-400')}>{toDisplayText(req)}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className={index % 2 === 0 ? '' : 'lg:col-start-1 lg:row-start-1'}>
                      {expertiseImageUrl && (
                        <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                          <Image
                            src={expertiseImageUrl}
                            alt={expertiseTitle || 'Application'}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Regulatory & Certifications */}
      {industry.regulatory && (industry.regulatory.certifications || industry.regulatory.standards) && (
        <section className={styles.sectionLight}>
          <div className={spacing.container}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className={cn(typography.h2, 'mb-6')}>Regulatory Compliance</h2>
              <p className={cn(typography.lead, 'max-w-3xl mx-auto')}>
                Comprehensive certifications and standards compliance for {industry.title.toLowerCase()}.
              </p>
            </motion.div>

            <div className={styles.grid2Col}>
              {industry.regulatory.certifications && industry.regulatory.certifications.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className={cn(styles.featureCard, 'h-full')}>
                    <Award className="w-12 h-12 text-blue-600 mb-4" />
                    <h3 className={cn(typography.h4, 'mb-6')}>Certifications</h3>
                    <div className="space-y-4">
                      {industry.regulatory.certifications.map((cert: Certification, certIndex: number) => {
                        if (!hasText(cert?.name)) return null;
                        return (
                          <div key={keyFor('certification', certIndex, cert.name)} className="border-l-4 border-blue-600 pl-4">
                            <h4 className={cn(typography.label, 'mb-1')}>{toDisplayText(cert.name)}</h4>
                            {hasText(cert?.description) && (
                              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">{toDisplayText(cert.description)}</p>
                            )}
                            {hasText(cert?.scope) && (
                              <p className="text-xs text-slate-500 dark:text-slate-500">{toDisplayText(cert.scope)}</p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </Card>
                </motion.div>
              )}

              {industry.regulatory.standards && industry.regulatory.standards.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className={cn(styles.featureCard, 'h-full')}>
                    <CheckCircle className="w-12 h-12 text-blue-600 mb-4" />
                    <h3 className={cn(typography.h4, 'mb-6')}>Standards</h3>
                    <div className="space-y-3">
                      {industry.regulatory.standards.map((standard: Standard, standardIndex: number) => {
                        if (!hasText(standard?.name)) return null;
                        return (
                          <div key={keyFor('standard', standardIndex, standard.name)} className="flex items-start">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2 flex-shrink-0" />
                            <div>
                              <h4 className={cn(typography.label, 'mb-1')}>{toDisplayText(standard.name)}</h4>
                              {hasText(standard?.description) && (
                                <p className="text-sm text-slate-600 dark:text-slate-400">{toDisplayText(standard.description)}</p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Card>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Applications */}
      {industry.applications && industry.applications.length > 0 && (
        <section className={styles.sectionLight}>
          <div className={spacing.container}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className={cn(typography.h2, 'mb-6')}>Industry Applications</h2>
              <p className={cn(typography.lead, 'max-w-3xl mx-auto')}>
                Specialized solutions for diverse {industry.title.toLowerCase()} applications.
              </p>
            </motion.div>

            <div className={styles.grid3Col}>
              {industry.applications.map((application: Application, index: number) => {
                const applicationName = toDisplayText(application.name);
                const applicationDescription = toDisplayText(application.description);
                const hasRequirements = Array.isArray(application.requirements) && application.requirements.some(req => hasText(req?.requirement));
                if (!applicationName && !applicationDescription && !hasRequirements) return null;

                return (
                  <motion.div
                    key={keyFor('application', index, application.name)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <Card className={cn(styles.featureCard, 'h-full')}>
                      <h3 className={cn(typography.h5, 'mb-3')}>{applicationName || 'Application'}</h3>
                      {applicationDescription && (
                        <p className={cn(typography.small, 'mb-4')}>{applicationDescription}</p>
                      )}

                      {hasRequirements && (
                        <div>
                          <h4 className={cn(typography.label, 'mb-2 text-sm')}>Requirements</h4>
                          <div className="space-y-1">
                            {application.requirements?.map((req: ApplicationRequirement, reqIndex: number) => {
                              const requirementText = req?.requirement;
                              if (!hasText(requirementText)) return null;
                              return (
                                <div
                                  key={keyFor('application-requirement', reqIndex, requirementText)}
                                  className="flex items-center text-xs text-slate-600 dark:text-slate-400"
                                >
                                  <CheckCircle className="w-3 h-3 text-blue-600 mr-2 flex-shrink-0" />
                                  {toDisplayText(requirementText)}
                                </div>
                              );
                            })}
                          </div>
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

      {/* Quality Standards */}
      {industry.qualityStandards && industry.qualityStandards.length > 0 && (
        <section className={spacing.section}>
          <div className={spacing.container}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className={cn(typography.h2, 'mb-6')}>Quality Standards</h2>
              <p className={cn(typography.lead, 'max-w-3xl mx-auto')}>
                Rigorous quality control processes ensuring the highest standards.
              </p>
            </motion.div>

            <div className={styles.grid4Col}>
              {industry.qualityStandards.map((item: QualityStandard | string, index: number) => (
                <motion.div
                  key={keyFor('quality-standard', index, typeof item === 'string' ? item : item?.standard)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className={cn(styles.featureCard, 'h-full text-center')}>
                    <CheckCircle className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <p className={cn(typography.small, 'font-medium')}>
                      {typeof item === 'string' ? toDisplayText(item) : toDisplayText(item?.standard)}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Benefits */}
      {industry.processBenefits && industry.processBenefits.length > 0 && (
        <section className={styles.sectionLight}>
          <div className={spacing.container}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className={cn(typography.h2, 'mb-6')}>Process Benefits</h2>
              <p className={cn(typography.lead, 'max-w-3xl mx-auto')}>
                Advanced manufacturing processes delivering superior results.
              </p>
            </motion.div>

            <div className={styles.grid2Col}>
              {industry.processBenefits.map((benefit: ProcessBenefit, index: number) => {
                const benefitTitle = toDisplayText(benefit.title);
                const benefitDescription = toDisplayText(benefit.description);
                const hasFeatures = Array.isArray(benefit.features) && benefit.features.some(feature => hasText(feature?.feature));
                if (!benefitTitle && !benefitDescription && !hasFeatures) return null;

                return (
                  <motion.div
                    key={keyFor('process-benefit', index, benefit.title)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <Card className={cn(styles.featureCard, 'h-full')}>
                      <TrendingUp className="w-10 h-10 text-blue-600 mb-4" />
                      <h3 className={cn(typography.h4, 'mb-4')}>{benefitTitle || 'Process Benefit'}</h3>
                      {benefitDescription && (
                        <p className={cn(typography.body, 'mb-6')}>{benefitDescription}</p>
                      )}

                      {hasFeatures && (
                        <div>
                          <h4 className={cn(typography.label, 'mb-3')}>Key Features</h4>
                          <div className="space-y-2">
                            {benefit.features?.map((feature: ProcessBenefitFeature, featureIndex: number) => {
                              const featureText = feature?.feature;
                              if (!hasText(featureText)) return null;
                              return (
                                <div
                                  key={keyFor('process-feature', featureIndex, featureText)}
                                  className="flex items-center text-sm text-slate-600 dark:text-slate-400"
                                >
                                  <CheckCircle className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                                  {toDisplayText(featureText)}
                                </div>
                              );
                            })}
                          </div>
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

      {/* CTA Section */}
      <section className={styles.sectionDark}>
        <div className={spacing.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className={cn(typography.h2, 'mb-6 text-tone-inverse')}>
              {toDisplayText(industry.cta?.title) || 'Ready to Get Started?'}
            </h2>
            <p className={cn(typography.lead, 'text-slate-300 mb-8')}>
              {toDisplayText(industry.cta?.description) || `Partner with IIS for ${industry.title.toLowerCase()} solutions that meet the most demanding requirements.`}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {(industry.cta?.buttons || [])
                .filter((button: CTAButton) => button?.enabled !== false)
                .map((button: CTAButton, index: number) => {
                  const label = toDisplayText(button.label);
                  const href = toDisplayText(button.href);
                  if (!label || !href) return null;
                  const isSecondary = button.variant === 'secondary' || index > 0;
                  const buttonKey = button._key || href || label;
                  return isSecondary ? (
                    <Button
                      key={keyFor('cta-button', index, buttonKey)}
                      size="lg"
                      variant="outline"
                      asChild
                      className={cn(styles.ctaSecondary, 'border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:text-tone-inverse')}
                    >
                      <Link href={href}>{label}</Link>
                    </Button>
                  ) : (
                    <Button
                      key={keyFor('cta-button', index, buttonKey)}
                      size="lg"
                      className={styles.ctaPrimary}
                      asChild
                    >
                      <Link href={href}>
                        {label}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  );
                })}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
