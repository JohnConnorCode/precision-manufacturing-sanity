"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
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
  badges?: string[];
  ctaPrimary?: { text: string; href: string };
  ctaSecondary?: { text: string; href: string };
  ctaTertiary?: { text: string; href: string };
  slides?: Array<{
    image: string;
    alt: string;
    focal: 'center' | 'top' | 'bottom';
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
  // Hooks must be called before early return
  const { scrollY } = useScroll();
  const prefersReducedMotion = usePrefersReducedMotion();

  const textY = useTransform(scrollY, [0, 500], prefersReducedMotion ? [0, 0] : [0, 50]);
  const textOpacity = useTransform(scrollY, [0, 300], prefersReducedMotion ? [1, 1] : [1, 0]);

  // Fallback images - 5 slides with Unsplash images
  const fallbackSlides = [
    {
      src: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=2400&q=95',
      alt: 'Advanced 5-axis CNC machining center',
      focal: 'center' as const
    },
    {
      src: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=2400&q=95',
      alt: 'Precision metrology and inspection',
      focal: 'center' as const
    },
    {
      src: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2400&q=95',
      alt: 'Automated manufacturing systems',
      focal: 'center' as const
    },
    {
      src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=2400&q=95',
      alt: 'Industrial engineering and process development',
      focal: 'center' as const
    },
    {
      src: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=2400&q=95',
      alt: 'Defense and aerospace components manufacturing',
      focal: 'center' as const
    }
  ];

  // Use CMS data or fallback
  const heroSlides = (data?.slides && data.slides.length > 0)
    ? data.slides.map(slide => ({
        src: slide.image,
        alt: slide.alt,
        focal: slide.focal
      }))
    : fallbackSlides;

  // Support three-word structure (new) or legacy single-title (old)
  let word1 = data?.word1 || 'PRECISION';
  let word2 = data?.word2 || 'MANUFACTURING';
  let word3 = data?.word3 || 'SERVICES';

  // Fallback to legacy mainTitle/subTitle if three-word structure not available
  if (!data?.word1 && data?.mainTitle) {
    const words = (data.mainTitle || 'PRECISION MANUFACTURING').split(' ');
    word1 = words[0] || 'PRECISION';
    word2 = words.slice(1).join(' ') || 'MANUFACTURING';
    // word3 stays as is if data.word3 not provided
  }

  const heroFontSize = data?.heroFontSize || 'text-[2rem] sm:text-[2.5rem] md:text-[3.25rem] lg:text-[4rem]';
  const tagline = data?.tagline || 'Innovative Precision Machining & Manufacturing Excellence Since 1995';

  // Handle both string badges and object badges from Sanity, with fallbacks
  const defaultBadges = [
    'Advanced CNC Machining',
    'Precision Metrology',
    'Engineering Excellence',
    '3 Sigma Yield'
  ];
  const badges = (data?.badges && data.badges.length > 0)
    ? (data.badges || []).map((badge: any) =>
        typeof badge === 'string' ? badge : (badge.text || badge.badge || badge.id || '')
      )
    : defaultBadges;

  // Reference site shows ONLY ONE button: "View Capabilities"
  const ctaPrimary = data?.ctaPrimary?.text ? data.ctaPrimary : { text: 'View Capabilities', href: '/services' };
  const ctaSecondary = null; // Hidden - reference site shows only 1 button
  const ctaTertiary = null; // Hidden - reference site shows only 1 button

  // Extract styles from Sanity data
  const titleColor = colorStyleToCSS(data?.titleColor) || 'rgba(255, 255, 255, 0.9)';
  const titleHighlightColor = colorStyleToCSS(data?.titleHighlightColor);
  const descriptionColor = colorStyleToCSS(data?.descriptionColor) || 'rgba(255, 255, 255, 0.95)';

  const badgeTextColor = colorStyleToCSS(data?.badgeStyle?.textColor) || '#ffffff';
  const badgeBgColor = colorStyleToCSS(data?.badgeStyle?.backgroundColor);
  const badgeBorderColor = colorStyleToCSS(data?.badgeStyle?.borderColor) || 'rgba(96, 165, 250, 0.3)';

  const overlayStyle = getOverlayStyles(data?.overlay);
  const primaryButtonStyles = getButtonStyles(data?.buttonStyles?.primaryButton);
  const secondaryButtonStyles = getButtonStyles(data?.buttonStyles?.secondaryButton);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Premium Background Slider */}
      <HeroSliderFixed slides={heroSlides} />

      {/* Overlay if enabled */}
      {overlayStyle && <div style={overlayStyle} />}

      {/* Content Container */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="container relative z-10 px-6 md:px-8"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center">

            {/* Three-Word Hero Title - Sequential Animation */}
            <div className="mb-4">
              {/* Word 1 */}
              {word1 && (
                <motion.span
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: prefersReducedMotion ? 0 : 0.2, duration: prefersReducedMotion ? 0 : 0.6, ease: "easeOut" }}
                  className={`${heroFontSize} font-black tracking-[0.02em] leading-[1.1] block`}
                  style={{
                    color: titleColor,
                    filter: 'drop-shadow(0 2px 8px rgba(37, 99, 235, 0.25))'
                  }}
                >
                  {word1}
                </motion.span>
              )}
              {/* Word 2 */}
              {word2 && (
                <motion.span
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: prefersReducedMotion ? 0 : 0.4, duration: prefersReducedMotion ? 0 : 0.6, ease: "easeOut" }}
                  className={`${heroFontSize} font-black tracking-[0.02em] leading-[1.1] block`}
                  style={{
                    color: titleColor,
                    filter: 'drop-shadow(0 2px 8px rgba(37, 99, 235, 0.25))'
                  }}
                >
                  {word2}
                </motion.span>
              )}
              {/* Word 3 with gradient */}
              {word3 && (
                <motion.span
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: prefersReducedMotion ? 0 : 0.6, duration: prefersReducedMotion ? 0 : 0.6, ease: "easeOut" }}
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
                  {word3}
                </motion.span>
              )}
            </div>

            {/* Tagline */}
            <motion.h1
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.8, duration: prefersReducedMotion ? 0 : 0.8, ease: "easeOut" }}
              className="text-lg sm:text-xl md:text-2xl font-light leading-[1.3] tracking-normal mb-8"
              style={{ color: descriptionColor }}
            >
              {tagline}
            </motion.h1>

            {/* Capabilities - Sequentially Animated Badges */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12 max-w-3xl mx-auto">
              {badges.map((badge, index) => {
                const badgeStyle: React.CSSProperties = {
                  color: badgeTextColor,
                  borderColor: badgeBorderColor,
                };
                if (badgeBgColor) {
                  badgeStyle.backgroundColor = badgeBgColor;
                } else {
                  // Default gradient if no custom bg color
                  badgeStyle.backgroundImage = 'linear-gradient(to right, rgba(37, 99, 235, 0.2), rgba(79, 70, 229, 0.2))';
                }

                return (
                  <motion.span
                    key={badge}
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: prefersReducedMotion ? 0 : 0.8 + (index * 0.1),
                      duration: prefersReducedMotion ? 0 : 0.5,
                      ease: "easeOut"
                    }}
                    className="px-3 md:px-5 py-1.5 md:py-2.5 rounded-full text-xs md:text-sm font-semibold border backdrop-blur-md hover:opacity-80 transition-all duration-300 whitespace-nowrap"
                    style={badgeStyle}
                  >
                    {badge}
                  </motion.span>
                );
              })}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: prefersReducedMotion ? 0 : 1.1, duration: prefersReducedMotion ? 0 : 0.8, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap"
            >
              {ctaPrimary && ctaPrimary.text && (
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <Button
                    size="lg"
                    className="group font-semibold px-10 h-14 text-lg rounded-lg"
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
                    <Link href={ctaPrimary.href}>
                      {ctaPrimary.text}
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </motion.div>
              )}
            </motion.div>

          </div>
        </div>
      </motion.div>

      {/* Smooth Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: prefersReducedMotion ? 0 : 1.9, duration: prefersReducedMotion ? 0 : 0.8, ease: "easeOut" }}
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