"use client";

import Image from 'next/image';
import { useState } from 'react';

interface ParallaxImageProps {
  src: string | null | undefined;
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
  speed: _speed = 0.5,
  scale: _scale = true,
  opacity: _opacity = false,
  rotate: _rotate = false
}: ParallaxImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Don't render anything if src is empty/null
  if (!src) return null;

  // If image failed to load, show a subtle placeholder
  if (hasError) {
    return (
      <div className={`relative overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 text-slate-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading skeleton with shimmer effect */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse" />
      )}
      <div className="relative w-full h-full">
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-cover transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
        />
      </div>
    </div>
  );
}