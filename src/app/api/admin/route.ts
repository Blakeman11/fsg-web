import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;

    // ✅ Validate input
    if (typeof id !== 'number' || typeof status !== 'string') {
      return NextResponse.json(
        { error: 'Invalid request: id must be number, status must be string' },
        { status: 400 }
      );
    }

    // ✅ Check if submission exists
    const existing = await prisma.cardSubmission.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Card submission not found' }, { status: 404 });
    }

    // ✅ Update status
    await prisma.cardSubmission.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('❌ Failed to update submission status:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}