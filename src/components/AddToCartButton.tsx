'use client';

import { useCart } from '@/context/CartContext';

type Props = {
  id: string;
  title: string;
  price: number;
  imageUrl?: string;
};

export default function AddToCartButton({ id, title, price, imageUrl }: Props) {
  const { cart, addToCart } = useCart();

  const isInCart = cart.some((item) => item.id === id);

  return (
    <button
      onClick={() => addToCart({ id, title, price, imageUrl })}
      disabled={isInCart}
      className={`mt-4 py-2 px-4 rounded text-white transition ${
        isInCart ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800'
      }`}
    >
      {isInCart ? 'In Cart' : 'Add to Cart'}
    </button>
  );
}