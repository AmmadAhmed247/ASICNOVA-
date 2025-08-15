import React, { useState } from 'react';
import { Search, ShoppingCart, User, Globe, ChevronDown } from 'lucide-react';
import Footer from '../../components/footer';
export default function SinglePage() {
  const [activeTab, setActiveTab] = useState('performance');
  const [quantity, setQuantity] = useState(1);

  const tabs = [
    { id: 'performance', label: 'Performance Curve' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'purchasing', label: 'Purchasing Guidelines' },
    { id: 'warranty', label: 'Warranty' },
    { id: 'reviews', label: 'Customer Reviews' }
  ];

  const specifications = [
    { label: 'Model', value: 'S23 HYD' },
    { label: 'Size', value: '64x7' },
    { label: 'Version', value: '1G' },
    { label: 'Crypto algorithm/coins', value: 'SHA256/BTC/BCH/BSV' },
    { label: 'Typical hashrate, TH/s(-5)', value: '648' },
    { label: 'Power on wall @25°C(-5), W(±5%)', value: '2850' },
    { label: 'Power efficiency on wall @25°C(-5), J/TH(-5)', value: '5.5' },
    { label: 'Power on wall @35°C(-5), W(±5%)', value: '2910' }
  ];

  const powerSupply = [
    { label: 'Phase', value: '3' },
    { label: 'Input voltage, V(AC)', value: '380-415' },
    { label: 'Input frequency range, Hz', value: '50-60' },
    { label: 'Input line current, Amp', value: '5A' }
  ];

  const hardware = [
    { label: 'Networking connection mode', value: 'RJ45 Ethernet 10/100M' },
    { label: 'Server size (length*width*height), w/o package), mm', value: '430*195*209' },
    { label: 'Server size (length*width*height, w/o package), mm', value: '570*318*420' },
    { label: 'Net weight, kg', value: '15.5' },
    { label: 'Gross weight, kg', value: '16.8' }
  ];

  const environment = [
    { label: 'Site coolant temperature, °C', value: '20-50' },
    { label: 'Coolant flow, L/min', value: '8.0-10.0' },
    { label: 'Coolant pressure, bar', value: '<0.5' },
    { label: 'Working coolant(-5)', value: 'Antifreezing/Pure water/Deionized water' },
    { label: 'Diameter of coolant pipe connector, mm', value: 'OD10' }
  ];

  const renderTabContent = () => {
    switch(activeTab) {
      case 'performance':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Performance Curves</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div>1. Hashrate vs. Wall coolant temperature</div>
                <div>2. Power Efficiency vs. Wall coolant temperature</div>
                <div className="text-xs">
                  (*) All the thermal tests and power efficiency on wall are of typical values. The actual hashrate value fluctuates by ±5%, and the actual power efficiency will fluctuates by ±5%.
                </div>
              </div>
            </div>
          </div>
        );

      case 'specifications':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b">
                <h3 className="font-semibold">Product Glance</h3>
              </div>
              <div className="divide-y">
                {specifications.map((spec, index) => (
                  <div key={index} className={`px-4 py-3 grid grid-cols-2 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                    <div className="font-medium text-gray-700">{spec.label}</div>
                    <div className="text-gray-900">{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b">
                <h3 className="font-semibold">Power Supply</h3>
              </div>
              <div className="divide-y">
                {powerSupply.map((item, index) => (
                  <div key={index} className={`px-4 py-3 grid grid-cols-2 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                    <div className="font-medium text-gray-700">{item.label}</div>
                    <div className="text-gray-900">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b">
                <h3 className="font-semibold">Hardware Configuration</h3>
              </div>
              <div className="divide-y">
                {hardware.map((item, index) => (
                  <div key={index} className={`px-4 py-3 grid grid-cols-2 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                    <div className="font-medium text-gray-700">{item.label}</div>
                    <div className="text-gray-900">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b">
                <h3 className="font-semibold">Environment Requirements</h3>
              </div>
              <div className="divide-y">
                {environment.map((item, index) => (
                  <div key={index} className={`px-4 py-3 grid grid-cols-2 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                    <div className="font-medium text-gray-700">{item.label}</div>
                    <div className="text-gray-900">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-4">Notes</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div>(*) All the thermal tests and power efficiency on wall are of typical values. The actual hashrate value fluctuates by ±5%, and the actual power on wall and power efficiency on wall fluctuates by ±5%.</div>
                <div>(**) Wall coolant temperature.</div>
                <div>(***) Caution: Wrong input voltage may cause server damages.</div>
                <div>(****) For detailed working coolant info and maintenance schedule, please refer to "ANTSPACE fan-3 Water Cooling Container & Dry Well Tower Product Manual", Chapter 6.</div>
              </div>
            </div>
          </div>
        );

      case 'purchasing':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Purchasing Guidelines</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div>1. The shipping costs, customs charges, and import duty are not included in the retail price shown above.</div>
              <div>2. After an order has been submitted, it is required to cancel the order within 2 hours after submission (unable to change the ordered item(s) to different item(s) or different specification(s)).</div>
              <div>3. The pictures shown are for reference only; the final shipped version shall prevail.</div>
            </div>
          </div>
        );

      case 'warranty':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Warranty</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div>1. A 365-day warranty is provided starting from the shipping date. BYTMAIN will cover shipping costs when shipping a replacement unit within the warranty period.</div>
              <div>2. Warranty only covers manufacturing defects and defects caused by the manufacturing process. Once the buyer is found to have manually opened the device (such as through BYTMAIN, Once the buyer is found to have manually opened the device...).</div>
              <div>3. If the user fails to use the product per the given instructions, specifications, and conditions provided, a chargeable fee function without all unit without BYTMAIN's prior written authorization.</div>
              <div>4. Click here for a complete list of the Terms & Conditions that apply to all orders placed on https://shop.bytmain.com</div>
            </div>
          </div>
        );

      case 'reviews':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
            <p className="text-gray-500">No reviews available yet.</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">   
      <section className="bg-gradient-to-br from-blue-500 to-blue-400 mx-4 my-8 rounded-3xl overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 py-15">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <img 
                src="/dummy.jpg" 
                alt="Bitcoin Miner S23 HYD" 
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <div className="text-white space-y-6">
              <h1 className="text-5xl font-bold leading-tight">Bitcoin Miner S23 HYD</h1>
              <p className="text-xl opacity-90">
                Functions: <span className="font-semibold">SHA256 only; Bitcoin mining</span>
              </p>
              <p className="text-xl opacity-90">
                Specification: <span className="font-semibold">Crypto algorithm/coins</span>
              </p>
              <p className="text-xl opacity-90">
                Price: <span className="font-semibold">40,000$ </span>
              </p>
              
              <div className="grid grid-cols-3 gap-6 my-8">
                <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold">648</div>
                  <div className="text-sm opacity-80 mt-1">TH/s Hash Rate</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold">5.5</div>
                  <div className="text-sm opacity-80 mt-1">J/TH Efficiency</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold">2850W</div>
                  <div className="text-sm opacity-80 mt-1">Power Consumption</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                  Buy Now
                </button>
                <div className="flex items-center bg-white/20 backdrop-blur rounded-lg p-2">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center text-white font-bold hover:bg-white/20 rounded"
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    value={quantity} 
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-12 text-center bg-transparent text-white font-semibold focus:outline-none"
                  />
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-white font-bold hover:bg-white/20 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {renderTabContent()}
        </div>
      </section>

      {/* Contact Form */}
      <Footer className={'bg-white rounded-md  flex flex-col md:flex-row items-center justify-center py-16 md:gap-80 gap-10 px-4 md:px-10'} />
     
    </div>
  );
}