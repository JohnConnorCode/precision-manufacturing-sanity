'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AlertTriangle, RefreshCw, Home, Mail } from 'lucide-react'
import { typography, cn } from '@/lib/design-system'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error in development only
    if (process.env.NODE_ENV === 'development') {
      console.error('Application error:', error)
    }
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 px-4">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.03)_0%,_transparent_50%)]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-md w-full"
      >
        <Card className="p-8 md:p-10 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6 flex justify-center"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-2xl flex items-center justify-center border border-red-500/20">
              <AlertTriangle className="w-10 h-10 text-red-500" />
            </div>
          </motion.div>

          <h1 className={cn(typography.h3, 'mb-3')}>
            Something went wrong
          </h1>

          <p className={cn(typography.body, 'mb-6')}>
            We apologize for the inconvenience. An unexpected error has occurred.
          </p>

          {process.env.NODE_ENV === 'development' && error.message && (
            <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-left">
              <p className="text-xs font-mono text-slate-600 dark:text-slate-400 break-all">
                {error.message}
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => reset()}
              className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/25"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try again
            </Button>
            <Button
              onClick={() => window.location.href = '/'}
              variant="outline"
            >
              <Home className="w-4 h-4 mr-2" />
              Go to homepage
            </Button>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
            <p className={cn(typography.small, 'text-slate-500')}>
              Need help?{' '}
              <a
                href="/contact"
                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors inline-flex items-center gap-1"
              >
                <Mail className="w-3 h-3" />
                Contact support
              </a>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
