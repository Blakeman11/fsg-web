import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { cards } = await req.json();

    // Sanitize and map input
    const cleaned = cards.map((card: any) => ({
      title: card.title,
      playerName: card.playerName,
      year: parseInt(card.year),
      brand: card.brand,
      cardNumber: card.cardNumber,
      category: card.category,
      grade: card.grade,
      variation: card.variation || '',
      price: parseFloat(card.price),
      imageUrl: card.imageUrl,
      quantity: parseInt(card.quantity),
    }));

    await prisma.marketCard.createMany({
      data: cleaned,
      skipDuplicates: true, // avoid duplicate titles if unique
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('❌ Upload error:', err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}