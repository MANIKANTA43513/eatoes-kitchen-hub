import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MenuItem, Order, OrderStatus, MenuCategory } from '@/types/restaurant';
import { sampleMenuItems, sampleOrders } from '@/data/sampleData';
import { toast } from 'sonner';

interface RestaurantContextType {
  // Menu State
  menuItems: MenuItem[];
  addMenuItem: (item: Omit<MenuItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateMenuItem: (id: string, updates: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  toggleAvailability: (id: string) => void;
  
  // Orders State
  orders: Order[];
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  
  // Stats
  stats: {
    totalOrders: number;
    pendingOrders: number;
    totalRevenue: number;
    menuItemsCount: number;
    availableItems: number;
  };
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export function RestaurantProvider({ children }: { children: ReactNode }) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(sampleMenuItems);
  const [orders, setOrders] = useState<Order[]>(sampleOrders);

  const addMenuItem = (item: Omit<MenuItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newItem: MenuItem = {
      ...item,
      id: `${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setMenuItems(prev => [...prev, newItem]);
    toast.success('Menu item added successfully!');
  };

  const updateMenuItem = (id: string, updates: Partial<MenuItem>) => {
    setMenuItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, ...updates, updatedAt: new Date() } : item
      )
    );
    toast.success('Menu item updated successfully!');
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
    toast.success('Menu item deleted successfully!');
  };

  // Optimistic UI update for availability toggle
  const toggleAvailability = (id: string) => {
    const previousState = [...menuItems];
    
    // Update UI immediately (optimistic)
    setMenuItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, isAvailable: !item.isAvailable, updatedAt: new Date() } : item
      )
    );

    // Simulate API call
    const simulateApiCall = new Promise((resolve, reject) => {
      setTimeout(() => {
        // 90% success rate for demo
        if (Math.random() > 0.1) {
          resolve(true);
        } else {
          reject(new Error('API call failed'));
        }
      }, 500);
    });

    simulateApiCall
      .then(() => {
        toast.success('Availability updated!');
      })
      .catch(() => {
        // Rollback on failure
        setMenuItems(previousState);
        toast.error('Failed to update. Reverting changes...');
      });
  };

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === id ? { ...order, status, updatedAt: new Date() } : order
      )
    );
    toast.success(`Order status updated to ${status}!`);
  };

  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'Pending').length,
    totalRevenue: orders
      .filter(o => o.status !== 'Cancelled')
      .reduce((sum, o) => sum + o.totalAmount, 0),
    menuItemsCount: menuItems.length,
    availableItems: menuItems.filter(m => m.isAvailable).length,
  };

  return (
    <RestaurantContext.Provider
      value={{
        menuItems,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        toggleAvailability,
        orders,
        updateOrderStatus,
        stats,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
}

export function useRestaurant() {
  const context = useContext(RestaurantContext);
  if (context === undefined) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
}
