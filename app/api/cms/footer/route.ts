import { NextResponse } from 'next/server'
import { getFooter } from '@/sanity/lib/queries'

export async function GET() {
  try {
    const data = await getFooter()
    return NextResponse.json(data || null)
  } catch (e) {
    return NextResponse.json(null, { status: 200 })
  }
}

