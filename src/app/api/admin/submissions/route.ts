import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const customers = await prisma.customer.findMany({
      include: { cards: true },
      orderBy: { createdAt: 'desc' },
    });

    const formatted = customers.map((customer) => ({
      ...customer,
      cards: customer.cards,
    }));

    return NextResponse.json(formatted);
  } catch (err) {
    console.error('❌ Error fetching submissions:', err);
    return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 });
  }
}