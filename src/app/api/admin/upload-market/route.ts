import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('📦 Incoming upload payload:', body);

    const rows = body?.rows;
    if (!Array.isArray(rows)) {
      console.error('❌ Invalid upload payload:', body);
      return new NextResponse('Invalid upload format', { status: 400 });
    }

    const cleanedRows = rows.map((row: any) => ({
      title: row.title ?? '',
      playerName: row.playerName ?? '',
      year: parseInt(row.year) || 0,
      brand: row.brand ?? '',
      cardNumber: row.cardNumber ?? '',
      variation: row.variation ?? '',
      grade: row.grade ?? '',
      price: parseFloat(row.price) || 0,
      imageUrl: row.imageUrl ?? '',
      quantity: parseInt(row.quantity) || 0,
      category: row.category ?? '',
    }));

    const inserted = await prisma.marketCard.createMany({
      data: cleanedRows,
      skipDuplicates: true,
    });

    return NextResponse.json(inserted);
  } catch (error) {
    console.error('❌ Bulk Upload Error:', error);
    return new NextResponse('Upload failed', { status: 500 });
  }
}