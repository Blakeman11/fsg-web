'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function JoshAndSkPage() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/market')
      .then(res => res.json())
      .then(data => {
        setCards(data);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this card?')) return;
    await fetch(`/api/market/${id}`, { method: 'DELETE' });
    setCards(cards.filter(card => card.id !== id));
  };

  const availableCards = cards.filter(card => card.available);
  const soldCards = cards.filter(card => !card.available);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Josh and SK Admin Page</h1>

      <Tabs defaultValue="available">
        <TabsList>
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="sold">Sold</TabsTrigger>
        </TabsList>

        <TabsContent value="available">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-4">
            {availableCards.map(card => (
              <div key={card.id} className="border p-2 rounded">
                <Image
                  src={card.imageUrl}
                  alt={card.title}
                  width={150}
                  height={200}
                  className="rounded"
                />
                <p className="text-xs font-semibold mt-1">{card.title}</p>
                <p className="text-xs">Qty: {card.quantity}</p>
                <p className="text-xs">Price: ${card.price}</p>
                <button
                  onClick={() => handleDelete(card.id)}
                  className="mt-2 w-full bg-red-500 text-white text-xs py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sold">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-4">
            {soldCards.map(card => (
              <div key={card.id} className="border p-2 rounded opacity-50">
                <Image
                  src={card.imageUrl}
                  alt={card.title}
                  width={150}
                  height={200}
                  className="rounded"
                />
                <p className="text-xs font-semibold mt-1">{card.title}</p>
                <p className="text-xs">Sold</p>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}