import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { rows } = await req.json();

    const cleanedRows = rows
      .map((row: any, i: number) => {
        try {
          return {
            title: row.title,
            playerName: row.playerName,
            year: Number(row.year),
            brand: row.brand,
            cardNumber: row.cardNumber,
            variation: row.variation || '',
            grade: row.grade || '',
            price: parseFloat(row.price),
            imageUrl: row.imageUrl || '',
            quantity: Number(row.quantity || 1),
            category: row.category || '',
            available: true,
          };
        } catch (err) {
          console.error(`❌ Error parsing row ${i}:`, err);
          return null;
        }
      })
      .filter((row) => row !== null); // Only keep valid rows

    const result = await prisma.marketCard.createMany({
      data: cleanedRows,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('❌ Bulk Upload Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}