import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { rows } = await req.json();

    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json({ error: 'Invalid upload data' }, { status: 400 });
    }

    let added = 0;
    let skipped = 0;

    for (const row of rows) {
      const exists = await prisma.marketCard.findFirst({
        where: {
          title: row.title,
          year: parseInt(row.year),
          cardNumber: row.cardNumber,
          variation: row.variation || '',
        },
      });

      if (exists) {
        skipped++;
        continue;
      }

      await prisma.marketCard.create({
        data: {
          title: row.title,
          playerName: row.playerName,
          brand: row.brand,
          year: parseInt(row.year),
          cardNumber: row.cardNumber,
          category: row.category,
          grade: row.grade,
          variation: row.variation || '',
          imageUrl: row.imageUrl,
          price: parseFloat(row.price),
          quantity: parseInt(row.quantity),
        },
      });

      added++;
    }

    return NextResponse.json({ success: true, added, skipped });
  } catch (err) {
    console.error('🛑 Upload market error:', err);
    return NextResponse.json({ error: 'Failed to upload market' }, { status: 500 });
  }
}