import React, { useState, useEffect } from 'react';
import { ShoppingCart, Clock, DollarSign, ArrowDown, Shield, CheckCircle, TrendingUp, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

const MiningWebsite = () => {
  const [animateCards, setAnimateCards] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateCards(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const products = [
    {
      id: 1,
      name: "Anti Space HD 5",
      hashrate: "1 Set | 1400kW | 500 Stick Space",
      price: "Only 135,000$",
      gradient: "from-blue-400 via-blue-500 to-blue-600",
    },
    {
      id: 2,
      name: "Anti Space HW5",
      hashrate: "1 Set | 1500kW | 370 Stick Space",
      price: "Only 84,000$",
      gradient: "from-blue-400 via-blue-500 to-blue-600",
    },
    {
      id: 3,
      name: "Bitcoin Miner S19k Pro",
      hashrate: "160 T | 2.6kw | 23 J/T",
      price: "Only 305$",
      gradient: "from-blue-400 via-blue-500 to-blue-600",
    }
  ];

  const features = [
    {
      icon: <Clock className="w-12 h-12" />,
      title: "Always Here, Anytime You Need Us",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <DollarSign className="w-12 h-12" />,
      title: "Powerful Mining. Unbeatable and reasonable Prices.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <ArrowDown className="w-12 h-12" />,
      title: "Pay with Crypto. Mine with Crypto.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Verified & Transparent Operations",
      color: "from-blue-500 to-blue-600"
    }
  ];

  const popularProducts = [
    {
      name: "Bitcoin Miner S23 HYD",
      function: "BTC/BCH/BSV SHA 256",
      specs: "560T | 5510W | 9.5J/T",
      price: "30 $/T | 17,400$/Unit",
      image: "/dummy.jpg"
    },
    {
      name: "Antminer S21 Pro",
      function: "BTC/BCH/BSV SHA 256",
      specs: "234T | 3510W | 15J/T",
      price: "45 $/T | 25,600$/Unit",
      image: "/dummy.jpg"
    },
    {
      name: "WhatsMiner M50S",
      function: "BTC/BCH/BSV SHA 256",
      specs: "126T | 3276W | 26J/T",
      price: "28 $/T | 15,800$/Unit",
      image: "/dummy.jpg"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % popularProducts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + popularProducts.length) % popularProducts.length);
  };

  const popularProduct = popularProducts[currentSlide];

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="bg-gradient-to-b from-gray-100 to-gray-200 py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-800">
            Mine Smarter. <span className="text-blue-500">Earn Faster.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
            Unlock the power of high-performance Bitcoin mining with secure, scalable, and energy-efficient solutions.
          </p>
          <p className="text-gray-500 mb-8">
            Start mining today with our advanced products — no technical skills required.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-700 hover:scale-105 hover:shadow-xl ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >

              <div className={`bg-gradient-to-br ${product.gradient} h-64 relative overflow-hidden flex items-center justify-center`}>
                <img
                  src="/dummy.jpg"
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="w-32 h-32 bg-white/20 rounded-xl mx-auto mb-4 items-center justify-center" style={{ display: 'none' }}>
                  <div className="w-20 h-20 bg-white/30 rounded-lg flex items-center justify-center">
                    <Zap className="w-10 h-10 text-white" />
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/10"></div>
              </div>

              <div className={`bg-gradient-to-br ${product.gradient} text-white p-6`}>
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-sm opacity-90 mb-4">{product.hashrate}</p>
                <div className="flex justify-between items-center">
                  <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">
                    Shop Now
                  </button>
                  <span className="font-bold text-lg">{product.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold transition-colors">
            View All
          </button>
        </div>
      </div>
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Us</h2>
            <p className="text-gray-600 text-lg mb-2">Trusted by Thousands. Built for Everyone.</p>
            <p className="text-gray-500 max-w-3xl mx-auto">
              We make Bitcoin mining simple, profitable, and accessible — whether you're a beginner or a seasoned crypto investor.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center group hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className={`bg-gradient-to-br ${feature.color} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-white group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-gray-800 font-semibold mb-2 text-lg leading-tight">{feature.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Our Most Popular <span className="text-blue-500">Mining Solutions</span>
            </h2>
            <p className="text-gray-600 max-w-4xl mx-auto">
              Explore our top-performing mining products handpicked by thousands of satisfied users. Whether you're new to mining or scaling up, these plans offer the best balance of performance, price, and profitability.
            </p>
          </div>

          <div className="relative bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl overflow-hidden shadow-xl max-w-6xl mx-auto">
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="grid md:grid-cols-2 gap-0 items-center">
              <div className="p-8 md:p-12 text-white">
                <h3 className="text-3xl font-bold mb-6">{popularProduct.name}</h3>
                <div className="space-y-4">
                  <p className="text-lg"><strong>Function:</strong> {popularProduct.function}</p>
                  <p className="text-lg"><strong>Specifications:</strong> {popularProduct.specs}</p>
                  <p className="text-2xl font-bold"><strong>Price:</strong> {popularProduct.price}</p>
                </div>
                <div className="flex gap-4 mt-8">
                  <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                    Shop Now
                  </button>
                  <button className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>

              <div className="h-80 md:h-96 relative flex items-center justify-center p-8">
                <img
                  key={currentSlide}
                  src={popularProduct.image}
                  alt={popularProduct.name}
                  className="w-full h-full object-cover rounded-2xl shadow-lg transition-all duration-500 transform hover:scale-105"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full bg-white/20 rounded-2xl items-center justify-center" style={{ display: 'none' }}>
                  <div className="w-32 h-32 bg-white/30 rounded-xl flex items-center justify-center">
                    <Zap className="w-16 h-16 text-white" />
                  </div>
                </div>
              </div>
            </div>


            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
              {popularProducts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/70'
                    }`}
                />
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold transition-colors">
              View All
            </button>
          </div>
        </div>
      </div>


      <div className="bg-white flex flex-row items-center justify-center py-16 gap-80">
        <div className="flex flex-col gap-10 font-semibold">
          <p className="hover:text-blue-400 cursor-pointer transition-colors">Home</p>
          <p className="hover:text-blue-400 cursor-pointer transition-colors">Contact Us</p>
          <p className="hover:text-blue-400 cursor-pointer transition-colors">Terms & Conditions</p>
          <p className="hover:text-blue-400 cursor-pointer transition-colors">Privacy Policy</p>
          <p className="hover:text-blue-400 cursor-pointer transition-colors">Refund Policy</p>
        </div>


        <div className="max-w-2xl">
          <div className="text-center mb-8 text-white">
            <h3 className="text-2xl font-bold mb-2">For more inquiries, Contact us</h3>
            <p className="opacity-90">or simply fill the form</p>
          </div>

          <div className="p-4 flex flex-col gap-5 bg-blue-500 rounded-2xl">
            <input
              type="text"
              placeholder="Your Full Name"
              className="w-full px-6 bg-white py-4 rounded-full border-0 outline-none text-gray-700"
            />
            <input
              type="email"
              placeholder="Your Email Address"
              className="w-full px-6 py-4 bg-white rounded-full border-0 outline-none text-gray-700"
            />
            <textarea
              placeholder="Type your inquiry"
              rows="6"
              className="w-full px-6 py-4 bg-white rounded-2xl border-0 outline-none resize-none text-gray-700"
            ></textarea>
            <button
              type="button"
              className="w-full bg-white text-blue-600 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors text-lg"
              onClick={() => alert('Form submitted! (This is a demo)')}
            >
              Submit
            </button>
          </div>
        </div>
      </div>


      <footer className="text-white py-12">
        <div className="container mx-auto px-6">
          <div className="md:col-span-4">
            <div className="flex justify-center items-center space-x-6">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#1DA1F2">

                <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4.36a9.07 9.07 0 01-2.88 1.1A4.52 4.52 0 0016.88 0c-2.5 0-4.52 2.02-4.52 4.52 0 .35.04.7.11 1.03A12.83 12.83 0 013 1.16a4.49 4.49 0 001.4 6.03A4.5 4.5 0 012 6.9v.05c0 2.22 1.57 4.07 3.65 4.49a4.52 4.52 0 01-2.04.08 4.52 4.52 0 004.21 3.14A9.05 9.05 0 012 19.54 12.77 12.77 0 008.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.36 8.36 0 0023 3z" />
              </svg>

              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#1DA1F2">
                <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7.5 0h4.8v2.2h.07c.67-1.27 2.3-2.61 4.74-2.61 5.07 0 6 3.33 6 7.66V24h-5v-6.98c0-1.66-.03-3.8-2.32-3.8-2.32 0-2.68 1.82-2.68 3.7V24h-5V8z" />
              </svg>

              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#1DA1F2">
                <path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.407.593 24 1.324 24h11.495v-9.294H9.691v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.31h3.587l-.467 3.622h-3.12V24h6.116C23.407 24 24 23.407 24 22.676V1.324C24 .593 23.407 0 22.676 0z" />
              </svg>

              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#1DA1F2">
                <path d="M12 2.16c3.2 0 3.584.012 4.85.07 1.17.055 1.96.24 2.42.403a4.92 4.92 0 011.78 1.036 4.92 4.92 0 011.036 1.78c.164.46.348 1.25.403 2.42.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.055 1.17-.24 1.96-.403 2.42a4.923 4.923 0 01-1.036 1.78 4.923 4.923 0 01-1.78 1.036c-.46.164-1.25.348-2.42.403-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.055-1.96-.24-2.42-.403a4.923 4.923 0 01-1.78-1.036 4.923 4.923 0 01-1.036-1.78c-.164-.46-.348-1.25-.403-2.42C2.172 15.584 2.16 15.2 2.16 12s.012-3.584.07-4.85c.055-1.17.24-1.96.403-2.42a4.92 4.92 0 011.036-1.78A4.92 4.92 0 015.37 2.63c.46-.164 1.25-.348 2.42-.403C8.416 2.172 8.8 2.16 12 2.16zm0-2.16C8.737 0 8.332.013 7.052.072 5.77.131 4.77.33 4 .63a6.877 6.877 0 00-2.5 1.636A6.877 6.877 0 00.63 4c-.3.77-.499 1.77-.558 3.052C.013 8.332 0 8.737 0 12c0 3.263.013 3.668.072 4.948.059 1.282.258 2.282.558 3.052a6.878 6.878 0 001.636 2.5 6.878 6.878 0 002.5 1.636c.77.3 1.77.499 3.052.558 1.28.059 1.685.072 4.948.072s3.668-.013 4.948-.072c1.282-.059 2.282-.258 3.052-.558a6.877 6.877 0 002.5-1.636 6.877 6.877 0 001.636-2.5c.3-.77.499-1.77.558-3.052.059-1.28.072-1.685.072-4.948s-.013-3.668-.072-4.948c-.059-1.282-.258-2.282-.558-3.052a6.878 6.878 0 00-1.636-2.5 6.878 6.878 0 00-2.5-1.636c-.77-.3-1.77-.499-3.052-.558C15.668.013 15.263 0 12 0z" />
                <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zM18.406 4.594a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
              </svg>
            </div>
          </div>
          <div className="text-center pt-8">
            <div className="flex items-center justify-center space-x-2 text-blue-400 font-bold text-xl mb-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span>ASICNOVA</span>
            </div>
            <p className="text-gray-400">© All Rights Reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MiningWebsite;