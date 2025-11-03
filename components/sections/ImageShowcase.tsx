"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import AnimatedSection from '@/components/ui/animated-section';
import { typography, spacing, colors, borderRadius } from '@/lib/design-system';

// Hardcoded fallback data
const defaultImageShowcaseData = {
  header: {
    eyebrow: 'Manufacturing Excellence',
    title: 'Precision',
    titleHighlight: 'Delivered',
    description: 'From concept to completion, we deliver aerospace-grade components with uncompromising precision'
  },
  showcaseImages: [
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
  ]
};

interface ImageShowcaseProps {
  data?: typeof defaultImageShowcaseData | null;
}

export default function ImageShowcase({ data }: ImageShowcaseProps) {
  // Use CMS data if available, otherwise fall back to hardcoded defaults
  const showcaseData = data || defaultImageShowcaseData;

  return (
    <section className={`relative ${spacing.section} ${colors.bgLight} overflow-hidden`}>
      <div className={`${spacing.containerWide} relative z-10`}>
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
            {showcaseData?.header?.description}
          </p>
        </AnimatedSection>

        {/* Large Feature Images */}
        <div className={`grid grid-cols-1 md:grid-cols-3 ${spacing.grid}`}>
          {(showcaseData?.showcaseImages || []).map((item, index) => (
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
      </div>
    </section>
  );
}