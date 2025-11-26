'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  variant?: 'primary' | 'secondary' | 'mono' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  className?: string;
  showAnimation?: boolean;
}

// Enhanced Precision Target Logo with Elegant Animations (optimized with React.memo)
export const LogoPrecisionTargetEnhanced = React.memo(({
  variant = 'primary',
  size = 'md',
  animated = true,
  className = '',
  showAnimation = true
}: LogoProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (showAnimation) {
      setIsVisible(true);
    }
  }, [showAnimation]);

  const sizeMap = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-24'
  };

  const colors = {
    primary: '#06b6d4',
    secondary: '#475569',
    mono: '#1e293b',
    gradient: 'url(#iis-target-gradient-enhanced)'
  };

  const color = colors[variant];

  // Animation variants for different elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const squareVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1, ease: "easeInOut" as const },
        opacity: { duration: 0.5 }
      }
    }
  };

  const circleVariants = {
    hidden: {
      scale: 0,
      opacity: 0
    },
    visible: (custom: number) => ({
      scale: 1,
      opacity: custom,
      transition: {
        scale: { duration: 0.5, ease: "backOut" },
        opacity: { duration: 0.5 },
        delay: custom === 0.3 ? 0.6 : custom === 0.5 ? 0.4 : 0.2
      }
    })
  };

  const crosshairVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 0.8, ease: "easeInOut" as const, delay: 0.8 },
        opacity: { duration: 0.3, delay: 0.8 }
      }
    }
  };

  const textVariants = {
    hidden: {
      opacity: 0,
      x: -20
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "backOut" as const
      }
    }
  };

  return (
    <motion.svg
      className={`${sizeMap[size]} ${className}`}
      viewBox="0 0 320 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <defs>
        <linearGradient id="iis-target-gradient-enhanced" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4">
            <animate attributeName="stop-color" values="#06b6d4;#3b82f6;#06b6d4" dur="6s" repeatCount="indefinite" />
          </stop>
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#06b6d4">
            <animate attributeName="stop-color" values="#06b6d4;#3b82f6;#06b6d4" dur="6s" repeatCount="indefinite" />
          </stop>
        </linearGradient>

        {/* Enhanced gradient with shimmer effect */}
        <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>

        {/* Subtle glow filter */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* IIS Monogram with Target */}
      <g transform="translate(40, 40)">
        {/* Outer square frame with draw-in animation */}
        <motion.rect
          x="-28"
          y="-28"
          width="56"
          height="56"
          fill="none"
          stroke={color}
          strokeWidth="2"
          variants={squareVariants}
        />

        {/* Animated corner accents */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <path d="M-28 -28l8 0l0 8M20 -28l8 0l0 8M-28 20l0 8l8 0M20 20l0 8l8 0"
            stroke={color}
            strokeWidth="3"
            fill="none"
            opacity="0.8"
          />
        </motion.g>

        {/* Target circles with scale-in animation */}
        <motion.circle
          cx="0"
          cy="0"
          r="20"
          fill="none"
          stroke={color}
          strokeWidth="1"
          variants={circleVariants}
          custom={0.3}
        />
        <motion.circle
          cx="0"
          cy="0"
          r="14"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          variants={circleVariants}
          custom={0.5}
        />
        <motion.circle
          cx="0"
          cy="0"
          r="8"
          fill="none"
          stroke={color}
          strokeWidth="2"
          variants={circleVariants}
          custom={0.7}
        />

        {/* Center dot with pulse */}
        <motion.circle
          cx="0"
          cy="0"
          r="2"
          fill={color}
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ delay: 1, duration: 0.5, ease: "backOut" }}
        />

        {/* IIS Letters with stagger animation */}
        <motion.g variants={containerVariants}>
          <motion.text
            x="-11"
            y="5"
            fill="#1e293b"
            fontSize="18"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            variants={letterVariants}
          >
            I
          </motion.text>
          <motion.text
            x="-3"
            y="5"
            fill="#1e293b"
            fontSize="18"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            variants={letterVariants}
          >
            I
          </motion.text>
          <motion.text
            x="5"
            y="5"
            fill="#1e293b"
            fontSize="18"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            variants={letterVariants}
          >
            S
          </motion.text>
        </motion.g>

        {/* Precision crosshairs with draw-in animation */}
        <motion.path
          d="M-28 0h10M18 0h10M0 -28v10M0 18v10"
          stroke={color}
          strokeWidth="1.5"
          variants={crosshairVariants}
          pathLength={0}
          style={{ pathLength: 0 }}
        />

        {/* Animated scanning line */}
        {animated && (
          <motion.line
            x1="-28"
            y1="-28"
            x2="-28"
            y2="28"
            stroke={color}
            strokeWidth="0.5"
            opacity="0"
            animate={{
              x1: [-28, 28, -28],
              x2: [-28, 28, -28],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut"
            }}
          />
        )}

        {/* Rotating accent ring */}
        {animated && (
          <motion.circle
            cx="0"
            cy="0"
            r="25"
            fill="none"
            stroke={color}
            strokeWidth="0.5"
            strokeDasharray="2 8"
            opacity="0.3"
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        )}
      </g>

      {/* Clean Typography with sequential fade-in */}
      <g transform="translate(90, 40)">
        <motion.text
          x="0"
          y="-12"
          fill="#1e293b"
          fontSize="15"
          fontWeight="700"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="1.2"
          variants={textVariants}
        >
          INTEGRATED
        </motion.text>
        <motion.text
          x="0"
          y="4"
          fill="#1e293b"
          fontSize="15"
          fontWeight="700"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="1.2"
          variants={textVariants}
          transition={{ delay: 0.2 }}
        >
          INSPECTION
        </motion.text>
        <motion.text
          x="0"
          y="20"
          fill={color}
          fontSize="15"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="1.2"
          variants={textVariants}
          transition={{ delay: 0.4 }}
          filter={animated ? "url(#glow)" : undefined}
        >
          SYSTEMS
        </motion.text>

        {/* Underline accent animation */}
        <motion.rect
          x="0"
          y="24"
          width="0"
          height="2"
          fill={color}
          animate={animated ? { width: [0, 70, 70] } : {}}
          transition={{
            delay: 1.8,
            duration: 0.6,
            ease: "easeOut"
          }}
        />
      </g>
    </motion.svg>
  );
});
LogoPrecisionTargetEnhanced.displayName = 'LogoPrecisionTargetEnhanced';

