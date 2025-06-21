// lib/market.ts

// Fetch all cards from the marketplace
export async function getMarketCards() {
  const res = await fetch('/api/market');
  if (!res.ok) throw new Error('Failed to fetch market cards');
  return res.json();
}

// Add a new market card
export async function addMarketCard(card: any) {
  const res = await fetch('/api/market', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(card),
  });

  if (!res.ok) throw new Error('Failed to add market card');
  return res.json();
}

// Delete a market card by ID (server-side API handles DB logic)
export async function deleteMarketCard(id: number) {
  const res = await fetch(`/api/admin/delete-market/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) throw new Error('Failed to delete market card');
  return res.json();
}