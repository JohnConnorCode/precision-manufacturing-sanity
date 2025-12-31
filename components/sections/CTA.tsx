"use client";

import { motion } from 'framer-motion';
import { PremiumButton } from '@/components/ui/premium-button';
import { ArrowRight, FileText, Shield, Award, Activity, Clock, LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePrefersReducedMotion } from '@/lib/motion';
import { portableTextToPlainTextMemoized as portableTextToPlainText } from '@/lib/performance';

interface CTAData {
  title?: string;
  subtitle?: string;
  buttons?: Array<{
    text: string;
    href: string;
    variant: 'default' | 'secondary' | 'primary' | 'outline';
    enabled?: boolean;
  }>;
  badge?: string;
  certifications?: Array<{
    _key?: string;
    icon: string;
    text: string;
    enabled?: boolean;
  }>;
  trustMessage?: string;
  // Style fields from page builder
  theme?: string;
  titleColor?: string;
  subtitleColor?: string;
  buttonStyles?: unknown;
  padding?: string;
}

interface CTAProps {
  data?: CTAData;
}

export default function CTA({ data }: CTAProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (!data?.title || !data?.buttons || data.buttons.length === 0) {
    return null;
  }

  const title = typeof data.title === 'string' ? data.title : String(data.title);
  const rawSubtitle = data.subtitle;
  const subtitleString = portableTextToPlainText(rawSubtitle) || (typeof rawSubtitle === 'string' ? rawSubtitle : String(rawSubtitle || ''));

  const buttons = (Array.isArray(data.buttons) ? data.buttons : []).filter(button => button.enabled !== false);

  const rawBadge = data?.badge || '';
  const badge = typeof rawBadge === 'string' ? rawBadge : String(rawBadge || '');
  const certifications = Array.isArray(data?.certifications) ? data.certifications : [];
  const rawTrustMessage = data?.trustMessage || '';
  const trustMessage = typeof rawTrustMessage === 'string' ? rawTrustMessage : String(rawTrustMessage || '');

  const iconMap: Record<string, LucideIcon> = {
    Clock,
    Shield,
    Award,
    Activity,
  };

  // Split title for styling - keep last 2 words together for "Manufacturing Project"
  const words = title.split(' ');
  const firstPart = words.slice(0, -2).join(' ');
  const lastPart = words.slice(-2).join('\u00A0'); // Non-breaking space

  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      {/* Dramatic Background */}
      <div className="absolute inset-0 bg-slate-950">
        {/* Gradient layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 via-slate-950 to-indigo-950/40" />

        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-blue-600/8 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-indigo-600/8 rounded-full blur-[150px]" />

        {/* Animated scan line */}
        <motion.div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"
          initial={{ top: '0%' }}
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

        {/* Corner accents */}
        <svg className="absolute top-0 left-0 w-48 h-48 text-blue-500/10" viewBox="0 0 100 100">
          <path d="M 0 40 L 0 0 L 40 0" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M 0 60 L 0 0 L 60 0" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </svg>
        <svg className="absolute bottom-0 right-0 w-48 h-48 text-blue-500/10 rotate-180" viewBox="0 0 100 100">
          <path d="M 0 40 L 0 0 L 40 0" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M 0 60 L 0 0 L 60 0" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-4 py-2 mb-8 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm"
            >
              <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">
                {badge}
              </span>
            </motion.div>
          )}

          {/* Title with gradient on last 2 words */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.7, delay: prefersReducedMotion ? 0 : 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-8 leading-tight"
          >
            {firstPart && <span>{firstPart} </span>}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500">
              {lastPart}
            </span>
          </motion.h2>

          {/* Subtitle */}
          {subtitleString && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.2 }}
              viewport={{ once: true }}
              className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto"
            >
              {subtitleString}
            </motion.p>
          )}

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            {buttons.map((button, index) => {
              const mappedVariant: 'default' | 'secondary' =
                button.variant === 'primary' ? 'default'
                : button.variant === 'outline' ? 'secondary'
                : (button.variant as 'default' | 'secondary');

              return (
                <Link key={index} href={button.href}>
                  <PremiumButton size="lg" variant={mappedVariant}>
                    {index === 1 && <FileText className="mr-2 h-5 w-5" />}
                    {button.text}
                    {index === 0 && <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />}
                  </PremiumButton>
                </Link>
              );
            })}
          </motion.div>

          {/* Certification Badges */}
          {certifications.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {certifications.filter((cert: any) => cert.enabled !== false).map((cert, index) => {
                const Icon = iconMap[cert.icon] || Activity;
                const isFirstBadge = index === 0 && cert.icon === 'Clock';

                return (
                  <motion.div
                    key={cert._key || `cert-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.5,
                      delay: prefersReducedMotion ? 0 : 0.4 + index * 0.1
                    }}
                    viewport={{ once: true }}
                    className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-800/50 hover:border-slate-700 transition-colors"
                  >
                    {isFirstBadge ? (
                      <div className="relative">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <motion.div
                          className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full"
                          animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </div>
                    ) : (
                      <Icon className="w-4 h-4 text-blue-400" />
                    )}
                    <span className="text-sm font-medium text-slate-300">{cert.text}</span>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Trust Message */}
          {trustMessage && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: prefersReducedMotion ? 0 : 0.7 }}
              viewport={{ once: true }}
              className="mt-12"
            >
              <p className="text-xs text-slate-500">
                {trustMessage}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
