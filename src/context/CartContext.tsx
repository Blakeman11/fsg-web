'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type CartItem = {
  id: string;
  title: string;
  price: number;
  grading?: string;
  addHolder?: boolean;
  imageUrl?: string; // ✅ NEW
};
export type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void; // ✅ must match the implementation
  clearCart: () => void; // ✅ Add this
  shippingCost: number;
  totalItemPrice: number;
  totalWithShipping: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => setCart((prev) => [...prev, item]);
  const removeFromCart = (id: string) =>
  setCart((prev) => prev.filter((item) => item.id !== id));
  const clearCart = () => setCart([]); // ✅ Add this

  const shippingCost = 5;
  const totalItemPrice = cart.reduce((sum, item) => sum + item.price, 0);
  const totalWithShipping = totalItemPrice + shippingCost;

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, shippingCost, totalItemPrice, totalWithShipping }}
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