"use client"
import { usePathname } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScrollToTop from '@/components/ui/scroll-to-top'
import AnalyticsProvider from '@/components/analytics/AnalyticsProvider'
import { ThemeProvider } from '@/lib/contexts/ThemeContext'
import PageTransition from '@/components/ui/page-transition'

// CMS data from Sanity has dynamic schemas - types are flexible by design
type Props = {
  children: React.ReactNode
  navigationData?: any
  footerData?: any
  siteSettings?: any
}

export default function SiteChrome({ children, navigationData, footerData, siteSettings }: Props) {
  const pathname = usePathname() || ''
  const isAdminRoute = pathname.startsWith('/admin')

  if (isAdminRoute) {
    return <>{children}</>
  }

  return (
    <ThemeProvider themeData={siteSettings?.theme}>
      <AnalyticsProvider enablePerformanceMonitoring={true}>
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-tone-inverse focus:rounded-lg focus:font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
          Skip to main content
        </a>
        <Header data={{ ...(navigationData || {}), announcement: siteSettings?.announcement, logo: siteSettings?.logo }} />
        <main id="main-content" className="min-h-screen pt-20 lg:pt-[120px] overflow-visible">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
        <Footer key="site-footer-unique" data={{ ...footerData, logo: siteSettings?.logo }} />
        <ScrollToTop />
      </AnalyticsProvider>
    </ThemeProvider>
  )
}
