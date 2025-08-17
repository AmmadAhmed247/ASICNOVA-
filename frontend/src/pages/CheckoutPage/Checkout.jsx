import React, { useState } from 'react';
import { Check } from 'lucide-react';

export default function Checkout() {
  const [selectedShipping, setSelectedShipping] = useState('havelian');
  const [billingOption, setBillingOption] = useState('same');
  const [shippingMethod, setShippingMethod] = useState('FedEX');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const shippingAddresses = [
    {
      id: 'havelian',
      address: 'Havelian, Abbottabad, 22500, Khyber Pakhtunkhwa, Pakistan',
      isDefault: true
    },
    {
      id: 'peshawar',
      address: 'Peshawar, 25000, Khyber Pakhtunkhwa, Pakistan',
      isDefault: false
    }
  ];

  const handleSubmit = () => {
    if (acceptedTerms) {
      console.log('Order submitted');
 
    } else {
      alert('Please accept the terms and conditions');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
     
      <div className="bg-white py-8 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center space-x-8 md:space-x-16">
            {/* Shopping Cart - Active */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white mb-2">
                <Check size={20} />
              </div>
              <span className="text-sm font-medium text-gray-900">Shopping Cart</span>
            </div>
            
            {/* Connector */}
            <div className="w-12 h-0.5 bg-gray-300"></div>
            
            {/* Order Info - Active */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 mb-2">
                <Check size={20} />
              </div>
              <span className="text-sm font-medium text-gray-500">Order Info</span>
            </div>
            
            {/* Connector */}
            <div className="w-12 h-0.5 bg-gray-300"></div>
            
            {/* Pay Order */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 mb-2">
                <Check size={20} />
              </div>
              <span className="text-sm font-medium text-gray-500">Pay Order</span>
            </div>
            
            {/* Connector */}
            <div className="w-12 h-0.5 bg-gray-300"></div>
            
            {/* Submit Order */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 mb-2">
                <Check size={20} />
              </div>
              <span className="text-sm font-medium text-gray-500">Submit Order</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Shipping Address */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 border-l-4 border-blue-500 pl-4">
                Shipping Address
              </h2>
              <button className="text-blue-500 hover:scale-105 transition-all font-semibold">
                + New Address
              </button>
            </div>
            
            <div className="space-y-4">
              {shippingAddresses.map((address) => (
                <div key={address.id} className="flex items-center justify-between">
                  <label className="flex items-center space-x-3 cursor-pointer flex-1">
                    <input
                      type="radio"
                      name="shipping"
                      value={address.id}
                      checked={selectedShipping === address.id}
                      onChange={(e) => setSelectedShipping(e.target.value)}
                      className="hidden"
                    />
                    <div className={`px-4 py-3 rounded-lg border-2 flex-1 transition-colors ${
                      selectedShipping === address.id 
                        ? 'bg-blue-500 text-white border-blue-500' 
                        : 'bg-gray-100 text-gray-700 border-gray-200'
                    }`}>
                      <div className="flex items-center font-semibold space-x-2">
                        <Check size={16} className={selectedShipping === address.id ? 'text-white' : 'text-gray-400'} />
                        <span>{address.address}</span>
                      </div>
                    </div>
                  </label>
                  <button className={`ml-4 px-4 py-2 rounded-lg font-medium ${
                    address.isDefault 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    Default
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Billing Address */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 border-l-4 border-blue-500 pl-4">
              Billing Address
            </h2>
            
            <div className="flex space-x-4">
              <button
                onClick={() => setBillingOption('same')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  billingOption === 'same'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 border border-gray-200'
                }`}
              >
                Same as Billing Address
              </button>
              <button
                onClick={() => setBillingOption('different')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  billingOption === 'different'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 border border-gray-200'
                }`}
              >
                Bill to different Address
              </button>
            </div>
          </div>
        </div>

        {/* Shipping Method */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 border-l-4 border-blue-500 pl-4">
              Shipping Method
            </h2>
            
            <div className="flex space-x-4">
              <button
                onClick={() => setShippingMethod('DHL')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  shippingMethod === 'DHL'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 border border-gray-200'
                }`}
              >
                DHL
              </button>
              <button
                onClick={() => setShippingMethod('FedEX')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  shippingMethod === 'FedEX'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 border border-gray-200'
                }`}
              >
                FedEX
              </button>
            </div>
          </div>
        </div>

        {/* Shopping List */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 border-l-4 border-blue-600 pl-4">
              Shopping List
            </h2>
            
            <div className="border rounded-lg p-6">
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                  <img src="/dummy.jpg" alt="" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Bitcoin Miner S23 HYD</h3>
                </div>
                
                <div className="text-right space-y-2">
                  <div className="grid grid-cols-3 gap-8 text-sm text-gray-600">
                    <div>
                      <div className="font-medium">Price</div>
                      <div>$17400</div>
                    </div>
                    <div>
                      <div className="font-medium">Weight</div>
                      <div>14.80 kg</div>
                    </div>
                    <div>
                      <div className="font-medium">Total Price</div>
                      <div>14.80 kg</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Coupons */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <h2 className="text-xl font-semibold text-gray-900 border-l-4 border-blue-600 pl-4">
                Coupons
              </h2>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">3 limitations</span>
            </div>
            
            <div className="bg-gray-50 border rounded-lg p-4 mb-4">
              <p className="text-gray-500">No available coupons</p>
            </div>
            
            <div className="text-right text-sm text-gray-600 mb-6">
              <span>Coupon Amount: </span>
              <span className="text-blue-600">$0.00</span>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Product Price:</span>
                <span className="font-medium">$17,400</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping Cost:</span>
                <span className="font-medium">$0.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Coupon:</span>
                <span className="font-medium">-$0.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Discount:</span>
                <span className="font-medium">-$0.00</span>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total Amount:</span>
                <span>$17,400</span>
              </div>
            </div>
            
            <div className="mt-6">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600">
                  I have read and accepted ASICNOVA Sales Policy and Terms that apply to this purchase
                </span>
              </label>
            </div>
            
            <button
              onClick={handleSubmit}
              disabled={!acceptedTerms}
              className={`w-full mt-6 px-6 py-3 rounded-lg font-medium transition-colors ${
                acceptedTerms
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}