'use server';

import { getMarketCards, updateMarketCard, deleteMarketCard } from '@/lib/market';
import Image from 'next/image';

export default async function JoshAndSkPage() {
  const cards = await getMarketCards();

  return (
    <main className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Josh and SK Admin Page</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className="border rounded-lg p-2 text-sm shadow-sm bg-white hover:shadow-md transition"
          >
            <Image
              src={card.imageUrl}
              alt={card.title}
              width={300}
              height={400}
              className="rounded mb-2 object-cover"
            />
            <p className="font-semibold leading-tight mb-1">{card.title}</p>
            <p className="text-gray-600">Qty: {card.quantity}</p>
            <p className="text-gray-600">Price: ${card.price}</p>
            {!card.available && (
              <span className="text-xs text-red-500 font-bold">Sold Out</span>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}