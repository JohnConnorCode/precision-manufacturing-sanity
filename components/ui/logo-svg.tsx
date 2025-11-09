'use client';

import { motion } from 'framer-motion';

interface LogoSVGProps {
  className?: string;
  showText?: boolean;
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export default function LogoSVG({
  className = '',
  showText = true,
  variant = 'dark',
  size = 'md',
  animated = true
}: LogoSVGProps) {
  // Size mappings
  const sizeMap = {
    sm: { width: 32, height: 32 },
    md: { width: 40, height: 40 },
    lg: { width: 50, height: 50 },
  };

  const { width, height } = sizeMap[size];

  // Color based on variant
  const strokeColor = variant === 'light' ? '#ffffff' : '#000000';
  const fillColor = variant === 'light' ? '#ffffff' : '#000000';

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

  // Animation variants
  const curveVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.5, ease: "easeInOut" as const },
        opacity: { duration: 0.3 }
      }
    }
  } as const;

  const textVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 1.2,
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1] as const
      }
    }
  } as const;

  const containerLabelVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 1.2
      }
    }
  } as const;

  const wordVariants = {
    hidden: {
      opacity: 0,
      x: -10
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const
      }
    }
  } as const;

  return (
    <div className={`flex items-center ${logoTextGap}`}>
      {/* SVG Logo */}
      <motion.svg
        width={width}
        height={height}
        viewBox="0 0 800 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`flex-shrink-0 ${className}`}
        initial={animated ? "hidden" : "visible"}
        animate="visible"
      >
        {/* Gaussian Bell Curve - mathematically accurate smooth path */}
        <motion.path
          d="M 50 550 C 80 540, 110 515, 140 470 C 170 425, 200 360, 230 270 C 260 180, 290 115, 320 75 C 350 35, 375 20, 400 20 C 425 20, 450 35, 480 75 C 510 115, 540 180, 570 270 C 600 360, 630 425, 660 470 C 690 515, 720 540, 750 550"
          stroke={strokeColor}
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={animated ? curveVariants : undefined}
        />

        {/* Base line */}
        <motion.line
          x1="40"
          y1="550"
          x2="760"
          y2="550"
          stroke={strokeColor}
          strokeWidth="12"
          strokeLinecap="round"
          variants={animated ? curveVariants : undefined}
        />

        {/* IIS Text - positioned in center of curve */}
        <motion.text
          x="400"
          y="340"
          textAnchor="middle"
          fontSize="180"
          fontWeight="900"
          fontFamily="Georgia, serif"
          fill={fillColor}
          variants={animated ? textVariants : undefined}
        >
          IIS
        </motion.text>
      </motion.svg>

      {/* Text Label - Animates in after logo with stagger */}
      {showText && (
        <motion.div
          initial={animated ? "hidden" : "visible"}
          animate="visible"
          variants={animated ? containerLabelVariants : undefined}
          className={`flex flex-col justify-center ${gapClass}`}
        >
          {['INTEGRATED', 'INSPECTION', 'SYSTEMS'].map((word, i) => (
            <motion.div
              key={word}
              variants={animated ? wordVariants : undefined}
              className={
                i === 2
                  ? `${textSizeClass} font-extrabold tracking-[0.15em] leading-none ${variant === 'light' ? 'text-blue-400' : 'bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent'}`
                  : `${textSizeClass} font-extrabold tracking-[0.15em] leading-none ${variant === 'light' ? 'text-white' : 'text-slate-800'}`
              }
            >
              {word}
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
