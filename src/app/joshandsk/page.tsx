'use client';

import { useState } from 'react';
import AdminMarket from './market';
import AdminSubmissions from './submission';

export default function AdminDashboardPage() {
  const [tab, setTab] = useState<'market' | 'submissions'>('market');

  return (
    <div className="p-6">
      <div className="mb-4 border-b">
        <nav className="flex space-x-4">
          <button
            onClick={() => setTab('market')}
            className={`pb-2 ${tab === 'market' ? 'border-b-2 border-black font-bold' : 'text-gray-500'}`}
          >
            Market
          </button>
          <button
            onClick={() => setTab('submissions')}
            className={`pb-2 ${tab === 'submissions' ? 'border-b-2 border-black font-bold' : 'text-gray-500'}`}
          >
            Submissions
          </button>
        </nav>
      </div>

      {tab === 'market' && <AdminMarket />}
      {tab === 'submissions' && <AdminSubmissions />}
    </div>
  );
}