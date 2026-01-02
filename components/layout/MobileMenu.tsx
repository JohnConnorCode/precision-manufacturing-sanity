"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Phone, Mail, ArrowRight } from 'lucide-react';
import Logo from '@/components/ui/logo';
import { PremiumButton } from '@/components/ui/premium-button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { cn } from '@/lib/utils';

interface ChildMenuItem {
  name: string;
  href: string;
  description?: string;
  iconName?: string;
  openInNewTab?: boolean;
}

interface MenuItem {
  name: string;
  href: string;
  description?: string;
  children?: ChildMenuItem[];
  showInHeader?: boolean;
  iconName?: string;
  openInNewTab?: boolean;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: MenuItem[];
  cta?: { text: string; href: string } | null;
  topBar?: {
    phone?: string;
    phoneLink?: string;
    email?: string;
    emailLink?: string;
    showPhone?: boolean;
    showEmail?: boolean;
  } | null;
  logoData?: any;
  mounted: boolean;
}

export default function MobileMenu({
  isOpen,
  onClose,
  navigation,
  cta,
  topBar,
  logoData,
  mounted,
}: MobileMenuProps) {
  const pathname = usePathname();
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const isValidHref = (href?: string) => href && href !== '#' && href !== '/';

  const toggleExpanded = (name: string) => {
    setExpandedItem(expandedItem === name ? null : name);
  };

  // Animation variants
  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  };

  const menuVariants = {
    closed: { x: '100%' },
    open: {
      x: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 30,
      }
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 + i * 0.05,
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    }),
  };

  const childVariants = {
    closed: { height: 0, opacity: 0 },
    open: {
      height: 'auto',
      opacity: 1,
      transition: {
        height: { duration: 0.3 },
        opacity: { duration: 0.2, delay: 0.1 },
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] bg-slate-950/80 backdrop-blur-sm lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Menu Panel - Full Screen */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-[201] lg:hidden flex flex-col bg-white dark:bg-slate-950"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 h-20 border-b border-slate-200 dark:border-slate-800">
              <Link href="/" onClick={onClose} className="flex items-center">
                <Logo
                  className="h-10 w-auto"
                  logoData={logoData}
                  animated={false}
                  variant="default"
                />
              </Link>

              <button
                onClick={onClose}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6 text-slate-900 dark:text-white" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-6 py-8">
              <ul className="space-y-2">
                {navigation.map((item, index) => {
                  const children = Array.isArray(item.children) ? item.children : [];
                  const hasChildren = children.length > 0;
                  const href = isValidHref(item.href) ? item.href : '/';
                  const isExpanded = expandedItem === item.name;
                  const isActive = pathname === href || (hasChildren && children.some(c => pathname === c.href));

                  return (
                    <motion.li
                      key={item.name}
                      custom={index}
                      initial="closed"
                      animate="open"
                      variants={itemVariants}
                    >
                      {hasChildren ? (
                        <div>
                          {/* Parent with children - expandable */}
                          <button
                            onClick={() => toggleExpanded(item.name)}
                            className={cn(
                              "w-full flex items-center justify-between px-4 py-4 rounded-xl text-left transition-all duration-200",
                              isActive
                                ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400"
                                : "text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50"
                            )}
                          >
                            <span className="text-xl font-semibold">{item.name}</span>
                            <motion.div
                              animate={{ rotate: isExpanded ? 90 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronRight className="w-5 h-5 text-slate-400" />
                            </motion.div>
                          </button>

                          {/* Children */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial="closed"
                                animate="open"
                                exit="closed"
                                variants={childVariants}
                                className="overflow-hidden"
                              >
                                <div className="pt-2 pb-4 pl-4 space-y-1">
                                  {/* View All link */}
                                  {isValidHref(href) && (
                                    <Link
                                      href={href}
                                      onClick={onClose}
                                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-blue-600 dark:text-blue-400 font-medium hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors"
                                    >
                                      <span>View All {item.name}</span>
                                      <ArrowRight className="w-4 h-4" />
                                    </Link>
                                  )}
                                  {/* Child items */}
                                  {children.map((child) => (
                                    <Link
                                      key={child.name}
                                      href={isValidHref(child.href) ? child.href : href}
                                      onClick={onClose}
                                      className={cn(
                                        "block px-4 py-3 rounded-lg transition-colors",
                                        pathname === child.href
                                          ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
                                          : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white"
                                      )}
                                    >
                                      <span className="text-base font-medium">{child.name}</span>
                                      {child.description && (
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                                          {child.description}
                                        </p>
                                      )}
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        /* Simple link */
                        <Link
                          href={href}
                          onClick={onClose}
                          className={cn(
                            "flex items-center px-4 py-4 rounded-xl text-xl font-semibold transition-all duration-200",
                            isActive
                              ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400"
                              : "text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50"
                          )}
                        >
                          {item.name}
                        </Link>
                      )}
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            {/* Footer */}
            <div className="border-t border-slate-200 dark:border-slate-800 px-6 py-6 space-y-6 bg-slate-50 dark:bg-slate-900/50">
              {/* Theme Toggle */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Theme
                </span>
                {mounted && <ThemeToggle variant="dropdown" />}
              </div>

              {/* Contact Info */}
              {topBar && (topBar.showPhone !== false || topBar.showEmail !== false) && (
                <div className="flex flex-col sm:flex-row gap-3">
                  {topBar.showPhone !== false && topBar.phone && (
                    <a
                      href={topBar.phoneLink}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="font-medium">{topBar.phone}</span>
                    </a>
                  )}
                  {topBar.showEmail !== false && topBar.email && (
                    <a
                      href={topBar.emailLink}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="font-medium truncate">{topBar.email}</span>
                    </a>
                  )}
                </div>
              )}

              {/* CTA Button */}
              {cta && cta.text && (
                <Link href={cta.href || '/contact'} onClick={onClose} className="block">
                  <PremiumButton className="w-full h-14 text-lg font-semibold">
                    {cta.text}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </PremiumButton>
                </Link>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
