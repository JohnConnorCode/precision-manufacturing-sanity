import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // Base styling - clean, professional with dark mode
      "rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-white",
      // Premium shadow system - subtle at rest, elevated on hover
      "shadow-sm hover:shadow-xl dark:shadow-slate-950/50",
      // Smooth transition for all states
      "transition-all duration-300 ease-out",
      // Subtle border that refines on hover
      "border-slate-200/80 dark:border-slate-800 hover:border-slate-300/80 dark:hover:border-slate-700",
      // Micro-interaction: gentle lift on hover
      "hover:-translate-y-0.5",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-xl font-bold leading-tight tracking-tight text-slate-900",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-slate-600 leading-relaxed", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

// Premium Card Variants for different use cases

/**
 * Interactive Card - For clickable cards with enhanced hover states
 */
const CardInteractive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-white",
      "shadow-sm hover:shadow-2xl dark:shadow-slate-950/50",
      "transition-all duration-300 ease-out",
      "border-slate-200/60 dark:border-slate-800 hover:border-blue-500/30 dark:hover:border-blue-500/30",
      "hover:-translate-y-1 hover:scale-[1.01]",
      "cursor-pointer",
      // Subtle blue glow on hover
      "hover:ring-1 hover:ring-blue-500/10",
      className
    )}
    {...props}
  />
))
CardInteractive.displayName = "CardInteractive"

/**
 * Feature Card - For prominent feature showcases
 */
const CardFeature = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-2xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-white",
      "shadow-md hover:shadow-2xl dark:shadow-slate-950/50",
      "transition-all duration-400 ease-out",
      "border-slate-200/50 dark:border-slate-800 hover:border-blue-500/20",
      "hover:-translate-y-1.5",
      // Premium inner glow
      "relative overflow-hidden",
      "before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-500/5 before:to-indigo-500/5 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
      className
    )}
    {...props}
  />
))
CardFeature.displayName = "CardFeature"

/**
 * Glass Card - For dark backgrounds with glassmorphism
 */
const CardGlass = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border text-white",
      "bg-white/5 backdrop-blur-xl",
      "border-white/10 hover:border-white/20",
      "shadow-lg shadow-black/5",
      "transition-all duration-300 ease-out",
      "hover:-translate-y-0.5 hover:bg-white/10",
      className
    )}
    {...props}
  />
))
CardGlass.displayName = "CardGlass"

/**
 * Highlight Card - For featured/promoted content with accent border
 */
const CardHighlight = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { accentColor?: string }
>(({ className, accentColor = "blue", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border-2 bg-white text-slate-900",
      "shadow-lg hover:shadow-2xl",
      "transition-all duration-300 ease-out",
      "hover:-translate-y-1",
      // Dynamic accent border
      accentColor === "blue" && "border-blue-500/50 hover:border-blue-500",
      accentColor === "indigo" && "border-indigo-500/50 hover:border-indigo-500",
      accentColor === "emerald" && "border-emerald-500/50 hover:border-emerald-500",
      className
    )}
    {...props}
  />
))
CardHighlight.displayName = "CardHighlight"

/**
 * Minimal Card - Clean, no frills design
 */
const CardMinimal = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg bg-slate-50 text-slate-900",
      "transition-all duration-200",
      "hover:bg-slate-100",
      className
    )}
    {...props}
  />
))
CardMinimal.displayName = "CardMinimal"

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardInteractive,
  CardFeature,
  CardGlass,
  CardHighlight,
  CardMinimal
}
