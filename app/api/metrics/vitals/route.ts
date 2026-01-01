import { NextResponse } from 'next/server';
import { logServerEvent } from '@/lib/server-logger';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const { type, name, value, rating, page, details } = payload ?? {};

    logServerEvent({
      level: type === 'core-web-vital' && rating === 'poor' ? 'warn' : 'info',
      scope: 'web-vitals',
      message: `${name || 'metric'}: ${value}`,
      context: {
        type,
        name,
        value,
        rating,
        page,
        details,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    logServerEvent({ level: 'error', scope: 'web-vitals', error });
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
