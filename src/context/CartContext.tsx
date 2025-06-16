'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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

  const addToCart = (item: CartItem) => setCart((prev) => [...prev, item]);
  const removeFromCart = (id: string) =>
    setCart((prev) => prev.filter((item) => item.id !== id));
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('fsg-cart');
  };

  const shippingCost = 5;
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

// ✅ The missing piece
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}