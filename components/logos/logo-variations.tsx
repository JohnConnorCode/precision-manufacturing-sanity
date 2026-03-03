'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  variant?: 'primary' | 'secondary' | 'mono' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  className?: string;
}

// Logo Variation 1: Gear and Circuit Integration
export const LogoGearTech = ({ variant = 'primary', size = 'md', animated = false, className = '' }: LogoProps) => {
  const sizeMap = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-24'
  };

  const colors = {
    primary: {
      gear: '#06b6d4', // blue-600
      circuit: '#3b82f6', // blue-500
      text: '#1e293b' // slate-800
    },
    secondary: {
      gear: '#1e293b',
      circuit: '#475569',
      text: '#1e293b'
    },
    mono: {
      gear: '#1e293b',
      circuit: '#1e293b',
      text: '#1e293b'
    },
    gradient: {
      gear: 'url(#gradient-gear)',
      circuit: 'url(#gradient-circuit)',
      text: 'url(#gradient-text)'
    }
  };

  const color = colors[variant];

  return (
    <motion.svg
      className={`${sizeMap[size]} ${className}`}
      viewBox="0 0 240 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={animated ? { rotate: [0, 360] } : {}}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      <defs>
        <linearGradient id="gradient-gear" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="gradient-circuit" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id="gradient-text" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>

      {/* Gear Symbol */}
      <g transform="translate(20, 40)">
        <path
          d="M20 0l3.5 7-7 3.5-3.5-7 7-3.5zm0 40l-3.5-7 7-3.5 3.5 7-7 3.5zm20-20l-7 3.5-3.5-7 3.5-7 7 3.5v7zm-40 0l7-3.5 3.5 7-3.5 7-7-3.5v-7z"
          fill={color.gear}
          transform="translate(-20, -20)"
        />
        <circle cx="0" cy="0" r="12" fill="none" stroke={color.gear} strokeWidth="3" />
        {/* Circuit paths */}
        <path
          d="M12 0h10m0 0v5m0 0h5M-12 0h-10m0 0v-5m0 0h-5"
          stroke={color.circuit}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>

      {/* Text */}
      <text x="75" y="45" fill={color.text} fontSize="24" fontWeight="bold" fontFamily="sans-serif">
        PRECISION
      </text>
      <text x="75" y="65" fill={color.text} fontSize="14" fontWeight="normal" fontFamily="sans-serif">
        MACHINING
      </text>
    </motion.svg>
  );
};

// Logo Variation 2: Minimalist Precision Mark
export const LogoPrecisionMark = ({ variant = 'primary', size = 'md', animated = false, className = '' }: LogoProps) => {
  const sizeMap = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-24'
  };

  const colors = {
    primary: '#06b6d4',
    secondary: '#1e293b',
    mono: '#1e293b',
    gradient: 'url(#gradient-precision)'
  };

  return (
    <motion.svg
      className={`${sizeMap[size]} ${className}`}
      viewBox="0 0 240 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      whileHover={animated ? { scale: 1.05 } : {}}
    >
      <defs>
        <linearGradient id="gradient-precision" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>

      {/* Precision Crosshair Symbol */}
      <g transform="translate(30, 40)">
        {/* Outer circle */}
        <circle cx="0" cy="0" r="20" fill="none" stroke={colors[variant]} strokeWidth="2" />
        {/* Crosshairs */}
        <path d="M-30 0h20M10 0h20M0 -30v20M0 10v20" stroke={colors[variant]} strokeWidth="2" />
        {/* Center dot */}
        <circle cx="0" cy="0" r="3" fill={colors[variant]} />
        {/* Corner brackets */}
        <path d="M-25 -25h5v5M25 -25h-5v5M-25 25h5v-5M25 25h-5v-5" stroke={colors[variant]} strokeWidth="2" fill="none" />
      </g>

      {/* Modern Typography */}
      <g transform="translate(75, 35)">
        <text x="0" y="0" fill={variant === 'mono' ? '#1e293b' : '#1e293b'} fontSize="22" fontWeight="300" fontFamily="sans-serif" letterSpacing="3">
          PRECISION
        </text>
        <text x="0" y="20" fill={colors[variant]} fontSize="11" fontWeight="600" fontFamily="sans-serif" letterSpacing="4">
          MACHINING
        </text>
      </g>
    </motion.svg>
  );
};

