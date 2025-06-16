import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import MarketCardDetail from '@/components/MarketCardDetails'; // ✅ Correct component name

interface PageProps {
  params: { id: string };
}

export default async function MarketCardPage({ params }: PageProps) {
  const id = parseInt(params.id);
  const card = await prisma.marketCard.findUnique({ where: { id } });

  if (!card) return notFound();

  return <MarketCardDetail card={card} />;
}