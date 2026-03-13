'use client';

import { useActionState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import HeroSection from '@/components/ui/hero-section';
import { typography, spacing, styles, shadows } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/lib/motion';
import { useAnimateInView, ANIM_STATES, ANIM_TRANSITION } from '@/lib/use-animate-in-view';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Shield,
  Award,
  Activity,
  Building2,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  LucideIcon,
} from 'lucide-react';
import ParallaxImagePro from '@/components/ui/parallax-image-pro';
import { gradientTextStyle } from '@/lib/theme-utils';
import { submitContactForm } from './actions';
import type { ContactPage } from '@/sanity/types/query.types';

// Icon mapping for stats
const iconMap: Record<string, LucideIcon> = {
  pulse: Activity,
  Activity,
  Award,
  Shield,
};

interface BottomStat {
  enabled?: boolean;
  iconName?: string;
  text?: string;
  animated?: boolean;
}

interface ContactPageClientProps {
  data?: ContactPage | null;
}

interface FormState {
  success?: boolean;
  message?: string;
  warning?: string;
  errors?: Record<string, string[]>;
}

const inputStyles = cn(
  'w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700',
  'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100',
  'placeholder:text-slate-400 dark:placeholder:text-slate-500',
  'focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-500',
  'transition-colors text-base'
);

const labelStyles = cn(typography.small, 'font-medium text-slate-700 dark:text-slate-300 mb-1.5 block');

interface SelectOption {
  _key?: string;
  value: string;
  label: string;
}

interface ContactFormProps {
  submitButtonText?: string;
  formHeading?: string;
  successHeading?: string;
  sendingText?: string;
  interestOptions?: SelectOption[];
  timelineOptions?: SelectOption[];
}

const defaultInterestOptions: SelectOption[] = [
  { value: 'quote', label: 'Request a Quote' },
  { value: 'technical', label: 'Technical Consultation' },
  { value: 'general', label: 'General Inquiry' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'supplier', label: 'Supplier Inquiry' },
  { value: 'career', label: 'Career Inquiry' },
];

const defaultTimelineOptions: SelectOption[] = [
  { value: 'urgent', label: 'Urgent (1-2 weeks)' },
  { value: 'standard', label: 'Standard (2-6 weeks)' },
  { value: 'flexible', label: 'Flexible (6+ weeks)' },
  { value: 'quoting', label: 'Just quoting' },
];

