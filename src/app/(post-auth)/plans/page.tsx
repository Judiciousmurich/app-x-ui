'use client';

import React from 'react';
import { Check, Star, ArrowRight } from 'lucide-react';
import { useCart, Plan } from '../../context/CartContext';
import { useRouter } from 'next/navigation';

const Plans: React.FC = () => {
  const { selectPlan } = useCart();
  const router = useRouter();

  const plans: Plan[] = [
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
      ]
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
      ]
    },
    {
      id: 'social-events',
      name: 'Social Events',
      description: 'Perfect catering for parties, gatherings, and celebrations',
      price: 12000,
      currency: 'KES',
      mealsPerWeek: 0,
      benefits: [
        'Party-perfect presentations',
        'Finger foods & appetizers',
        'Themed menu options',
        'Flexible serving sizes',
        'Setup & cleanup included',
        'Last-minute booking available'
      ]
    },
    {
      id: 'private-parties',
      name: 'Private Parties',
      description: 'Intimate dining experiences for your personal celebrations',
      price: 18000,
      currency: 'KES',
      mealsPerWeek: 0,
      benefits: [
        'Personalized menu creation',
        'Chef service available',
        'Premium table settings',
        'Wine pairing suggestions',
        'Custom dietary options',
        'Full-service experience'
      ]
    },
    {
      id: 'canteen-management',
      name: 'Canteen Management',
      description: 'Complete food service management for institutions',
      price: 25000,
      currency: 'KES',
      mealsPerWeek: 21,
      benefits: [
        'Daily fresh meal preparation',
        'Nutritional meal planning',
        'Cost-effective solutions',
        'Health & safety compliance',
        'Staff training included',
        'Quality assurance program'
      ]
    },
    {
      id: 'nutritional-consultation',
      name: 'Nutritional Consultation',
      description: 'Expert guidance for healthy, balanced meal planning',
      price: 5000,
      currency: 'KES',
      mealsPerWeek: 3,
      benefits: [
        'Personalized nutrition plans',
        'Health goal alignment',
        'Dietary restriction support',
        'Monthly progress reviews',
        'Recipe recommendations',
        'Ongoing support access'
      ]
    }
  ];

  const handleSubscribe = (plan: Plan) => {
    selectPlan(plan);
    router.push('/meals');
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
              <button
                onClick={() => handleSubscribe(plan)}
                className="w-full group bg-primary-600 hover:bg-primary-700 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
              >
                <span>Subscribe Now</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
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
    </div>
  );
};

export default Plans;