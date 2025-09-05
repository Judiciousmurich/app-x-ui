import { Plan, Meal, User, Payment, PaymentMethod } from '@/types';

export const mockMeals: Meal[] = [
  {
    id: 'nyama-choma',
    name: 'Premium Nyama Choma',
    description: 'Perfectly grilled beef with traditional spices and ugali',
    image: 'https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 1200,
    dietary: ['Protein-Rich', 'Traditional'],
    ingredients: ['Premium Beef', 'Traditional Spices', 'Ugali', 'Kachumbari'],
    calories: 450,
    prepTime: 25,
    isActive: true,
    createdAt: '2024-12-01T10:00:00Z'
  },
  {
    id: 'pilau-chicken',
    name: 'Chicken Pilau',
    description: 'Aromatic spiced rice with tender chicken pieces and vegetables',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 800,
    dietary: ['Comfort Food', 'Spiced'],
    ingredients: ['Basmati Rice', 'Chicken', 'Pilau Masala', 'Vegetables'],
    calories: 420,
    prepTime: 20,
    isActive: true,
    createdAt: '2024-12-01T10:00:00Z'
  },
  {
    id: 'fish-curry',
    name: 'Coastal Fish Curry',
    description: 'Fresh fish in coconut curry sauce with rice and vegetables',
    image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 950,
    dietary: ['Seafood', 'Coastal'],
    ingredients: ['Fresh Fish', 'Coconut Milk', 'Curry Spices', 'Rice'],
    calories: 380,
    prepTime: 15,
    isActive: true,
    createdAt: '2024-12-01T10:00:00Z'
  },
  {
    id: 'githeri-deluxe',
    name: 'Deluxe Githeri',
    description: 'Traditional maize and beans with vegetables and meat',
    image: 'https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 600,
    dietary: ['Traditional', 'Nutritious'],
    ingredients: ['Maize', 'Beans', 'Vegetables', 'Beef', 'Spices'],
    calories: 400,
    prepTime: 120,
    isActive: true,
    createdAt: '2024-12-01T10:00:00Z'
  },
  {
    id: 'samosa-platter',
    name: 'Samosa Platter',
    description: 'Crispy samosas with chutneys and salad',
    image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 400,
    dietary: ['Vegetarian', 'Snack'],
    ingredients: ['Pastry', 'Vegetables', 'Spices', 'Chutneys'],
    calories: 320,
    prepTime: 30,
    isActive: true,
    createdAt: '2024-12-01T10:00:00Z'
  },
  {
    id: 'chapati-stew',
    name: 'Chapati & Beef Stew',
    description: 'Soft chapatis with rich beef stew and vegetables',
    image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 700,
    dietary: ['Traditional', 'Hearty'],
    ingredients: ['Chapati', 'Beef', 'Vegetables', 'Stew Spices'],
    calories: 480,
    prepTime: 45,
    isActive: true,
    createdAt: '2024-12-01T10:00:00Z'
  },
  {
    id: 'mukimo-special',
    name: 'Special Mukimo',
    description: 'Traditional mashed potatoes with greens and meat',
    image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 650,
    dietary: ['Traditional', 'Comfort Food'],
    ingredients: ['Potatoes', 'Greens', 'Maize', 'Meat', 'Spices'],
    calories: 420,
    prepTime: 40,
    isActive: true,
    createdAt: '2024-12-01T10:00:00Z'
  },
  {
    id: 'mandazi-tea',
    name: 'Mandazi & Chai',
    description: 'Fresh mandazi with spiced Kenyan tea',
    image: 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 300,
    dietary: ['Breakfast', 'Traditional'],
    ingredients: ['Flour', 'Coconut', 'Spices', 'Tea Leaves', 'Milk'],
    calories: 280,
    prepTime: 20,
    isActive: true,
    createdAt: '2024-12-01T10:00:00Z'
  }
];

