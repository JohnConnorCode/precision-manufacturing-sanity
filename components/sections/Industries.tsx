"use client";

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { SafeMotion, stagger } from '@/components/ui/safe-motion';
import { Industry, SectionHeader as SectionHeaderData } from '@/lib/types/cms';

interface IndustriesProps {
  data?: Industry[];
  sectionData?: SectionHeaderData & {
    header?: {
      eyebrow?: string;
      title?: string;
      titleHighlight?: string;
      description?: string;
    };
    cardCtaText?: string;
  };
}

export default function Industries({ data, sectionData }: IndustriesProps) {
  const industriesData = (Array.isArray(data) ? data : (data ? [data] : [])).filter(Boolean);
  if (!industriesData || industriesData.length === 0) return null;

  const eyebrow = sectionData?.header?.eyebrow || sectionData?.eyebrow;
  const headerTitle = sectionData?.header?.title;
  const headerTitleHighlight = sectionData?.header?.titleHighlight;
  const heading = headerTitle && headerTitleHighlight
    ? `${headerTitle} ${headerTitleHighlight}`
    : sectionData?.heading;
  const description = sectionData?.header?.description || sectionData?.description;
  const cardCtaText = sectionData?.cardCtaText || 'Explore Solutions';

  return (
    <section className="py-24 md:py-32 bg-slate-50 dark:bg-slate-950">
      <div className="container">
        {/* Header */}
        <SafeMotion y={20} className="text-center mb-16 md:mb-20">
          {eyebrow && (
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-[0.2em] mb-4">
              {eyebrow}
            </p>
          )}
          {heading && (
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6">
              {heading.split(' ').map((word, i, arr) => (
                i === arr.length - 1 ? (
                  <span key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                    {word}
                  </span>
                ) : (
                  <span key={i}>{word} </span>
                )
              ))}
            </h2>
          )}
          {description && (
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </SafeMotion>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {industriesData.slice(0, 3).map((industry, index) => {
            const imageUrl = typeof industry.image === 'string'
              ? industry.image
              : (industry.image as { asset?: { url?: string } } | undefined)?.asset?.url || null;

            return (
              <SafeMotion
                key={industry.title}
                y={30}
                delay={stagger(index)}
                className="group"
              >
                <Link href={industry.href || '#'} className="block">
                  <div className="relative aspect-[3/4] md:aspect-[2/3] rounded-3xl overflow-hidden">
                    {imageUrl && (
                      <Image
                        src={imageUrl}
                        alt={industry.title}
                        fill
                        className="object-cover transition-all duration-700 ease-out group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      {industry.features && industry.features.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {industry.features.slice(0, 3).map((feature, i: number) => {
                            const featureText = typeof feature === 'string' ? feature : (feature as { feature?: string }).feature;
                            return (
                              <span
                                key={i}
                                className="px-3 py-1 text-xs font-semibold text-white/90 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
                              >
                                {featureText}
                              </span>
                            );
                          })}
                        </div>
                      )}
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:translate-x-2 transition-transform duration-300">
                        {industry.title}
                      </h3>
                      <p className="text-slate-300 text-sm md:text-base line-clamp-2 mb-6">
                        {industry.description}
                      </p>
                      <div className="flex items-center gap-2 text-blue-400 font-semibold">
                        <span>{cardCtaText}</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </div>
                    <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-blue-500/40 transition-colors duration-500 pointer-events-none" />
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </Link>
              </SafeMotion>
            );
          })}
        </div>
      </div>
    </section>
  );
}
