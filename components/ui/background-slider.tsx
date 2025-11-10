"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface BackgroundSliderProps {
  images: string[];
  interval?: number;
  className?: string;
}

export default function BackgroundSlider({
  images,
  interval = 5000,
  className = ''
}: BackgroundSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {images[currentIndex] && (
            <Image
              src={images[currentIndex]}
              alt="Manufacturing facility"
              fill
              className="object-cover"
              style={{ filter: 'brightness(0.6) contrast(1.1)' }}
              priority={currentIndex === 0}
              quality={85}
              sizes="100vw"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-900/80 to-slate-950/90" />

      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, transparent 0%, rgba(15, 23, 42, 0.4) 100%)",
            "radial-gradient(circle at 80% 50%, transparent 0%, rgba(15, 23, 42, 0.4) 100%)",
            "radial-gradient(circle at 20% 50%, transparent 0%, rgba(15, 23, 42, 0.4) 100%)",
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}