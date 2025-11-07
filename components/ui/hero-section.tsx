'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown, LucideIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { colorStyleToCSS, getOverlayStyles, ColorStyle } from '@/lib/sanity-styles';

interface HeroButton {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary';
  icon?: LucideIcon;
}

interface HeroSectionProps {
  // Image Configuration
  backgroundImage: string;
  imageAlt: string;

  // Content
  badge?: {
    text: string;
    icon?: LucideIcon;
  };
  title: string | ReactNode;
  subtitle?: string | ReactNode;
  description?: string | ReactNode;

  // Buttons
  buttons?: HeroButton[];

  // Layout Options
  height?: 'full' | 'large' | 'medium';
  alignment?: 'left' | 'center' | 'right';
  showScrollIndicator?: boolean;

  // Typography overrides (from existing schema)
  titleSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
  descriptionSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';

  // Style props from Sanity
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

  // Additional classes
  className?: string;
}

export default function HeroSection({
  backgroundImage,
  imageAlt,
  badge,
  title,
  subtitle,
  description,
  buttons = [],
  height = 'large',
  alignment = 'center',
  showScrollIndicator = false,
  titleSize,
  descriptionSize,
  titleColor,
  titleHighlightColor,
  descriptionColor,
  badgeStyle,
  overlay,
  buttonStyles,
  className = ''
}: HeroSectionProps) {
  // Hooks must be called unconditionally
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 1000], [0, -200]);
  const imageScale = useTransform(scrollY, [0, 1000], [1, 1.2]);
  const contentY = useTransform(scrollY, [0, 500], [0, 50]);
  const contentOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  const LEGACY_PARITY = process.env.NEXT_PUBLIC_PARITY_MODE === 'legacy'

  const heightClasses = {
    full: 'min-h-screen',
    large: 'min-h-[85vh]',
    medium: 'min-h-[70vh]'
  };

  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end'
  };

  const titleSizeClasses: Record<string, string> = {
    xs: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl',
    sm: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl',
    base: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl',
    lg: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl',
    xl: 'text-5xl sm:text-6xl md:text-7xl',
    '2xl': 'text-6xl sm:text-7xl',
    '3xl': 'text-7xl',
  };
  const descSizeClasses: Record<string, string> = {
    xs: 'text-sm',
    sm: 'text-sm md:text-base',
    base: 'text-base md:text-lg',
    lg: 'text-lg md:text-xl',
    xl: 'text-xl',
  };

  // Extract colors from Sanity style props
  const defaultTitleColor = colorStyleToCSS(titleColor) || '#ffffff';
  const defaultSubtitleColor = colorStyleToCSS(titleHighlightColor) || 'rgba(255, 255, 255, 0.9)';
  const defaultDescColor = colorStyleToCSS(descriptionColor) || 'rgba(255, 255, 255, 0.8)';

  const badgeTextColor = colorStyleToCSS(badgeStyle?.textColor) || '#cbd5e1'; // slate-300
  const badgeBgColor = colorStyleToCSS(badgeStyle?.backgroundColor) || 'rgba(30, 41, 59, 0.5)'; // slate-800/50
  const badgeBorderColor = colorStyleToCSS(badgeStyle?.borderColor) || 'rgba(51, 65, 85, 0.5)'; // slate-700/50

  const primaryBtnTextColor = colorStyleToCSS(buttonStyles?.primaryButton?.textColor) || '#ffffff';
  const primaryBtnBgColor = colorStyleToCSS(buttonStyles?.primaryButton?.backgroundColor) || '#2563eb'; // blue-600
  const primaryBtnBorderColor = colorStyleToCSS(buttonStyles?.primaryButton?.borderColor);

  const secondaryBtnTextColor = colorStyleToCSS(buttonStyles?.secondaryButton?.textColor) || '#ffffff';
  const secondaryBtnBgColor = colorStyleToCSS(buttonStyles?.secondaryButton?.backgroundColor) || 'rgba(255, 255, 255, 0.05)';
  const secondaryBtnBorderColor = colorStyleToCSS(buttonStyles?.secondaryButton?.borderColor) || 'rgba(255, 255, 255, 0.2)';

  const overlayStyle = getOverlayStyles(overlay);

  const BadgeIcon = badge?.icon;

  return (
    <section className={cn(
      'relative flex items-center overflow-hidden',
      heightClasses[height],
      className
    )}>
      {/* Parallax Background Image */}
      <motion.div
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
        style={LEGACY_PARITY ? undefined : { y: imageY as any, scale: imageScale as any }}
      >
        <Image
          src={backgroundImage}
          alt={imageAlt}
          fill
          className="object-cover object-center animate-fade-in"
          priority={true}
          loading="eager"
          quality={95}
          sizes="100vw"
        />

        {/* Gradient Overlays - use Sanity overlay if provided */}
        {overlayStyle ? (
          <div style={overlayStyle} />
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/80 to-slate-950/95" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-950/30 via-transparent to-blue-950/30" />
          </>
        )}
      </motion.div>

      {/* Content Container */}
      <motion.div
        className="container relative z-10 px-4 md:px-8"
        style={LEGACY_PARITY ? undefined : { y: contentY as any, opacity: contentOpacity as any }}
      >
        <div className={cn(
          'max-w-5xl mx-auto flex flex-col',
          alignmentClasses[alignment]
        )}>
          {/* Badge */}
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-8"
            >
              <span
                className="inline-flex items-center px-4 py-2 rounded-full text-xs font-medium backdrop-blur-sm"
                style={{
                  backgroundColor: badgeBgColor,
                  color: badgeTextColor,
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: badgeBorderColor,
                }}
              >
                {BadgeIcon && <BadgeIcon className="w-3 h-3 mr-2" />}
                {badge.text}
              </span>
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            className={cn(
              titleSize ? titleSizeClasses[titleSize] : 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl',
              'font-extrabold mb-6 tracking-tight'
            )}
            style={{ color: defaultTitleColor }}
          >
            {typeof title === 'string' ? (
              <span>{title}</span>
            ) : (
              title
            )}
          </motion.h1>

          {/* Subtitle */}
          {subtitle && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              className="text-xl sm:text-2xl md:text-3xl mb-4 font-light"
              style={{ color: defaultSubtitleColor }}
            >
              {subtitle}
            </motion.div>
          )}

          {/* Description */}
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              className={cn(
                descriptionSize ? descSizeClasses[descriptionSize] : 'text-base md:text-lg',
                'mb-10 max-w-3xl'
              )}
              style={{ color: defaultDescColor }}
            >
              {description}
            </motion.p>
          )}

          {/* Buttons */}
          {buttons.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              className={cn(
                'flex flex-col sm:flex-row gap-4',
                alignment === 'center' && 'justify-center',
                alignment === 'left' && 'justify-start',
                alignment === 'right' && 'justify-end'
              )}
            >
              {buttons.map((button, index) => {
                const ButtonIcon = button.icon || ArrowRight;
                const isPrimary = button.variant === 'primary' || index === 0;

                const buttonStyle = isPrimary ? {
                  backgroundColor: primaryBtnBgColor,
                  color: primaryBtnTextColor,
                  ...(primaryBtnBorderColor && {
                    borderWidth: '1px',
                    borderStyle: 'solid' as const,
                    borderColor: primaryBtnBorderColor,
                  }),
                } : {
                  backgroundColor: secondaryBtnBgColor,
                  color: secondaryBtnTextColor,
                  borderWidth: '1px',
                  borderStyle: 'solid' as const,
                  borderColor: secondaryBtnBorderColor,
                };

                return (
                  <Button
                    key={button.href}
                    size="lg"
                    variant={isPrimary ? 'default' : 'outline'}
                    className={cn(
                      'group h-12 md:h-14 px-8 md:px-10 text-base font-semibold shadow-lg transition-all',
                      isPrimary ? 'hover:shadow-xl' : 'backdrop-blur-sm hover:opacity-90'
                    )}
                    style={buttonStyle}
                    asChild
                  >
                    <Link href={button.href}>
                      {button.label}
                      <ButtonIcon className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </Button>
                );
              })}
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      {showScrollIndicator && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: [0.33, 1, 0.68, 1]
            }}
            className="text-white/50 hover:text-white/70 transition-colors cursor-pointer"
          >
            <ChevronDown className="h-6 w-6" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
