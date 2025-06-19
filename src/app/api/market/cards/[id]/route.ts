import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic'; // ✅ still good here

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const id = parseInt(url.pathname.split('/').pop()!); // ✅ extract from URL

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