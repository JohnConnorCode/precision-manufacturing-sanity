"use client"
import { usePathname } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScrollToTop from '@/components/ui/scroll-to-top'
import AnalyticsProvider from '@/components/analytics/AnalyticsProvider'

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
    <AnalyticsProvider enablePerformanceMonitoring={true}>
      <Header data={{ ...(navigationData || {}), announcement: siteSettings?.announcement, logo: siteSettings?.logo }} />
      <main id="main-content" className="min-h-screen pt-20 lg:pt-[120px]">
        {children}
      </main>
      <Footer key="site-footer-unique" data={{ ...footerData, logo: siteSettings?.logo }} />
      <ScrollToTop />
    </AnalyticsProvider>
  )
}
