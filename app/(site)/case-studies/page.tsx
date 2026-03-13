import { getSiteUrl } from '@/lib/site-url';
import { draftMode } from 'next/headers';
import { Metadata } from 'next';
import HeroSection from '@/components/ui/hero-section';
import { getAllCaseStudies, getCaseStudiesPage } from '@/sanity/lib/queries';
import CaseStudiesContent from './case-studies-content';
import { gradientTextStyle } from '@/lib/theme-utils';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getCaseStudiesPage();
  const baseUrl = getSiteUrl();
  const pageUrl = `${baseUrl}/case-studies`;

  const seoTitle = pageData?.seo?.metaTitle;
  const seoDescription = pageData?.seo?.metaDescription;
  const ogImage = pageData?.seo?.ogImage?.asset?.url || null;

  return {
    title: seoTitle,
    description: seoDescription,
    alternates: { canonical: pageUrl },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: pageUrl,
      siteName: 'IIS - Integrated Inspection Systems',
      title: seoTitle,
      description: seoDescription,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: seoTitle }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: ogImage ? [ogImage] : [],
    },
    robots: { index: true, follow: true },
  };
}

export default async function CaseStudiesPage() {
  const { isEnabled: isDraft } = await draftMode();
  const [caseStudies, pageData] = await Promise.all([
    getAllCaseStudies(isDraft),
    getCaseStudiesPage(isDraft),
  ]);

  const heroTitle = pageData?.hero?.title;
  const heroTitleHighlight = pageData?.hero?.titleHighlight;
  const heroDescription = pageData?.hero?.description;
  const heroBackgroundImage = pageData?.hero?.backgroundImage?.asset?.url;
  const heroImageAlt = pageData?.hero?.backgroundImage?.alt || '';
  const heroBadge = pageData?.hero?.badge;

  const gradientStyle = gradientTextStyle;

  const showHero = Boolean(heroTitle || heroDescription);

  // Extract unique industries for filtering
  const industries = Array.from(
    new Map(
      caseStudies
        .filter((cs: { industry?: { title?: string; slug?: string } }) => cs.industry?.title && cs.industry?.slug)
        .map((cs: { industry?: { title?: string; slug?: string } }) => [cs.industry!.slug, cs.industry!.title])
    ).entries()
  ).map(([slug, title]) => ({ slug: slug as string, title: title as string }));

  return (
    <div className="min-h-screen bg-background">
      {showHero && (
        <HeroSection
          backgroundImage={heroBackgroundImage || ''}
          imageAlt={heroImageAlt}
          badge={heroBadge ? { text: heroBadge } : undefined}
          title={(() => {
            if (!heroTitle) return '';
            const highlight = heroTitleHighlight;
            if (highlight && heroTitle.includes(highlight)) {
              const before = heroTitle.slice(0, heroTitle.indexOf(highlight));
              return (
                <span>
                  <span className="text-inherit">{before}</span>
                  <span style={gradientStyle}>{highlight}</span>
                </span>
              );
            }
            const words = heroTitle.split(' ');
            if (words.length === 1) return <span style={gradientStyle}>{heroTitle}</span>;
            const firstPart = words.slice(0, -1).join(' ');
            const lastWord = words[words.length - 1];
            return (
              <span>
                <span className="text-inherit">{firstPart} </span>
                <span style={gradientStyle}>{lastWord}</span>
              </span>
            );
          })()}
          description={heroDescription}
          height="large"
          alignment="center"
          showScrollIndicator
        />
      )}

      <CaseStudiesContent
        caseStudies={caseStudies}
        industries={industries}
        featuredLabel={pageData?.featuredLabel}
        filterLabel={pageData?.filterLabel}
        noResultsMessage={pageData?.noResultsMessage}
        cta={pageData?.cta}
      />
    </div>
  );
}
