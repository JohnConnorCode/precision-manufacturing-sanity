'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { PremiumButton } from '@/components/ui/premium-button'
import { Card } from '@/components/ui/card'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'
import { typography } from '@/lib/design-system'
import { cn } from '@/lib/utils'
import { usePrefersReducedMotion } from '@/lib/motion'
import { useErrorPageData } from '@/components/layout/SiteChrome'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const errorData = useErrorPageData()

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.error('Site error:', error)
    }
  }, [error])

  const noMotion = { initial: undefined, animate: undefined, transition: undefined }
  const fadeIn = (delay = 0) => prefersReducedMotion ? noMotion : {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay },
  }
  const scaleIn = (delay = 0) => prefersReducedMotion ? noMotion : {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.5, delay },
  }
  const fadeOnly = (delay = 0) => prefersReducedMotion ? noMotion : {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5, delay },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(239,68,68,0.05)_0%,_transparent_50%)]" />

      <motion.div
        {...fadeIn()}
        className="relative z-10 max-w-md w-full"
      >
        <Card className="p-8 md:p-10 text-center bg-slate-900/50 border-slate-800">
          <motion.div
            {...scaleIn(0.2)}
            className="mb-6 flex justify-center"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center border border-red-500/30">
              <AlertTriangle className="w-10 h-10 text-red-400" />
            </div>
          </motion.div>

          <motion.div
            {...fadeOnly(0.3)}
          >
            <h1 className={cn(typography.h3, 'text-tone-inverse mb-3')}>
              {errorData?.heading || 'Something went wrong'}
            </h1>

            <p className={cn(typography.body, 'text-slate-400 mb-6')}>
              {errorData?.description || 'We encountered an unexpected error. Please try again or return to the homepage.'}
            </p>
          </motion.div>

          {process.env.NODE_ENV === 'development' && error.message && (
            <motion.div
              {...fadeOnly(0.4)}
              className="mb-6 p-4 bg-slate-800/50 rounded-xl border border-slate-700 text-left"
            >
              <p className="text-xs font-mono text-red-400 break-all">
                {error.message}
              </p>
            </motion.div>
          )}

          <motion.div
            {...fadeIn(0.5)}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <PremiumButton onClick={() => reset()}>
              <RefreshCw className="w-4 h-4 mr-2" />
              {errorData?.tryAgainButtonText || 'Try again'}
            </PremiumButton>
            <Link href="/">
              <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800">
                <Home className="w-4 h-4 mr-2" />
                {errorData?.homeButtonText || 'Back to Homepage'}
              </Button>
            </Link>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  )
}
