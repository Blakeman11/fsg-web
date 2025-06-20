import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const cards = await prisma.marketCard.findMany({
      where: { available: true }, // only available cards
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(cards); // ✅ always an array
  } catch (error) {
    console.error('❌ Failed to fetch market cards:', error);
    return NextResponse.json([], { status: 200 }); // ✅ fallback to empty array
  }
}