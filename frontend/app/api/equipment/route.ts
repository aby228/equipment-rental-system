// new-rentals/frontend/app/api/equipment/route.ts
import { NextResponse } from 'next/server';
import api from '@/lib/api-express';

// Force dynamic rendering to prevent static generation timeout
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const response = await api.get('/equipment');
    return NextResponse.json(response);
  } catch (error) {
    console.error('Equipment API error:', error);
    return NextResponse.json({ error: 'Failed to fetch equipment' }, { status: 500 });
  }
}