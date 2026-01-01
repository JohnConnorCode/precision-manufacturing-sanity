"use client";

import Link from 'next/link';
import { Linkedin, Twitter, Facebook, Mail, Phone, MapPin, Award, Shield, CheckCircle, Zap, LucideIcon } from 'lucide-react';

// Icon mapping for CMS-driven certification badges
const iconMap: Record<string, LucideIcon> = {
  Shield,
  Award,
  CheckCircle,
  Zap,
};
import Logo from '@/components/ui/logo';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { typography, colors, cn } from '@/lib/design-system';

interface FooterProps {
  data?: {
    servicesHeading?: string;
    resourcesHeading?: string;
    quickLinksHeading?: string;
    contactHeading?: string;
    company?: {
      description?: string;
      foundedYear?: string;
      certifications?: string;
    };
    social?: {
      linkedin?: string;
      twitter?: string;
      facebook?: string;
    };
    servicesLinks?: Array<{
      label?: string;
      text?: string;
      href?: string;
      enabled?: boolean;
    }>;
    resourcesLinks?: Array<{
      label?: string;
      text?: string;
      href?: string;
      enabled?: boolean;
    }>;
    quickLinks?: Array<{
      label?: string;
      text?: string;
      href?: string;
      enabled?: boolean;
    }>;
    contact?: {
      email?: string;
      phone?: string;
      phoneLink?: string;
      address?: string;
    };
    copyright?: string;
    logo?: {
      logoType?: 'svg' | 'custom' | 'original';
      customLogo?: {
        asset?: { url: string; };
        alt?: string;
      };
      svgColor?: 'auto' | 'dark' | 'light';
      showCompanyText?: boolean;
      enableAnimation?: boolean;
    };
    certificationBadges?: Array<{
      _key?: string;
      enabled?: boolean;
      label?: string;
      iconName?: string;
      iconColor?: string;
    }>;
  } | null;
}

