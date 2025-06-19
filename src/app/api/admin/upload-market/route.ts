// src/app/api/admin/upload-market/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { rows } = await req.json();

    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json({ error: 'Invalid upload data' }, { status: 400 });
    }

    // Wipe current market
    await prisma.marketCard.deleteMany();

    // Create new entries
    const entries = await prisma.marketCard.createMany({
      data: rows.map((row: any) => ({
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
      })),
    });

    return NextResponse.json({ success: true, count: entries.count });
  } catch (err) {
    console.error('Upload market error:', err);
    return NextResponse.json({ error: 'Failed to upload market' }, { status: 500 });
  }
}