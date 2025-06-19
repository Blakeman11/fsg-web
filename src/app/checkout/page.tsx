'use client';

import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const {
    cart,
    shippingCost,
    totalItemPrice,
    totalWithShipping,
    setEmail,
  } = useCart();

  const [form, setForm] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    email: '',
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === 'email') setEmail(value);
  };

  const handleCheckout = async () => {
    const { email, fullName, address, city, state, zip } = form;

    if (!email || !fullName || !address || !city || !state || !zip) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);

    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cartItems: cart,
        email,
        shippingInfo: { fullName, address, city, state, zip },
      }),
    });

    const data = await res.json();
    setLoading(false);
    if (data.url) router.push(data.url);
    else alert('Checkout failed');
  };

  return (
    <main className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Checkout</h1>

      {cart.map((item, idx) => (
        <div
          key={idx}
          className="flex justify-between items-start border p-3 rounded"
        >
          <div className="text-sm">
            <p className="font-semibold">{item.title}</p>
            <p className="text-xs text-gray-500">Quantity: {item.quantity}</p>
          </div>
          <p className="text-sm font-semibold">${item.price.toFixed(2)}</p>
        </div>
      ))}

      <div className="border-t pt-4 text-sm space-y-1">
        <p className="flex justify-between">
          <span>Shipping:</span>
          <span>${shippingCost.toFixed(2)}</span>
        </p>
        <p className="flex justify-between font-semibold text-lg">
          <span>Total:</span>
          <span>${totalWithShipping.toFixed(2)}</span>
        </p>
      </div>

      <div className="space-y-4">
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="state"
          placeholder="State"
          value={form.state}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="zip"
          placeholder="ZIP Code"
          value={form.zip}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full bg-black text-white py-3 rounded hover:bg-gray-900"
      >
        {loading ? 'Processing...' : 'Proceed to Payment'}
      </button>
    </main>
  );
}
