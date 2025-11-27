/**
 * IIS Precision Manufacturing - Design System
 * Unified design constants for consistent homepage UX
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

  // Body text
  body: 'text-base text-slate-600',
} as const;

// ==================== SPACING ====================
export const spacing = {
  // Section padding
  section: 'py-24 md:py-32',
  sectionCompact: 'py-20 md:py-24',

  // Grid gaps
  grid: 'gap-6 md:gap-8',
  gridCompact: 'gap-6',

  // Container
  container: 'container mx-auto px-6 md:px-8',
  containerNarrow: 'max-w-4xl mx-auto px-6 md:px-8',
  containerWide: 'max-w-7xl mx-auto px-6 md:px-8',

  // Section margins
  headingBottom: 'mb-8 md:mb-12',
  headingBottomCompact: 'mb-6',
} as const;

// ==================== COLORS ====================
export const colors = {
  // Gradients - UNIFIED across all components
  primaryGradient: 'from-blue-600 via-blue-500 to-indigo-600',        // Primary buttons
  primaryGradientHover: 'from-blue-500 via-blue-400 to-indigo-500',   // Hover states
  textGradient: 'from-blue-400 to-cyan-400',                          // Gradient text accents
  subtleGradient: 'from-blue-600/20 to-indigo-600/20',                // Subtle backgrounds

  // Text colors
  textDark: 'text-slate-900',
  textMedium: 'text-slate-600',
  textLight: 'text-slate-400',
  textWhite: 'text-white',

  // Borders
  borderLight: 'border-slate-200',
  borderMedium: 'border-slate-300',
  borderAccent: 'border-blue-600/20',

  // Backgrounds
  bgLight: 'bg-gradient-to-b from-slate-50 to-white',
  bgDark: 'bg-slate-950',
  bgWhite: 'bg-white',

  // Raw color values for inline styles and CSS
  raw: {
    // Slate colors
    slate950: '#020617',
    slate400: '#94a3b8',
    slate900: '#0f172a',
    white: '#ffffff',

    // Blue colors (primary)
    blue600: '#2563eb',
    blue600_rgb: 'rgb(37, 99, 235)',
    blue600_alpha80: 'rgba(37, 99, 235, 0.8)',
    blue600_alpha50: 'rgba(37, 99, 235, 0.5)',
    blue600_alpha25: 'rgba(37, 99, 235, 0.25)',
    blue600_alpha20: 'rgba(37, 99, 235, 0.2)',
    blue600_alpha15: 'rgba(37, 99, 235, 0.15)',
    blue600_alpha10: 'rgba(37, 99, 235, 0.1)',
    blue500: '#3b82f6',
    blue500_rgb: 'rgb(59, 130, 246)',

    // Indigo colors (secondary)
    indigo600: '#4f46e5',
    indigo600_rgb: 'rgb(79, 70, 229)',
    indigo600_alpha80: 'rgba(79, 70, 229, 0.8)',
    indigo600_alpha20: 'rgba(79, 70, 229, 0.2)',
    indigo600_alpha10: 'rgba(79, 70, 229, 0.1)',

    // White with alpha
    white_alpha90: 'rgba(255, 255, 255, 0.9)',
    white_alpha95: 'rgba(255, 255, 255, 0.95)',
  },
} as const;

// ==================== BORDER RADIUS ====================
export const borderRadius = {
  card: 'rounded-2xl',
  button: 'rounded-md',
  badge: 'rounded-sm',
  pill: 'rounded-full',
  input: 'rounded-lg',
} as const;

// ==================== ANIMATIONS ====================
export const animations = {
  // Entry animation timing
  entry: {
    duration: 0.6,
    ease: 'easeOut',
  },

  // Hover animation timing
  hover: {
    duration: 0.3,
    ease: 'easeOut',
  },

  // Stagger delay for list items
  stagger: 0.1,

  // Viewport animation settings (for whileInView)
  viewport: {
    once: true,
    margin: '-100px',
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

  // Card hover (unified)
  cardHover: {
    rest: { scale: 1 },
    hover: {
      scale: 1.02,
      transition: { duration: animations.hover.duration, ease: animations.hover.ease },
    },
  },
} as const;

// ==================== SHADOW UTILITIES ====================
export const shadows = {
  subtle: 'shadow-sm',
  card: 'shadow-md',
  cardHover: 'shadow-xl',
  elevated: 'shadow-2xl',
  button: 'shadow-lg shadow-blue-600/25',
} as const;

// ==================== IMAGE OVERLAYS ====================
export const overlays = {
  card: 'bg-gradient-to-t from-black/80 via-black/40 to-transparent',
  hero: 'bg-gradient-to-t from-black/90 via-black/50 to-transparent',
  subtle: 'bg-gradient-to-t from-black/60 via-black/20 to-transparent',
} as const;

// ==================== STANDARD CARD PATTERN ====================
export const cardStyles = {
  base: 'bg-white border border-slate-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300',
  dark: 'bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300',
  interactive: 'bg-white border border-slate-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300',
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
