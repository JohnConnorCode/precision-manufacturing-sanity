'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import HeroSection from '@/components/ui/hero-section';
import { typography, spacing, styles, cn } from '@/lib/design-system';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Shield,
  Award,
  Activity,
  Building2,
  MessageCircle,
  FileText,
  LucideIcon,
} from 'lucide-react';
import ParallaxImagePro from '@/components/ui/parallax-image-pro';

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

interface ContactData {
  hero?: {
    backgroundImage?: { asset?: { url?: string }; alt?: string } | string;
    backgroundImageUrl?: string;
    imageAlt?: string;
    buttonLabel?: string;
    buttonHref?: string;
    badgeIconName?: string;
    badge?: string;
    title?: string;
    titleHighlight?: string;
    description?: string;
  };
  contactInfo: {
    heading?: string;
    description?: string;
    addressLine1?: string;
    addressLine2?: string;
    addressLine3?: string;
    phone?: string;
    phoneLink?: string;
    phoneDescription?: string;
    email?: string;
    emailDescription?: string;
    hoursLine1?: string;
    hoursLine2?: string;
    submitButtonText?: string;
    consultationHeading?: string;
  };
  locationImage?: {
    asset?: { url?: string };
    alt?: string;
  };
  locationDescription?: string;
  bottomStats?: BottomStat[];
}

interface ContactPageClientProps {
  data?: ContactData | null;
}

