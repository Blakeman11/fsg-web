import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import MarketCardDetail from '@/components/MarketCardDetail';

export default function MarketCardPage({ params }: { params: { id: string } }) {
  return <MarketCardServerPage params={params} />;
}

async function MarketCardServerPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const card = await prisma.marketCard.findUnique({ where: { id } });

  if (!card) return notFound();

  return <MarketCardDetail card={card} />;
}