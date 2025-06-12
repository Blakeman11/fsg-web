// src/lib/api.ts

// Fetch all submissions with customer and cards
export async function getSubmissions() {
  const res = await fetch('/api/submissions');
  if (!res.ok) throw new Error('Failed to fetch submissions');
  return res.json();
}

// Update submission status by card ID
export async function updateSubmissionStatus(id: number, newStatus: string) {
  const res = await fetch(`/api/submissions/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: newStatus }),
  });

  if (!res.ok) throw new Error('Failed to update status');
  return res.json();
}

// Fetch all market cards
export async function getMarketCards() {
  const res = await fetch('/api/market');
  if (!res.ok) throw new Error('Failed to fetch market cards');
  return res.json();
}

// Delete a market card by ID
export async function deleteMarketCard(id: number) {
  const res = await fetch(`/api/market/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete market card');
  return res.json();
}