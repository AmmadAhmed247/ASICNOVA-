import React, { useState, useEffect } from 'react';
import { Check, Package, Truck, Mail, ArrowRight } from 'lucide-react';

const SubmitStep = ({ calculateTotal = () => 0, orderData = {}, totalAmount }) => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Get total amount - use totalAmount prop if provided, otherwise calculate
  const getTotal = () => {
    if (totalAmount !== undefined) return totalAmount;
    try {
      return calculateTotal();
    } catch (error) {
      console.warn('calculateTotal function error:', error);
      return 0;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Success Animation */}
      <div className={`bg-gradient-to-br from-blue-100 to-blue-300 p-8 rounded-2xl shadow-xl mb-8 text-center border border-green-100 transform transition-all duration-700 ${
        isAnimated ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`}>
        
        {/* Success Icon */}
        <div className="relative mx-auto mb-6">
          <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto shadow-lg animate-pulse">
            <Check className="w-10 h-10 text-white stroke-[3]" />
          </div>
          <div className="absolute inset-0 w-20 h-20 bg-blue-400 rounded-full animate-ping opacity-20 mx-auto"></div>
        </div>

        {/* Main Message */}
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Order Submitted Successfully! 
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Thank you for your order. We're processing it now.
        </p>

        {/* Order Total */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 mb-6 border border-green-200/50">
          <p className="text-gray-600 text-sm uppercase tracking-wide mb-2">Total Amount</p>
          <p className="text-4xl font-bold text-blue-400">
            ${getTotal().toLocaleString()}
          </p>
        </div>

        {/* Order Details */}
        {orderData && (
          <div className="bg-white/50 rounded-xl p-4 mb-6 text-left">
            <h3 className="font-semibold text-gray-800 mb-3 text-center">Order Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-mono font-medium">#{orderData.id || 'ORD-' + Date.now()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-medium">{orderData.selectedCoin || 'Cryptocurrency'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Order Date:</span>
                <span className="font-medium">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Next Steps */}
     

     
       

      {/* Contact Info */}
      <div className="mt-8 text-center">
        <p className="text-gray-500 text-sm">
          Need help? Contact us at{' '}
          <a href="mailto:support@example.com" className="text-blue-600 hover:underline font-medium">
            support@ASICNOVA.com
          </a>
          {' '}or call{' '}
          <a href="tel:+1234567890" className="text-blue-600 hover:underline font-medium">
            (123) 456-7890
          </a>
        </p>
      </div>
    </div>
  );
};

export default SubmitStep;