import { cn } from '@/lib/utils';
import { typography, spacing, styles } from '@/lib/design-system';
import { getToneTypography } from '@/lib/typography';
import { Button } from '@/components/ui/button';
import { PremiumButton } from '@/components/ui/premium-button';

export const metadata = {
  title: 'UI Style Guide | IIS Precision Manufacturing',
  description: 'Living reference for hero typography, tone-aware tokens, and CTA treatments.',
};

const typographyTokens = [
  { label: 'Hero Heading', className: typography.heroHeading, sample: 'Mission-critical Precision' },
  { label: 'Section Heading', className: typography.sectionHeading, sample: 'Premium Section Title' },
  { label: 'Subsection Title', className: typography.subsectionTitle, sample: 'Subsection Title' },
  { label: 'Body', className: typography.body, sample: 'Body copy for descriptions and supporting content.' },
  { label: 'Muted Body', className: typography.descriptionMuted, sample: 'Muted body for metadata and helper text.' },
];

export default function StyleGuidePage() {
  const lightTone = getToneTypography('light');
  const darkTone = getToneTypography('dark');

  return (
    <div className="min-h-screen bg-background py-16">
      <div className={cn(spacing.containerWide, 'space-y-12')}>
        <header className="text-center space-y-4">
          <p className={cn(typography.eyebrow, 'text-blue-600')}>Design Tokens</p>
          <h1 className={cn(typography.heroHeading, 'leading-tight')}>
            Frontend style reference
          </h1>
          <p className={cn(typography.descriptionMuted, 'max-w-3xl mx-auto')}>
            Canonical samples for typography, tone-aware classes, and CTA styles. Use this page the way you would a Storybook canvas—copy classes directly from the cards below.
          </p>
        </header>

        <section className="grid md:grid-cols-2 gap-6">
          {typographyTokens.map((token) => (
            <div key={token.label} className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6 bg-white dark:bg-slate-950 shadow-sm">
              <p className={cn(typography.small, 'text-slate-500 mb-2')}>{token.label}</p>
              <p className={token.className}>{token.sample}</p>
              <code className="mt-4 block text-xs text-slate-500 bg-slate-50 dark:bg-slate-900 px-3 py-2 rounded-lg">
                {token.className}
              </code>
            </div>
          ))}
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6 bg-slate-50 dark:bg-slate-900">
            <p className={cn(typography.small, 'text-slate-500 mb-4')}>Light tone tokens</p>
            <ul className="space-y-3">
              {Object.entries(lightTone).map(([key, value]) => (
                <li key={key} className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-slate-600">{key}</span>
                  <span className={value}>{value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            <p className={cn(typography.small, 'text-tone-inverse/70 mb-4')}>Dark tone tokens</p>
            <ul className="space-y-3">
              {Object.entries(darkTone).map(([key, value]) => (
                <li key={key} className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-tone-inverse/80">{key}</span>
                  <span className={value}>{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6 bg-white dark:bg-slate-950 shadow-sm space-y-6">
          <p className={cn(typography.small, 'text-slate-500')}>CTA patterns</p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className={styles.ctaPrimary}>
              Primary CTA
            </Button>
            <Button size="lg" variant="outline">
              Outline CTA
            </Button>
            <PremiumButton size="lg" variant="secondary">
              Premium Secondary
            </PremiumButton>
          </div>
          <p className={cn(typography.small, 'text-slate-500')}>
            Use `styles.ctaPrimary` for hero CTAs and `PremiumButton` where CMS requests a luxury treatment. Outline buttons automatically adapt to dark mode.
          </p>
        </section>
      </div>
    </div>
  );
}
