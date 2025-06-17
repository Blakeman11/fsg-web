// /src/app/joshandsk/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
  available: boolean;
}

export default function AdminMarket() {
  const [cards, setCards] = useState<MarketCard[]>([]);

  useEffect(() => {
    fetch('/api/market') // Make sure this API route returns all cards
      .then((res) => res.json())
      .then((data) => setCards(data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Market Dashboard</h1>
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
              <Badge variant={card.available ? 'default' : 'destructive'}>
                {card.available ? 'Available' : 'Sold Out'}
              </Badge>
              <div className="mt-2 font-bold">${card.price.toFixed(2)}</div>
              {/* Optional: add an edit or delete button here */}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}