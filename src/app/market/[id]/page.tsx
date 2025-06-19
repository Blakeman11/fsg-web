import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import MarketCardDetail from '@/components/MarketCardDetail';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function MarketCardPage({ params }: PageProps) {
  const { id } = await params;

  const card = await prisma.marketCard.findUnique({
    where: { id: parseInt(id) },
  });

  if (!card) return notFound();

  return <MarketCardDetail card={card} />;
}
