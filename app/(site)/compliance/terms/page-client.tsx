"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import {
  FileText, Shield, DollarSign, Package, AlertCircle,
  CheckCircle, Clock, Lock, Globe, Scale,
  Zap, Info, Phone, Mail, MapPin,
  Wrench, Award, BookOpen, Users
} from 'lucide-react';

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
  // Convert CMS data (with icon strings) to component format (with icon components)
  const termsData = data ? {
    header: data.header,
    sections: data.sections?.map((section: any, _index: number) => ({
      icon: iconMap[section.icon] || FileText,
      title: section.title,
      content: section.content
    })),
    contact: data.contact
  } : null;

  const containerRef = useRef<HTMLDivElement>(null);

  // Call hooks unconditionally BEFORE early return
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  if (!termsData) {
    return null;
  }

  return (
    <div ref={containerRef} className="relative min-h-screen bg-slate-50">
      {/* Subtle Parallax Background */}
      <motion.div
        style={{ y: parallaxY }}
        className="absolute inset-0 pointer-events-none opacity-50"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-100 to-white" />
      </motion.div>

      <div className="container relative z-10 py-24 max-w-6xl">
        {/* Professional Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-black mb-4 text-slate-900">
            {termsData.header.title}
          </h1>
          <p className="text-lg text-slate-600">
            {termsData.header.subtitle}
          </p>
          <div className="mt-6 flex justify-center gap-6">
            <span className="text-sm font-medium text-slate-500">
              Effective: {termsData.header.effectiveDate}
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-sm font-medium text-slate-500">
              {termsData.header.version}
            </span>
          </div>
        </motion.div>

        {/* Terms Grid - Professional Monochrome */}
        <div className="space-y-4">
          {termsData.sections.map((section: any, index: number) => {
            const Icon = iconMap[(section as any).iconName] || FileText;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.02 }}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-slate-700" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold mb-3 text-slate-900">
                        {section.title}
                      </h2>
                      <p className="text-slate-600 leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Contact Section - Professional */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-slate-900 rounded-2xl p-12 text-center"
        >
          <h3 className="text-2xl font-bold mb-4 text-white">
            {termsData.contact.heading}
          </h3>
          <p className="text-slate-300 mb-8">
            {termsData.contact.description}
          </p>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            <a href={`mailto:${termsData.contact.email}`} className="flex items-center gap-3 text-white hover:text-slate-300 transition-colors">
              <Mail className="w-5 h-5" />
              <span>{termsData.contact.email}</span>
            </a>
            <span className="hidden md:block text-slate-600">•</span>
            <a href={`tel:+1${termsData.contact.phone.replace(/\D/g, '')}`} className="flex items-center gap-3 text-white hover:text-slate-300 transition-colors">
              <Phone className="w-5 h-5" />
              <span>{termsData.contact.phone}</span>
            </a>
            <span className="hidden md:block text-slate-600">•</span>
            <div className="flex items-center gap-3 text-white">
              <MapPin className="w-5 h-5" />
              <span>{termsData.contact.department}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}