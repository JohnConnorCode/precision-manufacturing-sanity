 
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import HeroSliderFixed from '@/components/ui/hero-slider-fixed';
import { usePrefersReducedMotion } from '@/lib/motion';
import { colorStyleToCSS, getOverlayStyles, getButtonStyles, ColorStyle } from '@/lib/sanity-styles';

interface HeroData {
  // Three-word structure (new)
  word1?: string;
  word2?: string;
  word3?: string;
  heroFontSize?: string;
  // Legacy single-title structure (backwards compatibility)
  mainTitle?: string;
  subTitle?: string;
  tagline?: string;
  badges?: Array<{ text: string; enabled?: boolean } | string>;
  ctaPrimary?: { text: string; href: string };
  ctaSecondary?: { text: string; href: string };
  ctaTertiary?: { text: string; href: string };
  slides?: Array<{
    image: string | { asset?: { url?: string }; url?: string; alt?: string };
    alt: string;
    focal: 'center' | 'top' | 'bottom';
    enabled?: boolean;
  }>;
  // Style fields from Sanity
  titleColor?: ColorStyle;
  titleHighlightColor?: ColorStyle;
  descriptionColor?: ColorStyle;
  badgeStyle?: {
    textColor?: ColorStyle;
    backgroundColor?: ColorStyle;
    borderColor?: ColorStyle;
  };
  overlay?: {
    enabled?: boolean;
    color?: ColorStyle;
  };
  buttonStyles?: {
    primaryButton?: {
      textColor?: ColorStyle;
      backgroundColor?: ColorStyle;
      borderColor?: ColorStyle;
    };
    secondaryButton?: {
      textColor?: ColorStyle;
      backgroundColor?: ColorStyle;
      borderColor?: ColorStyle;
    };
  };
}

interface HeroProps {
  data?: HeroData;
}

