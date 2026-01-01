'use client';

import { SafeMotion, stagger } from '@/components/ui/safe-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Award, TrendingUp, Target } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { typography, spacing, styles, cn } from '@/lib/design-system';
import HeroSection from '@/components/ui/hero-section';
import React from 'react';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/lib/client';

const builder = imageUrlBuilder(client);

// Sanity image source type
interface SanityImageSource {
  asset?: { _ref?: string; url?: string };
  alt?: string;
}

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

  // Extract hero image properly from Sanity
  const heroImage = (() => {
    const bg = industry.hero?.backgroundImage;
    if (!bg) return '';
    if (typeof bg === 'string') return bg;
    if (bg.asset) {
      return builder.image(bg).width(1920).height(1080).url();
    }
    return '';
  })();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection
        backgroundImage={heroImage}
        imageAlt={(() => {
          const bg = industry.hero?.backgroundImage;
          if (bg && typeof bg === 'object' && bg.alt) return bg.alt;
          return industry.title;
        })()}
        height="large"
        alignment="center"
        showScrollIndicator={true}
        badge={{
          text: industry.hero?.badge || industry.title.toUpperCase(),
          icon: Target,
        }}
        title={(() => {
          // Split title to highlight last word in blue gradient
          const words = industry.title.split(' ');
          if (words.length === 1) {
            return <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600">{industry.title}</span>;
          }
          const firstPart = words.slice(0, -1).join(' ');
          const lastWord = words[words.length - 1];
          return (
            <span>
              <span className="text-white">{firstPart} </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600">{lastWord}</span>
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
              <SafeMotion y={20}>
                <h2 className={cn(typography.h2, 'mb-6')}>Market Overview</h2>
                <p className={cn(typography.lead, 'mb-6')}>
                  {industry.overview.description}
                </p>

                {industry.overview.marketSize && (
                  <div className="mb-6">
                    <h3 className={cn(typography.h4, 'mb-2')}>Market Size</h3>
                    <p className={cn(typography.body)}>
                      {industry.overview.marketSize}
                    </p>
                  </div>
                )}

                {industry.overview.keyDrivers && industry.overview.keyDrivers.length > 0 && (
                  <div>
                    <h3 className={cn(typography.h4, 'mb-4')}>Key Market Drivers</h3>
                    <div className="space-y-3">
                      {industry.overview.keyDrivers.map((item: KeyDriver | string, index: number) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                          <span className={cn(typography.body)}>{typeof item === 'string' ? item : item.driver}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </SafeMotion>

              {industry.overview?.challenges && industry.overview.challenges.length > 0 && (
                <SafeMotion
                  y={20}
                  delay={0.1}
                  className="bg-slate-50 dark:bg-slate-900 p-8 rounded-lg"
                >
                  <h3 className={cn(typography.h3, 'mb-6')}>Key Challenges</h3>
                  <div className="space-y-4">
                    {industry.overview.challenges.map((item: Challenge | string, index: number) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                          <span className="text-red-600 font-bold text-sm">{index + 1}</span>
                        </div>
                        <span className={cn(typography.body)}>{typeof item === 'string' ? item : item.challenge}</span>
                      </div>
                    ))}
                  </div>
                </SafeMotion>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Capabilities Section */}
      {industry.capabilities && industry.capabilities.length > 0 && (
        <section className={spacing.section}>
          <div className={spacing.container}>
            <SafeMotion y={20} className="text-center mb-16">
              <h2 className={cn(typography.h2, 'mb-6')}>Our Capabilities</h2>
              <p className={cn(typography.lead, 'max-w-3xl mx-auto')}>
                Specialized manufacturing capabilities for {industry.title.toLowerCase()} applications.
              </p>
            </SafeMotion>

            <div className={styles.grid2Col}>
              {industry.capabilities.map((capability: CapabilityItem, index: number) => (
                <SafeMotion key={capability.title || `capability-${index}`} y={20} delay={stagger(index)}>
                  <Card className={cn(styles.featureCard, 'h-full')}>
                    <h3 className={cn(typography.h4, 'mb-4')}>{capability.title}</h3>
                    <p className={cn(typography.body, 'mb-6')}>{capability.description}</p>

                    {capability.technicalDetails && capability.technicalDetails.length > 0 && (
                      <div>
                        <h4 className={cn(typography.label, 'mb-3')}>Technical Details</h4>
                        <div className="space-y-2">
                          {capability.technicalDetails.map((detail: TechnicalDetail) => (
                            <div key={detail.detail} className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                              <CheckCircle className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                              {detail.detail}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </Card>
                </SafeMotion>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Components Section - Full Width Alternating Layout */}
      {industry.components && industry.components.length > 0 && (
        <section className={styles.sectionLight}>
          <div className={spacing.container}>
            <SafeMotion y={20} className="text-center mb-16">
              <h2 className={cn(typography.h2, 'mb-6')}>Component Expertise</h2>
              <p className={cn(typography.lead, 'max-w-3xl mx-auto')}>
                Precision manufacturing for critical {industry.title.toLowerCase()} components.
              </p>
            </SafeMotion>

            <div className="space-y-20">
              {industry.components.map((component: ComponentCategory, index: number) => (
                <SafeMotion
                  key={component.category}
                  y={20}
                  delay={stagger(index, 100)}
                  className={cn(
                    'grid lg:grid-cols-2 gap-12 items-center',
                    index % 2 === 0 ? '' : 'lg:grid-flow-dense'
                  )}
                >
                  {/* Content */}
                  <div className={index % 2 === 0 ? '' : 'lg:col-start-2'}>
                    <h3 className={cn(typography.h3, 'mb-4')}>{component.category}</h3>
                    <p className={cn(typography.lead, 'mb-8 text-slate-600 dark:text-slate-400')}>
                      {component.description}
                    </p>

                    {component.parts && component.parts.length > 0 && (
                      <div className="mb-8">
                        <h4 className={cn(typography.h5, 'mb-4')}>Component Parts</h4>
                        <div className="grid gap-3">
                          {component.parts.map((part: ComponentPart) => (
                            <div key={part.part} className="flex items-center">
                              <CheckCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                              <span className={cn(typography.body)}>{part.part}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {component.materials && component.materials.length > 0 && (
                      <div className="mb-8">
                        <h4 className={cn(typography.h5, 'mb-4')}>Materials</h4>
                        <div className="flex flex-wrap gap-2">
                          {component.materials.map((material: ComponentMaterial) => (
                            <span
                              key={material.material}
                              className="px-4 py-2 bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium"
                            >
                              {material.material}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {component.requirements && component.requirements.length > 0 && (
                      <div>
                        <h4 className={cn(typography.h5, 'mb-4')}>Requirements</h4>
                        <div className="grid gap-2">
                          {component.requirements.map((requirement: ComponentRequirement) => (
                            <div key={requirement.requirement} className="flex items-start">
                              <Target className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                              <span className={cn(typography.body, 'text-slate-600 dark:text-slate-400')}>{requirement.requirement}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Image - only show Sanity CDN images, not external stock photos */}
                  <div className={index % 2 === 0 ? '' : 'lg:col-start-1 lg:row-start-1'}>
                    {component.image && typeof component.image === 'string' && component.image.includes('cdn.sanity.io') && (
                      <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                          src={component.image}
                          alt={component.category || 'Component'}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                      </div>
                    )}
                  </div>
                </SafeMotion>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Expertise Section */}
      {industry.expertise && industry.expertise.length > 0 && (
        <section className={spacing.section}>
          <div className={spacing.container}>
            <SafeMotion y={20} className="text-center mb-16">
              <h2 className={cn(typography.h2, 'mb-6')}>Our Expertise</h2>
              <p className={cn(typography.lead, 'max-w-3xl mx-auto')}>
                Specialized knowledge and capabilities for {industry.title.toLowerCase()} applications.
              </p>
            </SafeMotion>

            <div className="space-y-24">
              {industry.expertise.map((item: ExpertiseItem, index: number) => (
                <SafeMotion
                  key={item.title || `expertise-${index}`}
                  y={20}
                  delay={stagger(index, 100)}
                  className={cn(
                    'grid lg:grid-cols-2 gap-12 items-center',
                    index % 2 === 0 ? '' : 'lg:grid-flow-dense'
                  )}
                >
                  {/* Content */}
                  <div className={index % 2 === 0 ? '' : 'lg:col-start-2'}>
                    <h3 className={cn(typography.h3, 'mb-6')}>{item.title}</h3>
                    <p className={cn(typography.body, 'mb-8 text-slate-600 dark:text-slate-400')}>
                      {item.description}
                    </p>

                    {/* Components */}
                    {item.components && item.components.length > 0 && (
                      <div className="mb-8">
                        <h4 className={cn(typography.h5, 'mb-4')}>Components</h4>
                        <div className="grid gap-3">
                          {item.components.map((component: string) => (
                            <div key={component} className="flex items-center">
                              <CheckCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                              <span className={cn(typography.body)}>{component}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Materials */}
                    {item.materials && item.materials.length > 0 && (
                      <div className="mb-8">
                        <h4 className={cn(typography.h5, 'mb-4')}>Materials</h4>
                        <div className="flex flex-wrap gap-2">
                          {item.materials.map((material: string) => (
                            <span
                              key={material}
                              className="px-4 py-2 bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium"
                            >
                              {material}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Requirements */}
                    {item.requirements && item.requirements.length > 0 && (
                      <div>
                        <h4 className={cn(typography.h5, 'mb-4')}>Requirements</h4>
                        <div className="grid gap-2">
                          {item.requirements.map((req: string) => (
                            <div key={req} className="flex items-start">
                              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2 flex-shrink-0" />
                              <span className={cn(typography.small, 'text-slate-600 dark:text-slate-400')}>{req}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Image - only show if it's a Sanity CDN image, not external stock photos */}
                  <div className={index % 2 === 0 ? '' : 'lg:col-start-1 lg:row-start-1'}>
                    {item.imageUrl && item.imageUrl.includes('cdn.sanity.io') && (
                      <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                          src={item.imageUrl}
                          alt={item.title || 'Application'}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                      </div>
                    )}
                  </div>
                </SafeMotion>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regulatory & Certifications */}
      {industry.regulatory && (industry.regulatory.certifications || industry.regulatory.standards) && (
        <section className={styles.sectionLight}>
          <div className={spacing.container}>
            <SafeMotion y={20} className="text-center mb-16">
              <h2 className={cn(typography.h2, 'mb-6')}>Regulatory Compliance</h2>
              <p className={cn(typography.lead, 'max-w-3xl mx-auto')}>
                Comprehensive certifications and standards compliance for {industry.title.toLowerCase()}.
              </p>
            </SafeMotion>

            <div className={styles.grid2Col}>
              {industry.regulatory.certifications && industry.regulatory.certifications.length > 0 && (
                <SafeMotion y={20}>
                  <Card className={cn(styles.featureCard, 'h-full')}>
                    <Award className="w-12 h-12 text-blue-600 mb-4" />
                    <h3 className={cn(typography.h4, 'mb-6')}>Certifications</h3>
                    <div className="space-y-4">
                      {industry.regulatory.certifications.map((cert: Certification) => (
                        <div key={cert.name} className="border-l-4 border-blue-600 pl-4">
                          <h4 className={cn(typography.label, 'mb-1')}>{cert.name}</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">{cert.description}</p>
                          {cert.scope && (
                            <p className="text-xs text-slate-500 dark:text-slate-500">{cert.scope}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </Card>
                </SafeMotion>
              )}

              {industry.regulatory.standards && industry.regulatory.standards.length > 0 && (
                <SafeMotion y={20} delay={0.1}>
                  <Card className={cn(styles.featureCard, 'h-full')}>
                    <CheckCircle className="w-12 h-12 text-blue-600 mb-4" />
                    <h3 className={cn(typography.h4, 'mb-6')}>Standards</h3>
                    <div className="space-y-3">
                      {industry.regulatory.standards.map((standard: Standard) => (
                        <div key={standard.name} className="flex items-start">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2 flex-shrink-0" />
                          <div>
                            <h4 className={cn(typography.label, 'mb-1')}>{standard.name}</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">{standard.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </SafeMotion>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Applications */}
      {industry.applications && industry.applications.length > 0 && (
        <section className={styles.sectionLight}>
          <div className={spacing.container}>
            <SafeMotion y={20} className="text-center mb-16">
              <h2 className={cn(typography.h2, 'mb-6')}>Industry Applications</h2>
              <p className={cn(typography.lead, 'max-w-3xl mx-auto')}>
                Specialized solutions for diverse {industry.title.toLowerCase()} applications.
              </p>
            </SafeMotion>

            {/* Dynamic grid based on item count to prevent orphans */}
            <div className={cn(
              'grid gap-6 md:gap-8',
              industry.applications.length === 1 && 'grid-cols-1 max-w-md mx-auto',
              industry.applications.length === 2 && 'grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto',
              industry.applications.length === 3 && 'grid-cols-1 md:grid-cols-3',
              industry.applications.length === 4 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
              industry.applications.length === 5 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5',
              industry.applications.length === 6 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
              industry.applications.length > 6 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            )}>
              {industry.applications.map((application: Application, index: number) => (
                <SafeMotion key={application.name} y={20} delay={stagger(index)}>
                  <Card className={cn(styles.featureCard, 'h-full')}>
                    <h3 className={cn(typography.h5, 'mb-3')}>{application.name}</h3>
                    <p className={cn(typography.small, 'mb-4')}>{application.description}</p>

                    {application.requirements && application.requirements.length > 0 && (
                      <div>
                        <h4 className={cn(typography.label, 'mb-2 text-sm')}>Requirements</h4>
                        <div className="space-y-1">
                          {application.requirements.map((req: ApplicationRequirement) => (
                            <div key={req.requirement} className="flex items-center text-xs text-slate-600 dark:text-slate-400">
                              <CheckCircle className="w-3 h-3 text-blue-600 mr-2 flex-shrink-0" />
                              {req.requirement}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </Card>
                </SafeMotion>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Quality Standards */}
      {industry.qualityStandards && industry.qualityStandards.length > 0 && (
        <section className={spacing.section}>
          <div className={spacing.container}>
            <SafeMotion y={20} className="text-center mb-16">
              <h2 className={cn(typography.h2, 'mb-6')}>Quality Standards</h2>
              <p className={cn(typography.lead, 'max-w-3xl mx-auto')}>
                Rigorous quality control processes ensuring the highest standards.
              </p>
            </SafeMotion>

            {/* Dynamic grid based on item count to prevent orphans */}
            <div className={cn(
              'grid gap-6 md:gap-8',
              industry.qualityStandards.length === 1 && 'grid-cols-1 max-w-md mx-auto',
              industry.qualityStandards.length === 2 && 'grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto',
              industry.qualityStandards.length === 3 && 'grid-cols-1 md:grid-cols-3',
              industry.qualityStandards.length === 4 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
              industry.qualityStandards.length === 5 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5',
              industry.qualityStandards.length === 6 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
              industry.qualityStandards.length > 6 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
            )}>
              {industry.qualityStandards.map((item: QualityStandard | string, index: number) => (
                <SafeMotion key={typeof item === 'string' ? item : item.standard} y={20} delay={stagger(index, 50)}>
                  <Card className={cn(styles.featureCard, 'h-full text-center')}>
                    <CheckCircle className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <p className={cn(typography.small, 'font-medium')}>
                      {typeof item === 'string' ? item : item.standard}
                    </p>
                  </Card>
                </SafeMotion>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Benefits */}
      {industry.processBenefits && industry.processBenefits.length > 0 && (
        <section className={styles.sectionLight}>
          <div className={spacing.container}>
            <SafeMotion y={20} className="text-center mb-16">
              <h2 className={cn(typography.h2, 'mb-6')}>Process Benefits</h2>
              <p className={cn(typography.lead, 'max-w-3xl mx-auto')}>
                Advanced manufacturing processes delivering superior results.
              </p>
            </SafeMotion>

            <div className={styles.grid2Col}>
              {industry.processBenefits.map((benefit: ProcessBenefit, index: number) => (
                <SafeMotion key={benefit.title} y={20} delay={stagger(index)}>
                  <Card className={cn(styles.featureCard, 'h-full')}>
                    <TrendingUp className="w-10 h-10 text-blue-600 mb-4" />
                    <h3 className={cn(typography.h4, 'mb-4')}>{benefit.title}</h3>
                    <p className={cn(typography.body, 'mb-6')}>{benefit.description}</p>

                    {benefit.features && benefit.features.length > 0 && (
                      <div>
                        <h4 className={cn(typography.label, 'mb-3')}>Key Features</h4>
                        <div className="space-y-2">
                          {benefit.features.map((feature: ProcessBenefitFeature) => (
                            <div key={feature.feature} className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                              <CheckCircle className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                              {feature.feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </Card>
                </SafeMotion>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className={styles.sectionDark}>
        <div className={spacing.container}>
          <SafeMotion y={20} className="text-center max-w-4xl mx-auto">
            <h2 className={cn(typography.h2, 'mb-6 text-white')}>
              {industry.cta?.title || 'Ready to Get Started?'}
            </h2>
            <p className={cn(typography.lead, 'text-slate-300 mb-8')}>
              {industry.cta?.description || `Partner with IIS for ${industry.title.toLowerCase()} solutions that meet the most demanding requirements.`}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {(industry.cta?.buttons || [])
                .filter((button: CTAButton) => button?.enabled !== false && button?.label && button?.href)
                .map((button: CTAButton, index: number) => {
                  const isSecondary = button.variant === 'secondary' || index > 0;
                  return isSecondary ? (
                    <Button
                      key={button._key || index}
                      size="lg"
                      variant="outline"
                      asChild
                      className={cn(styles.ctaSecondary, 'border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:text-white')}
                    >
                      <Link href={button.href!}>{button.label}</Link>
                    </Button>
                  ) : (
                    <Button
                      key={button._key || index}
                      size="lg"
                      className={styles.ctaPrimary}
                      asChild
                    >
                      <Link href={button.href!}>
                        {button.label}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  );
                })}
            </div>
          </SafeMotion>
        </div>
      </section>
    </div>
  );
}
