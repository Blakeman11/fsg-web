'use client';

import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();

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
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart, shipping }),
      });

      const data = await res.json();
      if (data.url) {
        router.push(data.url);
      } else {
        console.error('Stripe response error:', data);
      }
    } catch (err) {
      console.error('❌ Stripe Checkout Error:', err);
    }
  };

  return (
    <main className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Checkout</h1>

      {cart.map((item, i) => (
        <div key={i} className="border p-3 rounded bg-white flex justify-between items-center">
          <span>
            {item.title || item.id?.toString().padStart(4, '0')}
          </span>
          <span>${(item.price || 0).toFixed(2)}</span>
        </div>
      ))}

      <div className="text-right text-sm">Shipping: ${shipping.toFixed(2)}</div>
      <div className="text-right font-semibold text-lg">
        Total: ${totalWithShipping.toFixed(2)}
      </div>

      <button
        onClick={handleCheckout}
        className="w-full bg-black text-white py-3 rounded hover:bg-gray-900"
      >
        Proceed to Payment
      </button>
    </main>
  );
}