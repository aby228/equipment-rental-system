// Global type definitions for the application

declare global {
  interface Window {
    // Add any global window properties here
  }
}

// Prisma types
export interface Equipment {
  id: number;
  name: string;
  description: string | null;
  quantity: number;
  dailyRate: number;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  role: string;
}

export interface Rental {
  id: number;
  customerId: number;
  equipmentId: number;
  rentalDate: Date;
  returnDate: Date | null;
  quantity: number;
  customer: Customer;
  equipment: Equipment;
}

export interface Order {
  id: number;
  customerId: number;
  orderDate: Date;
  customer: Customer;
  orderItems: OrderItem[];
}

export interface OrderItem {
  id: number;
  orderId: number;
  equipmentId: number;
  quantity: number;
  dailyRate: number;
  equipment: Equipment;
}

// Blog types
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  image: string;
  createdAt: Date;
  author?: {
    name: string;
  };
}

// API Response types
export interface ApiResponse<T = any> {
  status: 'success' | 'fail' | 'error';
  message: string;
  data?: T;
  errors?: any;
}

// User types
export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: string;
}

// Cart types
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export {} 