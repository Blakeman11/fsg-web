import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { id, status } = await req.json();

    await prisma.cardSubmission.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('❌ Error updating status:', err);
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
  }
}