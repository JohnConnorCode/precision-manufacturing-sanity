/**
 * IIS Precision Manufacturing - Premium Design System
 * SINGLE SOURCE OF TRUTH for all styling across the application
 *
 * Design Philosophy:
 * - Clean, sophisticated, and modern
 * - Subtle animations that delight without distracting
 * - Deep shadows and soft edges for depth
 * - Consistent spacing rhythm throughout
 * - Premium typography with careful hierarchy
 */

// ==================== TYPOGRAPHY ====================
export const typography = {
  // Display - For hero headlines and maximum impact
  display: 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.02em] leading-[0.9]',

  // Section headings - Clean and authoritative
  sectionHeading: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]',

  // Page hero headings
  heroHeading: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.02em] leading-[1.05]',

  // Eyebrow/subtitle text - Elegant and understated
  eyebrow: 'text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] text-blue-600',

  // Description text - Comfortable reading
  description: 'text-lg md:text-xl leading-relaxed',
  descriptionMuted: 'text-lg md:text-xl text-slate-600 leading-relaxed',
  descriptionLight: 'text-lg md:text-xl text-slate-300 leading-relaxed',

  // Card titles - Clear hierarchy
  cardTitle: 'text-xl md:text-2xl font-bold tracking-tight',

  // Subsection titles
  subsectionTitle: 'text-2xl md:text-3xl font-bold tracking-tight',

  // Body text - Optimized for readability
  body: 'text-base text-slate-600 leading-relaxed',
  bodyLight: 'text-base text-slate-300 leading-relaxed',
  small: 'text-sm text-slate-500 leading-relaxed',

  // Labels and badges
  label: 'text-sm font-semibold tracking-wide',
  badge: 'text-[11px] font-semibold uppercase tracking-[0.1em]',

  // Quotes and callouts
  quote: 'text-xl md:text-2xl font-medium italic text-slate-700 leading-relaxed',

  // Stats and numbers
  stat: 'text-4xl md:text-5xl lg:text-6xl font-black tabular-nums',

  // Legacy aliases (backwards compatibility)
  h1: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight',
  h2: 'text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight',
  h3: 'text-2xl sm:text-3xl md:text-4xl font-semibold leading-snug',
  h4: 'text-xl sm:text-2xl md:text-3xl font-semibold leading-snug',
  h5: 'text-lg sm:text-xl md:text-2xl font-medium leading-snug',
  lead: 'text-lg md:text-xl text-slate-600 leading-relaxed',
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
// Only 4 values - no mixing!
export const borderRadius = {
  sm: 'rounded-lg',       // Inputs, small buttons
  md: 'rounded-xl',       // Cards, standard elements (USE THIS MOST)
  lg: 'rounded-2xl',      // Feature cards, CTAs, hero elements
  full: 'rounded-full',   // Pills, badges, avatars
  // Legacy aliases (prefer the semantic names above)
  card: 'rounded-xl',     // Use 'md' instead
  button: 'rounded-lg',   // Use 'sm' instead
  badge: 'rounded-full',  // Use 'full' instead
  pill: 'rounded-full',   // Use 'full' instead
  input: 'rounded-lg',    // Use 'sm' instead
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
// Premium shadow system with layered depth
export const shadows = {
  // Subtle - For inputs, minimal cards
  subtle: 'shadow-sm',

  // Card - Default card shadow with depth
  card: 'shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_20px_-5px_rgba(0,0,0,0.1)]',

  // Card hover - Elevated state with soft spread
  cardHover: 'shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15),0_10px_20px_-5px_rgba(0,0,0,0.1)]',

  // Elevated - Maximum elevation for modals, dropdowns
  elevated: 'shadow-[0_25px_60px_-12px_rgba(0,0,0,0.25),0_15px_30px_-8px_rgba(0,0,0,0.15)]',

  // Button shadows with brand color glow
  button: 'shadow-[0_4px_14px_0_rgba(37,99,235,0.25)]',
  buttonHover: 'shadow-[0_6px_20px_0_rgba(37,99,235,0.35)]',

  // Glow effects for premium elements
  glowBlue: 'shadow-[0_0_40px_rgba(37,99,235,0.3)]',
  glowIndigo: 'shadow-[0_0_40px_rgba(79,70,229,0.3)]',
  glowSoft: 'shadow-[0_0_60px_rgba(37,99,235,0.15)]',

  // Inner shadows for depth
  inner: 'shadow-inner',
  innerSubtle: 'shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]',
} as const;

// ==================== IMAGE OVERLAYS ====================
export const overlays = {
  card: 'bg-gradient-to-t from-black/80 via-black/40 to-transparent',
  hero: 'bg-gradient-to-t from-black/90 via-black/50 to-transparent',
  subtle: 'bg-gradient-to-t from-black/60 via-black/20 to-transparent',
} as const;

// ==================== UNIFIED HOVER PATTERNS ====================
// ONE hover pattern everywhere - no variations!
export const hover = {
  // Standard card hover - scale + shadow
  card: 'hover:scale-[1.02] hover:shadow-xl transition-all duration-300',
  // Button hover - slight scale
  button: 'hover:scale-[1.02] active:scale-[0.98] transition-all duration-200',
  // Link hover - color change only
  link: 'hover:text-blue-600 transition-colors duration-200',
  // Subtle hover - just shadow
  subtle: 'hover:shadow-lg transition-shadow duration-300',
} as const;

// ==================== STANDARD CARD PATTERNS ====================
// Unified card styles - use these everywhere!
export const cardStyles = {
  // Light mode cards
  base: 'bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300',
  // Dark mode cards
  dark: 'bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300',
  // Glass effect cards (for dark backgrounds)
  glass: 'bg-white/10 backdrop-blur-md border border-white/20 rounded-xl',
  // Interactive (same as base but explicit)
  interactive: 'bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300',
} as const;

// ==================== COMPONENT CLASSES ====================
// Ready-to-use component class strings
export const components = {
  // Buttons
  buttonPrimary: 'inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-lg shadow-blue-600/25 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300',
  buttonSecondary: 'inline-flex items-center justify-center px-6 py-3 bg-white border border-slate-200 text-slate-900 font-semibold rounded-lg hover:bg-slate-50 hover:shadow-lg transition-all duration-300',
  buttonGhost: 'inline-flex items-center justify-center px-6 py-3 text-slate-600 font-medium hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all duration-200',

  // Badges
  badge: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
  badgeBlue: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700',
  badgeDark: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300',

  // Icon containers
  iconBox: 'w-12 h-12 rounded-xl flex items-center justify-center',
  iconBoxPrimary: 'w-12 h-12 rounded-xl flex items-center justify-center bg-blue-600 text-white',
  iconBoxLight: 'w-12 h-12 rounded-xl flex items-center justify-center bg-blue-100 text-blue-600',
} as const;

// ==================== GRID LAYOUTS ====================
export const grids = {
  // Standard responsive grids
  auto: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8',
  cols2: 'grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8',
  cols3: 'grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8',
  cols4: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8',
} as const;

// ==================== SECTION STYLES ====================
export const sections = {
  light: 'py-24 md:py-32 bg-gradient-to-b from-slate-50 to-white',
  dark: 'py-24 md:py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950',
  white: 'py-24 md:py-32 bg-white',
} as const;

// ==================== COMPOSITE STYLES ====================
// Ready-to-use style combinations (migrate from theme.ts)
export const styles = {
  // Grid layouts (shorthand)
  grid2Col: grids.cols2,
  grid3Col: grids.cols3,
  grid4Col: grids.cols4,
  gridAuto: grids.auto,

  // Section styles
  sectionLight: sections.light,
  sectionDark: sections.dark,

  // Stat value (gradient text)
  statValue: 'text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600',

  // Feature card (white bg with padding and group hover) - Premium shadow styling
  featureCard: 'bg-white border border-slate-200/60 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_20px_-5px_rgba(0,0,0,0.1)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15),0_10px_20px_-5px_rgba(0,0,0,0.1)] hover:border-slate-300/80 transition-all duration-300 p-6 md:p-8 group',

  // CTA buttons
  ctaPrimary: 'bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:via-blue-400 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-blue-600/25 hover:shadow-xl transition-all duration-300 px-8 py-4',
  ctaSecondary: 'border-2 border-slate-300 hover:border-blue-500 text-slate-700 hover:text-blue-600 font-medium transition-all duration-300 px-8 py-4',

  // Page header (dark hero background)
  pageHeader: 'relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-24 pb-20 md:pt-32 md:pb-24 lg:pt-40 lg:pb-28',

  // Heading shortcuts (with color)
  heading: {
    section: 'text-4xl md:text-5xl lg:text-6xl font-black text-slate-900',
    sectionWhite: 'text-4xl md:text-5xl lg:text-6xl font-black text-white',
    subsection: 'text-2xl md:text-3xl font-bold text-slate-900',
    subsectionWhite: 'text-2xl md:text-3xl font-bold text-white',
    card: 'text-xl md:text-2xl font-bold text-slate-900',
    cardWhite: 'text-xl md:text-2xl font-bold text-white',
  },

  // Icon containers
  iconContainer: {
    small: 'w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white',
    medium: 'w-12 h-12 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-600',
    large: 'w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30',
  },
} as const;

// ==================== FORM STYLES ====================
export const forms = {
  input: 'bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-600 rounded-lg',
  textarea: 'bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-600 resize-none rounded-lg',
  label: 'text-slate-300 text-sm font-medium',
  select: {
    trigger: 'bg-slate-950/50 border-slate-700 text-white focus:border-blue-600',
    content: 'bg-slate-900 border-slate-700 text-white',
    item: 'text-white hover:bg-slate-800',
  },
} as const;

// ==================== HELPER FUNCTIONS ====================

/**
 * Combine multiple design system classes
 */
export function cn(...classes: (string | undefined | false | null)[]): string {
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
