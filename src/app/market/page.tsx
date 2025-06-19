'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function MarketPage() {
  const [cards, setCards] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('');

  useEffect(() => {
    async function fetchCards() {
      const res = await fetch('/api/market');
      const data = await res.json();
      setCards(data);
    }
    fetchCards();
  }, []);

  const filteredCards = cards
    .filter((card) =>
      `${card.title} ${card.variation}`.toLowerCase().includes(search.toLowerCase())
    )
    .filter((card) => category === 'All' || card.category === category)
    .sort((a, b) => {
      if (sort === 'low') return a.price - b.price;
      if (sort === 'high') return b.price - a.price;
      return 0;
    });

  const categories = ['All', ...Array.from(new Set(cards.map((c) => c.category)))];

  return (
    <main className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Marketplace</h1>

      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or variation..."
          className="border px-3 py-2 rounded w-full sm:w-64"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">Sort by</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCards.map((card) => (
          <Link
            key={card.id}
            href={`/market/${card.id}`}
            className="border rounded p-2 flex gap-4 hover:shadow"
          >
            {card.imageUrl && (
              <Image
                src={card.imageUrl}
                alt={card.title}
                width={80}
                height={120}
                className="rounded border object-contain"
              />
            )}
            <div className="text-sm">
              <p className="font-semibold leading-tight">{card.title}</p>
              <p className="text-gray-600 leading-tight text-xs">
                {card.variation || 'N/A'}
              </p>
              <p className="text-blue-600 font-bold mt-1">${card.price}</p>
              <p className="text-xs text-gray-500">Qty Available: {card.quantity}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}