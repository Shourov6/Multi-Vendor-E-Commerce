import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Cart, CartItem } from '@/types';

interface CartState extends Cart {
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  applyDiscount: (code: string) => Promise<boolean>;
  removeDiscount: () => void;
}

// Bangladeshi pricing - Free shipping over 5000 BDT
const FREE_SHIPPING_THRESHOLD = 5000;
const DEFAULT_SHIPPING = 100;
const TAX_RATE = 0.05; // 5% tax for Bangladesh

const calculateCartTotals = (items: CartItem[]): Omit<Cart, 'items'> => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const taxAmount = Math.round(subtotal * TAX_RATE);
  const shippingAmount = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : DEFAULT_SHIPPING;
  const discountAmount = 0; // Will be calculated when discount applied
  const total = subtotal + taxAmount + shippingAmount - discountAmount;
  
  return {
    subtotal,
    taxAmount,
    shippingAmount,
    discountAmount,
    total,
    itemCount,
  };
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      subtotal: 0,
      taxAmount: 0,
      shippingAmount: 0,
      discountAmount: 0,
      total: 0,
      itemCount: 0,

      addItem: (newItem) => {
        const { items } = get();
        const existingItemIndex = items.findIndex(
          item => item.productId === newItem.productId && item.variantId === newItem.variantId
        );

        let updatedItems: CartItem[];

        if (existingItemIndex > -1) {
          // Update existing item quantity
          updatedItems = items.map((item, index) => 
            index === existingItemIndex
              ? { 
                  ...item, 
                  quantity: Math.min(item.quantity + newItem.quantity, item.maxQuantity) 
                }
              : item
          );
        } else {
          // Add new item
          const item: CartItem = {
            ...newItem,
            id: `${newItem.productId}-${newItem.variantId || 'default'}-${Date.now()}`,
          };
          updatedItems = [...items, item];
        }

        set({
          items: updatedItems,
          ...calculateCartTotals(updatedItems),
        });
      },

      removeItem: (itemId) => {
        const { items } = get();
        const updatedItems = items.filter(item => item.id !== itemId);
        
        set({
          items: updatedItems,
          ...calculateCartTotals(updatedItems),
        });
      },

      updateQuantity: (itemId, quantity) => {
        const { items } = get();
        
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }

        const updatedItems = items.map(item => 
          item.id === itemId 
            ? { ...item, quantity: Math.min(quantity, item.maxQuantity) }
            : item
        );

        set({
          items: updatedItems,
          ...calculateCartTotals(updatedItems),
        });
      },

      clearCart: () => {
        set({
          items: [],
          subtotal: 0,
          taxAmount: 0,
          shippingAmount: 0,
          discountAmount: 0,
          total: 0,
          itemCount: 0,
        });
      },

      applyDiscount: async (code) => {
        // Simulate API call to validate discount code
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Bangladeshi discount codes
        const validCodes: Record<string, number> = {
          'MEAW10': 0.10,
          'MEAW20': 0.20,
          'WELCOME': 0.15,
          'EID2024': 0.25,
          'PAHELA': 0.15,
        };

        const discountRate = validCodes[code.toUpperCase()];
        
        if (discountRate) {
          const { items } = get();
          const { subtotal } = calculateCartTotals(items);
          const discountAmount = Math.round(subtotal * discountRate);
          
          set(state => ({
            discountAmount,
            total: state.subtotal + state.taxAmount + state.shippingAmount - discountAmount,
          }));
          
          return true;
        }
        
        return false;
      },

      removeDiscount: () => {
        set(state => ({
          discountAmount: 0,
          total: state.subtotal + state.taxAmount + state.shippingAmount,
        }));
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
);
