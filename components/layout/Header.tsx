"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Phone, Mail, Zap, ArrowRight, Home, Info, Wrench, Building2, BookOpen, FileText, Briefcase, Layers, Shield, PhoneCall, Mail as MailIcon } from 'lucide-react';
import Logo from '@/components/ui/logo';
import { PremiumButton } from '@/components/ui/premium-button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { theme } from '@/lib/theme';
import { constants } from '@/lib/design-system';

// Hardcoded fallback data
const defaultNavigation = [
  {
    name: 'Services',
    href: '/services',
    children: [
      { name: '5-Axis Machining', href: '/services/5-axis-machining', description: 'Complex geometries with precision' },
      { name: 'Adaptive Machining', href: '/services/adaptive-machining', description: 'Real-time process adjustments' },
      { name: 'Metrology & Inspection', href: '/services/metrology', description: 'Complete dimensional verification' },
      { name: 'Engineering Support', href: '/services/engineering', description: 'Design for manufacturability' },
    ],
  },
  {
    name: 'Industries',
    href: '/industries',
    children: [
      { name: 'Aerospace', href: '/industries/aerospace', description: 'Critical aerospace components' },
      { name: 'Energy & Turbines', href: '/industries/energy', description: 'Power generation solutions' },
      { name: 'Defense', href: '/industries/defense', description: 'ITAR compliant manufacturing' },
    ],
  },
  {
    name: 'Resources',
    href: '/resources',
    children: [
      { name: 'Manufacturing Processes', href: '/resources/manufacturing-processes', description: 'CNC machining guides and techniques' },
      { name: 'Material Science', href: '/resources/material-science', description: 'Aerospace alloys and properties' },
      { name: 'Quality & Compliance', href: '/resources/quality-compliance', description: 'AS9100D and ITAR guidance' },
      { name: 'Industry Applications', href: '/resources/industry-applications', description: 'Real-world case studies' },
      { name: 'Calculators & Tools', href: '/resources/calculators-tools', description: 'Interactive calculators' },
    ],
  },
  {
    name: 'About',
    href: '/about',
  },
  {
    name: 'Compliance',
    href: '#',
    children: [
      { name: 'Terms & Conditions', href: '/compliance/terms', description: 'Purchase order terms' },
      { name: 'Supplier Requirements', href: '/compliance/supplier-requirements', description: 'Supplier guidelines' },
    ],
  },
  {
    name: 'Contact',
    href: '/contact',
  },
];

const defaultTopBar = {
  phone: '503-231-9093',
  phoneLink: 'tel:+15032319093',
  email: 'officemgr@iismet.com',
  emailLink: 'mailto:officemgr@iismet.com',
  certifications: 'ISO 9001 • AS9100D • ITAR REGISTERED'
};

const defaultCTA = {
  text: 'REQUEST QUOTE',
  href: '/contact'
};

interface HeaderProps {
  data?: {
    topBar?: typeof defaultTopBar;
    menuItems?: typeof defaultNavigation;
    cta?: typeof defaultCTA;
    announcement?: {
      enabled?: boolean
      message?: string
      href?: string
      linkText?: string
      variant?: 'info' | 'success' | 'warning' | 'alert'
      startAt?: string
      endAt?: string
    }
  } | null;
}

