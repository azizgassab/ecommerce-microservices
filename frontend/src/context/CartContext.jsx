import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const CART_STORAGE_KEY = 'frontend_cart_v1';

const CartContext = createContext(null);

const readInitialCart = () => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const rawStorage = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!rawStorage) {
      return [];
    }

    const parsedItems = JSON.parse(rawStorage);
    return Array.isArray(parsedItems) ? parsedItems : [];
  } catch {
    return [];
  }
};

export function CartProvider({ children }) {
  const [items, setItems] = useState(readInitialCart);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((product, quantity = 1) => {
    if (!product?.id) {
      return;
    }

    setItems((previousItems) => {
      const existingItemIndex = previousItems.findIndex(
        (item) => item.id === product.id
      );

      if (existingItemIndex === -1) {
        return [...previousItems, { ...product, quantity }];
      }

      return previousItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    });
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      setItems((previousItems) =>
        previousItems.filter((item) => item.id !== productId)
      );
      return;
    }

    setItems((previousItems) =>
      previousItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  const removeItem = useCallback((productId) => {
    setItems((previousItems) =>
      previousItems.filter((item) => item.id !== productId)
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const summary = useMemo(() => {
    return items.reduce(
      (accumulator, item) => {
        accumulator.totalItems += item.quantity;
        accumulator.totalPrice += item.price * item.quantity;
        return accumulator;
      },
      { totalItems: 0, totalPrice: 0 }
    );
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems: summary.totalItems,
      totalPrice: summary.totalPrice
    }),
    [addItem, clearCart, items, removeItem, summary.totalItems, summary.totalPrice, updateQuantity]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }

  return context;
}
