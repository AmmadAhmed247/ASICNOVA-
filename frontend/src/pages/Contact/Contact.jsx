import React, { useState } from 'react';
import Footer from '../../components/footer';
export default function AsicNovaContact() {
 

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-400 to-blue-700 text-white py-20 overflow-hidden">
        <div className="absolute right-0 top-2 h-full w-160 opacity-70">
         <img src="/contact.png" alt="contact.png"  className='overflow-hidden blur-xs w-fit h-fit' />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-6">Need Inquiries</h1>
            <p className="text-xl opacity-90">
              Reach out to us through the form below or directly via email — and a member of our team will get back to you within 24-48 hours.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {/* Subtitle */}
        <div className="text-center mb-12">
          <p className="text-lg text-gray-700">
            Have a question about our products, orders, or payment methods? We're here to help.
          </p>
        </div>

        {/* Sales Inquiries Section */}
        <div className="bg-white rounded-xl shadow-lg p-10 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-l-4 border-blue-600 pl-6">
            Sales Inquiries
          </h2>
          <p className="text-gray-600">
            For Sales Inquiries, Contact us on: <a href="mailto:sales@asicnova.com" className="text-blue-600 hover:underline font-medium">sales@asicnova.com</a>
          </p>
        </div>

        {/* General Support Section */}
        <div className="bg-white rounded-xl shadow-lg p-10 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-l-4 border-blue-600 pl-6">
            General Support
          </h2>
          <p className="text-gray-600">
            For general support, Reach out to us on: <a href="mailto:contact@asicnova.com" className="text-blue-600 hover:underline font-medium">contact@asicnova.com</a>
          </p>
        </div>

        {/* Need Help with Your Order Section */}
        <div className="bg-white rounded-xl shadow-lg p-10 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-l-4 border-blue-600 pl-6">
            Need Help with Your Order?
          </h2>
          <p className="text-gray-600">
            Please include your Order ID or wallet transaction hash when contacting us about a specific purchase so we can assist you faster.
          </p>
        </div>

        {/* Contact Form Section */}
        <div className="bg-white rounded-xl shadow-lg p-10 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-l-4 border-blue-600 pl-6">
            Contact form
          </h2>

          <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl p-8">
            <h3 className="text-white text-xl font-semibold text-center mb-8">
              Fill the form for your Inquiries
            </h3>
            
          </div>
            <Footer className={"bg-white rounded-md  flex flex-col md:flex-row items-center justify-center py-16 md:gap-80 gap-10 px-4 md:px-10"} />
        </div>
      </div>
    </div>
  );
}