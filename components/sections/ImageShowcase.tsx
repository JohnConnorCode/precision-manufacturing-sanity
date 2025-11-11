"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Award, Shield, Clock, Target, LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';
import SectionHeader from '@/components/ui/section-header';
import { typography, spacing, colors, borderRadius } from '@/lib/design-system';
import { portableTextToPlainTextMemoized as portableTextToPlainText } from '@/lib/performance';
import { useTheme } from '@/lib/contexts/ThemeContext';
import { getGradientStyle, getGradientTextStyle, hexToRgba } from '@/lib/theme-utils';
import { usePrefersReducedMotion } from '@/lib/motion';
import { SECTION_CONFIGS, getInitialState, getAnimateState, getScaleInitialState, getScaleAnimateState, getViewportConfig } from '@/lib/animation-config';
import { ImageShowcaseData, ShowcaseImage, ShowcaseStat } from '@/lib/types/cms';

// Icon mapping for stats
const iconMap: Record<string, LucideIcon> = {
  Award,
  Shield,
  Clock,
  Target,
};

// Fallback data for showcase images
const fallbackShowcaseImages = [
  {
    src: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=1200&q=90',
    title: 'Aerospace Components',
    category: 'Turbine Blades',
    href: '/services/5-axis-machining'
  },
  {
    src: 'https://images.unsplash.com/photo-1609139003551-ee40f5f73ec0?w=1200&q=90',
    title: 'Defense Systems',
    category: 'ITAR Certified',
    href: '/services/adaptive-machining'
  },
  {
    src: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&q=90',
    title: 'Precision Metrology',
    category: 'Quality Control',
    href: '/services/metrology'
  }
];

// Fallback stats (color will be applied from theme)
const fallbackStats = [
  { iconName: 'Award', value: 'AS9100D', label: 'Certified Quality' },
  { iconName: 'Shield', value: 'ITAR', label: 'Registered' },
  { iconName: 'Clock', value: '24/7', label: 'Production' },
  { iconName: 'Target', value: '±0.0001"', label: 'Tolerance' }
];

// Fallback header
const fallbackHeader = {
  eyebrow: 'Manufacturing Excellence',
  title: 'Precision',
  titleHighlight: 'Delivered',
  description: 'From concept to completion, we deliver aerospace-grade components with uncompromising precision'
};

interface ImageShowcaseProps {
  data?: ImageShowcaseData;
}

export default function ImageShowcase({ data }: ImageShowcaseProps) {
  const theme = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();
  // Hooks must be called before early return
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], prefersReducedMotion ? [1, 1, 1, 1] : [0.5, 1, 1, 0.5]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], prefersReducedMotion ? [1, 1, 1, 1] : [0.95, 1, 1, 0.95]);

  // Use CMS data or fallback
  const showcaseData = data || {};
  const header = showcaseData?.header || fallbackHeader;
  const showcaseImages = (showcaseData?.showcaseImages && showcaseData.showcaseImages.length > 0)
    ? showcaseData.showcaseImages
    : fallbackShowcaseImages;
  const stats = (showcaseData?.stats && showcaseData.stats.length > 0)
    ? showcaseData.stats
    : fallbackStats;

  return (
    <section ref={containerRef} className={`relative ${spacing.section} ${colors.bgLight} overflow-hidden`}>
      <motion.div
        style={{ opacity, scale }}
        className={`${spacing.containerWide} relative z-10`}>
        {/* Section Header */}
        <SectionHeader
          eyebrow={header.eyebrow}
          word1={header.title}
          word2={header.titleHighlight}
          description={header.description}
        />

        {/* Large Feature Images */}
        <div className={`grid grid-cols-1 md:grid-cols-3 ${spacing.grid} mb-20`}>
          {showcaseImages.map((item: ShowcaseImage, index: number) => {
            const imageDelay = SECTION_CONFIGS.threeColumnGrid.getDelay(index);
            const viewportConfig = getViewportConfig();

            return (
              <motion.div
                key={item.title}
                initial={getInitialState(prefersReducedMotion)}
                whileInView={getAnimateState(imageDelay, 0.6, prefersReducedMotion)}
                viewport={viewportConfig}
                className="group"
              >
              <Link href={item.href} className="block relative">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className={`relative overflow-hidden ${borderRadius.card} bg-slate-100 shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={index < 3}
                    />

                    {/* Clean gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: theme.colors.primary }}>
                        {item.category}
                      </p>
                      <h3 className="text-2xl font-bold text-white mb-3">
                        {item.title}
                      </h3>
                      <div className="flex items-center text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-sm font-medium">View Details</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-20">
          {stats.map((stat: ShowcaseStat, index: number) => {
            const Icon = iconMap[stat.iconName] || Award;
            const statDelay = SECTION_CONFIGS.fourColumnGrid.getDelay(index);
            const viewportConfig = getViewportConfig();

            return (
              <motion.div
                key={stat.label}
                initial={getScaleInitialState(prefersReducedMotion)}
                whileInView={getScaleAnimateState(statDelay, 0.6, prefersReducedMotion)}
                viewport={viewportConfig}
                className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Icon className="h-8 w-8 mx-auto mb-3" style={{ color: theme.colors.primary }} />
                <div className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        {showcaseData?.cta && (
          <motion.div
            initial={getInitialState(prefersReducedMotion)}
            whileInView={getAnimateState(0.4, 0.8, prefersReducedMotion)}
            viewport={getViewportConfig()}
            className="text-center"
          >
            <div className="inline-flex flex-col items-center p-8 md:p-12 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl shadow-2xl">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {showcaseData.cta.title}
              </h3>
              <p className="text-lg text-slate-300 mb-8 max-w-md">
                {showcaseData.cta.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {(showcaseData.cta.buttons || []).filter(button => button.enabled !== false).map((button, index: number) => (
                <Link
                  key={button.text}
                  href={button.href}
                  className={`inline-flex items-center px-8 py-4 font-semibold rounded-lg transition-all duration-300 ${
                    button.variant === 'primary'
                      ? 'text-white shadow-xl hover:shadow-2xl'
                      : 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm'
                  }`}
                  style={button.variant === 'primary' ? getGradientStyle(theme.colors) : undefined}
                >
                  {button.text}
                  {index === 0 && <ArrowRight className="ml-2 h-5 w-5" />}
                </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}