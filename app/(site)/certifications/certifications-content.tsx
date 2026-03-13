'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, Building2 } from 'lucide-react';
import { PremiumButton } from '@/components/ui/premium-button';
import { DynamicIcon } from '@/components/ui/dynamic-icon';
import AnimatedSection from '@/components/ui/animated-section';
import { spacing, shadows, typography } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/lib/motion';
import { useAnimateInView, ANIM_STATES, ANIM_TRANSITION } from '@/lib/use-animate-in-view';

interface Certification {
  _id: string;
  name: string;
  slug: string;
  shortName?: string;
  description: string;
  iconName?: string;
  scope?: string;
  whyItMatters?: string;
  certNumber?: string;
  issuingBody?: string;
  validFrom?: string;
  validUntil?: string;
  body?: Array<Record<string, unknown>>;
}

interface CMSButton {
  label: string;
  href: string;
  variant?: string;
  enabled?: boolean;
}

interface CertificationsContentProps {
  certifications: Certification[];
  qualityCommitment?: {
    title?: string;
    description?: string;
    image?: {
      asset?: { url?: string };
      alt?: string;
    };
  };
  cta?: {
    title?: string;
    description?: string;
    buttons?: CMSButton[];
  };
}

export default function CertificationsContent({
  certifications,
  qualityCommitment,
  cta,
}: CertificationsContentProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const certsAnim = useAnimateInView<HTMLDivElement>();

  const showQuality = Boolean(qualityCommitment?.title || qualityCommitment?.description);
  const showCta = Boolean(cta?.title || cta?.description);
  const ctaButtons = (cta?.buttons || []).filter((b) => b.enabled !== false && b.label && b.href);

  return (
    <>
      {/* Certifications Grid */}
      <section className="py-24 md:py-32">
        <div className={spacing.container}>
          {certifications.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-slate-500 dark:text-slate-400">
                Certification information is being updated.
              </p>
            </div>
          ) : (
            <div ref={certsAnim.ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert._id}
                  initial={prefersReducedMotion ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
                  animate={certsAnim.shouldAnimate ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
                  transition={{ ...ANIM_TRANSITION, delay: prefersReducedMotion ? 0 : Math.min(index * 0.1, 0.3) }}
                  className="group"
                >
                  <div className={`h-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 ${shadows.card} hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300`}>
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 mb-6 ring-4 ring-blue-500/10">
                      <DynamicIcon name={cert.iconName || 'Shield'} className="w-8 h-8 text-white" />
                    </div>

                    {/* Name */}
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-tone-inverse mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {cert.name}
                    </h3>

                    {/* Issuing Body */}
                    {cert.issuingBody && (
                      <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 mb-4">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>{cert.issuingBody}</span>
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                      {cert.description}
                    </p>

                    {/* Scope */}
                    {cert.scope && (
                      <div className="mb-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1.5">
                          Scope at IIS
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                          {cert.scope}
                        </p>
                      </div>
                    )}

                    {/* Why It Matters */}
                    {cert.whyItMatters && (
                      <div className="mb-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1.5">
                          Why It Matters
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                          {cert.whyItMatters}
                        </p>
                      </div>
                    )}

                    {/* Cert Number & Validity */}
                    <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                      {cert.certNumber && (
                        <div className="text-xs text-slate-500 dark:text-slate-500">
                          <span className="font-semibold">Cert #:</span> {cert.certNumber}
                        </div>
                      )}
                      {cert.validUntil && (
                        <div className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <Calendar className="w-3 h-3" />
                          <span>Valid until {new Date(cert.validUntil).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Quality Commitment Section */}
      {showQuality && (
        <section className="py-24 md:py-32 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 dark-section relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
          <div className={`${spacing.container} relative`}>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <AnimatedSection>
                <div>
                  {qualityCommitment?.title && (
                    <h2 className={cn(typography.h2, "mb-6 text-tone-inverse")}>
                      {qualityCommitment.title}
                    </h2>
                  )}
                  {qualityCommitment?.description && (
                    <p className={cn(typography.lead, "text-slate-300 leading-relaxed")}>
                      {qualityCommitment.description}
                    </p>
                  )}
                </div>
              </AnimatedSection>
              {qualityCommitment?.image?.asset?.url && (
                <AnimatedSection delay={0.2}>
                  <div className="relative h-[400px] rounded-2xl overflow-hidden">
                    <Image
                      src={qualityCommitment.image.asset.url}
                      alt={qualityCommitment.image.alt || ''}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/40" />
                  </div>
                </AnimatedSection>
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {showCta && (
        <section className="py-24 md:py-32">
          <div className={spacing.container}>
            <AnimatedSection>
              <div className="text-center max-w-4xl mx-auto">
                {cta?.title && (
                  <h2 className={cn(typography.h2, "mb-6")}>
                    {cta.title}
                  </h2>
                )}
                {cta?.description && (
                  <p className={cn(typography.lead, "text-slate-600 dark:text-slate-400 mb-8")}>
                    {cta.description}
                  </p>
                )}
                {ctaButtons.length > 0 && (
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {ctaButtons.map((button, index) => (
                      <Link key={`${button.label}-${index}`} href={button.href}>
                        <PremiumButton size="lg" variant={button.variant === 'secondary' ? 'secondary' : 'default'}>
                          {button.label}
                          {index === 0 && <ArrowRight className="ml-2 h-4 w-4" />}
                        </PremiumButton>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}
    </>
  );
}
