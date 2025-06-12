// src/components/CartButton.tsx
'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartButton() {
  const { cartItems = [] } = useCart();

  return (
    <Link
      href="/checkout"
      className="fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
    >
      🛒 Cart ({cartItems.length})
    </Link>
  );
}