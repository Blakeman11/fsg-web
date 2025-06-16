// src/app/market/[id]/page.tsx
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import MarketCardDetail from '@/components/MarketCardDetails'; // ✅ ADD THIS

export default async function MarketCardPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const card = await prisma.marketCard.findUnique({ where: { id } });

  if (!card) return notFound();

  return <MarketCardDetail card={card} />;
}