import { NextResponse } from 'next/server'
import { getNavigation } from '@/sanity/lib/queries'

export async function GET() {
  try {
    const data = await getNavigation()
    return NextResponse.json(data || null)
  } catch (e) {
    return NextResponse.json(null, { status: 200 })
  }
}

