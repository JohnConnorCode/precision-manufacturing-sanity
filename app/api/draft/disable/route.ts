import { draftMode } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const draft = await draftMode()
  draft.disable()
  
  const url = new URL(request.url)
  const redirectTo = url.searchParams.get('redirect') || '/'
  
  return NextResponse.redirect(new URL(redirectTo, request.url))
}
