"use client"
import { createContext, useContext } from 'react'
import { usePathname } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScrollToTop from '@/components/ui/scroll-to-top'
import AnalyticsProvider from '@/components/analytics/AnalyticsProvider'
import { ThemeProvider } from '@/lib/contexts/ThemeContext'
import PageTransition from '@/components/ui/page-transition'
import type { GlobalErrorData } from '@/sanity/types/query.types'

const ErrorPageContext = createContext<GlobalErrorData | null>(null)
export const useErrorPageData = () => useContext(ErrorPageContext)

interface LogoData {
  logoType?: 'svg' | 'custom' | 'original'
  customLogo?: {
    asset?: { url: string }
    alt?: string
  }
  svgColor?: 'auto' | 'dark' | 'light'
  showCompanyText?: boolean
  enableAnimation?: boolean
}

interface SiteSettings {
  theme?: Record<string, unknown>
  announcement?: {
    enabled?: boolean
    text?: string
    link?: string
  }
  logo?: LogoData
  contact?: {
    supportEmail?: string
    phone?: string
  }
  [key: string]: unknown
}

interface ErrorPageDataShape {
  globalError?: GlobalErrorData
  [key: string]: unknown
}

type Props = {
  children: React.ReactNode
  navigationData?: Record<string, unknown> | null
  footerData?: Record<string, unknown> | null
  siteSettings?: SiteSettings | null
  errorPageData?: ErrorPageDataShape | null
}

export default function SiteChrome({ children, navigationData, footerData, siteSettings, errorPageData }: Props) {
  const pathname = usePathname() || ''
  const isAdminRoute = pathname.startsWith('/admin')

  if (isAdminRoute) {
    return <>{children}</>
  }

  return (
    <ErrorPageContext.Provider value={errorPageData?.globalError || null}>
      <ThemeProvider themeData={siteSettings?.theme}>
        <AnalyticsProvider enablePerformanceMonitoring={true}>
          {/* Skip to main content link for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:top-4 focus-visible:left-4 focus-visible:z-[100] focus-visible:px-4 focus-visible:py-2 focus-visible:bg-blue-600 focus-visible:text-tone-inverse focus-visible:rounded-lg focus-visible:font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/50 focus-visible:ring-offset-2"
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
    </ErrorPageContext.Provider>
  )
}
