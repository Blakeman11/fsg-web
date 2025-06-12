'use client';

import { useEffect, useState } from 'react';
import {
  getSubmissions,
  updateSubmissionStatus,
  getMarketCards,
  deleteMarketCard,
  createMarketCard,
} from '@/lib/api';

const statuses = ['Received', 'Processing', 'Graded', 'Shipped'];
const serviceLevels = ['All', 'Standard', 'Express', 'Freedom Gem', 'Bulk'];

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [marketCards, setMarketCards] = useState<any[]>([]);
  const [filter, setFilter] = useState('All');
  const [formData, setFormData] = useState({
    title: '',
    playerName: '',
    year: '',
    brand: '',
    cardNumber: '',
    category: '',
    condition: '',
    grade: '',
    price: '',
    imageUrl: '',
    variation: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
  const fetchData = async () => {
    const subs = await fetch('/api/submissions').then(res => res.json());
    const cards = await fetch('/api/market').then(res => res.json());
    setSubmissions(subs);
    setMarketCards(cards);
  };

  fetchData();
}, []);

  const handleStatusChange = async (cardId: number, newStatus: string) => {
    await updateSubmissionStatus(cardId, newStatus);
    setSubmissions((prev) =>
      prev.map((cust) => ({
        ...cust,
        cards: cust.cards.map((card: any) =>
          card.id === cardId ? { ...card, status: newStatus } : card
        ),
      }))
    );
  };

  const handleDeleteMarketCard = async (cardId: number) => {
    await deleteMarketCard(cardId);
    setMarketCards((prev) => prev.filter((card) => card.id !== cardId));
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const year = parseInt(formData.year);
      const price = parseFloat(formData.price);
      if (isNaN(year) || isNaN(price)) {
        alert('Year and Price must be valid numbers');
        setSubmitting(false);
        return;
      }

      await createMarketCard({
        ...formData,
        year,
        price,
      });
      setSuccess(true);
      setFormData({
        title: '',
        playerName: '',
        year: '',
        brand: '',
        cardNumber: '',
        category: '',
        condition: '',
        grade: '',
        price: '',
        imageUrl: '',
        variation: '',
      });

      const cards = await getMarketCards();
      setMarketCards(cards);
    } catch (err) {
      console.error('Failed to create market card:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4 space-y-10">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* Submissions */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Card Submissions</h2>
        <div className="mb-4">
          <label className="mr-2">Filter by service:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border p-1"
          >
            {serviceLevels.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {submissions.map((customer) => (
          <div key={customer.id} className="mb-4 border rounded p-3">
            <p className="font-semibold">{customer.name}</p>
            {customer.cards
              .filter((card: any) => filter === 'All' || card.service === filter)
              .map((card: any) => (
                <div
                  key={card.id}
                  className="border-t py-2 flex justify-between items-center"
                >
                  <div>
                    <p>
                      {card.year} {card.brand} #{card.cardNumber} –{' '}
                      {card.playerName}
                    </p>
                    <p className="text-sm text-gray-600">{card.service}</p>
                  </div>
                  <select
                    value={card.status}
                    onChange={(e) => handleStatusChange(card.id, e.target.value)}
                    className="border p-1"
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
          </div>
        ))}
      </div>

      {/* Market Cards */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Marketplace Cards</h2>
        {marketCards.map((card) => (
          <div
            key={card.id}
            className="mb-2 p-3 border rounded flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">
                {card.year} {card.brand} #{card.cardNumber}
              </p>
              <p className="text-sm text-gray-600">{card.playerName}</p>
            </div>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={() => handleDeleteMarketCard(card.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Add Card to Market */}
      <div className="mt-10 border p-6 rounded-xl bg-white shadow">
        <h2 className="text-xl font-bold mb-4">Add Card to Market</h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          {[
            { label: 'Title', name: 'title' },
            { label: 'Player Name', name: 'playerName' },
            { label: 'Year', name: 'year', type: 'number' },
            { label: 'Brand', name: 'brand' },
            { label: 'Card Number', name: 'cardNumber' },
            { label: 'Category', name: 'category' },
            { label: 'Condition', name: 'condition' },
            { label: 'Grade', name: 'grade' },
            { label: 'Price', name: 'price', type: 'number' },
            { label: 'Image URL', name: 'imageUrl' },
            { label: 'Variation (optional)', name: 'variation' },
          ].map(({ label, name, type = 'text' }) => (
            <div key={name}>
              <label htmlFor={name} className="block font-semibold mb-1">
                {label}
              </label>
              <input
                type={type}
                id={name}
                name={name}
                value={formData[name as keyof typeof formData]}
                onChange={handleFormChange}
                className="w-full border px-3 py-2 rounded"
                required={name !== 'variation'}
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={submitting}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            {submitting ? 'Submitting...' : 'Add to Market'}
          </button>

          {success && (
            <p className="mt-4 text-green-600 font-semibold">Card added successfully!</p>
          )}
        </form>
      </div>
    </div>
  );
}