import { getSiteSettings } from '@/sanity/lib/queries'
import StatusContent from './status-content'

export const metadata = {
  title: 'System Status - IIS',
  description: 'Real-time system health monitoring and environment status for the IIS website',
}

export default async function StatusPage() {
  const siteSettings = await getSiteSettings()

  return <StatusContent siteSettings={siteSettings} />
}
