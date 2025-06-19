// app/api/market/cards/[id]/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    await prisma.marketCard.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete card' }, { status: 500 });
  }
}