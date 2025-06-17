'use client';

import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function CheckoutPage() {
  const { cart } = useCart();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const calculateShipping = () => {
    const count = cart.length;
    if (count === 0) return 0;
    const first = 4.95;
    const extra = Math.min(count - 1, 22) * 0.5;
    return Math.min(first + extra, 15.95);
  };

  const totalWithoutShipping = cart.reduce((sum, item) => sum + (item.price || 0), 0);
  const shipping = calculateShipping();
  const totalWithShipping = totalWithoutShipping + shipping;

  const handleCheckout = async () => {
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart, email }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // important: full redirect
      } else {
        console.error('Stripe response error:', data);
        alert('Failed to create checkout session.');
      }
    } catch (err) {
      console.error('❌ Stripe Checkout Error:', err);
      alert('An error occurred during checkout.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Checkout</h1>

      {cart.map((item, i) => (
        <div key={i} className="border p-3 rounded bg-white flex justify-between items-center">
          <span>{item.title || item.id?.toString().padStart(4, '0')}</span>
          <span>${(item.price || 0).toFixed(2)}</span>
        </div>
      ))}

      <div>
        <label className="block text-sm font-medium text-gray-700 mt-4 mb-1">Email for receipt:</label>
        <input
          type="email"
          className="w-full border px-3 py-2 rounded"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="text-right text-sm mt-2">Shipping: ${shipping.toFixed(2)}</div>
      <div className="text-right font-semibold text-lg">Total: ${totalWithShipping.toFixed(2)}</div>

      <button
        onClick={handleCheckout}
        className="w-full bg-black text-white py-3 rounded hover:bg-gray-900 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Redirecting...' : 'Proceed to Payment'}
      </button>
    </main>
  );
}