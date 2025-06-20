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
    console.error('❌ Market API Error (GET):', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newCard = await prisma.marketCard.create({
      data: {
        title: body.title,
        playerName: body.playerName,
        year: parseInt(body.year),
        brand: body.brand,
        cardNumber: body.cardNumber,
        variation: body.variation,
        grade: body.grade,
        price: parseFloat(body.price),
        imageUrl: body.imageUrl,
        quantity: parseInt(body.quantity),
        category: body.category,
      },
    });

    return NextResponse.json(newCard);
  } catch (error) {
    console.error('❌ Market API Error (POST):', error);
    return new NextResponse('Failed to create card', { status: 500 });
  }
}