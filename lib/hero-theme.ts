import { cn } from '@/lib/utils';

export type HeroTone = 'dark' | 'light';

type HeroPalette = {
  title: string;
  subtitle: string;
  description: string;
  badge: {
    text: string;
    background: string;
    border: string;
  };
  buttons: {
    primaryBg: string;
    primaryText: string;
    secondaryBg: string;
    secondaryText: string;
    secondaryBorder: string;
  };
};

type HeroClasses = {
  section: string;
  background: string;
  overlayBase: string;
  overlayAccent: string;
  scrollIndicator: string;
};

type HeroTheme = {
  palette: HeroPalette;
  classes: HeroClasses;
};

const heroThemes: Record<HeroTone, HeroTheme> = {
  dark: {
    palette: {
      title: '#ffffff',
      subtitle: 'rgba(255, 255, 255, 0.92)',
      description: 'rgba(255, 255, 255, 0.85)',
      badge: {
        text: '#f8fafc',
        background: 'rgba(15, 23, 42, 0.4)',
        border: 'rgba(255, 255, 255, 0.25)',
      },
      buttons: {
        primaryBg: '#2563eb',
        primaryText: '#ffffff',
        secondaryBg: 'rgba(255, 255, 255, 0.08)',
        secondaryText: '#ffffff',
        secondaryBorder: 'rgba(255, 255, 255, 0.25)',
      },
    },
    classes: {
      section: 'text-tone-inverse',
      background: 'bg-slate-950',
      overlayBase: 'absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/80 to-slate-950/95',
      overlayAccent: 'absolute inset-0 bg-gradient-to-r from-blue-950/30 via-transparent to-blue-950/30',
      scrollIndicator: 'text-tone-inverse/50 hover:text-tone-inverse/80',
    },
  },
  light: {
    palette: {
      title: '#0f172a',
      subtitle: 'rgba(15, 23, 42, 0.92)',
      description: 'rgba(71, 85, 105, 0.95)',
      badge: {
        text: '#0f172a',
        background: 'rgba(255, 255, 255, 0.92)',
        border: 'rgba(148, 163, 184, 0.4)',
      },
      buttons: {
        primaryBg: '#0f172a',
        primaryText: '#ffffff',
        secondaryBg: 'rgba(15, 23, 42, 0.07)',
        secondaryText: '#0f172a',
        secondaryBorder: 'rgba(15, 23, 42, 0.2)',
      },
    },
    classes: {
      section: 'text-slate-900 dark:text-tone-inverse',
      background: 'bg-white dark:bg-slate-900',
      overlayBase: 'absolute inset-0 bg-gradient-to-b from-white/85 via-white/60 to-white/30 dark:from-slate-900/80 dark:via-slate-900/60 dark:to-slate-900/30',
      overlayAccent: 'absolute inset-0 bg-gradient-to-r from-blue-200/40 via-transparent to-indigo-200/40 dark:from-blue-900/20 dark:via-transparent dark:to-purple-900/30',
      scrollIndicator: 'text-slate-500 hover:text-slate-700 dark:text-tone-inverse/60',
    },
  },
};

export function resolveHeroTone(preference?: boolean | HeroTone | string): HeroTone {
  if (typeof preference === 'string') {
    return preference === 'light' ? 'light' : 'dark';
  }

  if (preference === false) {
    return 'light';
  }

  return 'dark';
}

export function getHeroTheme(tone: HeroTone): HeroTheme {
  return heroThemes[tone];
}

export function heroSectionClassName(tone: HeroTone, base: string, extra?: string) {
  const theme = heroThemes[tone];
  return cn(base, theme.classes.section, theme.classes.background, extra);
}
