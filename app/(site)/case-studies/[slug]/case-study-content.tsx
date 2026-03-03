'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Quote, Award, Clock, Building2 } from 'lucide-react';
import { PremiumButton } from '@/components/ui/premium-button';
import { useTheme } from '@/lib/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import { getToneTypography } from '@/lib/typography';
import { usePrefersReducedMotion } from '@/lib/motion';
import { useAnimateInView, ANIM_STATES, ANIM_TRANSITION } from '@/lib/use-animate-in-view';

interface CaseStudyData {
  title: string;
  slug: string;
  subtitle?: string;
  client?: string;
  duration?: string;
  challenge?: string;
  solution?: string;
  results?: Array<{
    metric: string;
    value: string;
    description?: string;
  }>;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  technologies?: string[];
  certifications?: string[];
  heroImage?: string;
  heroImageAlt?: string;
  galleryImages?: Array<{
    url: string;
    alt?: string;
    caption?: string;
  }>;
  industry?: {
    title: string;
    slug: string;
    imageUrl?: string;
  };
}

interface RelatedCaseStudy {
  title: string;
  slug: string;
  subtitle?: string;
  heroImage?: string;
  heroImageAlt?: string;
  industry?: {
    title: string;
    slug: string;
  };
}

export default function CaseStudyContent({ data, relatedCaseStudies = [] }: { data: CaseStudyData; relatedCaseStudies?: RelatedCaseStudy[] }) {
  const theme = useTheme();
  const darkTone = getToneTypography('dark');
  const prefersReducedMotion = usePrefersReducedMotion();

  // Animation hooks for each section
  const resultsAnim = useAnimateInView<HTMLDivElement>();
  const challengeAnim = useAnimateInView<HTMLDivElement>();
  const solutionAnim = useAnimateInView<HTMLDivElement>();
  const galleryHeaderAnim = useAnimateInView<HTMLHeadingElement>();
  const galleryGridAnim = useAnimateInView<HTMLDivElement>();
  const testimonialAnim = useAnimateInView<HTMLDivElement>();
  const technologiesAnim = useAnimateInView<HTMLDivElement>();
  const certificationsAnim = useAnimateInView<HTMLDivElement>();
  const relatedAnim = useAnimateInView<HTMLDivElement>();
  const ctaAnim = useAnimateInView<HTMLDivElement>();

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section - negative margin pulls hero behind transparent header */}
      {/* min-h includes header offset so content area stays same size */}
      <section
        data-hero-section="dark"
        className="relative min-h-[calc(70vh+5rem)] lg:min-h-[calc(70vh+120px)] flex items-end bg-slate-950 -mt-20 lg:-mt-[120px] pt-20 lg:pt-[120px]"
      >
        {/* Background Image */}
        {data.heroImage && (
          <div className="absolute inset-0">
            <Image
              src={data.heroImage}
              alt={data.heroImageAlt || data.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30" />
          </div>
        )}

        {/* Content - CSS handles white text automatically via [data-hero-section="dark"] */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 pb-16 md:pb-24 pt-32">
          <div>
            {/* Breadcrumb */}
            <Link
              href="/case-studies"
              className="inline-flex items-center transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Case Studies
            </Link>

            {/* Category Tag */}
            <div className="flex items-center gap-3 mb-6">
              <span
                className="px-4 py-1.5 text-sm font-bold uppercase tracking-wider rounded-full bg-blue-600"
              >
                Case Study
              </span>
              {data.industry && (
                <span className="text-sm">
                  {data.industry.title}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 max-w-4xl uppercase">
              {data.title}
            </h1>

            {data.subtitle && (
              <p className="text-xl md:text-2xl max-w-3xl">
                {data.subtitle}
              </p>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap gap-6 mt-8">
              {data.client && (
                <div className="flex items-center">
                  <Building2 className="w-5 h-5 mr-2 text-blue-400" />
                  <span>{data.client}</span>
                </div>
              )}
              {data.duration && (
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-400" />
                  <span>{data.duration}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Hero sentinel for header detection */}
        <span
          data-hero-sentinel
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px w-full opacity-0"
        />
      </section>

      {/* Results Stats Bar */}
      {data.results && data.results.length > 0 && (
        <section aria-label="Project results" className="bg-gradient-to-r from-slate-900 to-slate-800 py-12 dark-section">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div ref={resultsAnim.ref} className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {data.results.map((result, index) => (
                <motion.div
                  key={result.metric}
                  initial={prefersReducedMotion ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
                  animate={resultsAnim.shouldAnimate ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
                  transition={{ ...ANIM_TRANSITION, delay: prefersReducedMotion ? 0 : Math.min(index * 0.1, 0.3) }}
                  className="text-center"
                >
                  <div
                    className="text-3xl md:text-4xl font-bold mb-2"
                    style={{ color: theme.colors.primary }}
                  >
                    {result.value}
                  </div>
                  <div
                    className={cn(
                      'text-sm font-medium uppercase tracking-wide',
                      darkTone.bodyMuted
                    )}
                  >
                    {result.metric}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Challenge & Solution */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            {/* The Challenge */}
            {data.challenge && (
              <motion.div
                ref={challengeAnim.ref}
                initial={prefersReducedMotion ? ANIM_STATES.slideLeft.animate : ANIM_STATES.slideLeft.initial}
                animate={challengeAnim.shouldAnimate ? ANIM_STATES.slideLeft.animate : ANIM_STATES.slideLeft.initial}
                transition={ANIM_TRANSITION}
              >
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4">
                  The Challenge
                </h2>
                <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
                  {data.challenge}
                </p>
              </motion.div>
            )}

            {/* Our Solution */}
            {data.solution && (
              <motion.div
                ref={solutionAnim.ref}
                initial={prefersReducedMotion ? ANIM_STATES.slideRight.animate : ANIM_STATES.slideRight.initial}
                animate={solutionAnim.shouldAnimate ? ANIM_STATES.slideRight.animate : ANIM_STATES.slideRight.initial}
                transition={{ ...ANIM_TRANSITION, delay: prefersReducedMotion ? 0 : 0.2 }}
              >
                <h2 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: theme.colors.primary }}>
                  Our Solution
                </h2>
                <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
                  {data.solution}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Gallery */}
      {data.galleryImages && data.galleryImages.length > 0 && (
        <section className="py-24 md:py-32 bg-slate-50 dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <motion.h2
              ref={galleryHeaderAnim.ref}
              initial={prefersReducedMotion ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
              animate={galleryHeaderAnim.shouldAnimate ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
              transition={ANIM_TRANSITION}
              className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-tone-inverse mb-12 text-center"
            >
              Project Gallery
            </motion.h2>
            <div ref={galleryGridAnim.ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.galleryImages.map((image, index) => (
                <motion.div
                  key={image.url || `gallery-${index}`}
                  initial={prefersReducedMotion ? ANIM_STATES.scaleIn.animate : ANIM_STATES.scaleIn.initial}
                  animate={galleryGridAnim.shouldAnimate ? ANIM_STATES.scaleIn.animate : ANIM_STATES.scaleIn.initial}
                  transition={{ ...ANIM_TRANSITION, delay: prefersReducedMotion ? 0 : Math.min(index * 0.1, 0.3) }}
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_20px_-5px_rgba(0,0,0,0.1)] group hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] transition-shadow duration-300"
                >
                  <Image
                    src={image.url}
                    alt={image.alt || `Gallery image ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 motion-reduce:transition-none motion-reduce:transform-none"
                  />

                  {/* Gradient border glow on hover */}
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 group-hover:ring-blue-500/20 transition-all duration-300" />

                  {/* Caption overlay - slides up on hover, always visible on mobile */}
                  <div className={cn(
                    'absolute bottom-0 left-0 right-0 p-4',
                    'bg-gradient-to-t from-black/80 via-black/40 to-transparent',
                    image.caption
                      ? 'translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-300'
                      : 'opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                  )}>
                    <p className="text-sm text-white/90">
                      {image.caption || image.alt || `Gallery image ${index + 1}`}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonial */}
      {data.testimonial?.quote && (
        <section className="py-20 md:py-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark-section">
          <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
            <motion.div
              ref={testimonialAnim.ref}
              initial={prefersReducedMotion ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
              animate={testimonialAnim.shouldAnimate ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
              transition={ANIM_TRANSITION}
            >
              <Quote className="w-16 h-16 mx-auto mb-8 opacity-30" style={{ color: theme.colors.primary }} />
              <blockquote
                className={cn(
                  'text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed mb-8',
                  darkTone.body
                )}
              >
                &ldquo;{data.testimonial.quote}&rdquo;
              </blockquote>
              <div className="flex flex-col items-center">
                <p className={cn('text-lg font-semibold', darkTone.heading)}>
                  {data.testimonial.author}
                </p>
                <p className={darkTone.muted}>{data.testimonial.role}</p>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Technologies & Certifications */}
      {((data.technologies && data.technologies.length > 0) || (data.certifications && data.certifications.length > 0)) && (
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Technologies */}
              {data.technologies && data.technologies.length > 0 && (
                <motion.div
                  ref={technologiesAnim.ref}
                  initial={prefersReducedMotion ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
                  animate={technologiesAnim.shouldAnimate ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
                  transition={ANIM_TRANSITION}
                >
                  <h3 className="text-lg font-bold text-slate-900 dark:text-tone-inverse mb-6">Technologies Used</h3>
                  <div className="flex flex-wrap gap-3">
                    {data.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Certifications */}
              {data.certifications && data.certifications.length > 0 && (
                <motion.div
                  ref={certificationsAnim.ref}
                  initial={prefersReducedMotion ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
                  animate={certificationsAnim.shouldAnimate ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
                  transition={{ ...ANIM_TRANSITION, delay: prefersReducedMotion ? 0 : 0.1 }}
                >
                  <h3 className="text-lg font-bold text-slate-900 dark:text-tone-inverse mb-6">Relevant Certifications</h3>
                  <div className="flex flex-wrap gap-3">
                    {data.certifications.map((cert) => (
                      <span
                        key={cert}
                        className="px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2"
                        style={{ backgroundColor: `${theme.colors.primary}15`, color: theme.colors.primary }}
                      >
                        <Award className="w-4 h-4" />
                        {cert}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Related Case Studies */}
      {relatedCaseStudies.length > 0 && (
        <section className="py-24 md:py-32 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <motion.div
              ref={relatedAnim.ref}
              initial={prefersReducedMotion ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
              animate={relatedAnim.shouldAnimate ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
              transition={ANIM_TRANSITION}
              className="text-center mb-12"
            >
              <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-[0.15em] mb-4">
                Explore More
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-tone-inverse">
                More Case Studies
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedCaseStudies.map((study, index) => (
                <motion.div
                  key={study.slug}
                  initial={prefersReducedMotion ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
                  animate={relatedAnim.shouldAnimate ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
                  transition={{ ...ANIM_TRANSITION, delay: prefersReducedMotion ? 0 : Math.min(index * 0.1, 0.3) }}
                >
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="group block h-full"
                  >
                    <div className="h-full bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_20px_-5px_rgba(0,0,0,0.1)] dark:shadow-slate-950/50 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] hover:border-slate-300/80 dark:hover:border-slate-600 transition-all duration-300 overflow-hidden">
                      {study.heroImage && (
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={study.heroImage}
                            alt={study.heroImageAlt || study.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500 motion-reduce:transition-none motion-reduce:transform-none"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          {study.industry && (
                            <div className="absolute bottom-3 left-3">
                              <span className="px-2.5 py-1 text-xs font-medium bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-full text-slate-700 dark:text-slate-200">
                                {study.industry.title}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-tone-inverse mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                          {study.title}
                        </h3>
                        {study.subtitle && (
                          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                            {study.subtitle}
                          </p>
                        )}
                        <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-semibold mt-4">
                          View Case Study
                          <ArrowRight className="h-4 w-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section - Premium Dark */}
      <section className="relative py-24 md:py-32 overflow-hidden dark-section">
        {/* Premium dark background with decorative elements */}
        <div className="absolute inset-0 bg-slate-950">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/50 via-transparent to-indigo-950/50" />

          {/* Glow orbs */}
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
          <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />

          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px]" />

          {/* Top/bottom gradient edges */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

          {/* Corner decorations */}
          <div className="absolute top-8 left-8 w-24 h-24">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-blue-500/40 to-transparent" />
            <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-blue-500/40 to-transparent" />
          </div>
          <div className="absolute bottom-8 right-8 w-24 h-24">
            <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-indigo-500/40 to-transparent" />
            <div className="absolute bottom-0 right-0 h-full w-px bg-gradient-to-t from-indigo-500/40 to-transparent" />
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center relative z-10">
          <motion.div
            ref={ctaAnim.ref}
            initial={prefersReducedMotion ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
            animate={ctaAnim.shouldAnimate ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
            transition={ANIM_TRANSITION}
          >
            <p className="text-sm font-semibold text-blue-400 uppercase tracking-[0.15em] mb-6">
              Start Your Project
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-tone-inverse mb-6 leading-tight">
              Ready to Achieve{' '}
              <span
                style={{
                  background: 'linear-gradient(to right, #3b82f6, #4f46e5)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Similar&nbsp;Results?
              </span>
            </h2>
            <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
              Let&apos;s discuss how our precision machining capabilities can help you achieve similar results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <PremiumButton size="lg" variant="default">
                  Request a Quote
                  <ArrowRight className="ml-2 w-5 h-5" />
                </PremiumButton>
              </Link>
              <Link href="/services">
                <PremiumButton size="lg" variant="secondary">
                  View Our Services
                </PremiumButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
