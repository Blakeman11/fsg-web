// market/[id]/page.tsx
'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function MarketCardPage() {
  const { id } = useParams();
  const router = useRouter();
  const { cart = [], addToCart } = useCart();

  const [card, setCard] = useState<any>(null);
  const [gradingOption, setGradingOption] = useState('');
  const [addHolder, setAddHolder] = useState(false);

  useEffect(() => {
    async function fetchCard() {
      if (!id) return;
      const res = await fetch(`/api/market/${id}`);
      if (!res.ok) return router.push('/not-found');
      const data = await res.json();
      setCard(data);
    }
    fetchCard();
  }, [id, router]);

  if (!card) return <div className="p-6">Loading...</div>;

  const gradingPrices = {
    Regular: 10,
    Express: 20,
    FreedomGem: 40,
    Bulk: 8,
  };

  const grading = gradingOption || null;
  const holder = grading ? false : addHolder;
  const totalPrice =
    card.price +
    (grading ? gradingPrices[grading as keyof typeof gradingPrices] : 0) +
    (holder ? 1 : 0);

  const isInCart = cart.some((item) => item.id === card.id); // ✅ Prevent duplicates

  const handleAddToCart = () => {
    if (isInCart) return;
    addToCart({
      id: card.id,
      title: card.title,
      price: totalPrice,
      grading,
      addHolder: holder,
    });
  };

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">{card.title}</h1>

      <div className="flex flex-col sm:flex-row gap-8 items-start">
        {card.imageUrl && (
          <Image
            src={card.imageUrl}
            alt={card.title}
            width={300}
            height={420}
            className="rounded border"
          />
        )}

        <div className="text-sm space-y-2">
          <p><strong>ID:</strong> {card.id}</p>
          <p><strong>Player:</strong> {card.playerName}</p>
          <p><strong>Year:</strong> {card.year}</p>
          <p><strong>Brand:</strong> {card.brand}</p>
          <p><strong>Variation:</strong> {card.variation || 'N/A'}</p>
          <p><strong>Card #:</strong> {card.cardNumber}</p>
          <p><strong>Category:</strong> {card.category}</p>
          <p><strong>Grade:</strong> {card.grade}</p>

          <div className="mt-4">
            <label className="block font-semibold mb-1">Optional Grading:</label>
            <select
              value={gradingOption}
              onChange={(e) => setGradingOption(e.target.value)}
              className="border px-3 py-2 rounded w-full"
            >
              <option value="">None</option>
              <option value="Regular">Regular - $10</option>
              <option value="Express">Express - $20</option>
              <option value="FreedomGem">Freedom Gem - $40</option>
              <option value="Bulk">Bulk (10+ cards) - $8</option>
            </select>
          </div>

          {!grading && (
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={addHolder}
                  onChange={(e) => setAddHolder(e.target.checked)}
                  className="mr-2"
                />
                Add $1 magnetic holder
              </label>
            </div>
          )}

          <p className="text-lg font-semibold text-blue-600 mt-4">
            Total: ${totalPrice.toFixed(2)}
          </p>

          <button
            onClick={handleAddToCart}
            disabled={isInCart}
            className={`mt-2 px-4 py-2 rounded transition text-white ${
              isInCart ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isInCart ? 'Already in Cart' : 'Add to Cart'}
          </button>

          <Link
            href="/market"
            className="block mt-4 text-sm text-blue-500 hover:underline"
          >
            ← Back to Market
          </Link>
        </div>
      </div>
    </main>
  );
}