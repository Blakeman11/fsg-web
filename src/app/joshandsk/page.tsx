'use server';

import { getMarketCards } from '@/lib/market';
import Image from 'next/image';

export default async function JoshAndSkPage() {
  const cards = await getMarketCards();

  const availableCards = cards.filter((card) => card.available);
  const soldCards = cards.filter((card) => !card.available);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Josh and SK Admin Page</h1>

      <div className="mb-6 border-b">
        <nav className="flex space-x-4" role="tablist">
          <button
            role="tab"
            aria-selected="true"
            className="py-2 px-4 text-sm font-medium border-b-2 border-black"
          >
            Available
          </button>
          <button
            role="tab"
            aria-selected="false"
            className="py-2 px-4 text-sm text-gray-500 hover:text-black"
            onClick={() => alert('Toggle coming soon')}
          >
            Sold
          </button>
        </nav>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {availableCards.map((card) => (
          <div
            key={card.id}
            className="border rounded p-2 text-xs bg-white shadow-sm"
          >
            <Image
              src={card.imageUrl}
              alt={card.title}
              width={200}
              height={280}
              className="rounded mb-2"
            />
            <div className="font-semibold leading-snug">
              {card.title.toUpperCase()}
            </div>
            <div className="text-gray-500">Qty: {card.quantity}</div>
            <div className="text-gray-700 font-medium text-sm">
              ${card.price}
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mt-10 mb-4">Sold Out</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {soldCards.map((card) => (
          <div
            key={card.id}
            className="border rounded p-2 text-xs bg-gray-100 shadow-sm opacity-80"
          >
            <Image
              src={card.imageUrl}
              alt={card.title}
              width={200}
              height={280}
              className="rounded mb-2"
            />
            <div className="font-semibold leading-snug line-clamp-2">
              {card.title.toUpperCase()}
            </div>
            <div className="text-red-600 font-bold">SOLD</div>
          </div>
        ))}
      </div>
    </main>
  );
}