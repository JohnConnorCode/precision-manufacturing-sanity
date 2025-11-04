import { NextResponse } from 'next/server'
import { draftMode } from 'next/headers'
import { getFooter } from '@/sanity/lib/queries'

export async function GET() {
  try {
    const { isEnabled } = await draftMode()
    const footer = await getFooter(isEnabled)
    return NextResponse.json(footer ?? {}, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to load footer' }, { status: 500 })
  }
}

