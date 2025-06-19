// app/api/market/cards/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const cards = await prisma.marketCard.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(cards);
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const newCard = await prisma.marketCard.create({
      data: {
        title: data.title,
        playerName: data.playerName,
        year: Number(data.year),
        brand: data.brand,
        cardNumber: data.cardNumber,
        category: data.category,
        grade: data.grade,
        price: Number(data.price),
        imageUrl: data.imageUrl,
        variation: data.variation || '',
        condition: data.condition || '',
        quantity: Number(data.quantity || 1),
        available: true,
      },
    });

    return NextResponse.json(newCard, { status: 201 });
  } catch (error) {
    console.error('❌ Error creating market card:', error);
    return NextResponse.json({ error: 'Failed to add card' }, { status: 500 });
  }
}