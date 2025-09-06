'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Minus, ShoppingCart, Filter, Lock } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useUser } from '@/context/UserContext';
import { Meal } from '@/types';
import { useRouter } from 'next/navigation';
import { mockMeals, mockPlans } from '@/data/mockData';
import PaymentModal from '@/components/PaymentModal';

const MealSelection: React.FC = () => {
  const { state, addMeal, removeMeal } = useCart();
  const { user } = useUser();
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedMealForPayment, setSelectedMealForPayment] = useState<Meal | null>(null);

  // Get user's subscribed plan
  const userPlan = user?.subscription?.planId 
    ? mockPlans.find(plan => plan.id === user.subscription?.planId)
    : null;

  // Show all meals to everyone
  const allMeals = mockMeals.filter(meal => meal.isActive);

  const dietaryFilters = ['All', 'Traditional', 'Vegetarian', 'Protein-Rich', 'Comfort Food', 'Seafood'];

  const filteredMeals = selectedFilter === 'All' 
    ? allMeals
    : allMeals.filter(meal => meal.dietary.includes(selectedFilter));

  const getItemQuantity = (mealId: string) => {
    const item = state.items.find(item => item.meal.id === mealId);
    return item ? item.quantity : 0;
  };

  // Check if user can add meal to cart (either subscribed to plan that includes this meal, or can buy individually)
  const canAddToCart = (meal: Meal) => {
    if (userPlan && user?.subscription?.status === 'active') {
      // Check if meal is included in user's plan
      return userPlan.meals.some(planMeal => planMeal.id === meal.id);
    }
    return true; // Non-subscribers can add any meal for individual purchase
  };

  // Check if user has reached meal limit for their plan
  const hasReachedMealLimit = () => {
    if (userPlan && user?.subscription?.status === 'active') {
      return state.totalItems >= userPlan.mealsPerWeek;
    }
    return false; // No limit for individual purchases
  };

  const handleAddMeal = (meal: Meal) => {
    if (!canAddToCart(meal)) {
      alert(`This meal is not included in your ${userPlan?.name} plan. Please choose from your plan's available meals or purchase individually.`);
      return;
    }

    if (hasReachedMealLimit()) {
      alert(`You can only select ${userPlan?.mealsPerWeek} meals per week with your ${userPlan?.name} plan.`);
      return;
    }

    addMeal(meal);
  };

  const handleRemoveMeal = (mealId: string) => {
    removeMeal(mealId);
  };

  const handleProceedToCheckout = () => {
    router.push('/checkout');
  };

  const handleBuyNow = (meal: Meal) => {
    // Allow individual purchases for everyone, but warn subscribers
    if (userPlan && user?.subscription?.status === 'active' && canAddToCart(meal)) {
      alert('This meal is included in your subscription plan. Use "Add to Cart" to select it as part of your weekly meals, or continue to purchase it individually.');
      return;
    }
    setSelectedMealForPayment(meal);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (paymentData: any) => {
    alert(`Payment successful! You've purchased ${selectedMealForPayment?.name}`);
    setSelectedMealForPayment(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-primary-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Fresh, Flavorful Meals
            <br />
            <span className="text-primary-400">Delivered to You</span>
          </h1>
          
          {/* Subscription Status */}
          {userPlan && (
            <div className="bg-white rounded-xl p-4 mb-6 inline-block shadow-lg">
              <p className="text-lg font-semibold text-gray-800">
                Your Plan: <span className="text-primary-600">{userPlan.name}</span>
              </p>
              <p className="text-sm text-gray-600">
                Choose {userPlan.mealsPerWeek} meals for this week
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Meals remaining: {user?.subscription?.mealsRemaining || 0}
              </p>
            </div>
          )}

          {/* No Subscription Message */}
          {!userPlan && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 inline-block">
              <p className="text-yellow-800 font-medium">
                💡 Subscribe to a plan to start selecting your weekly meals
              </p>
              <button
                onClick={() => router.push('/plans')}
                className="mt-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                View Plans
              </button>
            </div>
          )}

          {/* Progress Counter */}
          {userPlan && (
            <div className="bg-primary-600 text-white rounded-xl p-4 mb-6 inline-block">
              <p className="text-lg font-semibold">
                Meals Chosen: {state.totalItems}/{userPlan.mealsPerWeek}
              </p>
            </div>
          )}
        </div>

        {/* Filter Bar */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <Filter className="h-5 w-5 text-gray-600" />
            <span className="font-medium text-gray-700">Filter by dietary preference:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {dietaryFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  selectedFilter === filter
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-primary-50 border border-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Meals Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredMeals.map((meal, index) => {
            const quantity = getItemQuantity(meal.id);
            const canAdd = canAddToCart(meal);
            
            return (
              <div
                key={meal.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Meal Image */}
                <div className="relative overflow-hidden">
                  <Image
                    src={meal.image}
                    alt={meal.name}
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    {quantity > 0 && (
                      <span className="bg-primary-600 text-white rounded-full px-3 py-1 text-sm font-semibold shadow-lg">
                        {quantity}
                      </span>
                    )}
                  </div>
                </div>

                {/* Meal Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors">
                    {meal.name}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {meal.description}
                  </p>
                  
                  {/* Dietary Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {meal.dietary.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-secondary-100 text-secondary-700 px-2 py-1 rounded-lg text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary-600">
                      KES {meal.price.toLocaleString()}
                    </span>
                    
                    <div>
                      {!userPlan ? (
                        <div className="text-center">
                          <p className="text-xs text-gray-500 mb-2">Subscribe to add meals</p>
                          <button
                            onClick={() => router.push('/plans')}
                            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                          >
                            <span>View Plans</span>
                          </button>
                        </div>
                      ) : canAdd && quantity === 0 ? (
                        <button
                          onClick={() => handleAddMeal(meal)}
                          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                        >
                          <Plus className="h-4 w-4" />
                          <span>Add to Cart</span>
                        </button>
                      ) : canAdd && quantity > 0 ? (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleRemoveMeal(meal.id)}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-lg transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="font-semibold text-gray-800 min-w-[2rem] text-center">
                            {quantity}
                          </span>
                          <button
                            onClick={() => handleAddMeal(meal)}
                            className="bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-lg transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      ) : userPlan && !canAdd ? (
                        <div className="text-center">
                          <p className="text-xs text-gray-500 mb-2">Not in your plan</p>
                          <div className="bg-gray-100 text-gray-500 px-4 py-2 rounded-xl text-sm">
                            Not Available
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cart Summary */}
        {state.totalItems > 0 && (
          <div className="fixed bottom-6 right-6 bg-white rounded-2xl shadow-2xl p-6 max-w-sm animate-slide-up">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5 text-primary-600" />
              <span>Your Cart</span>
            </h3>
            
            <div className="space-y-2 mb-4 max-h-32 overflow-y-auto">
              {state.items.map((item) => (
                <div key={item.meal.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={item.meal.image}
                      alt={item.meal.name}
                      width={40}
                      height={40}
                      className="rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-800 text-sm">{item.meal.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-primary-600 text-sm">
                    {userPlan ? 'Included' : `KES ${(item.meal.price * item.quantity).toLocaleString()}`}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-gray-800">Total:</span>
                <span className="font-bold text-primary-600 text-lg">
                  {state.totalItems}/{userPlan?.mealsPerWeek} meals selected
                </span>
              </div>
              
              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Confirm Selection ({state.totalItems}/{userPlan?.mealsPerWeek})
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealSelection;