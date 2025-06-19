'use client';

import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CheckoutPage() {
  const { cart, removeFromCart, email, setEmail } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const subtotal = cart.reduce(
    (sum, item) => sum + (item.price ?? 0) * (item.quantity ?? 1),
    0
  );

  const shipping = cart.length > 0
    ? Math.min(4.95 + Math.max(cart.length - 1, 0) * 0.5, 15.95)
    : 0;

  const total = subtotal + shipping;

  const handleCheckout = async () => {
    if (!email || cart.length === 0) {
      alert('Please enter your email and add items to the cart.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems: cart, email }),
      });

      const data = await res.json();

      if (data?.url) {
        router.push(data.url);
      } else {
        alert('Checkout failed.');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Checkout</h1>

      {cart.length === 0 && <p>Your cart is empty.</p>}

      {cart.map((item, index) => (
        <div
          key={index}
          className="flex justify-between items-center border rounded px-4 py-2 bg-white shadow"
        >
          <div className="flex flex-col">
            <span>{item.title}</span>
            <span className="text-sm text-gray-500">Quantity: {item.quantity ?? 1}</span>
          </div>
          <div className="flex items-center gap-4">
            <span>${(item.price ?? 0).toFixed(2)}</span>
            <button
              onClick={() => removeFromCart(index)}
              className="text-sm text-red-500 hover:underline"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {cart.length > 0 && (
        <>
          <div className="text-right text-sm">Shipping: ${shipping.toFixed(2)}</div>
          <div className="text-right font-bold text-lg">Total: ${total.toFixed(2)}</div>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-4 py-2 rounded mt-4"
            placeholder="Enter your email"
          />

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded hover:bg-gray-900 mt-4"
          >
            {loading ? 'Processing…' : 'Proceed to Payment'}
          </button>
        </>
      )}
    </div>
  );
}