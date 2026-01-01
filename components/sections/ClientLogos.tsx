"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { usePrefersReducedMotion } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { SafeMotion } from '@/components/ui/safe-motion';

interface ClientLogo {
  _key?: string;
  enabled?: boolean;
  name: string;
  logo?: {
    asset?: { url?: string };
    alt?: string;
  };
  href?: string;
}

interface ClientLogosData {
  enabled?: boolean;
  eyebrow?: string;
  logos?: ClientLogo[];
  animationSpeed?: 'slow' | 'medium' | 'fast';
  grayscale?: boolean;
}

interface ClientLogosProps {
  data?: ClientLogosData;
}

export default function ClientLogos({ data }: ClientLogosProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (!data?.enabled) return null;

  const logos = (data.logos || []).filter(logo => logo.enabled !== false && logo.logo?.asset?.url);

  if (logos.length === 0) return null;

  // Animation duration based on speed setting
  const speedMap = {
    slow: 60,
    medium: 40,
    fast: 25,
  };
  const duration = speedMap[data.animationSpeed || 'medium'];

  // Double the logos for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section className="py-12 md:py-16 bg-slate-50 dark:bg-slate-900 overflow-hidden">
      <div className="container mb-8">
        {data.eyebrow && (
          <SafeMotion
            y={10}
            className="text-center text-xs md:text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em]"
          >
            {data.eyebrow}
          </SafeMotion>
        )}
      </div>

      {/* Logo Display - Static grid for reduced motion, carousel otherwise */}
      <div className="relative">
        {prefersReducedMotion ? (
          /* Static Grid for Reduced Motion Users */
          <div className="container">
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {logos.map((logo) => {
                const logoUrl = logo.logo?.asset?.url;
                if (!logoUrl) return null;

                const LogoImage = (
                  <div
                    className={cn(
                      "h-10 md:h-14 w-auto px-4 md:px-6",
                      "transition-all duration-300",
                      data.grayscale && "grayscale opacity-50 hover:grayscale-0 hover:opacity-100"
                    )}
                  >
                    <Image
                      src={logoUrl}
                      alt={logo.logo?.alt || `${logo.name} logo`}
                      width={160}
                      height={56}
                      className="h-full w-auto object-contain"
                    />
                  </div>
                );

                if (logo.href) {
                  return (
                    <a
                      key={logo._key || logo.name}
                      href={logo.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                      aria-label={`Visit ${logo.name} website`}
                    >
                      {LogoImage}
                    </a>
                  );
                }

                return (
                  <div key={logo._key || logo.name}>
                    {LogoImage}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Animated Carousel for Standard Users */
          <>
            {/* Gradient Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-slate-50 dark:from-slate-900 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-slate-50 dark:from-slate-900 to-transparent z-10 pointer-events-none" />

            {/* Scrolling Container */}
            <motion.div
              className="flex items-center gap-12 md:gap-20"
              animate={{
                x: [0, -50 * logos.length + '%'],
              }}
              transition={{
                x: {
                  duration: duration,
                  repeat: Infinity,
                  ease: 'linear',
                },
              }}
            >
              {duplicatedLogos.map((logo, index) => {
                const logoUrl = logo.logo?.asset?.url;
                if (!logoUrl) return null;

                const LogoImage = (
                  <div
                    className={cn(
                      "flex-shrink-0 h-10 md:h-14 w-auto px-4 md:px-6",
                      "transition-all duration-300",
                      data.grayscale && "grayscale opacity-50 hover:grayscale-0 hover:opacity-100"
                    )}
                  >
                    <Image
                      src={logoUrl}
                      alt={logo.logo?.alt || `${logo.name} logo`}
                      width={160}
                      height={56}
                      className="h-full w-auto object-contain"
                    />
                  </div>
                );

                if (logo.href) {
                  return (
                    <a
                      key={`${logo._key || logo.name}-${index}`}
                      href={logo.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                      aria-label={`Visit ${logo.name} website`}
                    >
                      {LogoImage}
                    </a>
                  );
                }

                return (
                  <div key={`${logo._key || logo.name}-${index}`}>
                    {LogoImage}
                  </div>
                );
              })}
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
