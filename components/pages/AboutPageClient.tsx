"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import HeroSection from '@/components/ui/hero-section';
import { ArrowRight, Users, Factory, Award, Target, Zap, Shield, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import ParallaxImage from '@/components/ui/parallax-image';
import { typography, spacing, styles, cn } from '@/lib/design-system';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/lib/client';

const builder = imageUrlBuilder(client);

const iconMap: Record<string, any> = {
  Award,
  Zap,
  Target,
  Users,
  Factory,
  Shield,
  Lightbulb,
};

const urlFor = (source?: any) => {
  if (!source) return '';
  if (typeof source === 'string') return source;
  if (source?.asset) {
    try {
      return builder.image(source).url();
    } catch {
      return '';
    }
  }
  return '';
};

interface AboutPageClientProps {
  data?: any | null;
}

export default function AboutPageClient({ data }: AboutPageClientProps) {
  if (!data) {
    return null;
  }

  const heroImage = urlFor(data.hero?.backgroundImage) || data.hero?.backgroundImageUrl || '';
  const heroAlt = data.hero?.imageAlt || data.hero?.backgroundImage?.alt || '';
  const heroButtons = (Array.isArray(data.hero?.buttons) ? data.hero.buttons : [])
    .filter((btn: any) => btn?.enabled !== false && btn?.label && btn?.href)
    .map((btn: any) => ({
      label: btn.label,
      href: btn.href,
      variant: btn.variant as 'primary' | 'secondary' | undefined,
    }));
  const BadgeIcon = iconMap[data.hero?.badgeIconName || ''] || Factory;

  const storyParagraphs = Array.isArray(data.story?.paragraphs) && data.story.paragraphs.length > 0
    ? data.story.paragraphs
    : [data.story?.paragraph1, data.story?.paragraph2, data.story?.paragraph3].filter(Boolean);
  const storyImage = urlFor(data.story?.image) || data.story?.imageUrl || '';

  const timelineMilestones = Array.isArray(data.timeline?.milestones) ? data.timeline.milestones : [];
  const valuesItems = Array.isArray(data.values?.items) ? data.values.items : [];
  const capabilities = Array.isArray(data.capabilities) ? data.capabilities : [];
  const certifications = Array.isArray(data.certifications?.items) ? data.certifications.items : (Array.isArray(data.certifications) ? data.certifications : []);
  const leadershipMembers = Array.isArray(data.leadership?.team) ? data.leadership.team : [];
  const ctaButtons = Array.isArray(data.cta?.buttons) ? data.cta.buttons.filter((btn: any) => btn?.enabled !== false && btn?.label && btn?.href) : [];

  return (
    <div className="min-h-screen bg-background">
      {(heroImage || data.hero?.title || data.hero?.description) && (
        <HeroSection
          backgroundImage={heroImage}
          imageAlt={heroAlt}
          badge={data.hero?.badge ? { text: data.hero.badge, icon: BadgeIcon } : undefined}
          title={
            data.hero?.title ? (
              data.hero?.titleHighlight ? (
                <span className="text-white">
                  {data.hero.title}{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                    {data.hero.titleHighlight}
                  </span>
                </span>
              ) : (() => {
                // Split title to highlight last word in blue gradient
                const words = data.hero.title.split(' ');
                if (words.length === 1) {
                  return <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">{data.hero.title}</span>;
                }
                const firstPart = words.slice(0, -1).join(' ');
                const lastWord = words[words.length - 1];
                return (
                  <span>
                    <span className="text-white">{firstPart} </span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">{lastWord}</span>
                  </span>
                );
              })()
            ) : ''
          }
          description={data.hero?.description}
          buttons={heroButtons}
          height="large"
          alignment="center"
        />
      )}

      {Array.isArray(data.companyStats) && data.companyStats.length > 0 && (
        <section id="stats" className={`${styles.sectionLight} bg-slate-900/5`}>
          <div className={spacing.container}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {data.companyStats
                .filter((stat: any) => stat?.enabled !== false)
                .map((stat: any, index: number) => (
                <motion.div
                  key={`${stat?.label}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                    {stat?.value}
                  </div>
                  <div className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-2">
                    {stat?.label}
                  </div>
                  <div className="text-sm text-slate-500">
                    {stat?.description}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {(data.story?.title || storyParagraphs.length > 0 || storyImage) && (
        <section className={spacing.section}>
          <div className={spacing.container}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                {data.story?.title && (
                  <h2 className={cn(typography.h2, "mb-6")}>{data.story.title}</h2>
                )}
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  {storyParagraphs.map((paragraph: string, index: number) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </motion.div>

              {storyImage && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <ParallaxImage
                    src={storyImage}
                    alt={data.story?.imageAlt || ''}
                    className="w-full h-96 rounded-xl object-cover shadow-xl"
                    speed={0.2}
                  />
                </motion.div>
              )}
            </div>
          </div>
        </section>
      )}

      {timelineMilestones.length > 0 && (
        <section className={styles.sectionLight}>
          <div className={spacing.container}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              {data.timeline?.title && (
                <h2 className={cn(typography.h2, "mb-6")}>{data.timeline.title}</h2>
              )}
              {data.timeline?.description && (
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                  {data.timeline.description}
                </p>
              )}
            </motion.div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-slate-300 h-full" />
              <div className="space-y-12">
                {timelineMilestones
                  .filter((milestone: any) => milestone?.enabled !== false)
                  .map((milestone: any, index: number) => (
                  <motion.div
                    key={`${milestone?.title}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                      <Card className="p-6 border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-lg">
                        {milestone?.year && (
                          <div className="text-2xl font-bold text-slate-900 mb-2">{milestone.year}</div>
                        )}
                        <h3 className="text-xl font-semibold mb-3">{milestone?.title}</h3>
                        <p className="text-slate-600">{milestone?.description}</p>
                      </Card>
                    </div>
                    <div className="w-4 h-4 bg-slate-900 rounded-full border-4 border-white shadow-lg relative z-10" />
                    <div className="w-1/2" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {valuesItems.length > 0 && (
        <section className={styles.sectionLight}>
          <div className={spacing.container}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              {data.values?.title && (
                <h2 className={cn(typography.h2, "mb-6")}>{data.values.title}</h2>
              )}
              {data.values?.description && (
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                  {data.values.description}
                </p>
              )}
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {valuesItems
                .filter((value: any) => value?.enabled !== false)
                .map((value: any, index: number) => {
                  const Icon = iconMap[value?.iconName || ''] || Award;
                  return (
                    <motion.div
                      key={`${value?.title}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <Card className="p-8 border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-lg h-full">
                        <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-6">
                          <Icon className="w-6 h-6 text-slate-700" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">{value?.title}</h3>
                        <p className="text-slate-600">{value?.description}</p>
                      </Card>
                    </motion.div>
                  );
                })}
            </div>
          </div>
        </section>
      )}

      {(capabilities.length > 0 || certifications.length > 0) && (
        <section id="capabilities" className={styles.sectionLight}>
          <div className={spacing.container}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {capabilities.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="space-y-6">
                    {capabilities.map((capability: any, index: number) => (
                      <Card key={`${capability?.title}-${index}`} className="p-6 border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-lg">
                        <h3 className="text-xl font-bold mb-3">{capability?.title}</h3>
                        {capability?.description && (
                          <p className="text-slate-600 mb-4">{capability.description}</p>
                        )}
                        <div className="space-y-2">
                          {(capability?.items || []).map((item: any) => (
                            <div key={item?.item} className="flex items-center text-sm text-slate-600">
                              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-2" />
                              {item?.item}
                            </div>
                          ))}
                        </div>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              )}

              {certifications.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  {data.certifications?.title && (
                    <h2 className={cn(typography.h2, "mb-4")}>{data.certifications.title}</h2>
                  )}
                  <div className="space-y-4">
                    {certifications.map((cert: any, index: number) => (
                      <Card key={`${cert?.certification}-${index}`} className="p-5 border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow">
                        <div className="flex items-center">
                          <Shield className="w-5 h-5 text-blue-600 mr-3" />
                          <span className="text-slate-700 font-semibold">{cert?.certification}</span>
                        </div>
                      </Card>
                    ))}
                  </div>
                  {data.certifications?.commitmentTitle && (
                    <div className="mt-6 border-l-4 border-slate-300 pl-4">
                      <h3 className="text-lg font-semibold mb-2">{data.certifications.commitmentTitle}</h3>
                      <p className="text-slate-600">{data.certifications.commitmentDescription}</p>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </section>
      )}

      {leadershipMembers.length > 0 && (
        <section className={spacing.section}>
          <div className={spacing.container}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              {data.leadership?.title && (
                <h2 className={cn(typography.h2, "mb-6")}>{data.leadership.title}</h2>
              )}
              {data.leadership?.description && (
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                  {data.leadership.description}
                </p>
              )}
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {leadershipMembers
                .filter((leader: any) => leader?.enabled !== false)
                .map((leader: any, index: number) => {
                  const photoUrl = urlFor(leader?.photo) || leader?.photoUrl || '';
                  return (
                    <motion.div
                      key={`${leader?.name}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <Card className="p-8 border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-lg h-full">
                        <div className="flex items-start gap-6 mb-6">
                          {photoUrl && (
                            <img
                              src={photoUrl}
                              alt={leader?.photo?.alt || `Photo of ${leader?.name}`}
                              className="w-24 h-24 rounded-full object-cover shadow-md flex-shrink-0"
                            />
                          )}
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold mb-2">{leader?.name}</h3>
                            <div className="text-lg font-semibold text-slate-700 mb-1">{leader?.title}</div>
                            {leader?.experience && (
                              <div className="text-sm text-slate-500">{leader.experience}</div>
                            )}
                          </div>
                        </div>
                        {leader?.background && (
                          <p className="text-slate-600 mb-4">{leader.background}</p>
                        )}
                        {leader?.focus && (
                          <div className="border-l-4 border-slate-300 pl-4">
                            <div className="text-sm font-semibold text-slate-800 mb-1">Focus Area</div>
                            <div className="text-sm text-slate-600">{leader.focus}</div>
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

      {(data.cta?.title || data.cta?.description || ctaButtons.length > 0) && (
        <section className={spacing.section}>
          <div className={spacing.container}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto"
            >
              {data.cta?.title && (
                <h2 className={cn(typography.h2, "mb-6")}>{data.cta.title}</h2>
              )}
              {data.cta?.description && (
                <p className="text-xl text-slate-600 mb-8">
                  {data.cta.description}
                </p>
              )}
              {ctaButtons.length > 0 && (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {ctaButtons.map((button: any, index: number) => (
                    <Button
                      key={`${button.label}-${index}`}
                      size="lg"
                      className={button.variant === 'secondary' ? styles.ctaSecondary : styles.ctaPrimary}
                      variant={button.variant === 'secondary' ? 'outline' : 'default'}
                      asChild
                    >
                      <Link href={button.href}>
                        {button.label}
                        {index === 0 && <ArrowRight className="ml-2 h-4 w-4" />}
                      </Link>
                    </Button>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
