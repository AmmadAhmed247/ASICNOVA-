import React, { useState } from 'react';
import Footer from '../../components/footer';


export default function AboutUs() {
 
  

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-400 to-blue-700 text-white py-20 overflow-hidden">
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 opacity-20">
          <div className="w-96 h-64 bg-white bg-opacity-10 rounded-full"></div>
          <div className="w-96 h-64 bg-white bg-opacity-10 rounded-full"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-6">What Our Goals?</h1>
            <p className="text-xl opacity-90">
              At AsicNova, we are redefining the future of cryptocurrency mining by delivering next-generation ASIC hardware
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {/* About Us Section */}
        <div className="bg-white rounded-xl shadow-lg p-10 mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-l-4 border-blue-600 pl-6">
            About Us
          </h2>
          <div className="space-y-6 text-gray-600">
            <p>
              At AsicNova, we are redefining the future of cryptocurrency mining by delivering next-generation ASIC hardware that combines power, efficiency, and reliability. Whether you're a home miner or managing a large-scale mining farm, our mission is to help you mine smarter and profit more.
            </p>
            <p>
              We are more than just a supplier — we are manufacturers, driving innovation from design to delivery. Every miner we offer is the result of in-house research and development, engineered with advanced chip architecture, robust cooling systems, and an energy-efficient framework designed to lower your operating costs and boost your ROI.
            </p>
          </div>
        </div>

        {/* What Sets Us Apart Section */}
        <div className="bg-white rounded-xl shadow-lg p-10 mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-l-4 border-blue-600 pl-6">
            What Sets Us Apart
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Ultra-Efficient Mining Hardware</h3>
              <p className="text-gray-600">
                Our miners are optimized for leading coins like BTC, ETH, and ETC, delivering maximum hashpower with minimal energy consumption.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Factory-Direct Supply</h3>
              <p className="text-gray-600">
                We produce and ship directly from our factory to customers worldwide — no middlemen, no inflated prices.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Global Shipping & Support</h3>
              <p className="text-gray-600">
                From North America to Europe and beyond, we provide fast international shipping and responsive customer support.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Built for Serious Miners</h3>
              <p className="text-gray-600">
                Our machines are designed for high-performance operations — whether you're mining at home or managing industrial-scale facilities.
              </p>
            </div>
          </div>
        </div>

        {/* Our Promise Section */}
        <div className="bg-white rounded-xl shadow-lg p-10 mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-l-4 border-blue-600 pl-6">
            Our Promise
          </h2>
          <div className="space-y-6 text-gray-600">
            <p>
              We understand the challenges miners face today: increasing electricity costs, complex setups, and overpriced equipment. That's why we focus on delivering cost-effective hardware with manual crypto payment options (no exchange fees), so you keep more of your profits.
            </p>
            <p className="font-semibold text-gray-700">With AsicNova, you get:</p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-green-600 font-bold mr-3">✓</span>
                <span>Transparent pricing in USD with crypto payments</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 font-bold mr-3">✓</span>
                <span>Direct wallet transactions with 1+ blockchain confirmation</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 font-bold mr-3">✓</span>
                <span>A simplified buying experience without unnecessary steps</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Our Vision Section */}
        <div className="bg-white rounded-xl shadow-lg p-10 mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-l-4 border-blue-600 pl-6">
            Our Vision
          </h2>
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-8">
            <p className="text-gray-700 text-lg mb-4">
              To empower the mining community with high-performance, low-barrier hardware that drives the future of decentralized finance — sustainably and securely.
            </p>
            <p className="text-blue-600 font-semibold text-lg italic">
              Because at AsicNova, you don't just mine — you mine smarter.
            </p>
          </div>
        </div>

        {/* Contact Form Section */}
        <Footer className={"bg-white rounded-md  flex flex-col md:flex-row items-center justify-center py-16 md:gap-80 gap-10 px-4 md:px-10"} />
       
      </div>
    </div>
  );
}