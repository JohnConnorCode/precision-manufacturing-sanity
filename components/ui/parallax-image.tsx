"use client";

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
  // Don't render if src is empty
  if (!src) return null;

  // Parallax effects disabled to avoid hydration issues
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="relative w-full h-full">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
    </div>
  );
}