// Logo Variation 3: Industrial Hexagon
export const LogoHexIndustrial = ({ variant = 'primary', size = 'md', animated = false, className = '' }: LogoProps) => {
  const sizeMap = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-24'
  };

  const colors = {
    primary: { hex: '#06b6d4', text: '#1e293b', accent: '#3b82f6' },
    secondary: { hex: '#475569', text: '#1e293b', accent: '#1e293b' },
    mono: { hex: '#1e293b', text: '#1e293b', accent: '#1e293b' },
    gradient: { hex: 'url(#gradient-hex)', text: '#1e293b', accent: 'url(#gradient-hex2)' }
  };

  const color = colors[variant];

  return (
    <motion.svg
      className={`${sizeMap[size]} ${className}`}
      viewBox="0 0 260 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={animated ? { rotateY: [0, 360] } : {}}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
    >
      <defs>
        <linearGradient id="gradient-hex" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="gradient-hex2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>

      {/* Hexagon Container */}
      <g transform="translate(35, 40)">
        {/* Main Hexagon */}
        <path
          d="M-20 0l-10 -17.32l10 -17.32h20l10 17.32l-10 17.32z"
          fill="none"
          stroke={color.hex}
          strokeWidth="3"
        />
        {/* Inner Hexagon */}
        <path
          d="M-12 0l-6 -10.39l6 -10.39h12l6 10.39l-6 10.39z"
          fill={color.accent}
          opacity="0.2"
        />
        {/* Center Mark */}
        <circle cx="0" cy="0" r="4" fill={color.hex} />
        {/* Tech Lines */}
        <path d="M0 -20v-10M0 20v10M17.32 -10h10M-17.32 10h-10" stroke={color.accent} strokeWidth="1.5" />
      </g>

      {/* Typography */}
      <g transform="translate(85, 45)">
        <text x="0" y="-5" fill={color.text} fontSize="20" fontWeight="700" fontFamily="sans-serif">
          PRECISION
        </text>
        <text x="0" y="15" fill={color.hex} fontSize="13" fontWeight="400" fontFamily="sans-serif" letterSpacing="2">
          MACHINING
        </text>
      </g>
    </motion.svg>
  );
};

// Logo Variation 4: Abstract Wave Tech
export const LogoWaveTech = ({ variant = 'primary', size = 'md', animated = false, className = '' }: LogoProps) => {
  const sizeMap = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-24'
  };

  return (
    <motion.svg
      className={`${sizeMap[size]} ${className}`}
      viewBox="0 0 240 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={animated ? { scale: [1, 1.02, 1] } : {}}
      transition={{ duration: 4, repeat: Infinity }}
    >
      <defs>
        <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>

      {/* Wave Pattern */}
      <g transform="translate(20, 40)">
        <path
          d="M0 0Q10 -15 20 0T40 0Q50 15 60 0"
          stroke={variant === 'gradient' ? 'url(#wave-gradient)' : '#06b6d4'}
          strokeWidth="3"
          fill="none"
        />
        <path
          d="M0 0Q10 15 20 0T40 0Q50 -15 60 0"
          stroke={variant === 'gradient' ? 'url(#wave-gradient)' : '#3b82f6'}
          strokeWidth="3"
          fill="none"
          opacity="0.6"
        />
        {/* Tech dots */}
        <circle cx="0" cy="0" r="2" fill="#06b6d4" />
        <circle cx="20" cy="0" r="2" fill="#3b82f6" />
        <circle cx="40" cy="0" r="2" fill="#06b6d4" />
        <circle cx="60" cy="0" r="2" fill="#3b82f6" />
      </g>

      {/* Modern Text */}
      <text x="95" y="38" fill="#1e293b" fontSize="18" fontWeight="300" fontFamily="sans-serif">
        PRECISION
      </text>
      <text x="95" y="55" fill="#06b6d4" fontSize="11" fontWeight="500" fontFamily="sans-serif" letterSpacing="1">
        MACHINING
      </text>
    </motion.svg>
  );
};

