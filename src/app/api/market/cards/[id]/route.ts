// src/app/api/market/cards/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const id = parseInt(context.params.id);

  try {
    await prisma.marketCard.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/market/cards/[id] error:', error);
    return NextResponse.json({ error: 'Failed to delete card' }, { status: 500 });
  }
}