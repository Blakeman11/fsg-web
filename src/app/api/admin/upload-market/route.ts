// src/app/api/admin/upload-market/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { rows } = await req.json();

    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json({ error: 'No data provided' }, { status: 400 });
    }

    const cleaned = rows.map((row: any) => ({
      title: row.title?.toString() || '',
      playerName: row.playerName?.toString() || '',
      brand: row.brand?.toString() || '',
      year: parseInt(row.year),
      cardNumber: row.cardNumber?.toString() || '',
      category: row.category?.toString() || '',
      grade: row.grade?.toString() || '',
      variation: row.variation?.toString() || '',
      imageUrl: row.imageUrl?.toString() || '',
      price: parseFloat(row.price),
      quantity: parseInt(row.quantity),
      available: true,
    })).filter((card) =>
      card.title && card.playerName && !isNaN(card.year) &&
      card.imageUrl && !isNaN(card.price) && !isNaN(card.quantity)
    );

    if (cleaned.length === 0) {
      return NextResponse.json({ error: 'No valid rows found' }, { status: 400 });
    }

    await prisma.marketCard.deleteMany();

    const result = await prisma.marketCard.createMany({ data: cleaned });

    return NextResponse.json({ success: true, count: result.count });
  } catch (err) {
    console.error('❌ Upload market error:', err);
    return NextResponse.json({ error: 'Failed to upload market' }, { status: 500 });
  }
}