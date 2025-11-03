"use client";

import { motion } from 'framer-motion';
import { PremiumButton } from '@/components/ui/premium-button';
import { ArrowRight, FileText, Shield, Award, Activity } from 'lucide-react';
import Link from 'next/link';

interface CTAData {
  title?: string;
  subtitle?: string;
  buttons?: Array<{
    text: string;
    href: string;
    variant: 'default' | 'secondary';
    enabled?: boolean;
  }>;
}

interface CTAProps {
  data?: CTAData;
}

export default function CTA({ data }: CTAProps) {
  const title = data?.title || 'Start Your Precision Manufacturing Project';
  const subtitle = data?.subtitle || 'From prototype to production, we deliver AS9100D-certified precision components with tolerances to ±0.0001" for aerospace, defense, and medical applications.';
  const buttons = (data?.buttons || [
    { text: 'Get Quote', href: '/contact', variant: 'default' as const },
    { text: 'Technical Specifications', href: '/compliance/supplier-requirements', variant: 'secondary' as const }
  ]).filter(button => button.enabled !== false);

  return (
    <section className="relative py-24 overflow-hidden bg-slate-950">
      {/* Simplified background - subtle grid + accent */}
      <div className="absolute inset-0">
        {/* Subtle static grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(0deg, transparent 49%, rgba(59, 130, 246, 0.5) 50%, transparent 51%), linear-gradient(90deg, transparent 49%, rgba(59, 130, 246, 0.5) 50%, transparent 51%)`,
          backgroundSize: '50px 50px',
        }} />

        {/* Subtle accent glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full filter blur-3xl" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Precision indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-blue-600/20 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 backdrop-blur-sm"
          >
            <Activity className="w-4 h-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500" />
            <span className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">30 Years of Aerospace Excellence</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {title}
          </h2>

          <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {buttons.map((button, index) => (
              <Link key={index} href={button.href}>
                <PremiumButton size="lg" variant={button.variant}>
                  {index === 0 && <ArrowRight className="mr-2 h-5 w-5 transition-transform group-hover:translate-x-1" />}
                  {index === 1 && <FileText className="mr-2 h-5 w-5" />}
                  {button.text}
                  {index === 0 && <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />}
                </PremiumButton>
              </Link>
            ))}
          </div>

          {/* Certification badges with subtle animation */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <div className="relative">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <motion.div
                  className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full"
                  animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <span className="text-sm font-medium text-slate-300">24/7 Production</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <Shield className="w-4 h-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500" />
              <span className="text-sm font-medium text-slate-300">ITAR Registered</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="group flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <Award className="w-4 h-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500" />
              <span className="text-sm font-medium text-slate-300">AS9100D</span>
            </motion.div>
          </div>

          {/* Client trust indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-12 flex justify-center"
          >
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Trusted by leading</span>
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">aerospace & defense</span>
              <span>contractors worldwide</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}