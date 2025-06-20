import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { parse } from 'csv-parse/sync';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const records = parse(body, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    const cards = records.map((row: any) => ({
      title: row.title || 'Untitled',
      playerName: row.playerName || '',
      year: parseInt(row.year) || 0,
      brand: row.brand || '',
      cardNumber: row.cardNumber || '',
      category: row.category || '',
      grade: row.grade || 'Raw',
      price: parseFloat(row.price) || 1,
      imageUrl: row.imageUrl || '',
      variation: row.variation || 'N/A',
      quantity: parseInt(row.quantity || '1'),
    }));

    // Optional: clear old cards first
    await prisma.marketCard.deleteMany();

    // Bulk insert
    await prisma.marketCard.createMany({
      data: cards,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Upload failed:', error);
    return NextResponse.json({ success: false, error: 'Upload failed' }, { status: 500 });
  }
}