import { NextResponse } from 'next/server'
import { draftMode } from 'next/headers'
import { getSiteSettings } from '@/sanity/lib/queries'

export async function GET() {
  try {
    const { isEnabled } = await draftMode()
    const settings = await getSiteSettings(isEnabled)
    return NextResponse.json(settings ?? {}, { status: 200 })
  } catch {
    return NextResponse.json({ error: 'Failed to load site settings' }, { status: 500 })
  }
}

