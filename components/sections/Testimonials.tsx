"use client";

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { usePrefersReducedMotion } from '@/lib/motion';
import { useAnimateInView, ANIM_STATES, ANIM_TRANSITION } from '@/lib/use-animate-in-view';

interface Testimonial {
  _id: string;
  quote: string;
  author: string;
  role?: string;
  company?: string;
  rating?: number;
}

interface TestimonialsProps {
  data?: Testimonial[];
}

export default function Testimonials({ data }: TestimonialsProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const sectionAnim = useAnimateInView<HTMLDivElement>();
  const [current, setCurrent] = useState(0);
  const [autoAdvanceKey, setAutoAdvanceKey] = useState(0);

  const testimonials = Array.isArray(data) ? data : [];

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % Math.max(testimonials.length, 1));
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + Math.max(testimonials.length, 1)) % Math.max(testimonials.length, 1));
  }, [testimonials.length]);

  // Reset auto-advance timer when user manually navigates
  const handleUserNav = useCallback((action: () => void) => {
    action();
    setAutoAdvanceKey((k) => k + 1);
  }, []);

  // Auto-advance every 8 seconds, resets on user interaction
  useEffect(() => {
    if (prefersReducedMotion || testimonials.length <= 1) return;
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, [next, prefersReducedMotion, testimonials.length, autoAdvanceKey]);

  if (testimonials.length === 0) return null;

  const testimonial = testimonials[current];

  // Get author initial for avatar
  const authorInitial = testimonial.author?.charAt(0)?.toUpperCase() || '?';

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
      {/* Top gradient divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.015)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Subtle accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/5 dark:bg-blue-600/5 rounded-full blur-[100px]" />

      <div className="container relative z-10">
        <div ref={sectionAnim.ref} className="max-w-4xl mx-auto text-center">
          {/* Section Label */}
          <motion.p
            initial={prefersReducedMotion ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
            animate={sectionAnim.shouldAnimate ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
            transition={prefersReducedMotion ? { duration: 0 } : ANIM_TRANSITION}
            className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em] mb-12"
          >
            Client Testimonials
          </motion.p>

          {/* Large Decorative Quotation Marks */}
          <motion.div
            initial={prefersReducedMotion ? ANIM_STATES.fadeIn.animate : ANIM_STATES.fadeIn.initial}
            animate={sectionAnim.shouldAnimate ? ANIM_STATES.fadeIn.animate : ANIM_STATES.fadeIn.initial}
            transition={{ ...ANIM_TRANSITION, delay: prefersReducedMotion ? 0 : 0.1 }}
            className="relative"
          >
            {/* Oversized decorative quote mark behind content */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[160px] md:text-[200px] font-serif leading-none text-blue-600/[0.07] dark:text-blue-400/[0.07] select-none pointer-events-none" aria-hidden="true">
              &ldquo;
            </div>
          </motion.div>

          {/* Testimonial Content */}
          <div className="min-h-[280px] flex items-center justify-center relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonial._id}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="relative z-10"
              >
                {/* Stars */}
                {testimonial.rating && (
                  <div className="flex justify-center gap-1 mb-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < testimonial.rating! ? 'text-yellow-500 fill-yellow-500 dark:text-yellow-400 dark:fill-yellow-400' : 'text-slate-300 dark:text-slate-700'}`}
                      />
                    ))}
                  </div>
                )}

                {/* Quote */}
                <blockquote className="text-2xl md:text-3xl lg:text-4xl font-serif italic font-light text-slate-700 dark:text-slate-200 leading-relaxed mb-8">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Gradient accent line */}
                <div className="w-16 h-0.5 mx-auto mb-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600" />

                {/* Author with initial avatar */}
                <div className="flex flex-col items-center">
                  {/* Avatar circle with gradient */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center mb-3 shadow-lg shadow-blue-600/20">
                    <span className="text-lg font-bold text-white">{authorInitial}</span>
                  </div>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">
                    {testimonial.author}
                  </p>
                  {(testimonial.role || testimonial.company) && (
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                      {[testimonial.role, testimonial.company].filter(Boolean).join(', ')}
                    </p>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          {testimonials.length > 1 && (
            <motion.div
              initial={prefersReducedMotion ? ANIM_STATES.fadeIn.animate : ANIM_STATES.fadeIn.initial}
              animate={sectionAnim.shouldAnimate ? ANIM_STATES.fadeIn.animate : ANIM_STATES.fadeIn.initial}
              transition={{ ...ANIM_TRANSITION, delay: prefersReducedMotion ? 0 : 0.3 }}
              className="flex items-center justify-center gap-6 mt-10"
            >
              <button
                onClick={() => handleUserNav(prev)}
                className="p-2 rounded-full border border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleUserNav(() => setCurrent(index))}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === current
                        ? 'bg-blue-600 dark:bg-blue-500 w-6'
                        : 'bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => handleUserNav(next)}
                className="p-2 rounded-full border border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Bottom gradient divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
    </section>
  );
}
