import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import MarketCardDetail from '@/components/MarketCardDetail';

interface PageProps {
  params: Promise<{ id: string }> | { id: string };
}

export default async function MarketCardPage({ params }: PageProps) {
  const resolvedParams = await Promise.resolve(params); // works for both promise & object
  const id = parseInt(resolvedParams.id);

  const card = await prisma.marketCard.findUnique({
    where: { id },
  });

  if (!card) return notFound();

  return <MarketCardDetail card={card} />;
}