"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import HeroSection from '@/components/ui/hero-section';
import {
  ArrowRight,
  Database,
  BarChart3,
  GitBranch,
  History,
  FileText,
  Download,
  LineChart,
  Settings,
  RefreshCw,
  Shield,
  Zap,
  Link2,
  CheckCircle2,
  LucideIcon
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { typography, spacing, styles, cn } from '@/lib/design-system';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/lib/client';

const builder = imageUrlBuilder(client);

const iconMap: Record<string, LucideIcon> = {
  Database,
  BarChart3,
  GitBranch,
  History,
  FileText,
  Download,
  LineChart,
  Settings,
  RefreshCw,
  Shield,
  Zap,
  Link2,
  CheckCircle2,
};

const urlFor = (source?: { asset?: { url?: string } } | string) => {
  if (!source) return '';
  if (typeof source === 'string') return source;
  if (source?.asset) {
    try {
      return builder.image(source).url();
    } catch {
      return '';
    }
  }
  return '';
};

interface MetbasePageClientProps {
  data?: {
    hero?: {
      backgroundImage?: { asset?: { url?: string }; alt?: string };
      badge?: string;
      badgeIconName?: string;
      title?: string;
      titleHighlight?: string;
      subtitle?: string;
      description?: string;
      buttons?: Array<{
        _key?: string;
        label?: string;
        href?: string;
        variant?: 'primary' | 'secondary';
        enabled?: boolean;
      }>;
    };
    overview?: {
      title?: string;
      description?: string;
      highlights?: Array<{
        _key?: string;
        enabled?: boolean;
        text?: string;
        iconName?: string;
      }>;
    };
    features?: {
      title?: string;
      description?: string;
      items?: Array<{
        _key?: string;
        enabled?: boolean;
        title?: string;
        description?: string;
        iconName?: string;
      }>;
    };
    analysisTool?: {
      title?: string;
      description?: string;
      image?: { asset?: { url?: string }; alt?: string; caption?: string };
      capabilities?: Array<{
        _key?: string;
        enabled?: boolean;
        text?: string;
      }>;
    };
    systemIntegration?: {
      title?: string;
      description?: string;
      image?: { asset?: { url?: string }; alt?: string; caption?: string };
      benefits?: Array<{
        _key?: string;
        enabled?: boolean;
        title?: string;
        description?: string;
        iconName?: string;
      }>;
    };
    closedLoop?: {
      title?: string;
      description?: string;
      image?: { asset?: { url?: string }; alt?: string; caption?: string };
    };
    cta?: {
      title?: string;
      description?: string;
      buttons?: Array<{
        _key?: string;
        label?: string;
        href?: string;
        variant?: 'primary' | 'secondary';
        enabled?: boolean;
      }>;
    };
  } | null;
}

// Default content based on the original iismet.com page
const defaultData = {
  hero: {
    badge: 'Proprietary Software',
    badgeIconName: 'Database',
    title: 'Metbase',
    titleHighlight: 'Software',
    subtitle: "Integrated Inspection Systems, Inc.'s proprietary database solution",
    description: 'A powerful in-house database system providing ISO 9001 & AS9100 compliance for complete traceability and retrievability of inspection data and robotic programming.',
    buttons: [
      { _key: 'def-hero-btn-1', label: 'Contact Us', href: '/contact', variant: 'primary' as const, enabled: true },
      { _key: 'def-hero-btn-2', label: 'Our Services', href: '/services', variant: 'secondary' as const, enabled: true },
    ],
  },
  overview: {
    title: 'What is Metbase?',
    description: 'Metbase is our proprietary database software developed in-house to meet the rigorous demands of precision manufacturing. It provides complete ISO 9001 & AS9100 compliance for traceability and retrievability of inspection data and all robotic programming.',
    highlights: [
      { _key: 'def-hl-1', text: 'ISO 9001 & AS9100 Compliant', iconName: 'Shield', enabled: true },
      { _key: 'def-hl-2', text: 'Full Traceability', iconName: 'GitBranch', enabled: true },
      { _key: 'def-hl-3', text: '15+ Years Historical Data', iconName: 'History', enabled: true },
      { _key: 'def-hl-4', text: 'Custom Reporting', iconName: 'FileText', enabled: true },
    ],
  },
  features: {
    title: 'Core Capabilities',
    description: 'Metbase delivers comprehensive data management and analysis tools for precision manufacturing.',
    items: [
      {
        _key: 'def-feat-1',
        title: 'Revision Control',
        description: 'Full forward and backward revision control on all CMM and CNC programs, ensuring complete version history and audit trails.',
        iconName: 'GitBranch',
        enabled: true,
      },
      {
        _key: 'def-feat-2',
        title: 'Historical Data Access',
        description: 'Access over 15 years of historical inspection and manufacturing data for trend analysis and quality assurance.',
        iconName: 'History',
        enabled: true,
      },
      {
        _key: 'def-feat-3',
        title: 'Custom Reporting',
        description: 'Generate detailed custom reports tailored to your specific requirements and compliance needs.',
        iconName: 'FileText',
        enabled: true,
      },
      {
        _key: 'def-feat-4',
        title: 'Automatic Data Export',
        description: 'Seamless automatic exports from CMM operations for streamlined data collection and analysis.',
        iconName: 'Download',
        enabled: true,
      },
      {
        _key: 'def-feat-5',
        title: 'Statistical Analysis',
        description: 'External line fitting and comprehensive statistical analysis tools for engineering insights and process optimization.',
        iconName: 'LineChart',
        enabled: true,
      },
      {
        _key: 'def-feat-6',
        title: 'Data Mining',
        description: 'Advanced data mining functionality to extract valuable engineering insights from your manufacturing data.',
        iconName: 'Database',
        enabled: true,
      },
    ],
  },
  analysisTool: {
    title: 'Metbase Analysis Tool',
    description: 'Our analysis tool is primarily designed for customer capability studies and machining process monitoring. It generates various on-the-fly analytical charts from datasets, enabling real-time decision making and quality control.',
    capabilities: [
      { _key: 'def-cap-1', text: 'Bell curve distribution analysis', enabled: true },
      { _key: 'def-cap-2', text: 'Scatter plot generation', enabled: true },
      { _key: 'def-cap-3', text: 'Process capability studies (Cp, Cpk)', enabled: true },
      { _key: 'def-cap-4', text: 'Real-time SPC charts', enabled: true },
      { _key: 'def-cap-5', text: 'Trend analysis and forecasting', enabled: true },
    ],
  },
  systemIntegration: {
    title: 'Seamless System Integration',
    description: 'Metbase connects multiple pieces of equipment, enabling machines to communicate and share data seamlessly. A notable capability includes obtaining custom CMM alignments that are transferable to CNC machines, with built-in safeguards preventing serial/lot number mixups.',
    benefits: [
      {
        _key: 'def-ben-1',
        title: 'Equipment Connectivity',
        description: 'Connect CMM, CNC, and other equipment for unified data management.',
        iconName: 'Link2',
        enabled: true,
      },
      {
        _key: 'def-ben-2',
        title: 'Alignment Transfer',
        description: 'Transfer custom CMM alignments directly to CNC machines.',
        iconName: 'RefreshCw',
        enabled: true,
      },
      {
        _key: 'def-ben-3',
        title: 'Error Prevention',
        description: 'Built-in safeguards prevent serial and lot number mixups.',
        iconName: 'Shield',
        enabled: true,
      },
    ],
  },
  closedLoop: {
    title: 'Closed-Loop Manufacturing System',
    description: 'Metbase creates a relational database linking all equipment and data, facilitating continuous process improvement. This closed-loop system ensures that every measurement, adjustment, and outcome is tracked and connected, enabling true continuous improvement in your manufacturing processes.',
  },
  cta: {
    title: 'Experience the Power of Metbase',
    description: 'Learn how our proprietary database software can transform your manufacturing data management and quality control processes.',
    buttons: [
      { _key: 'def-cta-btn-1', label: 'Request a Demo', href: '/contact', variant: 'primary' as const, enabled: true },
      { _key: 'def-cta-btn-2', label: 'Learn More', href: '/services', variant: 'secondary' as const, enabled: true },
    ],
  },
};

export default function MetbasePageClient({ data }: MetbasePageClientProps) {
  // Merge with defaults
  const pageData = {
    hero: { ...defaultData.hero, ...data?.hero },
    overview: { ...defaultData.overview, ...data?.overview },
    features: { ...defaultData.features, ...data?.features },
    analysisTool: { ...defaultData.analysisTool, ...data?.analysisTool },
    systemIntegration: { ...defaultData.systemIntegration, ...data?.systemIntegration },
    closedLoop: { ...defaultData.closedLoop, ...data?.closedLoop },
    cta: { ...defaultData.cta, ...data?.cta },
  };

  const heroImage = urlFor(pageData.hero?.backgroundImage) || '';
  const heroAlt = pageData.hero?.backgroundImage?.alt || 'Metbase Database Software';
  const heroButtons = (pageData.hero?.buttons || [])
    .filter((btn) => btn?.enabled !== false && btn?.label && btn?.href)
    .map((btn) => ({
      label: btn.label || '',
      href: btn.href || '',
      variant: btn.variant,
    }));
  const BadgeIcon = iconMap[pageData.hero?.badgeIconName || 'Database'] || Database;

  const overviewHighlights = (pageData.overview?.highlights || defaultData.overview.highlights)
    .filter((h) => h?.enabled !== false);

  const featureItems = (pageData.features?.items || defaultData.features.items)
    .filter((f) => f?.enabled !== false);

  const analysisCapabilities = (pageData.analysisTool?.capabilities || defaultData.analysisTool.capabilities)
    .filter((c) => c?.enabled !== false);

  const integrationBenefits = (pageData.systemIntegration?.benefits || defaultData.systemIntegration.benefits)
    .filter((b) => b?.enabled !== false);

  const ctaButtons = (pageData.cta?.buttons || [])
    .filter((btn) => btn?.enabled !== false && btn?.label && btn?.href);

  const analysisImage = urlFor(pageData.analysisTool?.image);
  const integrationImage = urlFor(pageData.systemIntegration?.image);
  const closedLoopImage = urlFor(pageData.closedLoop?.image);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection
        backgroundImage={heroImage}
        imageAlt={heroAlt}
        badge={pageData.hero?.badge ? { text: pageData.hero.badge, icon: BadgeIcon } : undefined}
        title={
          pageData.hero?.title ? (
            pageData.hero?.titleHighlight ? (
              <span className="text-white">
                {pageData.hero.title}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600">
                  {pageData.hero.titleHighlight}
                </span>
              </span>
            ) : (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600">
                {pageData.hero.title}
              </span>
            )
          ) : ''
        }
        description={pageData.hero?.description}
        buttons={heroButtons}
        height="large"
        alignment="center"
      />

      {/* Overview Section */}
      <section className={spacing.section}>
        <div className={spacing.container}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className={cn(typography.h2, "mb-6")}>{pageData.overview?.title}</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                {pageData.overview?.description}
              </p>

              <div className="grid grid-cols-2 gap-4">
                {overviewHighlights.map((highlight, index) => {
                  const Icon = iconMap[highlight?.iconName || ''] || CheckCircle2;
                  return (
                    <motion.div
                      key={highlight?._key || index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg"
                    >
                      <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-sm font-medium text-slate-700">{highlight?.text}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-2xl">
                <Database className="w-16 h-16 mb-6 opacity-80" />
                <h3 className="text-2xl font-bold mb-4">Enterprise-Grade Solution</h3>
                <p className="text-blue-100 leading-relaxed">
                  Built from the ground up to handle the complex data management needs of precision manufacturing, with over 15 years of proven reliability.
                </p>
                <div className="mt-6 pt-6 border-t border-blue-500/30">
                  <div className="flex items-center gap-2 text-blue-200">
                    <Shield className="w-5 h-5" />
                    <span className="text-sm">ISO 9001 & AS9100 Compliant</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.sectionLight}>
        <div className={spacing.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={cn(typography.h2, "mb-6")}>{pageData.features?.title}</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {pageData.features?.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featureItems.map((feature, index) => {
              const Icon = iconMap[feature?.iconName || ''] || Database;
              const gradients = [
                'from-blue-600 to-indigo-600',
                'from-indigo-600 to-purple-600',
                'from-cyan-600 to-blue-600',
                'from-purple-600 to-pink-600',
                'from-emerald-600 to-teal-600',
                'from-orange-500 to-red-500',
              ];
              const gradient = gradients[index % gradients.length];

              return (
                <motion.div
                  key={feature?._key || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.1, 0.3), duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6 h-full border-slate-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl group">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-900">{feature?.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{feature?.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Analysis Tool Section */}
      <section className={spacing.section}>
        <div className={spacing.container}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
                <BarChart3 className="w-4 h-4" />
                Analysis Tool
              </div>
              <h2 className={cn(typography.h2, "mb-6")}>{pageData.analysisTool?.title}</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                {pageData.analysisTool?.description}
              </p>

              <div className="space-y-3">
                {analysisCapabilities.map((capability, index) => (
                  <motion.div
                    key={capability?._key || index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-slate-700">{capability?.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              {analysisImage ? (
                <div className="rounded-xl overflow-hidden shadow-2xl">
                  <Image
                    src={analysisImage}
                    alt={pageData.analysisTool?.image?.alt || 'Metbase Analysis Chart'}
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                  {pageData.analysisTool?.image?.caption && (
                    <div className="bg-slate-100 px-4 py-2 text-sm text-slate-600">
                      {pageData.analysisTool.image.caption}
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl p-8 flex items-center justify-center min-h-[300px]">
                  <div className="text-center">
                    <BarChart3 className="w-20 h-20 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-500">Statistical Analysis Charts</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* System Integration Section */}
      <section className={styles.sectionLight}>
        <div className={spacing.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={cn(typography.h2, "mb-6")}>{pageData.systemIntegration?.title}</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {pageData.systemIntegration?.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {integrationBenefits.map((benefit, index) => {
              const Icon = iconMap[benefit?.iconName || ''] || Zap;
              return (
                <motion.div
                  key={benefit?._key || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6 text-center h-full border-slate-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg">
                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-slate-900">{benefit?.title}</h3>
                    <p className="text-slate-600 text-sm">{benefit?.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {integrationImage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <div className="rounded-xl overflow-hidden shadow-xl">
                <Image
                  src={integrationImage}
                  alt={pageData.systemIntegration?.image?.alt || 'System Integration Diagram'}
                  width={900}
                  height={500}
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Closed Loop Section */}
      <section className={spacing.section}>
        <div className={spacing.container}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              {closedLoopImage ? (
                <div className="rounded-xl overflow-hidden shadow-2xl">
                  <Image
                    src={closedLoopImage}
                    alt={pageData.closedLoop?.image?.alt || 'Closed-Loop System Diagram'}
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
              ) : (
                <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-8 text-white shadow-2xl">
                  <RefreshCw className="w-16 h-16 mb-6 opacity-80" />
                  <h3 className="text-2xl font-bold mb-4">Continuous Improvement</h3>
                  <p className="text-indigo-100 leading-relaxed">
                    Every measurement, adjustment, and outcome is tracked and connected in our closed-loop system, enabling true continuous improvement.
                  </p>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-6">
                <RefreshCw className="w-4 h-4" />
                Closed-Loop System
              </div>
              <h2 className={cn(typography.h2, "mb-6")}>{pageData.closedLoop?.title}</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {pageData.closedLoop?.description}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.sectionLight}>
        <div className={spacing.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className={cn(typography.h2, "mb-6")}>{pageData.cta?.title}</h2>
            <p className="text-xl text-slate-600 mb-8">
              {pageData.cta?.description}
            </p>
            {ctaButtons.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {ctaButtons.map((button, index) => (
                  <Button
                    key={button._key || index}
                    size="lg"
                    className={button.variant === 'secondary' ? styles.ctaSecondary : styles.ctaPrimary}
                    variant={button.variant === 'secondary' ? 'outline' : 'default'}
                    asChild
                  >
                    <Link href={button.href || '#'}>
                      {button.label}
                      {index === 0 && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Link>
                  </Button>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
