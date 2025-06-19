'use client';

import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';

export default function SubmitPage() {
  const { addToCart, clearCart, setEmail } = useCart();

  const [customerInfo, setCustomerInfo] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  const [card, setCard] = useState({
    name: '',
    year: '',
    brand: '',
    cardNumber: '',
    category: '',
    grading: 'Standard - $15 (30 days)',
    insurance: false,
  });

  const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
    if (name === 'email') setEmail(value);
  };

  const handleCardChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setCard((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAddToCart = () => {
    const { fullName, email, address, city, state, zip } = customerInfo;
    const { name, year, brand, cardNumber, category, grading, insurance } = card;

    if (!fullName || !email || !address || !city || !state || !zip) {
      alert('Please complete all customer fields.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      alert('Please enter a valid email.');
      return;
    }

    if (!name || !year || !brand || !cardNumber || !category) {
      alert('Please complete all card fields.');
      return;
    }

    const price =
      grading.includes('Freedom Gem') ? 50 :
      grading.includes('Express') ? 25 :
      grading.includes('Bulk') ? 10 :
      15;

    const id = uuid();

    addToCart({
  id,
  title: `${name} ${brand} #${cardNumber}`,
  price,
  grading,
  addHolder: insurance,
  quantity: 1, // <-- 👈 this is the fix
  cardDetails: {
    name,
    year,
    brand,
    cardNumber,
    category,
    level: grading,
    insurance,
  },
  customerDetails: {
    fullName,
    email,
    address,
    city,
    state,
    zip,
  },
});

    alert('Card added to cart!');

    setCard({
      name: '',
      year: '',
      brand: '',
      cardNumber: '',
      category: '',
      grading: 'Standard - $15 (30 days)',
      insurance: false,
    });
  };

  return (
    <main className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Submit Your Cards</h1>

      {/* Customer Info */}
      <section className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {['fullName', 'email', 'address', 'city', 'state', 'zip'].map((field) => (
            <input
              key={field}
              name={field}
              placeholder={field === 'fullName' ? 'Full Name' : field.charAt(0).toUpperCase() + field.slice(1)}
              value={(customerInfo as any)[field]}
              onChange={handleCustomerChange}
              className="border px-3 py-2 rounded"
              type={field === 'email' ? 'email' : 'text'}
            />
          ))}
        </div>
      </section>

      {/* Card Info */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Card #1</h2>
        {['name', 'year', 'brand', 'cardNumber', 'category'].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field === 'cardNumber' ? 'Card #' : field.charAt(0).toUpperCase() + field.slice(1)}
            value={(card as any)[field]}
            onChange={handleCardChange}
            className="w-full border px-3 py-2 rounded"
          />
        ))}
        <select
          name="grading"
          value={card.grading}
          onChange={handleCardChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option>Standard - $15 (30 days)</option>
          <option>Express - $25 (15 days)</option>
          <option>Freedom Gem - $50 (2 days)</option>
          <option>Bulk - $10 (45 days)</option>
        </select>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="insurance"
            checked={card.insurance}
            onChange={handleCardChange}
          />
          Add $10 insurance
        </label>
      </section>

      {/* Buttons */}
      <div className="space-y-3">
        <button
          onClick={handleAddToCart}
          className="w-full bg-black text-white py-3 rounded hover:bg-gray-900"
        >
          Add to Cart
        </button>

        <button
          onClick={clearCart}
          className="w-full text-sm text-gray-500 underline"
        >
          Clear Cart
        </button>
      </div>
    </main>
  );
}