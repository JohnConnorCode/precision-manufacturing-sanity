import type { Metadata } from "next";
import { draftMode } from 'next/headers'
import "../globals.css";
import SiteChrome from "@/components/layout/SiteChrome";
import VisualEditingClient from '@/components/VisualEditingClient'
import { AdminToolbar } from "@/components/admin-toolbar";
import { Analytics } from "@vercel/analytics/react";
import PreviewBanner from "@/components/preview-banner";
import { Toaster } from 'sonner';
import { getNavigation, getFooter, getSiteSettings } from '@/sanity/lib/queries';

// Use system font stack instead of Google Fonts for build reliability
const fontClass = 'font-sans';

export const metadata: Metadata = {
  title: "IIS - Precision Machining & CMM Inspection Services | AS9100 Certified | Oregon",
  description: "Integrated Inspection Systems (IIS) - AS9100 & ISO 9001 certified precision machining, CMM inspection, and first article inspection services. Proprietary MetBase® software for closed-loop data integration. ITAR registered. Serving aerospace, defense & manufacturing since 1995.",
  keywords: "CMM inspection services, AS9100 certified, ISO 9001, ITAR registered, first article inspection, precision machining Oregon, dimensional inspection, coordinate measuring, MetBase software, aerospace machining, defense manufacturing, GD&T, statistical process control, Clackamas Oregon",
  authors: [{ name: "Integrated Inspection Systems (IIS)" }],
  creator: "Integrated Inspection Systems",
  publisher: "Integrated Inspection Systems",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://iismet.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    apple: [
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
  },
  openGraph: {
    title: "IIS - AS9100 Certified Precision Machining & CMM Inspection | Oregon",
    description: "AS9100 & ISO 9001 certified precision machining and CMM inspection services. First article inspection, dimensional measurement, and proprietary MetBase® software for aerospace, defense & manufacturing industries. ITAR registered since 1995.",
    url: "https://iismet.com",
    siteName: "Integrated Inspection Systems (IIS)",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "IIS - Integrated Inspection Systems Data-Driven Manufacturing",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IIS - Integrated Inspection Systems | Data-Driven Manufacturing",
    description: "Pioneer in data-driven precision manufacturing with proprietary Metbase® software. Serving industrial gas turbines, aerospace & government with ISO 9001 & AS9100 certified excellence since 1995.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "verification-token-here",
  },
};

// Helper function to normalize navigation hrefs
function normalizeHref(name: string, href?: string | null) {
  const n = (name || '').toLowerCase()
  const h = (href || '').trim()
  if (h && h !== '#') return h
  if (n.includes('about')) return '/about'
  if (n.includes('contact')) return '/contact'
  if (n.includes('service')) return '/services'
  if (n.includes('industr')) return '/industries'
  if (n.includes('resource')) return '/resources'
  if (n.includes('career') || n.includes('job')) return '/careers'
  return '/'
}

