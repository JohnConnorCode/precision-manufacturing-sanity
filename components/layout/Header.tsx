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
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { typography } from '@/lib/design-system';
import { throttleRAF } from '@/lib/performance';

interface HeaderProps {
  data?: {
    topBar?: {
      showPhone?: boolean;
      phone?: string;
      phoneLink?: string;
      showEmail?: boolean;
      email?: string;
      emailLink?: string;
      showCertifications?: boolean;
      certifications?: string;
    };
    menuItems?: Array<{
      name: string;
      href: string;
      description?: string;
      children?: Array<{
        name: string;
        href: string;
        description?: string;
      }>;
      showInHeader?: boolean;
    }>;
    cta?: {
      text: string;
      href: string;
    };
    moreButtonText?: string;
    announcement?: {
      enabled?: boolean
      message?: string
      href?: string
      linkText?: string
      variant?: 'info' | 'success' | 'warning' | 'alert'
      startAt?: string
      endAt?: string
    }
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
  } | null;
}

export default function Header({ data }: HeaderProps) {
  // 100% CMS controlled - no hardcoded fallbacks
  const topBar = data?.topBar;
  const announcement = data?.announcement;
  // Filter out items hidden via CMS flags
  const rawNavigation = data?.menuItems;
  const navigation = (rawNavigation || []).filter((item: any) => item?.showInHeader !== false);
  const cta = data?.cta;
  const moreButtonText = data?.moreButtonText;
  const navStyles = (data as any)?.styles || {}
  const align: 'left' | 'center' | 'right' = navStyles.alignment || 'left'
  const themeMode: 'auto' | 'light' | 'dark' = navStyles.theme || 'auto'
  const density: 'comfortable' | 'compact' = navStyles.density || 'comfortable'
  const dropdownStyle: 'card' | 'columns' = navStyles.dropdownStyle || 'card'
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const pathname = usePathname();
  // Use static ID to prevent hydration mismatch (only one mobile menu per page)
  const mobileSheetId = 'mobile-navigation-sheet';

  // Check announcement dates client-side only to avoid hydration errors
  useEffect(() => {
    if (!announcement?.enabled) {
      setShowAnnouncement(false);
      return;
    }

    const now = new Date().toISOString();
    const shouldShow =
      (!announcement.startAt || now >= announcement.startAt) &&
      (!announcement.endAt || now <= announcement.endAt);

    setShowAnnouncement(shouldShow);
  }, [announcement]);

  // Optimized scroll handler with requestAnimationFrame throttling
  // This reduces re-renders from ~60/sec to ~16/sec (60fps)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Use requestAnimationFrame throttling for optimal scroll performance
    const throttledScroll = throttleRAF(handleScroll);

    // Set initial state
    handleScroll();

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  const isDark = themeMode === 'dark'
  const listJustify = align === 'left' ? 'justify-start' : align === 'right' ? 'justify-end' : 'justify-center'

  // Animation variants for nav items
  const navContainerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3
      }
    }
  }

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const
      }
    }
  }
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
      {showAnnouncement && announcement?.enabled && (
        <aside
          className={cn(
            'fixed top-0 z-[160] w-full',
            announcement.variant === 'success' ? 'bg-green-600 text-white' :
            announcement.variant === 'warning' ? 'bg-amber-500 text-slate-900' :
            announcement.variant === 'alert' ? 'bg-red-600 text-white' :
            'bg-blue-600 text-white'
          )}
          role="status"
          aria-label="Announcement"
        >
          <div className="container flex h-10 items-center justify-center text-sm gap-3">
            <span>{announcement.message}</span>
            {announcement.href && announcement.linkText && (
              <Link href={announcement.href} className="underline font-semibold">
                {announcement.linkText}
              </Link>
            )}
          </div>
        </aside>
      )}

      {/* Top Info Bar - Hidden on mobile */}
      {topBar && (
      <aside className={cn('hidden lg:block fixed z-[150] w-full bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-blue-600/10', announcement?.enabled ? 'top-10' : 'top-0')} role="complementary" aria-label="Contact information">
        <div className="container flex h-10 items-center justify-between text-sm">
          <div className="flex items-center space-x-6">
            {topBar?.showPhone !== false && (
              <a href={topBar?.phoneLink} className="flex items-center space-x-2 text-slate-400 hover:text-blue-600 transition-colors group" aria-label={`Phone: ${topBar?.phone}`}>
                <Phone className="h-3 w-3 group-hover:text-blue-600" aria-hidden="true" />
                <span>{topBar?.phone}</span>
              </a>
            )}
            {topBar?.showEmail !== false && (
              <a href={topBar?.emailLink} className="flex items-center space-x-2 text-slate-400 hover:text-blue-600 transition-colors group" aria-label={`Email: ${topBar?.email}`}>
                <Mail className="h-3 w-3 group-hover:text-blue-600" aria-hidden="true" />
                <span>{topBar?.email}</span>
              </a>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {topBar?.showCertifications !== false && (
              <>
                <Zap className="h-3 w-3 text-blue-400" aria-hidden="true" />
                <span className={cn(typography.badge, 'text-slate-400')}>{topBar?.certifications}</span>
              </>
            )}
          </div>
        </div>
      </aside>
      )}

      {/* Main Navigation */}
      <header className={cn(headerClass, announcement?.enabled ? 'lg:top-20 top-10' : 'lg:top-10 top-0')} suppressHydrationWarning>
        <nav className="container flex h-20 items-center justify-between gap-4" suppressHydrationWarning>
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0" aria-label="IIS - Integrated Inspection Systems Home">
            <Logo className="h-12 sm:h-14 md:h-16 w-auto" logoData={data?.logo} animated={true} />
          </Link>

          {/* Desktop Navigation - Progressive Collapse Strategy */}
          <NavigationMenu className="hidden lg:flex flex-1">
            <motion.div
              variants={navContainerVariants}
              initial="hidden"
              animate="visible"
              className="w-full"
            >
            <NavigationMenuList className={listJustify}>
              {navigation.map((item: any, index: number) => {
                const children = Array.isArray((item as any).children)
                  ? (item as any).children.filter((c: any) => c && (c.href || c.name))
                  : []
                const hasChildren = children.length > 0
                const href = (item.href && item.href !== '#') ? item.href : '/'
                const itemVariant = item?.style?.variant || 'link'
                const badgeText = item?.style?.badgeText
                const target = item?.openInNewTab ? '_blank' : undefined
                const rel = item?.openInNewTab ? 'noopener noreferrer' : undefined

                // Progressive collapse: hide less important items at smaller breakpoints
                // Priority 1 (always show on lg+): Services, Industries, Contact (indexes 0, 1, 5)
                // Priority 2 (show on xl+): Resources, About, Compliance (indexes 2, 3, 4)
                const isPriority1 = index === 0 || index === 1 || index === 5 // Services, Industries, Contact
                const itemClasses = isPriority1 ? '' : 'hidden xl:flex'

                return (
                  <motion.div key={item.name} variants={navItemVariants}>
                  <NavigationMenuItem className={itemClasses}>
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
                  </motion.div>
                )
              })}
            </NavigationMenuList>
            </motion.div>
          </NavigationMenu>

          {/* Desktop CTA - Premium Design */}
          {cta && cta.text && (
          <motion.div
            className="hidden lg:flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
          >
            <Link href={cta.href || '/contact'}>
              <PremiumButton>
                {cta.text}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </PremiumButton>
            </Link>
          </motion.div>
          )}

          {/* Mobile/More Menu - Shows below lg (1024px) OR as "More" button on lg-xl */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            {/* Mobile hamburger (below lg) */}
            <button
              type="button"
              className="lg:hidden relative w-12 h-12 flex items-center justify-center rounded-lg hover:bg-slate-100/80 active:bg-slate-200/60 transition-all duration-200"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-haspopup="dialog"
              aria-expanded={mobileMenuOpen}
              aria-controls={mobileSheetId}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              {/* Animated Hamburger Icon */}
              <div className="w-6 h-5 flex flex-col justify-center items-center gap-1.5">
                <motion.span
                  animate={{
                    rotate: mobileMenuOpen ? 45 : 0,
                    y: mobileMenuOpen ? 8 : 0,
                  }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="w-full h-0.5 bg-slate-900 rounded-full origin-center"
                />
                <motion.span
                  animate={{
                    opacity: mobileMenuOpen ? 0 : 1,
                    x: mobileMenuOpen ? -10 : 0,
                  }}
                  transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                  className="w-full h-0.5 bg-slate-900 rounded-full"
                />
                <motion.span
                  animate={{
                    rotate: mobileMenuOpen ? -45 : 0,
                    y: mobileMenuOpen ? -8 : 0,
                  }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="w-full h-0.5 bg-slate-900 rounded-full origin-center"
                />
              </div>
            </button>

            {/* "More" button for lg-xl screens (when some items are hidden) */}
            {moreButtonText && (
            <button
              type="button"
              className="hidden lg:flex xl:hidden items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all hover:bg-slate-100/80 active:bg-slate-200/60"
              aria-label="More menu options"
              aria-haspopup="dialog"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              <Menu className="h-4 w-4" />
              <span>{moreButtonText}</span>
            </button>
            )}

            <SheetContent
              id={mobileSheetId}
              side="right"
              className={cn(
                'w-full sm:w-[400px] border-l',
                isDark
                  ? 'bg-slate-900 border-slate-700'
                  : 'bg-white border-slate-200'
              )}
            >
              <nav className="flex flex-col h-full pt-12 pb-6">
                <div className="flex-1 overflow-y-auto px-4">
                  <div className="space-y-2">
                    {navigation.map((item: any) => {
                      const children = Array.isArray(item.children) ? item.children : []
                      const href = (item.href && item.href !== '#') ? item.href : '/'
                      const itemVariant = item?.style?.variant || 'link'
                      const target = item?.openInNewTab ? '_blank' : undefined
                      const rel = item?.openInNewTab ? 'noopener noreferrer' : undefined
                      return (
                        <div key={item.name} className="py-1">
                          {children.length > 0 ? (
                            <div className="space-y-1">
                              <div className={cn(
                                "px-3 py-2.5 font-bold text-lg",
                                isDark ? 'text-white' : 'text-slate-900'
                              )}>
                                <span className="inline-flex items-center gap-3">
                                  {IconFor(item?.iconName)}
                                  {item.name}
                                </span>
                              </div>
                              <div className="space-y-1 pl-4 ml-3 border-l-2 border-slate-300">
                                {children.map((child: any) => (
                                  <Link
                                    key={child.name}
                                    href={(child.href && child.href !== '#') ? child.href : href}
                                    target={child?.openInNewTab ? '_blank' : undefined}
                                    rel={child?.openInNewTab ? 'noopener noreferrer' : undefined}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={cn(
                                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium transition-colors",
                                      isDark
                                        ? 'text-slate-200 hover:text-white hover:bg-slate-800'
                                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                                    )}
                                  >
                                    {IconFor(child?.iconName)}
                                    {child.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ) : itemVariant.startsWith('button-') ? (
                            <Link href={href} target={target} rel={rel} onClick={() => setMobileMenuOpen(false)}>
                              <PremiumButton className="w-full" variant={itemVariant === 'button-primary' ? 'default' : 'secondary'}>
                                <span className="inline-flex items-center justify-center w-full gap-2">
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
                              className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg font-bold text-lg transition-colors",
                                isDark
                                  ? 'text-white hover:bg-slate-800'
                                  : 'text-slate-900 hover:bg-slate-100',
                                pathname === href && (isDark ? 'bg-slate-800' : 'bg-slate-100')
                              )}
                            >
                              {IconFor(item?.iconName)}
                              {item.name}
                            </Link>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* CTA Button at bottom */}
                <div className="px-4 pt-6 border-t border-slate-200">
                  {cta && (
                  <Link href={cta?.href || '/contact'} onClick={() => setMobileMenuOpen(false)} className="block">
                    <PremiumButton className="w-full h-12 text-base font-semibold">
                      {cta?.text}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </PremiumButton>
                  </Link>
                  )}

                  {/* Contact info */}
                  {topBar && (
                  <div className="mt-4 space-y-2">
                    {topBar?.showPhone !== false && (
                      <a
                        href={topBar?.phoneLink}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                          isDark
                            ? 'text-slate-200 hover:text-white hover:bg-slate-800'
                            : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                        )}
                        aria-label={`Call ${topBar?.phone}`}
                      >
                        <Phone className="h-5 w-5" />
                        <span className="text-base font-medium">{topBar?.phone}</span>
                      </a>
                    )}
                    {topBar?.showEmail !== false && (
                      <a
                        href={topBar?.emailLink}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                          isDark
                            ? 'text-slate-200 hover:text-white hover:bg-slate-800'
                            : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                        )}
                        aria-label={`Email ${topBar?.email}`}
                      >
                        <Mail className="h-5 w-5" />
                        <span className="text-base font-medium">{topBar?.email}</span>
                      </a>
                    )}
                  </div>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </nav>
      </header>
    </>
  );
}
