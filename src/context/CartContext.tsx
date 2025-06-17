'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

export type CartItem = {
  id: string;
  title: string;
  price: number;
  grading?: string;
  addHolder?: boolean;
  imageUrl?: string;
};

export type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  shippingCost: number;
  totalItemPrice: number;
  totalWithShipping: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartReady, setCartReady] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('fsg-cart');
    if (stored) setCart(JSON.parse(stored));
    setCartReady(true);
  }, []);

  // Sync to localStorage on cart updates
  useEffect(() => {
    if (cartReady) {
      localStorage.setItem('fsg-cart', JSON.stringify(cart));
    }
  }, [cart, cartReady]);

  const addToCart = (item: CartItem) => {
    // ✅ Validation: block incomplete entries
    if (
      !item.id ||
      !item.title ||
      typeof item.price !== 'number' ||
      isNaN(item.price)
    ) {
      console.warn('🛑 Rejected invalid cart item:', item);
      alert('Please complete all required fields before adding to cart.');
      return;
    }

    // ✅ Prevent exact duplicates
    const isDuplicate = cart.some((existing) => JSON.stringify(existing) === JSON.stringify(item));
    if (isDuplicate) {
      alert('This item is already in your cart.');
      return;
    }

    setCart((prev) => [...prev, item]);
  };

  const removeFromCart = (id: string) => {
    if (!id) {
      console.warn('⚠️ Tried to remove item without valid ID');
      return;
    }

    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('fsg-cart');
  };

  const shippingCost = Math.min(4.95 + Math.max(cart.length - 1, 0) * 0.5, 15.95);
  const totalItemPrice = cart.reduce((sum, item) => sum + item.price, 0);
  const totalWithShipping = totalItemPrice + shippingCost;

  if (!cartReady) return null;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        shippingCost,
        totalItemPrice,
        totalWithShipping,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}