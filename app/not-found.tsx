'use client';

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FileQuestion, Home, ArrowLeft, ArrowRight } from 'lucide-react'
import { typography, cn } from '@/lib/design-system'

export default function NotFound() {
  const quickLinks = [
    { label: 'Services', href: '/services' },
    { label: 'Industries', href: '/industries' },
    { label: 'Resources', href: '/resources' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white px-4">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.03)_0%,_transparent_50%)]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-2xl w-full"
      >
        <Card className="p-8 md:p-12 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 flex justify-center"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-blue-600/10 to-indigo-600/10 rounded-2xl flex items-center justify-center border border-blue-600/20">
              <FileQuestion className="w-12 h-12 text-blue-600" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
              404
            </h1>

            <h2 className={cn(typography.h3, 'mb-4')}>
              Page Not Found
            </h2>

            <p className={cn(typography.body, 'mb-8 max-w-md mx-auto')}>
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
              Let&apos;s get you back on track.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
          >
            <Link href="/">
              <Button className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/25">
                <Home className="w-4 h-4 mr-2" />
                Go to homepage
              </Button>
            </Link>
            <Button
              onClick={() => window.history.back()}
              variant="outline"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go back
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="border-t border-slate-200 pt-8"
          >
            <p className={cn(typography.small, 'text-slate-500 mb-4')}>
              Looking for something specific?
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group inline-flex items-center gap-1 px-4 py-2 rounded-full bg-slate-100 hover:bg-blue-600 text-slate-600 hover:text-white text-sm font-medium transition-all duration-300"
                >
                  {link.label}
                  <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 pt-6 border-t border-slate-200"
          >
            <p className={cn(typography.small, 'text-slate-400')}>
              © {new Date().getFullYear()} IIS Precision Manufacturing
            </p>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  )
}
