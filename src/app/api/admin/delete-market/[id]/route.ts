import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import type { NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  try {
    const cardId = parseInt(context.params.id);

    const deleted = await prisma.marketCard.delete({
      where: { id: cardId },
    });

    return NextResponse.json(deleted);
  } catch (error) {
    console.error('❌ Delete Error:', error);
    return new NextResponse('Failed to delete card', { status: 500 });
  }
}