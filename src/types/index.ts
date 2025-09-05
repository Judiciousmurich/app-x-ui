export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  mealsPerWeek: number;
  benefits: string[];
  meals: Meal[];
  isActive: boolean;
  createdAt: string;
}

export interface Meal {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  dietary: string[];
  ingredients: string[];
  calories: number;
  prepTime: number;
  isActive: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  subscription?: {
    planId: string;
    plan: string;
    status: 'active' | 'paused' | 'cancelled';
    renewalDate: string;
    mealsRemaining: number;
    startDate: string;
  };
  createdAt: string;
  lastLogin?: string;
}

export interface Payment {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  currency: string;
  method: 'mpesa' | 'crypto' | 'card';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  type: 'subscription' | 'meal' | 'addon';
  planId?: string;
  planName?: string;
  mealIds?: string[];
  mealNames?: string[];
  transactionId: string;
  createdAt: string;
  completedAt?: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'mpesa' | 'crypto' | 'card';
  isActive: boolean;
  config: {
    apiKey?: string;
    merchantId?: string;
    webhookUrl?: string;
    supportedCurrencies: string[];
  };
  createdAt: string;
}