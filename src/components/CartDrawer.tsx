'use client';

import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const { cart = [], removeFromCart } = useCart();

  return (
    <div className="p-6">
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="space-y-2">
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between items-center">
              <span>{item.title}</span>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-xs text-red-500"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}