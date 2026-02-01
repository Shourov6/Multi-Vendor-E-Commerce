import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, UserRole } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  clearError: () => void;
  
  // Role checks
  isAdmin: () => boolean;
  isVendor: () => boolean;
  isCustomer: () => boolean;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  phone?: string;
  role?: UserRole;
}

// Mock users for demo - Bangladeshi names
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@meaw.com',
    name: 'অ্যাডমিন ইউজার',
    role: 'admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
    emailVerified: true,
  },
  {
    id: '2',
    email: 'vendor@meaw.com',
    name: 'রহিম উদ্দিন',
    role: 'vendor',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rahim',
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
    emailVerified: true,
  },
  {
    id: '3',
    email: 'customer@meaw.com',
    name: 'করিম আহমেদ',
    role: 'customer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=karim',
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
    emailVerified: true,
  },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock authentication
        const user = mockUsers.find(u => u.email === email);
        
        if (user && password === 'password') {
          set({ 
            user, 
            isAuthenticated: true, 
            isLoading: false,
            error: null 
          });
        } else {
          set({ 
            isLoading: false, 
            error: 'ইমেইল বা পাসওয়ার্ড ভুল' 
          });
          throw new Error('Invalid email or password');
        }
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true, error: null });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const newUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          email: data.email,
          name: data.name,
          role: data.role || 'customer',
          phone: data.phone,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.email}`,
          createdAt: new Date(),
          updatedAt: new Date(),
          isActive: true,
          emailVerified: false,
        };
        
        set({ 
          user: newUser, 
          isAuthenticated: true, 
          isLoading: false,
          error: null 
        });
      },

      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false, 
          error: null 
        });
      },

      updateUser: (userData: Partial<User>) => {
        const { user } = get();
        if (user) {
          set({ 
            user: { ...user, ...userData, updatedAt: new Date() } 
          });
        }
      },

      clearError: () => {
        set({ error: null });
      },

      isAdmin: () => get().user?.role === 'admin',
      isVendor: () => get().user?.role === 'vendor',
      isCustomer: () => get().user?.role === 'customer',
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);
