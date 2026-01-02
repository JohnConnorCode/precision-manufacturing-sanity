'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Quote, Award, Clock, Building2 } from 'lucide-react';
import { useTheme } from '@/lib/contexts/ThemeContext';
import { getGradientStyle } from '@/lib/theme-utils';
import { cn } from '@/lib/utils';
import { getToneTypography } from '@/lib/typography';

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

export default function CaseStudyContent({ data }: { data: CaseStudyData }) {
  const theme = useTheme();
  const darkTone = getToneTypography('dark');

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section
        data-hero-section="dark"
        className="relative min-h-[70vh] flex items-end bg-slate-950"
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
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30" />
          </div>
        )}

        {/* Content - Always white text on dark hero */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 pb-16 md:pb-24 pt-32">
          <div>
            {/* Breadcrumb */}
            <Link
              href="/"
              className="inline-flex items-center transition-colors mb-8 text-white/70 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>

            {/* Category Tag */}
            <div className="flex items-center gap-3 mb-6">
              <span
                className="px-4 py-1.5 text-sm font-bold uppercase tracking-wider rounded-full"
                style={{ backgroundColor: theme.colors.primary, color: 'white' }}
              >
                Case Study
              </span>
              {data.industry && (
                <span className="text-sm text-white/70">
                  {data.industry.title}
                </span>
              )}
            </div>

            {/* Title - Always white */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 max-w-4xl uppercase text-white">
              {data.title}
            </h1>

            {data.subtitle && (
              <p className="text-xl md:text-2xl max-w-3xl text-white/90">
                {data.subtitle}
              </p>
            )}

            {/* Meta Info - White text */}
            <div className="flex flex-wrap gap-6 mt-8">
              {data.client && (
                <div className="flex items-center text-white/80">
                  <Building2 className="w-5 h-5 mr-2" style={{ color: theme.colors.primary }} />
                  <span>{data.client}</span>
                </div>
              )}
              {data.duration && (
                <div className="flex items-center text-white/80">
                  <Clock className="w-5 h-5 mr-2" style={{ color: theme.colors.primary }} />
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
        <section className="bg-gradient-to-r from-slate-900 to-slate-800 py-12 dark-section">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {data.results.map((result, index) => (
                <motion.div
                  key={result.metric}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
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
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
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
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
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
        <section className="py-16 bg-slate-50 dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-tone-inverse mb-10 text-center"
            >
              Project Gallery
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.galleryImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg group"
                >
                  <Image
                    src={image.url}
                    alt={image.alt || `Gallery image ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <p className={cn('text-sm', darkTone.body)}>{image.caption}</p>
                    </div>
                  )}
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
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
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
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
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
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

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-tone-inverse mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
              Let&apos;s discuss how our precision manufacturing capabilities can help you achieve similar results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className={cn(
                  'inline-flex items-center justify-center px-8 py-4 font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl',
                  darkTone.heading
                )}
                style={getGradientStyle(theme.colors)}
              >
                Request a Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-8 py-4 font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-lg hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300"
              >
                View Our Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
