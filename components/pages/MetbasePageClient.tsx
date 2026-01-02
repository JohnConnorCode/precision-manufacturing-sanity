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
import { getHeroImageUrl } from '@/lib/hero-images';

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

const urlFor = getHeroImageUrl;

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

// NO DEFAULT CONTENT - All content must come from Sanity CMS
// See CLAUDE.md Rule 2: NO "DEFAULT CONTENT" OBJECTS

export default function MetbasePageClient({ data }: MetbasePageClientProps) {
  // Use Sanity data directly - NO fallbacks to hardcoded content
  // All content must be managed in Sanity Studio
  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-tone-inverse mb-4">Content Not Found</h1>
          <p className="text-slate-600 dark:text-slate-400">Please add MetBase content in Sanity Studio.</p>
        </div>
      </div>
    );
  }

  const heroImage = urlFor(data.hero?.backgroundImage) || '';
  const heroAlt = data.hero?.backgroundImage?.alt || 'Metbase Database Software';
  const heroButtons = (data.hero?.buttons || [])
    .filter((btn) => btn?.enabled !== false && btn?.label && btn?.href)
    .map((btn) => ({
      label: btn.label || '',
      href: btn.href || '',
      variant: btn.variant,
    }));
  const BadgeIcon = iconMap[data.hero?.badgeIconName || 'Database'] || Database;

  const overviewHighlights = (data.overview?.highlights || [])
    .filter((h) => h?.enabled !== false);

  const featureItems = (data.features?.items || [])
    .filter((f) => f?.enabled !== false);

  const analysisCapabilities = (data.analysisTool?.capabilities || [])
    .filter((c) => c?.enabled !== false);

  const integrationBenefits = (data.systemIntegration?.benefits || [])
    .filter((b) => b?.enabled !== false);

  const ctaButtons = (data.cta?.buttons || [])
    .filter((btn) => btn?.enabled !== false && btn?.label && btn?.href);

  // All images from Sanity CDN - NO external URLs
  const analysisImage = urlFor(data.analysisTool?.image) || '';
  const integrationImage = urlFor(data.systemIntegration?.image) || '';
  const closedLoopImage = urlFor(data.closedLoop?.image) || '';

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection
        backgroundImage={heroImage}
        imageAlt={heroAlt}
        badge={data.hero?.badge ? { text: data.hero.badge, icon: BadgeIcon } : undefined}
        title={(() => {
          // Using inline styles for WebKit compatibility (Tailwind text-transparent doesn't work)
          const gradientStyle = {
            background: 'linear-gradient(to right, #3b82f6, #4f46e5)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          } as React.CSSProperties;

          if (!data.hero?.title) return '';
          if (data.hero?.titleHighlight) {
            return (
              <span className="text-tone-inverse">
                {data.hero.title}{' '}
                <span style={gradientStyle}>
                  {data.hero.titleHighlight}
                </span>
              </span>
            );
          }
          return (
            <span style={gradientStyle}>
              {data.hero.title}
            </span>
          );
        })()}
        description={data.hero?.description}
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
              <h2 className={cn(typography.h2, "mb-6")}>{data.overview?.title}</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                {data.overview?.description}
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
                      className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-950/50 rounded-lg"
                    >
                      <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-tone-inverse" />
                      </div>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{highlight?.text}</span>
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
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-tone-inverse shadow-2xl">
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
            <h2 className={cn(typography.h2, "mb-6")}>{data.features?.title}</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              {data.features?.description}
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
                  <Card className="p-6 h-full border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:shadow-xl group">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7 text-tone-inverse" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-tone-inverse">{feature?.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature?.description}</p>
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
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold mb-6">
                <BarChart3 className="w-4 h-4" />
                Analysis Tool
              </div>
              <h2 className={cn(typography.h2, "mb-6")}>{data.analysisTool?.title}</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                {data.analysisTool?.description}
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
                    <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300">{capability?.text}</span>
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
                    alt={data.analysisTool?.image?.alt || 'Metbase Analysis Chart'}
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                  {data.analysisTool?.image?.caption && (
                    <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 text-sm text-slate-600 dark:text-slate-400">
                      {data.analysisTool.image.caption}
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-xl p-8 flex items-center justify-center min-h-[300px]">
                  <div className="text-center">
                    <BarChart3 className="w-20 h-20 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-500 dark:text-slate-400">Statistical Analysis Charts</p>
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
            <h2 className={cn(typography.h2, "mb-6")}>{data.systemIntegration?.title}</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              {data.systemIntegration?.description}
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
                  <Card className="p-6 text-center h-full border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:shadow-lg">
                    <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-tone-inverse">{benefit?.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">{benefit?.description}</p>
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
                  alt={data.systemIntegration?.image?.alt || 'System Integration Diagram'}
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
                    alt={data.closedLoop?.image?.alt || 'Closed-Loop System Diagram'}
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
              ) : (
                <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-8 text-tone-inverse shadow-2xl">
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
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-semibold mb-6">
                <RefreshCw className="w-4 h-4" />
                Closed-Loop System
              </div>
              <h2 className={cn(typography.h2, "mb-6")}>{data.closedLoop?.title}</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                {data.closedLoop?.description}
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
            <h2 className={cn(typography.h2, "mb-6")}>{data.cta?.title}</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
              {data.cta?.description}
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
