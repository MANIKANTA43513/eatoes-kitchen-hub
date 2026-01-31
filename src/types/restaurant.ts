export type MenuCategory = 'Appetizer' | 'Main Course' | 'Dessert' | 'Beverage';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: MenuCategory;
  price: number;
  ingredients: string[];
  isAvailable: boolean;
  preparationTime: number;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export type OrderStatus = 'Pending' | 'Preparing' | 'Ready' | 'Delivered' | 'Cancelled';

export interface OrderItem {
  menuItem: MenuItem;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  customerName: string;
  tableNumber: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardStats {
  totalOrders: number;
  pendingOrders: number;
  totalRevenue: number;
  menuItems: number;
  availableItems: number;
}
