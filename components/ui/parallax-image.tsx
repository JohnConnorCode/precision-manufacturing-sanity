"use client";

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  scale?: boolean;
  opacity?: boolean;
  rotate?: boolean;
}

export default function ParallaxImage({
  src,
  alt,
  className = '',
  speed = 0.5,
  scale = true,
  opacity = false,
  rotate = false
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Don't render if src is empty
  if (!src) return null;

  const y = useTransform(scrollYProgress, [0, 1], [-100 * speed, 100 * speed]);
  const scaleProgress = useTransform(scrollYProgress, [0, 0.5, 1], scale ? [0.8, 1, 0.8] : [1, 1, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 0.5, 1], opacity ? [0.5, 1, 0.5] : [1, 1, 1]);
  const rotateProgress = useTransform(scrollYProgress, [0, 1], rotate ? [-5, 5] : [0, 0]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{
          y,
          scale: scaleProgress,
          opacity: opacityProgress,
          rotate: rotateProgress
        }}
        className="relative w-full h-full"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </motion.div>
    </div>
  );
}