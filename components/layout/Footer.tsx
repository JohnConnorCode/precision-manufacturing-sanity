"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Linkedin, Twitter, Facebook, Mail, Phone, MapPin, Zap } from 'lucide-react';
import Logo from '@/components/ui/logo';
import { theme, cn } from '@/lib/theme';
import { motion } from 'framer-motion';

// Hardcoded fallback data
const defaultFooterData = {
  company: {
    description: 'Precision manufacturing and metrology solutions for aerospace, defense, and advanced industries.',
    foundedYear: '1995',
    certifications: 'ISO 9001:2015 • AS9100D • ITAR Registered'
  },
  social: {
    linkedin: '#',
    twitter: '#',
    facebook: '#'
  },
  servicesLinks: [
    { label: 'Machining', href: '/services' },
    { label: 'Inspection', href: '/services' },
    { label: 'Fixture Design', href: '/services' },
    { label: 'Metrology', href: '/services' },
    { label: 'Metbase®', href: '/services' }
  ],
  resourcesLinks: [
    { label: 'All Resources', href: '/resources' },
    { label: 'Manufacturing Processes', href: '/resources/manufacturing-processes' },
    { label: 'Quality & Compliance', href: '/resources/quality-compliance' },
    { label: 'Material Science', href: '/resources/material-science' }
  ],
  quickLinks: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Industries', href: '/industries' },
    { label: 'Terms & Conditions', href: '/compliance/terms' },
    { label: 'Supplier Requirements', href: '/compliance/supplier-requirements' },
    { label: 'Contact', href: '/contact' }
  ],
  contact: {
    email: 'officemgr@iismet.com',
    phone: '+1 (503) 231-9093',
    phoneLink: 'tel:+15032319093',
    address: '14310 SE Industrial Way\nClackamas, OR 97015\nUnited States'
  },
  copyright: '© {year} Integrated Inspection Systems, Inc. All rights reserved.'
};

interface FooterProps {
  data?: (typeof defaultFooterData & {
    logo?: {
      logoType?: 'svg' | 'custom' | 'original';
      customLogo?: {
        asset?: { url: string; };
        alt?: string;
      };
      svgColor?: 'auto' | 'dark' | 'light';
      showCompanyText?: boolean;
      enableAnimation?: boolean;
    }
  }) | null;
}

const Footer = ({ data }: FooterProps) => {
  // Use CMS data if available, otherwise fall back to hardcoded defaults
  // Map Sanity field names (text) to expected field names (label)
  const mapLinks = (links: any[] | undefined) => {
    if (!links) return defaultFooterData.servicesLinks;
    return links.map(link => ({
      label: link.text || link.label || '',
      href: link.href || '#'
    }));
  };

  const footerData = {
    company: data?.company || defaultFooterData.company,
    social: {
      linkedin: data?.social?.linkedin || '#',
      twitter: data?.social?.twitter || '#',
      facebook: data?.social?.facebook || '#'
    },
    servicesLinks: mapLinks(data?.servicesLinks),
    resourcesLinks: mapLinks(data?.resourcesLinks),
    quickLinks: mapLinks(data?.quickLinks),
    contact: {
      email: data?.contact?.email || defaultFooterData.contact.email,
      phone: data?.contact?.phone || defaultFooterData.contact.phone,
      phoneLink: data?.contact?.phone ? `tel:+1${data.contact.phone.replace(/\D/g, '')}` : defaultFooterData.contact.phoneLink,
      address: data?.contact?.address || defaultFooterData.contact.address
    },
    copyright: data?.copyright || defaultFooterData.copyright
  };
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const footer = document.querySelector('footer');
    if (footer) {
      observer.observe(footer);
    }

    return () => {
      if (footer) {
        observer.unobserve(footer);
      }
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <footer key="site-footer" className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white border-t border-blue-600/10" suppressHydrationWarning>
      <div className="container py-12 md:py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="space-y-4">
            <motion.div variants={logoVariants}>
              <Logo variant="light" showText={true} size="md" logoData={data?.logo} />
            </motion.div>
            <p className={cn(theme.typography.small, 'text-slate-400 max-w-xs')}>
              {footerData.company.description}
            </p>
            <div className="flex space-x-4">
              <Link href={footerData.social.linkedin} aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 text-slate-400 hover:text-blue-600 transition-colors" />
              </Link>
              <Link href={footerData.social.twitter} aria-label="Twitter">
                <Twitter className="h-5 w-5 text-slate-400 hover:text-blue-600 transition-colors" />
              </Link>
              <Link href={footerData.social.facebook} aria-label="Facebook">
                <Facebook className="h-5 w-5 text-slate-400 hover:text-blue-600 transition-colors" />
              </Link>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="font-semibold mb-3 text-blue-600">Services</h4>
            <ul className="space-y-2 text-sm">
              {footerData.servicesLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-slate-400 hover:text-blue-600 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="font-semibold mb-3 text-blue-600">Resources</h4>
            <ul className="space-y-2 text-sm">
              {footerData.resourcesLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-slate-400 hover:text-blue-600 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="font-semibold mb-3 text-blue-600">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {footerData.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-slate-400 hover:text-blue-600 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="font-semibold mb-3 text-blue-600">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <Mail className="h-4 w-4 text-slate-400 mt-0.5" />
                <a href={`mailto:${footerData.contact.email}`} className="text-slate-400 hover:text-blue-600 transition-colors">
                  {footerData.contact.email}
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="h-4 w-4 text-slate-400 mt-0.5" />
                <a href={footerData.contact.phoneLink} className="text-slate-400 hover:text-blue-600 transition-colors">
                  {footerData.contact.phone}
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-slate-400 mt-0.5" />
                <span className="text-slate-400">
                  {footerData.contact.address.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < footerData.contact.address.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-8 pt-8 border-t border-blue-600/10"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className={cn(theme.typography.small, 'text-slate-500')}>
              {footerData.copyright.replace('{year}', new Date().getFullYear().toString())}
            </p>
            <div className="flex items-center space-x-6">
              <Zap className="h-3 w-3 text-blue-600" />
              <div className={cn(theme.typography.badge, 'text-slate-500')}>
                <span>Founded {footerData.company.foundedYear}</span>
                <span className="mx-2">•</span>
                <span>{footerData.company.certifications}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;