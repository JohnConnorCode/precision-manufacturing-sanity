"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import HeroSection from '@/components/ui/hero-section';
import { ArrowRight, Users, Factory, Award, Target, Zap, Shield, Lightbulb, LucideIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import ParallaxImage from '@/components/ui/parallax-image';
import { typography, spacing, styles, cn } from '@/lib/design-system';
import { getHeroImageUrl } from '@/lib/hero-images';
import { usePrefersReducedMotion } from '@/lib/motion';
import { useAnimateInView, ANIM_STATES, ANIM_TRANSITION } from '@/lib/use-animate-in-view';

const iconMap: Record<string, LucideIcon> = {
  Award,
  Zap,
  Target,
  Users,
  Factory,
  Shield,
  Lightbulb,
};

// Sanity image source type
interface SanityImageSource {
  asset?: { _ref?: string; url?: string };
  alt?: string;
}

const urlFor = getHeroImageUrl;

// Type definitions for About page CMS data
interface HeroButton {
  enabled?: boolean;
  label?: string;
  href?: string;
  variant?: 'primary' | 'secondary';
}

interface CompanyStat {
  enabled?: boolean;
  value?: string;
  label?: string;
  description?: string;
}

interface Milestone {
  enabled?: boolean;
  year?: string;
  title?: string;
  description?: string;
}

interface ValueItem {
  enabled?: boolean;
  iconName?: string;
  title?: string;
  description?: string;
}

interface CapabilityItem {
  item?: string;
}

interface Capability {
  title?: string;
  description?: string;
  items?: CapabilityItem[];
}

interface Certification {
  certification?: string;
}

interface LeadershipMember {
  enabled?: boolean;
  name?: string;
  title?: string;
  experience?: string;
  background?: string;
  focus?: string;
  photo?: SanityImageSource;
  photoUrl?: string;
}

interface CTAButton {
  enabled?: boolean;
  label?: string;
  href?: string;
  variant?: 'primary' | 'secondary';
}

interface AboutPageData {
  hero?: {
    backgroundImage?: string | SanityImageSource;
    backgroundImageUrl?: string;
    imageAlt?: string;
    badge?: string;
    badgeIconName?: string;
    title?: string;
    titleHighlight?: string;
    description?: string;
    buttons?: HeroButton[];
  };
  companyStats?: CompanyStat[];
  story?: {
    title?: string;
    paragraphs?: string[];
    paragraph1?: string;
    paragraph2?: string;
    paragraph3?: string;
    image?: SanityImageSource;
    imageUrl?: string;
    imageAlt?: string;
  };
  timeline?: {
    title?: string;
    description?: string;
    milestones?: Milestone[];
  };
  values?: {
    title?: string;
    description?: string;
    items?: ValueItem[];
  };
  capabilities?: Capability[];
  certifications?: {
    title?: string;
    items?: Certification[];
    commitmentTitle?: string;
    commitmentDescription?: string;
  } | Certification[];
  leadership?: {
    title?: string;
    description?: string;
    team?: LeadershipMember[];
  };
  cta?: {
    title?: string;
    description?: string;
    buttons?: CTAButton[];
  };
}

interface CertificationsObject {
  title?: string;
  items?: Certification[];
  commitmentTitle?: string;
  commitmentDescription?: string;
}

// Type guard to check if certifications is the object form (not array)
function isCertificationsObject(cert: CertificationsObject | Certification[] | undefined): cert is CertificationsObject {
  return !!cert && !Array.isArray(cert);
}

interface AboutPageClientProps {
  data?: AboutPageData | null;
}

export default function AboutPageClient({ data }: AboutPageClientProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  // Animation hooks for each section
  const statsAnim = useAnimateInView<HTMLDivElement>();
  const storyLeftAnim = useAnimateInView<HTMLDivElement>();
  const storyRightAnim = useAnimateInView<HTMLDivElement>();
  const timelineHeaderAnim = useAnimateInView<HTMLDivElement>();
  const timelineGridAnim = useAnimateInView<HTMLDivElement>();
  const valuesHeaderAnim = useAnimateInView<HTMLDivElement>();
  const valuesGridAnim = useAnimateInView<HTMLDivElement>();
  const capabilitiesHeaderAnim = useAnimateInView<HTMLDivElement>();
  const capabilitiesGridAnim = useAnimateInView<HTMLDivElement>();
  const certificationsAnim = useAnimateInView<HTMLDivElement>();
  const leadershipHeaderAnim = useAnimateInView<HTMLDivElement>();
  const leadershipGridAnim = useAnimateInView<HTMLDivElement>();
  const ctaAnim = useAnimateInView<HTMLDivElement>();

  if (!data) {
    return null;
  }

  const heroImage = urlFor(data.hero?.backgroundImage) || data.hero?.backgroundImageUrl || '';
  const heroAlt = (() => {
    if (data.hero?.imageAlt) return data.hero.imageAlt;
    const bg = data.hero?.backgroundImage;
    if (bg && typeof bg === 'object' && bg.alt) return bg.alt;
    return '';
  })();
  const heroButtons = (Array.isArray(data.hero?.buttons) ? data.hero.buttons : [])
    .filter((btn: HeroButton) => btn?.enabled !== false && btn?.label && btn?.href)
    .map((btn: HeroButton) => ({
      label: btn.label!,
      href: btn.href!,
      variant: btn.variant as 'primary' | 'secondary' | undefined,
    }));
  const BadgeIcon = iconMap[data.hero?.badgeIconName || ''] || Factory;

  const storyParagraphs = Array.isArray(data.story?.paragraphs) && data.story.paragraphs.length > 0
    ? data.story.paragraphs
    : [data.story?.paragraph1, data.story?.paragraph2, data.story?.paragraph3].filter((p): p is string => !!p);
  const storyImage = urlFor(data.story?.image) || data.story?.imageUrl || '';

  const timelineMilestones = Array.isArray(data.timeline?.milestones) ? data.timeline.milestones : [];
  const valuesItems = Array.isArray(data.values?.items) ? data.values.items : [];
  const capabilities = Array.isArray(data.capabilities) ? data.capabilities : [];
  const certifications = isCertificationsObject(data.certifications)
    ? (data.certifications.items || [])
    : (Array.isArray(data.certifications) ? data.certifications : []);
  const leadershipMembers = Array.isArray(data.leadership?.team) ? data.leadership.team : [];
  const ctaButtons = Array.isArray(data.cta?.buttons) ? data.cta.buttons.filter((btn: CTAButton) => btn?.enabled !== false && btn?.label && btn?.href) : [];

  return (
    <div className="min-h-screen bg-background">
      {(heroImage || data.hero?.title || data.hero?.description) && (
        <HeroSection
          backgroundImage={heroImage}
          imageAlt={heroAlt}
          badge={data.hero?.badge ? { text: data.hero.badge, icon: BadgeIcon } : undefined}
          title={(() => {
            // Using inline styles for WebKit compatibility (Tailwind text-transparent doesn't work)
            const gradientStyle = {
              background: 'linear-gradient(to right, #3b82f6, #4f46e5)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            } as React.CSSProperties;

            if (!data.hero?.title) return '';
            if (data.hero?.titleHighlight) {
              return (
                <span className="text-tone-inverse">
                  {data.hero.title}{' '}
                  <span style={gradientStyle}>
                    {data.hero.titleHighlight}
                  </span>
                </span>
              );
            }
            // Split title to highlight last word in blue gradient
            const words = data.hero.title.split(' ');
            if (words.length === 1) {
              return <span style={gradientStyle}>{data.hero.title}</span>;
            }
            const firstPart = words.slice(0, -1).join(' ');
            const lastWord = words[words.length - 1];
            return (
              <span>
                <span className="text-tone-inverse">{firstPart} </span>
                <span style={gradientStyle}>{lastWord}</span>
              </span>
            );
          })()}
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
              ref={statsAnim.ref}
              initial={prefersReducedMotion ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
              animate={statsAnim.shouldAnimate ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
              transition={ANIM_TRANSITION}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {data.companyStats
                .filter((stat: CompanyStat) => stat?.enabled !== false)
                .map((stat: CompanyStat, index: number) => (
                <motion.div
                  key={`${stat?.label}-${index}`}
                  initial={prefersReducedMotion ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
                  animate={statsAnim.shouldAnimate ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
                  transition={{ ...ANIM_TRANSITION, delay: prefersReducedMotion ? 0 : index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-tone-inverse mb-2">
                    {stat?.value}
                  </div>
                  <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-2">
                    {stat?.label}
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
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
                ref={storyLeftAnim.ref}
                initial={prefersReducedMotion ? ANIM_STATES.slideLeft.animate : ANIM_STATES.slideLeft.initial}
                animate={storyLeftAnim.shouldAnimate ? ANIM_STATES.slideLeft.animate : ANIM_STATES.slideLeft.initial}
                transition={ANIM_TRANSITION}
              >
                {data.story?.title && (
                  <h2 className={cn(typography.h2, "mb-6")}>{data.story.title}</h2>
                )}
                <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                  {storyParagraphs.map((paragraph: string, index: number) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </motion.div>

              {storyImage && (
                <motion.div
                  ref={storyRightAnim.ref}
                  initial={prefersReducedMotion ? ANIM_STATES.slideRight.animate : ANIM_STATES.slideRight.initial}
                  animate={storyRightAnim.shouldAnimate ? ANIM_STATES.slideRight.animate : ANIM_STATES.slideRight.initial}
                  transition={ANIM_TRANSITION}
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
              ref={timelineHeaderAnim.ref}
              initial={prefersReducedMotion ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
              animate={timelineHeaderAnim.shouldAnimate ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
              transition={ANIM_TRANSITION}
              className="text-center mb-12"
            >
              {data.timeline?.title && (
                <h2 className={cn(typography.h2, "mb-6")}>{data.timeline.title}</h2>
              )}
              {data.timeline?.description && (
                <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                  {data.timeline.description}
                </p>
              )}
            </motion.div>

            <div ref={timelineGridAnim.ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {timelineMilestones
                .filter((milestone: Milestone) => milestone?.enabled !== false)
                .map((milestone: Milestone, index: number) => (
                <motion.div
                  key={`${milestone?.title}-${index}`}
                  initial={prefersReducedMotion ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
                  animate={timelineGridAnim.shouldAnimate ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
                  transition={{ ...ANIM_TRANSITION, delay: prefersReducedMotion ? 0 : Math.min(index * 0.1, 0.3) }}
                >
                  <Card className={cn(styles.featureCard, "h-full group")}>
                    {/* Year Badge */}
                    <div className="text-3xl font-black mb-4" style={{
                      background: 'linear-gradient(to right, #3b82f6, #4f46e5)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>
                      {milestone?.year}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-tone-inverse group-hover:text-blue-600 transition-colors">{milestone?.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{milestone?.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {valuesItems.length > 0 && (
        <section className={styles.sectionLight}>
          <div className={spacing.container}>
            <motion.div
              ref={valuesHeaderAnim.ref}
              initial={prefersReducedMotion ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
              animate={valuesHeaderAnim.shouldAnimate ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
              transition={ANIM_TRANSITION}
              className="text-center mb-12"
            >
              {data.values?.title && (
                <h2 className={cn(typography.h2, "mb-6")}>{data.values.title}</h2>
              )}
              {data.values?.description && (
                <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                  {data.values.description}
                </p>
              )}
            </motion.div>

            <div ref={valuesGridAnim.ref} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {valuesItems
                .filter((value: ValueItem) => value?.enabled !== false)
                .map((value: ValueItem, index: number) => {
                  const Icon = iconMap[value?.iconName || ''] || Award;
                  const gradients = [
                    'from-blue-600 to-indigo-600',
                    'from-indigo-600 to-purple-600',
                    'from-cyan-600 to-blue-600',
                    'from-purple-600 to-pink-600',
                  ];
                  const gradient = gradients[index % gradients.length];
                  return (
                    <motion.div
                      key={`${value?.title}-${index}`}
                      initial={prefersReducedMotion ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
                      animate={valuesGridAnim.shouldAnimate ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
                      transition={{ ...ANIM_TRANSITION, delay: prefersReducedMotion ? 0 : Math.min(index * 0.1, 0.3) }}
                    >
                      <Card className={cn(styles.featureCard, "h-full group")}>
                        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-8 h-8 text-tone-inverse" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-tone-inverse">{value?.title}</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">{value?.description}</p>
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
            <motion.div
              ref={capabilitiesHeaderAnim.ref}
              initial={prefersReducedMotion ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
              animate={capabilitiesHeaderAnim.shouldAnimate ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
              transition={ANIM_TRANSITION}
              className="text-center mb-12"
            >
              <h2 className={cn(typography.h2, "mb-4")}>Capabilities & Certifications</h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                Advanced manufacturing capabilities backed by rigorous quality certifications
              </p>
            </motion.div>

            {/* Capabilities Grid - Full Width */}
            {capabilities.length > 0 && (
              <div ref={capabilitiesGridAnim.ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {capabilities.map((capability: Capability, index: number) => {
                  const gradients = [
                    'from-blue-600 to-indigo-600',
                    'from-indigo-600 to-purple-600',
                    'from-cyan-600 to-blue-600',
                    'from-purple-600 to-pink-600',
                  ];
                  const gradient = gradients[index % gradients.length];
                  return (
                    <motion.div
                      key={`${capability?.title}-${index}`}
                      initial={prefersReducedMotion ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
                      animate={capabilitiesGridAnim.shouldAnimate ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
                      transition={{ ...ANIM_TRANSITION, delay: prefersReducedMotion ? 0 : Math.min(index * 0.1, 0.3) }}
                    >
                      <Card className="p-6 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 hover:shadow-lg h-full group">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <Factory className="w-6 h-6 text-tone-inverse" />
                        </div>
                        <h3 className="text-lg font-bold mb-3 text-slate-900 dark:text-tone-inverse">{capability?.title}</h3>
                        {capability?.description && (
                          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{capability.description}</p>
                        )}
                        <div className="space-y-2">
                          {(capability?.items || []).slice(0, 5).map((item: CapabilityItem, itemIndex: number) => (
                            <div key={`${item?.item}-${itemIndex}`} className="flex items-start text-sm text-slate-600 dark:text-slate-400">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-1.5 flex-shrink-0" />
                              <span>{item?.item}</span>
                            </div>
                          ))}
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Certifications Section */}
            {certifications.length > 0 && (
              <motion.div
                ref={certificationsAnim.ref}
                initial={prefersReducedMotion ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
                animate={certificationsAnim.shouldAnimate ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
                transition={ANIM_TRANSITION}
                className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12"
              >
                <div className="text-center mb-8">
                  {isCertificationsObject(data.certifications) && data.certifications.title && (
                    <h3 className="text-2xl md:text-3xl font-bold text-tone-inverse mb-2">{data.certifications.title}</h3>
                  )}
                  <p className="text-slate-400">Industry-recognized quality standards</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                  {certifications.map((cert: Certification, index: number) => (
                    <motion.div
                      key={`${cert?.certification}-${index}`}
                      initial={prefersReducedMotion ? ANIM_STATES.scaleIn.animate : ANIM_STATES.scaleIn.initial}
                      animate={certificationsAnim.shouldAnimate ? ANIM_STATES.scaleIn.animate : ANIM_STATES.scaleIn.initial}
                      transition={{ ...ANIM_TRANSITION, delay: prefersReducedMotion ? 0 : Math.min(index * 0.05, 0.3) }}
                      className="flex flex-col items-center text-center p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                    >
                      <Shield className="w-8 h-8 text-blue-400 mb-2" />
                      <span className="text-sm font-semibold text-tone-inverse">{cert?.certification}</span>
                    </motion.div>
                  ))}
                </div>

                {isCertificationsObject(data.certifications) && data.certifications.commitmentTitle && (
                  <div className="text-center max-w-2xl mx-auto">
                    <h4 className="text-lg font-bold text-tone-inverse mb-2">{data.certifications.commitmentTitle}</h4>
                    <p className="text-slate-400">{data.certifications.commitmentDescription}</p>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </section>
      )}

      {leadershipMembers.length > 0 && (
        <section className={spacing.section}>
          <div className={spacing.container}>
            <motion.div
              ref={leadershipHeaderAnim.ref}
              initial={prefersReducedMotion ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
              animate={leadershipHeaderAnim.shouldAnimate ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
              transition={ANIM_TRANSITION}
              className="text-center mb-12"
            >
              {data.leadership?.title && (
                <h2 className={cn(typography.h2, "mb-6")}>{data.leadership.title}</h2>
              )}
              {data.leadership?.description && (
                <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                  {data.leadership.description}
                </p>
              )}
            </motion.div>

            <div ref={leadershipGridAnim.ref} className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {leadershipMembers
                .filter((leader: LeadershipMember) => leader?.enabled !== false)
                .map((leader: LeadershipMember, index: number) => {
                  const photoUrl = urlFor(leader?.photo) || leader?.photoUrl || '';
                  return (
                    <motion.div
                      key={`${leader?.name}-${index}`}
                      initial={prefersReducedMotion ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
                      animate={leadershipGridAnim.shouldAnimate ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
                      transition={{ ...ANIM_TRANSITION, delay: prefersReducedMotion ? 0 : Math.min(index * 0.1, 0.3) }}
                    >
                      <Card className="overflow-hidden border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 hover:shadow-xl h-full group">
                        {/* Large Photo Header */}
                        <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
                          {photoUrl ? (
                            <Image
                              src={photoUrl}
                              alt={leader?.photo?.alt || `Photo of ${leader?.name}`}
                              width={128}
                              height={128}
                              className="w-32 h-32 rounded-full object-cover shadow-xl border-4 border-white dark:border-slate-600 group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl border-4 border-white dark:border-slate-600">
                              <Users className="w-16 h-16 text-tone-inverse" />
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-8 text-center">
                          <h3 className="text-2xl font-bold mb-1 text-slate-900 dark:text-tone-inverse">{leader?.name}</h3>
                          <div className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">{leader?.title}</div>
                          {leader?.experience && (
                            <div className="text-sm text-slate-500 dark:text-slate-400 mb-4">{leader.experience}</div>
                          )}
                          {leader?.background && (
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">{leader.background}</p>
                          )}
                          {leader?.focus && (
                            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 text-left">
                              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Focus Area</div>
                              <div className="text-sm text-slate-700 dark:text-slate-300">{leader.focus}</div>
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

      {(data.cta?.title || data.cta?.description || ctaButtons.length > 0) && (
        <section className={spacing.section}>
          <div className={spacing.container}>
            <motion.div
              ref={ctaAnim.ref}
              initial={prefersReducedMotion ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
              animate={ctaAnim.shouldAnimate ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
              transition={ANIM_TRANSITION}
              className="text-center max-w-4xl mx-auto"
            >
              {data.cta?.title && (
                <h2 className={cn(typography.h2, "mb-6")}>{data.cta.title}</h2>
              )}
              {data.cta?.description && (
                <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
                  {data.cta.description}
                </p>
              )}
              {ctaButtons.length > 0 && (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {ctaButtons.map((button: CTAButton, index: number) => (
                    <Button
                      key={`${button.label}-${index}`}
                      size="lg"
                      className={button.variant === 'secondary' ? styles.ctaSecondary : styles.ctaPrimary}
                      variant={button.variant === 'secondary' ? 'outline' : 'default'}
                      asChild
                    >
                      <Link href={button.href!}>
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
