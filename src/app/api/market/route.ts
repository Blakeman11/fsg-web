// app/api/market/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const cards = await prisma.marketCard.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(cards);
  } catch (error) {
    console.error('❌ Failed to fetch market cards:', error);
    return NextResponse.json([], { status: 500 });
  }
}