export default function Header({ data }: HeaderProps) {
  // Use CMS data if available, otherwise fall back to hardcoded defaults
  const topBar = data?.topBar || defaultTopBar;
  const announcement = data?.announcement
  // Filter out items that should not be in the main nav (e.g., Careers)
  const rawNavigation = data?.menuItems || defaultNavigation;
  // Respect CMS flags and remove careers from header
  const navigation = (rawNavigation || []).filter((item: any) => {
    const n = (item?.name || '').toString().toLowerCase();
    const href = (item?.href || '').toString().toLowerCase();
    const banned = ['career', 'careers', 'jobs', 'join our team'];
    const matchesBanned = banned.some((k) => n.includes(k)) || href === '/careers';
    const visible = item?.showInHeader !== false;
    return visible && !matchesBanned;
  });
  const cta = data?.cta || defaultCTA;
  const navStyles = (data as any)?.styles || {}
  const align: 'left' | 'center' | 'right' = navStyles.alignment || 'left'
  const themeMode: 'auto' | 'light' | 'dark' = navStyles.theme || 'auto'
  const density: 'comfortable' | 'compact' = navStyles.density || 'comfortable'
  const dropdownStyle: 'card' | 'columns' = navStyles.dropdownStyle || 'card'
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > constants.scrollThreshold.header);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDark = themeMode === 'dark'
  const listJustify = align === 'left' ? 'justify-start' : align === 'right' ? 'justify-end' : 'justify-center'
  const sizeClasses = density === 'compact' ? 'h-9 px-3 py-1.5' : 'h-10 px-4 py-2'
  const linkTone = isDark ? 'hover:bg-slate-900/30 text-slate-100' : 'hover:bg-slate-50 text-slate-700'
  const activeTone = isDark ? 'bg-slate-800/50' : 'bg-slate-100/50'
  const triggerTone = isDark ? 'bg-transparent hover:bg-slate-900/40 text-slate-100' : 'bg-transparent hover:bg-slate-50 text-slate-700'
  const dropdownTone = isDark ? 'bg-slate-900/95 border border-slate-800' : 'bg-white/95 border border-slate-200/50'

  const headerClass = cn(
    'fixed z-[140] w-full transition-all duration-300 lg:top-10 top-0',
    isDark
      ? (isScrolled
          ? 'bg-slate-950/95 backdrop-blur-xl shadow-lg border-b-2 border-slate-800'
          : 'bg-slate-950/90 backdrop-blur-xl border-b border-slate-800')
      : (isScrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b-2 border-blue-600/20'
          : 'bg-white/90 backdrop-blur-xl border-b border-slate-200/50')
  )

  const iconMap: Record<string, any> = {
    home: Home,
    about: Info,
    info: Info,
    services: Wrench,
    industries: Building2,
    resources: BookOpen,
    terms: FileText,
    'supplier-requirements': Shield,
    careers: Briefcase,
    jobs: Briefcase,
    layers: Layers,
    contact: PhoneCall,
    phone: PhoneCall,
    mail: MailIcon,
    book: BookOpen,
    wrench: Wrench,
    building2: Building2,
    'file-text': FileText,
  }

  function IconFor(name?: string) {
    if (!name) return null
    const Cmp = iconMap[(name || '').toLowerCase()]
    return Cmp ? <Cmp className="h-4 w-4 mr-2" /> : null
  }

  return (
    <>
      {/* Announcement Bar (optional) */}
      {(() => {
        if (!announcement?.enabled) return null
        const now = new Date().toISOString()
        if (announcement.startAt && now < announcement.startAt) return null
        if (announcement.endAt && now > announcement.endAt) return null
        const tones: Record<string, string> = {
          info: 'bg-blue-600 text-white',
          success: 'bg-green-600 text-white',
          warning: 'bg-amber-500 text-slate-900',
          alert: 'bg-red-600 text-white',
        }
        const tone = tones[announcement.variant || 'info']
        return (
          <aside className={cn('fixed top-0 z-[160] w-full', tone)} role="status" aria-label="Announcement">
            <div className="container flex h-10 items-center justify-center text-sm gap-3">
              <span>{announcement.message}</span>
              {announcement.href && (
                <Link href={announcement.href} className="underline font-semibold">
                  {announcement.linkText || 'Learn more'}
                </Link>
              )}
            </div>
          </aside>
        )
      })()}

      {/* Top Info Bar - Hidden on mobile */}
      <aside className={cn('hidden lg:block fixed z-[150] w-full bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-blue-600/10', announcement?.enabled ? 'top-10' : 'top-0')} role="complementary" aria-label="Contact information">
        <div className="container flex h-10 items-center justify-between text-sm">
          <div className="flex items-center space-x-6">
            <a href={topBar.phoneLink} className="flex items-center space-x-2 text-slate-400 hover:text-blue-600 transition-colors group" aria-label={`Phone: ${topBar.phone}`}>
              <Phone className="h-3 w-3 group-hover:text-blue-600" aria-hidden="true" />
              <span>{topBar.phone}</span>
            </a>
            <a href={topBar.emailLink} className="flex items-center space-x-2 text-slate-400 hover:text-blue-600 transition-colors group" aria-label={`Email: ${topBar.email}`}>
              <Mail className="h-3 w-3 group-hover:text-blue-600" aria-hidden="true" />
              <span>{topBar.email}</span>
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <Zap className="h-3 w-3 text-blue-600" aria-hidden="true" />
            <span className={cn(theme.typography.badge, 'text-slate-400')}>{topBar.certifications}</span>
          </div>
        </div>
      </aside>

      {/* Main Navigation */}
      <header className={cn(headerClass, announcement?.enabled ? 'lg:top-20 top-10' : 'lg:top-10 top-0')}>
        <nav className="container flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2" aria-label="IIS - Integrated Inspection Systems Home">
            <Logo className="h-16 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className={listJustify}>
              {navigation.map((item: any) => {
                const children = Array.isArray((item as any).children)
                  ? (item as any).children.filter((c: any) => c && (c.href || c.name))
                  : []
                const hasChildren = children.length > 0
                const href = (item.href && item.href !== '#') ? item.href : '/'
                const itemVariant = item?.style?.variant || 'link'
                const badgeText = item?.style?.badgeText
                const target = item?.openInNewTab ? '_blank' : undefined
                const rel = item?.openInNewTab ? 'noopener noreferrer' : undefined
                return (
                  <NavigationMenuItem key={item.name}>
                    {hasChildren ? (
                      <>
                        <NavigationMenuTrigger
                          className={cn(
                            triggerTone,
                            'font-medium',
                            sizeClasses,
                            'data-[state=open]:bg-slate-50',
                            isDark && 'data-[state=open]:bg-slate-900/40'
                          )}
                          aria-label={`${item.name} menu`}
                        >
                          <span className="inline-flex items-center">
                            {IconFor(item?.iconName)}
                            {item.name}
                          </span>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <motion.ul
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={cn(
                              'grid backdrop-blur-xl rounded-xl shadow-xl',
                              dropdownTone,
                              dropdownStyle === 'columns'
                                ? 'grid-cols-2 md:grid-cols-3 w-[720px] gap-4 p-6'
                                : 'w-[500px] gap-2 p-4'
                            )}
                          >
                            {dropdownStyle === 'columns'
                              ? (() => {
                                  const groups: Array<{ title: string; items: any[] }> = []
                                  const misc: any[] = []
                                  for (const ch of children) {
                                    if (Array.isArray(ch.children) && ch.children.length > 0) {
                                      groups.push({ title: ch.name, items: ch.children })
                                    } else {
                                      misc.push(ch)
                                    }
                                  }
                                  if (misc.length > 0) groups.push({ title: 'More', items: misc })
                                  return groups.map((group) => (
                                    <li key={group.title} className="min-w-0">
                                      <div className="px-1 pb-2">
                                        <div className={cn('text-xs uppercase tracking-wide mb-2', isDark ? 'text-slate-400' : 'text-slate-500')}>
                                          {group.title}
                                        </div>
                                        <div className="flex flex-col gap-2">
                                          {group.items.map((gitem: any) => (
                                            <Link
                                              key={gitem.name}
                                              href={(gitem.href && gitem.href !== '#') ? gitem.href : href}
                                              target={gitem?.openInNewTab ? '_blank' : undefined}
                                              rel={gitem?.openInNewTab ? 'noopener noreferrer' : undefined}
                                              className={cn(
                                                'rounded-md px-3 py-2 transition-colors',
                                                isDark ? 'hover:bg-slate-800/60 text-slate-100' : 'hover:bg-slate-100/80 text-slate-900'
                                              )}
                                            >
                                              <div className="text-sm font-semibold flex items-center">
                                                {IconFor(gitem?.iconName)}
                                                {gitem.name}
                                              </div>
                                              {gitem.description && (
                                                <div className={cn('text-xs mt-0.5', isDark ? 'text-slate-400' : 'text-slate-500')}>
                                                  {gitem.description}
                                                </div>
                                              )}
                                            </Link>
                                          ))}
                                        </div>
                                      </div>
                                    </li>
                                  ))
                                })()
                              : children.map((child: any) => (
                                  <li key={child.name}>
                                    <NavigationMenuLink asChild>
                                      <Link
                                        href={(child.href && child.href !== '#') ? child.href : href}
                                        target={child?.openInNewTab ? '_blank' : undefined}
                                        rel={child?.openInNewTab ? 'noopener noreferrer' : undefined}
                                        className={cn(
                                          'block select-none rounded-lg p-4 no-underline outline-none transition-all group h-full',
                                          isDark
                                            ? 'hover:bg-slate-800/60 focus:bg-slate-800/60 text-slate-100'
                                            : 'hover:bg-slate-100/80 focus:bg-slate-100 text-slate-900'
                                        )}
                                        aria-label={child.name}
                                      >
                                        <div className={cn('text-sm font-semibold', isDark ? 'text-slate-100 group-hover:text-white' : 'text-slate-900 group-hover:text-slate-700')}>
                                          <span className="inline-flex items-center">
                                            {IconFor(child?.iconName)}
                                            {child.name}
                                          </span>
                                        </div>
                                        {child.description && (
                                          <div className={cn('text-xs mt-1', isDark ? 'text-slate-400' : 'text-slate-500')}>
                                            {child.description}
                                          </div>
                                        )}
                                      </Link>
                                    </NavigationMenuLink>
                                  </li>
                                ))}
                          </motion.ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      itemVariant.startsWith('button-') ? (
                        <NavigationMenuLink asChild>
                          <Link href={href} target={target} rel={rel}>
                            <PremiumButton
                              variant={itemVariant === 'button-primary' ? 'default' : 'secondary'}
                              size={density === 'compact' ? 'sm' : 'default'}
                            >
                              <span className="inline-flex items-center">
                                {IconFor(item?.iconName)}
                                {item.name}
                              </span>
                            </PremiumButton>
                          </Link>
                        </NavigationMenuLink>
                      ) : (
                        <NavigationMenuLink asChild>
                          <Link
                            href={href}
                            target={target}
                            rel={rel}
                            className={cn(
                              'inline-flex w-max items-center justify-center rounded-md',
                              sizeClasses,
                              'text-sm font-medium transition-all',
                              linkTone,
                              pathname === href && activeTone
                            )}
                          >
                            <span className="inline-flex items-center">
                              {IconFor(item?.iconName)}
                              {item.name}
                            </span>
                            {badgeText && (
                              <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-blue-600 text-white">
                                {badgeText}
                              </span>
                            )}
                          </Link>
                        </NavigationMenuLink>
                      )
                    )}
                  </NavigationMenuItem>
                )
              })}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop CTA - Premium Design */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link href={cta.href}>
              <PremiumButton>
                {cta.text}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </PremiumButton>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <button className="p-2 hover:bg-slate-100/50 rounded-lg transition-colors" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className={cn('w-[300px] sm:w-[400px] backdrop-blur-xl overflow-y-auto max-h-screen', isDark ? 'bg-slate-950/95' : 'bg-white/95')}>
              <nav className="flex flex-col space-y-6 mt-8">
                {navigation.map((item: any) => {
                  const children = Array.isArray(item.children) ? item.children : []
                  const href = (item.href && item.href !== '#') ? item.href : '/'
                  const itemVariant = item?.style?.variant || 'link'
                  const target = item?.openInNewTab ? '_blank' : undefined
                  const rel = item?.openInNewTab ? 'noopener noreferrer' : undefined
                  return (
                    <div key={item.name}>
                      {children.length > 0 ? (
                        <div className="space-y-3">
                          <div className="font-semibold text-sm text-slate-900">
                            {item.name}
                          </div>
                          <div className="space-y-2 pl-4">
                            {children.map((child: any) => (
                              <Link
                                key={child.name}
                                href={(child.href && child.href !== '#') ? child.href : href}
                                target={child?.openInNewTab ? '_blank' : undefined}
                                rel={child?.openInNewTab ? 'noopener noreferrer' : undefined}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block py-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
                              >
                                <span className="inline-flex items-center">
                                  {IconFor(child?.iconName)}
                                  {child.name}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : itemVariant.startsWith('button-') ? (
                        <Link href={href} target={target} rel={rel} onClick={() => setMobileMenuOpen(false)}>
                          <PremiumButton className="w-full" variant={itemVariant === 'button-primary' ? 'default' : 'secondary'}>
                            <span className="inline-flex items-center justify-center w-full">
                              {IconFor(item?.iconName)}
                              {item.name}
                            </span>
                          </PremiumButton>
                        </Link>
                      ) : (
                        <Link
                          href={href}
                          target={target}
                          rel={rel}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-2 font-semibold text-slate-900 hover:text-slate-700 transition-colors"
                        >
                          <span className="inline-flex items-center">
                            {IconFor(item?.iconName)}
                            {item.name}
                          </span>
                        </Link>
                      )}
                    </div>
                  )
                })}
              <Link href={cta.href} onClick={() => setMobileMenuOpen(false)} className="block mt-6">
                <PremiumButton className="w-full">
                  {cta.text}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </PremiumButton>
              </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </nav>
      </header>
    </>
  );
}
