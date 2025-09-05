'use client';

import React from 'react';
import { Check, Star, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { Plan } from '@/types';
import { mockPlans } from '@/data/mockData';
import PaymentModal from '@/components/PaymentModal';

const Plans: React.FC = () => {
  const { selectPlan } = useCart();
  const router = useRouter();
  const [showPaymentModal, setShowPaymentModal] = React.useState(false);
  const [selectedPlanForPayment, setSelectedPlanForPayment] = React.useState<Plan | null>(null);

  const plans = mockPlans.filter(plan => plan.isActive);

  const handleSubscribe = (plan: Plan) => {
    selectPlan(plan);
    router.push('/meals');
  };

  const handlePayNow = (plan: Plan) => {
    setSelectedPlanForPayment(plan);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (paymentData: any) => {
    alert(`Payment successful! You've subscribed to ${selectedPlanForPayment?.name}`);
    setSelectedPlanForPayment(null);
    // Here you would typically update the user's subscription status
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-primary-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Choose Your Perfect
            <br />
            <span className="text-primary-600">Culinary Experience</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From intimate private dinners to large corporate events, we have the perfect
            catering solution for every occasion.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-cream-200 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Plan Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-primary-600 transition-colors">
                  {plan.name}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {plan.description}
                </p>

                <div className="flex items-baseline space-x-2">
                  <span className="text-4xl font-bold text-primary-600">
                    {plan.price.toLocaleString()}
                  </span>
                  <span className="text-gray-500 font-medium">{plan.currency}</span>
                  {plan.mealsPerWeek > 0 && (
                    <span className="text-sm text-gray-400">/ {plan.mealsPerWeek} meals</span>
                  )}
                </div>

                <p className="text-sm text-secondary-600 mt-2 font-medium">
                  Crypto payments accepted
                </p>
              </div>

              {/* Benefits */}
              <div className="mb-8">
                <div className="space-y-3">
                  {plan.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-secondary-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subscribe Button */}
              <div className="space-y-3">
                <button
                  onClick={() => handleSubscribe(plan)}
                  className="w-full group bg-primary-600 hover:bg-primary-700 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
                >
                  <span>Subscribe & Choose Meals</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
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