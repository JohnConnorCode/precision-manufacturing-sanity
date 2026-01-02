'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Award, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import HeroSection from '@/components/ui/hero-section';
import { getHeroImageUrl } from '@/lib/hero-images';

interface IndustryDetailPageProps {
  industry: any;
}

export default function IndustryDetailPage({ industry }: IndustryDetailPageProps) {
  const heroImage =
    getHeroImageUrl(industry.hero?.backgroundImage) ||
    getHeroImageUrl(industry.image) ||
    '';

  // Build the title with gradient highlight on last word
  // If titleHighlight is set, use it. Otherwise, split title and highlight last word.
  const heroTitle = (() => {
    const title = industry.hero?.title || industry.title;

    // If titleHighlight is explicitly set, use that pattern
    if (industry.hero?.titleHighlight) {
      return (
        <>
          <span className="text-tone-inverse">{title}</span>
          {' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600">
            {industry.hero.titleHighlight}
          </span>
        </>
      );
    }

    // Otherwise, split title and highlight last word
    const words = title.split(' ');
    if (words.length === 1) {
      return (
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600">
          {title}
        </span>
      );
    }
    const firstPart = words.slice(0, -1).join(' ');
    const lastWord = words[words.length - 1];
    return (
      <>
        <span className="text-tone-inverse">{firstPart} </span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600">
          {lastWord}
        </span>
      </>
    );
  })();

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
        badge={industry.hero?.badge ? { text: industry.hero.badge } : undefined}
        title={heroTitle}
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
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 mb-2">{stat.value}</div>
                  <div className="text-lg font-semibold text-tone-inverse mb-1">{stat.label}</div>
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
        <section className="py-24 bg-zinc-50 dark:bg-zinc-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-tone-inverse mb-4">
                {industry.expertiseSectionHeading || `${industry.title} Expertise`}
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
                {industry.expertiseSectionDescription || 'Specialized manufacturing capabilities for critical applications.'}
              </p>
            </motion.div>

            <div className="space-y-20">
              {industry.expertise.map((section: any, index: number) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div
                    key={section._key || index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                    className="group"
                  >
                    <div className={`grid lg:grid-cols-2 gap-12 items-center ${isEven ? '' : 'lg:grid-flow-dense'}`}>
                      {/* Image Side - only show Sanity CDN images, not external stock photos */}
                      <div className={`relative ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                        {section.image && (
                          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                            {(() => {
                              const sectionImageUrl = getHeroImageUrl(section.image, 800, 600);
                              if (!sectionImageUrl) return null;
                              return (
                                <Image
                                  src={sectionImageUrl}
                                  alt={section.image?.alt || section.title}
                                  fill
                                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                              );
                            })()}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                          </div>
                        )}
                      </div>

                      {/* Content Side */}
                      <div className={`${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                        <h3 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-tone-inverse mb-4">
                          {section.title}
                        </h3>
                        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">{section.description}</p>

                        <div className="grid sm:grid-cols-2 gap-6">
                          {section.components && section.components.length > 0 && (
                            <div className="bg-white dark:bg-zinc-800 rounded-xl p-5 shadow-sm border border-zinc-100 dark:border-zinc-700">
                              <h4 className="text-sm font-bold text-zinc-900 dark:text-tone-inverse uppercase tracking-wide mb-3 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                {section.componentsLabel || 'Typical Components'}
                              </h4>
                              <ul className="space-y-2">
                                {section.components.map((component: string, idx: number) => (
                                  <li key={idx} className="text-zinc-600 dark:text-zinc-400 text-sm flex items-start">
                                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                                    {component}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {section.materials && section.materials.length > 0 && (
                            <div className="bg-white dark:bg-zinc-800 rounded-xl p-5 shadow-sm border border-zinc-100 dark:border-zinc-700">
                              <h4 className="text-sm font-bold text-zinc-900 dark:text-tone-inverse uppercase tracking-wide mb-3 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                                Materials
                              </h4>
                              <ul className="space-y-2">
                                {section.materials.map((material: string, idx: number) => (
                                  <li key={idx} className="text-zinc-600 dark:text-zinc-400 text-sm flex items-start">
                                    <CheckCircle className="w-4 h-4 text-indigo-500 mr-2 flex-shrink-0 mt-0.5" />
                                    {material}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {section.requirements && section.requirements.length > 0 && (
                            <div className={`bg-white dark:bg-zinc-800 rounded-xl p-5 shadow-sm border border-zinc-100 dark:border-zinc-700 ${!section.components || !section.materials ? '' : 'sm:col-span-2'}`}>
                              <h4 className="text-sm font-bold text-zinc-900 dark:text-tone-inverse uppercase tracking-wide mb-3 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                                {section.requirementsLabel || 'Key Requirements'}
                              </h4>
                              <ul className={`space-y-2 ${section.requirements.length > 4 ? 'grid sm:grid-cols-2 gap-x-6 gap-y-2 space-y-0' : ''}`}>
                                {section.requirements.map((requirement: string, idx: number) => (
                                  <li key={idx} className="text-zinc-600 dark:text-zinc-400 text-sm flex items-start">
                                    <CheckCircle className="w-4 h-4 text-cyan-500 mr-2 flex-shrink-0 mt-0.5" />
                                    {requirement}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Certifications */}
      {industry.certifications && industry.certifications.length > 0 && (
        <section className="py-24 bg-zinc-50 dark:bg-zinc-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-tone-inverse mb-4">
                {industry.certificationsSectionHeading || 'Industry Certifications'}
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
                {industry.certificationsSectionDescription || 'Industry-leading certifications ensuring the highest quality standards.'}
              </p>
            </motion.div>

            <div className={`grid md:grid-cols-2 ${industry.certifications.length >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-8`}>
              {industry.certifications.map((cert: any, index: number) => (
                <motion.div
                  key={cert._key || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Card className="p-6 h-full hover:shadow-lg transition-shadow duration-300">
                    <Award className="w-12 h-12 text-blue-500 mb-4" />
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-tone-inverse mb-3">{cert.title}</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 whitespace-pre-line">{cert.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Benefits / Manufacturing Advantages / Specialized Capabilities */}
      {industry.processBenefits && industry.processBenefits.length > 0 && (
        <section className="py-24 bg-white dark:bg-zinc-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-tone-inverse mb-4">
                {industry.processBenefitsSectionHeading || 'Manufacturing Capabilities'}
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
                {industry.processBenefitsSectionDescription || 'Advanced capabilities delivering superior results for critical applications.'}
              </p>
            </motion.div>

            <div className={`grid ${industry.processBenefits.length >= 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'} gap-8`}>
              {industry.processBenefits.map((benefit: any, index: number) => (
                <motion.div
                  key={benefit._key || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Card className="p-8 h-full hover:shadow-lg transition-shadow duration-300">
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-tone-inverse mb-4">{benefit.title}</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-6">{benefit.description}</p>

                    {benefit.features && benefit.features.length > 0 && (
                      <ul className="space-y-2">
                        {benefit.features.map((feature: any) => (
                          <li key={feature._key} className="flex items-start text-sm text-zinc-600 dark:text-zinc-400">
                            <CheckCircle className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
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
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-tone-inverse mb-6">
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
                  className={button.variant === 'primary' ? 'bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500' : 'border-blue-500/50 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300 hover:border-blue-400'}
                  variant={button.variant === 'primary' ? 'default' : 'outline'}
                >
                  <Link href={button.href}>
                    {button.text} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )) || (
                <>
                  <Button size="lg" asChild className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500">
                    <Link href="/contact">
                      Request Quote <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300 hover:border-blue-400">
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
