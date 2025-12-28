"use client";

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  /** Show home icon for first item */
  showHomeIcon?: boolean;
  /** Visual variant */
  variant?: 'default' | 'dark' | 'transparent';
}

export function Breadcrumb({
  items,
  className,
  showHomeIcon = true,
  variant = 'default',
}: BreadcrumbProps) {
  if (!items || items.length === 0) return null;

  const variantStyles = {
    default: {
      container: 'bg-slate-50 dark:bg-slate-900/50',
      text: 'text-slate-600 dark:text-slate-400',
      link: 'text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400',
      active: 'text-slate-900 dark:text-white',
      separator: 'text-slate-400 dark:text-slate-600',
    },
    dark: {
      container: 'bg-transparent',
      text: 'text-slate-400',
      link: 'text-slate-400 hover:text-white',
      active: 'text-white',
      separator: 'text-slate-600',
    },
    transparent: {
      container: 'bg-transparent',
      text: 'text-slate-600 dark:text-slate-400',
      link: 'text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400',
      active: 'text-slate-900 dark:text-white',
      separator: 'text-slate-400 dark:text-slate-600',
    },
  };

  const styles = variantStyles[variant];

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('py-3 px-4 rounded-lg', styles.container, className)}
    >
      <ol
        className="flex items-center flex-wrap gap-1 text-sm"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isFirst = index === 0;

          return (
            <li
              key={item.href || item.label}
              className="flex items-center"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {/* Separator */}
              {index > 0 && (
                <ChevronRight
                  className={cn('w-4 h-4 mx-1.5 flex-shrink-0', styles.separator)}
                  aria-hidden="true"
                />
              )}

              {/* Breadcrumb item */}
              {isLast || !item.href ? (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    'font-medium truncate max-w-[200px]',
                    isLast ? styles.active : styles.text
                  )}
                  itemProp="name"
                  aria-current={isLast ? 'page' : undefined}
                >
                  {isFirst && showHomeIcon ? (
                    <span className="flex items-center gap-1.5">
                      <Home className="w-4 h-4" aria-hidden="true" />
                      <span className="sr-only sm:not-sr-only">{item.label}</span>
                    </span>
                  ) : (
                    item.label
                  )}
                </motion.span>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      'font-medium transition-colors duration-200 truncate max-w-[200px] inline-flex items-center gap-1.5',
                      styles.link
                    )}
                    itemProp="item"
                  >
                    {isFirst && showHomeIcon && (
                      <Home className="w-4 h-4" aria-hidden="true" />
                    )}
                    <span itemProp="name" className={isFirst && showHomeIcon ? 'sr-only sm:not-sr-only' : ''}>
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              )}

              {/* Schema.org position */}
              <meta itemProp="position" content={String(index + 1)} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/**
 * Generate breadcrumb items from a path
 * @example generateBreadcrumbsFromPath('/services/cnc-machining', { 'cnc-machining': 'CNC Machining' })
 */
export function generateBreadcrumbsFromPath(
  path: string,
  labelOverrides: Record<string, string> = {}
): BreadcrumbItem[] {
  const segments = path.split('/').filter(Boolean);
  const items: BreadcrumbItem[] = [{ label: 'Home', href: '/' }];

  let currentPath = '';
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === segments.length - 1;

    // Format label: replace hyphens with spaces, capitalize words
    const defaultLabel = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    items.push({
      label: labelOverrides[segment] || defaultLabel,
      href: isLast ? undefined : currentPath,
    });
  });

  return items;
}

export default Breadcrumb;
