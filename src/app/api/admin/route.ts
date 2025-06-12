import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const { id, status } = await req.json();

  await prisma.cardSubmission.update({
    where: { id },
    data: { status },
  });

  return NextResponse.json({ success: true });
}