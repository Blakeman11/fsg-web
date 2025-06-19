'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { v4 as uuidv4 } from 'uuid';

export default function SubmitPage() {
  const { cart, addToCart } = useCart();
  const [cards, setCards] = useState([
    {
      id: uuidv4(),
      name: '',
      year: '',
      brand: '',
      cardNumber: '',
      category: '',
      level: 'Standard',
      insurance: false,
    },
  ]);

  const handleChange = (index: number, field: string, value: any) => {
    const updated = [...cards];
    updated[index][field] = value;
    setCards(updated);
  };

  const addCard = () => {
    setCards([
      ...cards,
      {
        id: uuidv4(),
        name: '',
        year: '',
        brand: '',
        cardNumber: '',
        category: '',
        level: 'Standard',
        insurance: false,
      },
    ]);
  };

  const submitCards = () => {
    const validCards = cards.filter(
      (card) =>
        card.name.trim() !== '' ||
        card.year.trim() !== '' ||
        card.brand.trim() !== '' ||
        card.cardNumber.trim() !== '' ||
        card.category.trim() !== ''
    );

    if (validCards.length === 0) {
      alert('Please fill out at least one field for each card.');
      return;
    }

    validCards.forEach((card) => {
      const price =
        (card.level === 'Express'
          ? 25
          : card.level === 'Freedom Gem'
          ? 50
          : card.level === 'Bulk'
          ? 10
          : 15) + (card.insurance ? 10 : 0);

      const duplicate = cart.find(
        (item) =>
          item.title === `Grading Submission - ${card.name || card.year + ' ' + card.brand}` &&
          item.grading === card.level &&
          item.addHolder === false &&
          item.quantity === 1 &&
          item.price === price
      );

      if (duplicate) {
        alert(`That card is already in your cart: ${card.name || `${card.year} ${card.brand}`}`);
        return;
      }

      addToCart({
        id: card.id,
        title: `Grading Submission - ${card.name || card.year + ' ' + card.brand}`,
        price,
        grading: card.level,
        addHolder: false,
        quantity: 1,
      });
    });

    setCards([
      {
        id: uuidv4(),
        name: '',
        year: '',
        brand: '',
        cardNumber: '',
        category: '',
        level: 'Standard',
        insurance: false,
      },
    ]);

    alert('Cards added to cart!');
  };

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Submit a Card</h1>
      {cards.map((card, index) => (
        <Card key={card.id}>
          <CardContent className="space-y-4 p-4">
            <div>
              <Label>Name</Label>
              <Input
                value={card.name}
                onChange={(e) => handleChange(index, 'name', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Year</Label>
                <Input
                  value={card.year}
                  onChange={(e) => handleChange(index, 'year', e.target.value)}
                />
              </div>
              <div>
                <Label>Brand</Label>
                <Input
                  value={card.brand}
                  onChange={(e) => handleChange(index, 'brand', e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Card Number</Label>
                <Input
                  value={card.cardNumber}
                  onChange={(e) => handleChange(index, 'cardNumber', e.target.value)}
                />
              </div>
              <div>
                <Label>Category</Label>
                <Input
                  value={card.category}
                  onChange={(e) => handleChange(index, 'category', e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label>Service Level</Label>
              <select
                value={card.level}
                onChange={(e) => handleChange(index, 'level', e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option>Standard</option>
                <option>Express</option>
                <option>Freedom Gem</option>
                <option>Bulk</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={card.insurance}
                onChange={(e) => handleChange(index, 'insurance', e.target.checked)}
              />
              <Label>Include Insurance (+$10)</Label>
            </div>
          </CardContent>
        </Card>
      ))}
      <div className="flex gap-4">
        <Button onClick={addCard} variant="outline">
          + Add Another
        </Button>
        <Button onClick={submitCards}>Add to Cart</Button>
      </div>
    </main>
  );
}