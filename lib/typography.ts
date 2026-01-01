import { typography } from '@/lib/design-system';
import type { HeroTone } from '@/lib/hero-theme';

export const heroTypography = {
  eyebrow: typography.eyebrow,
  title: typography.heroHeading,
  subtitle: typography.description,
  description: typography.description,
};

export const proseTheme = 'prose prose-slate dark:prose-invert';

/**
 * Tone-aware typography tokens ensure dark hero sections and admin pages
 * don't rely on literal `text-tone-inverse` classes.
 */
const toneTypographyTokens: Record<HeroTone, {
  heading: string;
  headingMuted: string;
  body: string;
  bodyMuted: string;
  muted: string;
  accent: string;
  interactive: string;
  interactiveMuted: string;
  pill: string;
  pillMuted: string;
}> = {
  light: {
    heading: 'text-slate-900',
    headingMuted: 'text-slate-700',
    body: 'text-slate-700',
    bodyMuted: 'text-slate-500',
    muted: 'text-slate-500',
    accent: 'text-blue-600',
    interactive: 'text-slate-900 hover:text-slate-950',
    interactiveMuted: 'text-slate-600 hover:text-slate-900',
    pill: 'text-slate-900 bg-slate-100 border border-slate-200',
    pillMuted: 'text-slate-600 bg-slate-50 border border-slate-200',
  },
  dark: {
    heading: 'text-tone-inverse',
    headingMuted: 'text-tone-inverse/90',
    body: 'text-tone-inverse/85',
    bodyMuted: 'text-tone-inverse/70',
    muted: 'text-tone-inverse/65',
    accent: 'text-blue-300',
    interactive: 'text-tone-inverse hover:text-tone-inverse',
    interactiveMuted: 'text-tone-inverse/80 hover:text-tone-inverse',
    pill: 'text-tone-inverse bg-white/10 border border-white/20',
    pillMuted: 'text-tone-inverse/80 bg-white/5 border border-white/15',
  },
};

export type ToneTypography = typeof toneTypographyTokens.light;
export type ToneVariant = keyof ToneTypography;

export function getToneTypography(tone: HeroTone = 'light'): ToneTypography {
  return toneTypographyTokens[tone];
}

export function getToneClass(tone: HeroTone = 'light', variant: ToneVariant) {
  return toneTypographyTokens[tone][variant];
}
