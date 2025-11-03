import { NextResponse } from 'next/server'
import { getNavigation } from '@/sanity/lib/queries'

export async function GET() {
  const started = Date.now()
  try {
    const nav = await getNavigation()
    const duration = Date.now() - started
    return NextResponse.json({
      ok: true,
      durationMs: duration,
      hasMenu: !!nav?.menuItems?.length,
    })
  } catch (e: any) {
    const duration = Date.now() - started
    return NextResponse.json({
      ok: false,
      durationMs: duration,
      error: e?.message || 'unknown',
    }, { status: 200 })
  }
}
