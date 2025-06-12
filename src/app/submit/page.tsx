'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function SubmitPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  const [cards, setCards] = useState([
    {
      title: '',
      year: '',
      brand: '',
      cardNumber: '',
      category: '',
      service: 'Standard - $15 (30 days)',
      insurance: false,
    },
  ]);

  const router = useRouter();
  const { addToCart } = useCart();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCardChange = (index: number, field: string, value: any) => {
    const updatedCards = [...cards];
    updatedCards[index][field] = value;
    setCards(updatedCards);
  };

  const addAnotherCard = () => {
    setCards([
      ...cards,
      {
        title: '',
        year: '',
        brand: '',
        cardNumber: '',
        category: '',
        service: 'Standard - $15 (30 days)',
        insurance: false,
      },
    ]);
  };

  const handleSubmit = () => {
    cards.forEach((card) => {
      const price =
        card.service.includes('Standard') ? 15 :
        card.service.includes('Express') ? 25 :
        card.service.includes('Freedom Gem') ? 50 :
        card.service.includes('Bulk') ? 10 : 15;

      const finalPrice = card.insurance ? price + 10 : price;

      addToCart({
        id: Math.random().toString(36).substring(2), // unique key
        title: `SUBMISSION: ${card.year} ${card.brand} ${card.title}`,
        price: finalPrice,
      });
    });

    router.push('/checkout');
  };

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Submit Your Cards</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input name="name" placeholder="Full Name" className="border p-2 rounded" onChange={handleInputChange} />
        <input name="email" placeholder="Email" className="border p-2 rounded" onChange={handleInputChange} />
        <input name="address" placeholder="Address" className="border p-2 rounded" onChange={handleInputChange} />
        <input name="city" placeholder="City" className="border p-2 rounded" onChange={handleInputChange} />
        <input name="state" placeholder="State" className="border p-2 rounded" onChange={handleInputChange} />
        <input name="zip" placeholder="ZIP Code" className="border p-2 rounded" onChange={handleInputChange} />
      </div>

      {cards.map((card, index) => (
        <div key={index} className="border p-4 rounded space-y-2">
          <h2 className="font-semibold mb-2">Card #{index + 1}</h2>
          <input placeholder="Card Name" className="border p-2 rounded w-full" onChange={(e) => handleCardChange(index, 'title', e.target.value)} />
          <input placeholder="Year" className="border p-2 rounded w-full" onChange={(e) => handleCardChange(index, 'year', e.target.value)} />
          <input placeholder="Brand" className="border p-2 rounded w-full" onChange={(e) => handleCardChange(index, 'brand', e.target.value)} />
          <input placeholder="Card #" className="border p-2 rounded w-full" onChange={(e) => handleCardChange(index, 'cardNumber', e.target.value)} />
          <input placeholder="Category" className="border p-2 rounded w-full" onChange={(e) => handleCardChange(index, 'category', e.target.value)} />
          <select className="border p-2 rounded w-full" value={card.service} onChange={(e) => handleCardChange(index, 'service', e.target.value)}>
            <option>Standard - $15 (30 days)</option>
            <option>Express - $25 (15 days)</option>
            <option>Freedom Gem - $50 (2 days)</option>
            <option>Bulk Grading - $10 (45 days)</option>
          </select>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={card.insurance}
              onChange={(e) => handleCardChange(index, 'insurance', e.target.checked)}
            />
            <span>Add $10 insurance</span>
          </label>
        </div>
      ))}

      <button onClick={addAnotherCard} className="bg-blue-600 text-white px-4 py-2 rounded">
        + Add Another Card
      </button>

      <button
        onClick={handleSubmit}
        className="w-full py-3 rounded bg-black text-white hover:bg-gray-800"
      >
        Add to Cart
      </button>
    </main>
  );
}