'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type CartItem = {
  id: string | number;
  title: string;
  price: number;
  grading?: string;
  addHolder?: boolean;
  imageUrl?: string;
  quantity?: number;
  cardDetails?: Record<string, any>;
  customerDetails?: Record<string, any>;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string | number) => void;
  clearCart: () => void;
  shippingCost: number;
  totalItemPrice: number;
  totalWithShipping: number;
  setEmail: (email: string) => void;
  email: string;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [email, setEmail] = useState('');

  const addToCart = (item: CartItem) => {
    const exists = cart.some((i) => i.id === item.id);
    if (!exists) {
      setCart((prev) => [...prev, item]);
    }
  };

  const removeFromCart = (id: string | number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const shippingCost = cart.length > 0 ? 4.63 : 0;
  const totalItemPrice = cart.reduce((sum, item) => sum + item.price, 0);
  const totalWithShipping = totalItemPrice + shippingCost;

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
        email,
        setEmail,
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