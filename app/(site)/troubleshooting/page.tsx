import { getSiteSettings } from '@/sanity/lib/queries'
import TroubleshootingContent from './troubleshooting-content'

export const metadata = {
  title: 'Troubleshooting & System Status - IIS',
  description: 'Self-service troubleshooting guide and system health monitoring for the IIS website',
}

export default async function TroubleshootingPage() {
  const siteSettings = await getSiteSettings()

  return <TroubleshootingContent siteSettings={siteSettings} />
}
