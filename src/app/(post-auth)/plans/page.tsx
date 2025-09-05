'use client';

import React from 'react';
import { Check, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { Plan } from '@/types';
import { mockPlans } from '@/data/mockData';
import PaymentModal from '@/components/PaymentModal';

const Plans: React.FC = () => {
  const { user, updateUser } = useUser();
  const router = useRouter();
  const [showPaymentModal, setShowPaymentModal] = React.useState(false);
  const [selectedPlanForPayment, setSelectedPlanForPayment] = React.useState<Plan | null>(null);

  const plans = mockPlans.filter(plan => plan.isActive);

  const handleSubscribe = (plan: Plan) => {
    setSelectedPlanForPayment(plan);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (paymentData: any) => {
    if (selectedPlanForPayment && user) {
      // Update user subscription
      updateUser({
        subscription: {
          planId: selectedPlanForPayment.id,
          plan: selectedPlanForPayment.name,
          status: 'active',
          renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
          mealsRemaining: selectedPlanForPayment.mealsPerWeek * 4, // 4 weeks worth
          startDate: new Date().toISOString()
        }
      });
      
      alert(`Payment successful! You've subscribed to ${selectedPlanForPayment.name}`);
      router.push('/meals');
    }
    setSelectedPlanForPayment(null);
  };

  const isSubscribed = (planId: string) => {
    return user?.subscription?.planId === planId && user?.subscription?.status === 'active';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-primary-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Choose Your
            <br />
            <span className="text-primary-600">Meal Plan</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From budget-friendly options to premium dining experiences, find the perfect
            meal plan that fits your lifestyle and budget.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border animate-slide-up ${
                isSubscribed(plan.id) 
                  ? 'border-primary-600 bg-primary-50' 
                  : 'border-cream-200'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {isSubscribed(plan.id) && (
                <div className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
                  Current Plan
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors">
                  {plan.name}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-3 text-sm">
                  {plan.description}
                </p>

                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-primary-600">
                    {plan.price.toLocaleString()}
                  </span>
                  <span className="text-gray-500 font-medium">{plan.currency}</span>
                  <span className="text-sm text-gray-400">/ week</span>
                </div>

                <p className="text-sm text-gray-600 mt-1">
                  {plan.mealsPerWeek} meals per week
                </p>
              </div>

              {/* Benefits */}
              <div className="mb-6">
                <div className="space-y-2">
                  {plan.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-secondary-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subscribe Button */}
              <div>
                {isSubscribed(plan.id) ? (
                  <button
                    onClick={() => router.push('/meals')}
                    className="w-full bg-secondary-600 hover:bg-secondary-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    View My Meals
                  </button>
                ) : (
                  <button
                    onClick={() => handleSubscribe(plan)}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    Subscribe Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Second Row */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {plans.slice(4).map((plan, index) => (
            <div
              key={plan.id}
              className={`group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border animate-slide-up ${
                isSubscribed(plan.id) 
                  ? 'border-primary-600 bg-primary-50' 
                  : 'border-cream-200'
              }`}
              style={{ animationDelay: `${(index + 4) * 0.1}s` }}
            >
              {isSubscribed(plan.id) && (
                <div className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
                  Current Plan
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors">
                  {plan.name}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-3 text-sm">
                  {plan.description}
                </p>

                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-primary-600">
                    {plan.price.toLocaleString()}
                  </span>
                  <span className="text-gray-500 font-medium">{plan.currency}</span>
                  <span className="text-sm text-gray-400">/ week</span>
                </div>

                <p className="text-sm text-gray-600 mt-1">
                  {plan.mealsPerWeek} meals per week
                </p>
              </div>

              {/* Benefits */}
              <div className="mb-6">
                <div className="space-y-2">
                  {plan.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-secondary-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subscribe Button */}
              <div>
                {isSubscribed(plan.id) ? (
                  <button
                    onClick={() => router.push('/meals')}
                    className="w-full bg-secondary-600 hover:bg-secondary-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    View My Meals
                  </button>
                ) : (
                  <button
                    onClick={() => handleSubscribe(plan)}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    Subscribe Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-20 text-center bg-white rounded-2xl p-12 shadow-lg">
          <div className="flex items-center justify-center mb-6">
            <Star className="h-8 w-8 text-yellow-400 fill-current" />
            <Star className="h-8 w-8 text-yellow-400 fill-current" />
            <Star className="h-8 w-8 text-yellow-400 fill-current" />
            <Star className="h-8 w-8 text-yellow-400 fill-current" />
            <Star className="h-8 w-8 text-yellow-400 fill-current" />
          </div>
          <h3 className="text-3xl font-bold text-gray-800 mb-4">
            Trusted by Over 5,000+ Customers
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join Kenya's largest community of food enthusiasts who trust us with their dining experiences.
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">500+</div>
              <div className="text-gray-600">Events Catered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary-600 mb-2">50,000+</div>
              <div className="text-gray-600">Meals Delivered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent-600 mb-2">98%</div>
              <div className="text-gray-600">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedPlanForPayment && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => {
            setShowPaymentModal(false);
            setSelectedPlanForPayment(null);
          }}
          amount={selectedPlanForPayment.price}
          currency={selectedPlanForPayment.currency}
          type="subscription"
          itemName={selectedPlanForPayment.name}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};
                <button
                  onClick={() => handlePayNow(plan)}
                  className="w-full bg-secondary-600 hover:bg-secondary-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Pay Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-20 text-center bg-white rounded-2xl p-12 shadow-lg">
          <div className="flex items-center justify-center mb-6">
            <Star className="h-8 w-8 text-yellow-400 fill-current" />
            <Star className="h-8 w-8 text-yellow-400 fill-current" />
            <Star className="h-8 w-8 text-yellow-400 fill-current" />
            <Star className="h-8 w-8 text-yellow-400 fill-current" />
            <Star className="h-8 w-8 text-yellow-400 fill-current" />
          </div>
          <h3 className="text-3xl font-bold text-gray-800 mb-4">
            Trusted by Over 5,000+ Customers
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join Kenya's largest community of food enthusiasts who trust us with their dining experiences.
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">500+</div>
              <div className="text-gray-600">Events Catered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary-600 mb-2">50,000+</div>
              <div className="text-gray-600">Meals Delivered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent-600 mb-2">98%</div>
              <div className="text-gray-600">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedPlanForPayment && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => {
            setShowPaymentModal(false);
            setSelectedPlanForPayment(null);
          }}
          amount={selectedPlanForPayment.price}
          currency={selectedPlanForPayment.currency}
          type="subscription"
          itemName={selectedPlanForPayment.name}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default Plans;