"use client";

import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePrefersReducedMotion } from '@/lib/motion';
import { Industry, SectionHeader as SectionHeaderData } from '@/lib/types/cms';

function DynamicIcon({ name, className }: { name?: string; className?: string }) {
  const Icon = name ? (Icons as any)[name] || Icons.Circle : Icons.Circle;
  return <Icon className={className} />;
}

interface IndustriesProps {
  data?: Industry[];
  sectionData?: SectionHeaderData & {
    header?: {
      eyebrow?: string;
      title?: string;
      titleHighlight?: string;
      description?: string;
    };
  };
}

export default function Industries({ data, sectionData }: IndustriesProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const industriesData = (Array.isArray(data) ? data : (data ? [data] : [])).filter(Boolean);
  if (!industriesData || industriesData.length === 0) return null;

  const eyebrow = sectionData?.header?.eyebrow || sectionData?.eyebrow;
  const headerTitle = sectionData?.header?.title;
  const headerTitleHighlight = sectionData?.header?.titleHighlight;
  const heading = headerTitle && headerTitleHighlight
    ? `${headerTitle} ${headerTitleHighlight}`
    : sectionData?.heading;
  const description = sectionData?.header?.description || sectionData?.description;

  return (
    <section className="py-24 md:py-32 bg-slate-50">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          {eyebrow && (
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-[0.2em] mb-4">
              {eyebrow}
            </p>
          )}
          {heading && (
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              {heading.split(' ').map((word, i, arr) => (
                i === arr.length - 1 ? (
                  <span key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                    {word}
                  </span>
                ) : (
                  <span key={i}>{word} </span>
                )
              ))}
            </h2>
          )}
          {description && (
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </motion.div>

        {/* Industries Grid - Dramatic Full-Height Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {industriesData.slice(0, 3).map((industry, index) => {
            const imageUrl = typeof industry.image === 'string'
              ? industry.image
              : (industry.image as any)?.asset?.url || null;

            return (
              <motion.div
                key={industry.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.8,
                  delay: prefersReducedMotion ? 0 : index * 0.15,
                }}
                viewport={{ once: true, margin: "-50px" }}
                className="group"
              >
                <Link href={industry.href || '#'} className="block">
                  <div className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden">
                    {/* Background Image */}
                    {imageUrl && (
                      <Image
                        src={imageUrl}
                        alt={industry.title}
                        fill
                        className="object-cover transition-all duration-700 ease-out group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    )}

                    {/* Dramatic Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500" />

                    {/* Floating Icon */}
                    <motion.div
                      className="absolute top-6 left-6"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl shadow-blue-500/25">
                        <DynamicIcon name={industry.iconName} className="w-7 h-7 text-white" />
                      </div>
                    </motion.div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      {/* Feature Tags */}
                      {industry.features && industry.features.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {industry.features.slice(0, 3).map((feature: any, i: number) => {
                            const featureText = typeof feature === 'string' ? feature : feature.feature;
                            return (
                              <span
                                key={i}
                                className="px-3 py-1 text-xs font-semibold text-white/90 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
                              >
                                {featureText}
                              </span>
                            );
                          })}
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:translate-x-2 transition-transform duration-300">
                        {industry.title}
                      </h3>

                      {/* Description */}
                      <p className="text-slate-300 text-sm md:text-base line-clamp-2 mb-6">
                        {industry.description}
                      </p>

                      {/* CTA */}
                      <div className="flex items-center gap-2 text-blue-400 font-semibold">
                        <span>Learn More</span>
                        <Icons.ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </div>

                    {/* Hover Border Glow */}
                    <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-blue-500/40 transition-colors duration-500 pointer-events-none" />

                    {/* Corner Accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