// Logo Variation 5: CNC Tool Icon
export const LogoCNCTool = ({ variant = 'primary', size = 'md', animated = false, className = '' }: LogoProps) => {
  const sizeMap = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-24'
  };

  const colors = {
    primary: { tool: '#06b6d4', handle: '#3b82f6', text: '#1e293b' },
    secondary: { tool: '#475569', handle: '#1e293b', text: '#1e293b' },
    mono: { tool: '#1e293b', handle: '#1e293b', text: '#1e293b' },
    gradient: { tool: 'url(#cnc-gradient)', handle: 'url(#cnc-gradient2)', text: '#1e293b' }
  };

  const color = colors[variant];

  return (
    <motion.svg
      className={`${sizeMap[size]} ${className}`}
      viewBox="0 0 250 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      whileHover={animated ? { rotate: [0, -5, 5, 0] } : {}}
      transition={{ duration: 0.5 }}
    >
      <defs>
        <linearGradient id="cnc-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="cnc-gradient2" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>

      {/* CNC Tool Icon */}
      <g transform="translate(30, 40)">
        {/* Tool Handle */}
        <rect x="-4" y="-25" width="8" height="20" fill={color.handle} rx="2" />
        {/* Tool Shaft */}
        <rect x="-2" y="-8" width="4" height="15" fill={color.tool} />
        {/* Cutting Head */}
        <path d="M-6 7l6 -10l6 10z" fill={color.tool} />
        {/* Rotation indicator */}
        <circle cx="0" cy="-15" r="12" fill="none" stroke={color.tool} strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
      </g>

      {/* Bold Industrial Text */}
      <g transform="translate(75, 40)">
        <text x="0" y="0" fill={color.text} fontSize="24" fontWeight="800" fontFamily="sans-serif">
          PRECISION
        </text>
        <text x="0" y="18" fill={color.tool} fontSize="10" fontWeight="500" fontFamily="sans-serif" letterSpacing="3.5">
          MACHINING
        </text>
      </g>
    </motion.svg>
  );
};

// Logo Variation 6: Tech Grid
export const LogoTechGrid = ({ variant = 'primary', size = 'md', animated = false, className = '' }: LogoProps) => {
  const sizeMap = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-24'
  };

  return (
    <motion.svg
      className={`${sizeMap[size]} ${className}`}
      viewBox="0 0 240 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="grid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="1" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* Grid Pattern */}
      <g transform="translate(25, 40)">
        {/* Grid squares */}
        <rect x="-15" y="-15" width="10" height="10" fill={variant === 'gradient' ? 'url(#grid-gradient)' : '#06b6d4'} opacity="0.8" />
        <rect x="-2" y="-15" width="10" height="10" fill={variant === 'gradient' ? 'url(#grid-gradient)' : '#3b82f6'} opacity="0.6" />
        <rect x="11" y="-15" width="10" height="10" fill={variant === 'gradient' ? 'url(#grid-gradient)' : '#06b6d4'} opacity="0.4" />

        <rect x="-15" y="-2" width="10" height="10" fill={variant === 'gradient' ? 'url(#grid-gradient)' : '#3b82f6'} opacity="0.6" />
        <rect x="-2" y="-2" width="10" height="10" fill={variant === 'gradient' ? 'url(#grid-gradient)' : '#06b6d4'} opacity="1" />
        <rect x="11" y="-2" width="10" height="10" fill={variant === 'gradient' ? 'url(#grid-gradient)' : '#3b82f6'} opacity="0.6" />

        <rect x="-15" y="11" width="10" height="10" fill={variant === 'gradient' ? 'url(#grid-gradient)' : '#06b6d4'} opacity="0.4" />
        <rect x="-2" y="11" width="10" height="10" fill={variant === 'gradient' ? 'url(#grid-gradient)' : '#3b82f6'} opacity="0.6" />
        <rect x="11" y="11" width="10" height="10" fill={variant === 'gradient' ? 'url(#grid-gradient)' : '#06b6d4'} opacity="0.8" />

        {animated && (
          <motion.rect
            x="-2"
            y="-2"
            width="10"
            height="10"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </g>

      {/* Text */}
      <text x="70" y="38" fill="#1e293b" fontSize="20" fontWeight="600" fontFamily="sans-serif">
        PRECISION
      </text>
      <text x="70" y="55" fill="#475569" fontSize="11" fontWeight="400" fontFamily="sans-serif" letterSpacing="2.5">
        MACHINING
      </text>
    </motion.svg>
  );
};

