'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';

export default function MarketCard({ card }) {
  const { cart, addToCart } = useCart();
const alreadyInCart = cart.some((item) => item.id === card.id);

  return (
    <div className="border rounded shadow-sm p-4 bg-white">
      <Image src={card.imageUrl} alt={card.title} width={300} height={400} className="mb-4" />
      <h3 className="text-lg font-semibold">{card.title}</h3>
      <p className="text-sm text-gray-600">${card.price.toFixed(2)}</p>

      <button
        onClick={() => addToCart(card)}
        disabled={alreadyInCart}
        className={`mt-3 px-4 py-2 rounded font-medium ${
          alreadyInCart
            ? 'bg-gray-400 text-white cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {alreadyInCart ? '✅ In Cart' : 'Add to Cart'}
      </button>
    </div>
  );
}