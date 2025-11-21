import { getErrorPages, getSiteSettings } from '@/sanity/lib/queries'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const [errorPages, siteSettings] = await Promise.all([
      getErrorPages(),
      getSiteSettings()
    ])

    return NextResponse.json({
      globalError: errorPages?.globalError,
      siteSettings: {
        contact: {
          supportEmail: siteSettings?.contact?.supportEmail
        }
      }
    })
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch error pages content' },
      { status: 500 }
    )
  }
}
