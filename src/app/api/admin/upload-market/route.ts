// admin/upload-market/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { rows } = await req.json();

    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json({ error: 'No data provided' }, { status: 400 });
    }

    const cleaned = rows
      .map((row: any) => ({
        title: row.title?.toString().trim() || '',
        playerName: row.playerName?.toString().trim() || '',
        brand: row.brand?.toString().trim() || '',
        year: parseInt(row.year),
        cardNumber: row.cardNumber?.toString().trim() || '',
        category: row.category?.toString().trim() || '',
        grade: row.grade?.toString().trim() || '',
        variation: row.variation?.toString().trim() || '',
        imageUrl: row.imageUrl?.toString().trim() || '',
        price: parseFloat(row.price),
        quantity: parseInt(row.quantity),
        available: true,
      }))
      .filter(
        (card) =>
          card.title &&
          card.playerName &&
          !isNaN(card.year) &&
          card.imageUrl &&
          !isNaN(card.price) &&
          !isNaN(card.quantity)
      );

    if (cleaned.length === 0) {
      return NextResponse.json({ error: 'No valid rows found' }, { status: 400 });
    }

    let successCount = 0;

    for (const card of cleaned) {
      await prisma.marketCard.upsert({
        where: { title: card.title }, // Title is treated as unique key
        update: { ...card },
        create: { ...card },
      });
      successCount++;
    }

    return NextResponse.json({ success: true, count: successCount });
  } catch (err) {
    console.error('❌ Upload market error:', err);
    return NextResponse.json({ error: 'Failed to upload market' }, { status: 500 });
  }
}