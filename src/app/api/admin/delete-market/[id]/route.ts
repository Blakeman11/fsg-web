import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import type { NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise{ id: string } }
): Promise<NextResponse> {
  try {
    const cardId = parseInt(params.id);

    const deleted = await prisma.marketCard.delete({
      where: { id: cardId },
    });

    return NextResponse.json(deleted);
  } catch (error) {
    console.error('❌ Delete Error:', error);
    return new NextResponse('Failed to delete card', { status: 500 });
  }
}