import { getSiteSettings } from '@/sanity/lib/queries'
import { draftMode } from 'next/headers'
import TroubleshootingContent from './troubleshooting-content'

const baseUrl = 'https://iismet.com'

export const metadata = {
  title: 'Troubleshooting & System Status - IIS',
  description: 'Self-service troubleshooting guide and system health monitoring for the IIS website',
  alternates: {
    canonical: `${baseUrl}/troubleshooting`,
  },
  openGraph: {
    type: 'website' as const,
    locale: 'en_US',
    url: `${baseUrl}/troubleshooting`,
    siteName: 'IIS - Integrated Inspection Systems',
    title: 'Troubleshooting & System Status - IIS',
    description: 'Self-service troubleshooting guide and system health monitoring for the IIS website',
  },
  twitter: {
    card: 'summary' as const,
    title: 'Troubleshooting & System Status - IIS',
    description: 'Self-service troubleshooting guide and system health monitoring for the IIS website',
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default async function TroubleshootingPage() {
  const { isEnabled: isDraft } = await draftMode()
  const siteSettings = await getSiteSettings(isDraft)

  return <TroubleshootingContent siteSettings={siteSettings} />
}
