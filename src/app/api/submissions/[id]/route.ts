import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const { status } = await request.json();

  try {
    await prisma.cardSubmission.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Error updating status:', error);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}