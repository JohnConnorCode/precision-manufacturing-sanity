'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface SlideData {
  src: string;
  alt: string;
  focal?: 'center' | 'top' | 'bottom';
}

interface HeroSliderFixedProps {
  slides: SlideData[];
  interval?: number;
  className?: string;
}

export default function HeroSliderFixed({
  slides,
  interval = 8000,
  className = ''
}: HeroSliderFixedProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [_imagesLoaded, setImagesLoaded] = useState(false);
  const [firstImageLoaded, setFirstImageLoaded] = useState(false);
  const { scrollY } = useScroll();

  // Smooth parallax effect
  const y = useTransform(scrollY, [0, 1000], [0, -150]);
  const scale = useTransform(scrollY, [0, 1000], [1, 1.15]);

  // Ensure client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Preload first image immediately
  useEffect(() => {
    if (!isClient || slides.length === 0) return;

    const firstImg = new window.Image();
    firstImg.onload = () => {
      setFirstImageLoaded(true);
    };
    firstImg.src = slides[0].src;
  }, [slides, isClient]);

  // Preload all images on mount
  useEffect(() => {
    if (!isClient) return;

    let loadedCount = 0;
    slides.forEach((slide, index) => {
      const img = new window.Image();
      img.onload = () => {
        loadedCount++;
        if (index === 0) {
          setFirstImageLoaded(true);
        }
        if (loadedCount === slides.length) {
          setImagesLoaded(true);
        }
      };
      img.src = slide.src;
    });
  }, [slides, isClient]);

  // Auto-advance slides only after first image is loaded
  useEffect(() => {
    if (!isClient || !firstImageLoaded) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, interval);

    return () => clearInterval(timer);
  }, [slides.length, interval, isClient, firstImageLoaded]);

  const getFocalPosition = (focal?: string) => {
    switch(focal) {
      case 'top': return 'object-top';
      case 'bottom': return 'object-bottom';
      default: return 'object-center';
    }
  };

  if (!isClient) {
    // Server-side: show first image statically
    return (
      <div className={cn('absolute inset-0 overflow-hidden', className)}>
        <div className="absolute inset-0 w-full h-[115%] -top-[7.5%] pointer-events-none">
          <div className="relative w-full h-full">
            <Image
              src={slides[0].src}
              alt={slides[0].alt}
              fill
              className={cn(
                "object-cover",
                getFocalPosition(slides[0].focal)
              )}
              priority
              quality={85}
              sizes="100vw"
            />
          </div>
        </div>

        {/* Gradient overlays matching service pages */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/80 to-slate-950/95 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/30 via-transparent to-blue-950/30 pointer-events-none" />
      </div>
    );
  }

  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)}>
      {/* Always show first image as base layer to prevent grey background */}
      <div className="absolute inset-0 w-full h-[115%] -top-[7.5%] pointer-events-none">
        <div className="relative w-full h-full">
          <Image
            src={slides[0].src}
            alt={slides[0].alt}
            fill
            className={cn(
              "object-cover",
              getFocalPosition(slides[0].focal)
            )}
            priority
            quality={100}
            sizes="100vw"
          />
        </div>
      </div>

      {/* Stack all images, only show current one */}
      {slides.map((slide, index) => (
        <motion.div
          key={`slide-${index}`}
          className="absolute inset-0 w-full h-[115%] -top-[7.5%] pointer-events-none"
          style={{ y, scale }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: index === currentIndex && firstImageLoaded ? 1 : 0,
            transition: {
              opacity: {
                duration: 1.5,
                ease: "easeInOut"
              }
            }
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className={cn(
                "object-cover",
                getFocalPosition(slide.focal)
              )}
              priority={index === 0}
              quality={85}
              sizes="100vw"
              loading={index === 0 ? "eager" : "lazy"}
            />

            {/* Subtle Ken Burns effect only on current image */}
            {index === currentIndex && (
              <motion.div
                className="absolute inset-0"
                animate={{
                  scale: [1, 1.08],
                }}
                transition={{
                  scale: {
                    duration: interval / 1000,
                    ease: "linear"
                  }
                }}
              />
            )}
          </div>
        </motion.div>
      ))}

      {/* Gradient overlays matching service pages */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/80 to-slate-950/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/30 via-transparent to-blue-950/30" />
      </div>

    </div>
  );
}