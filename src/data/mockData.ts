import { Plan, Meal, User, Payment, PaymentMethod } from '@/types';

export const mockMeals: Meal[] = [
  {
    id: 'tuscan-chicken',
    name: 'Tuscan Herb Chicken',
    description: 'Tender chicken breast with Mediterranean herbs and roasted vegetables',
    image: 'https://images.pexels.com/photos/106343/pexels-photo-106343.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 1850,
    dietary: ['Protein-Rich', 'Mediterranean'],
    ingredients: ['Chicken Breast', 'Herbs', 'Roasted Vegetables', 'Olive Oil'],
    calories: 420,
    prepTime: 30,
    isActive: true,
    createdAt: '2024-12-01T10:00:00Z'
  },
  {
    id: 'mediterranean-salmon',
    name: 'Mediterranean Salmon',
    description: 'Fresh Atlantic salmon with lemon herbs and quinoa pilaf',
    image: 'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 2200,
    dietary: ['Seafood', 'Healthy'],
    ingredients: ['Atlantic Salmon', 'Quinoa', 'Lemon', 'Mediterranean Herbs'],
    calories: 380,
    prepTime: 25,
    isActive: true,
    createdAt: '2024-12-01T10:00:00Z'
  },
  {
    id: 'spicy-thai-curry',
    name: 'Spicy Thai Curry',
    description: 'Aromatic Thai red curry with vegetables and jasmine rice',
    image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 1650,
    dietary: ['Spicy', 'Asian'],
    ingredients: ['Thai Curry Paste', 'Coconut Milk', 'Vegetables', 'Jasmine Rice'],
    calories: 450,
    prepTime: 20,
    isActive: true,
    createdAt: '2024-12-01T10:00:00Z'
  },
  {
    id: 'beef-wellington',
    name: 'Beef Wellington',
    description: 'Classic beef wellington with mushroom duxelles and red wine jus',
    image: 'https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 2800,
    dietary: ['Premium', 'Classic'],
    ingredients: ['Beef Tenderloin', 'Puff Pastry', 'Mushroom Duxelles', 'Red Wine'],
    calories: 520,
    prepTime: 45,
    isActive: true,
    createdAt: '2024-12-01T10:00:00Z'
  },
  {
    id: 'vegetarian-risotto',
    name: 'Vegetarian Risotto',
    description: 'Creamy arborio rice with seasonal vegetables and parmesan',
    image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 1450,
    dietary: ['Vegetarian', 'Italian'],
    ingredients: ['Arborio Rice', 'Seasonal Vegetables', 'Parmesan', 'White Wine'],
    calories: 380,
    prepTime: 35,
    isActive: true,
    createdAt: '2024-12-01T10:00:00Z'
  },
  {
    id: 'grilled-lamb',
    name: 'Grilled Lamb Chops',
    description: 'Herb-crusted lamb chops with roasted potatoes and mint sauce',
    image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 2400,
    dietary: ['Premium', 'Protein-Rich'],
    ingredients: ['Lamb Chops', 'Fresh Herbs', 'Roasted Potatoes', 'Mint Sauce'],
    calories: 480,
    prepTime: 30,
    isActive: true,
    createdAt: '2024-12-01T10:00:00Z'
  },
  {
    id: 'pasta-primavera',
    name: 'Pasta Primavera',
    description: 'Fresh pasta with seasonal vegetables in light cream sauce',
    image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 1350,
    dietary: ['Vegetarian', 'Italian'],
    ingredients: ['Fresh Pasta', 'Seasonal Vegetables', 'Cream Sauce', 'Herbs'],
    calories: 420,
    prepTime: 20,
    isActive: true,
    createdAt: '2024-12-01T10:00:00Z'
  },
  {
    id: 'chocolate-dessert',
    name: 'Chocolate Lava Cake',
    description: 'Decadent chocolate cake with molten center and vanilla ice cream',
    image: 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 950,
    dietary: ['Dessert', 'Sweet'],
    ingredients: ['Dark Chocolate', 'Butter', 'Eggs', 'Vanilla Ice Cream'],
    calories: 380,
    prepTime: 25,
    isActive: true,
    createdAt: '2024-12-01T10:00:00Z'
  }
];

