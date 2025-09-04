'use client';

import React, { useState } from 'react';
import { Users, Package, CreditCard, BarChart3, TrendingUp, DollarSign, Calendar } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="h-5 w-5" /> },
    { id: 'plans', label: 'Manage Plans', icon: <Package className="h-5 w-5" /> },
    { id: 'meals', label: 'Manage Meals', icon: <Calendar className="h-5 w-5" /> },
    { id: 'subscribers', label: 'Subscribers', icon: <Users className="h-5 w-5" /> },
    { id: 'payments', label: 'Payments', icon: <CreditCard className="h-5 w-5" /> },
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

  const recentSubscribers = [
    { name: 'Sarah Kimani', plan: 'Premium Catering', status: 'active', date: '2025-01-01' },
    { name: 'Michael Ochieng', plan: 'Corporate Catering', status: 'active', date: '2025-01-02' },
    { name: 'Grace Wanjiku', plan: 'Social Events', status: 'paused', date: '2024-12-28' },
    { name: 'David Mwangi', plan: 'Private Parties', status: 'active', date: '2025-01-02' }
  ];

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
                  {recentSubscribers.map((subscriber, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-cream-50 rounded-xl">
                      <div>
                        <p className="font-semibold text-gray-800">{subscriber.name}</p>
                        <p className="text-sm text-gray-600">{subscriber.plan}</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-2 py-1 rounded-lg text-xs font-semibold ${
                          subscriber.status === 'active' ? 'bg-secondary-100 text-secondary-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {subscriber.status}
                        </span>
                        <p className="text-sm text-gray-500 mt-1">{subscriber.date}</p>
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
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Plans</h2>
            <p className="text-gray-600">Plan management features coming soon!</p>
          </div>
        );

      case 'meals':
        return (
          <div className="bg-white rounded-2xl p-8 shadow-lg animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Meals</h2>
            <p className="text-gray-600">Meal management features coming soon!</p>
          </div>
        );

      case 'subscribers':
        return (
          <div className="bg-white rounded-2xl p-8 shadow-lg animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Subscriber Management</h2>
            <p className="text-gray-600">Subscriber management features coming soon!</p>
          </div>
        );

      case 'payments':
        return (
          <div className="bg-white rounded-2xl p-8 shadow-lg animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Management</h2>
            <p className="text-gray-600">Payment management features coming soon!</p>
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
    </div>
  );
};

export default AdminDashboard;