import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: {
      cms: 'sanity',
      node_env: process.env.NODE_ENV,
      vercel: process.env.VERCEL ? 'true' : 'false'
    }
  });
}
