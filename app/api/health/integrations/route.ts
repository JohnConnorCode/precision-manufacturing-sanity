import { NextResponse } from 'next/server'
import { getSiteSettings } from '@/sanity/lib/queries'

export const revalidate = 0 // Always fresh

export async function GET() {
  const checks = {
    timestamp: new Date().toISOString(),
    sanity: {
      connected: false,
      message: 'Not checked',
      responseTime: 0,
    },
    apis: {
      navigation: false,
      footer: false,
      siteSettings: false,
    },
    email: {
      configured: false,
      message: '',
    },
  }

  // Check Sanity connection
  const sanityStart = performance.now()
  try {
    const settings = await getSiteSettings(false)
    const sanityTime = performance.now() - sanityStart
    checks.sanity.connected = !!settings
    checks.sanity.message = settings ? 'Connected' : 'No data'
    checks.sanity.responseTime = Math.round(sanityTime)
  } catch (error) {
    checks.sanity.message = error instanceof Error ? error.message : 'Unknown error'
    checks.sanity.responseTime = Math.round(performance.now() - sanityStart)
  }

  // Check email config
  const hasSmtpHost = !!process.env.SMTP_HOST
  const hasSmtpUser = !!process.env.SMTP_USER
  const hasSmtpPass = !!process.env.SMTP_PASS
  checks.email.configured = hasSmtpHost && hasSmtpUser && hasSmtpPass
  checks.email.message = checks.email.configured
    ? 'SMTP configured'
    : `Missing: ${!hasSmtpHost ? 'SMTP_HOST ' : ''}${!hasSmtpUser ? 'SMTP_USER ' : ''}${!hasSmtpPass ? 'SMTP_PASS' : ''}`.trim()

  // Simple API checks (just see if env vars are set)
  checks.apis.navigation = !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  checks.apis.footer = !!process.env.NEXT_PUBLIC_SANITY_DATASET
  checks.apis.siteSettings = checks.sanity.connected

  const allHealthy =
    checks.sanity.connected &&
    checks.email.configured &&
    checks.apis.navigation &&
    checks.apis.footer &&
    checks.apis.siteSettings

  return NextResponse.json(
    { ...checks, healthy: allHealthy },
    {
      status: allHealthy ? 200 : 503,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Type': 'application/json',
      },
    }
  )
}
