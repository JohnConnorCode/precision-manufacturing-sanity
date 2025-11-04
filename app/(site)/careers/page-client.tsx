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

// Default fallback data
const defaultCareersData = {
  hero: {
    backgroundImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2400&q=90',
    imageAlt: 'Careers at Integrated Inspection Systems - Join our team',
    badge: 'CAREERS',
    badgeIconName: 'Users',
    title: 'Join Our',
    titleHighlight: 'Team',
    description: 'Build your career with a leader in precision manufacturing. We\'re looking for talented individuals who share our commitment to excellence, innovation, and quality.',
    buttons: [
      { label: 'Explore Opportunities', href: '#opportunities', variant: 'primary' },
      { label: 'Contact HR', href: '/contact?interest=career', variant: 'secondary' }
    ]
  },
  whyWorkHere: {
    heading: 'Why Work at IIS?',
    paragraph1: 'Since 1995, Integrated Inspection Systems has been a trusted leader in precision manufacturing for aerospace, defense, and advanced industries. We\'re proud of our 30-year legacy of quality, innovation, and team excellence.',
    paragraph2: 'Our team of 150+ skilled professionals works in a state-of-the-art facility using cutting-edge technology including 5-axis CNC machining, adaptive manufacturing, and advanced metrology. We maintain AS9100D, ISO 9001:2015, ITAR registration, and CMMC compliance—standards that reflect our commitment to excellence.',
    paragraph3: 'We\'re looking for engineers, technicians, machinists, and quality professionals who want to make a real impact in precision manufacturing.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=90',
    imageAlt: 'Manufacturing facility and team'
  },
  benefits: {
    heading: 'Benefits & Opportunities',
    description: 'We invest in our team because our people are our greatest asset',
    items: [
      {
        iconName: 'Users',
        title: 'Collaborative Culture',
        description: 'Work with talented engineers and technicians who share your passion for precision manufacturing excellence'
      },
      {
        iconName: 'Award',
        title: 'Professional Development',
        description: 'Access to continuous training, certifications, and opportunities to advance your career in precision manufacturing'
      },
      {
        iconName: 'Heart',
        title: 'Comprehensive Benefits',
        description: 'Competitive health insurance, 401(k) matching, paid time off, and a commitment to work-life balance'
      },
      {
        iconName: 'Briefcase',
        title: 'Industry Leadership',
        description: 'Be part of a company at the forefront of aerospace and defense precision manufacturing technology'
      }
    ]
  },
  values: {
    heading: 'Our Core Values',
    description: 'These principles guide how we work, innovate, and collaborate',
    items: [
      {
        title: 'Excellence',
        description: 'We demand the highest standards in everything we do—from components to customer service'
      },
      {
        title: 'Innovation',
        description: 'We invest in cutting-edge technology and encourage our team to think creatively'
      },
      {
        title: 'Integrity',
        description: 'We operate with transparency and honesty in all our business relationships'
      },
      {
        title: 'Teamwork',
        description: 'Success comes from collaboration and mutual respect across all departments'
      }
    ]
  },
  opportunities: {
    heading: 'Current Opportunities',
    description: 'We\'re growing and actively hiring talented professionals. Don\'t see your ideal position? Let us know—we\'re always interested in exceptional talent.',
    positions: [
      {
        title: 'Manufacturing Engineering',
        description: 'Work on advanced manufacturing processes, 5-axis CNC programming, and process optimization for aerospace components',
        type: 'Full-time',
        location: 'Clackamas, OR',
        link: '/contact?interest=career'
      },
      {
        title: 'Quality Engineer',
        description: 'Ensure quality excellence through CMM inspection, GD&T analysis, and first article inspection on aerospace projects',
        type: 'Full-time',
        location: 'Clackamas, OR',
        link: '/contact?interest=career'
      },
      {
        title: 'CNC Machinist',
        description: 'Operate and optimize 5-axis CNC machines producing precision aerospace components. Requires AS9100 experience.',
        type: 'Full-time',
        location: 'Clackamas, OR',
        link: '/contact?interest=career'
      }
    ]
  },
  cta: {
    heading: 'Ready to Join IIS?',
    description: 'Whether you see an open position or want to let us know about your interest, we\'d love to hear from you.',
    buttons: [
      { label: 'Contact HR', href: '/contact?interest=career', variant: 'primary' },
      { label: 'Learn About IIS', href: '/about', variant: 'outline' }
    ]
  }
};

interface CareersPageClientProps {
  data?: typeof defaultCareersData | null;
}

export default function CareersPageClient({ data }: CareersPageClientProps) {
  const careersData = data || defaultCareersData;
  const BadgeIcon = iconMap[careersData?.hero?.badgeIconName] || Users;

  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        backgroundImage={(careersData as any)?.hero?.backgroundImageUrl || careersData?.hero?.backgroundImage || defaultCareersData.hero.backgroundImage}
        imageAlt={careersData?.hero?.imageAlt || defaultCareersData.hero.imageAlt}
        badge={{
          text: careersData?.hero?.badge || defaultCareersData.hero.badge,
          icon: BadgeIcon
        }}
        title={
          <span className="text-white">
            {careersData?.hero?.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">{careersData?.hero?.titleHighlight}</span>
          </span>
        }
        description={careersData?.hero?.description}
        buttons={(careersData?.hero?.buttons || []).map(btn => ({
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
              <h2 className={cn(theme.typography.h2, "mb-6")}>{careersData?.whyWorkHere?.heading}</h2>
              <p className={cn(theme.typography.lead, "mb-6")}>
                {careersData?.whyWorkHere?.paragraph1}
              </p>
              <p className={cn(theme.typography.body, "text-slate-600 mb-8")}>
                {careersData?.whyWorkHere?.paragraph2}
              </p>
              <p className={cn(theme.typography.body, "text-slate-600")}>
                {careersData?.whyWorkHere?.paragraph3}
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
                src={(careersData as any)?.whyWorkHere?.imageUrl || careersData?.whyWorkHere?.image || defaultCareersData.whyWorkHere.image}
                alt={careersData?.whyWorkHere?.imageAlt || defaultCareersData.whyWorkHere.imageAlt}
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
            <h2 className={cn(theme.typography.h2, "mb-6")}>{careersData?.benefits?.heading}</h2>
            <p className={cn(theme.typography.lead, "max-w-3xl mx-auto")}>
              {careersData?.benefits?.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(careersData?.benefits?.items || []).map((benefit, index) => {
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
            <h2 className={cn(theme.typography.h2, "mb-6")}>{careersData?.values?.heading}</h2>
            <p className={cn(theme.typography.lead, "max-w-3xl mx-auto")}>
              {careersData?.values?.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(careersData?.values?.items || []).map((value, index) => (
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
            <h2 className={cn(theme.typography.h2, "mb-6")}>{careersData?.opportunities?.heading}</h2>
            <p className={cn(theme.typography.lead, "max-w-3xl mx-auto")}>
              {careersData?.opportunities?.description}
            </p>
          </motion.div>

          <div className="space-y-6">
            {(careersData?.opportunities?.positions || []).map((position, index) => (
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
            <h2 className={cn(theme.typography.h2, "mb-6")}>{careersData?.cta?.heading}</h2>
            <p className={cn(theme.typography.lead, "mb-8")}>
              {careersData?.cta?.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {(careersData?.cta?.buttons || []).map((button, index) => (
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
