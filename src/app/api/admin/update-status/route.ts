import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { id, status } = await req.json();

    if (typeof id !== 'number' || typeof status !== 'string') {
      return NextResponse.json(
        { error: 'Invalid id or status' },
        { status: 400 }
      );
    }

    const existing = await prisma.cardSubmission.findUnique({ where: { id } });

    if (!existing) {
      return NextResponse.json({ error: 'Card not found' }, { status: 404 });
    }

    await prisma.cardSubmission.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('❌ Status update error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}