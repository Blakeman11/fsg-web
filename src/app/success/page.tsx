'use client';

import { useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function SuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <main className="text-center p-10">
      <h1 className="text-3xl font-bold text-green-600">✅ Payment Successful</h1>
      <p className="mt-4 text-lg">Thank you for your purchase. We'll ship your card soon!</p>

      <Link
        href="/"
        className="mt-6 inline-block text-blue-600 hover:text-blue-800 underline transition-all"
      >
        Back to FSG
      </Link>
    </main>
  );
}