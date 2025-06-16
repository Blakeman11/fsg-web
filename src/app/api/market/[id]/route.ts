import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop();

  const parsedId = parseInt(id || '');
  if (isNaN(parsedId)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    await prisma.marketCard.delete({
      where: { id: parsedId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ DELETE error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}