// src/app/api/admin/upload-market/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { rows } = await req.json();

    const formatted = rows.map((card: any) => ({
      title: card.title,
      playerName: card.playerName,
      year: parseInt(card.year),
      brand: card.brand,
      cardNumber: card.cardNumber,
      variation: card.variation,
      grade: card.grade,
      price: parseFloat(card.price),
      imageUrl: card.imageUrl,
      quantity: parseInt(card.quantity),
      category: card.category,
    }));

    await prisma.marketCard.createMany({
      data: formatted,
      skipDuplicates: true, // optional
    });

    return new NextResponse('Cards uploaded successfully', { status: 200 });
  } catch (error) {
    console.error('❌ Bulk Upload Error:', error);
    return new NextResponse('Failed to upload cards', { status: 500 });
  }
}