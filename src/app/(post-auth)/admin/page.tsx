'use client';

import React, { useState } from 'react';
import { Users, Package, CreditCard, BarChart3, TrendingUp, DollarSign, Calendar, Plus, Edit, Trash2, Eye, ToggleLeft, ToggleRight } from 'lucide-react';
import Image from 'next/image';
import { mockPlans, mockMeals, mockUsers, mockPayments, mockPaymentMethods } from '@/data/mockData';
import { Plan, Meal, User, Payment, PaymentMethod } from '@/types';
import PlanForm from '@/components/admin/PlanForm';
import MealForm from '@/components/admin/MealForm';
import PaymentMethodForm from '@/components/admin/PaymentMethodForm';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [plans, setPlans] = useState<Plan[]>(mockPlans);
  const [meals, setMeals] = useState<Meal[]>(mockMeals);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(mockPaymentMethods);
  
  // Form states
  const [showPlanForm, setShowPlanForm] = useState(false);
  const [showMealForm, setShowMealForm] = useState(false);
  const [showPaymentMethodForm, setShowPaymentMethodForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | undefined>();
  const [editingMeal, setEditingMeal] = useState<Meal | undefined>();
  const [editingPaymentMethod, setEditingPaymentMethod] = useState<PaymentMethod | undefined>();

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="h-5 w-5" /> },
    { id: 'plans', label: 'Manage Plans', icon: <Package className="h-5 w-5" /> },
    { id: 'meals', label: 'Manage Meals', icon: <Calendar className="h-5 w-5" /> },
    { id: 'subscribers', label: 'Subscribers', icon: <Users className="h-5 w-5" /> },
    { id: 'payments', label: 'Payments', icon: <CreditCard className="h-5 w-5" /> },
    { id: 'payment-methods', label: 'Payment Methods', icon: <CreditCard className="h-5 w-5" /> },
  ];

  const stats = [
    {
      title: 'Total Revenue',
      value: 'KES 2,450,000',
      change: '+12.5%',
      icon: <DollarSign className="h-8 w-8 text-secondary-600" />,
      bgColor: 'from-secondary-50 to-secondary-100',
      textColor: 'text-secondary-600'
    },
    {
      title: 'Active Subscribers',
      value: '1,234',
      change: '+8.3%',
      icon: <Users className="h-8 w-8 text-primary-600" />,
      bgColor: 'from-primary-50 to-primary-100',
      textColor: 'text-primary-600'
    },
    {
      title: 'Monthly Orders',
      value: '5,678',
      change: '+15.7%',
      icon: <Package className="h-8 w-8 text-accent-600" />,
      bgColor: 'from-accent-50 to-accent-100',
      textColor: 'text-accent-600'
    },
    {
      title: 'Customer Satisfaction',
      value: '98%',
      change: '+2.1%',
      icon: <TrendingUp className="h-8 w-8 text-yellow-600" />,
      bgColor: 'from-yellow-50 to-yellow-100',
      textColor: 'text-yellow-600'
    }
  ];

  // CRUD Functions
  const handleSavePlan = (planData: Omit<Plan, 'id' | 'createdAt'>) => {
    if (editingPlan) {
      setPlans(prev => prev.map(plan => 
        plan.id === editingPlan.id 
          ? { ...planData, id: editingPlan.id, createdAt: editingPlan.createdAt }
          : plan
      ));
    } else {
      const newPlan: Plan = {
        ...planData,
        id: `plan-${Date.now()}`,
        createdAt: new Date().toISOString()
      };
      setPlans(prev => [...prev, newPlan]);
    }
    setShowPlanForm(false);
    setEditingPlan(undefined);
  };

  const handleDeletePlan = (planId: string) => {
    if (confirm('Are you sure you want to delete this plan?')) {
      setPlans(prev => prev.filter(plan => plan.id !== planId));
    }
  };

  const handleSaveMeal = (mealData: Omit<Meal, 'id' | 'createdAt'>) => {
    if (editingMeal) {
      setMeals(prev => prev.map(meal => 
        meal.id === editingMeal.id 
          ? { ...mealData, id: editingMeal.id, createdAt: editingMeal.createdAt }
          : meal
      ));
    } else {
      const newMeal: Meal = {
        ...mealData,
        id: `meal-${Date.now()}`,
        createdAt: new Date().toISOString()
      };
      setMeals(prev => [...prev, newMeal]);
    }
    setShowMealForm(false);
    setEditingMeal(undefined);
  };

  const handleDeleteMeal = (mealId: string) => {
    if (confirm('Are you sure you want to delete this meal?')) {
      setMeals(prev => prev.filter(meal => meal.id !== mealId));
    }
  };

  const handleSavePaymentMethod = (paymentMethodData: Omit<PaymentMethod, 'id' | 'createdAt'>) => {
    if (editingPaymentMethod) {
      setPaymentMethods(prev => prev.map(pm => 
        pm.id === editingPaymentMethod.id 
          ? { ...paymentMethodData, id: editingPaymentMethod.id, createdAt: editingPaymentMethod.createdAt }
          : pm
      ));
    } else {
      const newPaymentMethod: PaymentMethod = {
        ...paymentMethodData,
        id: `pm-${Date.now()}`,
        createdAt: new Date().toISOString()
      };
      setPaymentMethods(prev => [...prev, newPaymentMethod]);
    }
    setShowPaymentMethodForm(false);
    setEditingPaymentMethod(undefined);
  };

  const togglePaymentMethod = (paymentMethodId: string) => {
    setPaymentMethods(prev => prev.map(pm => 
      pm.id === paymentMethodId 
        ? { ...pm, isActive: !pm.isActive }
        : pm
    ));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8 animate-fade-in">
            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${stat.bgColor} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-slide-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 bg-white rounded-xl shadow-md ${stat.textColor}`}>
                      {stat.icon}
                    </div>
                    <span className="text-sm font-semibold text-secondary-600 bg-secondary-100 px-2 py-1 rounded-lg">
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-1">{stat.title}</h3>
                  <p className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Charts and Analytics */}
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Popular Plans</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Corporate Catering</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="w-16 bg-primary-600 h-2 rounded-full"></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-600">67%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Premium Catering</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="w-12 bg-secondary-600 h-2 rounded-full"></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-600">45%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Social Events</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="w-8 bg-accent-600 h-2 rounded-full"></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-600">32%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Subscribers</h3>
                <div className="space-y-4">
                  {users.slice(0, 4).map((subscriber, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-cream-50 rounded-xl">
                      <div>
                        <p className="font-semibold text-gray-800">{subscriber.name}</p>
                        <p className="text-sm text-gray-600">{subscriber.subscription?.plan || 'No subscription'}</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-2 py-1 rounded-lg text-xs font-semibold ${
                          subscriber.subscription?.status === 'active' ? 'bg-secondary-100 text-secondary-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {subscriber.subscription?.status || 'inactive'}
                        </span>
                        <p className="text-sm text-gray-500 mt-1">{new Date(subscriber.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'plans':
        return (
          <div className="bg-white rounded-2xl p-8 shadow-lg animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Manage Plans</h2>
              <button
                onClick={() => setShowPlanForm(true)}
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-xl font-medium transition-colors flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add Plan</span>
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Plan</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Price</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Meals/Week</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {plans.map((plan) => (
                    <tr key={plan.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-semibold text-gray-800">{plan.name}</p>
                          <p className="text-sm text-gray-600">{plan.description}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-semibold text-primary-600">
                        {plan.currency} {plan.price.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-gray-700">{plan.mealsPerWeek}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                          plan.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {plan.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              setEditingPlan(plan);
                              setShowPlanForm(true);
                            }}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeletePlan(plan.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'meals':
        return (
          <div className="bg-white rounded-2xl p-8 shadow-lg animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Manage Meals</h2>
              <button
                onClick={() => setShowMealForm(true)}
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-xl font-medium transition-colors flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add Meal</span>
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {meals.map((meal) => (
                <div key={meal.id} className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                  <Image
                    src={meal.image}
                    alt={meal.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-800">{meal.name}</h3>
                      <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                        meal.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {meal.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{meal.description}</p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-primary-600">KES {meal.price.toLocaleString()}</span>
                      <span className="text-sm text-gray-500">{meal.calories} cal</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setEditingMeal(meal);
                          setShowMealForm(true);
                        }}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-center space-x-1"
                      >
                        <Edit className="h-3 w-3" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteMeal(meal.id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-center space-x-1"
                      >
                        <Trash2 className="h-3 w-3" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'subscribers':
        return (
          <div className="bg-white rounded-2xl p-8 shadow-lg animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Subscriber Management</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">User</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Subscription</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Renewal Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Meals Remaining</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-semibold text-gray-800">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <p className="text-sm text-gray-500">{user.phone}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-medium text-gray-800">
                          {user.subscription?.plan || 'No subscription'}
                        </p>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                          user.subscription?.status === 'active' ? 'bg-green-100 text-green-800' :
                          user.subscription?.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {user.subscription?.status || 'inactive'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        {user.subscription?.renewalDate ? new Date(user.subscription.renewalDate).toLocaleDateString() : '-'}
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        {user.subscription?.mealsRemaining || 0}
                      </td>
                      <td className="py-3 px-4">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'payments':
        return (
          <div className="bg-white rounded-2xl p-8 shadow-lg animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Management</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Transaction ID</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">User</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Method</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-mono text-sm text-gray-700">
                        {payment.transactionId}
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-medium text-gray-800">{payment.userName}</p>
                      </td>
                      <td className="py-3 px-4 font-semibold text-primary-600">
                        {payment.currency} {payment.amount.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium uppercase">
                          {payment.method}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium capitalize">
                          {payment.type}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                          payment.status === 'completed' ? 'bg-green-100 text-green-800' :
                          payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          payment.status === 'failed' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {payment.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(payment.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'payment-methods':
        return (
          <div className="bg-white rounded-2xl p-8 shadow-lg animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Payment Methods</h2>
              <button
                onClick={() => setShowPaymentMethodForm(true)}
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-xl font-medium transition-colors flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add Payment Method</span>
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paymentMethods.map((method) => (
                <div key={method.id} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800">{method.name}</h3>
                    <button
                      onClick={() => togglePaymentMethod(method.id)}
                      className={`p-1 rounded-lg transition-colors ${
                        method.isActive ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-100'
                      }`}
                    >
                      {method.isActive ? <ToggleRight className="h-6 w-6" /> : <ToggleLeft className="h-6 w-6" />}
                    </button>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Type:</span> {method.type.toUpperCase()}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Currencies:</span> {method.config.supportedCurrencies.join(', ')}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Status:</span> 
                      <span className={`ml-1 px-2 py-1 rounded text-xs font-semibold ${
                        method.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {method.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </p>
                  </div>
                  
                  <button
                    onClick={() => {
                      setEditingPaymentMethod(method);
                      setShowPaymentMethodForm(true);
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center justify-center space-x-2"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-primary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Admin Dashboard</h1>
          <p className="text-xl text-gray-600">Manage your Foodies Kitchen business</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
              <nav className="space-y-2">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-xl font-medium transition-all duration-300 ${
                      activeTab === item.id
                        ? 'bg-primary-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Forms */}
      {showPlanForm && (
        <PlanForm
          plan={editingPlan}
          onSave={handleSavePlan}
          onCancel={() => {
            setShowPlanForm(false);
            setEditingPlan(undefined);
          }}
        />
      )}

      {showMealForm && (
        <MealForm
          meal={editingMeal}
          onSave={handleSaveMeal}
          onCancel={() => {
            setShowMealForm(false);
            setEditingMeal(undefined);
          }}
        />
      )}

      {showPaymentMethodForm && (
        <PaymentMethodForm
          paymentMethod={editingPaymentMethod}
          onSave={handleSavePaymentMethod}
          onCancel={() => {
            setShowPaymentMethodForm(false);
            setEditingPaymentMethod(undefined);
          }}
        />
      )}
    </div>
  );
};

export default AdminDashboard;