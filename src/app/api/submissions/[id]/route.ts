import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(req: NextRequest, context: any) {
  const id = parseInt(context.params.id);

  try {
    const body = await req.json();

    const updated = await prisma.cardSubmission.update({
      where: { id },
      data: body,
    });

    return NextResponse.json({ success: true, updated });
  } catch (error) {
    console.error('❌ Failed to update submission:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}