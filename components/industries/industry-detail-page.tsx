'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Shield, Award, Target } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/lib/client';
import { PortableText } from '@portabletext/react';
import HeroSection from '@/components/ui/hero-section';

const builder = imageUrlBuilder(client);

interface IndustryDetailPageProps {
  industry: any;
}

export default function IndustryDetailPage({ industry }: IndustryDetailPageProps) {
  // Extract hero data
  const heroImage = industry.hero?.backgroundImage
    ? builder.image(industry.hero.backgroundImage).width(1920).height(1080).url()
    : undefined;

  // Construct title with highlight from Sanity
  const heroTitle = industry.hero?.title && industry.hero?.titleHighlight ? (
    <span className="text-white">
      {industry.hero.title}{' '}
      <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
        {industry.hero.titleHighlight}
      </span>
    </span>
  ) : (
    <span className="text-white">{industry.title}</span>
  );

  // Use hero.description (plain text) or hero.descriptionRich (portable text)
  const heroDescription = industry.hero?.description
    ? industry.hero.description
    : industry.hero?.descriptionRich
    ? <PortableText value={industry.hero.descriptionRich} />
    : undefined;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection
        backgroundImage={heroImage || ''}
        imageAlt={industry.hero?.backgroundImage?.alt || industry.title}
        height="large"
        alignment="center"
        showScrollIndicator={true}
        badge={{
          text: industry.hero?.badge || industry.title.toUpperCase(),
          icon: Target,
        }}
        title={heroTitle}
        subtitle={industry.hero?.subtitle}
        description={heroDescription}
      />

      {/* Key Metrics Banner */}
      {industry.stats && industry.stats.length > 0 && (
        <section className="py-16 bg-zinc-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {industry.stats.map((stat: any, index: number) => (
                <motion.div
                  key={stat._key || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold text-blue-500 mb-2">{stat.value}</div>
                  <div className="text-lg font-semibold text-white mb-1">{stat.label}</div>
                  {stat.description && (
                    <div className="text-sm text-zinc-400">{stat.description}</div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Component Expertise / Sector Expertise */}
      {industry.expertise && industry.expertise.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4">
                {industry.expertiseSectionHeading || `${industry.title} Expertise`}
              </h2>
              <p className="text-lg text-zinc-600 max-w-3xl mx-auto">
                {industry.expertiseSectionDescription || 'Specialized manufacturing capabilities for critical applications.'}
              </p>
            </motion.div>

            <div className="space-y-12">
              {industry.expertise.map((section: any, index: number) => (
                <motion.div
                  key={section._key || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Card className="relative overflow-hidden p-8 shadow-lg">
                    {/* Background Image */}
                    {(section.image || section.imageUrl) && (
                      <div className="absolute inset-0 z-0">
                        {section.image ? (
                          <>
                            {/* Blurred background layer */}
                            <Image
                              src={builder.image(section.image).width(800).quality(30).url()}
                              alt=""
                              fill
                              className="object-cover blur-sm opacity-20"
                            />
                            {/* Sharp foreground layer */}
                            <Image
                              src={builder.image(section.image).width(800).quality(90).url()}
                              alt={section.image.alt || section.title}
                              fill
                              className="object-cover opacity-10"
                            />
                          </>
                        ) : section.imageUrl && (
                          <>
                            {/* Blurred background layer */}
                            <Image
                              src={section.imageUrl}
                              alt=""
                              fill
                              className="object-cover blur-sm opacity-20"
                            />
                            {/* Sharp foreground layer */}
                            <Image
                              src={section.imageUrl}
                              alt={section.title}
                              fill
                              className="object-cover opacity-10"
                            />
                          </>
                        )}
                      </div>
                    )}

                    {/* Content - positioned above background */}
                    <div className="relative z-10">
                      <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-4">
                        {section.title}
                      </h3>
                      <p className="text-lg text-zinc-600 mb-6">{section.description}</p>

                    <div className="grid md:grid-cols-3 gap-6">
                      {section.components && section.components.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-zinc-900 uppercase tracking-wide mb-3">
                            {section.componentsLabel || 'Typical Components'}
                          </h4>
                          <ul className="space-y-2">
                            {section.components.map((component: string, idx: number) => (
                              <li key={idx} className="flex items-start text-zinc-600 text-sm">
                                <CheckCircle className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                                {component}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {section.materials && section.materials.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-zinc-900 uppercase tracking-wide mb-3">
                            Materials
                          </h4>
                          <ul className="space-y-2">
                            {section.materials.map((material: string, idx: number) => (
                              <li key={idx} className="flex items-start text-zinc-600 text-sm">
                                <Shield className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                                {material}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {section.requirements && section.requirements.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-zinc-900 uppercase tracking-wide mb-3">
                            {section.requirementsLabel || 'Key Requirements'}
                          </h4>
                          <ul className="space-y-2">
                            {section.requirements.map((requirement: string, idx: number) => (
                              <li key={idx} className="flex items-start text-zinc-600 text-sm">
                                <CheckCircle className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                                {requirement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Certifications */}
      {industry.certifications && industry.certifications.length > 0 && (
        <section className="py-24 bg-zinc-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4">
                {industry.certificationsSectionHeading || 'Industry Certifications'}
              </h2>
              <p className="text-lg text-zinc-600 max-w-3xl mx-auto">
                {industry.certificationsSectionDescription || 'Industry-leading certifications ensuring the highest quality standards.'}
              </p>
            </motion.div>

            <div className={`grid md:grid-cols-2 ${industry.certifications.length >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-8`}>
              {industry.certifications.map((cert: any, index: number) => (
                <motion.div
                  key={cert._key || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Card className="p-6 h-full">
                    <Award className="w-12 h-12 text-blue-600 mb-4" />
                    <h3 className="text-xl font-bold text-zinc-900 mb-3">{cert.title}</h3>
                    <p className="text-sm text-zinc-600 whitespace-pre-line">{cert.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Benefits / Manufacturing Advantages / Specialized Capabilities */}
      {industry.processBenefits && industry.processBenefits.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4">
                {industry.processBenefitsSectionHeading || 'Manufacturing Capabilities'}
              </h2>
              <p className="text-lg text-zinc-600 max-w-3xl mx-auto">
                {industry.processBenefitsSectionDescription || 'Advanced capabilities delivering superior results for critical applications.'}
              </p>
            </motion.div>

            <div className={`grid ${industry.processBenefits.length >= 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'} gap-8`}>
              {industry.processBenefits.map((benefit: any, index: number) => (
                <motion.div
                  key={benefit._key || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Card className="p-8 h-full">
                    <h3 className="text-2xl font-bold text-zinc-900 mb-4">{benefit.title}</h3>
                    <p className="text-zinc-600 mb-6">{benefit.description}</p>

                    {benefit.features && benefit.features.length > 0 && (
                      <ul className="space-y-2">
                        {benefit.features.map((feature: any) => (
                          <li key={feature._key} className="flex items-start text-sm text-zinc-600">
                            <CheckCircle className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                            {feature.feature}
                          </li>
                        ))}
                      </ul>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {industry.cta?.heading || `Partner with ${industry.title} Experts`}
            </h2>
            <p className="text-lg text-zinc-300 mb-8">
              {industry.cta?.description || `Trust your critical ${industry.title.toLowerCase()} components to a proven manufacturing partner.`}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {industry.cta?.buttons?.filter((btn: any) => btn.enabled !== false).map((button: any, index: number) => (
                <Button
                  key={index}
                  size="lg"
                  asChild
                  className={button.variant === 'primary' ? 'bg-blue-600 hover:bg-blue-700' : 'border-zinc-600 text-zinc-300 hover:bg-zinc-800 hover:text-white'}
                  variant={button.variant === 'primary' ? 'default' : 'outline'}
                >
                  <Link href={button.href}>
                    {button.text} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )) || (
                <>
                  <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700">
                    <Link href="/contact">
                      Request Quote <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="border-zinc-600 text-zinc-300 hover:bg-zinc-800 hover:text-white">
                    <Link href="/industries">View All Industries</Link>
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
