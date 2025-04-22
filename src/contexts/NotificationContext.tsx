import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useUser } from './UserContext';

export interface Notification {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'createdAt'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  unreadCount: 0,
  addNotification: () => {},
  markAsRead: () => {},
  markAllAsRead: () => {},
  removeNotification: () => {},
});

export const useNotification = () => useContext(NotificationContext);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const { user } = useUser();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  // Load notifications from localStorage when user changes
  useEffect(() => {
    if (user) {
      const storedNotifications = localStorage.getItem(`notifications-${user.id}`);
      
      if (storedNotifications) {
        try {
          const parsed = JSON.parse(storedNotifications);
          
          // Convert string dates to Date objects
          const parsedNotifications = parsed.map((notif: any) => ({
            ...notif,
            createdAt: new Date(notif.createdAt)
          }));
          
          setNotifications(parsedNotifications);
        } catch (error) {
          console.error('Failed to parse stored notifications', error);
          localStorage.removeItem(`notifications-${user.id}`);
        }
      } else {
        // Add welcome notification
        const welcomeNotification: Notification = {
          id: Math.random().toString(36).substr(2, 9),
          type: 'info',
          title: 'Welcome to 1x3 Matrix!',
          message: 'Start building your network by filling your first matrix position.',
          read: false,
          createdAt: new Date(),
        };
        
        setNotifications([welcomeNotification]);
        localStorage.setItem(`notifications-${user.id}`, JSON.stringify([welcomeNotification]));
      }
    } else {
      setNotifications([]);
    }
  }, [user]);

  const addNotification = (notification: Omit<Notification, 'id' | 'read' | 'createdAt'>) => {
    if (!user) return;
    
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      read: false,
      createdAt: new Date(),
    };
    
    const updatedNotifications = [newNotification, ...notifications];
    setNotifications(updatedNotifications);
    
    // Update localStorage
    localStorage.setItem(`notifications-${user.id}`, JSON.stringify(updatedNotifications));
  };

  const markAsRead = (id: string) => {
    if (!user) return;
    
    const updatedNotifications = notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    );
    
    setNotifications(updatedNotifications);
    
    // Update localStorage
    localStorage.setItem(`notifications-${user.id}`, JSON.stringify(updatedNotifications));
  };

  const markAllAsRead = () => {
    if (!user) return;
    
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      read: true
    }));
    
    setNotifications(updatedNotifications);
    
    // Update localStorage
    localStorage.setItem(`notifications-${user.id}`, JSON.stringify(updatedNotifications));
  };

  const removeNotification = (id: string) => {
    if (!user) return;
    
    const updatedNotifications = notifications.filter(notification => notification.id !== id);
    setNotifications(updatedNotifications);
    
    // Update localStorage
    localStorage.setItem(`notifications-${user.id}`, JSON.stringify(updatedNotifications));
  };

  const unreadCount = notifications.filter(notification => !notification.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};