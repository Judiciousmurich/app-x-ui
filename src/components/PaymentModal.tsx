'use client';

import React, { useState } from 'react';
import { X, CreditCard, Smartphone, Shield, CheckCircle } from 'lucide-react';
import { mockPaymentMethods } from '@/data/mockData';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  currency: string;
  type: 'subscription' | 'meal';
  itemName: string;
  onPaymentSuccess: (paymentData: any) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  amount,
  currency,
  type,
  itemName,
  onPaymentSuccess
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const activePaymentMethods = mockPaymentMethods.filter(method => method.isActive);

  const handlePayment = async () => {
    if (!selectedMethod) return;

    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const paymentData = {
      id: `pay-${Date.now()}`,
      amount,
      currency,
      method: selectedMethod,
      status: 'completed',
      type,
      itemName,
      transactionId: `TXN${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    setPaymentComplete(true);
    setIsProcessing(false);
    
    setTimeout(() => {
      onPaymentSuccess(paymentData);
      onClose();
      setPaymentComplete(false);
      setSelectedMethod('');
    }, 2000);
  };

  if (!isOpen) return null;

  if (paymentComplete) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-4">
            Your payment of {currency} {amount.toLocaleString()} for {itemName} has been processed successfully.
          </p>
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Complete Payment</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Payment Summary */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">Payment Summary</h3>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{itemName}</span>
              <span className="font-bold text-primary-600">
                {currency} {amount.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center space-x-2">
              <Shield className="h-5 w-5 text-secondary-600" />
              <span>Select Payment Method</span>
            </h3>
            
            <div className="space-y-3">
              {activePaymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.type)}
                  className={`w-full p-4 border-2 rounded-xl transition-all duration-300 flex items-center space-x-3 ${
                    selectedMethod === method.type
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {method.type === 'mpesa' && <Smartphone className="h-6 w-6 text-secondary-600" />}
                  {method.type === 'crypto' && <CreditCard className="h-6 w-6 text-accent-600" />}
                  {method.type === 'card' && <CreditCard className="h-6 w-6 text-blue-600" />}
                  
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-gray-800">{method.name}</p>
                    <p className="text-sm text-gray-600">
                      Supports: {method.config.supportedCurrencies.join(', ')}
                    </p>
                  </div>
                  
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedMethod === method.type
                      ? 'border-primary-600 bg-primary-600'
                      : 'border-gray-300'
                  }`}>
                    {selectedMethod === method.type && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Payment Button */}
          <button
            onClick={handlePayment}
            disabled={!selectedMethod || isProcessing}
            className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:transform-none flex items-center justify-center space-x-2"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>Pay {currency} {amount.toLocaleString()}</span>
              </>
            )}
          </button>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              Your payment is secured with 256-bit SSL encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;