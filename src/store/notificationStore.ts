import { create } from 'zustand';
import type { Notification, NotificationType } from '@/types';

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  removeNotification: (notificationId: string) => void;
  clearAll: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  unreadCount: 0,

  addNotification: (notification) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
    };

    set(state => ({
      notifications: [newNotification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    }));
  },

  markAsRead: (notificationId) => {
    set(state => {
      const notification = state.notifications.find(n => n.id === notificationId);
      if (notification && !notification.isRead) {
        return {
          notifications: state.notifications.map(n =>
            n.id === notificationId ? { ...n, isRead: true } : n
          ),
          unreadCount: Math.max(0, state.unreadCount - 1),
        };
      }
      return state;
    });
  },

  markAllAsRead: () => {
    set(state => ({
      notifications: state.notifications.map(n => ({ ...n, isRead: true })),
      unreadCount: 0,
    }));
  },

  removeNotification: (notificationId) => {
    set(state => {
      const notification = state.notifications.find(n => n.id === notificationId);
      return {
        notifications: state.notifications.filter(n => n.id !== notificationId),
        unreadCount: notification && !notification.isRead 
          ? Math.max(0, state.unreadCount - 1) 
          : state.unreadCount,
      };
    });
  },

  clearAll: () => {
    set({ notifications: [], unreadCount: 0 });
  },
}));

// Helper function to create common notifications
export const createOrderNotification = (
  userId: string, 
  orderNumber: string, 
  status: string
) => ({
  userId,
  type: 'order' as NotificationType,
  title: 'Order Update',
  message: `Your order #${orderNumber} is now ${status}`,
  data: { orderNumber, status },
  isRead: false,
});

export const createVendorNotification = (
  userId: string,
  title: string,
  message: string
) => ({
  userId,
  type: 'vendor' as NotificationType,
  title,
  message,
  isRead: false,
});
