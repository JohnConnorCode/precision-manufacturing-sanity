'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import HeroSection from '@/components/ui/hero-section';
import { theme, styles, cn } from '@/lib/theme';
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
} from 'lucide-react';
import ParallaxImagePro from '@/components/ui/parallax-image-pro';

// Icon mapping for stats
const iconMap: Record<string, any> = {
  pulse: Activity,
  Activity,
  Award,
  Shield,
};

interface ContactPageClientProps {
  data?: any | null;
}

export default function ContactPageClient({ data }: ContactPageClientProps) {
  const contactData = data;

  if (!contactData) {
    return null;
  }

  const heroBackgroundImage =
    contactData.hero?.backgroundImage?.asset?.url ||
    (typeof contactData.hero?.backgroundImage === 'string' ? contactData.hero.backgroundImage : '') ||
    contactData.hero?.backgroundImageUrl ||
    '';
  const heroButtons = contactData.hero?.buttonLabel && contactData.hero?.buttonHref
    ? [{
        label: contactData.hero.buttonLabel,
        href: contactData.hero.buttonHref,
        variant: 'primary' as const
      }]
    : [];
  const HeroBadgeIcon = iconMap[contactData.hero?.badgeIconName || 'Activity'] || Activity;

  return (
    <div className="min-h-screen bg-background">
      {contactData.hero && (
        <HeroSection
          backgroundImage={heroBackgroundImage}
          imageAlt={contactData.hero.imageAlt || contactData.hero.backgroundImage?.alt || ''}
          badge={contactData.hero.badge ? { text: contactData.hero.badge, icon: HeroBadgeIcon } : undefined}
          title={
            contactData.hero.title ? (
              <span className="text-white">
                {contactData.hero.title}{' '}
                {contactData.hero.titleHighlight && (
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                    {contactData.hero.titleHighlight}
                  </span>
                )}
              </span>
            ) : ''
          }
          description={contactData.hero.description}
          buttons={heroButtons}
          height="medium"
          alignment="center"
        />
      )}

      {/* Main Contact Section */}
      <section className={styles.sectionLight}>
        <div className={theme.spacing.container}>
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className={cn(theme.typography.h2, 'mb-6')}>{contactData.contactInfo.heading}</h2>
              <p className={cn(theme.typography.lead, 'max-w-3xl mx-auto text-slate-600')}>
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
                  <h3 className={cn(theme.typography.h3, 'mb-8')}>Contact Information</h3>

                  <div className="space-y-8">
                    {/* Address */}
                    <div className="flex items-start gap-5">
                      <div className={cn(styles.iconContainer.large, "flex-shrink-0")}>
                        <MapPin className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h4 className={cn(theme.typography.h5, 'mb-2')}>Headquarters</h4>
                        <p className={cn(theme.typography.body, 'text-slate-600 leading-relaxed')}>
                          {contactData.contactInfo.addressLine1}<br />
                          {contactData.contactInfo.addressLine2}<br />
                          {contactData.contactInfo.addressLine3}
                        </p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start gap-5">
                      <div className={cn(styles.iconContainer.large, "flex-shrink-0")}>
                        <Phone className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h4 className={cn(theme.typography.h5, 'mb-2')}>Phone</h4>
                        <a
                          href={contactData.contactInfo.phoneLink}
                          className={cn(theme.typography.body, 'text-blue-600 hover:text-blue-700 transition-colors font-semibold text-lg')}
                        >
                          {contactData.contactInfo.phone}
                        </a>
                        <p className={cn(theme.typography.small, 'text-slate-500 mt-1')}>
                          {contactData.contactInfo?.phoneDescription || 'Direct line for quotes and inquiries'}
                        </p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-5">
                      <div className={cn(styles.iconContainer.large, "flex-shrink-0")}>
                        <Mail className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h4 className={cn(theme.typography.h5, 'mb-2')}>Email</h4>
                        <a
                          href={`mailto:${contactData.contactInfo.email}`}
                          className={cn(theme.typography.body, 'text-blue-600 hover:text-blue-700 transition-colors font-semibold')}
                        >
                          {contactData.contactInfo.email}
                        </a>
                        <p className={cn(theme.typography.small, 'text-slate-500 mt-1')}>
                          {contactData.contactInfo?.emailDescription || 'Send us your project details'}
                        </p>
                      </div>
                    </div>

                    {/* Business Hours */}
                    <div className="flex items-start gap-5">
                      <div className={cn(styles.iconContainer.large, "flex-shrink-0")}>
                        <Clock className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h4 className={cn(theme.typography.h5, 'mb-2')}>Business Hours</h4>
                        <p className={cn(theme.typography.body, 'text-slate-600')}>
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
                    <div className={cn(styles.iconContainer.blueLight, "flex-shrink-0 group-hover:bg-blue-100 transition-colors")}>
                      <MessageCircle className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className={cn(theme.typography.h5, 'mb-2')}>Request a Quote</h4>
                      <p className={cn(theme.typography.body, 'text-slate-600 mb-4')}>
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
                    <div className={cn(styles.iconContainer.blueLight, "flex-shrink-0 group-hover:bg-blue-100 transition-colors")}>
                      <Phone className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className={cn(theme.typography.h5, 'mb-2')}>{contactData.contactInfo?.consultationHeading || 'Technical Consultation'}</h4>
                      <p className={cn(theme.typography.body, 'text-slate-600 mb-4')}>
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
                    <div className={cn(styles.iconContainer.blueLight, "flex-shrink-0 group-hover:bg-blue-100 transition-colors")}>
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className={cn(theme.typography.h5, 'mb-2')}>General Inquiries</h4>
                      <p className={cn(theme.typography.body, 'text-slate-600 mb-4')}>
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

            {/* Certifications & Capabilities */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {Array.isArray(contactData.certifications) && contactData.certifications
                .filter((cert: any) => cert?.enabled !== false)
                .map((cert: any, index: number) => (
                  <motion.div
                    key={cert?.certification}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <Card className={cn(styles.featureCard, 'p-6 text-center h-full')}>
                      <div className={cn(styles.iconContainer.blueLight, "mx-auto mb-4")}>
                        <Shield className="w-6 h-6 text-blue-600" />
                      </div>
                      <p className={cn(theme.typography.small, 'font-semibold text-slate-800')}>
                        {cert?.certification}
                      </p>
                    </Card>
                  </motion.div>
                ))}
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
                    alt={contactData.locationImage.alt || "Location"}
                    className="w-full h-full object-cover"
                    speed={0.1}
                  />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="max-w-md bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-white" />
                        </div>
                        <h3 className={cn(theme.typography.h4, 'text-white drop-shadow-lg')}>Visit Our Facility</h3>
                      </div>
                      <p className={cn(theme.typography.body, 'mb-4 text-white drop-shadow-md')}>
                        Located in Clackamas, Oregon, our state-of-the-art facility features advanced CNC machining, metrology, and inspection capabilities.
                      </p>
                      <p className={cn(theme.typography.small, 'text-white font-semibold drop-shadow-md')}>
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
          <div className={theme.spacing.container}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-12"
            >
              {contactData.bottomStats
                .filter((stat: any) => stat?.enabled !== false)
                .map((stat: any, index: number) => {
                  const IconComponent = iconMap[stat?.iconName] || Activity;
                  return (
                    <div key={`${stat?.text}-${index}`} className="flex items-center gap-3">
                      {stat?.animated ? (
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                      ) : (
                        <IconComponent className="w-5 h-5 text-blue-400" />
                      )}
                      <span className={cn(theme.typography.body, 'text-white font-medium')}>
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
