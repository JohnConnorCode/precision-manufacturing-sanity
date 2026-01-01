"use client"

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { usePrefersReducedMotion } from '@/lib/motion'
import { SafeMotion, stagger } from '@/components/ui/safe-motion'

interface AnimatedCounterProps {
  value: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
  style?: React.CSSProperties
  start?: boolean
}

export function AnimatedCounter({
  value,
  duration: _duration = 2,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
  style,
  start = true
}: AnimatedCounterProps) {
  const ref = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    damping: 100,
    stiffness: 100
  })
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [displayValue, setDisplayValue] = useState("0")

  useEffect(() => {
    if (isInView && start) {
      motionValue.set(value)
    }
  }, [motionValue, value, isInView, start])

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(latest.toFixed(decimals))
    })
    return unsubscribe
  }, [springValue, decimals])

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}
      <motion.span
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
      >
        {displayValue}
      </motion.span>
      {suffix}
    </span>
  )
}

interface StatsCounterProps {
  stats: {
    value: number
    label: string
    prefix?: string
    suffix?: string
    decimals?: number
  }[]
  className?: string
}

export function StatsCounter({ stats, className = "" }: StatsCounterProps) {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 ${className}`}>
      {stats.map((stat, index) => (
        <SafeMotion
          key={stat.label}
          y={prefersReducedMotion ? 0 : 30}
          delay={stagger(index, 100)}
          disabled={prefersReducedMotion}
          className="text-center"
        >
          <div className="text-4xl md:text-5xl font-black mb-2">
            <AnimatedCounter
              value={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              decimals={stat.decimals}
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400"
            />
          </div>
          <div className="text-sm text-slate-400 uppercase tracking-wider">
            {stat.label}
          </div>
        </SafeMotion>
      ))}
    </div>
  )
}