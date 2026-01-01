'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import LogoSVG from './logo-svg';

interface LogoData {
  logoType?: 'svg' | 'custom' | 'original';
  customLogo?: {
    asset?: {
      url: string;
    };
    alt?: string;
  };
  svgColor?: 'auto' | 'dark' | 'light';
  showCompanyText?: boolean;
  enableAnimation?: boolean;
}

interface LogoProps {
  className?: string;
  showText?: boolean;
  variant?: 'default' | 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  logoData?: LogoData | null;
}

export default function Logo({
  className = '',
  showText = true,
  variant = 'default',
  size = 'md',
  animated = true,
  logoData
}: LogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => setMounted(true), []);

  // Determine which logo type to render
  const logoType = logoData?.logoType || 'svg';

  // Determine variant based on Sanity data, props, OR current theme
  // Priority: explicit prop 'light' > Sanity svgColor setting > theme auto-detection
  let effectiveVariant: 'dark' | 'light' = 'dark';

  // If variant prop is explicitly 'light', always use it (for hero mode transparent header)
  if (variant === 'light') {
    effectiveVariant = 'light';
  } else {
    // Otherwise, check Sanity settings or auto-detect from theme
    const svgColorSetting = logoData?.svgColor || 'auto';
    if (svgColorSetting === 'auto') {
      // In dark mode, use light variant (white logo). In light mode, use dark variant (black logo)
      effectiveVariant = mounted && resolvedTheme === 'dark' ? 'light' : 'dark';
    } else if (svgColorSetting === 'dark' || svgColorSetting === 'light') {
      effectiveVariant = svgColorSetting;
    }
  }

  // Determine whether to show text
  const showLogoText = logoData?.showCompanyText !== undefined
    ? logoData.showCompanyText
    : showText;

  // Determine whether animation is enabled
  const isAnimated = logoData?.enableAnimation !== undefined
    ? logoData.enableAnimation
    : animated;

  // Size mappings for PNG/custom images
  const sizeMap = {
    sm: { width: 32, height: 32 },
    md: { width: 40, height: 40 },
    lg: { width: 50, height: 50 },
  };

  // Render SVG logo (default)
  if (logoType === 'svg') {
    return (
      <LogoSVG
        className={className}
        showText={showLogoText}
        variant={effectiveVariant}
        size={size}
        animated={isAnimated}
      />
    );
  }

  // Render custom uploaded logo
  if (logoType === 'custom' && logoData?.customLogo?.asset?.url) {
    const { width, height } = sizeMap[size];
    return (
      <div className={`flex items-center ${showLogoText ? 'gap-2' : ''}`}>
        <Image
          src={logoData.customLogo.asset.url}
          alt={logoData.customLogo.alt || 'IIS Logo'}
          width={width}
          height={height}
          quality={95}
          className={`object-contain ${className}`}
          priority
        />
        {showLogoText && (
          <div className="flex flex-col justify-center gap-0.5">
            {['INTEGRATED', 'INSPECTION', 'SYSTEMS'].map((word, i) => (
              <div
                key={word}
                className={`text-[11px] font-extrabold tracking-[0.15em] leading-none ${
                  i === 2
                    ? effectiveVariant === 'light'
                      ? 'text-blue-400'
                      : 'text-blue-600 dark:text-blue-400'
                    : effectiveVariant === 'light'
                    ? 'text-tone-inverse'
                    : 'text-slate-800 dark:text-tone-inverse'
                }`}
              >
                {word}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Render original PNG logo (legacy fallback)
  if (logoType === 'original') {
    const { width, height } = sizeMap[size];
    return (
      <div className={`flex items-center ${showLogoText ? 'gap-2' : ''}`}>
        <Image
          src="/Gaussian-Distribution-with-_IIS_.png"
          alt="IIS - Integrated Inspection Systems"
          width={width}
          height={height}
          quality={95}
          className={`object-contain ${className}`}
          priority
        />
        {showLogoText && (
          <div className="flex flex-col justify-center gap-0.5">
            {['INTEGRATED', 'INSPECTION', 'SYSTEMS'].map((word, i) => (
              <div
                key={word}
                className={`text-[11px] font-extrabold tracking-[0.15em] leading-none ${
                  i === 2
                    ? effectiveVariant === 'light'
                      ? 'text-blue-400'
                      : 'text-blue-600 dark:text-blue-400'
                    : effectiveVariant === 'light'
                    ? 'text-tone-inverse'
                    : 'text-slate-800 dark:text-tone-inverse'
                }`}
              >
                {word}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Default fallback to SVG
  return (
    <LogoSVG
      className={className}
      showText={showLogoText}
      variant={effectiveVariant}
      size={size}
      animated={isAnimated}
    />
  );
}
