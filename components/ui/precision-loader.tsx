"use client"

import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '@/lib/motion'

interface PrecisionLoaderProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function PrecisionLoader({ size = 'md', className = '' }: PrecisionLoaderProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  // For reduced motion users, show a static loader indicator
  if (prefersReducedMotion) {
    return (
      <div className={`relative ${sizes[size]} ${className}`}>
        <div className="absolute inset-0 rounded-full border-2 border-slate-700">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full" />
        </div>
        <div className="absolute inset-2 rounded-full border border-blue-600/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1 h-1 bg-white rounded-full" />
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${sizes[size]} ${className}`}>
      {/* Outer ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-slate-700"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full" />
      </motion.div>

      {/* Inner ring */}
      <motion.div
        className="absolute inset-2 rounded-full border border-blue-600/30"
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-0.5 bg-blue-400 rounded-full" />
      </motion.div>

      {/* Center dot */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-1 h-1 bg-white rounded-full" />
      </motion.div>
    </div>
  )
}

interface DataPointProps {
  label: string
  value: string | number
  unit?: string
  precision?: number
  trend?: 'up' | 'down' | 'stable'
  className?: string
}

export function DataPoint({
  label,
  value,
  unit = '',
  precision = 2,
  trend,
  className = ''
}: DataPointProps) {
  const formattedValue = typeof value === 'number'
    ? value.toFixed(precision)
    : value

  const trendColors = {
    up: 'text-green-400',
    down: 'text-red-400',
    stable: 'text-slate-400'
  }

  const trendSymbols = {
    up: '▲',
    down: '▼',
    stable: '—'
  }

  return (
    <div className={`space-y-1 ${className}`}>
      <div className="text-xs text-slate-500 uppercase tracking-wider">{label}</div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-light text-white">
          {formattedValue}
        </span>
        {unit && (
          <span className="text-sm text-slate-400">{unit}</span>
        )}
        {trend && (
          <span className={`text-xs ml-2 ${trendColors[trend]}`}>
            {trendSymbols[trend]}
          </span>
        )}
      </div>
    </div>
  )
}

interface ProgressRingProps {
  value: number
  maxValue?: number
  size?: number
  strokeWidth?: number
  label?: string
  className?: string
}

export function ProgressRing({
  value,
  maxValue = 100,
  size = 120,
  strokeWidth = 8,
  label,
  className = ''
}: ProgressRingProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (value / maxValue) * circumference

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="stroke-slate-800 fill-none"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="stroke-blue-600 fill-none"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: prefersReducedMotion ? offset : circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{
            duration: prefersReducedMotion ? 0 : 1.5,
            ease: "easeInOut"
          }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-2xl font-light text-white">
          {value.toFixed(1)}%
        </div>
        {label && (
          <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">
            {label}
          </div>
        )}
      </div>
    </div>
  )
}