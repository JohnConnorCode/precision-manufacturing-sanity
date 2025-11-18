export const theme = {
  // Brand Colors - Modern, High-Tech, Precise
  colors: {
    primary: {
      DEFAULT: 'rgb(59, 130, 246)', // Blue-500
      dark: 'rgb(29, 78, 216)', // Blue-700
      light: 'rgb(147, 197, 253)', // Blue-300
      gradient: 'bg-gradient-to-r from-blue-600 to-cyan-600',
    },
    accent: {
      DEFAULT: 'rgb(6, 182, 212)', // Cyan-500
      dark: 'rgb(14, 116, 144)', // Cyan-700
      light: 'rgb(103, 232, 249)', // Cyan-300
      gradient: 'bg-gradient-to-r from-cyan-600 to-blue-500',
    },
    neutral: {
      50: 'rgb(248, 250, 252)',
      100: 'rgb(241, 245, 249)',
      200: 'rgb(226, 232, 240)',
      300: 'rgb(203, 213, 225)',
      400: 'rgb(148, 163, 184)',
      500: 'rgb(100, 116, 139)',
      600: 'rgb(71, 85, 105)',
      700: 'rgb(51, 65, 85)',
      800: 'rgb(30, 41, 59)',
      900: 'rgb(15, 23, 42)',
      950: 'rgb(2, 6, 23)',
    },
    // Commonly used color classes (for easy reference)
    text: {
      blue: 'text-blue-600', // Used 47x
      blueLight: 'text-blue-400', // Used 31x
      blueHover: 'text-blue-600 hover:text-blue-700', // Used 10x
      muted: 'text-slate-400', // Common muted text
      mutedHover: 'text-slate-400 hover:text-blue-600', // Used 10x
    },
    background: {
      dark: 'bg-slate-900', // Used 26x
      darkCard: 'bg-slate-800', // Used 24x
      primary: 'bg-blue-600', // Used 14x
      primaryHover: 'bg-blue-600 hover:bg-blue-700', // Used 12x
      light: 'bg-slate-50', // Used 6x
      lightCard: 'bg-slate-100', // Used 8x
      accent: 'bg-blue-50', // Used 3x
      accentHover: 'bg-blue-50 hover:bg-blue-100', // Used 3x
    }
  },

  // Typography Classes
  typography: {
    // Headings - Base (no margin)
    h1: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight',
    h2: 'text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight',
    h3: 'text-2xl sm:text-3xl md:text-4xl font-semibold',
    h4: 'text-xl sm:text-2xl md:text-3xl font-semibold',
    h5: 'text-lg sm:text-xl md:text-2xl font-medium',
    h6: 'text-base sm:text-lg md:text-xl font-medium',

    // Headings - With common margins (most frequently used)
    h1Spaced: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6',
    h2Spaced: 'text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6',
    h3Spaced: 'text-2xl sm:text-3xl md:text-4xl font-semibold mb-4',
    h4Spaced: 'text-xl sm:text-2xl md:text-3xl font-semibold mb-4',

    // Common heading variants (found in codebase)
    sectionHeading: 'text-4xl md:text-5xl font-bold mb-6', // Used 5x
    cardTitle: 'text-2xl font-bold', // Used 5x
    cardTitleWhite: 'text-2xl font-bold text-white', // Used 6x
    subsectionTitle: 'text-4xl font-bold mb-4', // Used 4x

    // Body
    lead: 'text-lg md:text-xl text-slate-600 leading-relaxed',
    body: 'text-base text-slate-600 leading-relaxed',
    small: 'text-sm text-slate-500',

    // Special
    badge: 'text-xs font-medium uppercase tracking-wider',
    label: 'text-sm font-medium text-slate-700',
  },

  // Component Styles
  components: {
    // Cards - Comprehensive variants matching codebase patterns
    card: {
      base: 'bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300',
      dark: 'bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl shadow-xl',
      glass: 'bg-white/10 backdrop-blur-md border border-white/20 rounded-xl',
      form: 'bg-slate-900/50 border-slate-800 backdrop-blur-sm rounded-lg',
      // Most common card patterns from analysis
      simple: 'rounded-lg', // Used 38x - minimal card
      withPadding: 'rounded-lg p-6', // Used 14x
      compact: 'rounded-lg p-4', // Used 11x
      elevated: 'rounded-xl shadow-lg', // Common pattern
      interactive: 'rounded-xl p-6 hover:shadow-xl transition-shadow', // Hover pattern
    },

    // Padding presets (most common patterns)
    padding: {
      card: 'p-6', // Used 48x - standard card padding
      cardLarge: 'p-8', // Used 37x - large card padding
      cardCompact: 'p-4', // Used 27x - compact padding
      cardMinimal: 'p-3', // Used 13x
      badge: 'px-3 py-1', // Used 16x - badge/tag padding
      button: 'px-4 py-2', // Used 27x - button padding
      buttonLarge: 'px-4 py-3', // Used 10x
      section: 'py-20', // Used 9x - section vertical padding
      sectionLarge: 'py-24', // Used 7x
    },

    // Buttons
    button: {
      primary: 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold shadow-2xl shadow-cyan-600/20 hover:shadow-cyan-600/30 transition-all duration-300',
      secondary: 'border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-sm transition-all duration-300',
      outline: 'border-2 border-slate-300 hover:border-blue-500 text-slate-700 hover:text-blue-600 font-medium transition-all duration-300',
      ghost: 'hover:bg-slate-100 text-slate-700 font-medium transition-all duration-300',
    },

    // Sections
    section: {
      light: 'bg-gradient-to-b from-slate-50 to-white',
      dark: 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950',
      pattern: 'relative overflow-hidden',
    },

    // Badges
    badge: {
      default: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700',
      primary: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700',
      success: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700',
      dark: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-800/50 text-slate-300 border border-slate-700/50 backdrop-blur-sm',
    }
  },

  // Animation Classes
  animation: {
    fadeIn: 'animate-in fade-in duration-500',
    slideUp: 'animate-in slide-in-from-bottom-4 duration-500',
    slideDown: 'animate-in slide-in-from-top-4 duration-500',
    scaleIn: 'animate-in zoom-in-90 duration-300',
    float: 'animate-float',
    pulse: 'animate-pulse',
    // Enhanced easing curve for smooth animations
    easing: 'ease-[cubic-bezier(0.33,1,0.68,1)]',
    duration: {
      fast: 'duration-300',
      normal: 'duration-600',
      slow: 'duration-800',
      slower: 'duration-1000',
    },
  },

  // Spacing System
  spacing: {
    section: 'py-16 md:py-24 lg:py-32',
    container: 'container mx-auto px-4 sm:px-6 lg:px-8',
    // Hero spacing - reduced padding
    hero: 'pt-8 md:pt-12 pb-12 md:pb-16',
    stack: {
      sm: 'space-y-4',
      md: 'space-y-6',
      lg: 'space-y-8',
      xl: 'space-y-12',
    },
    grid: {
      sm: 'gap-4',
      md: 'gap-6',
      lg: 'gap-8',
      xl: 'gap-12',
    }
  },

  // Effects
  effects: {
    glow: 'shadow-[0_0_30px_rgba(59,130,246,0.3)]',
    glowCyan: 'shadow-[0_0_30px_rgba(6,182,212,0.3)]',
    glassmorphism: 'bg-white/10 backdrop-blur-md border border-white/20',
    gradient: {
      text: 'text-transparent bg-clip-text bg-gradient-to-r',
      mesh: 'bg-gradient-to-br from-blue-500/10 via-cyan-600/10 to-blue-500/10',
    },
    grid: 'bg-grid-slate-900/[0.04] dark:bg-grid-slate-100/[0.02]',
  }
} as const;

