'use client';

import Link from 'next/link';
import { ShoppingCartIcon } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartButton() {
  const { cart = [] } = useCart();

  return (
    <Link href="/cart" className="relative">
      <ShoppingCartIcon className="w-6 h-6" />
      {cart.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1 rounded-full">
          {cart.length}
        </span>
      )}
    </Link>
  );
}