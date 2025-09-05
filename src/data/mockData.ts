import { Plan, Meal, User, Payment, PaymentMethod } from '@/types';

export const mockMeals: Meal[] = [
  {
    id: 'grilled-salmon',
    name: 'Grilled Salmon with Herbs',
    description: 'Fresh Atlantic salmon with rosemary, lemon, and seasonal vegetables',
    image: 'https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 1850,
    dietary: ['Protein-Rich', 'Omega-3'],
    ingredients: ['Atlantic Salmon', 'Rosemary', 'Lemon', 'Seasonal Vegetables', 'Olive Oil'],
    calories: 420,
    prepTime: 25,
    isActive: true,
    createdAt: '2024-12-01T10:00:00Z'
  },
  {
    id: 'chicken-teriyaki',
    name: 'Chicken Teriyaki Bowl',
    description: 'Tender chicken with teriyaki glaze, jasmine rice, and steamed vegetables',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 1450,
    dietary: ['High-Protein', 'Asian-Inspired'],
    ingredients: ['Chicken Breast', 'Teriyaki Sauce', 'Jasmine Rice', 'Broccoli', 'Carrots'],
    calories: 380,
    prepTime: 20,
    isActive: true,
    createdAt: '2024-12-01T10:00:00Z'
  },
  {
    id: 'quinoa-salad',
    name: 'Mediterranean Quinoa Salad',
    description: 'Nutrient-packed quinoa with feta, olives, tomatoes, and herbs',
    image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 1250,
    dietary: ['Vegetarian', 'Gluten-Free'],
    ingredients: ['Quinoa', 'Feta Cheese', 'Olives', 'Cherry Tomatoes', 'Fresh Herbs'],
    calories: 320,
    prepTime: 15,
    isActive: true,
    createdAt: '2024-12-01T10:00:00Z'
  },
  {
    id: 'beef-stew',
    name: 'Traditional Beef Stew',
    description: 'Slow-cooked beef with root vegetables and rich aromatic spices',
    image: 'https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 1650,
    dietary: ['Comfort Food', 'Local Favorite'],
    ingredients: ['Beef Chuck', 'Potatoes', 'Carrots', 'Onions', 'Aromatic Spices'],
    calories: 450,
    prepTime: 120,
    isActive: true,
    createdAt: '2024-12-01T10:00:00Z'
  }
];

export const mockPlans: Plan[] = [
  {
    id: 'premium-catering',
    name: 'Premium Catering',
    description: 'Luxury dining experiences for special occasions and events',
    price: 15000,
    currency: 'KES',
    mealsPerWeek: 0,
    benefits: [
      'Gourmet menu selection',
      'Professional presentation',
      'Customizable portions',
      'Dedicated event coordinator',
      'Premium ingredients',
      'Full service setup'
    ],
    meals: mockMeals.slice(0, 2),
    isActive: true,
    createdAt: '2024-11-01T10:00:00Z'
  },
  {
    id: 'corporate-catering',
    name: 'Corporate Catering',
    description: 'Professional meal solutions for your business needs',
    price: 8500,
    currency: 'KES',
    mealsPerWeek: 5,
    benefits: [
      'Healthy meal options',
      'Flexible delivery schedules',
      'Bulk pricing discounts',
      'Dietary accommodations',
      'Monthly menu planning',
      'Invoice billing options'
    ],
    meals: mockMeals,
    isActive: true,
    createdAt: '2024-11-01T10:00:00Z'
  }
];