// Logo component for static use (optimized with React.memo)
export const IISLogo = React.memo(({
  variant = 'primary',
  size = 'md',
  className = ''
}: Omit<LogoProps, 'animated' | 'showAnimation'>) => {
  const sizeMap = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-24'
  };

  const colors = {
    primary: '#06b6d4',
    secondary: '#475569',
    mono: '#1e293b',
    gradient: 'url(#iis-gradient-static)'
  };

  const color = colors[variant];

  return (
    <svg
      className={`${sizeMap[size]} ${className}`}
      viewBox="0 0 320 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="iis-gradient-static" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>

      {/* IIS Monogram with Target */}
      <g transform="translate(40, 40)">
        <rect x="-28" y="-28" width="56" height="56" fill="none" stroke={color} strokeWidth="2" />
        <path d="M-28 -28l8 0l0 8M20 -28l8 0l0 8M-28 20l0 8l8 0M20 20l0 8l8 0" stroke={color} strokeWidth="3" fill="none" opacity="0.8" />
        <circle cx="0" cy="0" r="20" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
        <circle cx="0" cy="0" r="14" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
        <circle cx="0" cy="0" r="8" fill="none" stroke={color} strokeWidth="2" opacity="0.7" />
        <circle cx="0" cy="0" r="2" fill={color} />
        <text x="0" y="5" fill="#1e293b" fontSize="18" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" textAnchor="middle">
          IIS
        </text>
        <path d="M-28 0h10M18 0h10M0 -28v10M0 18v10" stroke={color} strokeWidth="1.5" />
      </g>

      {/* Typography */}
      <g transform="translate(90, 40)">
        <text x="0" y="-12" fill="#1e293b" fontSize="15" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="1.2">
          INTEGRATED
        </text>
        <text x="0" y="4" fill="#1e293b" fontSize="15" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="1.2">
          INSPECTION
        </text>
        <text x="0" y="20" fill={color} fontSize="15" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="1.2">
          SYSTEMS
        </text>
        <rect x="0" y="24" width="70" height="2" fill={color} />
      </g>
    </svg>
  );
});
IISLogo.displayName = 'IISLogo';

