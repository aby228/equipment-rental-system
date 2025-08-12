// new-rentals/frontend/app/api/equipment/route.ts
import { NextResponse } from 'next/server';
import api from '@/lib/api-express';

export async function GET() {
  try {
    const response = await api.get('/equipment');
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch equipment' }, { status: 500 });
  }
}