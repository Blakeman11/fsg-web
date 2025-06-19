import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import MarketCardDetail from '@/components/MarketCardDetail';

type MarketCardPageProps = {
  params: {
    id: string;
  };
};

export default async function MarketCardPage({ params }: MarketCardPageProps) {
  const id = parseInt(params.id);

  if (isNaN(id)) return notFound();

  const card = await prisma.marketCard.findUnique({
    where: { id },
  });

  if (!card) return notFound();

  return <MarketCardDetail card={card} />;
}