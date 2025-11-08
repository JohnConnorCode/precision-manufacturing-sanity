'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import HeroSection from '@/components/ui/hero-section';
import { ArrowRight, Users, Briefcase, Award, Heart, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { theme, styles, cn } from '@/lib/theme';

// Icon mapping
const iconMap: Record<string, any> = {
  Users,
  Briefcase,
  Award,
  Heart,
  CheckCircle,
};

// Minimal fallback for hero only (all other content should come from Sanity)
const defaultHeroData = {
  backgroundImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2400&q=90',
  imageAlt: 'Careers at Integrated Inspection Systems',
  badge: 'CAREERS',
  badgeIconName: 'Users',
  title: 'Join Our',
  titleHighlight: 'Team',
  description: 'Build your career with us',
  buttons: [
      { label: 'Explore Opportunities', href: '#opportunities', variant: 'primary' },
      { label: 'Contact HR', href: '/contact?interest=career', variant: 'secondary' }
    ]
};

interface CareersPageClientProps {
  data?: any | null;
}

export default function CareersPageClient({ data }: CareersPageClientProps) {
  const BadgeIcon = iconMap[data?.hero?.badgeIconName || defaultHeroData.badgeIconName] || Users;

  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        backgroundImage={(data as any)?.hero?.backgroundImageUrl || data?.hero?.backgroundImage || defaultHeroData.backgroundImage}
        imageAlt={data?.hero?.imageAlt || defaultHeroData.imageAlt}
        badge={{
          text: data?.hero?.badge || defaultHeroData.badge,
          icon: BadgeIcon
        }}
        title={
          <span className="text-white">
            {data?.hero?.title || defaultHeroData.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">{data?.hero?.titleHighlight || defaultHeroData.titleHighlight}</span>
          </span>
        }
        description={data?.hero?.description || defaultHeroData.description}
        buttons={(data?.hero?.buttons || defaultHeroData.buttons).map((btn: any) => ({
          label: btn.label,
          href: btn.href,
          variant: btn.variant as 'primary' | 'secondary'
        }))}
        height="large"
        alignment="center"
      />

      {/* About Working Here */}
      <section className={theme.spacing.section}>
        <div className={theme.spacing.container}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className={cn(theme.typography.h2, "mb-6")}>{data?.whyWorkHere?.heading || 'Why Work at IIS?'}</h2>
              <p className={cn(theme.typography.lead, "mb-6")}>
                {data?.whyWorkHere?.paragraph1 || 'Join a team committed to excellence in precision manufacturing.'}
              </p>
              <p className={cn(theme.typography.body, "text-slate-600 mb-8")}>
                {data?.whyWorkHere?.paragraph2 || 'We offer competitive compensation and comprehensive benefits.'}
              </p>
              <p className={cn(theme.typography.body, "text-slate-600")}>
                {data?.whyWorkHere?.paragraph3 || 'Grow your career with ongoing training and development opportunities.'}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src={(data as any)?.whyWorkHere?.imageUrl || data?.whyWorkHere?.image || 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80'}
                alt={data?.whyWorkHere?.imageAlt || 'Team collaboration'}
                className="w-full h-96 rounded-lg object-cover shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={styles.sectionLight}>
        <div className={theme.spacing.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={cn(theme.typography.h2, "mb-6")}>{data?.benefits?.title || 'Comprehensive Benefits Package'}</h2>
            <p className={cn(theme.typography.lead, "max-w-3xl mx-auto")}>
              {data?.benefits?.description || 'We take care of our team members with industry-leading benefits and perks.'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(data?.benefits?.items || []).map((benefit: any, index: number) => {
              const Icon = iconMap[benefit.iconName] || Users;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className={cn(styles.featureCard, "h-full")}>
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600/10">
                          <Icon className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className={cn(theme.typography.h4, "mb-2")}>{benefit.title}</h3>
                        <p className={cn(theme.typography.body, "text-slate-600")}>{benefit.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className={theme.spacing.section}>
        <div className={theme.spacing.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={cn(theme.typography.h2, "mb-6")}>{data?.values?.title || 'Our Values'}</h2>
            <p className={cn(theme.typography.lead, "max-w-3xl mx-auto")}>
              {data?.values?.description || 'The principles that guide everything we do.'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(data?.values?.items || []).map((value: any, index: number) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className={cn(styles.featureCard)}>
                  <h3 className={cn(theme.typography.h4, "mb-3")}>{value.title}</h3>
                  <p className={cn(theme.typography.body, "text-slate-600")}>{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Opportunities */}
      <section id="opportunities" className={styles.sectionLight}>
        <div className={theme.spacing.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={cn(theme.typography.h2, "mb-6")}>{data?.opportunities?.title || 'Current Opportunities'}</h2>
            <p className={cn(theme.typography.lead, "max-w-3xl mx-auto")}>
              {data?.opportunities?.description || 'Explore open positions and join our team.'}
            </p>
          </motion.div>

          <div className="space-y-6">
            {(data?.opportunities?.jobs || []).map((position: any, index: number) => (
              <motion.div
                key={position.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className={cn(styles.featureCard)}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className={cn(theme.typography.h4, "mb-2")}>{position.title}</h3>
                      <p className={cn(theme.typography.body, "text-slate-600 mb-3")}>
                        {position.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">{position.type}</span>
                        <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full">{position.location}</span>
                      </div>
                    </div>
                    <Link href={position.link} className="flex-shrink-0">
                      <Button className={styles.ctaPrimary}>
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={theme.spacing.section}>
        <div className={theme.spacing.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className={cn(theme.typography.h2, "mb-6")}>{data?.cta?.title || 'Ready to Join Us?'}</h2>
            <p className={cn(theme.typography.lead, "mb-8")}>
              {data?.cta?.description || 'Take the next step in your career. We look forward to hearing from you.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {(data?.cta?.buttons || []).map((button: any, index: number) => (
                <Button
                  key={index}
                  size="lg"
                  className={button.variant === 'primary' ? styles.ctaPrimary : styles.ctaSecondary}
                  variant={button.variant === 'outline' ? 'outline' : 'default'}
                  asChild
                >
                  <Link href={button.href}>
                    {button.label} {index === 0 && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Link>
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