const Footer = ({ data }: FooterProps) => {
  // 100% CMS controlled - no hardcoded fallbacks
  // Map Sanity field names (text) to expected field names (label)
  interface FooterLink {
    text?: string;
    label?: string;
    href?: string;
    enabled?: boolean;
  }

  const mapLinks = (links: FooterLink[] | undefined) => {
    if (!links) return [];
    return links
      .filter(link => link?.enabled !== false)
      .map(link => ({
        label: link.text || link.label || '',
        href: link.href || '#'
      }));
  };

  const footerData = {
    servicesHeading: data?.servicesHeading,
    resourcesHeading: data?.resourcesHeading,
    quickLinksHeading: data?.quickLinksHeading,
    contactHeading: data?.contactHeading,
    company: data?.company,
    social: {
      linkedin: data?.social?.linkedin || '',
      twitter: data?.social?.twitter || '',
      facebook: data?.social?.facebook || ''
    },
    servicesLinks: mapLinks(data?.servicesLinks),
    resourcesLinks: mapLinks(data?.resourcesLinks),
    quickLinks: mapLinks(data?.quickLinks),
    contact: {
      email: data?.contact?.email,
      phone: data?.contact?.phone,
      phoneLink: (() => {
        const phoneValue = data?.contact?.phone;
        if (!phoneValue) return undefined;
        const trimmed = phoneValue.trim();
        const digits = phoneValue.replace(/\D/g, '');
        if (trimmed.startsWith('+')) {
          const normalized = trimmed.replace(/[()\s-]/g, '');
          return `tel:${normalized}`;
        }
        return digits ? `tel:+1${digits}` : undefined;
      })(),
      address: data?.contact?.address
    },
    copyright: data?.copyright
  };
  // No entrance animations - content is always visible
  // This prevents jank and ensures reliability on refresh

  return (
    <footer key="site-footer" className={cn(colors.footer.bg, colors.footer.text.primary, 'border-t', colors.footer.border)} suppressHydrationWarning>
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="space-y-4">
            <Logo variant="light" showText={true} size="md" animated={true} logoData={data?.logo} />
            <p className={cn(typography.small, colors.footer.text.secondary, 'max-w-xs')}>
              {footerData.company?.description}
            </p>
            <div className="flex space-x-4">
              {footerData.social.linkedin && footerData.social.linkedin !== '#' && footerData.social.linkedin !== '' && (
                <Link href={footerData.social.linkedin} aria-label="LinkedIn" className="group">
                  <Linkedin className={cn('h-5 w-5', colors.footer.socialIcon, 'group-hover:scale-110')} />
                </Link>
              )}
              {footerData.social.twitter && footerData.social.twitter !== '#' && footerData.social.twitter !== '' && (
                <Link href={footerData.social.twitter} aria-label="Twitter" className="group">
                  <Twitter className={cn('h-5 w-5', colors.footer.socialIcon, 'group-hover:scale-110')} />
                </Link>
              )}
              {footerData.social.facebook && footerData.social.facebook !== '#' && footerData.social.facebook !== '' && (
                <Link href={footerData.social.facebook} aria-label="Facebook" className="group">
                  <Facebook className={cn('h-5 w-5', colors.footer.socialIcon, 'group-hover:scale-110')} />
                </Link>
              )}
            </div>

            {/* Certification Badges - CMS Controlled */}
            {data?.certificationBadges && data.certificationBadges.filter(b => b?.enabled !== false).length > 0 && (
              <div className="mt-6 pt-4 border-t border-slate-700/50">
                <p className={cn('text-xs uppercase tracking-wider mb-3', colors.footer.text.muted)}>Certifications</p>
                <div className="flex flex-wrap gap-3">
                  {data.certificationBadges
                    .filter(badge => badge?.enabled !== false && badge?.label)
                    .map((badge) => {
                      const Icon = iconMap[badge.iconName || 'Shield'] || Shield;
                      return (
                        <div
                          key={badge._key || badge.label}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800/50 dark:bg-slate-700/30 rounded-md border border-slate-700/50"
                        >
                          <Icon className={cn('h-3.5 w-3.5', badge.iconColor || 'text-blue-400')} />
                          <span className={cn('text-xs font-medium', colors.footer.text.secondary)}>{badge.label}</span>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </div>

          <div>
            <h4 className={cn('font-semibold mb-3', colors.footer.text.heading)}>{footerData.servicesHeading}</h4>
            <ul className="space-y-2 text-sm">
              {footerData.servicesLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={cn(colors.footer.linkAnimated, 'inline-block')}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={cn('font-semibold mb-3', colors.footer.text.heading)}>{footerData.resourcesHeading}</h4>
            <ul className="space-y-2 text-sm">
              {footerData.resourcesLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={cn(colors.footer.linkAnimated, 'inline-block')}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={cn('font-semibold mb-3', colors.footer.text.heading)}>{footerData.quickLinksHeading}</h4>
            <ul className="space-y-2 text-sm">
              {footerData.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={cn(colors.footer.linkAnimated, 'inline-block')}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={cn('font-semibold mb-3', colors.footer.text.heading)}>{footerData.contactHeading}</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <Mail className={cn('h-4 w-4 mt-0.5', colors.footer.icon)} />
                <a href={`mailto:${footerData.contact.email}`} className={colors.footer.link}>
                  {footerData.contact.email}
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className={cn('h-4 w-4 mt-0.5', colors.footer.icon)} />
                <a href={footerData.contact.phoneLink} className={colors.footer.link}>
                  {footerData.contact.phone}
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className={cn('h-4 w-4 mt-0.5', colors.footer.icon)} />
                <span className={colors.footer.text.secondary}>
                  {footerData.contact.address?.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < (footerData.contact.address?.split('\n').length ?? 0) - 1 && <br />}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className={cn('mt-8 pt-8 border-t', colors.footer.border)}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className={cn(typography.small, colors.footer.text.muted)}>
              {footerData.copyright?.replace('{year}', new Date().getFullYear().toString())}
            </p>
            <div className="flex items-center space-x-6">
              {/* Theme Toggle */}
              <ThemeToggle variant="dropdown" />
              <Zap className="h-3 w-3 text-blue-400" />
              <div className={cn(typography.badge, colors.footer.text.muted)}>
                <span>Founded {footerData.company?.foundedYear}</span>
                <span className="mx-2">•</span>
                <span>{footerData.company?.certifications}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
