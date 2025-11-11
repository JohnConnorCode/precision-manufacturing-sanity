"use client";

import { motion } from 'framer-motion';
import { PremiumButton } from '@/components/ui/premium-button';
import { ArrowRight, FileText, Shield, Award, Activity, Clock, LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { colorStyleToCSS, getBackgroundColor, paddingToClass, ColorStyle } from '@/lib/sanity-styles';
import { portableTextToPlainTextMemoized as portableTextToPlainText } from '@/lib/performance';
import { usePrefersReducedMotion } from '@/lib/motion';
import { getInitialState, getAnimateState, getScaleInitialState, getScaleAnimateState, getViewportConfig } from '@/lib/animation-config';
import { colors } from '@/lib/design-system';
import { LinearGridBackground } from '@/lib/background-patterns';

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
    icon: string;
    text: string;
  }>;
  trustMessage?: string;
  // Style fields from Sanity
  theme?: {
    backgroundColor?: ColorStyle;
    backgroundGradient?: {
      enabled?: boolean;
      fromColor?: ColorStyle;
      toColor?: ColorStyle;
      direction?: string;
    };
    textColor?: ColorStyle;
    accentColor?: ColorStyle;
  };
  titleColor?: ColorStyle;
  subtitleColor?: ColorStyle;
  buttonStyles?: {
    primaryButton?: {
      textColor?: ColorStyle;
      backgroundColor?: ColorStyle;
      borderColor?: ColorStyle;
      hoverBackgroundColor?: ColorStyle;
    };
    secondaryButton?: {
      textColor?: ColorStyle;
      backgroundColor?: ColorStyle;
      borderColor?: ColorStyle;
      hoverBackgroundColor?: ColorStyle;
    };
  };
  padding?: string;
}

interface CTAProps {
  data?: CTAData;
}

export default function CTA({ data }: CTAProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const title = data?.title || 'Start Your Precision Manufacturing Project';
  const rawSubtitle = data?.subtitle || 'From prototype to production, we deliver AS9100D-certified precision components with tolerances to ±0.0001" for aerospace, defense, and medical applications.';
  const subtitle = portableTextToPlainText(rawSubtitle) || rawSubtitle;
  const buttons = (data?.buttons || [
    { text: 'Get Quote', href: '/contact', variant: 'default' as const },
    { text: 'Technical Specifications', href: '/compliance/supplier-requirements', variant: 'secondary' as const }
  ]).filter(button => button.enabled !== false);

  // Extract styles from Sanity data
  const backgroundStyle = getBackgroundColor(data?.theme);
  const defaultBgColor = backgroundStyle.backgroundColor || backgroundStyle.backgroundImage ? '' : colors.raw.slate950;
  const paddingClass = paddingToClass(data?.padding) || 'py-24';

  const titleColor = colorStyleToCSS(data?.titleColor) || colors.raw.white;
  const subtitleColor = colorStyleToCSS(data?.subtitleColor) || colors.raw.slate400;

  // Extract badge, certifications, and trust message from Sanity
  const badge = data?.badge || '30 Years of Aerospace Excellence';
  const certifications = data?.certifications || [
    { icon: 'Clock', text: '24/7 Production' },
    { icon: 'Shield', text: 'ITAR Registered' },
    { icon: 'Award', text: 'AS9100D' },
  ];
  const trustMessage = data?.trustMessage || 'Trusted by leading aerospace & defense contractors worldwide';

  // Icon lookup for certification badges
  const iconMap: Record<string, LucideIcon> = {
    Clock,
    Shield,
    Award,
    Activity,
  };

  return (
    <section
      className={`relative ${paddingClass} overflow-hidden`}
      style={{
        ...backgroundStyle,
        ...(defaultBgColor && { backgroundColor: defaultBgColor }),
      }}
    >
      {/* Simplified background - subtle grid + accent */}
      <div className="absolute inset-0">
        {/* Subtle static grid */}
        <LinearGridBackground />

        {/* Subtle accent glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full filter blur-3xl" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={getInitialState(prefersReducedMotion)}
          whileInView={getAnimateState(0, 0.5, prefersReducedMotion)}
          viewport={getViewportConfig()}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Precision indicator */}
          <motion.div
            initial={getScaleInitialState(prefersReducedMotion)}
            whileInView={getScaleAnimateState(0, 0.5, prefersReducedMotion)}
            viewport={getViewportConfig()}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-blue-600/20 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 backdrop-blur-sm"
          >
            <Activity className="w-4 h-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500" />
            <span className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">{badge}</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: titleColor }}>
            {title}
          </h2>

          <p className="text-lg mb-10 max-w-2xl mx-auto" style={{ color: subtitleColor }}>
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {buttons.map((button, index) => {
              const mappedVariant: 'default' | 'secondary' =
                button.variant === 'primary' ? 'default'
                : button.variant === 'outline' ? 'secondary'
                : (button.variant as 'default' | 'secondary')
              return (
              <Link key={index} href={button.href}>
                <PremiumButton size="lg" variant={mappedVariant}>
                  {index === 0 && <ArrowRight className="mr-2 h-5 w-5 transition-transform group-hover:translate-x-1" />}
                  {index === 1 && <FileText className="mr-2 h-5 w-5" />}
                  {button.text}
                  {index === 0 && <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />}
                </PremiumButton>
              </Link>
            )})}
          </div>

          {/* Certification badges with subtle animation */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            {certifications.map((cert, index) => {
              const Icon = iconMap[cert.icon] || Activity;
              const isFirstBadge = index === 0 && cert.icon === 'Clock';

              return (
                <motion.div
                  key={`${cert.icon}-${cert.text}`}
                  initial={getInitialState(prefersReducedMotion)}
                  whileInView={getAnimateState(0.1 + (index * 0.1), 0.5, prefersReducedMotion)}
                  viewport={getViewportConfig()}
                  className="group flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors"
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
                    <Icon className="w-4 h-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500" />
                  )}
                  <span className="text-sm font-medium text-slate-300">{cert.text}</span>
                </motion.div>
              );
            })}
          </div>

          {/* Client trust indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, transition: { delay: prefersReducedMotion ? 0 : 0.5, duration: prefersReducedMotion ? 0 : 1 } }}
            viewport={getViewportConfig()}
            className="mt-12 flex justify-center"
          >
            <div className="text-xs text-slate-500">
              {trustMessage}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
