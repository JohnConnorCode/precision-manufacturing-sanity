'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  showText?: boolean;
  variant?: 'default' | 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({
  className = '',
  showText = true,
  variant = 'default',
  size = 'md'
}: LogoProps) {
  const _isHovered = useState(false);

  const textColorClass = variant === 'light'
    ? 'text-white'
    : variant === 'dark'
    ? 'text-slate-900'
    : 'text-slate-800';

  // Scale image size based on size prop - sized to match 3 lines of text height
  // md: 3 × 11px + 2 gaps × 2px = 37px, so use 40px for logo
  // lg: 3 × 13px + 2 gaps × 4px = 47px, so use 50px for logo
  // sm: 3 × 9px + 0 gaps = 27px, so use 32px for logo
  const imageWidth = size === 'sm' ? 32 : size === 'lg' ? 50 : 40;
  const imageHeight = size === 'sm' ? 32 : size === 'lg' ? 50 : 40;

  // Scale text size with logo size
  const textSizeClass = size === 'sm'
    ? 'text-[9px]'
    : size === 'lg'
    ? 'text-[13px]'
    : 'text-[11px]';

  // Scale spacing with logo size
  const gapClass = size === 'sm'
    ? 'gap-0'
    : size === 'lg'
    ? 'gap-1'
    : 'gap-0.5';

  // Gap between logo and text
  const logoTextGap = size === 'sm' ? 'gap-1.5' : size === 'lg' ? 'gap-3' : 'gap-2';

  return (
    <div
      className={`flex items-center ${logoTextGap}`}
    >
      {/* Logo - Animates in first */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.7,
          delay: 0,
          ease: [0.34, 1.56, 0.64, 1]
        }}
        className={`flex-shrink-0 flex items-center justify-center ${className}`}
      >
        <Image
          src="/Gaussian-Distribution-with-_IIS_.png"
          alt="IIS - Integrated Inspection Systems"
          width={imageWidth}
          height={imageHeight}
          priority
          quality={95}
          className="object-contain w-full h-full transition-transform duration-300 hover:scale-110"
        />
      </motion.div>

      {/* Text - Animates in after logo */}
      {showText && (
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.4,
            ease: [0.34, 1.56, 0.64, 1]
          }}
          className={`flex flex-col justify-center ${gapClass}`}
        >
          {['INTEGRATED', 'INSPECTION', 'SYSTEMS'].map((word, i) => (
            <div
              key={word}
              className={
                i === 2
                  ? `${textSizeClass} font-extrabold tracking-[0.15em] leading-none ${variant === 'light' ? 'text-blue-400' : 'bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent'}`
                  : `${textSizeClass} font-extrabold tracking-[0.15em] ${textColorClass} leading-none`
              }
            >
              {word}
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}