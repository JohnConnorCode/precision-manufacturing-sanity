import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import { shadows, spacing } from '@/lib/design-system';
import { gradientTextStyle } from '@/lib/theme-utils';
import { getCompliancePage } from '@/sanity/lib/queries';
import { DynamicIcon } from '@/components/ui/dynamic-icon';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getCompliancePage();
  return {
    title: data?.seo?.metaTitle || 'Compliance | IIS - Integrated Inspection Systems',
    description: data?.seo?.metaDescription || 'Compliance documents including purchase order terms and supplier quality requirements. AS9100D, ISO 9001, and ITAR compliance standards.',
  };
}

interface ComplianceCard {
  enabled?: boolean;
  title?: string;
  description?: string;
  href?: string;
  iconName?: string;
  iconGradient?: string;
  ctaText?: string;
}

export default async function CompliancePage() {
  const data = await getCompliancePage();

  const hero = data?.hero;
  const cards: ComplianceCard[] = (data?.cards || []).filter(
    (c: ComplianceCard) => c.enabled !== false && c.title && c.href
  );

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-slate-900 via-slate-950 to-white dark:to-slate-950 pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className={`${spacing.container} relative`}>
          <div className="text-center max-w-3xl mx-auto">
            {hero?.eyebrow && (
              <p className="text-blue-400 font-semibold tracking-wide uppercase text-sm mb-4">
                {hero.eyebrow}
              </p>
            )}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-tone-inverse mb-6">
              {hero?.title}{' '}
              {hero?.titleHighlight && (
                <span style={gradientTextStyle}>{hero.titleHighlight}</span>
              )}
            </h1>
            {hero?.description && (
              <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
                {hero.description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section className="py-16 md:py-24">
        <div className={spacing.container}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {cards.map((card, index) => (
              <Link
                key={`${card.href}-${index}`}
                href={card.href!}
                className={`group block p-8 md:p-10 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 bg-white dark:bg-slate-900 ${shadows.card} transition-all duration-300 hover:shadow-xl`}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.iconGradient || 'from-blue-500 to-indigo-600'} flex items-center justify-center shadow-lg shadow-blue-500/20 mb-6`}>
                  <DynamicIcon name={card.iconName || 'FileText'} className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-tone-inverse mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {card.title}
                </h2>
                {card.description && (
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                    {card.description}
                  </p>
                )}
                <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold text-sm">
                  <span>{card.ctaText || 'View Document'}</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
