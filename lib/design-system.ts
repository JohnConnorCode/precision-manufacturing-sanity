/**
 * IIS Precision Manufacturing - Design System
 * Unified design constants for consistent, world-class UX
 *
 * @description Comprehensive design tokens following modern design system principles
 * @version 2.0
 */

// ==================== TYPOGRAPHY ====================
export const typography = {
  // Section headings
  sectionHeading: 'text-4xl md:text-5xl lg:text-6xl font-black',

  // Eyebrow/subtitle text
  eyebrow: 'text-sm font-bold uppercase tracking-[0.2em]',

  // Description text
  description: 'text-lg md:text-xl',
  descriptionMuted: 'text-lg md:text-xl text-slate-600',

  // Card titles
  cardTitle: 'text-xl md:text-2xl font-bold',
  cardSubtitle: 'text-base font-semibold',

  // Body text
  body: 'text-base text-slate-600',
  bodySmall: 'text-sm text-slate-600',

  // Hero text
  heroTitle: 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black',
  heroSubtitle: 'text-2xl sm:text-3xl md:text-4xl font-semibold',
} as const;

// ==================== SPACING ====================
export const spacing = {
  // Section padding
  section: 'py-24 md:py-32',
  sectionCompact: 'py-20 md:py-24',
  sectionTight: 'py-16 md:py-20',

  // Grid gaps
  grid: 'gap-6 md:gap-8',
  gridCompact: 'gap-6',
  gridTight: 'gap-4',

  // Container
  container: 'container mx-auto px-6 md:px-8',
  containerNarrow: 'max-w-4xl mx-auto px-6 md:px-8',
  containerWide: 'max-w-7xl mx-auto px-6 md:px-8',
  containerFluid: 'w-full px-6 md:px-8',

  // Section margins
  headingBottom: 'mb-16 md:mb-20',
  headingBottomCompact: 'mb-12',
  headingBottomTight: 'mb-8',
} as const;

// ==================== COLORS ====================
export const colors = {
  // Gradients
  primaryGradient: 'from-blue-600 to-indigo-600',
  primaryGradientHover: 'from-blue-500 to-indigo-500',
  secondaryGradient: 'from-slate-700 to-slate-900',
  accentGradient: 'from-blue-400 to-indigo-400',

  // Text colors
  textDark: 'text-slate-900',
  textMedium: 'text-slate-600',
  textLight: 'text-slate-400',
  textWhite: 'text-white',
  textMuted: 'text-slate-500',

  // Borders
  borderLight: 'border-slate-200',
  borderMedium: 'border-slate-300',
  borderDark: 'border-slate-400',
  borderAccent: 'border-blue-600/20',
  borderFocus: 'border-blue-600',

  // Backgrounds
  bgLight: 'bg-gradient-to-b from-slate-50 to-white',
  bgDark: 'bg-slate-950',
  bgWhite: 'bg-white',
  bgGray: 'bg-slate-50',
  bgTransparent: 'bg-transparent',

  // Focus/Ring colors (for accessibility)
  focusRing: 'focus:ring-2 focus:ring-blue-600 focus:ring-offset-2',
  focusRingWhite: 'focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600',
  focusVisible: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2',
} as const;

// ==================== BORDER RADIUS ====================
export const borderRadius = {
  card: 'rounded-2xl',
  cardCompact: 'rounded-xl',
  button: 'rounded-md',
  badge: 'rounded-sm',
  pill: 'rounded-full',
  input: 'rounded-lg',
  subtle: 'rounded-lg',
} as const;

// ==================== BUTTON SIZES ====================
export const buttonSizes = {
  // Touch-optimized sizes (min 48px height for accessibility)
  sm: 'h-10 px-4 text-sm', // 40px height (use sparingly)
  md: 'h-12 px-6 text-base', // 48px height (default)
  lg: 'h-14 px-8 text-lg', // 56px height (prominent CTAs)
  xl: 'h-16 px-10 text-xl', // 64px height (hero CTAs)

  // Icon button sizes
  iconSm: 'h-10 w-10',
  iconMd: 'h-12 w-12', // 48px - touch optimized
  iconLg: 'h-14 w-14',
} as const;

// ==================== TOUCH TARGETS ====================
export const touchTargets = {
  // Minimum touch target size (48x48 for WCAG AA)
  min: 'min-h-[48px] min-w-[48px]',
  comfortable: 'min-h-[56px] min-w-[56px]',
  large: 'min-h-[64px] min-w-[64px]',

  // Interactive element padding
  interactive: 'p-3', // 12px = 48px with content
  interactiveHorizontal: 'px-6 py-3',
} as const;

