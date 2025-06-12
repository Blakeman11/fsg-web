// Updated CartContext.tsx to include shipping cost logic

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const clearCart = () => setCart([]);

  const calculateShipping = () => {
    const itemCount = cart.length;
    if (itemCount === 0) return 0;
    const baseShipping = 4.95;
    const extraShipping = (itemCount - 1) * 0.5;
    return Math.min(baseShipping + extraShipping, 15.95);
  };

  const totalWithShipping = cart.reduce((acc, item) => acc + item.price, 0) + calculateShipping();

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, calculateShipping, totalWithShipping }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}