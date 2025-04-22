import React, { createContext, useContext, useState } from 'react';
import { CartItem, Product } from '../types';

interface CartCtx {
  items: CartItem[];
  addItem: (p: Product, q: number) => void;
  removeItem: (id: number) => void;
  updateItem: (id: number, q: number) => void;
  clearCart: () => void;
}

const Cart = createContext<CartCtx | undefined>(undefined);
export const useCart = () => {
  const c = useContext(Cart);
  if (!c) throw new Error('useCart must be used within CartProvider');
  return c;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (p: Product, q: number) =>
    setItems(prev => {
      const i = prev.findIndex(it => it.product.id === p.id);
      if (i >= 0) {
        const copy = [...prev];
        copy[i].quantity += q;
        return copy;
      }
      return [...prev, { product: p, quantity: q }];
    });

  const removeItem = (id: number) => setItems(prev => prev.filter(it => it.product.id !== id));
  const updateItem = (id: number, q: number) =>
    setItems(prev => prev.map(it => (it.product.id === id ? { ...it, quantity: q } : it)));
  const clearCart = () => setItems([]);

  return <Cart.Provider value={{ items, addItem, removeItem, updateItem, clearCart }}>{children}</Cart.Provider>;
};
