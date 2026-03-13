import { NextResponse } from 'next/server'

// Temporary debug endpoint - remove after fixing Presentation Tool
export function GET() {
  const readToken = process.env.SANITY_API_READ_TOKEN
  const writeToken = process.env.SANITY_API_WRITE_TOKEN
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

  return NextResponse.json({
    SANITY_API_READ_TOKEN: readToken ? `${readToken.substring(0, 5)}...${readToken.substring(readToken.length - 5)} (len: ${readToken.length})` : 'MISSING',
    SANITY_API_WRITE_TOKEN: writeToken ? `${writeToken.substring(0, 5)}...${writeToken.substring(writeToken.length - 5)} (len: ${writeToken.length})` : 'MISSING',
    NEXT_PUBLIC_SANITY_PROJECT_ID: projectId || 'MISSING',
    NODE_ENV: process.env.NODE_ENV,
  })
}
