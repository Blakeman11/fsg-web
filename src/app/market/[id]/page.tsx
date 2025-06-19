import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import MarketCardDetail from '@/components/MarketCardDetail';

export default async function MarketCardPage({
  params,
}: {
  params: { id: string };
}) {
  const id = parseInt(params.id);

  if (isNaN(id)) return notFound();

  const card = await prisma.marketCard.findUnique({
    where: { id },
  });

  if (!card) return notFound();

  return <MarketCardDetail card={card} />;
}