import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    const card = await prisma.marketCard.findUnique({
      where: { id },
    });

    if (!card || card.sold) {
      return NextResponse.json({ error: 'Card not found' }, { status: 404 });
    }

    return NextResponse.json(card);
  } catch (error) {
    console.error('❌ Error fetching market card:', error);
    return NextResponse.json({ error: 'Fetch failed' }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);

  try {
    await prisma.marketCard.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Error deleting market card:', error);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}