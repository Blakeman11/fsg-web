import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const cards = await prisma.marketCard.findMany();
    return NextResponse.json(cards);
  } catch (error) {
    console.error('❌ Error fetching market cards:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}