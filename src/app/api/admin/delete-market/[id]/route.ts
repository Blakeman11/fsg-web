import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(
  req: Request,
  context: Promise{ params: { id: string } }
) {
  try {
    const { id } = context.params;

    const deleted = await prisma.marketCard.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json(deleted);
  } catch (err) {
    console.error('❌ Delete API Error:', err);
    return new NextResponse('Delete failed', { status: 500 });
  }
}