export default function ContactPageClient({ data }: ContactPageClientProps) {
  const contactData = data;

  if (!contactData) {
    return null;
  }

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
  const HeroBadgeIcon = iconMap[contactData.hero?.badgeIconName || 'Activity'] || Activity;

  return (
    <div className="min-h-screen bg-background">
      {contactData.hero && (
        <HeroSection
          backgroundImage={heroBackgroundImage}
          imageAlt={heroImageAlt}
          badge={contactData.hero.badge ? { text: contactData.hero.badge, icon: HeroBadgeIcon } : undefined}
          title={(() => {
            // Using inline styles for WebKit compatibility (Tailwind text-transparent doesn't work)
            const gradientStyle = {
              background: 'linear-gradient(to right, #3b82f6, #4f46e5)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            } as React.CSSProperties;

            if (!contactData.hero.title) return '';
            if (contactData.hero.titleHighlight) {
              return (
                <span className="text-inherit">
                  {contactData.hero.title}{' '}
                  <span style={gradientStyle}>
                    {contactData.hero.titleHighlight}
                  </span>
                </span>
              );
            }
            // Split title to highlight last word in blue gradient
            const title = contactData.hero.title || '';
            const words = title.split(' ');
            if (words.length <= 1) {
              return <span style={gradientStyle}>{title}</span>;
            }
            const firstPart = words.slice(0, -1).join(' ');
            const lastWord = words[words.length - 1];
            return (
              <span>
                <span className="text-inherit">{firstPart} </span>
                <span style={gradientStyle}>{lastWord}</span>
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
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className={spacing.container}>
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className={cn(typography.h2, 'mb-6')}>{contactData.contactInfo.heading}</h2>
                <p className={cn(typography.lead, 'max-w-3xl mx-auto text-slate-600 dark:text-slate-300')}>
                  {contactData.contactInfo.description}
                </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 mb-20">
              {/* Primary Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={cn(styles.featureCard, 'p-10 h-full')}>
                  <h3 className={cn(typography.h3, 'mb-8')}>Contact Information</h3>

                  <div className="space-y-8">
                    {/* Address */}
                    <div className="flex items-start gap-5">
                      <MapPin className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className={cn(typography.h5, 'mb-2')}>Headquarters</h4>
                        <p className={cn(typography.body, 'text-slate-600 dark:text-slate-300 leading-relaxed')}>
                          {contactData.contactInfo.addressLine1}<br />
                          {contactData.contactInfo.addressLine2}<br />
                          {contactData.contactInfo.addressLine3}
                        </p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start gap-5">
                      <Phone className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className={cn(typography.h5, 'mb-2')}>Phone</h4>
                        <a
                          href={contactData.contactInfo.phoneLink}
                          className={cn(typography.body, 'text-blue-600 hover:text-blue-700 transition-colors font-semibold text-lg')}
                        >
                          {contactData.contactInfo.phone}
                        </a>
                        <p className={cn(typography.small, 'text-slate-500 mt-1')}>
                          {contactData.contactInfo?.phoneDescription || 'Direct line for quotes and inquiries'}
                        </p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-5">
                      <Mail className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className={cn(typography.h5, 'mb-2')}>Email</h4>
                        <a
                          href={`mailto:${contactData.contactInfo.email}`}
                          className={cn(typography.body, 'text-blue-600 hover:text-blue-700 transition-colors font-semibold')}
                        >
                          {contactData.contactInfo.email}
                        </a>
                        <p className={cn(typography.small, 'text-slate-500 mt-1')}>
                          {contactData.contactInfo?.emailDescription || 'Send us your project details'}
                        </p>
                      </div>
                    </div>

                    {/* Business Hours */}
                    <div className="flex items-start gap-5">
                      <Clock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className={cn(typography.h5, 'mb-2')}>Business Hours</h4>
                        <p className={cn(typography.body, 'text-slate-600 dark:text-slate-300')}>
                          {contactData.contactInfo.hoursLine1}<br />
                          {contactData.contactInfo.hoursLine2}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Quick Actions / Additional Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                {/* Quick Actions */}
                <Card className={cn(styles.featureCard, 'p-8 group hover:shadow-xl transition-all duration-300')}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className={cn(typography.h5, 'mb-2')}>Request a Quote</h4>
                      <p className={cn(typography.body, 'text-slate-600 dark:text-slate-300 mb-4')}>
                        Email us your specifications, drawings, or project details for a comprehensive quote.
                      </p>
                      <a
                        href={`mailto:${contactData.contactInfo.email}?subject=Quote Request`}
                        className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center gap-2 text-sm"
                      >
                        <Mail className="w-4 h-4" />
                        {contactData.contactInfo?.submitButtonText || 'Send Quote Request'}
                      </a>
                    </div>
                  </div>
                </Card>

                <Card className={cn(styles.featureCard, 'p-8 group hover:shadow-xl transition-all duration-300')}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className={cn(typography.h5, 'mb-2')}>{contactData.contactInfo?.consultationHeading || 'Technical Consultation'}</h4>
                      <p className={cn(typography.body, 'text-slate-600 dark:text-slate-300 mb-4')}>
                        Call us directly to discuss your technical requirements with our engineering team.
                      </p>
                      <a
                        href={contactData.contactInfo.phoneLink}
                        className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center gap-2 text-sm"
                      >
                        <Phone className="w-4 h-4" />
                        {contactData.contactInfo.phone}
                      </a>
                    </div>
                  </div>
                </Card>

                <Card className={cn(styles.featureCard, 'p-8 group hover:shadow-xl transition-all duration-300')}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className={cn(typography.h5, 'mb-2')}>General Inquiries</h4>
                      <p className={cn(typography.body, 'text-slate-600 dark:text-slate-300 mb-4')}>
                        Have questions about our capabilities or services? Reach out via email or phone.
                      </p>
                      <div className="flex flex-col gap-2">
                        <a
                          href={`mailto:${contactData.contactInfo.email}`}
                          className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center gap-2 text-sm"
                        >
                          <Mail className="w-4 h-4" />
                          {contactData.contactInfo.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Map Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden shadow-2xl">
                <div className="relative h-[500px]">
                  {contactData.locationImage?.asset?.url && (
                    <ParallaxImagePro
                      src={contactData.locationImage.asset.url}
                      alt={contactData.locationImage?.alt || "Precision manufacturing facility"}
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
                        <h3 className={cn(typography.h4, 'text-tone-inverse drop-shadow-lg')}>Visit Our Facility</h3>
                      </div>
                      <p className={cn(typography.body, 'mb-4 text-tone-inverse drop-shadow-md')}>
                        {contactData.locationDescription || 'Located in Clackamas, Oregon, our state-of-the-art facility features advanced CNC machining, metrology, and inspection capabilities.'}
                      </p>
                      <p className={cn(typography.small, 'text-tone-inverse font-semibold drop-shadow-md')}>
                        {contactData.contactInfo.addressLine1}, {contactData.contactInfo.addressLine2}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom Stats Bar */}
      {Array.isArray(contactData.bottomStats) && contactData.bottomStats.length > 0 && (
        <section className={styles.sectionDark}>
          <div className={spacing.container}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-12"
            >
              {contactData.bottomStats
                .filter((stat: BottomStat) => stat?.enabled !== false)
                .map((stat: BottomStat, index: number) => {
                  const IconComponent = iconMap[stat?.iconName || ''] || Activity;
                  return (
                    <div key={`${stat?.text}-${index}`} className="flex items-center gap-3">
                      {stat?.animated ? (
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
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
