"use client";

import { motion } from 'framer-motion';
import { PremiumButton } from '@/components/ui/premium-button';
import { ArrowRight, FileText, Shield, Award, Activity, Clock, LucideIcon } from 'lucide-react';
import Link from 'next/link';
import SectionHeader from '@/components/ui/section-header';
import { colorStyleToCSS, getBackgroundColor, paddingToClass, ColorStyle } from '@/lib/sanity-styles';
import { portableTextToPlainTextMemoized as portableTextToPlainText } from '@/lib/performance';
import { usePrefersReducedMotion } from '@/lib/motion';
import { getInitialState, getAnimateState, getScaleInitialState, getScaleAnimateState, getViewportConfig } from '@/lib/animation-config';
import { colors } from '@/lib/design-system';
import { DotGridBackground } from '@/lib/background-patterns';

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
    enabled?: boolean;
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
  // Ensure title and subtitle are plain strings (handle stega encoding from Presentation Tool)
  const rawTitle = data?.title || 'Start Your Precision Manufacturing Project';
  const title = (typeof rawTitle === 'string' ? rawTitle : String(rawTitle || 'Start Your Precision Manufacturing Project'));
  const rawSubtitle = data?.subtitle || 'From prototype to production, we deliver AS9100D-certified precision components with tolerances to ±0.0001" for aerospace, defense, and medical applications.';
  const subtitle = portableTextToPlainText(rawSubtitle) || (typeof rawSubtitle === 'string' ? rawSubtitle : String(rawSubtitle));
  const buttons = (Array.isArray(data?.buttons) ? data.buttons : [
    { text: 'Get Quote', href: '/contact', variant: 'default' as const },
    { text: 'Technical Specifications', href: '/compliance/supplier-requirements', variant: 'secondary' as const }
  ]).filter(button => button.enabled !== false);

  // Extract styles from Sanity data
  const backgroundStyle = getBackgroundColor(data?.theme);
  const defaultBgColor = backgroundStyle.backgroundColor || backgroundStyle.backgroundImage ? '' : colors.raw.slate950;
  const paddingClass = paddingToClass(data?.padding) || 'py-24';

  const titleColor = colorStyleToCSS(data?.titleColor) || colors.raw.white;
  const subtitleColor = colorStyleToCSS(data?.subtitleColor) || colors.raw.slate400;

  // Extract badge, certifications, and trust message from Sanity (ensure strings)
  const rawBadge = data?.badge || '';
  const badge = typeof rawBadge === 'string' ? rawBadge : String(rawBadge || '');
  const certifications = Array.isArray(data?.certifications) ? data.certifications : [];
  const rawTrustMessage = data?.trustMessage || '';
  const trustMessage = typeof rawTrustMessage === 'string' ? rawTrustMessage : String(rawTrustMessage || '');

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
      {/* Animated background pattern */}
      <div className="absolute inset-0">
        {/* Animated dot grid background */}
        <DotGridBackground
          color="rgba(59, 130, 246, 0.5)"
          spacing={40}
          dotPosition={1}
          opacity={0.1}
        />

        {/* Accent glow effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full filter blur-3xl" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={getInitialState(prefersReducedMotion)}
          whileInView={getAnimateState(0, 0.5, prefersReducedMotion)}
          viewport={getViewportConfig()}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Section Header with gradient text */}
          <SectionHeader
            eyebrow={badge}
            heading={title}
            gradientWordPosition="last"
            description={subtitle}
            centered={true}
            className="[&_h2]:text-white [&_p]:text-slate-300 [&_p]:text-lg mb-10"
          />

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {buttons.map((button, index) => {
              const mappedVariant: 'default' | 'secondary' =
                button.variant === 'primary' ? 'default'
                : button.variant === 'outline' ? 'secondary'
                : (button.variant as 'default' | 'secondary')
              return (
              <Link key={index} href={button.href}>
                <PremiumButton size="lg" variant={mappedVariant}>
                  {index === 1 && <FileText className="mr-2 h-5 w-5" />}
                  {button.text}
                  {index === 0 && <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />}
                </PremiumButton>
              </Link>
            )})}
          </div>

          {/* Certification badges with subtle animation */}
          {certifications.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
              {certifications.filter((cert: any) => cert.enabled !== false).map((cert, index) => {
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
          )}

          {/* Client trust indicator */}
          {trustMessage && (
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
          )}
        </motion.div>
      </div>
    </section>
  );
}
