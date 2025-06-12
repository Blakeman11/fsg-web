'use client';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const { cartItems = [], removeFromCart } = useCart();

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-sm text-gray-500">No items yet.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={`cart-item-${item.id}`}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
              </div>
              <button
                className="text-red-600 text-sm"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}