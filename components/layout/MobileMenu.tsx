"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Phone, Mail, ArrowRight } from 'lucide-react';
import Logo from '@/components/ui/logo';
import { PremiumButton } from '@/components/ui/premium-button';
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
  logoData?: Record<string, unknown>;
}

// Animation variants defined outside component to prevent recreation on render
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
  exit: {
    x: '100%',
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 40,
    }
  }
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

const isValidHref = (href?: string) => href && href !== '#' && href !== '/';

export default function MobileMenu({
  isOpen,
  onClose,
  navigation,
  cta,
  topBar,
  logoData,
}: MobileMenuProps) {
  const pathname = usePathname();
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const toggleExpanded = (name: string) => {
    setExpandedItem(expandedItem === name ? null : name);
  };

  // Handle Escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  // Focus trap
  const handleTabKey = useCallback((e: KeyboardEvent) => {
    if (e.key !== 'Tab' || !menuRef.current) return;

    const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement?.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement?.focus();
    }
  }, []);

  // Lock body scroll and manage focus when menu opens/closes
  useEffect(() => {
    if (isOpen) {
      // Store previously focused element
      previousActiveElement.current = document.activeElement as HTMLElement;

      // Lock body scroll
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';

      // Focus close button after animation
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);

      // Add keyboard listeners
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('keydown', handleTabKey);
    } else {
      // Restore body scroll
      document.body.style.overflow = '';
      document.body.style.touchAction = '';

      // Return focus to previous element
      previousActiveElement.current?.focus();

      // Remove keyboard listeners
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keydown', handleTabKey);

      // Reset expanded state
      setExpandedItem(null);
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [isOpen, handleKeyDown, handleTabKey]);

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
            ref={menuRef}
            initial="closed"
            animate="open"
            exit="exit"
            variants={menuVariants}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            className="fixed inset-0 z-[201] lg:hidden flex flex-col bg-white dark:bg-slate-950"
            style={{
              paddingTop: 'env(safe-area-inset-top)',
              paddingBottom: 'env(safe-area-inset-bottom)',
              paddingLeft: 'env(safe-area-inset-left)',
              paddingRight: 'env(safe-area-inset-right)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 h-20 border-b border-slate-200 dark:border-slate-800 flex-shrink-0">
              <Link href="/" onClick={onClose} className="flex items-center">
                <Logo
                  className="h-10 w-auto"
                  logoData={logoData}
                  animated={false}
                  variant="default"
                />
              </Link>

              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950"
                aria-label="Close menu"
              >
                <X className="w-6 h-6 text-slate-900 dark:text-white" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-6 py-6 overscroll-contain" aria-label="Mobile navigation">
              <ul className="space-y-1" role="list">
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
                            aria-expanded={isExpanded}
                            aria-controls={`submenu-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                            className={cn(
                              "w-full flex items-center justify-between px-4 py-4 rounded-xl text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset",
                              isActive
                                ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400"
                                : "text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50"
                            )}
                          >
                            <span className="text-lg font-semibold">{item.name}</span>
                            <motion.div
                              animate={{ rotate: isExpanded ? 90 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronRight className="w-5 h-5 text-slate-400" aria-hidden="true" />
                            </motion.div>
                          </button>

                          {/* Children */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                id={`submenu-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                                initial="closed"
                                animate="open"
                                exit="closed"
                                variants={childVariants}
                                className="overflow-hidden"
                              >
                                <ul className="pt-2 pb-3 pl-4 space-y-1" role="list">
                                  {/* View All link */}
                                  {isValidHref(href) && (
                                    <li>
                                      <Link
                                        href={href}
                                        onClick={onClose}
                                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-blue-600 dark:text-blue-400 font-medium hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                                      >
                                        <span>View All {item.name}</span>
                                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                                      </Link>
                                    </li>
                                  )}
                                  {/* Child items */}
                                  {children.map((child) => (
                                    <li key={child.name}>
                                      <Link
                                        href={isValidHref(child.href) ? child.href : href}
                                        onClick={onClose}
                                        className={cn(
                                          "block px-4 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset",
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
                                    </li>
                                  ))}
                                </ul>
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
                            "flex items-center px-4 py-4 rounded-xl text-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset",
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

            {/* Footer - Compact */}
            <div className="border-t border-slate-200 dark:border-slate-800 px-6 py-4 bg-slate-50 dark:bg-slate-900/50 flex-shrink-0">
              {/* CTA Button */}
              {cta && cta.text && (
                <Link href={cta.href || '/contact'} onClick={onClose} className="block mb-3">
                  <PremiumButton className="w-full h-12 text-base font-semibold">
                    {cta.text}
                    <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                  </PremiumButton>
                </Link>
              )}

              {/* Contact row - compact inline */}
              {topBar && (topBar.showPhone !== false || topBar.showEmail !== false) && (
                <div className="flex items-center justify-center gap-6 text-sm text-slate-600 dark:text-slate-400">
                  {topBar.showPhone !== false && topBar.phone && (
                    <a
                      href={topBar.phoneLink}
                      className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      aria-label={`Call ${topBar.phone}`}
                    >
                      <Phone className="w-4 h-4" aria-hidden="true" />
                      <span>{topBar.phone}</span>
                    </a>
                  )}
                  {topBar.showEmail !== false && topBar.email && (
                    <a
                      href={topBar.emailLink}
                      className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      aria-label={`Email ${topBar.email}`}
                    >
                      <Mail className="w-4 h-4" aria-hidden="true" />
                      <span className="truncate max-w-[140px]">{topBar.email}</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
