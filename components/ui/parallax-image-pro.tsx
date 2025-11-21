'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ParallaxImageProProps {
  src: string;
  alt: string;
  className?: string;
  overlayClassName?: string;
  speed?: number;
  scale?: boolean;
  blur?: boolean;
  gradient?: 'dark' | 'light' | 'blue' | 'none';
  priority?: boolean;
  fill?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  aspectRatio?: string;
}

export default function ParallaxImagePro({
  src,
  alt,
  className = '',
  overlayClassName = '',
  speed = 0.5,
  scale = true,
  blur = true,
  gradient = 'dark',
  priority = true,
  fill = true,
  objectFit = 'cover',
  aspectRatio
}: ParallaxImageProProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const isInView = useInView(containerRef, { once: true, margin: '100px' });

  // Call hooks unconditionally BEFORE early return
  const y = useTransform(scrollY, (value) => {
    if (!containerRef.current) return 0;
    const rect = containerRef.current.getBoundingClientRect();
    const offset = rect.top + window.scrollY;
    return (value - offset) * speed;
  });

  const scaleValue = useTransform(scrollY, (value) => {
    if (!containerRef.current || !scale) return 1;
    const rect = containerRef.current.getBoundingClientRect();
    const offset = rect.top + window.scrollY;
    const progress = Math.min(Math.max((value - offset) / rect.height, 0), 1);
    return 1 + progress * 0.1;
  });

  // Don't render if src is empty
  if (!src) return null;

  const gradients = {
    dark: 'bg-gradient-to-b from-slate-950/60 via-slate-950/20 to-slate-950/60',
    light: 'bg-gradient-to-b from-white/60 via-white/20 to-white/60',
    blue: 'bg-gradient-to-br from-blue-950/50 via-transparent to-blue-950/50',
    none: ''
  };

  const containerStyles = aspectRatio
    ? { aspectRatio, width: '100%' }
    : fill
    ? { position: 'absolute' as const, inset: 0 }
    : {};

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden', className)}
      style={containerStyles}
    >

      {/* Main image with parallax */}
      <motion.div
        className="relative w-full h-full"
        style={{
          y,
          scale: scaleValue,
          willChange: 'transform'
        }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: isInView ? 1 : 0,
        }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <div className={cn(
          'relative',
          fill ? 'w-full h-[120%] -top-[10%]' : 'w-full h-full'
        )}>
          {blur && (
            <Image
              src={src}
              alt={`${alt} (background)`}
              fill={fill}
              className={cn(
                'absolute inset-0 scale-110 blur-xl opacity-50',
                objectFit === 'cover' ? 'object-cover' : `object-${objectFit}`
              )}
              priority={priority}
              quality={30}
              loading={priority ? 'eager' : 'lazy'}
            />
          )}

          <Image
            src={src}
            alt={alt}
            fill={fill}
            className={cn(
              'relative z-10',
              objectFit === 'cover' ? 'object-cover' : `object-${objectFit}`
            )}
            priority={priority}
            quality={90}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            loading={priority ? 'eager' : 'lazy'}
          />
        </div>
      </motion.div>

      {/* Custom gradient overlay */}
      {gradient !== 'none' && (
        <div className={cn(
          'absolute inset-0 pointer-events-none z-20',
          gradients[gradient],
          overlayClassName
        )} />
      )}


    </div>
  );
}
