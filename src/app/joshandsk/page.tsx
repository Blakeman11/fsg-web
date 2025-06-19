'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';

type MarketCard = {
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
};

export default function AdminMarketDashboard() {
  const [cards, setCards] = useState<MarketCard[]>([]);
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
    quantity: '1',
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      const res = await fetch('/api/market');
      const data = await res.json();
      setCards(data);
    };
    fetchCards();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm({
      title: '', playerName: '', year: '', brand: '', cardNumber: '',
      category: '', grade: '', price: '', imageUrl: '', variation: '', quantity: '1'
    });
    setEditingId(null);
  };

  const handleAddOrUpdateCard = async () => {
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/market/${editingId}` : '/api/market';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const updated = await res.json();

    if (editingId) {
      setCards(cards.map((c) => (c.id === editingId ? updated : c)));
    } else {
      setCards((prev) => [...prev, updated]);
    }
    resetForm();
  };

  const handleEdit = (card: MarketCard) => {
    setEditingId(card.id);
    setForm({ ...card, quantity: card.quantity.toString() });
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this card?')) return;
    await fetch(`/api/market/${id}`, { method: 'DELETE' });
    setCards(cards.filter((c) => c.id !== id));
  };

  const availableCards = cards.filter((c) => c.available);
  const soldCards = cards.filter((c) => !c.available);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-xl font-bold mb-4">Admin Market Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-4">
        {Object.entries(form).map(([key, value]) => (
          <Input
            key={key}
            name={key}
            placeholder={key}
            value={value}
            onChange={handleChange}
            className="text-sm"
          />
        ))}
      </div>

      <Button onClick={handleAddOrUpdateCard} className="mb-8 w-full">
        {editingId ? 'Update Card' : 'Add Card'}
      </Button>

      <h2 className="font-semibold text-lg mb-2">Available</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {availableCards.map((card) => (
          <div key={card.id} className="border p-2 rounded text-sm space-y-1 bg-white shadow-sm relative">
            <img src={card.imageUrl} alt={card.title} className="w-full h-40 object-cover rounded" />
            <p className="font-semibold">{card.title}</p>
            <p className="text-xs text-gray-500">{card.playerName} ({card.year})</p>
            <p className="text-xs italic">{card.variation}</p>
            <p className="text-xs">Qty: {card.quantity}</p>
            <p className="text-xs font-medium text-green-600">${card.price}</p>
            <div className="absolute top-2 right-2 flex gap-2">
              <button onClick={() => handleEdit(card)}><Pencil size={16} /></button>
              <button onClick={() => handleDelete(card.id)}><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>

      <h2 className="font-semibold text-lg mb-2">Purchased</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {soldCards.map((card) => (
          <div key={card.id} className="border p-2 rounded text-sm space-y-1 bg-gray-100 opacity-70">
            <img src={card.imageUrl} alt={card.title} className="w-full h-40 object-cover rounded grayscale" />
            <p className="font-semibold">{card.title}</p>
            <p className="text-xs text-gray-500">{card.playerName} ({card.year})</p>
            <p className="text-xs italic">{card.variation}</p>
            <p className="text-xs line-through">Sold Out</p>
          </div>
        ))}
      </div>
    </main>
  );
}