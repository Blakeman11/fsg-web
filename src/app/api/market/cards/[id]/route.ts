// DELETE /api/market/cards/:id
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  await prisma.marketCard.delete({ where: { id } });
  return NextResponse.json({ success: true });
}