export const mockPlans: Plan[] = [
  {
    id: 'starter-plan',
    name: 'Starter Plan',
    description: 'Perfect for individuals who want quality meals without breaking the bank',
    price: 8500,
    currency: 'KES',
    mealsPerWeek: 5,
    benefits: [
      '5 meals per week',
      'Chef-curated recipes',
      'Free delivery within Nairobi',
      'Flexible meal scheduling',
      'Basic customer support'
    ],
    meals: [mockMeals[4], mockMeals[6], mockMeals[7]], // Vegetarian Risotto, Pasta Primavera, Chocolate Dessert
    isActive: true,
    createdAt: '2024-11-01T10:00:00Z'
  },
  {
    id: 'family-plan',
    name: 'Family Plan',
    description: 'Great value for families and food enthusiasts',
    price: 15000,
    currency: 'KES',
    mealsPerWeek: 10,
    benefits: [
      '10 meals per week',
      'Family-sized portions',
      'Free delivery countrywide',
      'Priority customer support',
      'Meal customization options',
      'Weekly menu updates'
    ],
    meals: [mockMeals[0], mockMeals[2], mockMeals[4], mockMeals[5], mockMeals[6], mockMeals[7]],
    isActive: true,
    createdAt: '2024-11-01T10:00:00Z'
  },
  {
    id: 'premium-catering',
    name: 'Premium Catering',
    description: 'Ultimate dining experience with premium ingredients and service',
    price: 25000,
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
    id: 'corporate-catering',
    name: 'Corporate Catering',
    description: 'Professional catering solutions for corporate events and meetings',
    price: 35000,
    currency: 'KES',
    mealsPerWeek: 20,
    benefits: [
      '20 meals per week',
      'Corporate event catering',
      'Professional presentation',
      'Bulk pricing',
      'Dedicated account manager',
      'Custom menu planning',
      'Same-day delivery available'
    ],
    meals: mockMeals, // All meals available
    isActive: true,
    createdAt: '2024-11-01T10:00:00Z'
  },
  {
    id: 'social-events',
    name: 'Social Events',
    description: 'Perfect catering for weddings, parties, and social gatherings',
    price: 18000,
    currency: 'KES',
    mealsPerWeek: 12,
    benefits: [
      '12 meals per week',
      'Event catering specialists',
      'Elegant presentation',
      'Customizable menus',
      'Professional service staff',
      'Setup and cleanup included'
    ],
    meals: [mockMeals[0], mockMeals[1], mockMeals[3], mockMeals[4], mockMeals[7]],
    isActive: true,
    createdAt: '2024-11-01T10:00:00Z'
  },
  {
    id: 'gourmet-experience',
    name: 'Gourmet Experience',
    description: 'Exclusive fine dining experience with world-class cuisine',
    price: 45000,
    currency: 'KES',
    mealsPerWeek: 8,
    benefits: [
      '8 gourmet meals per week',
      'Michelin-star quality',
      'Premium ingredients',
      'Personal chef consultation',
      'Wine pairing recommendations',
      'Exclusive recipes'
    ],
    meals: [mockMeals[1], mockMeals[3], mockMeals[5]],
    isActive: true,
    createdAt: '2024-11-01T10:00:00Z'
  },
  {
    id: 'healthy-lifestyle',
    name: 'Healthy Lifestyle',
    description: 'Nutritious, balanced meals designed for health-conscious individuals',
    price: 12000,
    currency: 'KES',
    mealsPerWeek: 7,
    benefits: [
      '7 healthy meals per week',
      'Nutritionist-approved',
      'Calorie-controlled portions',
      'Organic ingredients',
      'Dietary restriction support',
      'Health tracking guidance'
    ],
    meals: [mockMeals[1], mockMeals[4], mockMeals[6]],
    isActive: true,
    createdAt: '2024-11-01T10:00:00Z'
  },
  {
    id: 'weekend-indulgence',
    name: 'Weekend Indulgence',
    description: 'Special weekend treats and comfort food for relaxing days',
    price: 6500,
    currency: 'KES',
    mealsPerWeek: 4,
    benefits: [
      '4 weekend meals',
      'Comfort food specialties',
      'Weekend delivery only',
      'Indulgent treats included',
      'Perfect for lazy weekends',
      'No commitment required'
    ],
    meals: [mockMeals[3], mockMeals[7]],
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