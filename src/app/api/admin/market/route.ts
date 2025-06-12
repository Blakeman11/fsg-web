import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const cards = await prisma.marketCard.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(cards);
  } catch (err) {
    console.error('❌ Error fetching market cards:', err);
    return NextResponse.json({ error: 'Failed to fetch cards' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = Number(req.nextUrl.searchParams.get('id'));
    if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

    await prisma.marketCard.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('❌ Error deleting card:', err);
    return NextResponse.json({ error: 'Failed to delete card' }, { status: 500 });
  }
}