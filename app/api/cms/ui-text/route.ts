import { NextResponse } from 'next/server';
import { getUIText } from '@/sanity/lib/queries';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const uiText = await getUIText();
    return NextResponse.json(uiText || {});
  } catch (error) {
    console.error('Error fetching UI text:', error);
    return NextResponse.json({}, { status: 500 });
  }
}
