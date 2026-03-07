import { getSiteUrl } from '@/lib/site-url';
import { getSiteSettings } from '@/sanity/lib/queries'
import { draftMode } from 'next/headers'
import StatusContent from './status-content'

const baseUrl = getSiteUrl()

export const metadata = {
  title: 'System Status - IIS',
  description: 'Real-time system health monitoring and environment status for the IIS website',
  alternates: {
    canonical: `${baseUrl}/status`,
  },
  openGraph: {
    type: 'website' as const,
    locale: 'en_US',
    url: `${baseUrl}/status`,
    siteName: 'IIS - Integrated Inspection Systems',
    title: 'System Status - IIS',
    description: 'Real-time system health monitoring and environment status for the IIS website',
  },
  twitter: {
    card: 'summary' as const,
    title: 'System Status - IIS',
    description: 'Real-time system health monitoring and environment status for the IIS website',
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default async function StatusPage() {
  const { isEnabled: isDraft } = await draftMode()
  const siteSettings = await getSiteSettings(isDraft)

  return <StatusContent siteSettings={siteSettings} />
}
