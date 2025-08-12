// Global type definitions for the application

declare global {
  interface Window {
    // Add any global window properties here
  }
}

// Equipment types
export interface Equipment {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  price: number;
  hourlyRate: number;
  dailyRate: number;
  weeklyRate: number;
  monthlyRate: number;
  availability: boolean;
  condition: string;
  location: string;
  specifications: Record<string, any>;
}

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  joinDate: string;
}

// Order types
export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  equipmentId: string;
  equipment: Equipment;
  quantity: number;
  hours: number;
  price: number;
}

// Cart types
export interface CartItem {
  id: string;
  equipment: Equipment;
  quantity: number;
  hours: number;
  price: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export {} 