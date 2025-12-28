'use client';

import { motion } from 'framer-motion';
import { LucideIcon, FileX2, Inbox, FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
  };
  variant?: 'default' | 'minimal' | 'card';
  className?: string;
}

const iconVariants = {
  initial: { scale: 0.8, opacity: 0, y: 20 },
  animate: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 200,
      damping: 20
    }
  }
};

const contentVariants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2,
      duration: 0.5
    }
  }
};

const pulseRingVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.2, 0.1, 0.2],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut' as const
    }
  }
};

export default function EmptyState({
  icon: Icon = FolderOpen,
  title,
  description,
  action,
  variant = 'default',
  className
}: EmptyStateProps) {
  const containerClasses = cn(
    'flex flex-col items-center justify-center text-center py-16 px-6',
    variant === 'card' && 'bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm',
    variant === 'minimal' && 'py-8',
    className
  );

  return (
    <div className={containerClasses}>
      {/* Animated Icon Container */}
      <div className="relative mb-8">
        {/* Pulse rings */}
        <motion.div
          variants={pulseRingVariants}
          initial="initial"
          animate="animate"
          className="absolute inset-0 rounded-full bg-blue-500/20 dark:bg-blue-400/20"
          style={{ width: '120px', height: '120px', left: '-10px', top: '-10px' }}
        />

        {/* Icon background */}
        <motion.div
          variants={iconVariants}
          initial="initial"
          animate="animate"
          className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center shadow-lg"
        >
          <Icon className="w-10 h-10 text-slate-400 dark:text-slate-500" strokeWidth={1.5} />

          {/* Decorative corner accent */}
          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30" />
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        variants={contentVariants}
        initial="initial"
        animate="animate"
        className="max-w-md"
      >
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
          {title}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
          {description}
        </p>

        {action && (
          <Button
            asChild
            variant="outline"
            className="group hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-300"
          >
            <Link href={action.href}>
              {action.label}
              <svg
                className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </Button>
        )}
      </motion.div>
    </div>
  );
}

// Preset empty states for common scenarios
export function NoServicesState() {
  return (
    <EmptyState
      icon={Inbox}
      title="No services available"
      description="We're currently updating our service offerings. Please check back soon or contact us directly for information about our capabilities."
      action={{
        label: 'Contact Us',
        href: '/contact'
      }}
    />
  );
}

export function NoIndustriesState() {
  return (
    <EmptyState
      icon={FolderOpen}
      title="No industries listed"
      description="Industry information is being updated. Reach out to learn about the sectors we serve and how we can support your manufacturing needs."
      action={{
        label: 'Get in Touch',
        href: '/contact'
      }}
    />
  );
}

export function NoResourcesState() {
  return (
    <EmptyState
      icon={FileX2}
      title="No resources found"
      description="Our knowledge base is being expanded with new technical guides and resources. Check back soon for expert insights on precision manufacturing."
      action={{
        label: 'View Services',
        href: '/services'
      }}
    />
  );
}
