'use client';

import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

type Submission = {
  id: number;
  name: string;
  email: string;
  serviceLevel: string;
  cardList: string;
  status: string;
  createdAt: string;
};

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSubmissions() {
      try {
        const res = await fetch('/api/admin/submissions');
        const data = await res.json();
        setSubmissions(data);
      } catch (err) {
        console.error('Failed to fetch submissions:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchSubmissions();
  }, []);

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Grading Submissions</h1>

      {loading ? (
        <p>Loading submissions...</p>
      ) : submissions.length === 0 ? (
        <p>No submissions found.</p>
      ) : (
        <div className="space-y-6">
          {submissions.map((sub) => (
            <div
              key={sub.id}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold">{sub.name}</p>
                  <p className="text-sm text-gray-600">{sub.email}</p>
                </div>
                <span className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(sub.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>

              <div className="text-sm space-y-1">
                <p>
                  <strong>Service:</strong> {sub.serviceLevel}
                </p>
                <p>
                  <strong>Status:</strong> {sub.status}
                </p>
                <p>
                  <strong>Cards:</strong> {sub.cardList}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}