import React, { useState } from 'react';
import { Mail, MessageCircle, Phone } from 'lucide-react';

const ContactSalesPage = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);

  const regions = [
    {
      id: 'na',
      code: 'NA',
      name: 'North America',
      email: 'sales1@ASICNOVA.com',
      description: 'North America'
    },
    {
      id: 'emsa',
      code: 'EMSA',
      name: 'Europe, Middle East, South America',
      email: 'sales2@ASICNOVA.com',
      description: 'Europe, Middle East, South America'
    },
    {
      id: 'asia',
      code: 'ASIA',
      name: 'Asia, Australia, Africa',
      email: 'sales3@ASICNOVA.com',
      description: 'Asia, Australia, Africa'
    },
    {
      id: 'cis',
      code: 'CIS',
      name: 'CIS Countries',
      email: 'sales4@ASICNOVA.com',
      description: 'CIS Countries'
    }
  ];

  const footerLinks = {
    home: [
      { name: 'About ASICNOVA', href: '#' },
      { name: 'News & Events', href: '#' },
      { name: 'Careers', href: '#' }
    ],
    customerSupport: [
      { name: 'Hotline +1(737)502-4531', href: 'tel:+17375024531' },
      { name: 'Contact Sales', href: '#' },
      { name: 'SUPPORT.ASICNOVA.COM', href: '#' },
      { name: 'Manage Your Account', href: '#' },
      { name: 'Submit KYC', href: '#' },
      { name: 'COUPON', href: '#' }
    ],
    strategicPartners: [
      { name: 'ANTPOOL', href: '#' },
      { name: 'BIT.FU', href: '#' },
      { name: 'ANTALPHA', href: '#' },
      { name: 'ANTSENTRY', href: '#' },
      { name: 'ANTRESALE', href: '#' }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
    
      

      
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Contact Sales</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Click the region to view the contact information and get in touch with our sales team.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {regions.map((region) => (
            <div
              key={region.id}
              className={`bg-white rounded-xl shadow-lg p-8 text-center cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                selectedRegion === region.id ? 'ring-2 ring-blue-500 shadow-xl' : ''
              }`}
              onClick={() => setSelectedRegion(selectedRegion === region.id ? null : region.id)}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{region.code}</h3>
              <p className="text-gray-600 mb-6 text-sm">{region.description}</p>
              
              <div className="space-y-4">
                <a 
                  href={`mailto:${region.email}`}
                  className="flex items-center justify-center text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="text-sm">{region.email}</span>
                </a>
                
                <div className="flex justify-center space-x-4">
                  <button className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white hover:bg-green-700 transition-colors">
                    <Phone className="w-5 h-5" />
                  </button>
                  {/* <button className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
                    <Telegram className="w-5 h-5" />
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedRegion && (
          <div className="bg-blue-50 rounded-xl p-8 mb-16 text-center">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">
              Contact {regions.find(r => r.id === selectedRegion)?.name}
            </h3>
            <p className="text-blue-700 mb-6">
              Get in touch with our {regions.find(r => r.id === selectedRegion)?.description} sales team
            </p>
            <div className="flex justify-center space-x-6">
              <a 
                href={`mailto:${regions.find(r => r.id === selectedRegion)?.email}`}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
              >
                <Mail className="w-5 h-5 mr-2" />
                Send Email
              </a>
              <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors inline-flex items-center">
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat Now
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Home</h4>
              <ul className="space-y-2">
                {footerLinks.home.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Customer Support</h4>
              <ul className="space-y-2">
                {footerLinks.customerSupport.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Strategic Partners</h4>
              <ul className="space-y-2">
                {footerLinks.strategicPartners.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <button className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </button>
                <button className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center text-white hover:bg-blue-800 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </button>
                <button className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
            <p>Copyright © 2024 ASICNOVA Technologies Holding Company. All Rights Reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-gray-900 transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactSalesPage;