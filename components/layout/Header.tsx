"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Phone, Mail, Zap, ArrowRight, Home, Info, Wrench, Building2, BookOpen, FileText, Briefcase, Layers, Shield, PhoneCall, Mail as MailIcon, LucideIcon } from 'lucide-react';
import Logo from '@/components/ui/logo';
import { PremiumButton } from '@/components/ui/premium-button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { typography } from '@/lib/design-system';
import { throttleRAF } from '@/lib/performance';

// Child menu item type
interface ChildMenuItem {
  name: string;
  href: string;
  description?: string;
  iconName?: string;
  openInNewTab?: boolean;
}

// Main menu item type
interface MenuItem {
  name: string;
  href: string;
  description?: string;
  children?: ChildMenuItem[];
  showInHeader?: boolean;
  iconName?: string;
  openInNewTab?: boolean;
  style?: {
    variant?: string;
    badgeText?: string;
  };
}

// Navigation styles type
interface NavStyles {
  alignment?: 'left' | 'center' | 'right';
  density?: 'comfortable' | 'compact';
}

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
    menuItems?: MenuItem[];
    cta?: {
      text: string;
      href: string;
    };
    moreButtonText?: string;
    styles?: NavStyles;
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
  const navigation = (rawNavigation || []).filter((item: MenuItem) => item?.showInHeader !== false);
  const cta = data?.cta;
  const moreButtonText = data?.moreButtonText;
  const navStyles = data?.styles || {};
  const align: 'left' | 'center' | 'right' = navStyles.alignment || 'left';
  const density: 'comfortable' | 'compact' = navStyles.density || 'comfortable';
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverHero, setIsOverHero] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const pathname = usePathname();

  // Track client-side mounting for theme toggle hydration
  const [mounted, setMounted] = useState(false);

  // Use static ID to prevent hydration mismatch (only one mobile menu per page)
  const mobileSheetId = 'mobile-navigation-sheet';

  // Prevent hydration mismatch for theme
  useEffect(() => setMounted(true), []);

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

  // Hero section detection - transparent header over dark hero sections
  useEffect(() => {
    const heroSection = document.querySelector('[data-hero-section]');
    if (!heroSection) {
      setIsOverHero(false);
      return;
    }

    const handleHeroScroll = () => {
      const heroBottom = heroSection.getBoundingClientRect().bottom;
      // Header is ~80px tall, transition when hero bottom passes header
      setIsOverHero(heroBottom > 80);
    };

    // Use requestAnimationFrame throttling
    const throttledHeroScroll = throttleRAF(handleHeroScroll);

    // Set initial state
    handleHeroScroll();

    window.addEventListener('scroll', throttledHeroScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledHeroScroll);
  }, [pathname]); // Re-check on route change

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

  // Gradient bottom border for hover/active states - animates width from center
  const gradientBorder = 'relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-600 after:via-blue-500 after:to-indigo-600 hover:after:w-full after:transition-all after:duration-300 after:ease-out'
  const activeGradientBorder = 'after:w-full'

  // Hero mode: transparent header with white text when over dark hero sections
  const inHeroMode = isOverHero && !isScrolled;

  // Use Tailwind dark: variants instead of conditional logic
  // When over hero, use white text; otherwise use standard colors
  const linkTone = inHeroMode
    ? `text-white/90 hover:text-white ${gradientBorder}`
    : `text-slate-700 dark:text-slate-100 ${gradientBorder}`;
  const activeTone = activeGradientBorder;
  const triggerTone = inHeroMode
    ? `bg-transparent text-white/90 hover:text-white ${gradientBorder}`
    : `bg-transparent text-slate-700 dark:text-slate-100 ${gradientBorder}`;

  const headerClass = cn(
    'fixed z-[140] w-full transition-all duration-500 top-0',
    inHeroMode
      ? 'bg-slate-950/20 backdrop-blur-sm border-b border-white/10'
      : isScrolled
        ? 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl shadow-lg border-b-2 border-blue-600/20 dark:border-slate-800'
        : 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800'
  )

  const iconMap: Record<string, LucideIcon> = {
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

      {/* Top Info Bar - Scrolls with page, elegant dark design */}
      {topBar && (
      <aside className="hidden lg:block w-full bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800/50" role="complementary" aria-label="Contact information">
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
      <header className={cn(headerClass, showAnnouncement && announcement?.enabled && 'top-10')} suppressHydrationWarning>
        <nav className="container flex h-20 items-center justify-between gap-4" suppressHydrationWarning>
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0" aria-label="IIS - Integrated Inspection Systems Home">
            <Logo
              className="h-12 sm:h-14 md:h-16 w-auto"
              logoData={data?.logo}
              animated={true}
              variant={inHeroMode ? 'light' : 'default'}
            />
          </Link>

          {/* Desktop Navigation - Click-based Dropdowns */}
          <nav className="hidden lg:flex items-center justify-center flex-1">
            <motion.div
              variants={navContainerVariants}
              initial="hidden"
              animate="visible"
            >
            <ul className={cn('flex list-none items-center space-x-2', listJustify)}>
              {navigation.map((item: MenuItem, index: number) => {
                const children = Array.isArray(item.children)
                  ? item.children.filter((c: ChildMenuItem) => c && (c.href || c.name))
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

                // Check if item has a real href (not just '#')
                const hasRealHref = href && href !== '/' && href !== '#'

                return (
                  <motion.li key={item.name} variants={navItemVariants} className={itemClasses}>
                    {hasChildren ? (
                      /* Click-based dropdown - entire item opens dropdown */
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          className={cn(
                            'group inline-flex items-center justify-center rounded-lg bg-transparent text-sm font-medium transition-all duration-200',
                            sizeClasses,
                            triggerTone,
                            'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50',
                            'hover:bg-slate-100/60 dark:hover:bg-slate-800/60',
                            'data-[state=open]:bg-slate-100/80 dark:data-[state=open]:bg-slate-800/80'
                          )}
                          aria-label={`${item.name} menu`}
                        >
                          <span className="inline-flex items-center">
                            {IconFor(item?.iconName)}
                            {item.name}
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="ml-1.5 h-3.5 w-3.5 transition-transform duration-300 ease-out group-data-[state=open]:rotate-180"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="start"
                          sideOffset={12}
                          className={cn(
                            'min-w-[280px] py-3 px-2 rounded-xl shadow-lg',
                            'border',
                            'animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-150',
                            'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700'
                          )}
                        >
                          {/* Parent "View All" link */}
                          {hasRealHref && (
                            <DropdownMenuItem asChild>
                              <Link
                                href={href}
                                className={cn(
                                  'flex items-center justify-between select-none rounded-lg px-4 py-3 mx-1 mb-2 no-underline outline-none transition-colors cursor-pointer',
                                  'border-b border-slate-100 dark:border-slate-700',
                                  'hover:bg-blue-50 dark:hover:bg-slate-800 text-blue-600 dark:text-blue-400'
                                )}
                              >
                                <span className="text-sm font-semibold">View All {item.name}</span>
                                <ArrowRight className="h-4 w-4" />
                              </Link>
                            </DropdownMenuItem>
                          )}
                          {/* Child items */}
                          <div className="space-y-0.5">
                            {children.map((child: ChildMenuItem) => (
                              <DropdownMenuItem key={child.name} asChild>
                                <Link
                                  href={(child.href && child.href !== '#') ? child.href : href}
                                  target={child?.openInNewTab ? '_blank' : undefined}
                                  rel={child?.openInNewTab ? 'noopener noreferrer' : undefined}
                                  className={cn(
                                    'block select-none px-4 py-3 mx-1 no-underline outline-none cursor-pointer',
                                    'relative after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:bg-gradient-to-r after:from-blue-600 after:via-blue-500 after:to-indigo-600',
                                    'after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left',
                                    'text-slate-700 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400'
                                  )}
                                >
                                  <div className="text-[15px] font-medium">
                                    {child.name}
                                  </div>
                                  {child.description && (
                                    <div className="text-sm mt-1 leading-relaxed text-slate-500 dark:text-slate-400">
                                      {child.description}
                                    </div>
                                  )}
                                </Link>
                              </DropdownMenuItem>
                            ))}
                          </div>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      itemVariant.startsWith('button-') ? (
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
                      ) : (
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
                      )
                    )}
                  </motion.li>
                )
              })}
            </ul>
            </motion.div>
          </nav>

          {/* Desktop CTA + Theme Toggle */}
          <motion.div
            className="hidden lg:flex items-center space-x-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
          >
            {/* Theme Toggle */}
            {mounted && <ThemeToggle />}

            {/* CTA Button - Inverted colors when over hero */}
            {cta && cta.text && (
              <Link href={cta.href || '/contact'}>
                <PremiumButton
                  className={inHeroMode
                    ? 'bg-white text-slate-900 hover:bg-white/90 border-white/20'
                    : ''
                  }
                >
                  {cta.text}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </PremiumButton>
              </Link>
            )}
          </motion.div>

          {/* Mobile/More Menu - Shows below lg (1024px) OR as "More" button on lg-xl */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            {/* Mobile hamburger (below lg) */}
            <button
              type="button"
              className="lg:hidden relative w-12 h-12 flex items-center justify-center rounded-lg hover:bg-slate-100/80 dark:hover:bg-slate-800/80 active:bg-slate-200/60 dark:active:bg-slate-700/60 transition-all duration-200"
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
                  className={cn(
                    "w-full h-0.5 rounded-full origin-center",
                    inHeroMode ? "bg-white" : "bg-slate-900 dark:bg-slate-100"
                  )}
                />
                <motion.span
                  animate={{
                    opacity: mobileMenuOpen ? 0 : 1,
                    x: mobileMenuOpen ? -10 : 0,
                  }}
                  transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                  className={cn(
                    "w-full h-0.5 rounded-full",
                    inHeroMode ? "bg-white" : "bg-slate-900 dark:bg-slate-100"
                  )}
                />
                <motion.span
                  animate={{
                    rotate: mobileMenuOpen ? -45 : 0,
                    y: mobileMenuOpen ? -8 : 0,
                  }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className={cn(
                    "w-full h-0.5 rounded-full origin-center",
                    inHeroMode ? "bg-white" : "bg-slate-900 dark:bg-slate-100"
                  )}
                />
              </div>
            </button>

            {/* "More" button for lg-xl screens (when some items are hidden) */}
            {moreButtonText && (
            <button
              type="button"
              className="hidden lg:flex xl:hidden items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all hover:bg-slate-100/80 dark:hover:bg-slate-800/80 active:bg-slate-200/60 dark:active:bg-slate-700/60"
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
              className="w-full sm:w-[400px] border-l bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700"
            >
              <nav className="flex flex-col h-full pt-12 pb-6">
                <div className="flex-1 overflow-y-auto px-4">
                  {/* Theme Toggle in Mobile Menu */}
                  <div className="mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">Appearance</p>
                    {mounted && <ThemeToggle variant="dropdown" />}
                  </div>

                  <div className="space-y-2">
                    {navigation.map((item: MenuItem, index: number) => {
                      const children = Array.isArray(item.children) ? item.children : []
                      const href = (item.href && item.href !== '#') ? item.href : '/'
                      const itemVariant = item?.style?.variant || 'link'
                      const target = item?.openInNewTab ? '_blank' : undefined
                      const rel = item?.openInNewTab ? 'noopener noreferrer' : undefined
                      return (
                        <motion.div
                          key={item.name}
                          className="py-1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: 0.1 + index * 0.05,
                            ease: [0.25, 0.1, 0.25, 1]
                          }}
                        >
                          {children.length > 0 ? (
                            <div className="space-y-1">
                              <div className="px-3 py-2.5 font-bold text-lg text-slate-900 dark:text-white">
                                <span className="inline-flex items-center gap-3">
                                  {IconFor(item?.iconName)}
                                  {item.name}
                                </span>
                              </div>
                              <div className="space-y-1 pl-4 ml-3 border-l-2 border-slate-300 dark:border-slate-600">
                                {children.map((child: ChildMenuItem) => (
                                  <Link
                                    key={child.name}
                                    href={(child.href && child.href !== '#') ? child.href : href}
                                    target={child?.openInNewTab ? '_blank' : undefined}
                                    rel={child?.openInNewTab ? 'noopener noreferrer' : undefined}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium transition-colors text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
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
                                "text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800",
                                pathname === href && 'bg-slate-100 dark:bg-slate-800'
                              )}
                            >
                              {IconFor(item?.iconName)}
                              {item.name}
                            </Link>
                          )}
                        </motion.div>
                      )
                    })}
                  </div>
                </div>

                {/* CTA Button at bottom */}
                <motion.div
                  className="px-4 pt-6 border-t border-slate-200 dark:border-slate-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                >
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
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                        aria-label={`Call ${topBar?.phone}`}
                      >
                        <Phone className="h-5 w-5" />
                        <span className="text-base font-medium">{topBar?.phone}</span>
                      </a>
                    )}
                    {topBar?.showEmail !== false && (
                      <a
                        href={topBar?.emailLink}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                        aria-label={`Email ${topBar?.email}`}
                      >
                        <Mail className="h-5 w-5" />
                        <span className="text-base font-medium">{topBar?.email}</span>
                      </a>
                    )}
                  </div>
                  )}
                </motion.div>
              </nav>
            </SheetContent>
          </Sheet>
        </nav>
      </header>
    </>
  );
}
