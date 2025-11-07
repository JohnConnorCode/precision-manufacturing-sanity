'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { constants } from '@/lib/design-system';

interface ScrollToTopProps {
  threshold?: number;
  className?: string;
  smooth?: boolean;
}

export default function ScrollToTop({
  threshold = constants.scrollThreshold.scrollToTop,
  className,
  smooth = true,
}: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Calculate scroll progress
      const totalScroll = documentHeight - windowHeight;
      const progress = (scrolled / totalScroll) * 100;
      setScrollProgress(progress);

      // Show/hide button based on threshold
      setIsVisible(scrolled > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  const scrollToTop = () => {
    if (smooth) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo(0, 0);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className={cn(
            "fixed bottom-8 right-8 z-50",
            "w-12 h-12 rounded-full",
            "bg-gradient-to-br from-blue-600 to-indigo-600",
            "text-white shadow-lg hover:shadow-xl",
            "flex items-center justify-center",
            "group transition-all duration-300",
            "overflow-hidden",
            className
          )}
          aria-label="Scroll to top"
        >
          {/* Progress ring */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 48 48"
          >
            <circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="2"
            />
            <circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              stroke="rgba(255, 255, 255, 0.7)"
              strokeWidth="2"
              strokeDasharray={`${2 * Math.PI * 22}`}
              strokeDashoffset={`${2 * Math.PI * 22 * (1 - scrollProgress / 100)}`}
              className="transition-all duration-200"
            />
          </svg>

          {/* Arrow icon */}
          <motion.div
            animate={{
              y: [0, -3, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          >
            <ArrowUp className="w-5 h-5 relative z-10" />
          </motion.div>

          {/* Pulse effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-white"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [1, 2],
              opacity: [0.3, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeOut",
            }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}