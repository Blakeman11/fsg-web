'use client';

import { useState } from 'react';

export default function CompsPage() {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (!query) return;
    const ebayUrl = `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(
      query
    )}&_sop=13&LH_Sold=1&LH_Complete=1`;
    window.open(ebayUrl, '_blank');
  };

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Search eBay Sold Comps</h1>

      <input
        type="text"
        placeholder="Search by player, brand, set..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border px-4 py-2 rounded mb-4"
      />

      <button
        onClick={handleSearch}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Search Sold on eBay
      </button>
    </main>
  );
}