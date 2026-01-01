'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FileQuestion, BookOpen, ArrowRight, Home, ArrowLeft } from 'lucide-react'
import { typography, cn } from '@/lib/design-system'
import { getToneTypography } from '@/lib/typography'

export default function NotFound() {
  const darkTone = getToneTypography('dark')
  const suggestedResources = [
    { label: 'Manufacturing Processes', href: '/resources/manufacturing-processes' },
    { label: 'Quality & Compliance', href: '/resources/quality-compliance' },
    { label: 'Material Science', href: '/resources/material-science' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.05)_0%,_transparent_50%)]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-lg w-full"
      >
        <Card className="p-8 md:p-10 text-center bg-slate-900/50 border-slate-800">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6 flex justify-center"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-2xl flex items-center justify-center border border-blue-600/30">
              <FileQuestion className="w-12 h-12 text-blue-400" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 mb-2">
              404
            </h1>

            <h2 className={cn(typography.h3, darkTone.heading, 'mb-4')}>
              Resource Not Found
            </h2>

            <p className={cn(typography.body, 'text-slate-400 mb-8')}>
              The technical article you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 justify-center mb-8"
          >
            <Link href="/resources">
              <Button
                className={cn(
                  'bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-600/25 w-full sm:w-auto',
                  darkTone.heading
                )}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Browse All Resources
              </Button>
            </Link>
            <Button
              onClick={() => window.history.back()}
              variant="outline"
              className="border-slate-700 text-slate-300 hover:bg-slate-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go back
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="border-t border-slate-800 pt-6"
          >
            <p className={cn(typography.small, 'text-slate-500 mb-4')}>
              Explore our resource categories:
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {suggestedResources.map((resource) => (
                <Link
                  key={resource.href}
                  href={resource.href}
                  className="group inline-flex items-center gap-1 px-4 py-2 rounded-full bg-slate-800/50 hover:bg-blue-600/20 text-slate-400 hover:text-blue-400 text-sm font-medium transition-all duration-300 border border-slate-700 hover:border-blue-600/30"
                >
                  {resource.label}
                  <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </Link>
              ))}
            </div>
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
