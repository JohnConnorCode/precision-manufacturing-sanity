import { NextResponse } from 'next/server';
import { getAllTeamMembers } from '@/sanity/lib/queries';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const teamMembers = await getAllTeamMembers();
    return NextResponse.json(teamMembers || []);
  } catch (error) {
    console.error('Error fetching team members:', error);
    return NextResponse.json([], { status: 500 });
  }
}
