'use client';

import { useState } from 'react';

type Card = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  imageUrl: string;
};

export default function AdminTabs({
  availableCards,
  soldCards,
}: {
  availableCards: Card[];
  soldCards: Card[];
}) {
  const [tab, setTab] = useState<'available' | 'sold'>('available');

  const activeTab = (name: 'available' | 'sold') =>
    tab === name ? 'font-bold underline' : 'text-gray-500';

  const cardsToShow = tab === 'available' ? availableCards : soldCards;

  return (
    <div className="space-y-6">
      <div className="flex gap-6 border-b pb-2">
        <button onClick={() => setTab('available')} className={activeTab('available')}>
          Available
        </button>
        <button onClick={() => setTab('sold')} className={activeTab('sold')}>
          Sold
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cardsToShow.map((card) => (
          <div
            key={card.id}
            className="border rounded p-2 text-sm bg-white shadow-sm hover:shadow-md transition"
          >
            <img src={card.imageUrl} alt={card.title} className="w-full rounded mb-2" />
            <p className="font-medium">{card.title}</p>
            <p>Qty: {card.quantity}</p>
            <p>Price: ${card.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}