// Main Logo Display Component
export const LogoShowcase = () => {
  const logos = [
    { component: LogoGearTech, name: 'Gear & Circuit Tech', description: 'Modern technical design combining gear mechanics with circuit technology' },
    { component: LogoPrecisionMark, name: 'Precision Crosshair', description: 'Minimalist design emphasizing accuracy and precision targeting' },
    { component: LogoHexIndustrial, name: 'Industrial Hexagon', description: 'Strong geometric design representing stability and engineering excellence' },
    { component: LogoWaveTech, name: 'Wave Technology', description: 'Flowing design symbolizing adaptive machining and continual improvement' },
    { component: LogoCNCTool, name: 'CNC Tool Icon', description: 'Direct representation of machining tools and capabilities' },
    { component: LogoTechGrid, name: 'Tech Grid Pattern', description: 'Modern grid system representing systematic precision and organization' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Logo Design Variations</h1>
          <p className="text-xl text-slate-600">Select your preferred design for Precision Machining</p>
        </div>

        <div className="grid gap-8">
          {logos.map(({ component: LogoComponent, name, description }, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-2">{name}</h2>
              <p className="text-slate-600 mb-8">{description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Primary Variant */}
                <div className="text-center">
                  <div className="bg-white p-6 rounded-lg border border-slate-200 mb-2 flex items-center justify-center min-h-[120px]">
                    <LogoComponent variant="primary" size="lg" />
                  </div>
                  <p className="text-sm text-slate-600">Primary</p>
                </div>

                {/* Secondary Variant */}
                <div className="text-center">
                  <div className="bg-slate-100 p-6 rounded-lg border border-slate-200 mb-2 flex items-center justify-center min-h-[120px]">
                    <LogoComponent variant="secondary" size="lg" />
                  </div>
                  <p className="text-sm text-slate-600">Secondary</p>
                </div>

                {/* Monochrome Variant */}
                <div className="text-center">
                  <div className="bg-slate-900 p-6 rounded-lg border border-slate-200 mb-2 flex items-center justify-center min-h-[120px]">
                    <LogoComponent variant="mono" size="lg" className="invert" />
                  </div>
                  <p className="text-sm text-slate-600">Monochrome (Dark BG)</p>
                </div>

                {/* Gradient Variant */}
                <div className="text-center">
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-lg border border-slate-200 mb-2 flex items-center justify-center min-h-[120px]">
                    <LogoComponent variant="gradient" size="lg" animated />
                  </div>
                  <p className="text-sm text-slate-600">Gradient (Animated)</p>
                </div>
              </div>

              {/* Size Variations */}
              <div className="mt-8 pt-8 border-t border-slate-200">
                <h3 className="text-sm font-semibold text-slate-700 mb-4">Size Variations</h3>
                <div className="flex items-end gap-8">
                  <div className="text-center">
                    <LogoComponent size="sm" />
                    <p className="text-xs text-slate-500 mt-2">Small</p>
                  </div>
                  <div className="text-center">
                    <LogoComponent size="md" />
                    <p className="text-xs text-slate-500 mt-2">Medium</p>
                  </div>
                  <div className="text-center">
                    <LogoComponent size="lg" />
                    <p className="text-xs text-slate-500 mt-2">Large</p>
                  </div>
                  <div className="text-center">
                    <LogoComponent size="xl" />
                    <p className="text-xs text-slate-500 mt-2">Extra Large</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};