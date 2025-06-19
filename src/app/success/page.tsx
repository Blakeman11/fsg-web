'use client';

import { useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function SuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart(); // clear everything on load
  }, [clearCart]);

  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">✅ Payment Successful</h1>
      <p className="mb-6">Thanks for your purchase! Your cards will be prepared and shipped soon.</p>
      <Link
        href="/market"
        className="inline-block bg-black text-white px-6 py-3 rounded hover:bg-gray-900"
      >
        Return to Market
      </Link>
    </div>
  );
}