export default function Hero({ data }: HeroProps) {
  // Disable parallax scroll effects to avoid hydration issues
  const prefersReducedMotion = usePrefersReducedMotion();

  // Use static motion values instead of scroll-based transforms
  const textY = 0;
  const textOpacity = 1;

  // Use ONLY Sanity data - no fallbacks
  const heroSlides = (data?.slides && data.slides.length > 0)
    ? data.slides
        .filter(slide => slide.enabled !== false) // Filter out disabled slides
        .map(slide => {
          // Handle both string URLs and Sanity image objects
          const imageUrl = typeof slide.image === 'string'
            ? slide.image
            : slide.image?.asset?.url || slide.image?.url;

          // Get alt text - handle both string and object types
          const imageAlt = typeof slide.image === 'string'
            ? 'Precision manufacturing facility'
            : slide.image?.alt || 'Manufacturing equipment';

          return {
            src: imageUrl || '',
            alt: slide.alt || imageAlt || '',
            focal: slide.focal || 'center'
          };
        })
        .filter((slide): slide is { src: string; alt: string; focal: 'center' | 'top' | 'bottom' } =>
          slide.src !== '' && slide.src.trim() !== ''
        )
    : [];

  const finalSlides = heroSlides;

  // Use ONLY Sanity data - no fallback splitting
  const word1 = data?.word1?.trim() || '';
  const word2 = data?.word2?.trim() || '';
  const word3 = data?.word3?.trim() || '';

  // Hero font size - professional sizes for B2B manufacturing site
  const heroFontSize = data?.heroFontSize || 'text-[2.25rem] sm:text-[2.75rem] md:text-[3.25rem] lg:text-[3.75rem] xl:text-[4.25rem]';
  const tagline = data?.tagline?.trim() || '';

  // Handle both string badges and object badges from Sanity
  const badges = Array.isArray(data?.badges)
    ? (data?.badges as Array<any>)
        .filter((badge: any) => {
          if (typeof badge === 'string') {
            return badge.trim().length > 0;
          }
          return badge?.enabled !== false && Boolean(badge?.text || badge?.badge);
        })
        .map((badge: any) =>
          typeof badge === 'string' ? badge : (badge.text || badge.badge || '')
        )
    : [];

  const hasPrimaryCta = Boolean(data?.ctaPrimary?.text && data?.ctaPrimary?.href);
  const primaryCta = hasPrimaryCta ? {
    text: data?.ctaPrimary?.text?.trim() as string,
    href: data?.ctaPrimary?.href as string,
  } : null;

  // Extract styles from Sanity data
  const titleColor = colorStyleToCSS(data?.titleColor) || 'rgba(255, 255, 255, 0.9)';
  const titleHighlightColor = colorStyleToCSS(data?.titleHighlightColor);
  const descriptionColor = colorStyleToCSS(data?.descriptionColor) || 'rgba(255, 255, 255, 0.95)';

  const badgeTextColor = colorStyleToCSS(data?.badgeStyle?.textColor) || '#ffffff';
  const badgeBgColor = colorStyleToCSS(data?.badgeStyle?.backgroundColor);
  const badgeBorderColor = colorStyleToCSS(data?.badgeStyle?.borderColor) || 'rgba(96, 165, 250, 0.3)';

  const overlayStyle = getOverlayStyles(data?.overlay);
  const primaryButtonStyles = getButtonStyles(data?.buttonStyles?.primaryButton);
  const _secondaryButtonStyles = getButtonStyles(data?.buttonStyles?.secondaryButton);

  return (
    <section data-hero-section="dark" className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-20 lg:-mt-[120px] pt-20 lg:pt-[120px]">
      {/* Premium Background Slider */}
      <HeroSliderFixed slides={finalSlides} />


      {/* Overlay if enabled */}
      {overlayStyle && <div style={overlayStyle} />}

      {/* Content Container - Parallax only applies AFTER initial animations */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="container relative z-10 px-6 md:px-8 -mt-8 lg:mt-0"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center">

            {/* Three-Word Hero Title - Clean Sequential Animation */}
            <div className="mb-4">
              {/* Word 1 */}
              {word1 && (
                <motion.span
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
                  className={`${heroFontSize} font-black tracking-[0.02em] leading-[1.1] block`}
                  style={{
                    color: titleColor,
                    filter: 'drop-shadow(0 2px 8px rgba(37, 99, 235, 0.25))'
                  }}
                >
                  {word1.toUpperCase()}
                </motion.span>
              )}
              {/* Word 2 */}
              {word2 && (
                <motion.span
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25, duration: 0.5, ease: "easeOut" }}
                  className={`${heroFontSize} font-black tracking-[0.02em] leading-[1.1] block`}
                  style={{
                    color: titleColor,
                    filter: 'drop-shadow(0 2px 8px rgba(37, 99, 235, 0.25))'
                  }}
                >
                  {word2.toUpperCase()}
                </motion.span>
              )}
              {/* Word 3 with gradient */}
              {word3 && (
                <motion.span
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
                  className={`${heroFontSize} font-black tracking-[0.02em] leading-[1.1] block`}
                  style={
                    titleHighlightColor
                      ? {
                          color: titleHighlightColor,
                          filter: 'drop-shadow(0 2px 8px rgba(37, 99, 235, 0.25))'
                        }
                      : {
                          background: 'linear-gradient(to right, #3b82f6, #4f46e5)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          filter: 'drop-shadow(0 2px 8px rgba(37, 99, 235, 0.25))'
                        }
                  }
                >
                  {word3.toUpperCase()}
                </motion.span>
              )}
            </div>

            {/* Tagline */}
            <motion.h1
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
              className="text-lg sm:text-xl md:text-2xl font-light leading-[1.3] tracking-normal mb-8"
              style={{ color: descriptionColor }}
            >
              {tagline}
            </motion.h1>

            {/* Capabilities - Clean Sequential Badges */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12 max-w-3xl mx-auto">
              {badges.map((badge, index) => {
                const badgeStyle: React.CSSProperties = {
                  color: badgeTextColor,
                  borderColor: badgeBorderColor,
                };
                if (badgeBgColor) {
                  badgeStyle.backgroundColor = badgeBgColor;
                } else {
                  badgeStyle.backgroundImage = 'linear-gradient(to right, rgba(37, 99, 235, 0.2), rgba(79, 70, 229, 0.2))';
                }

                return (
                  <motion.span
                    key={`${badge}-${index}`}
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.8 + (index * 0.1),
                      duration: 0.5,
                      ease: "easeOut"
                    }}
                    className="px-3 md:px-5 py-1.5 md:py-2.5 rounded-lg text-xs md:text-sm font-semibold border backdrop-blur-md whitespace-nowrap"
                    style={badgeStyle}
                  >
                    {badge}
                  </motion.span>
                );
              })}
            </div>

            {/* CTA Button - Single Clean Animation */}
            {primaryCta && (
              <motion.div
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.0, duration: 0.5, ease: "easeOut" }}
              >
                <Button
                  size="lg"
                  className="group font-semibold px-10 h-14 text-lg rounded-lg transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  style={
                    Object.keys(primaryButtonStyles.style).length > 0
                      ? primaryButtonStyles.style
                      : {
                          backgroundImage: 'linear-gradient(to right, #2563eb, #3b82f6, #4f46e5)',
                          color: '#ffffff',
                          boxShadow: 'rgba(37, 99, 235, 0.25) 0px 0px 20px, rgba(37, 99, 235, 0.15) 0px 8px 16px'
                        }
                  }
                  asChild
                >
                  <Link href={primaryCta.href}>
                    {primaryCta.text}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>
            )}

          </div>
        </div>
      </motion.div>

      {/* Smooth Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.4, duration: 0.5, ease: "easeOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={prefersReducedMotion ? {} : {
            y: [0, 8, 0],
          }}
          transition={prefersReducedMotion ? {} : {
            duration: 2,
            repeat: Infinity,
            ease: [0.33, 1, 0.68, 1]
          }}
          className="text-white/50 hover:text-white/70 transition-colors cursor-pointer"
        >
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}
