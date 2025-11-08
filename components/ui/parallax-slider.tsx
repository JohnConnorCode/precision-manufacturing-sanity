"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

interface ParallaxSliderProps {
  images: string[];
  interval?: number;
  className?: string;
}

export default function ParallaxSlider({
  images,
  interval = 8000,
  className = ''
}: ParallaxSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { scrollY } = useScroll();

  // Parallax effect - images move slower than scroll
  const y = useTransform(scrollY, [0, 1000], [0, -200]);
  const opacity = useTransform(scrollY, [0, 300, 500], [1, 0.8, 0.6]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 2.5,
            ease: [0.43, 0.13, 0.23, 0.96] as [number, number, number, number]
          }}
          style={{ y }}
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
        >
          <Image
            src={images[currentIndex]}
            alt="Manufacturing facility"
            fill
            className="object-cover"
            priority={currentIndex === 0}
            quality={85}
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Brand Overlay - Multiple gradient layers for depth */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity }}
      >
        {/* Primary gradient - Dark to transparent */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/70 to-slate-950/60" />

        {/* Secondary gradient - Radial for vignette effect */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-slate-950/30 to-slate-950/70" />

        {/* Accent gradient - Blue/Cyan tint */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-transparent to-blue-950/20 mix-blend-multiply" />

        {/* Top fade for navigation */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-950/90 to-transparent" />

        {/* Bottom fade for content */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-950/80 via-slate-950/60 to-transparent" />
      </motion.div>

      {/* Animated tech pattern overlay */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'linear'
        }}
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(6, 182, 212, 0.1) 2px,
              rgba(6, 182, 212, 0.1) 4px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(59, 130, 246, 0.1) 2px,
              rgba(59, 130, 246, 0.1) 4px
            )
          `,
          backgroundSize: '100px 100px',
        }}
      />

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1 transition-all duration-300 ${
              index === currentIndex
                ? 'w-8 bg-blue-600'
                : 'w-4 bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}