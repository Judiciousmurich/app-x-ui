'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  Calendar, 
  CreditCard, 
  User, 
  Package, 
  Play, 
  Pause, 
  SkipForward, 
  X 
} from 'lucide-react';

const UserDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('subscription');

  const subscription = {
    plan: 'Premium Catering',
    status: 'active',
    renewalDate: '2025-02-15',
    mealsThisWeek: 7,
    nextDelivery: '2025-01-20'
  };

  const upcomingMeals = [
    { name: 'Tuscan Herb Chicken', image: 'https://images.pexels.com/photos/106343/pexels-photo-106343.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Mediterranean Salmon', image: 'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Spicy Thai Curry', image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=400' },
  ];

  const tabs = [
    { id: 'subscription', name: 'My Subscription', icon: Package },
    { id: 'menu', name: 'Weekly Menu', icon: Calendar },
    { id: 'payments', name: 'Payments', icon: CreditCard },
    { id: 'profile', name: 'Profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Dashboard</h1>
          <p className="text-gray-600">Manage your subscription and preferences</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-2xl shadow-md p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                      activeTab === tab.id
                        ? 'bg-orange-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <tab.icon className="h-5 w-5" />
                    <span className="font-medium">{tab.name}</span>
                  </motion.button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'subscription' && (
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Subscription Overview */}
                <div className="bg-white rounded-2xl shadow-md p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Subscription Overview</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-orange-50 p-6 rounded-xl">
                      <h3 className="font-semibold text-orange-800 mb-2">Current Plan</h3>
                      <p className="text-2xl font-bold text-orange-600">{subscription.plan}</p>
                    </div>
                    <div className="bg-green-50 p-6 rounded-xl">
                      <h3 className="font-semibold text-green-800 mb-2">Status</h3>
                      <p className="text-2xl font-bold text-green-600 capitalize">{subscription.status}</p>
                    </div>
                    <div className="bg-blue-50 p-6 rounded-xl">
                      <h3 className="font-semibold text-blue-800 mb-2">Next Delivery</h3>
                      <p className="text-lg font-bold text-blue-600">{subscription.nextDelivery}</p>
                    </div>
                  </div>

                  {/* Subscription Controls */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { icon: SkipForward, text: 'Skip Week', color: 'blue' },
                      { icon: Pause, text: 'Pause', color: 'yellow' },
                      { icon: Play, text: 'Change Plan', color: 'green' },
                      { icon: X, text: 'Cancel', color: 'red' },
                    ].map((action, index) => (
                      <motion.button
                        key={action.text}
                        className={`p-4 border-2 rounded-lg flex flex-col items-center space-y-2 transition-all hover:shadow-md ${
                          action.color === 'blue' ? 'border-blue-200 hover:border-blue-400 hover:bg-blue-50' :
                          action.color === 'yellow' ? 'border-yellow-200 hover:border-yellow-400 hover:bg-yellow-50' :
                          action.color === 'green' ? 'border-green-200 hover:border-green-400 hover:bg-green-50' :
                          'border-red-200 hover:border-red-400 hover:bg-red-50'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <action.icon className={`h-6 w-6 ${
                          action.color === 'blue' ? 'text-blue-600' :
                          action.color === 'yellow' ? 'text-yellow-600' :
                          action.color === 'green' ? 'text-green-600' :
                          'text-red-600'
                        }`} />
                        <span className="text-sm font-medium text-gray-700">{action.text}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Upcoming Meals */}
                <div className="bg-white rounded-2xl shadow-md p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">This Week's Menu</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {upcomingMeals.map((meal, index) => (
                      <motion.div
                        key={meal.name}
                        className="bg-gray-50 rounded-xl p-4 text-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <Image
                          src={meal.image}
                          alt={meal.name}
                          width={300}
                          height={200}
                          className="w-full h-32 object-cover rounded-lg mb-3"
                        />
                        <p className="font-semibold text-gray-900">{meal.name}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'menu' && (
              <motion.div 
                className="bg-white rounded-2xl shadow-md p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Weekly Menu</h2>
                <p className="text-gray-600 mb-8">Your personalized menu for this week</p>
                
                {/* Menu Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingMeals.map((meal, index) => (
                    <motion.div
                      key={meal.name}
                      className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <Image
                        src={meal.image}
                        alt={meal.name}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">{meal.name}</h3>
                        <p className="text-sm text-gray-600">Scheduled for delivery</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'payments' && (
              <motion.div 
                className="bg-white rounded-2xl shadow-md p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment History</h2>
                <p className="text-gray-600 mb-8">View your payment history and update payment methods</p>
                
                {/* Payment History Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Method</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { date: '2025-01-15', amount: 'KES 15,000', method: 'M-PESA', status: 'Completed' },
                        { date: '2024-12-15', amount: 'KES 15,000', method: 'Crypto', status: 'Completed' },
                        { date: '2024-11-15', amount: 'KES 15,000', method: 'M-PESA', status: 'Completed' },
                      ].map((payment, index) => (
                        <motion.tr
                          key={index}
                          className="border-b border-gray-100 hover:bg-gray-50"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <td className="py-3 px-4 text-gray-700">{payment.date}</td>
                          <td className="py-3 px-4 text-gray-700 font-semibold">{payment.amount}</td>
                          <td className="py-3 px-4 text-gray-700">{payment.method}</td>
                          <td className="py-3 px-4">
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-lg text-sm font-medium">
                              {payment.status}
                            </span>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'profile' && (
              <motion.div 
                className="bg-white rounded-2xl shadow-md p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h2>
                <p className="text-gray-600 mb-8">Update your personal information and preferences</p>
                
                {/* Profile Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="+254 7XX XXX XXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Nairobi"
                    />
                  </div>
                </div>
                
                <motion.button
                  className="mt-6 bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Update Profile
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;