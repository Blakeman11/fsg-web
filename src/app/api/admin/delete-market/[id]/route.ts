import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    const deleted = await prisma.marketCard.delete({
      where: { id: parseInt(params.id) },
    });

    return NextResponse.json(deleted);
  } catch (error) {
    console.error('❌ Delete Error:', error);
    return new NextResponse('Failed to delete card', { status: 500 });
  }
}