export const mockPlans: Plan[] = [
  {
    id: 'basic-plan',
    name: 'Basic Plan',
    description: 'Perfect for individuals who want quality meals without breaking the bank',
    price: 2500,
    currency: 'KES',
    mealsPerWeek: 5,
    benefits: [
      '5 meals per week',
      'Traditional Kenyan cuisine',
      'Free delivery within Nairobi',
      'Flexible meal scheduling',
      'Basic customer support'
    ],
    meals: [mockMeals[4], mockMeals[5], mockMeals[6], mockMeals[7]], // Samosa, Chapati, Mukimo, Mandazi
    isActive: true,
    createdAt: '2024-11-01T10:00:00Z'
  },
  {
    id: 'standard-plan',
    name: 'Standard Plan',
    description: 'Great value for families and food enthusiasts',
    price: 4500,
    currency: 'KES',
    mealsPerWeek: 10,
    benefits: [
      '10 meals per week',
      'Mix of traditional and modern cuisine',
      'Free delivery countrywide',
      'Priority customer support',
      'Meal customization options',
      'Weekly menu updates'
    ],
    meals: [mockMeals[0], mockMeals[1], mockMeals[2], mockMeals[3], mockMeals[4], mockMeals[5]],
    isActive: true,
    createdAt: '2024-11-01T10:00:00Z'
  },
  {
    id: 'premium-plan',
    name: 'Premium Plan',
    description: 'Ultimate dining experience with premium ingredients and service',
    price: 7500,
    currency: 'KES',
    mealsPerWeek: 15,
    benefits: [
      '15 meals per week',
      'Premium ingredients and preparation',
      'Same-day delivery available',
      '24/7 customer support',
      'Personalized meal planning',
      'Exclusive chef specials',
      'Nutritionist consultation',
      'Special dietary accommodations'
    ],
    meals: mockMeals, // All meals available
    isActive: true,
    createdAt: '2024-11-01T10:00:00Z'
  },
  {
    id: 'family-plan',
    name: 'Family Plan',
    description: 'Perfect for families with diverse tastes and preferences',
    price: 6000,
    currency: 'KES',
    mealsPerWeek: 12,
    benefits: [
      '12 meals per week',
      'Family-sized portions',
      'Kid-friendly options',
      'Free delivery within city',
      'Flexible scheduling',
      'Family nutrition guidance',
      'Bulk order discounts'
    ],
    meals: [mockMeals[0], mockMeals[1], mockMeals[3], mockMeals[5], mockMeals[6], mockMeals[7]],
    isActive: true,
    createdAt: '2024-11-01T10:00:00Z'
  },
  {
    id: 'student-plan',
    name: 'Student Plan',
    description: 'Affordable and nutritious meals for students',
    price: 1800,
    currency: 'KES',
    mealsPerWeek: 7,
    benefits: [
      '7 meals per week',
      'Student-friendly pricing',
      'Nutritious and filling meals',
      'Campus delivery available',
      'Study-friendly packaging',
      'Student ID verification required'
    ],
    meals: [mockMeals[1], mockMeals[3], mockMeals[4], mockMeals[7]],
    isActive: true,
    createdAt: '2024-11-01T10:00:00Z'
  },
  {
    id: 'corporate-plan',
    name: 'Corporate Plan',
    description: 'Professional meal solutions for businesses and offices',
    price: 5500,
    currency: 'KES',
    mealsPerWeek: 20,
    benefits: [
      '20 meals per week',
      'Office delivery service',
      'Bulk pricing discounts',
      'Invoice billing options',
      'Meeting catering add-ons',
      'Dedicated account manager',
      'Flexible corporate scheduling'
    ],
    meals: [mockMeals[0], mockMeals[1], mockMeals[2], mockMeals[4], mockMeals[5]],
    isActive: true,
    createdAt: '2024-11-01T10:00:00Z'
  },
  {
    id: 'weekend-plan',
    name: 'Weekend Special',
    description: 'Perfect for weekend gatherings and special occasions',
    price: 3200,
    currency: 'KES',
    mealsPerWeek: 6,
    benefits: [
      '6 weekend meals',
      'Special occasion menus',
      'Party-sized portions available',
      'Weekend delivery service',
      'Event planning assistance',
      'Custom menu requests'
    ],
    meals: [mockMeals[0], mockMeals[2], mockMeals[4], mockMeals[6]],
    isActive: true,
    createdAt: '2024-11-01T10:00:00Z'
  },
  {
    id: 'healthy-plan',
    name: 'Healthy Living',
    description: 'Nutritious meals designed for health-conscious individuals',
    price: 4200,
    currency: 'KES',
    mealsPerWeek: 8,
    benefits: [
      '8 health-focused meals per week',
      'Nutritionist-approved recipes',
      'Calorie and macro information',
      'Fresh, organic ingredients',
      'Dietary restriction accommodations',
      'Health tracking support',
      'Wellness consultation included'
    ],
    meals: [mockMeals[2], mockMeals[3], mockMeals[6], mockMeals[7]],
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