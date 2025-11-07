'use client';
import { constants } from '@/lib/design-system';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface SlideData {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
}

interface ParallaxSliderProProps {
  slides: SlideData[];
  interval?: number;
  className?: string;
  overlayIntensity?: 'light' | 'medium' | 'heavy';
}

export default function ParallaxSliderPro({
  slides,
  interval = constants.carousel.interval,
  className = '',
  overlayIntensity = 'medium'
}: ParallaxSliderProProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState<boolean[]>(new Array(slides.length).fill(false));
  const { scrollY } = useScroll();

  // Enhanced parallax with multiple layers
  const baseY = useTransform(scrollY, [0, 1000], [0, -300]);
  const overlayY = useTransform(scrollY, [0, 1000], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300, 600], [1, 0.8, 0.6]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, interval);

    return () => clearInterval(timer);
  }, [slides.length, interval]);

  const handleImageLoad = (index: number) => {
    setIsLoaded(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  const overlayIntensities = {
    light: {
      primary: 'from-slate-950/60 via-slate-950/40 to-slate-950/50',
      secondary: 'from-transparent via-slate-950/20 to-slate-950/60',
      accent: 'from-blue-950/10 via-transparent to-blue-950/10'
    },
    medium: {
      primary: 'from-slate-950/80 via-slate-950/60 to-slate-950/70',
      secondary: 'from-transparent via-slate-950/30 to-slate-950/70',
      accent: 'from-blue-950/20 via-transparent to-blue-950/20'
    },
    heavy: {
      primary: 'from-slate-950/90 via-slate-950/80 to-slate-950/85',
      secondary: 'from-transparent via-slate-950/50 to-slate-950/80',
      accent: 'from-blue-950/30 via-transparent to-blue-950/30'
    }
  };

  const overlays = overlayIntensities[overlayIntensity];

  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)}>
      {/* Image layers */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{
            duration: 2.5,
            ease: [0.43, 0.13, 0.23, 0.96]
          }}
          style={{ y: baseY }}
          className="absolute inset-0 w-full h-[130%] -top-[15%]"
        >
          {/* Blur background layer for depth */}
          <div className="absolute inset-0 scale-110">
            <Image
              src={slides[currentIndex].src}
              alt={slides[currentIndex].alt}
              fill
              className="object-cover blur-2xl opacity-50"
              priority={currentIndex === 0}
              quality={30}
            />
          </div>

          {/* Main image */}
          <div className="relative w-full h-full">
            {!isLoaded[currentIndex] && (
              <div className="absolute inset-0 bg-slate-900 animate-pulse" />
            )}
            <Image
              src={slides[currentIndex].src}
              alt={slides[currentIndex].alt}
              fill
              className={cn(
                "object-cover",
                isLoaded[currentIndex] ? 'opacity-100' : 'opacity-0',
                'transition-opacity duration-1000'
              )}
              priority={currentIndex === 0}
              quality={85}
              sizes="100vw"
              onLoadingComplete={() => handleImageLoad(currentIndex)}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Multi-layer gradient overlays */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity, y: overlayY }}
      >
        {/* Primary gradient */}
        <div className={cn('absolute inset-0 bg-gradient-to-b', overlays.primary)} />

        {/* Radial vignette */}
        <div className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at center, transparent 0%, rgba(15, 23, 42, 0.3) 50%, rgba(15, 23, 42, 0.7) 100%)`
          }}
        />

        {/* Accent gradient */}
        <div className={cn('absolute inset-0 bg-gradient-to-br mix-blend-multiply', overlays.accent)} />

        {/* Top/bottom fade */}
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-slate-950/90 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-slate-950/80 via-slate-950/60 to-transparent" />
      </motion.div>

      {/* Animated tech elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid pattern */}
        <motion.div
          className="absolute inset-0 opacity-[0.02]"
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 49px,
                rgba(6, 182, 212, 0.5) 49px,
                rgba(6, 182, 212, 0.5) 50px
              ),
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 49px,
                rgba(59, 130, 246, 0.5) 49px,
                rgba(59, 130, 246, 0.5) 50px
              )
            `,
            backgroundSize: '50px 50px',
          }}
        />

        {/* Scan lines */}
        <motion.div
          className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-600/20 to-transparent"
          animate={{
            top: ['-10%', '110%'],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'linear',
            repeatDelay: 2
          }}
        />

        <motion.div
          className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent"
          animate={{
            top: ['110%', '-10%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
            repeatDelay: 3
          }}
        />
      </div>

      {/* Slide indicators with labels */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
        <div className="flex items-center gap-3">
          {slides.map((slide, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="group relative"
              aria-label={`Go to slide ${index + 1}: ${slide.title || slide.alt}`}
            >
              <div className={cn(
                'h-1 transition-all duration-500',
                index === currentIndex
                  ? 'w-12 bg-blue-600'
                  : 'w-6 bg-white/30 hover:bg-white/50 hover:w-8'
              )} />

              {/* Tooltip on hover */}
              {slide.title && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900/90 rounded text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {slide.title}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content overlay for slide info */}
      <AnimatePresence mode="wait">
        {slides[currentIndex].title && (
          <motion.div
            key={`content-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-20 left-8 z-30"
          >
            <h3 className="text-sm font-medium text-blue-600 mb-1">
              {slides[currentIndex].subtitle}
            </h3>
            <h2 className="text-2xl font-bold text-white">
              {slides[currentIndex].title}
            </h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}