export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Sarah Kimani',
    email: 'sarah.kimani@email.com',
    phone: '+254 712 345 678',
    address: '123 Westlands Avenue',
    city: 'Nairobi',
    subscription: {
      planId: 'premium-catering',
      plan: 'Premium Catering',
      status: 'active',
      renewalDate: '2025-02-15',
      mealsRemaining: 12,
      startDate: '2024-12-15'
    },
    createdAt: '2024-12-01T10:00:00Z',
    lastLogin: '2025-01-15T08:30:00Z'
  },
  {
    id: 'user-2',
    name: 'Michael Ochieng',
    email: 'michael.ochieng@email.com',
    phone: '+254 723 456 789',
    address: '456 Karen Road',
    city: 'Nairobi',
    subscription: {
      planId: 'corporate-catering',
      plan: 'Corporate Catering',
      status: 'active',
      renewalDate: '2025-02-20',
      mealsRemaining: 18,
      startDate: '2024-12-20'
    },
    createdAt: '2024-12-02T10:00:00Z',
    lastLogin: '2025-01-14T14:20:00Z'
  },
  {
    id: 'user-3',
    name: 'Grace Wanjiku',
    email: 'grace.wanjiku@email.com',
    phone: '+254 734 567 890',
    address: '789 Kilimani Street',
    city: 'Nairobi',
    subscription: {
      planId: 'premium-catering',
      plan: 'Premium Catering',
      status: 'paused',
      renewalDate: '2025-03-01',
      mealsRemaining: 5,
      startDate: '2024-11-28'
    },
    createdAt: '2024-11-28T10:00:00Z',
    lastLogin: '2025-01-10T16:45:00Z'
  }
];

export const mockPayments: Payment[] = [
  {
    id: 'pay-1',
    userId: 'user-1',
    userName: 'Sarah Kimani',
    amount: 15000,
    currency: 'KES',
    method: 'mpesa',
    status: 'completed',
    type: 'subscription',
    planId: 'premium-catering',
    planName: 'Premium Catering',
    transactionId: 'MP240115001',
    createdAt: '2025-01-15T10:30:00Z',
    completedAt: '2025-01-15T10:31:00Z'
  },
  {
    id: 'pay-2',
    userId: 'user-2',
    userName: 'Michael Ochieng',
    amount: 8500,
    currency: 'KES',
    method: 'crypto',
    status: 'completed',
    type: 'subscription',
    planId: 'corporate-catering',
    planName: 'Corporate Catering',
    transactionId: 'CR240116001',
    createdAt: '2025-01-16T14:20:00Z',
    completedAt: '2025-01-16T14:25:00Z'
  },
  {
    id: 'pay-3',
    userId: 'user-3',
    userName: 'Grace Wanjiku',
    amount: 1850,
    currency: 'KES',
    method: 'mpesa',
    status: 'completed',
    type: 'meal',
    mealIds: ['grilled-salmon'],
    mealNames: ['Grilled Salmon with Herbs'],
    transactionId: 'MP240117001',
    createdAt: '2025-01-17T12:15:00Z',
    completedAt: '2025-01-17T12:16:00Z'
  }
];

export const mockPaymentMethods: PaymentMethod[] = [
  {
    id: 'pm-1',
    name: 'M-PESA',
    type: 'mpesa',
    isActive: true,
    config: {
      merchantId: 'MPESA123',
      apiKey: 'mpesa_api_key_here',
      webhookUrl: 'https://api.foodieskitchen.com/webhooks/mpesa',
      supportedCurrencies: ['KES']
    },
    createdAt: '2024-11-01T10:00:00Z'
  },
  {
    id: 'pm-2',
    name: 'Cryptocurrency',
    type: 'crypto',
    isActive: true,
    config: {
      apiKey: 'crypto_api_key_here',
      webhookUrl: 'https://api.foodieskitchen.com/webhooks/crypto',
      supportedCurrencies: ['BTC', 'ETH', 'USDT']
    },
    createdAt: '2024-11-01T10:00:00Z'
  },
  {
    id: 'pm-3',
    name: 'Credit Card',
    type: 'card',
    isActive: false,
    config: {
      merchantId: 'CARD123',
      apiKey: 'card_api_key_here',
      webhookUrl: 'https://api.foodieskitchen.com/webhooks/card',
      supportedCurrencies: ['KES', 'USD']
    },
    createdAt: '2024-11-01T10:00:00Z'
  }
];