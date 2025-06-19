'use client';

import { useEffect, useState } from 'react';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';

interface MarketCard {
  id: number;
  title: string;
  playerName: string;
  year: number;
  brand: string;
  cardNumber: string;
  category: string;
  grade: string;
  price: number;
  imageUrl: string;
  variation: string;
  quantity: number;
  available: boolean;
}

export default function JoshAndSkPage() {
  const [cards, setCards] = useState<MarketCard[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({
    title: '',
    playerName: '',
    year: '',
    brand: '',
    cardNumber: '',
    category: '',
    grade: '',
    price: '',
    imageUrl: '',
    variation: '',
    quantity: '',
  });

  useEffect(() => {
    fetch('/api/cards')
      .then((res) => res.json())
      .then((data) => setCards(data));
  }, []);

  const handleEdit = (card: MarketCard) => {
    setEditingId(card.id);
    setForm({
      title: card.title,
      playerName: card.playerName,
      year: card.year.toString(),
      brand: card.brand,
      cardNumber: card.cardNumber,
      category: card.category,
      grade: card.grade,
      price: card.price.toString(),
      imageUrl: card.imageUrl,
      variation: card.variation,
      quantity: card.quantity.toString(),
    });
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/cards/${id}`, { method: 'DELETE' });
    setCards(cards.filter((c) => c.id !== id));
  };

  return (
    <main className="max-w-6xl mx-auto p-4 space-y-6">
      <h1 className="text-xl font-semibold">Josh and SK Admin Page</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div key={card.id} className="border rounded p-3 text-sm">
            <Image
              src={card.imageUrl}
              alt={card.title}
              width={300}
              height={400}
              className="rounded mb-2"
            />
            <p className="font-semibold mb-1">{card.title}</p>
            <p>{card.playerName} ({card.year})</p>
            <p>{card.brand} - #{card.cardNumber}</p>
            <p>{card.category} | Grade: {card.grade}</p>
            <p>Variation: {card.variation}</p>
            <p>Price: ${card.price.toFixed(2)}</p>
            <p>Quantity: {card.quantity}</p>
            <div className="mt-2 space-x-2">
              <button onClick={() => handleEdit(card)} className="text-blue-600">Edit</button>
              <button onClick={() => handleDelete(card.id)} className="text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}