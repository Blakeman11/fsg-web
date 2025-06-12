'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    shippingCost,
    totalItemPrice,
    totalWithShipping,
  } = useCart();

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-start border p-3 rounded"
            >
              <div className="text-sm">
                <p className="font-semibold">{item.title}</p>
                {item.grading && (
                  <p className="text-xs text-gray-600">
                    Grading: {item.grading}
                  </p>
                )}
                {item.addHolder && (
                  <p className="text-xs text-gray-600">Includes Holder</p>
                )}
                <button
                  className="text-red-500 text-xs mt-1"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
              <p className="text-sm font-semibold">${item.price.toFixed(2)}</p>
            </div>
          ))}

          <div className="border-t pt-4 text-sm space-y-1">
            <p className="flex justify-between">
              <span>Subtotal:</span>
              <span>${totalItemPrice.toFixed(2)}</span>
            </p>
            <p className="flex justify-between">
              <span>Shipping:</span>
              <span>${shippingCost.toFixed(2)}</span>
            </p>
            <p className="flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span>${totalWithShipping.toFixed(2)}</span>
            </p>

            <Link
              href="/checkout"
              className="block mt-4 bg-blue-600 text-white text-center px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Checkout
            </Link>

            <Link
              href="/market"
              className="block mt-3 text-xs text-blue-500 hover:underline"
            >
              ← Back to Market
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}