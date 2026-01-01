'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AlertTriangle, RefreshCw, BookOpen, Home } from 'lucide-react'
import Link from 'next/link'
import { typography, cn } from '@/lib/design-system'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.error('Resources error:', error)
    }
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(239,68,68,0.05)_0%,_transparent_50%)]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-md w-full"
      >
        <Card className="p-8 md:p-10 text-center bg-slate-900/50 border-slate-800">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6 flex justify-center"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center border border-red-500/30">
              <AlertTriangle className="w-10 h-10 text-red-400" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h1 className={cn(typography.h3, 'text-tone-inverse mb-3')}>
              Something went wrong
            </h1>

            <p className={cn(typography.body, 'text-slate-400 mb-6')}>
              We encountered an error loading this resource. Please try again.
            </p>
          </motion.div>

          {process.env.NODE_ENV === 'development' && error.message && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-6 p-4 bg-slate-800/50 rounded-xl border border-slate-700 text-left"
            >
              <p className="text-xs font-mono text-red-400 break-all">
                {error.message}
              </p>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Button
              onClick={() => reset()}
              className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-tone-inverse shadow-lg shadow-blue-600/25"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try again
            </Button>
            <Link href="/resources">
              <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800">
                <BookOpen className="w-4 h-4 mr-2" />
                Back to Resources
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-6 pt-6 border-t border-slate-800"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-400 transition-colors"
            >
              <Home className="w-4 h-4" />
              Return to homepage
            </Link>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  )
}