// Helper function to map navigation items
function mapNavigationItem(item: any): any {
  if (!item) return null
  if (item?._type === 'navGroup') {
    const title = item?.groupTitle || 'Group'
    const items = Array.isArray(item?.items) ? item.items.map(mapNavigationItem).filter(Boolean) : []
    return { name: title, href: '', description: '', linkType: 'internal', openInNewTab: false, iconName: null, showInHeader: true, showInMobile: true, style: { variant: 'link', badgeText: null }, children: items }
  }
  const name = item?.name ?? ''
  const href = normalizeHref(name, item?.href ?? '')
  const children = Array.isArray(item?.children) ? item.children.map(mapNavigationItem).filter(Boolean) : []
  return {
    name,
    href,
    description: item?.description || '',
    linkType: item?.linkType || 'internal',
    openInNewTab: Boolean(item?.openInNewTab),
    iconName: (item?.iconPreset && item.iconPreset !== 'custom' && item.iconPreset !== 'none') ? item.iconPreset : (item?.iconName || null),
    showInHeader: item?.showInHeader !== false,
    showInMobile: item?.showInMobile !== false,
    style: {
      variant: item?.style?.variant || 'link',
      badgeText: item?.style?.badgeText || null,
    },
    children,
  }
}

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isDraft } = await draftMode()

  // Fetch navigation, footer, and site settings server-side
  const [navData, footerData, siteSettingsData] = await Promise.all([
    getNavigation(isDraft).catch(() => null),
    getFooter(isDraft).catch(() => null),
    getSiteSettings(isDraft).catch(() => null),
  ])

  // Normalize navigation data
  const navigationData = navData ? {
    topBar: navData?.topBar ?? null,
    cta: navData?.cta ?? null,
    styles: navData?.styles ?? null,
    menuItems: Array.isArray(navData?.menuItems) ? navData.menuItems.map(mapNavigationItem).filter(Boolean) : [],
  } : null

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://iismet.com/#organization",
        name: "Integrated Inspection Systems (IIS)",
        alternateName: "IIS",
        url: "https://iismet.com",
        logo: {
          "@type": "ImageObject",
          url: "https://iismet.com/logo.png",
          width: "300",
          height: "100",
        },
        description: "Pioneer in data-driven precision manufacturing since 1995. Proprietary Metbase® software creates closed-loop systems linking CMM inspection data to CNC machining. Serving industrial gas turbines (GE, Siemens, Alstom), aerospace, and government sectors.",
        foundingDate: "1995",
        areaServed: {
          "@type": "Country",
          name: "United States",
        },
        sameAs: [
          "https://www.linkedin.com/company/integrated-inspection-systems",
          "https://twitter.com/iismet",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+1-503-231-9093",
          email: "officemgr@iismet.com",
          contactType: "Sales",
          areaServed: "US",
          availableLanguage: ["English"],
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "14310 SE Industrial Way",
          addressLocality: "Clackamas",
          addressRegion: "Oregon",
          postalCode: "97015",
          addressCountry: "US",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://iismet.com/#website",
        url: "https://iismet.com",
        name: "Integrated Inspection Systems (IIS)",
        description: "IIS - Pioneer in data-driven precision manufacturing with proprietary Metbase® software",
        publisher: {
          "@id": "https://iismet.com/#organization",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://iismet.com/search?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://iismet.com/#localbusiness",
        name: "Integrated Inspection Systems (IIS)",
        image: "https://iismet.com/facility.jpg",
        priceRange: "$$$",
        address: {
          "@type": "PostalAddress",
          streetAddress: "14310 SE Industrial Way",
          addressLocality: "Clackamas",
          addressRegion: "Oregon",
          postalCode: "97015",
          addressCountry: "US",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "45.4215",
          longitude: "-122.5701",
        },
        url: "https://iismet.com",
        telephone: "+1-503-231-9093",
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "07:00",
          closes: "17:00",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Data-Driven Manufacturing Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "CMM Inspection Services",
                description: "Coordinate Measuring Machine inspection with NIST-traceable calibration. First article inspection (FAI), dimensional verification, and AS9102 compliance reporting",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Precision Machining",
                description: "AS9100 certified CNC machining services. Multi-axis capabilities for aerospace, defense, and commercial applications with tight tolerances",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "First Article Inspection (FAI)",
                description: "Complete AS9102 first article inspection services with comprehensive documentation, ballooned drawings, and process verification",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Engineering & Metrology Services",
                description: "GD&T analysis, reverse engineering, process capability studies, and fixture design with MetBase® software integration for data management",
              },
            },
          ],
        },
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${fontClass} antialiased`}>
        <SiteChrome
          navigationData={navigationData}
          footerData={footerData}
          siteSettings={siteSettingsData}
        >
          {children}
        </SiteChrome>
        <AdminToolbar />
        <Analytics />
        <Toaster
          position="top-right"
          richColors
          closeButton
          theme="dark"
        />
        {isDraft && process.env.NEXT_PUBLIC_ENABLE_VISUAL_EDITING === 'true' ? <VisualEditingClient /> : null}
        {isDraft ? <PreviewBanner /> : null}
      </body>
    </html>
  );
}
