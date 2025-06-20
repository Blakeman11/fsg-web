// src/app/api/market/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const cards = await prisma.marketCard.findMany({
      where: {
        quantity: { gt: 0 }, // ✅ only cards in stock
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(cards);
  } catch (error) {
    console.error('❌ Market API Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}