function ContactForm({ submitButtonText, formHeading, successHeading, sendingText, interestOptions, timelineOptions }: ContactFormProps) {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    async (_prev: FormState, formData: FormData) => {
      const result = await submitContactForm(formData);
      return result as FormState;
    },
    {}
  );

  if (state.success && !state.errors) {
    return (
      <Card className={cn(styles.featureCard, 'p-10 h-full')}>
        <div className="flex flex-col items-center justify-center text-center py-8">
          <CheckCircle2 className="w-16 h-16 text-green-500 mb-6" />
          <h3 className={cn(typography.h3, 'mb-4')}>{successHeading || 'Thank You!'}</h3>
          <p className={cn(typography.body, 'text-slate-600 dark:text-slate-300 max-w-md')}>
            {state.message}
          </p>
          {state.warning && (
            <p className={cn(typography.small, 'text-amber-600 dark:text-amber-400 mt-4')}>
              {state.warning}
            </p>
          )}
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn(styles.featureCard, 'p-10 h-full')}>
      <h3 className={cn(typography.h3, 'mb-6')}>{formHeading || 'Request a Quote'}</h3>

      {state.success === false && state.message && (
        <div className="flex items-start gap-3 p-4 mb-6 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className={cn(typography.small, 'text-red-700 dark:text-red-400')}>{state.message}</p>
        </div>
      )}

      <form action={formAction} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className={labelStyles}>Name *</label>
            <input type="text" id="name" name="name" required minLength={2} className={inputStyles} placeholder="Your name" />
            {state.errors?.name && <p className="text-red-500 text-xs mt-1">{state.errors.name[0]}</p>}
          </div>
          <div>
            <label htmlFor="email" className={labelStyles}>Email *</label>
            <input type="email" id="email" name="email" required className={inputStyles} placeholder="you@company.com" />
            {state.errors?.email && <p className="text-red-500 text-xs mt-1">{state.errors.email[0]}</p>}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="company" className={labelStyles}>Company *</label>
            <input type="text" id="company" name="company" required minLength={2} className={inputStyles} placeholder="Company name" />
            {state.errors?.company && <p className="text-red-500 text-xs mt-1">{state.errors.company[0]}</p>}
          </div>
          <div>
            <label htmlFor="phone" className={labelStyles}>Phone</label>
            <input type="tel" id="phone" name="phone" className={inputStyles} placeholder="(555) 000-0000" />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="interest" className={labelStyles}>Interest *</label>
            <select id="interest" name="interest" required className={inputStyles}>
              {(interestOptions && interestOptions.length > 0 ? interestOptions : defaultInterestOptions).map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="timeline" className={labelStyles}>Timeline</label>
            <select id="timeline" name="timeline" className={inputStyles}>
              <option value="">Select timeline</option>
              {(timelineOptions && timelineOptions.length > 0 ? timelineOptions : defaultTimelineOptions).map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="message" className={labelStyles}>Message *</label>
          <textarea
            id="message"
            name="message"
            required
            minLength={10}
            rows={4}
            className={cn(inputStyles, 'resize-none')}
            placeholder="Describe your project requirements, materials, tolerances, quantities..."
          />
          {state.errors?.message && <p className="text-red-500 text-xs mt-1">{state.errors.message[0]}</p>}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className={cn(
            'w-full py-3.5 px-6 rounded-lg font-semibold text-base',
            'bg-blue-600 text-white hover:bg-blue-700',
            'focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:ring-offset-2',
            'disabled:opacity-60 disabled:cursor-not-allowed',
            'transition-colors inline-flex items-center justify-center gap-2'
          )}
        >
          {isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              {sendingText || 'Sending...'}
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              {submitButtonText || 'Submit'}
            </>
          )}
        </button>
      </form>
    </Card>
  );
}

