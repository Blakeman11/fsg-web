'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

interface CardSubmission {
  id: number;
  name: string;
  year: string;
  brand: string;
  cardNumber: string;
  category: string;
  level: string;
  insurance: boolean;
  status: string;
  createdAt: string;
}

interface Customer {
  id: number;
  fullName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  cards: CardSubmission[];
}

export default function AdminSubmissions() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    fetch('/api/admin/submissions')
      .then((res) => res.json())
      .then((data) => setCustomers(data));
  }, []);

  const handleStatusChange = async (submissionId: number, status: string) => {
    await fetch('/api/admin/update-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: submissionId, status }),
    });

    setCustomers((prev) =>
      prev.map((customer) => ({
        ...customer,
        cards: customer.cards.map((card) =>
          card.id === submissionId ? { ...card, status } : card
        ),
      }))
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Submissions</h1>
      <div className="space-y-6">
        {customers.map((customer) => (
          <div key={customer.id} className="border p-4 rounded bg-white">
            <div className="font-semibold mb-1">{customer.fullName}</div>
            <div className="text-sm text-gray-500 mb-2">
              {customer.email} — {customer.address}, {customer.city}, {customer.state} {customer.zip}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {customer.cards.map((card) => (
                <Card key={card.id}>
                  <CardContent className="p-3 space-y-1">
                    <div className="font-medium">{card.name}</div>
                    <div className="text-sm text-gray-600">{card.brand} #{card.cardNumber} ({card.year})</div>
                    <div className="text-sm">Category: {card.category}</div>
                    <div className="text-sm">Level: {card.level}</div>
                    {card.insurance && <div className="text-xs text-green-600">✔ Insurance Added</div>}
                    <div className="flex items-center gap-2">
                      <Badge>{card.status}</Badge>
                      <Select
                        value={card.status}
                        onValueChange={(val) => handleStatusChange(card.id, val)}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="received">Received</SelectItem>
                          <SelectItem value="grading">Grading</SelectItem>
                          <SelectItem value="shipped">Shipped</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}