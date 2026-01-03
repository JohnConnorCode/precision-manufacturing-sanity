"use client"

import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { usePrefersReducedMotion } from "@/lib/motion"

const premiumButtonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/50 disabled:pointer-events-none disabled:opacity-50 overflow-hidden group",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-tone-inverse shadow-xl shadow-blue-600/25 hover:shadow-2xl hover:shadow-blue-600/40",
        secondary:
          "bg-white/10 text-tone-inverse border border-white/20 backdrop-blur-sm hover:bg-white/20 hover:border-white/30",
        ghost:
          "", // Gradient text handled via inline styles for WebKit compatibility
        destructive:
          "bg-gradient-to-r from-red-500 to-rose-600 text-tone-inverse shadow-xl shadow-red-500/25 hover:shadow-2xl hover:shadow-red-500/40",
      },
      size: {
        sm: "h-12 px-4 text-sm",
        default: "h-12 px-6 text-base",
        lg: "h-14 px-10 text-lg",
        xl: "h-16 px-12 text-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface PremiumButtonProps
  extends Omit<HTMLMotionProps<"button">, "animate" | "transition">,
    VariantProps<typeof premiumButtonVariants> {
  shimmer?: boolean
  magneticHover?: boolean
  ripple?: boolean
  loading?: boolean
  loadingText?: string
}

export const PremiumButton = React.forwardRef<
  HTMLButtonElement,
  PremiumButtonProps
>(({
  className,
  variant,
  size,
  shimmer = true,
  magneticHover: _magneticHover = false,
  ripple = false,
  loading = false,
  loadingText = "Loading...",
  children,
  onClick,
  disabled,
  ...props
}, ref) => {
  const [ripples, setRipples] = React.useState<{ x: number; y: number; id: number }[]>([])
  const prefersReducedMotion = usePrefersReducedMotion()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (loading) return;

    if (ripple) {
      const rect = event.currentTarget.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      const id = Date.now()

      setRipples(prev => [...prev, { x, y, id }])
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== id))
      }, 600)
    }

    onClick?.(event)
  }

  // Ghost variant uses inline styles for WebKit gradient text compatibility
  const ghostStyles: React.CSSProperties | undefined = variant === 'ghost' ? {
    background: 'linear-gradient(to right, #2563eb, #4f46e5)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  } : undefined;

  return (
    <motion.button
      ref={ref}
      className={cn(premiumButtonVariants({ variant, size, className }))}
      style={ghostStyles}
      whileHover={prefersReducedMotion ? {} : {
        scale: 1.01,
        transition: {
          duration: 0.2,
          ease: "easeOut"
        }
      }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.99 }}
      onClick={handleClick}
      disabled={disabled || loading}
      {...props}
    >
      {/* Shimmer effect - subtle, respects reduced motion */}
      {shimmer && !prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 -top-[2px] -bottom-[2px] opacity-0 group-hover:opacity-100"
          initial={{ x: "-100%", skewX: "-12deg" }}
          whileHover={{
            x: "200%",
            transition: {
              duration: 1,
              ease: "easeOut"
            }
          }}
        >
          <div className="h-full w-[50%] bg-gradient-to-r from-transparent via-white/15 to-transparent blur-sm" />
        </motion.div>
      )}

      {/* Ripple effects */}
      {ripples.map(({ x, y, id }) => (
        <motion.span
          key={id}
          className="absolute rounded-full bg-white/40 pointer-events-none"
          style={{
            left: x,
            top: y,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ width: 0, height: 0, opacity: 1 }}
          animate={{
            width: 200,
            height: 200,
            opacity: 0
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Gradient glow on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: variant === "default"
            ? "radial-gradient(circle at center, rgba(6,182,212,0.15) 0%, transparent 70%)"
            : variant === "destructive"
            ? "radial-gradient(circle at center, rgba(239,68,68,0.15) 0%, transparent 70%)"
            : "none"
        }}
      />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {loading ? (
          <>
            <motion.div
              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <span>{loadingText}</span>
          </>
        ) : (
          children as React.ReactNode
        )}
      </span>
    </motion.button>
  )
})

PremiumButton.displayName = "PremiumButton"