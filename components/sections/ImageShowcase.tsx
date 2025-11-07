"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Award, Shield, Clock, Target } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';
import AnimatedSection from '@/components/ui/animated-section';
import { typography, spacing, colors, borderRadius } from '@/lib/design-system';
import { portableTextToPlainTextMemoized as portableTextToPlainText } from '@/lib/performance';

// Icon mapping for stats
const iconMap: Record<string, any> = {
  Award,
  Shield,
  Clock,
  Target,
};

interface ImageShowcaseProps {
  data?: any;
}

export default function ImageShowcase({ data }: ImageShowcaseProps) {
  // Hooks must be called before early return
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);

  // Use CMS data only
  const showcaseData = data;

  // Don't render if no data from CMS
  if (!showcaseData || !showcaseData.header || !showcaseData.showcaseImages) {
    return null;
  }

  return (
    <section ref={containerRef} className={`relative ${spacing.section} ${colors.bgLight} overflow-hidden`}>
      <motion.div
        style={{ opacity, scale }}
        className={`${spacing.containerWide} relative z-10`}>
        {/* Section Header */}
        <AnimatedSection className={`text-center ${spacing.headingBottom}`}>
          <p className={`${typography.eyebrow} ${colors.textMedium} mb-4`}>
            {showcaseData?.header?.eyebrow}
          </p>
          <h2 className={`${typography.sectionHeading} mb-6`}>
            <span className={colors.textDark}>{showcaseData?.header?.title}</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> {showcaseData?.header?.titleHighlight}</span>
          </h2>
          <p className={`${typography.descriptionMuted} max-w-3xl mx-auto`}>
            {portableTextToPlainText(showcaseData?.header?.description) || showcaseData?.header?.description}
          </p>
        </AnimatedSection>

        {/* Large Feature Images */}
        <div className={`grid grid-cols-1 md:grid-cols-3 ${spacing.grid}`}>
          {(showcaseData?.showcaseImages || []).map((item: any, index: number) => (
            <AnimatedSection
              key={item.title}
              delay={index * 0.1}
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
                      <p className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-2">
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
            </AnimatedSection>
          ))}
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-20"
        >
          {(showcaseData.stats || []).map((stat: any, index: number) => {
            const Icon = iconMap[stat.iconName] || Award;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.3 + index * 0.1,
                  duration: 0.6,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Icon className={`h-8 w-8 ${stat.color} mx-auto mb-3`} />
                <div className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Call to Action */}
        {showcaseData.cta && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
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
                {(showcaseData.cta.buttons || []).filter((button: any) => button.enabled !== false).map((button: any, index: number) => (
                <Link
                  key={button.text}
                  href={button.href}
                  className={`inline-flex items-center px-8 py-4 font-semibold rounded-lg transition-all duration-300 ${
                    button.variant === 'primary'
                      ? 'bg-blue-600 hover:bg-indigo-600 text-white shadow-xl hover:shadow-2xl'
                      : 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm'
                  }`}
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