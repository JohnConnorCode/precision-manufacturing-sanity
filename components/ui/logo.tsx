'use client';

import { useState } from 'react';
import Image from 'next/image';
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
  const _isHovered = useState(false);

  // Determine which logo type to render
  const logoType = logoData?.logoType || 'svg';

  // Determine variant based on Sanity data or props
  let effectiveVariant: 'dark' | 'light' = variant === 'light' ? 'light' : 'dark';
  if (logoType === 'svg' && logoData?.svgColor && logoData.svgColor !== 'auto') {
    effectiveVariant = logoData.svgColor as 'dark' | 'light';
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
                      : 'bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent'
                    : effectiveVariant === 'light'
                    ? 'text-white'
                    : 'text-slate-800'
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
                      : 'bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent'
                    : effectiveVariant === 'light'
                    ? 'text-white'
                    : 'text-slate-800'
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