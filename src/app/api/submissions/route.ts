// app/api/submissions/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const submissions = await prisma.customer.findMany({
      include: { cards: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(submissions);
  } catch (error) {
    console.error('❌ Failed to fetch submissions:', error);
    return NextResponse.json([], { status: 500 });
  }
}