'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Minus, ShoppingCart, Filter } from 'lucide-react';
import { useCart } from '../../../context/CartContext';
import { Meal } from '@/types';
import { useRouter } from 'next/navigation';
import { mockMeals } from '@/data/mockData';
import PaymentModal from '@/components/PaymentModal';

const MealSelection: React.FC = () => {
  const { state, addMeal, removeMeal } = useCart();
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedMealForPayment, setSelectedMealForPayment] = useState<Meal | null>(null);

  const meals = mockMeals.filter(meal => meal.isActive);

  const dietaryFilters = ['All', 'Vegetarian', 'Vegan', 'Protein-Rich', 'Comfort Food', 'Light & Fresh'];

  const filteredMeals = selectedFilter === 'All' 
    ? meals 
    : meals.filter(meal => meal.dietary.includes(selectedFilter));

  const getItemQuantity = (mealId: string) => {
    const item = state.items.find(item => item.meal.id === mealId);
    return item ? item.quantity : 0;
  };

  const handleAddMeal = (meal: Meal) => {
    addMeal(meal);
  };

  const handleRemoveMeal = (mealId: string) => {
    removeMeal(mealId);
  };

  const handleProceedToCheckout = () => {
    router.push('/checkout');
  };

  const handleBuyNow = (meal: Meal) => {
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
            Choose Your
            <br />
            <span className="text-primary-600">Delicious Meals</span>
          </h1>
          
          {state.selectedPlan && (
            <div className="bg-white rounded-xl p-4 mb-6 inline-block shadow-lg">
              <p className="text-lg font-semibold text-gray-800">
                Selected Plan: <span className="text-primary-600">{state.selectedPlan.name}</span>
              </p>
              {state.selectedPlan.mealsPerWeek > 0 && (
                <p className="text-sm text-gray-600">
                  Choose {state.selectedPlan.mealsPerWeek} meals for this week
                </p>
              )}
            </div>
          )}

          {/* Progress Counter */}
          {state.selectedPlan && state.selectedPlan.mealsPerWeek > 0 && (
            <div className="bg-primary-600 text-white rounded-xl p-4 mb-6 inline-block">
              <p className="text-lg font-semibold">
                Meals Chosen: {state.totalItems}/{state.selectedPlan.mealsPerWeek}
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
                    
                    <div className="flex flex-col space-y-2">
                      {quantity === 0 ? (
                        <button
                          onClick={() => handleAddMeal(meal)}
                          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                        >
                          <Plus className="h-4 w-4" />
                          <span>Add to Cart</span>
                        </button>
                      ) : (
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
                      )}
                      
                      <button
                        onClick={() => handleBuyNow(meal)}
                        className="bg-secondary-600 hover:bg-secondary-700 text-white px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 text-sm"
                      >
                        Buy Now
                      </button>
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
                    KES {(item.meal.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-gray-800">Total:</span>
                <span className="font-bold text-primary-600 text-lg">
                  KES {state.totalPrice.toLocaleString()}
                </span>
              </div>
              
              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedMealForPayment && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => {
            setShowPaymentModal(false);
            setSelectedMealForPayment(null);
          }}
          amount={selectedMealForPayment.price}
          currency="KES"
          type="meal"
          itemName={selectedMealForPayment.name}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default MealSelection;
                        <button
                          onClick={() => handleAddMeal(meal)}
                          className="bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-lg transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        <button
                          onClick={() => handleAddMeal(meal)}
                          className="bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-lg transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    )}
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
                    KES {(item.meal.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-gray-800">Total:</span>
                <span className="font-bold text-primary-600 text-lg">
                  KES {state.totalPrice.toLocaleString()}
                </span>
              </div>
              
              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedMealForPayment && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => {
            setShowPaymentModal(false);
            setSelectedMealForPayment(null);
          }}
          amount={selectedMealForPayment.price}
          currency="KES"
          type="meal"
          itemName={selectedMealForPayment.name}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default MealSelection;