'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { deleteMarketCard, getMarketCards } from '@/lib/market';

export default function JoshAndSkPage() {
  const [cards, setCards] = useState([]);
  const [form, setForm] = useState({
    title: '',
    playerName: '',
    year: '',
    brand: '',
    cardNumber: '',
    variation: '',
    grade: '',
    price: '',
    imageUrl: '',
    quantity: '',
    available: true,
    category: '',
  });

  const [tab, setTab] = useState('available');

  useEffect(() => {
    async function fetchCards() {
      const res = await fetch('/api/market');
      const data = await res.json();
      setCards(data);
    }
    fetchCards();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteMarketCard(id);
    setCards(cards.filter((card) => card.id !== id));
  };

  const handleSubmit = async () => {
    const res = await fetch('/api/market', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        year: parseInt(form.year),
        price: parseFloat(form.price),
        quantity: parseInt(form.quantity),
        available: form.available === 'true' || form.available === true,
      }),
    });

    if (res.ok) {
      const newCard = await res.json();
      setCards([newCard, ...cards]);
      setForm({
        title: '', playerName: '', year: '', brand: '', cardNumber: '', variation: '',
        grade: '', price: '', imageUrl: '', quantity: '', available: true, category: '',
      });
    }
  };

  const renderCard = (card: any) => (
    <div key={card.id} className="border p-2 rounded w-[180px] text-sm">
      <Image src={card.imageUrl} alt={card.title} width={160} height={230} className="mb-2 rounded" />
      <div className="font-semibold text-xs mb-1">{card.title}</div>
      <div className="text-xs">Qty: {card.quantity}</div>
      <div className="text-xs mb-2">Price: ${card.price}</div>
      <button
        onClick={() => handleDelete(card.id)}
        className="bg-red-500 text-white text-xs py-1 w-full rounded"
      >
        Delete
      </button>
    </div>
  );

  const filtered = cards.filter((card) =>
    tab === 'available' ? card.available : !card.available
  );

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Josh and SK Admin Page</h2>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {Object.entries(form).map(([key, value]) => (
          <input
            key={key}
            className="border p-2 text-sm rounded"
            placeholder={key}
            value={value as string}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          />
        ))}
        <button
          onClick={handleSubmit}
          className="bg-black text-white col-span-3 py-2 rounded"
        >
          Add Card
        </button>
      </div>

      <Tabs defaultValue="available" onValueChange={(v) => setTab(v)}>
        <TabsList className="mb-4">
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="sold">Sold</TabsTrigger>
        </TabsList>
        <TabsContent value="available">
          <div className="flex flex-wrap gap-2">
            {filtered.map(renderCard)}
          </div>
        </TabsContent>
        <TabsContent value="sold">
          <div className="flex flex-wrap gap-2">
            {filtered.map(renderCard)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}