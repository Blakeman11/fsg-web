export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartReady, setCartReady] = useState(false); // ✅

  // ✅ Load from localStorage on mount
  React.useEffect(() => {
    const stored = localStorage.getItem('fsg-cart');
    if (stored) setCart(JSON.parse(stored));
    setCartReady(true); // ✅ once loaded
  }, []);

  // ✅ Sync to localStorage whenever cart updates
  React.useEffect(() => {
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

  // ✅ Wait until localStorage has loaded before showing anything
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