// src/app/api/admin/upload-market/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import * as XLSX from 'xlsx';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);

    const cleaned = (rows as any[]).map((row) => ({
      title: row.title || '',
      playerName: row.playerName || '',
      year: parseInt(row.year) || 0,
      brand: row.brand || '',
      cardNumber: row.cardNumber?.toString() || '',
      category: row.category || 'Other',
      condition: row.condition || 'Raw',
      grade: row.grade || 'Raw',
      price: parseFloat(row.price) || 1,
      imageUrl: row.imageUrl || '',
      variation: row.variation || '',
      quantity: parseInt(row.quantity) || 1,
    })).filter((card) => card.title && card.playerName && card.imageUrl);

    const results = [];
    for (const card of cleaned) {
      const result = await prisma.marketCard.upsert({
        where: { title: card.title },
        update: { ...card },
        create: { ...card },
      });
      results.push(result);
    }

    return NextResponse.json({ success: true, count: results.length });
  } catch (error) {
    console.error('❌ Upload market error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}