// ==================== ANIMATIONS ====================
export const animations = {
  // Entry animation timing
  entry: {
    duration: 0.6,
    ease: 'easeOut',
    delay: 0,
  },

  // Hover animation timing
  hover: {
    duration: 0.3,
    ease: 'easeOut',
  },

  // Fast interactions
  fast: {
    duration: 0.2,
    ease: 'easeOut',
  },

  // Slow, dramatic animations
  slow: {
    duration: 1.0,
    ease: 'easeInOut',
  },

  // Stagger delay for list items
  stagger: 0.1,
  staggerFast: 0.05,
  staggerSlow: 0.15,

  // Viewport animation settings (for whileInView)
  viewport: {
    once: true,
    margin: '-100px',
    amount: 0.3,
  },

  // Easing functions (cubic-bezier curves)
  easing: {
    easeOut: [0.25, 0.1, 0.25, 1],
    easeIn: [0.42, 0, 1, 1],
    easeInOut: [0.42, 0, 0.58, 1],
    sharp: [0.4, 0, 0.6, 1], // Material Design
    smooth: [0.25, 0.46, 0.45, 0.94], // Smooth deceleration
    bounce: [0.68, -0.55, 0.265, 1.55], // Bouncy spring
  },

  // Spring physics (for natural motion)
  spring: {
    gentle: { stiffness: 100, damping: 20 },
    default: { stiffness: 200, damping: 25 },
    snappy: { stiffness: 400, damping: 30 },
    bouncy: { stiffness: 300, damping: 10 },
  },
} as const;

// ==================== MOTION VARIANTS ====================
export const motionVariants = {
  // Fade in from bottom
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: animations.entry.duration, ease: animations.entry.ease },
  },

  // Fade in
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: animations.entry.duration, ease: animations.entry.ease },
  },

  // Scale in
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: animations.entry.duration, ease: animations.entry.ease },
  },

  // Slide in from left
  slideInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: animations.entry.duration, ease: animations.entry.ease },
  },

  // Slide in from right
  slideInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: animations.entry.duration, ease: animations.entry.ease },
  },

  // Card hover (unified)
  cardHover: {
    rest: { scale: 1 },
    hover: {
      scale: 1.02,
      transition: { duration: animations.hover.duration, ease: animations.hover.ease },
    },
  },

  // Button hover with spring
  buttonHover: {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: { type: 'spring', ...animations.spring.snappy },
    },
    tap: {
      scale: 0.98,
    },
  },
} as const;

// ==================== SHADOW UTILITIES ====================
export const shadows = {
  none: 'shadow-none',
  subtle: 'shadow-sm',
  card: 'shadow-lg',
  cardHover: 'shadow-xl',
  button: 'shadow-md',
  strong: 'shadow-2xl',

  // Colored shadows for premium feel
  coloredBlue: 'shadow-xl shadow-blue-600/10',
  coloredIndigo: 'shadow-xl shadow-indigo-600/10',
  coloredSlate: 'shadow-xl shadow-slate-900/10',
} as const;

// ==================== CONSTANTS ====================
export const constants = {
  // Scroll thresholds
  scrollThreshold: {
    header: 10, // When header becomes sticky
    scrollToTop: 400, // When scroll-to-top button appears
    scrollProgress: 0, // Start of scroll progress tracking
  },

  // Animation delays
  delay: {
    none: 0,
    short: 0.1,
    medium: 0.2,
    long: 0.4,
    hero: 0.6, // For dramatic hero reveals
  },

  // Carousel/slider timings (in milliseconds)
  carousel: {
    interval: 8000, // 8 seconds per slide
    transition: 1000, // 1 second transition
    autoplayDelay: 5000, // Initial delay before autoplay
  },

  // Debounce/throttle timings
  performance: {
    debounce: 150, // For search, form inputs
    throttle: 100, // For scroll listeners
    resize: 200, // For window resize handlers
  },

  // Image quality settings
  image: {
    quality: {
      hero: 85, // Hero images (balance quality/size)
      thumbnail: 75, // Thumbnails and cards
      blur: 30, // Blur placeholders
      icon: 90, // Small icons, badges
    },
    sizes: {
      hero: '100vw',
      card: '(min-width: 768px) 33vw, 100vw',
      thumbnail: '(min-width: 768px) 20vw, 50vw',
      fullWidth: '100vw',
    },
  },

  // Z-index layers (centralized to prevent conflicts)
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1020,
    overlay: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
  },
} as const;

// ==================== HELPER FUNCTIONS ====================

/**
 * Combine multiple design system classes
 */
export function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Get section background class based on theme
 */
export function getSectionBg(theme: 'light' | 'dark' = 'light'): string {
  return theme === 'dark' ? colors.bgDark : colors.bgLight;
}

/**
 * Get text color based on background theme
 */
export function getTextColor(theme: 'light' | 'dark' = 'light'): string {
  return theme === 'dark' ? colors.textWhite : colors.textDark;
}

/**
 * Get animation delay for staggered elements
 * @param index - Element index in list
 * @param baseDelay - Base delay before stagger starts
 * @param staggerAmount - Time between each element
 */
export function getStaggerDelay(
  index: number,
  baseDelay: number = constants.delay.short,
  staggerAmount: number = animations.stagger
): number {
  return baseDelay + (index * staggerAmount);
}

/**
 * Check if device prefers reduced motion (for accessibility)
 * @returns boolean indicating motion preference
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get responsive image sizes string for Next.js Image component
 * @param type - Type of image (hero, card, thumbnail)
 */
export function getImageSizes(type: keyof typeof constants.image.sizes = 'card'): string {
  return constants.image.sizes[type];
}

/**
 * Get image quality setting
 * @param type - Type of image (hero, thumbnail, blur, icon)
 */
export function getImageQuality(type: keyof typeof constants.image.quality = 'thumbnail'): number {
  return constants.image.quality[type];
}
