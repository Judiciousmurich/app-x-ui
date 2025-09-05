'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, CreditCard, Smartphone, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useUser } from '@/context/UserContext';
import { mockPlans } from '@/data/mockData';

const Checkout: React.FC = () => {
  const { state, clearCart } = useCart();
  const { user } = useUser();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    postalCode: ''
  });

  // Get user's plan
  const userPlan = user?.subscription?.planId 
    ? mockPlans.find(plan => plan.id === user.subscription?.planId)
    : null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePayment = (method: 'mpesa' | 'crypto') => {
    if (userPlan && user?.subscription?.status === 'active') {
      // For subscription users, just confirm meal selection
      alert('Meal selection confirmed! Your meals will be delivered as scheduled.');
      clearCart();
      router.push('/dashboard');
    } else {
      // For individual purchases, process payment
      alert(`Processing ${method.toUpperCase()} payment...`);
      clearCart();
      router.push('/dashboard');
    }
  };

  const totalAmount = userPlan && user?.subscription?.status === 'active' 
    ? 0 // No additional cost for subscription users
    : state.totalPrice;

  if (state.totalItems === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 to-primary-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some delicious meals to get started!</p>
          <Link
            href="/meals"
            className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 inline-flex items-center space-x-2"
          >
            <span>Browse Meals</span>
            <ArrowLeft className="h-5 w-5 rotate-180" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-primary-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/meals"
            className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Menu</span>
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Customer Information Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg animate-slide-up">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              {userPlan && user?.subscription?.status === 'active' 
                ? 'Confirm Delivery Information' 
                : 'Delivery Information'
              }
            </h2>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name || user?.name || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone || user?.phone || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all duration-300"
                    placeholder="+254 7XX XXX XXX"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || user?.email || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all duration-300"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Delivery Address *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Enter your full delivery address"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all duration-300"
                    placeholder="Nairobi"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all duration-300"
                    placeholder="00100"
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary & Payment */}
          <div className="space-y-8">
            {/* Order Summary */}
            <div className="bg-white rounded-2xl p-8 shadow-lg animate-slide-up">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Order Summary</h2>
              
              {/* Subscription Info */}
              {userPlan && user?.subscription?.status === 'active' && (
                <div className="border-b border-gray-200 pb-4 mb-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Your Subscription</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">{userPlan.name}</span>
                    <span className="font-bold text-secondary-600">
                      Active Subscription
                    </span>
                  </div>
                </div>
              )}

              {/* Selected Meals */}
              {state.items.length > 0 && (
                <div className="border-b border-gray-200 pb-4 mb-4">
                  <h3 className="font-semibold text-gray-800 mb-4">Selected Meals</h3>
                  <div className="space-y-3">
                    {state.items.map((item) => (
                      <div key={item.meal.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Image
                            src={item.meal.image}
                            alt={item.meal.name}
                            width={48}
                            height={48}
                            className="rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium text-gray-800">{item.meal.name}</p>
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <span className="font-semibold text-primary-600">
                          {userPlan && user?.subscription?.status === 'active' 
                            ? 'Included' 
                            : `KES ${(item.meal.price * item.quantity).toLocaleString()}`
                          }
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Total */}
              <div className="flex justify-between items-center text-xl font-bold">
                <span className="text-gray-800">Total Amount:</span>
                <span className="text-primary-600">
                  No additional cost
                </span>
              </div>
            </div>

            {/* Payment Options */}
            <div className="bg-white rounded-2xl p-8 shadow-lg animate-slide-up">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                <Shield className="h-6 w-6 text-secondary-600" />
                <span>
                  Confirm Selection
                </span>
              </h2>
              
              <div className="space-y-4">
                <div className="bg-secondary-50 border border-secondary-200 rounded-xl p-4 mb-4">
                  <p className="text-secondary-800 font-medium">
                    ✓ You have an active subscription. These meals are included in your plan.
                  </p>
                </div>
                <button
                  onClick={() => handlePayment('mpesa')}
                  className="w-full group bg-primary-600 hover:bg-primary-700 text-white p-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105"
                >
                  Confirm Meal Selection
                </button>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  Your meal selection will be processed securely
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;