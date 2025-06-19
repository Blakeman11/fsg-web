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
    const { name, value, type, checked } = e.target;
    setCard((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAddToCart = () => {
    const {
      fullName, email, address, city, state, zip
    } = customerInfo;

    const {
      name, year, brand, cardNumber, category, grading, insurance
    } = card;

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

    // Reset card only
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

      <section className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            name="fullName"
            placeholder="Full Name"
            value={customerInfo.fullName}
            onChange={handleCustomerChange}
            className="border px-3 py-2 rounded"
          />
          <input
            name="email"
            placeholder="Email"
            value={customerInfo.email}
            onChange={handleCustomerChange}
            className="border px-3 py-2 rounded"
            type="email"
          />
          <input
            name="address"
            placeholder="Address"
            value={customerInfo.address}
            onChange={handleCustomerChange}
            className="border px-3 py-2 rounded"
          />
          <input
            name="city"
            placeholder="City"
            value={customerInfo.city}
            onChange={handleCustomerChange}
            className="border px-3 py-2 rounded"
          />
          <input
            name="state"
            placeholder="State"
            value={customerInfo.state}
            onChange={handleCustomerChange}
            className="border px-3 py-2 rounded"
          />
          <input
            name="zip"
            placeholder="ZIP Code"
            value={customerInfo.zip}
            onChange={handleCustomerChange}
            className="border px-3 py-2 rounded"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Card #1</h2>
        <input
          name="name"
          placeholder="Card Name"
          value={card.name}
          onChange={handleCardChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="year"
          placeholder="Year"
          value={card.year}
          onChange={handleCardChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="brand"
          placeholder="Brand"
          value={card.brand}
          onChange={handleCardChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="cardNumber"
          placeholder="Card #"
          value={card.cardNumber}
          onChange={handleCardChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="category"
          placeholder="Category"
          value={card.category}
          onChange={handleCardChange}
          className="w-full border px-3 py-2 rounded"
        />
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