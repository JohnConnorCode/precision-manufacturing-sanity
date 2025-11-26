'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Award, TrendingUp, Shield, Target } from 'lucide-react';
import Link from 'next/link';
import ParallaxImagePro from '@/components/ui/parallax-image-pro';
import { theme, styles, cn } from '@/lib/theme';
import HeroSection from '@/components/ui/hero-section';
import React from 'react';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/lib/client';

const builder = imageUrlBuilder(client);

interface IndustryContentProps {
  industryData: any;
  slug: string;
}

export function IndustryContent({ industryData }: IndustryContentProps) {
  const industry = industryData as any;

  // Extract hero image properly from Sanity
  const heroImage = industry.hero?.backgroundImage?.asset
    ? builder.image(industry.hero.backgroundImage).width(1920).height(1080).url()
    : industry.hero?.backgroundImage;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection
        backgroundImage={heroImage}
        imageAlt={industry.hero?.backgroundImage?.alt || industry.title}
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
            return <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">{industry.title}</span>;
          }
          const firstPart = words.slice(0, -1).join(' ');
          const lastWord = words[words.length - 1];
          return (
            <span>
              <span className="text-white">{firstPart} </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">{lastWord}</span>
            </span>
          );
        })()}
        subtitle={industry.hero?.subtitle}
        description={industry.hero?.description || industry.overview?.description}
        buttons={industry.hero?.buttons || []}
      />

      {/* Market Overview */}
      {industry.overview && (
        <section className={styles.sectionLight}>
          <div className={theme.spacing.container}>
            <div className={styles.grid2Col}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className={cn(theme.typography.h2, 'mb-6')}>Market Overview</h2>
                <p className={cn(theme.typography.lead, 'mb-6')}>
                  {industry.overview.description}
                </p>

                {industry.overview.marketSize && (
                  <div className="mb-6">
                    <h3 className={cn(theme.typography.h4, 'mb-2')}>Market Size</h3>
                    <p className={cn(theme.typography.body)}>
                      {industry.overview.marketSize}
                    </p>
                  </div>
                )}

                {industry.overview.keyDrivers && industry.overview.keyDrivers.length > 0 && (
                  <div>
                    <h3 className={cn(theme.typography.h4, 'mb-4')}>Key Market Drivers</h3>
                    <div className="space-y-3">
                      {industry.overview.keyDrivers.map((item: any, index: number) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                          <span className={cn(theme.typography.body)}>{item.driver || item}</span>
                        </div>
                      ))}
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
                  className="bg-slate-50 p-8 rounded-lg"
                >
                  <h3 className={cn(theme.typography.h3, 'mb-6')}>Key Challenges</h3>
                  <div className="space-y-4">
                    {industry.overview.challenges.map((item: any, index: number) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                          <span className="text-red-600 font-bold text-sm">{index + 1}</span>
                        </div>
                        <span className={cn(theme.typography.body)}>{item.challenge || item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Capabilities Section */}
      {industry.capabilities && industry.capabilities.length > 0 && (
        <section className={theme.spacing.section}>
          <div className={theme.spacing.container}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className={cn(theme.typography.h2, 'mb-6')}>Our Capabilities</h2>
              <p className={cn(theme.typography.lead, 'max-w-3xl mx-auto')}>
                Specialized manufacturing capabilities for {industry.title.toLowerCase()} applications.
              </p>
            </motion.div>

            <div className={styles.grid2Col}>
              {industry.capabilities.map((capability: any, index: number) => (
                <motion.div
                  key={capability.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className={cn(styles.featureCard, 'h-full')}>
                    <h3 className={cn(theme.typography.h4, 'mb-4')}>{capability.title}</h3>
                    <p className={cn(theme.typography.body, 'mb-6')}>{capability.description}</p>

                    {capability.technicalDetails && capability.technicalDetails.length > 0 && (
                      <div>
                        <h4 className={cn(theme.typography.label, 'mb-3')}>Technical Details</h4>
                        <div className="space-y-2">
                          {capability.technicalDetails.map((detail: any) => (
                            <div key={detail.detail} className="flex items-center text-sm text-slate-600">
                              <CheckCircle className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                              {detail.detail}
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

      {/* Components Section */}
      {industry.components && industry.components.length > 0 && (
        <section className={styles.sectionLight}>
          <div className={theme.spacing.container}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className={cn(theme.typography.h2, 'mb-6')}>Component Expertise</h2>
              <p className={cn(theme.typography.lead, 'max-w-3xl mx-auto')}>
                Precision manufacturing for critical {industry.title.toLowerCase()} components.
              </p>
            </motion.div>

            <div className={styles.grid2Col}>
              {industry.components.map((component: any, index: number) => (
                <motion.div
                  key={component.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className={cn(styles.featureCard, 'group h-full overflow-hidden')}>
                    {component.image && (
                      <div className="relative h-64 overflow-hidden">
                        <ParallaxImagePro
                          src={component.image}
                          alt={component.category}
                          className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                          speed={0.2}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      </div>
                    )}

                    <div className="p-8">
                      <h3 className={cn(theme.typography.h4, 'mb-4 group-hover:text-blue-600 transition-colors')}>
                        {component.category}
                      </h3>
                      <p className={cn(theme.typography.body, 'mb-6')}>
                        {component.description}
                      </p>

                      {component.parts && component.parts.length > 0 && (
                        <div className="mb-6">
                          <h4 className={cn(theme.typography.label, 'mb-3')}>Component Parts</h4>
                          <div className="grid grid-cols-1 gap-2">
                            {component.parts.map((part: any) => (
                              <div key={part.part} className="flex items-center text-sm text-slate-600">
                                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" />
                                {part.part}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {component.materials && component.materials.length > 0 && (
                        <div className="mb-6">
                          <h4 className={cn(theme.typography.label, 'mb-3')}>Materials</h4>
                          <div className="space-y-1">
                            {component.materials.map((material: any) => (
                              <div key={material.material} className="flex items-center text-sm text-slate-600">
                                <Shield className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                                {material.material}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {component.requirements && component.requirements.length > 0 && (
                        <div>
                          <h4 className={cn(theme.typography.label, 'mb-3')}>Requirements</h4>
                          <div className="space-y-1">
                            {component.requirements.map((requirement: any) => (
                              <div key={requirement.requirement} className="flex items-center text-sm text-slate-600">
                                <Target className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                                {requirement.requirement}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Expertise Section */}
      {industry.expertise && industry.expertise.length > 0 && (
        <section className={theme.spacing.section}>
          <div className={theme.spacing.container}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className={cn(theme.typography.h2, 'mb-6')}>Our Expertise</h2>
              <p className={cn(theme.typography.lead, 'max-w-3xl mx-auto')}>
                Specialized knowledge and capabilities for {industry.title.toLowerCase()} applications.
              </p>
            </motion.div>

            <div className="space-y-24">
              {industry.expertise.map((item: any, index: number) => (
                <motion.div
                  key={item.title}
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
                    <h3 className={cn(theme.typography.h3, 'mb-6')}>{item.title}</h3>
                    <p className={cn(theme.typography.body, 'mb-8 text-slate-600')}>
                      {item.description}
                    </p>

                    {/* Components */}
                    {item.components && item.components.length > 0 && (
                      <div className="mb-8">
                        <h4 className={cn(theme.typography.h5, 'mb-4')}>Components</h4>
                        <div className="grid gap-3">
                          {item.components.map((component: string) => (
                            <div key={component} className="flex items-center">
                              <CheckCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                              <span className={cn(theme.typography.body)}>{component}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Materials */}
                    {item.materials && item.materials.length > 0 && (
                      <div className="mb-8">
                        <h4 className={cn(theme.typography.h5, 'mb-4')}>Materials</h4>
                        <div className="flex flex-wrap gap-2">
                          {item.materials.map((material: string) => (
                            <span
                              key={material}
                              className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium"
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
                        <h4 className={cn(theme.typography.h5, 'mb-4')}>Requirements</h4>
                        <div className="grid gap-2">
                          {item.requirements.map((req: string) => (
                            <div key={req} className="flex items-start">
                              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2 flex-shrink-0" />
                              <span className={cn(theme.typography.small, 'text-slate-600')}>{req}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Image */}
                  <div className={index % 2 === 0 ? '' : 'lg:col-start-1 lg:row-start-1'}>
                    {item.imageUrl && (
                      <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                        <ParallaxImagePro
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          speed={0.15}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regulatory & Certifications */}
      {industry.regulatory && (industry.regulatory.certifications || industry.regulatory.standards) && (
        <section className={styles.sectionLight}>
          <div className={theme.spacing.container}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className={cn(theme.typography.h2, 'mb-6')}>Regulatory Compliance</h2>
              <p className={cn(theme.typography.lead, 'max-w-3xl mx-auto')}>
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
                    <h3 className={cn(theme.typography.h4, 'mb-6')}>Certifications</h3>
                    <div className="space-y-4">
                      {industry.regulatory.certifications.map((cert: any) => (
                        <div key={cert.name} className="border-l-4 border-blue-600 pl-4">
                          <h4 className={cn(theme.typography.label, 'mb-1')}>{cert.name}</h4>
                          <p className="text-sm text-slate-600 mb-1">{cert.description}</p>
                          {cert.scope && (
                            <p className="text-xs text-slate-500">{cert.scope}</p>
                          )}
                        </div>
                      ))}
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
                    <h3 className={cn(theme.typography.h4, 'mb-6')}>Standards</h3>
                    <div className="space-y-3">
                      {industry.regulatory.standards.map((standard: any) => (
                        <div key={standard.name} className="flex items-start">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2 flex-shrink-0" />
                          <div>
                            <h4 className={cn(theme.typography.label, 'mb-1')}>{standard.name}</h4>
                            <p className="text-sm text-slate-600">{standard.description}</p>
                          </div>
                        </div>
                      ))}
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
          <div className={theme.spacing.container}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className={cn(theme.typography.h2, 'mb-6')}>Industry Applications</h2>
              <p className={cn(theme.typography.lead, 'max-w-3xl mx-auto')}>
                Specialized solutions for diverse {industry.title.toLowerCase()} applications.
              </p>
            </motion.div>

            <div className={styles.grid3Col}>
              {industry.applications.map((application: any, index: number) => (
                <motion.div
                  key={application.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className={cn(styles.featureCard, 'h-full')}>
                    <h3 className={cn(theme.typography.h5, 'mb-3')}>{application.name}</h3>
                    <p className={cn(theme.typography.small, 'mb-4')}>{application.description}</p>

                    {application.requirements && application.requirements.length > 0 && (
                      <div>
                        <h4 className={cn(theme.typography.label, 'mb-2 text-sm')}>Requirements</h4>
                        <div className="space-y-1">
                          {application.requirements.map((req: any) => (
                            <div key={req.requirement} className="flex items-center text-xs text-slate-600">
                              <CheckCircle className="w-3 h-3 text-blue-600 mr-2 flex-shrink-0" />
                              {req.requirement}
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

      {/* Quality Standards */}
      {industry.qualityStandards && industry.qualityStandards.length > 0 && (
        <section className={theme.spacing.section}>
          <div className={theme.spacing.container}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className={cn(theme.typography.h2, 'mb-6')}>Quality Standards</h2>
              <p className={cn(theme.typography.lead, 'max-w-3xl mx-auto')}>
                Rigorous quality control processes ensuring the highest standards.
              </p>
            </motion.div>

            <div className={styles.grid4Col}>
              {industry.qualityStandards.map((item: any, index: number) => (
                <motion.div
                  key={item.standard || item}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className={cn(styles.featureCard, 'h-full text-center')}>
                    <CheckCircle className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <p className={cn(theme.typography.small, 'font-medium')}>
                      {item.standard || item}
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
          <div className={theme.spacing.container}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className={cn(theme.typography.h2, 'mb-6')}>Process Benefits</h2>
              <p className={cn(theme.typography.lead, 'max-w-3xl mx-auto')}>
                Advanced manufacturing processes delivering superior results.
              </p>
            </motion.div>

            <div className={styles.grid2Col}>
              {industry.processBenefits.map((benefit: any, index: number) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className={cn(styles.featureCard, 'h-full')}>
                    <TrendingUp className="w-10 h-10 text-blue-600 mb-4" />
                    <h3 className={cn(theme.typography.h4, 'mb-4')}>{benefit.title}</h3>
                    <p className={cn(theme.typography.body, 'mb-6')}>{benefit.description}</p>

                    {benefit.features && benefit.features.length > 0 && (
                      <div>
                        <h4 className={cn(theme.typography.label, 'mb-3')}>Key Features</h4>
                        <div className="space-y-2">
                          {benefit.features.map((feature: any) => (
                            <div key={feature.feature} className="flex items-center text-sm text-slate-600">
                              <CheckCircle className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className={cn(theme.typography.h2, 'mb-6 text-white')}>Ready to Get Started?</h2>
            <p className={cn(theme.typography.lead, 'text-slate-300 mb-8')}>
              Partner with IIS for {industry.title.toLowerCase()} solutions that meet the most demanding requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className={styles.ctaPrimary}>
                Schedule Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" asChild className={cn(styles.ctaSecondary, 'border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:text-white')}>
                <Link href="/industries">View All Industries</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
