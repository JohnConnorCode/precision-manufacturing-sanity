'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import HeroSection from '@/components/ui/hero-section';
import { ArrowRight, Users, Briefcase, Award, Heart, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { typography, spacing, styles, cn } from '@/lib/design-system';
import { getHeroImageUrl } from '@/lib/hero-images';
import { usePrefersReducedMotion } from '@/lib/motion';
import { useAnimateInView, ANIM_STATES, ANIM_TRANSITION } from '@/lib/use-animate-in-view';

const urlFor = getHeroImageUrl;

// Icon mapping
const iconMap: Record<string, any> = {
  Users,
  Briefcase,
  Award,
  Heart,
  CheckCircle,
};

interface CareersPageClientProps {
  data?: any | null;
  jobPostings?: any[];
}

export default function CareersPageClient({ data, jobPostings = [] }: CareersPageClientProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  // Animation hooks for each section
  const whyWorkLeftAnim = useAnimateInView<HTMLDivElement>();
  const whyWorkRightAnim = useAnimateInView<HTMLDivElement>();
  const benefitsHeaderAnim = useAnimateInView<HTMLDivElement>();
  const benefitsGridAnim = useAnimateInView<HTMLDivElement>();
  const valuesHeaderAnim = useAnimateInView<HTMLDivElement>();
  const valuesGridAnim = useAnimateInView<HTMLDivElement>();
  const opportunitiesHeaderAnim = useAnimateInView<HTMLDivElement>();
  const opportunitiesGridAnim = useAnimateInView<HTMLDivElement>();
  const ctaAnim = useAnimateInView<HTMLDivElement>();

  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        backgroundImage={urlFor(data?.hero?.backgroundImage) || (data as any)?.hero?.backgroundImageUrl}
        imageAlt={data?.hero?.imageAlt || data?.hero?.backgroundImage?.alt}
        title={(() => {
          // Using inline styles for WebKit compatibility (Tailwind text-transparent doesn't work)
          const gradientStyle = {
            background: 'linear-gradient(to right, #3b82f6, #4f46e5)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          } as React.CSSProperties;

          if (data?.hero?.titleHighlight) {
            return (
              <span className="text-inherit">
                {data?.hero?.title}{' '}
                <span style={gradientStyle}>{data?.hero?.titleHighlight}</span>
              </span>
            );
          }
          // Split title to highlight last word in blue gradient
          const title = data?.hero?.title || '';
          const words = title.split(' ');
          if (words.length <= 1) {
            return <span style={gradientStyle}>{title}</span>;
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
        description={data?.hero?.description}
        buttons={(data?.hero?.buttons || [])
          .filter((btn: any) => btn?.enabled !== false)
          .map((btn: any) => ({
            label: btn.label,
            href: btn.href,
            variant: btn.variant as 'primary' | 'secondary'
          }))}
        height="large"
        alignment="center"
      />

      {/* About Working Here */}
      <section className={spacing.section}>
        <div className={spacing.container}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              ref={whyWorkLeftAnim.ref}
              initial={prefersReducedMotion ? ANIM_STATES.slideLeft.animate : ANIM_STATES.slideLeft.initial}
              animate={whyWorkLeftAnim.shouldAnimate ? ANIM_STATES.slideLeft.animate : ANIM_STATES.slideLeft.initial}
              transition={ANIM_TRANSITION}
            >
              <h2 className={cn(typography.h2, "mb-6")}>{data?.whyWorkHere?.heading || 'Why Work at IIS?'}</h2>
              <p className={cn(typography.lead, "mb-6")}>
                {data?.whyWorkHere?.paragraph1 || 'Join a team committed to excellence in precision manufacturing.'}
              </p>
              <p className={cn(typography.body, "text-slate-600 dark:text-slate-300 mb-8")}>
                {data?.whyWorkHere?.paragraph2 || 'We offer competitive compensation and comprehensive benefits.'}
              </p>
              <p className={cn(typography.body, "text-slate-600 dark:text-slate-300")}>
                {data?.whyWorkHere?.paragraph3 || 'Grow your career with ongoing training and development opportunities.'}
              </p>
            </motion.div>

            <motion.div
              ref={whyWorkRightAnim.ref}
              initial={prefersReducedMotion ? ANIM_STATES.slideRight.animate : ANIM_STATES.slideRight.initial}
              animate={whyWorkRightAnim.shouldAnimate ? ANIM_STATES.slideRight.animate : ANIM_STATES.slideRight.initial}
              transition={ANIM_TRANSITION}
              className="relative"
            >
              {(() => {
                const imageUrl = urlFor(data?.whyWorkHere?.image) || (data as any)?.whyWorkHere?.imageUrl;
                if (!imageUrl) return null;
                return (
                  <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src={imageUrl}
                      alt={data?.whyWorkHere?.imageAlt || 'Team collaboration'}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      priority={false}
                    />
                  </div>
                );
              })()}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={styles.sectionLight}>
        <div className={spacing.container}>
          <motion.div
            ref={benefitsHeaderAnim.ref}
            initial={prefersReducedMotion ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
            animate={benefitsHeaderAnim.shouldAnimate ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
            transition={ANIM_TRANSITION}
            className="text-center mb-16"
          >
            <h2 className={cn(typography.h2, "mb-6")}>{data?.benefits?.title || 'Comprehensive Benefits Package'}</h2>
            <p className={cn(typography.lead, "max-w-3xl mx-auto")}>
              {data?.benefits?.description || 'We take care of our team members with industry-leading benefits and perks.'}
            </p>
          </motion.div>

          <div ref={benefitsGridAnim.ref} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(data?.benefits?.items || [])
              .filter((benefit: any) => benefit?.enabled !== false)
              .map((benefit: any, index: number) => {
              const Icon = iconMap[benefit.iconName] || Users;
              return (
                <motion.div
                  key={benefit.title}
                  initial={prefersReducedMotion ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
                  animate={benefitsGridAnim.shouldAnimate ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
                  transition={{ ...ANIM_TRANSITION, delay: prefersReducedMotion ? 0 : Math.min(index * 0.1, 0.3) }}
                >
                  <Card className={cn(styles.featureCard, "h-full")}>
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600/10">
                          <Icon className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className={cn(typography.h4, "mb-2")}>{benefit.title}</h3>
                        <p className={cn(typography.body, "text-slate-600 dark:text-slate-300")}>{benefit.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className={spacing.section}>
        <div className={spacing.container}>
          <motion.div
            ref={valuesHeaderAnim.ref}
            initial={prefersReducedMotion ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
            animate={valuesHeaderAnim.shouldAnimate ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
            transition={ANIM_TRANSITION}
            className="text-center mb-16"
          >
            <h2 className={cn(typography.h2, "mb-6")}>{data?.values?.title || 'Our Values'}</h2>
            <p className={cn(typography.lead, "max-w-3xl mx-auto")}>
              {data?.values?.description || 'The principles that guide everything we do.'}
            </p>
          </motion.div>

          <div ref={valuesGridAnim.ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(data?.values?.items || [])
              .filter((value: any) => value?.enabled !== false)
              .map((value: any, index: number) => (
              <motion.div
                key={value.title}
                initial={prefersReducedMotion ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
                animate={valuesGridAnim.shouldAnimate ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
                transition={{ ...ANIM_TRANSITION, delay: prefersReducedMotion ? 0 : Math.min(index * 0.1, 0.3) }}
              >
                <Card className={cn(styles.featureCard)}>
                  <h3 className={cn(typography.h4, "mb-3")}>{value.title}</h3>
                  <p className={cn(typography.body, "text-slate-600 dark:text-slate-300")}>{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Opportunities */}
      <section id="opportunities" className={styles.sectionLight}>
        <div className={spacing.container}>
          <motion.div
            ref={opportunitiesHeaderAnim.ref}
            initial={prefersReducedMotion ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
            animate={opportunitiesHeaderAnim.shouldAnimate ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
            transition={ANIM_TRANSITION}
            className="text-center mb-16"
          >
            <h2 className={cn(typography.h2, "mb-6")}>{data?.opportunities?.title || 'Current Opportunities'}</h2>
            <p className={cn(typography.lead, "max-w-3xl mx-auto")}>
              {data?.opportunities?.description || 'Explore open positions and join our team.'}
            </p>
          </motion.div>

          {jobPostings.length > 0 ? (
            <div ref={opportunitiesGridAnim.ref} className="space-y-6">
              {jobPostings.map((position: any, index: number) => (
                <motion.div
                  key={position._id}
                  initial={prefersReducedMotion ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
                  animate={opportunitiesGridAnim.shouldAnimate ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
                  transition={{ ...ANIM_TRANSITION, delay: prefersReducedMotion ? 0 : Math.min(index * 0.1, 0.3) }}
                >
                  <Link href={`/careers/${position.slug?.current || position.slug}`} className="block">
                    <Card className={cn(styles.featureCard, "group hover:shadow-xl transition-shadow cursor-pointer")}>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className={cn(typography.h4, "mb-0 group-hover:text-blue-600 transition-colors")}>{position.title}</h3>
                            {position.featured && (
                              <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full border border-amber-200">
                                Featured
                              </span>
                            )}
                          </div>
                          {position.department && (
                            <p className={cn(typography.small, "text-slate-500 mb-3")}>
                              {position.department}
                            </p>
                          )}
                          <p className={cn(typography.body, "text-slate-600 dark:text-slate-300 mb-3")}>
                            {position.shortDescription}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
                              {position.employmentType}
                            </span>
                            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium rounded-full">
                              {position.location}
                            </span>
                            {position.salaryRange && (
                              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 text-xs font-medium rounded-full">
                                {position.salaryRange}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <div className="px-6 py-3 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-tone-inverse rounded-lg font-semibold group-hover:from-blue-500 group-hover:to-indigo-500 transition-all inline-flex items-center">
                            View Details <ArrowRight className="ml-2 h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <p className={cn(typography.lead, "text-slate-600 dark:text-slate-300 mb-4")}>
                No open positions at this time.
              </p>
              <p className={cn(typography.body, "text-slate-500")}>
                Check back soon or contact us to express your interest in future opportunities.
              </p>
            </Card>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className={spacing.section}>
        <div className={spacing.container}>
          <motion.div
            ref={ctaAnim.ref}
            initial={prefersReducedMotion ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
            animate={ctaAnim.shouldAnimate ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
            transition={ANIM_TRANSITION}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className={cn(typography.h2, "mb-6")}>{data?.cta?.title || 'Ready to Join Us?'}</h2>
            <p className={cn(typography.lead, "mb-8")}>
              {data?.cta?.description || 'Take the next step in your career. We look forward to hearing from you.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {((data?.cta?.buttons && data.cta.buttons.length > 0) ? data.cta.buttons : [{ label: 'View Openings', href: '#opportunities', variant: 'primary' }])
                .filter((button: any) => button?.enabled !== false)
                .map((button: any, index: number) => (
                <Button
                  key={index}
                  size="lg"
                  className={button.variant === 'primary' ? styles.ctaPrimary : styles.ctaSecondary}
                  variant={button.variant === 'outline' ? 'outline' : 'default'}
                  asChild
                >
                  <Link href={button.href || '/contact'}>
                    {button.label || 'Learn More'} {index === 0 && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Link>
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
