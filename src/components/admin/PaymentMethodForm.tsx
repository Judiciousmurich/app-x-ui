'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { PaymentMethod } from '@/types';

interface PaymentMethodFormProps {
  paymentMethod?: PaymentMethod;
  onSave: (paymentMethod: Omit<PaymentMethod, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

const PaymentMethodForm: React.FC<PaymentMethodFormProps> = ({ paymentMethod, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'mpesa' as 'mpesa' | 'crypto' | 'card',
    isActive: true,
    config: {
      apiKey: '',
      merchantId: '',
      webhookUrl: '',
      supportedCurrencies: ['KES']
    }
  });

  useEffect(() => {
    if (paymentMethod) {
      setFormData({
        name: paymentMethod.name,
        type: paymentMethod.type,
        isActive: paymentMethod.isActive,
        config: paymentMethod.config
      });
    }
  }, [paymentMethod]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (name.startsWith('config.')) {
      const configKey = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        config: {
          ...prev.config,
          [configKey]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      }));
    }
  };

  const handleCurrencyChange = (currencies: string) => {
    const currencyArray = currencies.split(',').map(c => c.trim()).filter(c => c);
    setFormData(prev => ({
      ...prev,
      config: {
        ...prev.config,
        supportedCurrencies: currencyArray
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            {paymentMethod ? 'Edit Payment Method' : 'Add Payment Method'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Payment Method Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Type *
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              required
            >
              <option value="mpesa">M-PESA</option>
              <option value="crypto">Cryptocurrency</option>
              <option value="card">Credit Card</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              API Key
            </label>
            <input
              type="text"
              name="config.apiKey"
              value={formData.config.apiKey}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              placeholder="Enter API key"
            />
          </div>

          {formData.type !== 'crypto' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Merchant ID
              </label>
              <input
                type="text"
                name="config.merchantId"
                value={formData.config.merchantId}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                placeholder="Enter merchant ID"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Webhook URL
            </label>
            <input
              type="url"
              name="config.webhookUrl"
              value={formData.config.webhookUrl}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              placeholder="https://api.foodieskitchen.com/webhooks/..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Supported Currencies (comma-separated)
            </label>
            <input
              type="text"
              value={formData.config.supportedCurrencies.join(', ')}
              onChange={(e) => handleCurrencyChange(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              placeholder="KES, USD, BTC, ETH"
            />
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={formData.isActive}
              onChange={handleInputChange}
              className="h-4 w-4 text-primary-600 focus:ring-primary-600 border-gray-300 rounded"
            />
            <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
              Payment method is active
            </label>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl transition-colors"
            >
              {paymentMethod ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentMethodForm;