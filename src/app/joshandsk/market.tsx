'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface MarketCard {
  id: number;
  title: string;
  playerName: string;
  year?: number;
  brand: string;
  cardNumber: string;
  category: string;
  condition?: string;
  grade: string;
  price: number;
  imageUrl: string;
  variation?: string;
  quantity: number;
}

export default function AdminMarket() {
  const [cards, setCards] = useState<MarketCard[]>([]);
  const [newCard, setNewCard] = useState({
    title: '',
    playerName: '',
    brand: '',
    year: '',
    cardNumber: '',
    category: '',
    grade: '',
    price: '',
    imageUrl: '',
    quantity: '1',
    variation: '',
  });

  useEffect(() => {
    fetch('/api/market')
      .then((res) => res.json())
      .then((data) => setCards(data));
  }, []);

  const handleAddCard = async () => {
    const payload = {
      ...newCard,
      year: parseInt(newCard.year),
      price: parseFloat(newCard.price),
      quantity: parseInt(newCard.quantity),
    };

    const res = await fetch('/api/market/cards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const newEntry = await res.json();
      setCards((prev) => [newEntry, ...prev]);
      setNewCard({
        title: '',
        playerName: '',
        brand: '',
        year: '',
        cardNumber: '',
        category: '',
        grade: '',
        price: '',
        imageUrl: '',
        quantity: '1',
        variation: '',
      });
    } else {
      alert('Failed to add card');
    }
  };

  const handleDeleteCard = async (id: number) => {
    const confirmed = confirm('Are you sure you want to delete this card?');
    if (!confirmed) return;

    const res = await fetch(`/api/market/cards/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setCards((prev) => prev.filter((card) => card.id !== id));
    } else {
      alert('Failed to delete card');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Market Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-6">
        {['title', 'playerName', 'brand', 'year', 'cardNumber', 'category', 'grade', 'price', 'imageUrl', 'quantity', 'variation'].map((field) => (
          <Input
            key={field}
            placeholder={field}
            value={(newCard as any)[field]}
            onChange={(e) =>
              setNewCard((prev) => ({ ...prev, [field]: e.target.value }))
            }
          />
        ))}
        <Button onClick={handleAddCard} className="col-span-1 md:col-span-3">
          Add Card
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Card key={card.id}>
            <CardContent className="p-4">
              <img
                src={card.imageUrl}
                alt={card.title}
                className="w-full h-48 object-cover rounded mb-2"
              />
              <div className="font-semibold">{card.title}</div>
              <div className="text-sm text-gray-500">{card.playerName} ({card.year})</div>
              <div className="text-sm">{card.brand} #{card.cardNumber}</div>
              <div className="text-sm mb-1">Grade: {card.grade}</div>
              {card.variation && <div className="text-sm italic mb-1">{card.variation}</div>}
              <div className="text-sm mb-1">Qty: {card.quantity}</div>
              <Badge variant={card.quantity > 0 ? 'default' : 'destructive'}>
                {card.quantity > 0 ? 'Available' : 'Sold Out'}
              </Badge>
              <div className="mt-2 font-bold">${card.price.toFixed(2)}</div>
              <button
                onClick={() => handleDeleteCard(card.id)}
                className="mt-2 text-red-500 text-sm underline hover:text-red-700"
              >
                Delete
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}