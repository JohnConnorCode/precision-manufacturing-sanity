"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import HeroSliderFixed from '@/components/ui/hero-slider-fixed';
import { usePrefersReducedMotion, getMotionVariants } from '@/lib/motion';
import { colorStyleToCSS, getOverlayStyles, getButtonStyles, ColorStyle } from '@/lib/sanity-styles';

interface HeroData {
  mainTitle?: string;
  subTitle?: string;
  tagline?: string;
  badges?: string[];
  ctaPrimary?: { text: string; href: string };
  ctaSecondary?: { text: string; href: string };
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
  // Don't render if no data from CMS or no slides (Hero requires slides for background)
  if (!data || !data.tagline || !data.slides || data.slides.length === 0) {
    return null;
  }

  const { scrollY } = useScroll();
  const prefersReducedMotion = usePrefersReducedMotion();

  const textY = useTransform(scrollY, [0, 500], prefersReducedMotion ? [0, 0] : [0, 50]);
  const textOpacity = useTransform(scrollY, [0, 300], prefersReducedMotion ? [1, 1] : [1, 0]);

  // Use CMS data only
  const heroSlides = data.slides.map(slide => ({
    src: slide.image,
    alt: slide.alt,
    focal: slide.focal
  }));

  const mainTitle = data.mainTitle;
  const subTitle = data.subTitle;
  const tagline = data.tagline;
  // Handle both string badges and object badges from Sanity
  const badges = (data.badges || []).map((badge: any) =>
    typeof badge === 'string' ? badge : badge.text || badge.id || badge
  );
  const ctaPrimary = data.ctaPrimary || { text: 'Get Quote', href: '/contact?interest=quote' };
  const ctaSecondary = data.ctaSecondary || { text: 'View Capabilities', href: '/services' };

  // Extract styles from Sanity data
  const titleColor = colorStyleToCSS(data.titleColor) || 'rgba(255, 255, 255, 0.9)';
  const titleHighlightColor = colorStyleToCSS(data.titleHighlightColor) || '#60a5fa'; // blue-400
  const descriptionColor = colorStyleToCSS(data.descriptionColor) || 'rgba(255, 255, 255, 0.95)';

  const badgeTextColor = colorStyleToCSS(data.badgeStyle?.textColor) || '#ffffff';
  const badgeBgColor = colorStyleToCSS(data.badgeStyle?.backgroundColor);
  const badgeBorderColor = colorStyleToCSS(data.badgeStyle?.borderColor) || 'rgba(96, 165, 250, 0.3)';

  const overlayStyle = getOverlayStyles(data.overlay);
  const primaryButtonStyles = getButtonStyles(data.buttonStyles?.primaryButton);
  const secondaryButtonStyles = getButtonStyles(data.buttonStyles?.secondaryButton);

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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center"
          >

            {/* Main Title & Subtitle */}
            {mainTitle && (
              <motion.div
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: prefersReducedMotion ? 0 : 0.2, duration: prefersReducedMotion ? 0 : 0.6 }}
                className="mb-4"
              >
                <div
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider"
                  style={{ color: titleColor }}
                >
                  {mainTitle}
                </div>
                {subTitle && (
                  <div
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider mt-2"
                    style={{ color: titleHighlightColor }}
                  >
                    {subTitle}
                  </div>
                )}
              </motion.div>
            )}

            {/* Tagline */}
            <motion.h1
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.4, duration: prefersReducedMotion ? 0 : 0.8 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.3] tracking-normal mb-8"
              style={{ color: descriptionColor }}
            >
              {tagline}
            </motion.h1>

            {/* Capabilities - Sharp Edge Badges */}
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.7, duration: prefersReducedMotion ? 0 : 0.8 }}
              className="flex flex-wrap justify-center gap-3 mb-12 max-w-3xl mx-auto"
            >
              {badges.map((badge) => {
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
                  <span
                    key={badge}
                    className="px-5 py-2.5 rounded-sm text-sm font-semibold border backdrop-blur-md hover:opacity-80 transition-all duration-300"
                    style={badgeStyle}
                  >
                    {badge}
                  </span>
                );
              })}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: prefersReducedMotion ? 0 : 1.2, duration: prefersReducedMotion ? 0 : 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                size="lg"
                className="group font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 px-10 h-14 text-lg rounded-md"
                style={
                  Object.keys(primaryButtonStyles.style).length > 0
                    ? primaryButtonStyles.style
                    : {
                        backgroundImage: 'linear-gradient(to right, #2563eb, #4f46e5)',
                        color: '#ffffff',
                      }
                }
                asChild
              >
                <Link href={ctaPrimary.href}>
                  {ctaPrimary.text}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group backdrop-blur-sm font-semibold transition-all duration-300 px-10 h-14 text-lg rounded-md"
                style={
                  Object.keys(secondaryButtonStyles.style).length > 0
                    ? secondaryButtonStyles.style
                    : {
                        borderWidth: '2px',
                        borderColor: 'rgba(255, 255, 255, 0.8)',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        color: '#ffffff',
                      }
                }
                asChild
              >
                <Link href={ctaSecondary.href}>
                  {ctaSecondary.text}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>

          </motion.div>
        </div>
      </motion.div>

      {/* Smooth Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: prefersReducedMotion ? 0 : 2.5, duration: prefersReducedMotion ? 0 : 1, ease: [0.33, 1, 0.68, 1] }}
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