export default function ContactPageClient({ data }: ContactPageClientProps) {
  const contactData = data;
  const prefersReducedMotion = usePrefersReducedMotion();

  // Animation hooks
  const headerAnim = useAnimateInView<HTMLDivElement>();
  const leftCardAnim = useAnimateInView<HTMLDivElement>();
  const rightCardAnim = useAnimateInView<HTMLDivElement>();
  const mapAnim = useAnimateInView<HTMLDivElement>();
  const statsAnim = useAnimateInView<HTMLDivElement>();

  if (!contactData || !contactData.contactInfo) {
    return null;
  }

  const contactInfo = contactData.contactInfo;

  const trustBarItems = (contactData.trustBar || [])
    .filter((item) => item.enabled !== false && item.label && item.value);

  const heroBackgroundImage = (() => {
    const bg = contactData.hero?.backgroundImage;
    if (typeof bg === 'string') return bg;
    if (bg && typeof bg === 'object' && bg.asset?.url) return bg.asset.url;
    return contactData.hero?.backgroundImageUrl || '';
  })();
  const heroButtons = contactData.hero?.buttonLabel && contactData.hero?.buttonHref
    ? [{
        label: contactData.hero.buttonLabel,
        href: contactData.hero.buttonHref,
        variant: 'primary' as const
      }]
    : [];
  const heroImageAlt = (() => {
    const bg = contactData.hero?.backgroundImage;
    if (typeof bg === 'object' && bg?.alt) return bg.alt;
    return contactData.hero?.imageAlt || '';
  })();
  return (
    <div className="min-h-screen bg-background">
      {contactData.hero && (
        <HeroSection
          backgroundImage={heroBackgroundImage}
          imageAlt={heroImageAlt}
          title={(() => {
            if (!contactData.hero.title) return '';
            if (contactData.hero.titleHighlight) {
              return (
                <span className="text-inherit">
                  {contactData.hero.title}{' '}
                  <span style={gradientTextStyle}>
                    {contactData.hero.titleHighlight}
                  </span>
                </span>
              );
            }
            // Split title to highlight last word in blue gradient
            const title = contactData.hero.title || '';
            const words = title.split(' ');
            if (words.length <= 1) {
              return <span style={gradientTextStyle}>{title}</span>;
            }
            const firstPart = words.slice(0, -1).join(' ');
            const lastWord = words[words.length - 1];
            return (
              <span>
                <span className="text-inherit">{firstPart} </span>
                <span style={gradientTextStyle}>{lastWord}</span>
              </span>
            );
          })()}
          description={contactData.hero.description}
          buttons={heroButtons}
          height="medium"
          alignment="center"
        />
      )}

      {/* Main Contact Section */}
      <section className={`${spacing.sectionCompact} bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950`}>
        <div className={spacing.container}>
            <div className="max-w-6xl mx-auto">
              <motion.div
                ref={headerAnim.ref}
                initial={prefersReducedMotion ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
                animate={headerAnim.shouldAnimate ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
                transition={ANIM_TRANSITION}
                className="text-center mb-16"
              >
                <h2 className={cn(typography.h2, 'mb-6')}>{contactInfo.heading}</h2>
                <p className={cn(typography.lead, 'max-w-3xl mx-auto text-slate-600 dark:text-slate-300')}>
                  {contactInfo.description}
                </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 mb-20">
              {/* Primary Contact Information */}
              <motion.div
                ref={leftCardAnim.ref}
                initial={prefersReducedMotion ? ANIM_STATES.slideLeft.animate : ANIM_STATES.slideLeft.initial}
                animate={leftCardAnim.shouldAnimate ? ANIM_STATES.slideLeft.animate : ANIM_STATES.slideLeft.initial}
                transition={{ ...ANIM_TRANSITION, delay: prefersReducedMotion ? 0 : 0.1 }}
              >
                <Card className={cn(styles.featureCard, 'p-10 h-full')}>
                  <h3 className={cn(typography.h3, 'mb-8')}>{contactInfo?.cardHeading || 'Contact Information'}</h3>

                  <div className="space-y-8">
                    {/* Address */}
                    <div className="flex items-start gap-5">
                      <MapPin className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className={cn(typography.h5, 'mb-2')}>{contactInfo?.addressLabel || 'Headquarters'}</h4>
                        <p className={cn(typography.body, 'text-slate-600 dark:text-slate-300 leading-relaxed')}>
                          {contactInfo.addressLine1}<br />
                          {contactInfo.addressLine2}<br />
                          {contactInfo.addressLine3}
                        </p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start gap-5">
                      <Phone className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className={cn(typography.h5, 'mb-2')}>{contactInfo?.phoneLabel || 'Phone'}</h4>
                        <a
                          href={contactInfo.phoneLink}
                          className={cn(typography.body, 'text-blue-600 hover:text-blue-700 transition-colors font-semibold text-lg')}
                        >
                          {contactInfo.phone}
                        </a>
                        <p className={cn(typography.small, 'text-slate-500 mt-1')}>
                          {contactInfo?.phoneDescription}
                        </p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-5">
                      <Mail className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className={cn(typography.h5, 'mb-2')}>{contactInfo?.emailLabel || 'Email'}</h4>
                        <a
                          href={`mailto:${contactInfo.email}`}
                          className={cn(typography.body, 'text-blue-600 hover:text-blue-700 transition-colors font-semibold')}
                        >
                          {contactInfo.email}
                        </a>
                        <p className={cn(typography.small, 'text-slate-500 mt-1')}>
                          {contactInfo?.emailDescription}
                        </p>
                      </div>
                    </div>

                    {/* Business Hours */}
                    <div className="flex items-start gap-5">
                      <Clock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className={cn(typography.h5, 'mb-2')}>{contactInfo?.hoursLabel || 'Business Hours'}</h4>
                        <p className={cn(typography.body, 'text-slate-600 dark:text-slate-300')}>
                          {contactInfo.hoursLine1}<br />
                          {contactInfo.hoursLine2}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                ref={rightCardAnim.ref}
                initial={prefersReducedMotion ? ANIM_STATES.slideRight.animate : ANIM_STATES.slideRight.initial}
                animate={rightCardAnim.shouldAnimate ? ANIM_STATES.slideRight.animate : ANIM_STATES.slideRight.initial}
                transition={{ ...ANIM_TRANSITION, delay: prefersReducedMotion ? 0 : 0.2 }}
              >
                <ContactForm
                  submitButtonText={contactInfo?.submitButtonText}
                  formHeading={contactInfo?.formHeading}
                  successHeading={contactInfo?.successHeading}
                  sendingText={contactInfo?.sendingText}
                  interestOptions={contactInfo?.interestOptions}
                  timelineOptions={contactInfo?.timelineOptions}
                />
              </motion.div>
            </div>

            {/* Map Section */}
            <motion.div
              ref={mapAnim.ref}
              initial={prefersReducedMotion ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
              animate={mapAnim.shouldAnimate ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
              transition={ANIM_TRANSITION}
            >
              <Card className={`overflow-hidden ${shadows.elevated}`}>
                <div className="relative h-[500px]">
                  {contactData.locationImage?.asset?.url && (
                    <ParallaxImagePro
                      src={contactData.locationImage.asset.url}
                      alt={contactData.locationImage?.alt || "Precision machining facility"}
                      className="w-full h-full object-cover"
                      speed={0.1}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-tone-inverse">
                    <div className="max-w-md bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <Building2 className="w-4 h-4 text-tone-inverse" />
                        </div>
                        <h3 className={cn(typography.h4, 'text-tone-inverse drop-shadow-lg')}>{contactInfo?.mapHeading || 'Visit Our Facility'}</h3>
                      </div>
                      <p className={cn(typography.body, 'mb-4 text-tone-inverse drop-shadow-md')}>
                        {contactData.locationDescription}
                      </p>
                      <p className={cn(typography.small, 'text-tone-inverse font-semibold drop-shadow-md')}>
                        {contactInfo.addressLine1}, {contactInfo.addressLine2}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Trust Bar */}
            {trustBarItems.length > 0 && (
              <motion.div
                initial={prefersReducedMotion ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
                animate={mapAnim.shouldAnimate ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
                transition={{ ...ANIM_TRANSITION, delay: prefersReducedMotion ? 0 : 0.2 }}
                className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
              >
                {trustBarItems.map((item) => (
                  <div
                    key={item.label}
                    className="text-center p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm"
                  >
                    <div className="text-lg font-bold text-slate-900 dark:text-tone-inverse">{item.value}</div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mt-1">{item.label}</div>
                    {item.sublabel && <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.sublabel}</div>}
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Bottom Stats Bar */}
      {Array.isArray(contactData.bottomStats) && contactData.bottomStats.length > 0 && (
        <section className={styles.sectionDark}>
          <div className={spacing.container}>
            <motion.div
              ref={statsAnim.ref}
              initial={prefersReducedMotion ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
              animate={statsAnim.shouldAnimate ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
              transition={ANIM_TRANSITION}
              className="flex flex-wrap justify-center gap-12"
            >
              {contactData.bottomStats
                .filter((stat: BottomStat) => stat?.enabled !== false)
                .map((stat: BottomStat, index: number) => {
                  const IconComponent = iconMap[stat?.iconName || ''] || Activity;
                  return (
                    <div key={`${stat?.text}-${index}`} className="flex items-center gap-3">
                      {stat?.animated ? (
                        <div className={cn("w-3 h-3 bg-green-400 rounded-full", !prefersReducedMotion && "animate-pulse")} />
                      ) : (
                        <IconComponent className="w-5 h-5 text-blue-400" />
                      )}
                      <span className={cn(typography.body, 'text-tone-inverse font-medium')}>
                        {stat?.text}
                      </span>
                    </div>
                  );
                })}
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
