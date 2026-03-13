'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search, Phone, LucideIcon } from 'lucide-react';
import { PremiumButton } from '@/components/ui/premium-button';
import { usePrefersReducedMotion } from '@/lib/motion';
import { gradientTextStyle } from '@/lib/theme-utils';

// Icon mapping for CMS-driven action buttons
const iconMap: Record<string, LucideIcon> = {
  Home,
  Search,
  Phone,
};

interface PopularLink {
  href: string;
  label: string;
}

interface ActionButton {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary';
  iconName?: string;
}

interface SiteSettings {
  contact?: {
    phone?: string;
  };
}

interface ErrorPages {
  notFound?: {
    heading?: string;
    description?: string;
    actionButtons?: ActionButton[];
    popularLinksHeading?: string;
    popularLinks?: PopularLink[];
    errorCode?: string;
  };
}

interface NotFoundContentProps {
  siteSettings: SiteSettings | null;
  errorPages: ErrorPages | null;
}

export default function NotFoundContent({ siteSettings, errorPages }: NotFoundContentProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  // Use CMS action buttons, fall back to defaults if not configured yet
  const actionButtons: ActionButton[] = errorPages?.notFound?.actionButtons?.length
    ? errorPages.notFound.actionButtons
    : [
        { label: 'Return Home', href: '/', variant: 'primary', iconName: 'Home' },
        { label: 'Browse Services', href: '/services', variant: 'secondary', iconName: 'Search' },
        { label: 'Call Support', href: `tel:${siteSettings?.contact?.phone?.replace(/\D/g, '') || ''}`, variant: 'secondary', iconName: 'Phone' },
      ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a_1px,transparent_1px)] bg-[size:50px_50px] opacity-20" />
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl"
          animate={prefersReducedMotion ? {} : {
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
          animate={prefersReducedMotion ? {} : {
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
          initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
        >
          {/* 404 Text with gradient */}
          <h1 className="text-[150px] md:text-[200px] font-black leading-none">
            <span className={prefersReducedMotion ? '' : 'animate-pulse'} style={gradientTextStyle}>
              404
            </span>
          </h1>

          {/* Error message */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.2, duration: prefersReducedMotion ? 0 : 0.5 }}
            className="mt-8 space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-tone-inverse">
              {errorPages?.notFound?.heading}
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              {errorPages?.notFound?.description}
            </p>
          </motion.div>

          {/* Action buttons — labels, links, and icons from CMS */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.4, duration: prefersReducedMotion ? 0 : 0.5 }}
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
          >
            {actionButtons.map((button) => {
              const Icon = button.iconName ? iconMap[button.iconName] : undefined;
              const isPrimary = button.variant === 'primary';
              const href = button.href?.startsWith('tel:') && button.href === 'tel:'
                ? `tel:${siteSettings?.contact?.phone?.replace(/\D/g, '') || ''}`
                : button.href;
              const isExternal = href.startsWith('tel:') || href.startsWith('mailto:');

              const btn = (
                <PremiumButton size="lg" variant={isPrimary ? 'default' : 'secondary'}>
                  {Icon && <Icon className="mr-2 h-5 w-5" />}
                  {button.label}
                </PremiumButton>
              );

              return isExternal ? (
                <a key={button.label} href={href}>{btn}</a>
              ) : (
                <Link key={button.label} href={href}>{btn}</Link>
              );
            })}
          </motion.div>

          {/* Helpful links */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.6, duration: prefersReducedMotion ? 0 : 0.5 }}
            className="mt-16 p-8 bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800"
          >
            <h3 className="text-lg font-semibold text-tone-inverse mb-6">
              {errorPages?.notFound?.popularLinksHeading}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(errorPages?.notFound?.popularLinks || []).map((link: PopularLink) => (
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
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.8, duration: prefersReducedMotion ? 0 : 0.5 }}
            className="mt-8 text-xs text-slate-600 dark:text-slate-300 font-mono"
          >
            {errorPages?.notFound?.errorCode}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
