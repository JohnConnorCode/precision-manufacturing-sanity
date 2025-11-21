"use client";

import { motion } from 'framer-motion';
import {
  Shield, FileCheck, AlertCircle, Award, BookOpen, Users, Package, Clock, FileText, Lock,
  Target, Globe, CheckCircle, Wrench, Scale, Info, Phone, Mail, MapPin, DollarSign,
  Zap, Circle
} from 'lucide-react';
import { Card } from '@/components/ui/card';

// Icon mapping for CMS data
const iconMap: Record<string, any> = {
  Shield,
  FileCheck,
  AlertCircle,
  Award,
  BookOpen,
  Users,
  Package,
  Clock,
  FileText,
  Lock,
  Target,
  Globe,
  CheckCircle,
  Wrench,
  Scale,
  Info,
  Phone,
  Mail,
  MapPin,
  DollarSign,
  Zap,
  Circle,
};

interface SupplierRequirementsPageClientProps {
  data: any;
}

export default function SupplierRequirementsPageClient({ data }: SupplierRequirementsPageClientProps) {
  // Use CMS data directly - no hardcoded fallbacks
  const pageData = data;

  // Return null if no data from CMS
  if (!pageData) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent-cyan/5">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b-2 border-accent-cyan/20">
        <div className="absolute inset-0 bg-grid opacity-[0.02]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        <div className="container relative py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              {(pageData.hero?.badges || []).map((badge: any, idx: number) => {
                const BadgeIcon = badge?.iconName ? iconMap[badge.iconName] : null;
                return (
                  <span key={idx} className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-accent-cyan/20 to-accent-electric/20 text-accent-cyan border border-accent-cyan/30">
                    {BadgeIcon && <BadgeIcon className="w-3 h-3 mr-2" />}
                    {badge.text}
                  </span>
                );
              })}
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-[0.9]"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                {pageData.hero.title}
              </span>
              <span className="block text-accent-cyan mt-2">
                {pageData.hero.titleHighlight}
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-muted-foreground mb-8"
            >
              {pageData.hero.description}
            </motion.p>

            {/* Version Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-6 text-sm text-muted-foreground"
            >
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                {pageData.hero.versionStatus}
              </span>
              <span>{pageData.hero.effectiveDate}</span>
              <span>{pageData.hero.reviewPeriod}</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-cyan/10 rounded-full blur-[100px]" />
        </div>
      </section>

      {/* Main Content */}
      <section className="container py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto space-y-12"
        >
          {/* Purpose and Scope */}
          <div className="grid md:grid-cols-2 gap-6">
            {(pageData.sections || []).map((section: any) => {
              const SectionIcon = section?.iconName ? iconMap[section.iconName] : null;
              return (
                <motion.div key={section.id} variants={itemVariants}>
                  <Card className={`p-8 h-full border-2 border-accent-cyan/10 bg-gradient-to-br ${section.color} hover:border-accent-cyan/30 transition-all duration-300`}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-accent-cyan/10 flex items-center justify-center flex-shrink-0">
                        {SectionIcon && <SectionIcon className="w-6 h-6 text-accent-cyan" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-3xl font-black text-accent-cyan">{section.number}</span>
                          <h2 className="text-2xl font-bold">{section.title}</h2>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Requirements Section */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent-cyan/20 to-accent-electric/10 flex items-center justify-center">
                <FileText className="w-8 h-8 text-accent-cyan" />
              </div>
              <div>
                <h2 className="text-3xl font-black">SUPPLIER QUALITY REQUIREMENTS</h2>
                <p className="text-muted-foreground">Section 3 - Detailed Requirements</p>
              </div>
            </div>
          </motion.div>

          {/* Requirements Cards */}
          <div className="space-y-6">
            {(pageData.requirements || []).map((req: any, index: number) => {
              const ReqIcon = req.iconName ? iconMap[req.iconName] : null;
              return (
                <motion.div
                  key={req.number}
                  variants={itemVariants}
                  custom={index}
                >
                  <Card className="p-6 border-l-4 border-l-accent-cyan hover:shadow-lg hover:shadow-accent-cyan/10 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      {ReqIcon && (
                        <div className="w-10 h-10 rounded-lg bg-accent-cyan/10 flex items-center justify-center flex-shrink-0 mt-1">
                          <ReqIcon className="w-5 h-5 text-accent-cyan" />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xl font-bold text-accent-cyan">{req.number}</span>
                          {req.title && <h3 className="text-xl font-bold">{req.title}</h3>}
                        </div>
                        {req.content && (
                          <p className="text-muted-foreground mb-4 leading-relaxed">{req.content}</p>
                        )}
                        {req.additional && (
                          <p className="text-muted-foreground mb-4 leading-relaxed bg-muted/50 p-4 rounded-lg">
                            {req.additional}
                          </p>
                        )}
                        {req.list && (
                          <ul className="space-y-2">
                            {(req.list || []).map((item: any, idx: number) => (
                              <li key={idx} className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 bg-accent-cyan rounded-full mt-2 flex-shrink-0" />
                                <span className="text-muted-foreground">{typeof item === 'string' ? item : (item as any).item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Additional Sections */}
          <div className="space-y-6">
            {(pageData.additionalSections || []).map((section: any, index: number) => {
              const AddSectionIcon = section?.iconName ? iconMap[section.iconName] : null;
              return (
                <motion.div
                  key={section.number}
                  variants={itemVariants}
                  custom={pageData.requirements.length + index}
                >
                  <Card className="p-8 bg-gradient-to-br from-accent-cyan/5 to-accent-electric/5 border-2 border-accent-cyan/20">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-accent-cyan/10 flex items-center justify-center flex-shrink-0">
                        {AddSectionIcon && <AddSectionIcon className="w-6 h-6 text-accent-cyan" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-2xl font-black text-accent-cyan">{section.number}</span>
                          <h2 className="text-2xl font-bold">{section.title}</h2>
                        </div>
                        {section.content && (
                          <p className="text-muted-foreground mb-4 leading-relaxed">{section.content}</p>
                        )}
                        {section.list && (
                          <ul className="space-y-2">
                            {(section.list || []).map((item: any, idx: number) => (
                              <li key={idx} className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 bg-accent-cyan rounded-full mt-2 flex-shrink-0" />
                                <span className="text-muted-foreground">{typeof item === 'string' ? item : (item as any).item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Footer Note */}
          {pageData.footerNote && (
            <motion.div
              variants={itemVariants}
              className="mt-16 p-8 bg-gradient-to-r from-accent-cyan/10 to-accent-electric/10 rounded-xl border border-accent-cyan/20"
            >
              <div className="flex items-center gap-4 mb-4">
                {(() => {
                  const FooterIcon = pageData.footerNote?.iconName ? iconMap[pageData.footerNote.iconName] : null;
                  return FooterIcon ? <FooterIcon className="w-8 h-8 text-accent-cyan" /> : null;
                })()}
                <h3 className="text-2xl font-bold">{pageData.footerNote.heading}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {pageData.footerNote.content}
              </p>
            </motion.div>
          )}
        </motion.div>
      </section>
    </div>
  );
}