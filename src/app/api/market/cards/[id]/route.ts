// src/app/api/market/cards/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  try {
    const { id } = context.params;

    if (!id || isNaN(Number(id))) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    await prisma.marketCard.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete failed:', error);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}