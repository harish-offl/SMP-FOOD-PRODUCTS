'use client';

import { createContext, useContext, useEffect, useReducer, useCallback, type ReactNode } from 'react';
import type { Product, ProductVariant, CartItem } from '@/types';

// ========================
// Cart State & Actions
// ========================
interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD_ITEM'; product: Product; variant: ProductVariant | null; quantity: number }
  | { type: 'REMOVE_ITEM'; productId: string; variantId?: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number; variantId?: string }
  | { type: 'CLEAR_CART' }
  | { type: 'HYDRATE'; items: CartItem[] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingIndex = state.items.findIndex(
        item => item.product.id === action.product.id &&
          (item.variant?.id || null) === (action.variant?.id || null)
      );
      if (existingIndex > -1) {
        const newItems = [...state.items];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + action.quantity,
        };
        return { items: newItems };
      }
      return {
        items: [...state.items, { product: action.product, variant: action.variant, quantity: action.quantity }],
      };
    }
    case 'REMOVE_ITEM': {
      return {
        items: state.items.filter(
          item => !(item.product.id === action.productId &&
            (item.variant?.id || null) === (action.variantId || null))
        ),
      };
    }
    case 'UPDATE_QUANTITY': {
      if (action.quantity <= 0) {
        return {
          items: state.items.filter(
            item => !(item.product.id === action.productId &&
              (item.variant?.id || null) === (action.variantId || null))
          ),
        };
      }
      return {
        items: state.items.map(item =>
          item.product.id === action.productId &&
            (item.variant?.id || null) === (action.variantId || null)
            ? { ...item, quantity: action.quantity }
            : item
        ),
      };
    }
    case 'CLEAR_CART':
      return { items: [] };
    case 'HYDRATE':
      return { items: action.items };
    default:
      return state;
  }
}

// ========================
// Context
// ========================
interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, variant: ProductVariant | null, quantity?: number) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getTotal: () => number;
  getItemCount: () => number;
  getDeliveryCharge: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'smp-cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          dispatch({ type: 'HYDRATE', items: parsed });
        }
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // Ignore storage errors
    }
  }, [state.items]);

  const addItem = useCallback((product: Product, variant: ProductVariant | null, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', product, variant, quantity });
  }, []);

  const removeItem = useCallback((productId: string, variantId?: string) => {
    dispatch({ type: 'REMOVE_ITEM', productId, variantId });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number, variantId?: string) => {
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity, variantId });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const getSubtotal = useCallback(() => {
    return state.items.reduce((total, item) => {
      const price = item.variant ? item.variant.salePrice : item.product.salePrice;
      return total + price * item.quantity;
    }, 0);
  }, [state.items]);

  const getDeliveryCharge = useCallback(() => {
    const subtotal = getSubtotal();
    return subtotal >= 500 ? 0 : 49;
  }, [getSubtotal]);

  const getTotal = useCallback(() => {
    return getSubtotal() + getDeliveryCharge();
  }, [getSubtotal, getDeliveryCharge]);

  const getItemCount = useCallback(() => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  }, [state.items]);

  return (
    <CartContext.Provider value={{
      items: state.items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getSubtotal,
      getTotal,
      getItemCount,
      getDeliveryCharge,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
