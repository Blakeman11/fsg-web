'use server';

import Image from 'next/image';
import AdminTabs from '@/components/admin/AdminTabs';
import { prisma } from '@/lib/prisma';

export default async function JoshAndSkPage() {
  const allCards = await prisma.marketCard.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const availableCards = allCards.filter((card) => card.quantity > 0);
  const soldCards = allCards.filter((card) => card.quantity === 0);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Josh and SK Admin Page</h1>

      <AdminTabs availableCards={availableCards} soldCards={soldCards} />
    </div>
  );
}