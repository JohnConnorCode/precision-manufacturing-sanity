'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search, Phone } from 'lucide-react';
import { PremiumButton } from '@/components/ui/premium-button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a_1px,transparent_1px)] bg-[size:50px_50px] opacity-20" />
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full filter blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* 404 Text with gradient */}
          <h1 className="text-[150px] md:text-[200px] font-black leading-none">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 animate-pulse">
              404
            </span>
          </h1>

          {/* Error message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-8 space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Page Not Found
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              The precision you&apos;re looking for seems to be off by a few thousandths.
              This page doesn&apos;t exist, but our manufacturing excellence does.
            </p>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/">
              <PremiumButton size="lg">
                <Home className="mr-2 h-5 w-5" />
                Return Home
              </PremiumButton>
            </Link>

            <Link href="/services">
              <PremiumButton size="lg" variant="secondary">
                <Search className="mr-2 h-5 w-5" />
                Browse Services
              </PremiumButton>
            </Link>

            <a href="tel:+15032319093">
              <PremiumButton size="lg" variant="secondary">
                <Phone className="mr-2 h-5 w-5" />
                Call Support
              </PremiumButton>
            </a>
          </motion.div>

          {/* Helpful links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-16 p-8 bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800"
          >
            <h3 className="text-lg font-semibold text-white mb-6">
              Popular Pages
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { href: '/services/5-axis-machining', label: '5-Axis CNC Machining' },
                { href: '/industries/aerospace', label: 'Aerospace Solutions' },
                { href: '/services/metrology', label: 'Precision Metrology' },
                { href: '/contact', label: 'Request Quote' },
                { href: '/about', label: 'About IIS' },
                { href: '/industries/defense', label: 'Defense Manufacturing' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-slate-400 hover:text-blue-500 transition-colors duration-200 flex items-center justify-center gap-2 py-2"
                >
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Technical details (fun easter egg) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-8 text-xs text-slate-600 font-mono"
          >
            ERROR: TOLERANCE_EXCEEDED | ROUTE_NOT_FOUND | PRECISION_MISMATCH
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}