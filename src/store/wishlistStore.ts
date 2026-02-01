import { create } from 'zustand';
import { persist } from 'zustand/middleware';


interface WishlistItem {
  productId: string;
  addedAt: Date;
}

interface WishlistState {
  items: WishlistItem[];
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  toggleItem: (productId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (productId) => {
        const { items } = get();
        const exists = items.some(item => item.productId === productId);
        
        if (!exists) {
          set({
            items: [...items, { productId, addedAt: new Date() }],
          });
        }
      },

      removeItem: (productId) => {
        const { items } = get();
        set({
          items: items.filter(item => item.productId !== productId),
        });
      },

      toggleItem: (productId) => {
        const { isInWishlist, addItem, removeItem } = get();
        if (isInWishlist(productId)) {
          removeItem(productId);
        } else {
          addItem(productId);
        }
      },

      clearWishlist: () => {
        set({ items: [] });
      },

      isInWishlist: (productId) => {
        return get().items.some(item => item.productId === productId);
      },
    }),
    {
      name: 'wishlist-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
);
