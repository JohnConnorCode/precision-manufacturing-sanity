"use client";

import {
  FileText, Shield, DollarSign, Package, AlertCircle,
  CheckCircle, Clock, Lock, Globe, Scale,
  Zap, Info, Phone, Mail, MapPin,
  Wrench, Award, BookOpen, Users
} from 'lucide-react';
import HeroSection from '@/components/ui/hero-section';
import AnimatedSection from '@/components/ui/animated-section';
import { Card } from '@/components/ui/card';
import { typography } from '@/lib/design-system';
import { cn } from '@/lib/utils';

// Icon mapping
const iconMap: Record<string, any> = {
  FileText,
  Shield,
  DollarSign,
  Package,
  AlertCircle,
  CheckCircle,
  Clock,
  Lock,
  Globe,
  Scale,
  Zap,
  Info,
  Phone,
  Mail,
  MapPin,
  Wrench,
  Award,
  BookOpen,
  Users,
};

interface TermsPageClientProps {
  data: any;
}

export default function TermsPageClient({ data }: TermsPageClientProps) {
  const termsData = data ? {
    header: data.header,
    sections: data.sections?.map((section: any) => ({
      icon: iconMap[section.icon] || FileText,
      iconName: section.icon,
      title: section.title,
      content: section.content
    })),
    contact: data.contact
  } : null;

  if (!termsData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - matches site pattern */}
      <HeroSection
        height="medium"
        alignment="center"
        darkHero={true}
        title={(() => {
          // Using inline styles for WebKit compatibility (Tailwind text-transparent doesn't work)
          const gradientStyle = {
            background: 'linear-gradient(to right, #3b82f6, #4f46e5)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          } as React.CSSProperties;

          const title = termsData.header.title || '';
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
        description={
          <div className="text-slate-300">
            <p className="mb-4">{termsData.header.subtitle}</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="px-3 py-1 rounded-full bg-blue-600/20 text-blue-400 border border-blue-600/30">
                Effective: {termsData.header.effectiveDate}
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-600/20 text-slate-300 border border-slate-600/30">
                {termsData.header.version}
              </span>
            </div>
          </div>
        }
        titleSize="lg"
      />

      {/* Terms Sections */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="space-y-4">
            {termsData.sections.map((section: any, index: number) => {
              const Icon = iconMap[section.iconName] || FileText;
              return (
                <AnimatedSection key={index} delay={Math.min(index * 0.05, 0.3)}>
                  <Card className="p-6 md:p-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700 hover:shadow-lg dark:hover:shadow-slate-950/50 transition-all duration-300">
                    <div className="flex items-start gap-4 md:gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-blue-600/10 flex items-center justify-center">
                          <Icon className="w-5 h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h2 className={cn(typography.h5, 'mb-2 text-slate-900 dark:text-tone-inverse')}>
                          {section.title}
                        </h2>
                        <p className={cn(typography.body, 'text-slate-600 dark:text-slate-400 leading-relaxed')}>
                          {section.content}
                        </p>
                      </div>
                    </div>
                  </Card>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <AnimatedSection>
        <section className="py-16 md:py-24 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 dark-section">
          <div className="container max-w-4xl mx-auto px-4 text-center">
            <h3 className={cn(typography.subsectionTitle, 'text-tone-inverse mb-4')}>
              {termsData.contact.heading}
            </h3>
            <p className={cn(typography.descriptionMuted, 'text-slate-300 mb-8 max-w-2xl mx-auto')}>
              {termsData.contact.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href={`mailto:${termsData.contact.email}`}
                className={cn(typography.body, 'flex items-center gap-3 text-tone-inverse hover:text-blue-400 transition-colors')}
              >
                <Mail className="w-5 h-5 text-blue-400" />
                <span>{termsData.contact.email}</span>
              </a>
              <span className="hidden sm:block text-slate-600 dark:text-slate-400">|</span>
              <a
                href={`tel:+1${termsData.contact.phone.replace(/\D/g, '')}`}
                className={cn(typography.body, 'flex items-center gap-3 text-tone-inverse hover:text-blue-400 transition-colors')}
              >
                <Phone className="w-5 h-5 text-blue-400" />
                <span>{termsData.contact.phone}</span>
              </a>
              <span className="hidden sm:block text-slate-600 dark:text-slate-400">|</span>
              <div className={cn(typography.body, 'flex items-center gap-3 text-slate-300')}>
                <MapPin className="w-5 h-5 text-blue-400" />
                <span>{termsData.contact.department}</span>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}