// Utility function to combine classes
export const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

// Style presets for common patterns
export const styles = {
  // Hero Animation Classes
  heroAnimation: {
    container: 'transition-all duration-1200 ease-[cubic-bezier(0.33,1,0.68,1)]',
    title: 'transition-all duration-800 ease-[cubic-bezier(0.33,1,0.68,1)]',
    subtitle: 'transition-all duration-800 ease-[cubic-bezier(0.33,1,0.68,1)]',
    badge: 'transition-all duration-600 ease-[cubic-bezier(0.33,1,0.68,1)]',
    button: 'transition-all duration-800 ease-[cubic-bezier(0.33,1,0.68,1)]',
  },

  // Form Elements
  form: {
    input: 'bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-600',
    select: {
      trigger: 'bg-slate-950/50 border-slate-700 text-white focus:border-cyan-600',
      content: 'bg-slate-900 border-slate-700 text-white',
      item: 'text-white hover:bg-slate-800',
    },
    textarea: 'bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-600 resize-none',
    label: 'text-slate-300',
  },
  // Page Headers
  pageHeader: cn(
    'relative overflow-hidden',
    'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950',
    'pt-24 pb-20 md:pt-32 md:pb-24 lg:pt-40 lg:pb-28' // Optimized spacing
  ),

  pageTitle: cn(
    theme.typography.h1,
    'text-white mb-6'
  ),

  pageSubtitle: cn(
    theme.typography.lead,
    'text-slate-400 max-w-3xl mx-auto'
  ),

  // Feature Cards
  featureCard: cn(
    theme.components.card.base,
    'p-6 md:p-8 group'
  ),

  featureIcon: cn(
    'w-12 h-12 mb-4',
    'text-blue-600 group-hover:text-cyan-600',
    'transition-colors duration-300'
  ),

  // Stats
  statCard: cn(
    theme.components.card.dark,
    'p-6 text-center'
  ),

  statValue: cn(
    'text-3xl md:text-4xl font-bold',
    'text-transparent bg-clip-text',
    'bg-gradient-to-r from-blue-400 to-cyan-600'
  ),

  statLabel: cn(
    theme.typography.badge,
    'text-slate-400 mt-2'
  ),

  // CTAs
  ctaPrimary: cn(
    theme.components.button.primary,
    'px-8 py-4 text-base'
  ),

  ctaSecondary: cn(
    theme.components.button.outline,
    'px-8 py-4 text-base'
  ),

  // Sections
  sectionDark: cn(
    theme.components.section.dark,
    theme.spacing.section
  ),

  sectionLight: cn(
    theme.components.section.light,
    theme.spacing.section
  ),

  // Grid Layouts
  gridAuto: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8',
  grid2Col: 'grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8',
  grid3Col: 'grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8',
  grid4Col: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8',

  // Common Heading Patterns (ready to use with cn())
  heading: {
    // Section headings
    section: cn(theme.typography.sectionHeading, 'text-foreground'),
    sectionWhite: cn(theme.typography.sectionHeading, 'text-white'),
    sectionDark: cn(theme.typography.sectionHeading, 'text-zinc-900'),

    // Subsection headings
    subsection: cn(theme.typography.subsectionTitle, 'text-foreground'),
    subsectionWhite: cn(theme.typography.subsectionTitle, 'text-white'),

    // Card titles
    card: cn(theme.typography.cardTitle, 'text-foreground'),
    cardWhite: cn(theme.typography.cardTitleWhite),
    cardSpaced: cn(theme.typography.cardTitle, 'mb-2'),
  },

  // Common Card Patterns (ready to use)
  cardPatterns: {
    // Simple variants
    minimal: cn(theme.components.card.simple), // Just rounded corners
    standard: cn(theme.components.card.withPadding), // Rounded + padding
    compact: cn(theme.components.card.compact), // Rounded + less padding

    // Feature cards
    feature: cn(theme.components.card.base, theme.components.padding.card, 'group'),
    featureLarge: cn(theme.components.card.base, theme.components.padding.cardLarge, 'group'),

    // Interactive cards
    clickable: cn(
      theme.components.card.simple,
      theme.components.padding.card,
      'hover:shadow-xl transition-shadow cursor-pointer'
    ),
    hoverable: cn(
      theme.components.card.simple,
      theme.components.padding.card,
      'group hover:shadow-xl transition-all duration-300'
    ),
  },

  // Common Icon Containers
  iconContainer: {
    // Small icon backgrounds (common pattern)
    small: 'w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center',
    medium: 'w-12 h-12 rounded-lg bg-blue-600/10 flex items-center justify-center',
    large: 'w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-600/30',

    // With specific colors
    blueLight: 'w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center',
    blueDark: 'w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center',
  },

  // Common Text Colors (shorthand)
  textColor: {
    primary: theme.colors.text.blue,
    primaryHover: theme.colors.text.blueHover,
    light: theme.colors.text.blueLight,
    muted: theme.colors.text.muted,
    mutedHover: theme.colors.text.mutedHover,
  },

  // Common Background Colors (shorthand)
  bgColor: {
    dark: theme.colors.background.dark,
    darkCard: theme.colors.background.darkCard,
    primary: theme.colors.background.primary,
    primaryHover: theme.colors.background.primaryHover,
    light: theme.colors.background.light,
    lightCard: theme.colors.background.lightCard,
    accent: theme.colors.background.accent,
    accentHover: theme.colors.background.accentHover,
  },
} as const;