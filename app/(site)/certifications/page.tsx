import { draftMode } from 'next/headers';
import { Metadata } from 'next';
import HeroSection from '@/components/ui/hero-section';
import { getAllCertifications, getCertificationsPage } from '@/sanity/lib/queries';
import CertificationsContent from './certifications-content';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getCertificationsPage();
  const baseUrl = 'https://iismet.com';
  const pageUrl = `${baseUrl}/certifications`;

  const seoTitle = pageData?.seo?.metaTitle || 'Certifications | AS9100D, ISO 9001, ITAR | IIS';
  const seoDescription = pageData?.seo?.metaDescription || 'IIS holds AS9100D, ISO 9001:2015, and ITAR certifications. Learn about our quality management system and compliance standards for aerospace, defense, and precision machining.';
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

export default async function CertificationsPage() {
  const { isEnabled: isDraft } = await draftMode();
  const [certifications, pageData] = await Promise.all([
    getAllCertifications(isDraft),
    getCertificationsPage(isDraft),
  ]);

  const heroTitle = pageData?.hero?.title;
  const heroTitleHighlight = pageData?.hero?.titleHighlight;
  const heroDescription = pageData?.hero?.description;
  const heroBackgroundImage = pageData?.hero?.backgroundImage?.asset?.url;
  const heroImageAlt = pageData?.hero?.backgroundImage?.alt || '';
  const heroBadge = pageData?.hero?.badge;

  const gradientStyle = {
    background: 'linear-gradient(to right, #3b82f6, #4f46e5)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  } as React.CSSProperties;

  const showHero = Boolean(heroTitle || heroDescription);

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

      <CertificationsContent
        certifications={certifications}
        qualityCommitment={pageData?.qualityCommitment}
        cta={pageData?.cta}
      />
    </div>
  );
}
