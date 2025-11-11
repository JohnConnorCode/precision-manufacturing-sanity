'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PremiumButton } from '@/components/ui/premium-button';
import { Card } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Settings, Shield, Zap, Cog, Target } from 'lucide-react';
import Link from 'next/link';
import ParallaxImagePro from '@/components/ui/parallax-image-pro';
import SectionHeader from '@/components/ui/section-header';
import { theme, styles, cn } from '@/lib/theme';
import { PortableTextContent } from '@/components/portable-text-components';
import HeroSection from '@/components/ui/hero-section';
import React from 'react';

// Icon mapping for service offerings
const iconMap: Record<string, any> = {
  Settings,
  Shield,
  Zap,
  Cog,
  Target,
};

interface ServiceContentProps {
  serviceData: any;
  slug: string;
}

export function ServiceContent({ serviceData, slug: _slug }: ServiceContentProps) {
  const service = serviceData as any;
  const heroImage = service.hero?.backgroundImage?.asset?.url || service.hero?.backgroundImage
    ? (service.hero?.backgroundImage?.asset?.url || service.hero.backgroundImage)
    : 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=2400&q=90';

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection
        backgroundImage={heroImage}
        imageAlt={service.title}
        height="large"
        alignment="center"
        showScrollIndicator={true}
        badge={{
          text: service.hero?.badge || 'SERVICE',
          icon: Target,
        }}
        title={<span className="text-white">{service.title}</span>}
        subtitle={service.hero?.subtitle}
        description={service.hero?.descriptionRich ? (
          <PortableTextContent value={service.hero.descriptionRich} />
        ) : (
          service.overview?.description
        )}
        titleSize={service.hero?.titleSize}
        descriptionSize={service.hero?.descriptionSize}
        buttons={[
          {
            label: 'Get Quote',
            href: '/contact',
            variant: 'primary',
          },
          {
            label: 'View Services',
            href: '/services',
            variant: 'secondary',
          },
        ]}
      />

      {/* Capabilities Overview */}
      {service.capabilities && service.capabilities.length > 0 && (
        <section className={styles.sectionLight}>
          <div className={theme.spacing.container}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className={styles.grid4Col}
            >
              {service.capabilities.map((capability: any, index: number) => (
                <motion.div
                  key={capability.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className={styles.statValue}>{capability.value}</div>
                  <div className={cn(theme.typography.badge, 'text-slate-700 mb-2')}>
                    {capability.label}
                  </div>
                  <div className={theme.typography.small}>{capability.description}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Service Offerings Grid - Only if services array exists */}
      {service.services && service.services.length > 0 && (
        <section className={theme.spacing.section}>
          <div className={theme.spacing.container}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className={cn(theme.typography.h2, 'mb-6')}>{service.title} Services</h2>
              {service.overview?.descriptionRich ? (
                <div className={cn(theme.typography.lead, 'max-w-3xl mx-auto')}>
                  <PortableTextContent value={service.overview.descriptionRich} />
                </div>
              ) : (
                <p className={cn(theme.typography.lead, 'max-w-3xl mx-auto')}>
                  Comprehensive capabilities for complex components requiring precision and reliability.
                </p>
              )}
            </motion.div>

            <div className={styles.grid2Col}>
              {service.services.map((offering: any, index: number) => {
                const OfferingIcon = iconMap[offering.iconName] || Settings;
                return (
                  <motion.div
                    key={offering.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <Card className={cn(styles.featureCard, 'group h-full overflow-hidden')}>
                      {offering.image && (
                        <div className="relative h-64 overflow-hidden">
                          <ParallaxImagePro
                            src={offering.image}
                            alt={offering.title}
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
                            <h4 className={cn(theme.typography.label, 'mb-3')}>Key Features</h4>
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
                            <h4 className={cn(theme.typography.label, 'mb-3')}>Capabilities</h4>
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

      {/* Materials Section - Only if materials array exists */}
      {service.materials && service.materials.length > 0 && (
        <section className={styles.sectionLight}>
          <div className={theme.spacing.container}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className={cn(theme.typography.h2, 'mb-6')}>Material Capabilities</h2>
              <p className={cn(theme.typography.lead, 'max-w-3xl mx-auto')}>
                Expert machining across a wide range of materials from standard aluminum to exotic superalloys.
              </p>
            </motion.div>

            <div className={styles.grid4Col}>
              {service.materials.map((material: any, index: number) => (
                <motion.div
                  key={material.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className={cn(styles.featureCard, 'h-full')}>
                    <h3 className={cn(theme.typography.h5, 'mb-3')}>{material.category}</h3>

                    {material.types && material.types.length > 0 && (
                      <div className="mb-4">
                        <h4 className={cn(theme.typography.label, 'mb-2 text-sm')}>Available Types</h4>
                        <div className="space-y-1">
                          {material.types.map((type: any) => (
                            <div key={type.type} className="flex items-center text-xs text-slate-600">
                              <div className="w-1 h-1 bg-blue-500 rounded-full mr-2" />
                              {type.type}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {material.applications && (
                      <div>
                        <h4 className={cn(theme.typography.label, 'mb-2 text-sm')}>Applications</h4>
                        <p className="text-xs text-slate-600">{material.applications}</p>
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Overview - Only if processes array exists */}
      {service.processes && service.processes.length > 0 && (
        <section className={theme.spacing.section}>
          <div className={theme.spacing.container}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className={cn(theme.typography.h2, 'mb-6')}>Manufacturing Process</h2>
              <p className={cn(theme.typography.lead, 'max-w-3xl mx-auto')}>
                Our comprehensive approach ensures optimal results from initial programming through final inspection.
              </p>
            </motion.div>

            <div className={styles.grid4Col}>
              {service.processes.map((process: any, index: number) => (
                <motion.div
                  key={process.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
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

                    {process.features && process.features.length > 0 && (
                      <div>
                        <h4 className={cn(theme.typography.label, 'mb-2 text-sm')}>Key Elements</h4>
                        <div className="space-y-1">
                          {process.features.map((feature: any) => (
                            <div key={feature.feature} className="flex items-center text-xs text-slate-600">
                              <CheckCircle className="w-3 h-3 text-blue-600 mr-2 flex-shrink-0" />
                              {feature.feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className={styles.sectionDark}>
        <div className={theme.spacing.container}>
          <div className="text-center max-w-4xl mx-auto">
            <SectionHeader
              heading="Ready to Get Started?"
              gradientWordPosition="last"
              description={`Partner with IIS for ${service.title.toLowerCase()} solutions that meet the most demanding aerospace and defense requirements.`}
              className="[&_h2]:text-white [&_p]:text-slate-300 mb-8"
            />
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact?interest=quote">
                <PremiumButton size="lg" variant="default">
                  Get Technical Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </PremiumButton>
              </Link>
              <Link href="/services">
                <PremiumButton size="lg" variant="secondary">
                  View All Services
                </PremiumButton>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
