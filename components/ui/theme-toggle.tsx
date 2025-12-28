'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon, Monitor } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ThemeToggleProps {
  variant?: 'icon' | 'dropdown'
  className?: string
}

export function ThemeToggle({ variant = 'icon', className }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // Prevent hydration mismatch - render placeholder until mounted
  if (!mounted) {
    return (
      <div
        className={cn(
          variant === 'icon' ? 'w-10 h-10' : 'w-[120px] h-10',
          className
        )}
        aria-hidden="true"
      />
    )
  }

  const isDark = resolvedTheme === 'dark'

  if (variant === 'icon') {
    return (
      <button
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        className={cn(
          'w-10 h-10 rounded-lg flex items-center justify-center',
          'hover:bg-slate-100 dark:hover:bg-slate-800',
          'transition-colors duration-200',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
          'dark:focus-visible:ring-offset-slate-950',
          className
        )}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={isDark ? 'dark' : 'light'}
            initial={{ y: -10, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 10, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.15 }}
          >
            {isDark ? (
              <Moon className="h-5 w-5 text-slate-400" />
            ) : (
              <Sun className="h-5 w-5 text-slate-600" />
            )}
          </motion.div>
        </AnimatePresence>
      </button>
    )
  }

  // Dropdown variant with all three options
  return (
    <div className={cn(
      'flex items-center gap-1 p-1 rounded-lg',
      'bg-slate-100 dark:bg-slate-800',
      className
    )}>
      {[
        { value: 'light', icon: Sun, label: 'Light mode' },
        { value: 'dark', icon: Moon, label: 'Dark mode' },
        { value: 'system', icon: Monitor, label: 'System preference' },
      ].map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={cn(
            'p-2 rounded-md transition-all duration-200',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
            theme === value
              ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400'
              : 'hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400'
          )}
          aria-label={label}
          aria-pressed={theme === value}
        >
          <Icon className="h-4 w-4" />
        </button>
      ))}
    </div>
  )
}
