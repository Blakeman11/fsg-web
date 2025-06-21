import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return new NextResponse('Invalid ID', { status: 400 });
    }

    const deleted = await prisma.marketCard.delete({
      where: { id },
    });

    return NextResponse.json(deleted);
  } catch (err) {
    console.error('❌ Delete API Error:', err);
    return new NextResponse('Delete failed', { status: 500 });
  }
}