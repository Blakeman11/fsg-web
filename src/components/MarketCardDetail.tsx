'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';

interface MarketCard {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  variation?: string;
  quantity: number;
  grading?: string;
  addHolder?: boolean;
}

export default function MarketCardDetail({ card }: { card: MarketCard }) {
  const { cart, addToCart } = useCart();
  const [grading, setGrading] = useState('');
  const [addHolder, setAddHolder] = useState(false);
  const [addedCount, setAddedCount] = useState(0);
  const [purchaseQty, setPurchaseQty] = useState(1);

  useEffect(() => {
    const matching = cart.filter((item) => item.id === String(card.id));
    setAddedCount(matching.length);
  }, [cart, card.id]);

  const availableQty = card.quantity - addedCount;
  const totalPrice =
    card.price * purchaseQty +
    (grading === 'Regular' ? 10 : grading === 'Express' ? 20 : grading === 'Freedom Gem' ? 40 : grading === 'Bulk' ? 8 : 0) +
    (grading ? 0 : addHolder ? 1 : 0);

  const handleAddToCart = () => {
    if (availableQty <= 0 || purchaseQty <= 0) return;

    for (let i = 0; i < purchaseQty; i++) {
      addToCart({
        id: String(card.id),
        title: card.title,
        price:
          card.price +
          (grading === 'Regular' ? 10 : grading === 'Express' ? 20 : grading === 'Freedom Gem' ? 40 : grading === 'Bulk' ? 8 : 0) +
          (grading ? 0 : addHolder ? 1 : 0),
        imageUrl: card.imageUrl,
        grading,
        addHolder,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <Image
          src={card.imageUrl}
          alt={card.title}
          width={400}
          height={600}
          className="rounded-lg border"
        />
      </div>

      <div className="space-y-4">
        <h1 className="text-2xl font-bold">{card.title}</h1>
        <p className="text-gray-600">{card.variation}</p>
        <p className="text-blue-600 font-bold text-xl">${totalPrice.toFixed(2)}</p>
        <p className="text-sm text-gray-500">
          Qty Available: {availableQty} {addedCount > 0 && `(In Cart: ${addedCount})`}
        </p>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Grading Option:</label>
          <select
            value={grading}
            onChange={(e) => setGrading(e.target.value)}
            className="border px-3 py-2 rounded w-full"
          >
            <option value="">None</option>
            <option value="Regular">Regular ($10)</option>
            <option value="Express">Express ($20)</option>
            <option value="Freedom Gem">Freedom Gem ($40)</option>
            <option value="Bulk">Bulk ($8)</option>
          </select>
        </div>

        {!grading && (
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="holder"
              checked={addHolder}
              onChange={(e) => setAddHolder(e.target.checked)}
            />
            <label htmlFor="holder" className="text-sm">
              Add magnetic holder (+$1)
            </label>
          </div>
        )}

        {availableQty > 1 && (
          <div className="space-y-1">
            <label className="block text-sm font-medium">Quantity:</label>
            <select
              value={purchaseQty}
              onChange={(e) => setPurchaseQty(parseInt(e.target.value))}
              className="border px-3 py-2 rounded w-full"
            >
              {Array.from({ length: availableQty }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          onClick={handleAddToCart}
          disabled={availableQty <= 0}
          className={`px-4 py-2 rounded text-white ${
            availableQty <= 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {availableQty <= 0 ? 'Sold Out' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}