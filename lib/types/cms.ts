/**
 * TypeScript interfaces for Sanity CMS data structures
 *
 * This file provides type safety for all CMS content, enabling:
 * - Compile-time error detection
 * - Better IDE autocomplete
 * - Self-documenting code
 * - Safer refactoring
 */

import { LucideIcon } from 'lucide-react';

// ============================================================================
// COMMON TYPES
// ============================================================================

export interface SectionHeader {
  eyebrow?: string;
  heading?: string;
  headingWord1?: string;
  headingWord2?: string;
  description?: string;
  subdescription?: string;
}

// ============================================================================
// SERVICES SECTION
// ============================================================================

export interface ServiceSpec {
  text?: string;
  spec?: string;
}

export interface Service {
  title: string;
  description: string;
  shortDescription?: string;
  iconName?: string;
  icon?: LucideIcon;
  href: string;
  specs?: (string | ServiceSpec)[];
  image?: string;
  highlight?: boolean;
  slug?: {
    current?: string;
  } | string;
}

export interface ServicesData {
  services?: Service[];
  sectionData?: SectionHeader;
}

// ============================================================================
// INDUSTRIES SECTION
// ============================================================================

export interface IndustryFeature {
  feature?: string;
  text?: string;
}

export interface Industry {
  title: string;
  description: string;
  shortDescription?: string;
  iconName?: string;
  icon?: LucideIcon;
  href: string;
  image?: string;
  imageUrl?: string;
  features?: (string | IndustryFeature)[];
  slug?: {
    current?: string;
  } | string;
}

export interface IndustriesData {
  industries?: Industry[];
  sectionData?: SectionHeader;
}

// ============================================================================
// RESOURCES SECTION
// ============================================================================

export interface ResourceSeries {
  slug: string;
  title: string;
  description: string;
  icon: string;
  articleCount: number;
  readTime: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  enabled?: boolean;
}

export interface ResourceBenefit {
  title: string;
  description: string;
  iconName?: string;
  enabled?: boolean;
}

export interface ResourceCTAButton {
  text: string;
  href: string;
  variant: 'primary' | 'secondary';
  enabled?: boolean;
}

export interface ResourceCTA {
  title: string;
  description: string;
  buttons: ResourceCTAButton[];
}

export interface ResourcesData {
  header: {
    badge: string;
    title: string;
    description: string;
  };
  featuredSeries: ResourceSeries[];
  cta: ResourceCTA;
  benefits?: ResourceBenefit[];
}

// ============================================================================
// IMAGE SHOWCASE SECTION
// ============================================================================

export interface ShowcaseImage {
  src: string;
  title: string;
  category: string;
  href: string;
  enabled?: boolean;
}

export interface ShowcaseStat {
  iconName: string;
  value: string;
  label: string;
  enabled?: boolean;
}

export interface ShowcaseCTAButton {
  text: string;
  href: string;
  variant: 'primary' | 'secondary';
  enabled?: boolean;
}

export interface ImageShowcaseData {
  header?: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    description: string;
  };
  showcaseImages?: ShowcaseImage[];
  stats?: ShowcaseStat[];
  cta?: {
    title: string;
    description: string;
    buttons: ShowcaseCTAButton[];
  };
}

// ============================================================================
// STATS SECTION
// ============================================================================

export interface StatItem {
  value: string | number;
  label: string;
  description?: string;
  icon?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  enabled?: boolean;
}

export interface StatsData {
  title?: string;
  subtitle?: string;
  stats?: StatItem[];
  items?: StatItem[];
}

// ============================================================================
// OPERATIONAL EXCELLENCE SECTION
// ============================================================================

export interface Benefit {
  iconName?: string;
  title: string;
  description: string;
  enabled?: boolean;
}

export interface OperationalExcellenceData {
  heading?: string;
  description?: string;
  benefits?: Benefit[];
}

// ============================================================================
// HERO SECTION
// ============================================================================

export interface HeroSlide {
  image: string;
  alt: string;
  focal: 'center' | 'top' | 'bottom';
  enabled?: boolean;
}

export interface ColorStyle {
  hex?: string;
  rgb?: { r: number; g: number; b: number; a?: number };
  alpha?: number;
}

export interface BadgeStyle {
  textColor?: ColorStyle;
  backgroundColor?: ColorStyle;
  borderColor?: ColorStyle;
}

export interface ButtonStyle {
  textColor?: ColorStyle;
  backgroundColor?: ColorStyle;
  borderColor?: ColorStyle;
  hoverBackgroundColor?: ColorStyle;
}

export interface HeroData {
  // Three-word structure (new)
  word1?: string;
  word2?: string;
  word3?: string;
  heroFontSize?: string;
  // Legacy single-title structure (backwards compatibility)
  mainTitle?: string;
  subTitle?: string;
  tagline?: string;
  badges?: (string | { text?: string; badge?: string; id?: string })[];
  ctaPrimary?: { text: string; href: string };
  ctaSecondary?: { text: string; href: string };
  ctaTertiary?: { text: string; href: string };
  slides?: HeroSlide[];
  // Style fields from Sanity
  titleColor?: ColorStyle;
  titleHighlightColor?: ColorStyle;
  descriptionColor?: ColorStyle;
  badgeStyle?: BadgeStyle;
  overlay?: {
    enabled?: boolean;
    color?: ColorStyle;
  };
  buttonStyles?: {
    primaryButton?: ButtonStyle;
    secondaryButton?: ButtonStyle;
  };
}

// ============================================================================
// CTA SECTION
// ============================================================================

export interface CTAButton {
  text: string;
  href: string;
  variant: 'default' | 'secondary' | 'primary' | 'outline';
  enabled?: boolean;
}

export interface CTAData {
  title?: string;
  subtitle?: string;
  buttons?: CTAButton[];
  theme?: {
    backgroundColor?: ColorStyle;
    backgroundGradient?: {
      enabled?: boolean;
      fromColor?: ColorStyle;
      toColor?: ColorStyle;
      direction?: string;
    };
    textColor?: ColorStyle;
    accentColor?: ColorStyle;
  };
  titleColor?: ColorStyle;
  subtitleColor?: ColorStyle;
  buttonStyles?: {
    primaryButton?: ButtonStyle;
    secondaryButton?: ButtonStyle;
  };
  padding?: string;
}

// ============================================================================
// TECHNICAL SPECS SECTION
// ============================================================================

export interface TechnicalSpec {
  label: string;
  value: string;
  unit?: string;
  enabled?: boolean;
}

export interface TechnicalSpecsData {
  title?: string;
  subtitle?: string;
  specs?: TechnicalSpec[];
}
