"use client";

import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { usePrefersReducedMotion } from '@/lib/motion';
import { DURATIONS, STAGGER, EASING, getViewportConfig } from '@/lib/animation-config';

function DynamicIcon({ name, className }: { name: string; className?: string }) {
  // Get the icon from lucide-react, fallback to Circle
  const iconExport = name ? (Icons as Record<string, unknown>)[name] : null;
  const Icon = (typeof iconExport === 'function' ? iconExport : Icons.Circle) as React.ComponentType<{ className?: string }>;
  return <Icon className={className} />;
}

interface Benefit {
  iconName?: string;
  title: string;
  description: string;
  enabled?: boolean;
}

interface Certification {
  _key?: string;
  label: string;
  iconName?: string;
  enabled?: boolean;
}

interface OperationalExcellenceData {
  heading?: string;
  description?: string;
  benefits?: Benefit[];
  certifications?: Certification[];
}

interface OperationalExcellenceProps {
  data?: OperationalExcellenceData;
}

export default function OperationalExcellence({ data }: OperationalExcellenceProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (!data?.benefits || data.benefits.length === 0) {
    return null;
  }

  const heading = data?.heading;
  const description = data?.description;
  const benefits = data.benefits.filter((b: Benefit) => b.enabled !== false);

  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      {/* Dramatic Dark Background with Gradient */}
      <div className="absolute inset-0 bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-slate-950 to-indigo-950/30" />
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : DURATIONS.slower, ease: EASING }}
          viewport={getViewportConfig()}
          className="text-center mb-20"
        >
          {heading && (
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-tone-inverse mb-6">
              {heading.split(' ').map((word, i, arr) => (
                i === arr.length - 1 ? (
                  <span key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                    {word}
                  </span>
                ) : (
                  <span key={i}>{word} </span>
                )
              ))}
            </h2>
          )}
          {description && (
            <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </motion.div>

        {/* Benefits - Horizontal Cards with Dramatic Design */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0 : DURATIONS.slower,
                delay: prefersReducedMotion ? 0 : index * STAGGER.cards,
                ease: EASING,
              }}
              viewport={{ once: true, margin: "-50px" }}
              className="group"
            >
              <div className="relative h-full p-8 rounded-3xl bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-slate-800/50 backdrop-blur-sm hover:border-blue-500/30 transition-all duration-500">
                {/* Glow Effect on Hover */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Icon with Gradient Background */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl shadow-blue-500/20 group-hover:shadow-blue-500/40 group-hover:scale-105 transition-all duration-300">
                    <DynamicIcon name={benefit.iconName || 'Circle'} className="w-8 h-8 text-tone-inverse" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="relative text-xl md:text-2xl font-bold text-tone-inverse mb-4 group-hover:text-blue-400 transition-colors duration-300">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="relative text-slate-400 leading-relaxed">
                  {benefit.description}
                </p>

                {/* Decorative Corner Line */}
                <div className="absolute top-0 right-0 w-20 h-px bg-gradient-to-l from-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 right-0 w-px h-20 bg-gradient-to-b from-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges / Certifications Row - CMS Controlled */}
        {data?.certifications && data.certifications.filter(c => c?.enabled !== false).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-20 pt-12 border-t border-slate-800"
          >
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              {data.certifications
                .filter(cert => cert?.enabled !== false && cert?.label)
                .map((cert, i) => (
                  <div key={cert._key || i} className="flex items-center gap-3 text-slate-500 hover:text-blue-400 transition-colors duration-300">
                    <DynamicIcon name={cert.iconName || 'Shield'} className="w-5 h-5" />
                    <span className="text-sm font-semibold uppercase tracking-wider">{cert.label}</span>
                  </div>
                ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export { OperationalExcellence };
