import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Primary - Premium gradient with glow
        default:
          "bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 hover:from-blue-500 hover:via-blue-400 hover:to-indigo-500 active:scale-[0.98]",

        // Destructive - Red gradient with glow
        destructive:
          "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/25 hover:shadow-xl hover:shadow-red-600/30 hover:from-red-500 hover:to-rose-500 active:scale-[0.98]",

        // Outline - Clean border with subtle fill on hover
        outline:
          "border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/30 active:scale-[0.98]",

        // Secondary - Subtle background with depth
        secondary:
          "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200/80 dark:hover:bg-slate-700 shadow-sm hover:shadow-md active:scale-[0.98]",

        // Ghost - Minimal, text-only feel
        ghost:
          "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800 active:scale-[0.98]",

        // Link - Underline style
        link:
          "text-blue-600 underline-offset-4 hover:underline hover:text-blue-700",

        // Premium - Extra fancy with shimmer-ready styling
        premium:
          "bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white shadow-xl shadow-blue-600/30 hover:shadow-2xl hover:shadow-blue-600/40 hover:from-blue-500 hover:via-blue-400 hover:to-indigo-500 active:scale-[0.98] relative overflow-hidden",

        // Glass - Glassmorphism effect for dark backgrounds
        glass:
          "bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-white/30 active:scale-[0.98]",

        // Success - Green gradient
        success:
          "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/25 hover:shadow-xl hover:shadow-emerald-600/30 hover:from-emerald-500 hover:to-teal-500 active:scale-[0.98]",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        default: "h-11 px-6 text-sm",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
