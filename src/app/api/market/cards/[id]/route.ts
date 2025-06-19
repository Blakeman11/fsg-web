// src/app/api/market/cards/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic'; // 🟢 Required for dynamic API routes

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  const url = new URL(req.url);
  const id = parseInt(url.pathname.split('/').pop()!); // 🧠 Pull the [id] param from URL

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