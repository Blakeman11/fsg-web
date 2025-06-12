// GET /api/market/cards
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const cards = await prisma.marketCard.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(cards);
}