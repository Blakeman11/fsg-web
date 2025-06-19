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
  quantity: number; // how many the user is buying
  maxAvailable?: number; // from DB (to validate)
  grading?: string;
  addHolder?: boolean;
  imageUrl?: string;
  cardDetails?: {
    name: string;
    year: string;
    brand: string;
    cardNumber: string;
    category: string;
    level: string;
    insurance: boolean;
  };
  customerDetails?: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
};

export type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  shippingCost: number;
  totalItemPrice: number;
  totalWithShipping: number;
  email: string;
  setEmail: (email: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [email, setEmail] = useState('');
  const [cartReady, setCartReady] = useState(false);

  useEffect(() => {
    const storedCart = localStorage.getItem('fsg-cart');
    const storedEmail = localStorage.getItem('fsg-email');

    if (storedCart) setCart(JSON.parse(storedCart));
    if (storedEmail) setEmail(storedEmail);
    setCartReady(true);
  }, []);

  useEffect(() => {
    if (cartReady) {
      localStorage.setItem('fsg-cart', JSON.stringify(cart));
    }
  }, [cart, cartReady]);

  useEffect(() => {
    if (cartReady) {
      localStorage.setItem('fsg-email', email);
    }
  }, [email, cartReady]);

  const addToCart = (item: CartItem) => {
    const cardDetails = item.cardDetails ?? {
      name: '',
      year: '',
      brand: '',
      cardNumber: '',
      category: '',
      level: '',
      insurance: false,
    };

    const customerDetails = item.customerDetails ?? {
      fullName: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zip: '',
    };

    const validCard = Object.values(cardDetails).every((val) => val !== '');
    const validCustomer = Object.values(customerDetails).every((val) => val !== '');
    const requiresValidation = validCard || validCustomer;

    if (
      requiresValidation &&
      (!validCard || !validCustomer || typeof item.price !== 'number')
    ) {
      alert('Please complete all fields before adding to cart.');
      return;
    }

    const alreadyInCartQty = cart
      .filter((c) => c.id === item.id)
      .reduce((sum, c) => sum + c.quantity, 0);

    const max = item.maxAvailable ?? item.quantity;

    if (alreadyInCartQty + item.quantity > max) {
      alert('You are adding more than the available stock.');
      return;
    }

    setCart((prev) => [...prev, { ...item, cardDetails, customerDetails }]);

    if (customerDetails.email) {
      setEmail(customerDetails.email);
    }
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('fsg-cart');
  };

  const shippingCost = Math.min(4.95 + Math.max(cart.length - 1, 0) * 0.5, 15.95);
  const totalItemPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
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