// Showcase component
export const EnhancedLogoShowcase = () => {
  const [key, setKey] = useState(0);

  const restartAnimation = () => {
    setKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Integrated Inspection Systems</h1>
          <p className="text-xl text-slate-600">Enhanced Precision Target Logo</p>
          <button
            onClick={restartAnimation}
            className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-500 hover:to-indigo-500 transition-all"
          >
            Replay Animation
          </button>
        </div>

        {/* Main showcase */}
        <div className="bg-white rounded-xl shadow-2xl p-12 mb-8">
          <div className="flex items-center justify-center min-h-[200px]">
            <LogoPrecisionTargetEnhanced key={key} variant="primary" size="xl" animated={true} />
          </div>
        </div>

        {/* Variants */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="flex items-center justify-center h-32">
              <LogoPrecisionTargetEnhanced variant="primary" size="lg" animated={false} />
            </div>
            <p className="text-center text-sm text-slate-600 mt-4">Primary</p>
          </div>

          <div className="bg-slate-100 p-8 rounded-lg shadow-lg">
            <div className="flex items-center justify-center h-32">
              <LogoPrecisionTargetEnhanced variant="secondary" size="lg" animated={false} />
            </div>
            <p className="text-center text-sm text-slate-600 mt-4">Secondary</p>
          </div>

          <div className="bg-slate-900 p-8 rounded-lg shadow-lg">
            <div className="flex items-center justify-center h-32">
              <LogoPrecisionTargetEnhanced variant="mono" size="lg" className="invert" animated={false} />
            </div>
            <p className="text-center text-sm text-white mt-4">Monochrome</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-50 p-8 rounded-lg shadow-lg">
            <div className="flex items-center justify-center h-32">
              <LogoPrecisionTargetEnhanced variant="gradient" size="lg" animated={true} />
            </div>
            <p className="text-center text-sm text-slate-600 mt-4">Gradient Animated</p>
          </div>
        </div>

        {/* Size variations */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-lg font-semibold mb-6">Size Variations</h3>
          <div className="flex items-end gap-8 justify-center">
            <div className="text-center">
              <IISLogo size="sm" />
              <p className="text-xs text-slate-500 mt-2">Small</p>
            </div>
            <div className="text-center">
              <IISLogo size="md" />
              <p className="text-xs text-slate-500 mt-2">Medium</p>
            </div>
            <div className="text-center">
              <IISLogo size="lg" />
              <p className="text-xs text-slate-500 mt-2">Large</p>
            </div>
            <div className="text-center">
              <IISLogo size="xl" />
              <p className="text-xs text-slate-500 mt-2">Extra Large</p>
            </div>
          </div>
        </div>

        {/* Usage examples */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 rounded-lg flex items-center justify-center">
            <IISLogo variant="mono" size="md" className="brightness-0 invert" />
          </div>
          <div className="bg-white border-2 border-slate-200 p-6 rounded-lg flex items-center justify-center">
            <IISLogo variant="primary" size="md" />
          </div>
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 rounded-lg flex items-center justify-center">
            <IISLogo variant="mono" size="md" className="brightness-0 invert" />
          </div>
        </div>
      </div>
    </div>
  );
};